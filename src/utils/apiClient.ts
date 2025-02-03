import axios from "axios";

export const sendRequest = async (
  method: string,
  url: string,
  headers: any,
  body: any
) => {
  try {
    const response = await axios({
      method,
      url,
      headers,
      data: method !== "GET" ? body : undefined,
    });
    return {
      data: response.data,
      status: response.status,
      headers: response.headers,
    };
  } catch (error: any) {
    return { error: error.response?.data || error.message };
  }
};
