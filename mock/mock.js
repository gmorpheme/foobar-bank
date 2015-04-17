'use strict';

// https://github.com/xetorthio/shmock

var shmock = require('shmock'),
	port = 8100,
	mock = shmock(port);

mock.post('/api/session/').persist().reply(201, require('./mock_data/create-session'));
mock.get('/api/session/0394oiljeljkdrd/transfer/').persist().reply(200, require('./mock_data/get-transfer'));
mock.post('/api/session/0394oiljeljkdrd/transfer/').persist().reply(200);