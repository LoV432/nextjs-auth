export default function Login() {
	async function login(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const username = (e.currentTarget.elements[0] as HTMLInputElement).value;
		const password = (e.currentTarget.elements[1] as HTMLInputElement).value;
		const response = await fetch('/api/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ username, password })
		});
		let responseJson = await response.json();
		if (responseJson.ok) {
			window.location.href = '/profile';
		}
	}
	return (
		<>
			<div className="grid h-full place-items-center">
				<form onSubmit={login} className="grid place-items-center rounded border-4 border-solid border-black bg-white p-2 text-black">
					<h1 className="p-5 pt-0 text-3xl font-bold">Login</h1>
					<input type="text" placeholder="Username" required className="mb-2 w-full max-w-xs border-2 border-solid p-2" />
					<input type="password" placeholder="Password" required className="w-full max-w-xs border-2 border-solid p-2" />
					<button className="mt-2 rounded bg-green-600 px-5 py-2 hover:bg-green-700 hover:text-white">Login</button>
				</form>
			</div>
		</>
	);
}
