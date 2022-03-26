import Link from "next/link";
import { ReactElement } from "react";

interface NextLinkInterface {
	href: string;
	className: string;
	children: ReactElement<HTMLDivElement, string>;
}

function NextLink(props: NextLinkInterface) {
	const { href, children, ...rest } = props;
	return (
		<Link href={href} shallow={true}>
			<a {...rest}>{children}</a>
		</Link>
	);
}

export default NextLink;
