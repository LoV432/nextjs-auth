import { IronSessionData } from 'iron-session';
import Link from 'next/link';
import { useState } from 'react';
import useSWR from 'swr';
import Image from 'next/image';

interface IronSessionDataFinal {
	user: {
		username: string;
		membership: number;
	};
}

export default function LoadNavbar({ user }: IronSessionData) {
	const fetcher = (apiURL: string) => fetch(apiURL).then((res) => res.json());
	const { data, isLoading, error } = useSWR('/api/user', fetcher);
	if (isLoading) return <Navbar user={user} />;
	if (error) return <></>;
	let swrUser: IronSessionData['user'] = data.user;
	return <Navbar user={swrUser} />;
}

function Navbar({ user }: IronSessionData) {
	return (
		<div className="relative flex min-h-[3rem] w-full items-center justify-center gap-9 bg-blue-800 px-5 text-white">
			<NavbarLink href="/">Home</NavbarLink>
			{!user ? <NotLoggedIn /> : <LoggedIn user={user} />}
		</div>
	);
}

function NotLoggedIn() {
	return (
		<NavbarLink styles="ml-auto" href="/login">
			Login
		</NavbarLink>
	);
}

function LoggedIn({ user }: IronSessionDataFinal) {
	const [toggleProfile, setToggleProfile] = useState(false);
	return (
		<>
			<NavbarLink href="/profile">Profile</NavbarLink>
			<div className="ml-auto">
				<div onClick={() => setToggleProfile(!toggleProfile)} className="h-9 w-9 overflow-hidden rounded-full bg-green-800 hover:cursor-pointer">
					<Image src="https://avatars.dicebear.com/api/open-peeps/75370480.38706368.svg?background=%23ffffff" alt="profile pic" width={150} height={150} className="h-full w-full object-cover" />
				</div>
				{toggleProfile ? (
					<>
						<div onClick={() => setToggleProfile(!toggleProfile)} className="absolute left-0 top-0 h-screen w-screen bg-red-800 opacity-0"></div>
						<div id="profileDropdown" className={`absolute right-1 w-56 rounded-md bg-gray-700 p-2 pb-3`}>
							<p className="m-3 border-b border-b-gray-300 border-opacity-40 pb-1 text-center">{user.username}</p>
							<p className="m-3 border-b border-b-gray-300 border-opacity-40 pb-1 text-center">Membership: {user.membership}</p>
							<div className="flex">
								<NavbarLink styles="text-center w-full" href="/api/logout">
									Logout
								</NavbarLink>
							</div>
						</div>
					</>
				) : (
					<></>
				)}
			</div>
		</>
	);
}

function NavbarLink({ children, href, styles = '' }: { children: React.ReactNode; href: string; styles?: string }) {
	return (
		<Link className={`relative -top-[.07rem] font-semibold hover:cursor-pointer ${styles}`} href={href}>
			{children}
		</Link>
	);
}
