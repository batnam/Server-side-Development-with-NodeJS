var assert = require('assert');
var mongoose = require('mongoose');

var Dishes = require('./dishes');
var Leaders = require('./leadership');
var Promotions = require('./promotions');

describe('mongooseTest', function() {
	var db;
	beforeEach(function() {
		mongoose.connect('mongodb://localhost/test');
		db = mongoose.connection;
		db.on('error', console.error.bind(console, 'connection error:'));
		db.once('open', function() {
			console.log('we are connected!');
		});
    });
 
    afterEach(function() {

    });
	
	it('Test Dishes Schema', function(done) {
		// create a new dish
		Dishes.create({
			name: 'Uthapizza',
			image: 'images/uthapizza.png',
			category: 'mains',
			label: 'Hot',
			price: 4.99,
			description: 'A unique . . .',
			comments: [
				{
					rating: 4,
					comment: 'Imagine all the eatables, living in conFusion!',
					author: 'John Lemon'
				}, 
				{
					rating: 5,
					comment: 'Sends anyone to heaven, I wish I could get my mother-in-law to eat it!',
					author: 'Paul McVites'
				}
			]
		}, function (err, dish) {
			if (err) throw err;
			console.log('Dish created!');
			console.log(dish);

			var id = dish._id;
			Dishes.remove({ _id: id }, function (err) {
				if (err) throw err;
				console.log('removed Dish ' + id)
			});
			
		});
		
		Leaders.create({
			name: 'Peter Pan',
			image: 'images/alberto.png',
			designation: 'Chief Epicurious Officer',
			abbr: 'CEO',
			description: 'Our CEO, Peter, . . .'
		}, function (err, leader) {
			if (err) throw err;
			console.log('Leader created!');
			console.log(leader);
			
			var id = leader._id;
			
			Leaders.remove({ _id: id }, function (err) {
				if (err) throw err;
				console.log('removed Leader ' + id)
			});
		});
		
		Promotions.create({
			name: 'Weekend Grand Buffet',
			image: 'images/buffet.png',
			label: 'New',
			price: '19.99',
			description: 'Featuring . . .'
		}, function (err, promotion) {
			if (err) throw err;
			console.log('Promotion created!');
			console.log(promotion);
			
			var id = promotion._id;
			
			Promotions.remove({ _id: id }, function (err) {
				if (err) throw err;
				console.log('removed Promotion ' + id)
			});
			
			done();	
		});
	});

});