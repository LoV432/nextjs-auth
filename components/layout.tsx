import CustomHead from './head';
import Footer from './footer';
import Navbar from './navbar';
import useSWR from 'swr';

export default function Layout({ children }: { children: React.ReactNode }) {
	const fetcher = (apiURL: string) => fetch(apiURL).then((res) => res.json());
	const { data, isLoading, error } = useSWR('/api/user', fetcher);
	if (isLoading) return <></>;
	if (error) return <></>;
	return (
		<>
			<CustomHead />
			<div className="grid min-h-screen w-full grid-rows-[auto,1fr,auto]">
				<Navbar user={data.user} />
				<div>{children}</div>
				<Footer />
			</div>
		</>
	);
}
