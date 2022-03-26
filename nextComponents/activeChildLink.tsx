import { useRouter } from "next/router";
import PropTypes from "prop-types";
import Link from "next/link";
import React, { Children, ReactElement } from "react";

interface ActiveInterface {
	as?: string;
	href: string;
	className: string;
	children: ReactElement<HTMLAnchorElement, string>;
	activeClassName: string;
}

const ActiveChildLink = ({ children, activeClassName, ...props }: ActiveInterface) => {
	const { asPath } = useRouter();
	const child = Children.only(children);
	const childClassName = props.className || "";

	// pages/index.tsx will be matched via props.href
	// pages/about.tsx will be matched via props.href
	//pages/[slug].tsx will be matched via props.as
	const className: string =
		asPath.includes(props.href) || asPath === props.as
			? activeClassName.trim()
			: childClassName;

	return <Link {...props}>{React.cloneElement(child, { className: className })}</Link>;
};

ActiveChildLink.propTypes = {
	activeClassName: PropTypes.string.isRequired
};

export default ActiveChildLink;
