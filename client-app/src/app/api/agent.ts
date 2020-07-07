import { IDictionary, INewDictionary } from "./../models/dictionary";
import axios, { AxiosResponse } from "axios";
import { history } from "../..";

import { IItem, IEditItem, INewItem } from "../models/item";
import { ILearningList, ILearningItem, ILearningItemAnswer, ILearningItemResult } from "./../models/learning";
import { CustomError, ErrorType } from "./../models/error";
import { createNotification } from "../common/util/notifications";
import { NotificationType } from "./../models/error";
import { isBadId, injectErrorCode } from "./../common/util/errorTypeResolver";

axios.defaults.baseURL = "http://localhost:5000/api";

axios.interceptors.response.use(undefined, (error) => {
	console.log(error.response);

	if (error.message === "Network Error" && !error.response) {
		createNotification(NotificationType.Error, {
			title: "Network error!",
			message: "The server isn't responding... Check your internet connection or contact the administrator.",
		});
		throw new CustomError(error.response, ErrorType.ConnectionRefused);
	} else if (error.response.status === 400 && !error.response.data.errors.code) {
		if (isBadId(error.response)) {
			injectErrorCode(error.response, ErrorType.BadId);
			history.push("/404");
			createNotification(NotificationType.Error, {
				title: "Wrong id!",
				message: "Please, check the id in the address bar or contact the administrator.",
				errors: error.response,
			});
		} else {
			injectErrorCode(error.response, ErrorType.DefaultValidationError);
			createNotification(NotificationType.UnknownError, {
				title: "Validation error!",
				errors: error.response,
			});
		}
		throw new CustomError(error.response, error.response.data.errors.code);
	} else if (error.response.status === 404) {
		if (!error.response.data.errors.code) {
			injectErrorCode(error.response, ErrorType.DefaultNotFound);
		}
		const code = error.response.data.errors.code;
		if (code === ErrorType.LearningListNotFound && code === ErrorType.LearningItemNotFound) {
			throw new CustomError(error.response, error.response.data.errors.code);
		}
		if (code === ErrorType.DictionaryNotFound) {
			createNotification(NotificationType.Error, {
				title: "Not found!",
				message: "Dictionary not found! Please, refresh the page or contact the administrator.",
				errors: error.response,
			});
		} else if (code === ErrorType.ItemNotFound) {
			createNotification(NotificationType.Error, {
				title: "Not found!",
				message: "Item not found! Please, refresh the page or contact the administrator.",
				errors: error.response,
			});
		} else {
			createNotification(NotificationType.UnknownError, {
				title: "Not found!",
				errors: error.response,
			});
		}
		history.push("/404");
		throw new CustomError(error.response, error.response.data.errors.code);
	} else if (error.response.status === 500) {
		if (!error.response.data.errors.code) {
			injectErrorCode(error.response, ErrorType.DefaultServerError);
		}
		createNotification(NotificationType.Error, {
			title: "Server error!",
			message: "A server error occurred. Contact the administrator and make him do something!",
		});
		throw new CustomError(error.response, error.response.data.errors.code);
	}

	throw new CustomError(error.response, error.response.data.errors.code ?? ErrorType.Unknown);
});

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
	get: (url: string) => axios.get(url).then(responseBody),
	post: (url: string, body?: {}) => axios.post(url, body).then(responseBody),
	put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
	del: (url: string) => axios.delete(url).then(responseBody),
};

const Dictionaries = {
	list: (): Promise<IDictionary[]> => axios.get("/dictionaries/").then(responseBody),
	details: (id: string): Promise<IDictionary> => axios.get(`/dictionaries/${id}`).then(responseBody),
	create: (dictionary: INewDictionary) => axios.post("/dictionaries/", dictionary).then(responseBody),
	delete: (id: string) => requests.del(`/dictionaries/${id}`),
	setMain: (id: string) => requests.post(`/dictionaries/${id}/setMain`),
};

const Items = {
	list: (dictionaryId: string): Promise<IItem[]> =>
		axios.get(`/dictionaries/${dictionaryId}/items`).then(responseBody),
	details: (dictionaryId: string, itemId: string): Promise<IItem> =>
		requests.get(`/dictionaries/${dictionaryId}/items/${itemId}`).then(responseBody),
	create: (dictionaryId: string, item: INewItem) =>
		requests.post(`/dictionaries/${dictionaryId}/items`, item).then(responseBody),
	update: (dictionaryId: string, itemId: string, item: IEditItem) =>
		requests.put(`/dictionaries/${dictionaryId}/items/${itemId}`, item),
	delete: (dictionaryId: string, itemId: string) => requests.del(`/dictionaries/${dictionaryId}/items/${itemId}`),
	star: (dictionaryId: string, itemId: string) => requests.post(`/dictionaries/${dictionaryId}/items/${itemId}/star`),
	unstar: (dictionaryId: string, itemId: string) =>
		requests.post(`/dictionaries/${dictionaryId}/items/${itemId}/unstar`),
};

const LearningLists = {
	get: (dictionaryId: string): Promise<ILearningList> =>
		axios.post(`/dictionaries/${dictionaryId}/learningList/`).then(responseBody),
	getNextItem: (dictionaryId: string, learningListId: string): Promise<ILearningItem> =>
		axios.get(`/dictionaries/${dictionaryId}/learningList/${learningListId}/nextItem`).then(responseBody),
	checkItem: (
		dictionaryId: string,
		learningListId: string,
		answer: ILearningItemAnswer
	): Promise<ILearningItemResult> =>
		axios.post(`/dictionaries/${dictionaryId}/learningList/${learningListId}/nextItem`, answer).then(responseBody),
	startOver: (dictionaryId: string, learningListId: string) =>
		axios.post(`/dictionaries/${dictionaryId}/learningList/${learningListId}/startOver`),
};

export default {
	Dictionaries,
	Items,
	LearningLists,
};
