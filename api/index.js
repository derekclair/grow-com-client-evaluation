const express = require('express');
const request = require('request');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors());

const files = express.static(path.join(__dirname, '../../client/build'));
app.use(files);

function handleApiResponse(res, next) {
	return function (err, response, body) {
		if (err || body[0] === '<') {
			res.locals = {
				success: false,
				error: err || 'Invalid request. Please check your state variable.',
			};
			return next();
		}
		res.locals = {
			success: true,
			results: JSON.parse(body).results,
		};
		return next();
	};
}

function jsonResponse(req, res) {
	return res.json(res.locals);
}

const url = 'http://whoismyrepresentative.com/';

function findRepresentativesByState(req, res, next) {
	const api = 'getall_reps_bystate.php';

	request(`${url}${api}?state=${req.params.state}&output=json`, handleApiResponse(res, next));
}

app.get('/representatives/:state', findRepresentativesByState, jsonResponse);

function findSenatorsByState(req, res, next) {
	const api = 'getall_sens_bystate.php';

	request(`${url}${api}?state=${req.params.state}&output=json`,	handleApiResponse(res, next));
}

app.get('/senators/:state', findSenatorsByState, jsonResponse);

app.use('*', files);
app.set('port', (process.env.PORT || 3001));

const server = app.listen(app.get('port'), function () {
	const host = server.address().address;
	const port = server.address().port;

  console.log('API listening at http://%s:%s', host, port);
});
