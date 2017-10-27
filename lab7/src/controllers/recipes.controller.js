const Boom = require('boom');
const Recipes = require('../models/index.model');

module.exports = {
	all: async (req, res) => {
		try {
			const recipeList = await Recipes.find();
			res.json(
				recipeList.map(e => {
					return { _id: e._id, title: e.title };
				})
			);
		} catch (err) {
			const { output } = Boom.badRequest(err);
			return res.status(output.statusCode).json(output.payload);
		}
	},
	find: async (req, res) => {
		try {
			const recipe = await Recipes.findOne({ _id: req.params.id });
			if (!recipe) throw Error(`Recipe does not exist! (ID: ${req.params.id})`);
			res.json(recipe);
		} catch (err) {
			const { output } = Boom.badRequest(err);
			return res.status(output.statusCode).json(output.payload);
		}
	},
	add: async (req, res) => {
		try {
			const { title, ingredients, steps, comments } = req.body;
			const newRecipe = new Recipes({
				title,
				ingredients,
				steps,
				comments
			});
			await newRecipe.save(); // Will throw if anything types are bad
			res.json(newRecipe);
		} catch (err) {
			const { output } = Boom.badRequest(err);
			return res.status(output.statusCode).json(output.payload);
		}
	},
	update: async (req, res) => {
		try {
			const keysToUpdate = {};
			Object.keys(req.body).forEach(key => {
				if (key !== '_id') {
					keysToUpdate[key] = req.body[key];
				}
			});
			const replacedRecipe = await Recipes.findOneAndUpdate(
				{ _id: req.params.id },
				{
					$set: keysToUpdate
				},
				{ new: true } // Returns new object
			);
			if (!replacedRecipe)
				throw Error(`Recipe does not exist! (ID: ${req.params.id})`);
			res.json(replacedRecipe);
		} catch (err) {
			const { output } = Boom.badRequest(err);
			return res.status(output.statusCode).json(output.payload);
		}
	},
	delete: async (req, res) => {
		try {
			const delObj = await Recipes.deleteOne({ _id: req.params.id });
			res.json({
				msg: delObj.result.n
					? `Successfully deleted recipe! (ID: ${req.params.id})`
					: `Specified recipe does not exist! (ID: ${req.params.id})`
			});
		} catch (err) {
			const { output } = Boom.badRequest(err);
			return res.status(output.statusCode).json(output.payload);
		}
	}
};
