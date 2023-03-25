import { IronSessionData } from 'iron-session';
import Link from 'next/link';
import { useState } from 'react';

interface IronSessionDataFinal {
	user: {
		username: string;
		membership: number;
	};
}

export default function Navbar({ user }: IronSessionData) {
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
	return (
		<>
			<Link className="text-md my-auto font-semibold text-red-600 underline hover:cursor-pointer" href="/profile">
				Profile
			</Link>
			<Profile user={user} />
		</>
	);
}

function Profile({ user }: IronSessionDataFinal) {
	const [toggleProfile, setToggleProfile] = useState(false);

	return (
		<div className="my-auto ml-auto">
			<div onClick={() => setToggleProfile(!toggleProfile)} className="h-9 w-9 overflow-hidden rounded-full bg-green-800 hover:cursor-pointer">
				<img src="https://avatars.dicebear.com/api/open-peeps/75370480.38706368.svg?background=%23ffffff"></img>
			</div>
			{toggleProfile ? (
				<>
					<div onClick={() => setToggleProfile(!toggleProfile)} className="absolute left-0 top-0 h-screen w-screen bg-red-800 opacity-0"></div>
					<div id="profileDropdown" className={`absolute right-1 w-56 rounded-md bg-gray-700 p-2 pb-3`}>
						<p className="pb-1">Username: {user.username}</p>
						<p className="pb-1">Membership: {user.membership}</p>
						<Link className="text-md font-semibold text-red-600 underline hover:cursor-pointer" href="/api/logout">
							Logout
						</Link>
					</div>
				</>
			) : (
				<></>
			)}
		</div>
	);
}
