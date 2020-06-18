export const hasTrailingWhitespaces = (value: string): string => {
	if (value.trim().length < value.length)
		return "String contains trailing whitespaces."
	return "";
}

export const minLength = (value: string, length: number) => {
	if (value.length < length)
		return "String is too short."
	return "";
}

export const maxLength = (value: string, length: number): string => {
	if (value.length > length)
		return "String is too long."
	return "";
}

export const includes = (a: string, b: string) => {
	if (!a || !b || a.length < b.length)
		return "";
	if (a.toLocaleLowerCase().includes(b.toLocaleLowerCase()))
		return "String 'a' includes string 'b'";
	return "";
}