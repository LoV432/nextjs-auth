import { NextApiRequest, NextApiResponse } from 'next';
import { withSessionRoute } from '../../lib/withSession';

export default withSessionRoute(loginRoute);

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'GET') {
		if (!req.session.user) {
			return res.status(200).send({ user: false });
		}
		const response = { user: req.session.user };
		return res.send(response);
	}
}
