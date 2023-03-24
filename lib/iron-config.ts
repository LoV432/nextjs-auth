export const ironOptions = {
	cookieName: process.env.IRON_COOKIE_NAME,
	password: process.env.IRON_PASSWORD,
	ttl: 600,
	cookieOptions: {
		secure: process.env.NODE_ENV === 'production' ? true : false
	}
};
