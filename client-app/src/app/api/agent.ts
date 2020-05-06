import axios, { AxiosResponse } from "axios";
import { IItem, IEditItem } from "../models/item";

axios.defaults.baseURL = "http://localhost:5000/api/dictionaries/734B6D2A-CAE3-4AF8-8330-3F6BAC5FDF17";

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
	get: (url: string) => axios.get(url).then(responseBody),
	post: (url: string, body?: {}) => axios.post(url, body).then(responseBody),
	put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
	del: (url: string) => axios.delete(url).then(responseBody),
};

const Items = {
	list: (): Promise<IItem[]> => axios.get("/items").then(responseBody),
	details: (id: string) => requests.get(`/items/${id}`),
	create: (item: IItem) => requests.post("/items", item),
	update: (id: string, item: IEditItem) => requests.put(`/items/${id}`, item),
	delete: (id: string) => requests.del(`/items/${id}`),
	star: (id: string) => requests.post(`/items/${id}/star`),
	unstar: (id: string) => requests.post(`/items/${id}/unstar`),
};

export default {
	Items,
};
