var assert = require('assert');
var mongoose = require('mongoose');
var app = require('./app');
var superagent = require('superagent');

describe('testAss3', function() {
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
	
	it('Test Assignment 3 - Register, login ', function(done) {
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
						done();
					}
				});
			}
		});
	});
	
	it('Test Assignment 3 - Promo Router ', function(done) {
		this.timeout(10000);

		superagent.get('http://localhost:3000/promotions/')
		.set('x-access-token', token)
		.set('Content-Type', 'application/json')
		.end(function(error, res) {
			if (res.status == 200) {
				var promotions = JSON.parse(res.text);
				if (promotions.length == 0) {
					superagent.post('http://localhost:3000/promotions/')
					.send({ 
						name: 'Weekend Grand Buffet',
						image: 'images/buffet.png',
						label: 'New',
						price: '19.99',
						description: 'Featuring . . .' })
					.set('x-access-token', token)
					.set('Content-Type', 'application/json')
					.end(function(error, res) {
						done();
					});
				} else {
					for (var i = 0, len = promotions.length; i < len; i++) {
						if(promotions[i].name == 'Weekend Grand Buffet') {
							console.log(JSON.stringify(promotions[i]));
							
							superagent.delete('http://localhost:3000/promotions/'+promotions[i]._id)
							.set('x-access-token', token)
							.set('Content-Type', 'application/json')
							.end(function(error, res) {
								if (!error) {
									var newPromotion = JSON.parse(res.text);
									console.log("Delete promotions " + JSON.stringify(newPromotion._id));	
									superagent.post('http://localhost:3000/promotions/')
									.send({ 
										name: 'Weekend Grand Buffet',
										image: 'images/buffet.png',
										label: 'New',
										price: '19.99',
										description: 'Featuring . . .' })
									.set('x-access-token', token)
									.set('Content-Type', 'application/json')
									.end(function(error, res) {
										done();
									});
								}
							});
						} else {
							done();	
						}
					}
				}
			} else {
				done();
			}
		});
	});

});