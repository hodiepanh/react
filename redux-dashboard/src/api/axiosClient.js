import axios from "axios";
//const axios = require("axios");
const baseURL = "http://localhost:3001";

const axiosClient = axios.create({
	baseURL,
	//insert header later
});

// axiosClient.interceptors.request.use((request) => {
//   console.log(request);
// });

axiosClient.interceptors.response.use(
	(response) => {
		//console.log(response.statusText);
		return response;
	},
	(error) => {
		return Promise.reject(error);
	}
);

export default axiosClient;
