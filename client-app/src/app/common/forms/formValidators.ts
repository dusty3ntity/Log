export const fullTrim = (value: string): string => {
	return value.replace(/\s+/g, " ").trim();
};

export const minLength = (value: string, length: number): string => {
	if (value.length < length) return "String is too short.";
	return "";
};

export const maxLength = (value: string, length: number): string => {
	if (value.length > length) return "String is too long.";
	return "";
};

export const includes = (a: string, b: string): string => {
	if (!a || !b || a.length < b.length) return "";
	if (a.toLocaleLowerCase().includes(b.toLocaleLowerCase())) return "String 'a' includes string 'b'.";
	return "";
};

export const isValidEmail = (value: string): string => {
	const re = /^(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@]+)*)|(.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	const result = re.test(value);

	if (result) return "";
	else return "Email is not valid.";
};

export const isValidPassword = (value: string): string => {
	const re = /[0-9]/;
	const result = re.test(value);

	if (result) return "";
	else return "Password is not valid.";
};

export const isValidUsername = (value: string): string => {
	const re1 = /^[A-Za-z]/;
	let result = re1.test(value);

	if (!result) return "Username must begin with a letter.";

	const re2 = /^[a-zA-Z0-9]{2,}$/;
	result = re2.test(value);

	if (result) return "";
	else return "Username must contain only alphanumeric.";
};
