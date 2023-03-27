import { NextApiRequest, NextApiResponse } from 'next';

const authUsers: { [key: string]: any } = {
	user1: {
		username: 'user1',
		password: 'password1',
		membership: '5'
	},
	user2: {
		username: 'user2',
		password: 'password2',
		membership: '10'
	}
};

export default function authRoute(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'POST') {
		const { username, password }: { username: string; password: string } = req.body;
		try {
			if (username in authUsers) {
				if (authUsers[username].password === password) {
					return res.send({ success: true, username: authUsers[username].username, membership: authUsers[username].membership });
				}
			}
		} catch (error) {
			return res.status(403).send({ failed: true });
		}
		return res.status(403).send({ failed: true });
	}
	return res.redirect('/login');
}
