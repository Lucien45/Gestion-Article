import { AxiosResponse } from "axios";
import { Token } from "../utils/Token";
import Axios from "./axios"

const token = Token.GetToken('authUser');

interface User {
  id: number | string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  profile?: string;
  role: string;
  nom: string;
  prenom?: string;
  lastLogin: string;
  civilite: string;
  date_naissance: string;
  contact?: string
  is_active: boolean;
}

export interface LoginResponse {
    identification: string;
    password: string;
}

interface UserStatus {
    role: string;
    is_active: boolean;
}

export interface LoginSuccessResponse {
    token: string;
    user: User;
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

const SignUp = (data: FormData): Promise<AxiosResponse<User>> => {
    return Axios.post("/users/register", data,{
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    });
}

const SignIn = (data: LoginResponse): Promise<AxiosResponse<LoginSuccessResponse>> => {
    return Axios.post("/users/login", data);
}

const SignOut = () => {
    Token.RemoveToken('authUser')
    window.location.href = '/';
};
export const UserService = {
    getUser, SignUp, SignIn, SignOut, getAllUsers, getUserById, updateUser, deleteUser, updateUserStatus
}