const express = require('express');
const request = require('request');
const cors = require('cors');

const app = express();

app.use(cors());

app.get('/representatives/:state',
  findRepresentativesByState,
  jsonResponse,
);

app.get('/senators/:state',
  findSenatorsByState,
  jsonResponse,
);

function jsonResponse(req, res) {
	return res.json(res.locals);
}

const url = 'http://whoismyrepresentative.com/';

function findRepresentativesByState(req, res, next) {
	const api = 'getall_reps_bystate.php';

	request(`${url}${api}?state=${req.params.state}&output=json`,
		handleApiResponse(res, next),
	);
}

function findSenatorsByState(req, res, next) {
	const api = 'getall_sens_bystate.php';

	request(`${url}${api}?state=${req.params.state}&output=json`,
		handleApiResponse(res, next),
	);
}

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

const server = app.listen(process.env.PORT || 4000, function () {
	const host = server.address().address;
	const port = server.address().port;

  console.log('API listening at http://%s:%s', host, port);
});
