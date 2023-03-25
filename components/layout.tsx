import CustomHead from './head';
import Footer from './footer';
import Navbar from './navbar';

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<CustomHead />
			<div className="grid min-h-screen w-full grid-rows-[auto,1fr,auto]">
				<Navbar />
				<div>{children}</div>
				<Footer />
			</div>
		</>
	);
}
