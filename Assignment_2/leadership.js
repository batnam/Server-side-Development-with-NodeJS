// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var leaderSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true
	},
	image: {
		type: String,
		required: true
	},
	designation: {
		type: String,
		required: true
	},
	abbr: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	}
});

// the schema is useless so far
// we need to create a model using it
var leaders = mongoose.model('Leaders', leaderSchema);

// make this available to our Node applications
module.exports = leaders ;