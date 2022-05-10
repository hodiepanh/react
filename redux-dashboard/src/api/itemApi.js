import axiosClient from "./axiosClient";

//const axios = require("axios");
const url = "/items";
export const getItems = () => {
	return axiosClient.get(url);
};

export const addItems = (newItem) => {
	return axiosClient.post(`${url}`, newItem);
};

export const deleteItems = (index) => {
	return axiosClient.delete(`${url}/${index}`);
};

export const searchItems = (searchValue) => {
	return axiosClient.get(`${url}?title_like=${searchValue}`);
};

export const editItems = (id, editName) => {
	console.log(editName);
	return axiosClient.patch(`${url}/${id}`, {
		//id: id,
		title: editName,
		//img: "something",
	});
};
