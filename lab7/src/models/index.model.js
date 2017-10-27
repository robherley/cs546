const mongoose = require('mongoose');
const uuidv4 = require('uuid/v4');
const { Schema } = mongoose;

const recipesSchema = new Schema(
	{
		_id: { type: String, default: uuidv4 },
		title: { type: String, required: [true, 'not a valid string'] },
		ingredients: {
			type: [
				{
					name: {
						type: String,
						required: [true, 'name is not a valid string']
					},
					amount: {
						type: String,
						required: [true, 'name is not a valid string']
					},
					_id: false
				}
			],
			require: [true, 'not a valid string array']
		},
		steps: {
			type: [String],
			require: [true, 'not a valid string array']
		},
		comments: [
			{
				_id: { type: String, default: uuidv4 },
				poster: {
					type: String,
					required: [true, 'not a valid string']
				},
				comment: {
					type: String,
					required: [true, 'not a valid string']
				}
			}
		]
	},
	{ versionKey: false }
);

module.exports = mongoose.model('recipes', recipesSchema);
