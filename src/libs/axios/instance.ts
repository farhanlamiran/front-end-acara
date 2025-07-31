import environment from "@/config/environment";
import axios from "axios";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";

interface customSession extends Session {
    accessToken?: string;
}

const instance = axios.create({
    baseURL: environment.API_URL,
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 60 * 1000, // Set a timeout of 10 seconds
});

instance.interceptors.request.use(
    async (request) => {
        const session: customSession | null = await getSession();
        if (session && session.accessToken) {
            request.headers.Authorization = `Bearer ${session.accessToken}`;
        }
        return request;
    },
    (error) => {
        return Promise.reject(error);
    }
)

instance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default instance;