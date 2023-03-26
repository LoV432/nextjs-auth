import { IronSessionData } from 'iron-session';
import Link from 'next/link';
import { useState } from 'react';
import useSWR from 'swr';

interface IronSessionDataFinal {
	user: {
		username: string;
		membership: number;
	};
}

export default function LoadNavbar() {
	const fetcher = (apiURL: string) => fetch(apiURL).then((res) => res.json());
	const { data, isLoading, error } = useSWR('/api/user', fetcher);
	if (isLoading) return <Navbar user={undefined} />;
	if (error) return <></>;
	const { user }: IronSessionData = data;
	return <Navbar user={user} />;
}

function Navbar({ user }: IronSessionData) {
	return (
		<div className="relative flex min-h-[3rem] w-full gap-6 bg-blue-800 px-5 text-white">
			<Link className="text-md my-auto font-semibold text-red-600 underline hover:cursor-pointer" href="/">
				Home
			</Link>
			{!user ? <NotLoggedIn /> : <LoggedIn user={user} />}
		</div>
	);
}

function NotLoggedIn() {
	return (
		<Link className="text-md my-auto ml-auto font-semibold text-red-600 underline hover:cursor-pointer" href="/login">
			Login
		</Link>
	);
}

function LoggedIn({ user }: IronSessionDataFinal) {
	const [toggleProfile, setToggleProfile] = useState(false);
	return (
		<>
			<Link className="text-md my-auto font-semibold text-red-600 underline hover:cursor-pointer" href="/profile">
				Profile
			</Link>
			<div className="my-auto ml-auto">
				<div onClick={() => setToggleProfile(!toggleProfile)} className="h-9 w-9 overflow-hidden rounded-full bg-green-800 hover:cursor-pointer">
					<img src="https://avatars.dicebear.com/api/open-peeps/75370480.38706368.svg?background=%23ffffff"></img>
				</div>
				{toggleProfile ? (
					<>
						<div onClick={() => setToggleProfile(!toggleProfile)} className="absolute left-0 top-0 h-screen w-screen bg-red-800 opacity-0"></div>
						<div id="profileDropdown" className={`absolute right-1 w-56 rounded-md bg-gray-700 p-2 pb-3`}>
							<p className="m-3 border-b border-b-gray-300 border-opacity-40 pb-1 text-center">{user.username}</p>
							<p className="m-3 border-b border-b-gray-300 border-opacity-40 pb-1 text-center">Membership: {user.membership}</p>
							<div className="flex items-center">
								<Link className="text-md w-full text-center font-semibold text-red-600 underline hover:cursor-pointer" href="/api/logout">
									Logout
								</Link>
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
