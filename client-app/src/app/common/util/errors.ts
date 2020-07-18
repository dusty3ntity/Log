import jwt from "jsonwebtoken";

import { ErrorType } from "../../models/error";
import { getErrorDateTime } from "./dates";

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

export const createCustomError = (error: any) => {
	const status = error.status;
	const errorCode = error.data?.errors.code;
	const errorBody = error.data?.errors.body;

	const url = error.config.baseURL + error.config.url;
	const method = error.config.method;
	const authorizationToken = error.config.headers.Authorization?.slice(-6);

	const moment = getErrorDateTime();

	const token = window.localStorage.getItem("jwt");
	let username;

	if (token) {
		username = jwt.decode(token, { json: true, complete: true })?.payload?.nameid;
	}

	const customError = {
		status: status,
		code: errorCode,
		body: errorBody,
		url: url,
		method: method,
		token: authorizationToken,
		username: username,
		moment: moment,
	};

	return customError;
};
