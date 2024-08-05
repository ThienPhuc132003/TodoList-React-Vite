// src/network/IApi.js
import { METHOD_TYPE } from "./methodType";
import axiosClient from "./axiosClient";
import { parseQuery } from "./queryParser";

const Api = ({ endpoint, method = METHOD_TYPE.GET, data, query }) => {
  switch (method) {
    case METHOD_TYPE.POST:
      return axiosClient.post(endpoint, data);
    case METHOD_TYPE.PUT:
      return axiosClient.put(endpoint, data);
    case METHOD_TYPE.DELETE:
      return axiosClient.delete(endpoint, { data });
    default:
      return axiosClient.get(`${endpoint}${parseQuery(query)}`);
  }
};

export default Api;
