var app = require('./server');
var assert = require('assert');
var superagent = require('superagent');
 
describe('server', function() {
	var server;
    beforeEach(function() {
		server = app.listen(3000);
    });
 
    afterEach(function() {
		server.close();
    });
 
    it('Test Dishes API', function(done) {
		superagent.get('http://localhost:3000/dishes/')
		.end(function(error, res) {
			assert.ifError(error);
            assert.equal(res.status, 200);
            assert.equal(res.text, "Will send all the dishes to you!");
		});
		superagent.post('http://localhost:3000/dishes/')
		.send({ name: 'Nam', description: 'handsome' })
		.end(function(error, res) {
			assert.ifError(error);
            assert.equal(res.status, 200);
            assert.equal(res.text, "Will add the dish: Nam with details: handsome");
		});
		superagent.del('http://localhost:3000/dishes/')
		.end(function(error, res) {
			assert.ifError(error);
            assert.equal(res.status, 200);
            assert.equal(res.text, "Deleting all dishes");
		});
		superagent.get('http://localhost:3000/dishes/nam')
		.end(function(error, res) {
			assert.ifError(error);
            assert.equal(res.status, 200);
            assert.equal(res.text, "Will send details of the dish: nam to you!");
		});
		superagent.put('http://localhost:3000/dishes/nam')
		.send({ name: 'Nam', description: 'handsome' })
		.end(function(error, res) {
			assert.ifError(error);
            assert.equal(res.status, 200);
            assert.equal(res.text, "Updating the dish: nam\nWill update the dish: Nam with details: handsome");
			
		});
		superagent.del('http://localhost:3000/dishes/nam')
		.end(function(error, res) {
			assert.ifError(error);
            assert.equal(res.status, 200);
            assert.equal(res.text, "Deleting dish: nam");
			done();
		});
    });
	
	it('Test Promotions API', function(done) {
		superagent.get('http://localhost:3000/promotions/')
		.end(function(error, res) {
			assert.ifError(error);
            assert.equal(res.status, 200);
            assert.equal(res.text, "Will send all the promotions to you!");
		});
		superagent.post('http://localhost:3000/promotions/')
		.send({ name: 'Nam', description: 'handsome' })
		.end(function(error, res) {
			assert.ifError(error);
            assert.equal(res.status, 200);
            assert.equal(res.text, "Will add the promotion: Nam with details: handsome");
		});
		superagent.del('http://localhost:3000/promotions/')
		.end(function(error, res) {
			assert.ifError(error);
            assert.equal(res.status, 200);
            assert.equal(res.text, "Deleting all promotions");
		});
		superagent.get('http://localhost:3000/promotions/nam')
		.end(function(error, res) {
			assert.ifError(error);
            assert.equal(res.status, 200);
            assert.equal(res.text, "Will send details of the promotion: nam to you!");
		});
		superagent.put('http://localhost:3000/promotions/nam')
		.send({ name: 'Nam', description: 'handsome' })
		.end(function(error, res) {
			assert.ifError(error);
            assert.equal(res.status, 200);
            assert.equal(res.text, "Updating the promotion: nam\nWill update the promotion: Nam with details: handsome");
			
		});
		superagent.del('http://localhost:3000/promotions/nam')
		.end(function(error, res) {
			assert.ifError(error);
            assert.equal(res.status, 200);
            assert.equal(res.text, "Deleting promotion: nam");
			done();
		});
    });
	
	it('Test Leadership API', function(done) {
		superagent.get('http://localhost:3000/leadership/')
		.end(function(error, res) {
			assert.ifError(error);
            assert.equal(res.status, 200);
            assert.equal(res.text, "Will send all the leaders to you!");
		});
		superagent.post('http://localhost:3000/leadership/')
		.send({ name: 'Nam', description: 'handsome' })
		.end(function(error, res) {
			assert.ifError(error);
            assert.equal(res.status, 200);
            assert.equal(res.text, "Will add the leader: Nam with details: handsome");
		});
		superagent.del('http://localhost:3000/leadership/')
		.end(function(error, res) {
			assert.ifError(error);
            assert.equal(res.status, 200);
            assert.equal(res.text, "Deleting all leaders");
		});
		superagent.get('http://localhost:3000/leadership/nam')
		.end(function(error, res) {
			assert.ifError(error);
            assert.equal(res.status, 200);
            assert.equal(res.text, "Will send details of the leader: nam to you!");
		});
		superagent.put('http://localhost:3000/leadership/nam')
		.send({ name: 'Nam', description: 'handsome' })
		.end(function(error, res) {
			assert.ifError(error);
            assert.equal(res.status, 200);
            assert.equal(res.text, "Updating the leader: nam\nWill update the leader: Nam with details: handsome");
			
		});
		superagent.del('http://localhost:3000/leadership/nam')
		.end(function(error, res) {
			assert.ifError(error);
            assert.equal(res.status, 200);
            assert.equal(res.text, "Deleting leader: nam");
			done();
		});
    });
});