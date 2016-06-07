// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// Will add the Currency type to the Mongoose Schema types
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

var promotionSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true
	},
	image: {
		type: String,
		required: true
	},
	label: {
		type: String,
		default: ''
	},
	price: {
		type: Currency,
		required: true
	},
	description: {
		type: String,
		required: true
	}
});

var promotions  = mongoose.model('Promotions', promotionSchema);

module.exports = promotions;