import { CorsOptions } from 'cors';

const cors = require('cors');
const addCors = () => {
	const options: CorsOptions = {
			allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'X-Access-Token'],
			credentials: true,
			methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
			origin: '*',
			preflightContinue: false, 
		};

	return cors(options);
}

export default addCors;