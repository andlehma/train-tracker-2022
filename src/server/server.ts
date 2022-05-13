import express from 'express';
import { CtaService } from './ctaService';

const app = express();
const port = process.env.PORT || 3000;
const _ctaService = new CtaService();

app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept'
	);
	next();
});

app.get('/api/:id', (req, res, next) => {
	const intId = parseInt(req.params.id);
	if (isNaN(intId)) res.status(422).send('Invalid stop id');
	_ctaService
		.getArrivals(intId)
		.then((arrivals) => res.send(arrivals))
		.catch((error) => next(error));
});

app.listen(port, () => {
	console.log(`Listening on port ${port}.`);
});
