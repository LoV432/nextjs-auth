export default function Footer() {
	return (
		<div className="pl-3 pb-2">
			&copy; {new Date().getFullYear()} {process.env.NEXT_PUBLIC_COPYRIGHT_NAME}. All rights reserved.
		</div>
	);
}
