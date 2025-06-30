import { Token } from "../utils/Token";
import Axios from "./axios"

const token = Token.GetToken('authUser');

export interface LogData {
    action: string;
    user: number;
}

/**
 * service for log users
 */

const createLog = (data: LogData): Promise<LogData> => {
    return Axios.post("/log", data);
}

const getAllLogs = () => {
    return Axios.get(`/log`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}

const getlogById = (id: number | string) => {
    return Axios.get(`/log/${id}`);
}

const deleteLog = (id: number | string) => {
    return Axios.delete(`/log/${id}`,{
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
}

export const LogService = {
    createLog, getAllLogs, getlogById, deleteLog
}