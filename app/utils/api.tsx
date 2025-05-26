import axios, { AxiosResponse } from "axios";

const baseURL = "http://localhost:8000";

const api = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

async function authenticatedRequest<T>(
  url: string,
  method: "get" | "post" | "put" | "patch" | "delete",
  data?: any,
  token?: string
): Promise<AxiosResponse<T>> {
  const authToken = token || sessionStorage.getItem("auth_token");
  const headers: { [key: string]: string } = {
    "Content-Type": "application/json",
  };

  if (authToken) {
    headers["Authorization"] = `Token ${authToken}`;
  }

  try {
    switch (method) {
      case "get":
        return await api.get<T>(url, { headers });
      case "post":
        return await api.post<T>(url, data, { headers });
      case "put":
        return await api.put<T>(url, data, { headers });
      case "delete":
        headers["data"] = data;
        return await api.delete<T>(url, { headers });
      default:
        throw new Error(`Unsupported method: ${method}`);
    }
  } catch (error: any) {
    throw error;
  }
}

export { api, authenticatedRequest };
