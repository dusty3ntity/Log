import axios, { AxiosResponse } from "axios";

import { IItem, IEditItem, INewItem } from "../models/item";
import { ILearningList, ILearningItem, ILearningItemAnswer, ILearningItemResult } from "./../models/learning";

axios.defaults.baseURL = "http://localhost:5000/api/dictionaries/0F582AB4-36E6-4C4A-BC04-DC1BFC253659";

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
	getNextItem: (id: string): Promise<ILearningItem> =>
		axios.get(`/learningList/${id}/nextItem`).then(responseBody),
	checkItem: (id: string, answer: ILearningItemAnswer): Promise<ILearningItemResult> =>
		axios.post(`/learningList/${id}/nextItem`, answer).then(responseBody),
	startOver: (id: string) => axios.post(`/learningList/${id}/startOver`),
};

export default {
	Items,
	LearningLists,
};
