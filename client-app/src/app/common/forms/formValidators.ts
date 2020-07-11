export const hasTrailingWhitespaces = (value: string): string => {
	if (value.trim().length < value.length) return "String contains trailing whitespaces.";
	return "";
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
	if (a.toLocaleLowerCase().includes(b.toLocaleLowerCase())) return "String 'a' includes string 'b'";
	return "";
};

export const isValidEmail = (value: string): string => {
	const re = /^(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@]+)*)|(.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	const result = re.test(value);

	if (result) return "";
	else return "Email is not valid";
};

export const isValidPassword = (value: string): string => {
	const re = /[0-9]/;
	const result = re.test(value);

	if (result) return "";
	else return "Password is not valid";
};
