import { Token } from "../utils/Token";
import Axios from "./axios"

const token = Token.GetToken('authUser');

export interface LoginResponse {
    identification: string;
    password: string;
}

interface UserStatus {
    role: string;
    is_active: boolean;
}

/**
 * service for users
 */
const getUser = () => {
    return Axios.get(`/users/profile`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}

const getUserById = (id: number | string) => {
    return Axios.get(`/users/${id}`);
}

const updateUser = (id: number | string, data: FormData): Promise<FormData> => {
    return Axios.patch(`/users/${id}`, data,{
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
        }
    });
}

const updateUserStatus = (id: number | string, data: UserStatus): Promise<UserStatus> => {
    return Axios.patch(`/users/${id}`, data,{
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
}

const deleteUser = (id: number | string) => {
    return Axios.delete(`/users/${id}`,{
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
}

const getAllUsers = () => {
    return Axios.get(`/users`);
}

const SignUp = (data: FormData): Promise<FormData> => {
    return Axios.post("/users/register", data,{
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    });
}

const SignIn = (data: LoginResponse): Promise<LoginResponse> => {
    return Axios.post("/users/login", data);
}

const SignOut = () => {
    Token.RemoveToken('authUser')
    window.location.href = '/';
};
export const UserService = {
    getUser, SignUp, SignIn, SignOut, getAllUsers, getUserById, updateUser, deleteUser, updateUserStatus
}