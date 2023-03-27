import CustomHead from './head';
import Footer from './footer';
import Navbar from './navbar';
import { IronSessionData } from 'iron-session';

export default function Layout({ children, user }: { children: React.ReactNode; user: IronSessionData['user'] }) {
	return (
		<>
			<CustomHead />
			<div className="grid min-h-screen w-full grid-rows-[auto,1fr,auto] bg-zinc-800 text-white">
				<Navbar user={user} />
				<div>{children}</div>
				<Footer />
			</div>
		</>
	);
}
