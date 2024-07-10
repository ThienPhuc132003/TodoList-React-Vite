import { METHOD_TYPE } from "./methodType";
import axiosClient from "./axiosClient";
import { parseQuery } from "./queryParser";

const IApi = ({ endpoint, method = METHOD_TYPE.GET, data, query }) => {
  switch (method) {
    case METHOD_TYPE.POST:
      return axiosClient.post(endpoint, data);

    default:
      return axiosClient.get(`${endpoint}${parseQuery(query)}`);
  }
};

export default IApi;
