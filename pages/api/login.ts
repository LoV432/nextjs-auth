import { NextApiRequest, NextApiResponse } from 'next';
import { withSessionRoute } from '@/lib/withSession';

export default withSessionRoute(loginRoute);

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'POST') {
		const { username, password } = req.body;

		try {
			const response = await fetch(process.env.AUTH_LINK, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ username, password })
			});
			let responseJson = await response.json();
			if (responseJson.success) {
				req.session.user = {
					username: responseJson.username,
					membership: responseJson.membership
				};
				await req.session.save();
				return res.send({ ok: true });
			}
		} catch (error) {
			return res.status(403).send({ failed: true });
		}
		return res.status(403).send({ failed: true });
	}
	return res.redirect('/login');
}
