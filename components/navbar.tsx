import Link from 'next/link';

export default function Navbar({ user }: { user: { username: string; membership: number } | false }) {
	return (
		<div className="flex min-h-[3rem] w-full gap-6 bg-blue-800 px-5 text-white">
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

function LoggedIn({ user }: { user: { username: string; membership: number } }) {
	return (
		<>
			<Link className="text-md my-auto font-semibold text-red-600 underline hover:cursor-pointer" href="/profile">
				Profile
			</Link>
			<p className="my-auto ml-auto">Username: {user.username}</p>
			<p className="my-auto ">Membership: {user.membership}</p>
			<Link className="text-md my-auto font-semibold text-red-600 underline hover:cursor-pointer" href="/api/logout">
				Logout
			</Link>
		</>
	);
}
