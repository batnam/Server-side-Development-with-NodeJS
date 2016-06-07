var assert = require('assert');
var app = require('./app');
var superagent = require('superagent');
var randomstring = require("randomstring");

describe('TestAss4', function() {
	var server;
	beforeEach(function() {
		app.set('port', 3000);

		server = app.listen(app.get('port'), function() {
		  	console.log('Express server listening on port ' + server.address().port);
		});
    });
 
    afterEach(function() {
		server.close();
    });
	
	var token;
	
	it('Register, login ', function(done) {
		this.timeout(10000);
		superagent.post('http://localhost:3000/users/login/')
		.send({ username: 'Nam', password: 'handsome'})
		.end(function(error, res) {
           	if (res.status == 200) {
				console.log("Login successful");
				var obj = JSON.parse(res.text);
				token = obj.token;
				done();
			} else {
				superagent.post('http://localhost:3000/users/register/')
				.send({ username: 'Nam', password: 'handsome', admin: true })
				.end(function(error, res) {
					if (res.status == 200) {
						console.log("Register successful");
						superagent.post('http://localhost:3000/users/login/')
						.send({ username: 'Nam', password: 'handsome' })
						.end(function(error, res) {
							console.log("Login successful");
							var obj = JSON.parse(res.text);
							token = obj.token;
							done();
						});
					} else {
						console.log("Register un-successful");
						console.log(error);
						done();
					}
				});
			}
		});
	});
	
	it('Test add favorites ', function(done) {
		superagent.post('http://localhost:3000/dishes/')
		.set('x-access-token', token)
		.set('Content-Type', 'application/json')
		.send({
			name: randomstring.generate(),
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
		})
		.end(function(error, res) {
			console.log("favorites json: " + JSON.stringify(res.text));
			var newdishes = JSON.parse(res.text);
			console.log("dishId: " + newdishes._id);
			superagent.post('http://localhost:3000/favorites/')
			.set('x-access-token', token)
			.set('Content-Type', 'application/json')
			.send({
				_id: newdishes._id
			})
			.end(function(error, res) {
				console.log(JSON.stringify(res.text));
				done();
			});
		});
	});
	
	it('Test get all favorites ', function(done) {
		superagent.get('http://localhost:3000/favorites/')
		.set('x-access-token', token)
		.set('Content-Type', 'application/json')
		.end(function(error, res) {
			console.log(JSON.stringify(res.text));
			done();
		});
	});
	
	/*it('Test remove favorites ', function(done) {
		superagent.post('http://localhost:3000/dishes/')
		.set('x-access-token', token)
		.set('Content-Type', 'application/json')
		.send({
			name: randomstring.generate(),
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
		})
		.end(function(error, res) {
			console.log("favorites json: " + JSON.stringify(res.text));
			var newdishes = JSON.parse(res.text);
			console.log("dishId: " + newdishes._id);
			superagent.delete('http://localhost:3000/favorites/')
			.set('x-access-token', token)
			.set('Content-Type', 'application/json')
			.end(function(error, res) {
				console.log(JSON.stringify(res.text));
				done();
			});
		});
	});
	
	
	it('Test remove favorites with favoriteID', function(done) {
		superagent.post('http://localhost:3000/dishes/')
		.set('x-access-token', token)
		.set('Content-Type', 'application/json')
		.send({
			name: randomstring.generate(),
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
		})
		.end(function(error, res) {
			console.log("favorites json: " + JSON.stringify(res.text));
			var newdishes = JSON.parse(res.text);
			console.log("dishId: " + newdishes._id);
			superagent.delete('http://localhost:3000/favorites/'+newdishes._id)
			.set('x-access-token', token)
			.set('Content-Type', 'application/json')
			.end(function(error, res) {
				console.log(JSON.stringify(res.text));
				done();
			});
		});
	});*/

});