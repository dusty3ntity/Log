import { ErrorType } from "./../../models/error";

export const isBadId = (error: any) => {
	const errorBody = error.data.errors;

	if (
		errorBody.hasOwnProperty("dictionaryId") ||
		errorBody.hasOwnProperty("itemId") ||
		errorBody.hasOwnProperty("learningListId") ||
		errorBody.hasOwnProperty("learningItemId")
	) {
		return true;
	}
	return false;
};

export const injectErrorCode = (error: any, code: ErrorType) => {
	const body = error.data.errors;
	error.data.errors = {
		code: code,
		body: body,
	};
};
