import Koa from 'koa';
import Router from '@koa/router';
import cors from '@koa/cors';
import fetch from 'isomorphic-fetch';

const app = new Koa();
const router = new Router();
const port = 3011;

app.use(cors({origin: '*'}));

router.get('/', async(ctx) => {
	ctx.body = 'hello!';
});

router.get('/random', async(ctx, next) => {	
	const res = await fetch('https://dog.ceo/api/breeds/image/random')
		.then( function(response) {
			if (response.status >= 400) {
				throw new Error("Bad response from server");
			}
			return response.json();
		})
		
	ctx.body = res;
});

router.get('/image/:name', async(ctx, next) => {
	console.log(ctx.params.name)
	const res = await fetch(`https://dog.ceo/api/breed/${ctx.params.name}/images/random`)
		.then( function(response) {
			if (response.status >= 400) {
				throw new Error("Bad response from server");
			}
			return response.json();
		})
		
	ctx.body = res;
});

app.use(async (ctx, next) => {
	await next();
	const rt = ctx.response.get('X-Response-Time');
	console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

app.use(async (ctx, next) => {
	const start = Date.now();
	await next();
	const ms = Date.now() - start;
	ctx.set('X-Response-Time', `${ms}ms`);
});

app.use(router.routes());

app.listen(port, () => {
	console.log(`Server running on http://localhost:${port}`);
});
