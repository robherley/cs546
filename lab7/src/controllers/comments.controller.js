const Boom = require('boom');
const Recipes = require('../models/index.model');
const uuidv4 = require('uuid/v4');

const findComment = async commentId => {
	const recipe = await Recipes.findOne({ 'comments._id': commentId });
	let match;
	recipe.comments.forEach(comment => {
		if (comment._id === commentId) {
			return (match = {
				_id: comment._id,
				recipeId: recipe._id,
				recipeTitle: recipe.title,
				poster: comment.poster,
				comment: comment.comment // Bad naming
			});
		}
	});
	if (!match) throw Error(`Comment does not exist! (ID: ${commentId})`);
	return match;
};

module.exports = {
	all: async (req, res) => {
		try {
			const recipe = await Recipes.findOne({ _id: req.params.recipeId });
			if (!recipe)
				throw Error(`Recipe does not exist! (ID: ${req.params.recipeId})`);
			res.json(
				recipe.comments.map(e => {
					return {
						_id: e._id,
						recipeId: recipe._id,
						recipeTitle: recipe.title,
						poster: e.poster,
						comment: e.comment
					};
				})
			);
		} catch (err) {
			const { output } = Boom.badRequest(err);
			return res.status(output.statusCode).json(output.payload);
		}
	},
	find: async (req, res) => {
		try {
			const comment = await findComment(req.params.commentId);
			res.json(comment);
		} catch (err) {
			const { output } = Boom.badRequest(err);
			return res.status(output.statusCode).json(output.payload);
		}
	},
	add: async (req, res) => {
		try {
			const { poster, comment } = req.body;
			const newComment = {
				_id: uuidv4(),
				poster,
				comment
			};
			await Recipes.findOneAndUpdate(
				{ _id: req.params.recipeId },
				{
					$push: { comments: newComment }
				},
				{ new: true } // Returns new object
			);
			res.json(newComment);
		} catch (err) {
			const { output } = Boom.badRequest(err);
			return res.status(output.statusCode).json(output.payload);
		}
	},
	update: async (req, res) => {
		try {
			const commentFound = await findComment(req.params.commentId);
			const keysToUpdate = {};
			Object.keys(req.body).forEach(key => {
				if (key !== '_id') {
					keysToUpdate[`comments.$.${key}`] = req.body[key];
				}
			});
			const foundRecipe = await Recipes.findOneAndUpdate(
				{ _id: req.params.recipeId, 'comments._id': commentFound._id },
				{
					$set: keysToUpdate
				},
				{ new: true } // Returns new object
			);
			const { _id, comment, poster } = await findComment(req.params.commentId);
			res.json({ _id, comment, poster });
		} catch (err) {
			const { output } = Boom.badRequest(err);
			return res.status(output.statusCode).json(output.payload);
		}
	},
	delete: async (req, res) => {
		try {
			const comment = await findComment(req.params.id);
			await Recipes.findOneAndUpdate(
				{ _id: comment.recipeId },
				{
					$pull: { comments: { _id: comment._id } }
				}
			);
			res.json({ msg: `Successfully deleted comment! (ID: ${req.params.id})` });
		} catch (err) {
			const { output } = Boom.badRequest(err);
			return res.status(output.statusCode).json(output.payload);
		}
	}
};
