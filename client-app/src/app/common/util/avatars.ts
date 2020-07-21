import { CSSProperties } from "react";

export const getInitials = (username: string) => {
	const whitespaceIndex = username.indexOf(" ");

	if (whitespaceIndex === -1) {
		return username.charAt(0);
	}

	return username.charAt(0) + username.charAt(whitespaceIndex + 1);
};

export const getStyles = (username: string) => {
	let styles: CSSProperties = avatarStyles[username.charCodeAt(0) % 14];
	if (username.charAt(0) === username.charAt(0).toUpperCase()) {
		styles = { ...styles, fontSize: "1.2rem" };
	}

	return styles;
};

const avatarStyles = [
	{
		backgroundColor: "#54EFA5",
		color: "#824E4E",
	},
	{
		backgroundColor: "#84E2EF",
		color: "#695454",
	},
	{
		backgroundColor: "#CCD5EF",
		color: "#824E4E",
	},
	{
		backgroundColor: "#ECCCEF",
		color: "#824E4E",
	},
	{
		backgroundColor: "#E7E4EF",
		color: "#825959",
	},
	{
		backgroundColor: "#E6E3B3",
		color: "#825959",
	},
	{
		backgroundColor: "#42F0E0",
		color: "#824E4E",
	},
	{
		backgroundColor: "#ABDDD6",
		color: "#695454",
	},
	{
		backgroundColor: "#DDD9D6",
		color: "#695C5C",
	},
	{
		backgroundColor: "#CDDD94",
		color: "#824E4E",
	},
	{
		backgroundColor: "#DFD5F7",
		color: "#695C5C",
	},
	{
		backgroundColor: "#FFFA8F",
		color: "#826868",
	},
	{
		backgroundColor: "#CDD6DD",
		color: "#824E4E",
	},
	{
		backgroundColor: "#A4E6A3",
		color: "#826868",
	},
];
