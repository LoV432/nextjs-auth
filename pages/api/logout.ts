import { NextApiRequest, NextApiResponse } from 'next';
import { withSessionRoute } from '@/lib/withSession';

export default withSessionRoute(loginRoute);

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
	req.session.destroy();
	return res.redirect('/login');
}
