import axios, { AxiosResponse } from "axios";
import { history } from "../..";

import { IItem, IEditItem, INewItem } from "../models/item";
import { ILearningList, ILearningItem, ILearningItemAnswer, ILearningItemResult } from "./../models/learning";
import { CustomError, ErrorType } from "./../models/error";
import { createNotification } from "../common/util/notifications";
import { NotificationType } from "./../models/error";
import { isBadId, injectErrorCode } from "./../common/util/errorTypeResolver";

axios.defaults.baseURL = "http://localhost:5000/api/dictionaries/5F15A492-601B-4D6A-8933-939806C07717";

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

const Items = {
	list: (): Promise<IItem[]> => axios.get("/items").then(responseBody),
	details: (id: string): Promise<IItem> => requests.get(`/items/${id}`).then(responseBody),
	create: (item: INewItem) => requests.post("/items", item).then(responseBody),
	update: (id: string, item: IEditItem) => requests.put(`/items/${id}`, item),
	delete: (id: string) => requests.del(`/items/${id}`),
	star: (id: string) => requests.post(`/items/${id}/star`),
	unstar: (id: string) => requests.post(`/items/${id}/unstar`),
};

const LearningLists = {
	get: (): Promise<ILearningList> => axios.post("/learningList/").then(responseBody),
	getNextItem: (id: string): Promise<ILearningItem> => axios.get(`/learningList/${id}/nextItem`).then(responseBody),
	checkItem: (id: string, answer: ILearningItemAnswer): Promise<ILearningItemResult> =>
		axios.post(`/learningList/${id}/nextItem`, answer).then(responseBody),
	startOver: (id: string) => axios.post(`/learningList/${id}/startOver`),
};

export default {
	Items,
	LearningLists,
};
