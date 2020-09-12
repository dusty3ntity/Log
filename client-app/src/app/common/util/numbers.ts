export const shortenNumber = (number: number, limit: number): string => {
	if (number < limit) {
		return number.toString();
	}

	return Math.floor(number / limit) + "k";
};
