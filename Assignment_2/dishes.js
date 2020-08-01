// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// Will add the Currency type to the Mongoose Schema types
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

// create a schema
// commentSchema
var commentSchema = new Schema({
	rating: {
		type: Number,
		min: 1,
		max: 5,
		required: true
	},
	comment: {
		type: String,
		required: true
	},
	author: {
		type: String,
		required: true
	}
}, {
    timestamps: true
});
// dishSchema
var dishSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
	category: {
		type: String,
		required: true
	},
	price: { 
		type: Currency,
		required: true,
		min: 0
	},
	description: {
		type: String,
		required: true
	},
	label: {
		type: String,
		default: ''
	},
	image: {
		type: String,
		required: true
	},
	featured: {
		type: Boolean,
		default: false
	},
	comments: [commentSchema]
}, {
    timestamps: true
});

// the schema is useless so far
// we need to create a model using it
var dishes = mongoose.model('dishes', dishSchema);

// make this available to our Node applications
module.exports = dishes;
