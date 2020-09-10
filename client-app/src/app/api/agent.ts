import axios, { AxiosResponse } from "axios";
import { history } from "../..";

import { IItem, IEditItem, INewItem } from "../models/item";
import { ILearningList, ILearningItem, ILearningItemAnswer, ILearningItemResult } from "./../models/learning";
import { CustomError, ErrorType } from "./../models/error";
import { createNotification } from "../common/components/notifications";
import { NotificationType } from "./../models/error";
import { IUser, ILoginUser } from "./../models/user";
import { IDictionary, INewDictionary, IEditDictionary } from "./../models/dictionary";
import { isBadId, injectErrorCode } from "./../common/util/errors";
import { IItemsEnvelope } from "./../models/item";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.request.use(
	(config) => {
		const token = window.localStorage.getItem("jwt");
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		// config.headers.XRequestDuration = new Date();
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

axios.interceptors.response.use(
	(response) => {
		// console.log(Number(Date.now() - response.config.headers.XRequestDuration).toFixed());
		return response;
	},
	(error) => {
		if (process.env.REACT_APP_ENV === "DEVELOPMENT") {
			console.log(error.response);
		}

		const originalRequest = error.config;

		if (error.message === "Network Error" && !error.response) {
			createNotification(NotificationType.Error, {
				title: "Network error!",
				message: "The server isn't responding... Check your internet connection or contact the administrator.",
			});
			throw new CustomError(error.response, ErrorType.ConnectionRefused);
		} else if (
			error.response.status === 401 &&
			error.response.data?.errors?.code === ErrorType.RefreshTokenExpired
		) {
			window.localStorage.removeItem("jwt");
			window.localStorage.removeItem("refreshToken");
			history.push("/login");

			createNotification(NotificationType.Error, {
				title: "Authorization error!",
				message: "Your session has expired! Please, log in again.",
				error: error.response,
			});
		} else if (error.response.status === 401 && error.response.data?.errors?.code === ErrorType.InvalidEmail) {
			createNotification(NotificationType.Error, {
				title: "Authorization error!",
				message: "Could not find a user with this email. Check your credentials and try again.",
			});
		} else if (error.response.status === 401 && error.response.data?.errors?.code === ErrorType.InvalidPassword) {
			createNotification(NotificationType.Error, {
				title: "Authorization error!",
				message: "The password is incorrect. Check your credentials and try again.",
			});
		} else if (
			error.response.status === 401 &&
			error.response.headers["www-authenticate"].includes('Bearer error="invalid_token"') &&
			!originalRequest._retry
		) {
			originalRequest._retry = true;

			return axios
				.post("/user/refresh", {
					token: window.localStorage.getItem("jwt"),
					refreshToken: window.localStorage.getItem("refreshToken"),
				})
				.then((res) => {
					window.localStorage.setItem("jwt", res.data.token);
					window.localStorage.setItem("refreshToken", res.data.refreshToken);
					axios.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`;
					return axios(originalRequest);
				});
		} else if (error.response.status === 401) {
			createNotification(NotificationType.Error, {
				title: "Authorization error!",
				message: "An authorization error occurred. Please, refresh the page or contact the administrator.",
			});
		} else if (error.response.status === 400 && !error.response.data.errors.code) {
			if (isBadId(error.response)) {
				injectErrorCode(error.response, ErrorType.BadId);
				history.push("/404");
				createNotification(NotificationType.Error, {
					title: "Wrong id!",
					message: "Please, check the id in the address bar or contact the administrator.",
					error: error.response,
				});
			} else {
				injectErrorCode(error.response, ErrorType.DefaultValidationError);
				createNotification(NotificationType.UnknownError, {
					title: "Validation error!",
					error: error.response,
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
					error: error.response,
				});
			} else if (code === ErrorType.ItemNotFound) {
				createNotification(NotificationType.Error, {
					title: "Not found!",
					message: "Item not found! Please, refresh the page or contact the administrator.",
					error: error.response,
				});
			} else {
				createNotification(NotificationType.UnknownError, {
					title: "Not found!",
					error: error.response,
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
				message: "A server error occurred. Please, refresh the page or contact the administrator!",
			});
			throw new CustomError(error.response, error.response.data.errors.code);
		}

		throw new CustomError(error.response, error.response.data.errors.code ?? ErrorType.Unknown);
	}
);

const responseBody = (response: AxiosResponse) => response.data;

const sleep = () => (response: AxiosResponse) => {
	return new Promise<AxiosResponse>((resolve) => {
		process.env.REACT_APP_ENV === "DEVELOPMENT" ? setTimeout(() => resolve(response), 1000) : resolve(response);
	});
};

const requests = {
	get: (url: string) => axios.get(url).then(sleep()).then(responseBody),
	post: (url: string, body?: {}) => axios.post(url, body).then(sleep()).then(responseBody),
	put: (url: string, body: {}) => axios.put(url, body).then(sleep()).then(responseBody),
	del: (url: string) => axios.delete(url).then(sleep()).then(responseBody),
};

const Dictionaries = {
	list: (): Promise<IDictionary[]> => requests.get("/dictionaries/"),
	details: (id: string): Promise<IDictionary> => requests.get(`/dictionaries/${id}`),
	create: (dictionary: INewDictionary) => requests.post("/dictionaries/", dictionary),
	update: (id: string, dictionary: IEditDictionary) => requests.put(`/dictionaries/${id}`, dictionary),
	delete: (id: string) => requests.del(`/dictionaries/${id}`),
	setMain: (id: string) => requests.post(`/dictionaries/${id}/setMain`),
};

const Items = {
	list: (dictionaryId: string, params: URLSearchParams): Promise<IItemsEnvelope> =>
		axios.get(`/dictionaries/${dictionaryId}/items`, { params: params }).then(sleep()).then(responseBody),
	details: (dictionaryId: string, itemId: string): Promise<IItem> =>
		requests.get(`/dictionaries/${dictionaryId}/items/${itemId}`),
	create: (dictionaryId: string, item: INewItem) => requests.post(`/dictionaries/${dictionaryId}/items`, item),
	update: (dictionaryId: string, itemId: string, item: IEditItem) =>
		requests.put(`/dictionaries/${dictionaryId}/items/${itemId}`, item),
	delete: (dictionaryId: string, itemId: string) => requests.del(`/dictionaries/${dictionaryId}/items/${itemId}`),
	star: (dictionaryId: string, itemId: string) => requests.post(`/dictionaries/${dictionaryId}/items/${itemId}/star`),
	unstar: (dictionaryId: string, itemId: string) =>
		requests.post(`/dictionaries/${dictionaryId}/items/${itemId}/unstar`),
};

const LearningLists = {
	get: (dictionaryId: string): Promise<ILearningList> => requests.post(`/dictionaries/${dictionaryId}/learningList/`),
	getNextItem: (dictionaryId: string, learningListId: string): Promise<ILearningItem> =>
		requests.get(`/dictionaries/${dictionaryId}/learningList/${learningListId}/nextItem`),
	checkItem: (
		dictionaryId: string,
		learningListId: string,
		answer: ILearningItemAnswer
	): Promise<ILearningItemResult> =>
		requests.post(`/dictionaries/${dictionaryId}/learningList/${learningListId}/nextItem`, answer),
	startOver: (dictionaryId: string, learningListId: string) =>
		requests.post(`/dictionaries/${dictionaryId}/learningList/${learningListId}/startOver`),
};

const Users = {
	current: (): Promise<IUser> => requests.get("/user"),
	login: (user: ILoginUser): Promise<IUser> => requests.post("/user/login", user),
	register: (user: ILoginUser): Promise<IUser> => requests.post("/user/register", user),
	facebookLogin: (accessToken: string) => requests.post(`/user/facebook`, { accessToken }),
	googleLogin: (accessCode: string) => requests.post(`/user/google`, { accessCode }),
	completeTour: (data: {
		tourCompleted?: boolean;
		itemsTourCompleted?: boolean;
		newItemTourCompleted?: boolean;
		learningTourCompleted?: boolean;
	}) => requests.post("/user/tour", data),
};

export default {
	Dictionaries,
	Items,
	LearningLists,
	Users,
};
