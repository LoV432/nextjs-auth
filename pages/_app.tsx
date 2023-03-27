import '@/styles/globals.css';
import { IronSessionData } from 'iron-session';
import App, { AppContext, AppProps } from 'next/app';
import { getIronSession } from 'iron-session';
import { ironOptions } from '@/lib/iron-config';
import Layout from '@/components/layout';

type TProps = AppProps & {
	user: IronSessionData['user'];
};

export function MyApp({ Component, pageProps, user }: TProps) {
	return (
		<>
			<Layout user={user}>
				<Component {...pageProps} />
			</Layout>
		</>
	);
}

MyApp.getInitialProps = async (context: AppContext) => {
	const pageProps = await App.getInitialProps(context);
	if (context.ctx.req && context.ctx.res) {
		const { user } = await getIronSession(context.ctx.req, context.ctx.res, ironOptions);

		return {
			...pageProps,
			user
		};
	}
	return pageProps;
};

export default MyApp;
