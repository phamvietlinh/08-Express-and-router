'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

function toLower (v) {
  return v.toLowerCase();
}

var FoodSchema = new Schema({
	name: {
		type: String,
		required: true,
		set: toLower
	},
	foodDescription: {
		type: String,
		default: ""
	},
	created_date: {
		type: Date,
		default: Date.now
	},
	status: {
		type: [{
			type: String,
			enum: ['available', 'unavailable']
		}],
		default: ['available']
	},
	categoryId: Schema.ObjectId,
	imageUrl: {
		type: String
	}
})

FoodSchema.path('name').set((inputString) => {
	return inputString[0].toUpperCase() + inputString.slice(1);
})

module.exports = mongoose.model('Food', FoodSchema);