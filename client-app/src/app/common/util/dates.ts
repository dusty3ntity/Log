import { isToday, isYesterday, isThisYear, format } from "date-fns";

export const getRelativeDate = (date: any) => {
	date = new Date(date);

	if (isToday(date)) {
		return "Today";
	}

	if (isYesterday(date)) {
		return "Yesterday";
	}

	if (isThisYear(date)) {
		return format(date, "EEEE, do MMMM");
	}

	return format(date, "EEEE, do MMMM, u");
};

export const getErrorDateTime = () => {
	return format(new Date(), "EEEE, do MMMM, ppp");
};
