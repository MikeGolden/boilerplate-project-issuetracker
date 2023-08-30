/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       (if additional are added, keep them at the very end!)
*/

var chaiHttp = require('chai-http');
var chai = require('chai');
var assert = chai.assert;
var server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function () {

	var _id1;
	var _id2;

	suite('POST /api/issues/{project} => object with issue data', function () {

		test('Every field filled in', function (done) {
			chai.request(server)
				.post('/api/issues/test')
				.send({
					issue_title: 'Title',
					issue_text: 'Text',
					created_by: 'Functional Test - Every field filled in',
					assigned_to: 'Chai and Mocha',
					status_text: 'In QA'
				})
				.end(function (err, res) {
					assert.equal(res.status, 200);
					//fill me in too!
					assert.isObject(res.body);
					assert.property(res.body, '_id');
					assert.property(res.body, 'project');
					assert.property(res.body, 'issue_title');
					assert.property(res.body, 'issue_text');
					assert.property(res.body, 'created_on');
					assert.property(res.body, 'updated_on');
					assert.property(res.body, 'created_by');
					assert.property(res.body, 'assigned_to');
					assert.property(res.body, 'status_text');
					assert.property(res.body, 'open');
					assert.notEqual(res.body._id, '');
					assert.equal(res.body.project, 'test');
					assert.equal(res.body.issue_title, 'Title');
					assert.equal(res.body.issue_text, 'Text');
					assert.equal(res.body.created_by, 'Functional Test - Every field filled in');
					assert.equal(res.body.assigned_to, 'Chai and Mocha');
					assert.equal(res.body.status_text, 'In QA');
					assert.isBoolean(res.body.open, true);
					assert.equal(res.body.open, true);
					_id1 = res.body._id;
					done();
				});
		});

		test('Required fields filled in', function (done) {
			chai.request(server)
				.post('/api/issues/test')
				.send({
					issue_title: 'Title 2',
					issue_text: 'Text 2',
					created_by: 'Required fields filled in',
				})
				.end(function (err, res) {
					assert.equal(res.status, 200);
					assert.isObject(res.body);
					assert.property(res.body, '_id');
					assert.property(res.body, 'project');
					assert.property(res.body, 'issue_title');
					assert.property(res.body, 'issue_text');
					assert.property(res.body, 'created_on');
					assert.property(res.body, 'updated_on');
					assert.property(res.body, 'created_by');
					assert.property(res.body, 'assigned_to');
					assert.property(res.body, 'status_text');
					assert.property(res.body, 'open');
					assert.notEqual(res.body._id, '');
					assert.equal(res.body.project, 'test');
					assert.equal(res.body.issue_title, 'Title 2');
					assert.equal(res.body.issue_text, 'Text 2');
					assert.equal(res.body.created_by, 'Required fields filled in');
					assert.equal(res.body.assigned_to, '');
					assert.equal(res.body.status_text, '');
					assert.isBoolean(res.body.open, true);
					assert.equal(res.body.open, true);
					_id2 = res.body._id;
					done();
				});
		});

		test('Missing required fields', function (done) {
			chai.request(server)
				.post('/api/issues/test')
				.send({})
				.end(function (err, res) {
					assert.equal(res.status, 200);
					assert.isObject(res.body);
					assert.property(res.body, 'error');
					assert.equal(res.body.error, 'required field(s) missing');
					done();
				});
		});

	});

	suite('GET /api/issues/{project} => Array of objects with issue data', function () {

		test('No filter', function (done) {
			chai.request(server)
				.get('/api/issues/test')
				.query({})
				.end(function (err, res) {
					assert.equal(res.status, 200);
					assert.isArray(res.body);
					assert.property(res.body[0], '_id');
					assert.property(res.body[0], 'issue_title');
					assert.property(res.body[0], 'issue_text');
					assert.property(res.body[0], 'created_on');
					assert.property(res.body[0], 'updated_on');
					assert.property(res.body[0], 'created_by');
					assert.property(res.body[0], 'assigned_to');
					assert.property(res.body[0], 'status_text');
					assert.property(res.body[0], 'open');
					done();
				});
		});

		test('One filter', function (done) {
			chai.request(server)
				.get('/api/issues/test')
				.query({ open: true })
				.end(function (err, res) {
					assert.equal(res.status, 200);
					assert.isArray(res.body);
					assert.property(res.body[0], '_id');
					assert.property(res.body[0], 'issue_title');
					assert.property(res.body[0], 'issue_text');
					assert.property(res.body[0], 'created_on');
					assert.property(res.body[0], 'updated_on');
					assert.property(res.body[0], 'created_by');
					assert.property(res.body[0], 'assigned_to');
					assert.property(res.body[0], 'status_text');
					assert.property(res.body[0], 'open');
					assert.isBoolean(res.body[0].open, true);
					assert.equal(res.body[0].open, true);
					done();
				});
		});

		test('Multiple filters (test for multiple fields you know will be in the db for a return)', function (done) {
			chai.request(server)
				.get('/api/issues/test')
				.query({ issue_title: 'Title', issue_text: 'Text', open: true })
				.end(function (err, res) {
					assert.equal(res.status, 200);
					assert.isArray(res.body);
					assert.property(res.body[0], '_id');
					assert.property(res.body[0], 'issue_title');
					assert.property(res.body[0], 'issue_text');
					assert.property(res.body[0], 'created_on');
					assert.property(res.body[0], 'updated_on');
					assert.property(res.body[0], 'created_by');
					assert.property(res.body[0], 'assigned_to');
					assert.property(res.body[0], 'status_text');
					assert.property(res.body[0], 'open');
					assert.equal(res.body[0].issue_title, 'Title');
					assert.equal(res.body[0].issue_text, 'Text');
					assert.isBoolean(res.body[0].open, true);
					assert.equal(res.body[0].open, true);
					done();
				});
		});

	});

	suite('PUT /api/issues/{project} => text', function () {

		test('One field to update', function (done) {
			chai.request(server)
				.put('/api/issues/test')
				.send({ _id: _id1, issue_title: 'Title (updated)' })
				.end(function (err, res) {
					assert.equal(res.status, 200);
					assert.equal(res.body.result, 'successfully updated');
					done();
				});
		});

		test('Multiple fields to update', function (done) {
			chai.request(server)
				.put('/api/issues/test')
				.send({ _id: _id2, issue_title: 'Title 2 (updated)', issue_text: 'Text 2 (updated)', open: false })
				.end(function (err, res) {
					assert.equal(res.status, 200);
					assert.equal(res.body.result, 'successfully updated');
					done();
				});
		});

		test('Update an issue with missing _id', function (done) {
			chai.request(server)
				.put('/api/issues/test')
				.send({ open: false })
				.end(function (err, res) {
					assert.equal(res.status, 200);
					assert.isObject(res.body);
					assert.property(res.body, 'error');
					assert.equal(res.body.error, 'missing _id');
					done();
				});
		});

		test('No update field sent', function (done) {
			chai.request(server)
				.put('/api/issues/test')
				.send({ _id: _id1 })
				.end(function (err, res) {
					assert.equal(res.status, 200);
					assert.isObject(res.body);
					assert.property(res.body, 'error');
					assert.equal(res.body.error, 'no update field(s) sent');
					done();
				});
		});

		test('Update an issue with an invalid _id', function (done) {
			chai.request(server)
				.put('/api/issues/test')
				.send({ _id: '000000000000000000000000', open: false })
				.end(function (err, res) {
					assert.equal(res.status, 200);
					assert.isObject(res.body);
					assert.property(res.body, 'error');
					assert.equal(res.body.error, 'could not update');
					assert.equal(res.body._id, '000000000000000000000000');
					done();
				});
		});

	});

	suite('DELETE /api/issues/{project} => text', function () {

		test('Valid _id', function (done) {
			chai.request(server)
				.delete('/api/issues/test')
				.send({ _id: _id2 })
				.end(function (err, res) {
					assert.equal(res.status, 200);
					assert.equal(res.body.result, 'successfully deleted');
					assert.equal(res.body._id, _id2);
					done();
				});
		});

		test('Invalid _id', function (done) {
			chai.request(server)
				.delete('/api/issues/test')
				.send({ _id: '000000000000000000000000' })
				.end(function (err, res) {
					assert.equal(res.status, 200);
					assert.isObject(res.body);
					assert.property(res.body, 'error');
					assert.equal(res.body.error, 'could not delete');
					assert.equal(res.body._id, '000000000000000000000000');
					done();
				});
		});

		test('Missing _id', function (done) {
			chai.request(server)
				.delete('/api/issues/test')
				.send({})
				.end(function (err, res) {
					assert.equal(res.status, 200);
					assert.isObject(res.body);
					assert.property(res.body, 'error');
					assert.equal(res.body.error, 'missing _id');
					done();
				});
		});

	});

});