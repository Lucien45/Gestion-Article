import { jwtDecode } from "jwt-decode";
import { Token } from "../utils/Token";

interface JwtPayload {
    exp: number;
}

export const isAuthenticated = (): boolean => {
  const token = Token.GetToken('authUser');
  const profile = Token.GetToken('user');
  
  if (!token || !profile) {
    return false;
  }

  try {
    const decoded: JwtPayload = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    if (decoded.exp < currentTime) {
      Token.RemoveToken('authUser');
      Token.RemoveToken('user');
      return false;
    }

    return true;
  } catch (error) {
    console.error("Token invalide :", error);
    return false;
  }
};

export const logout = () => {
  Token.RemoveToken('authUser');
  Token.RemoveToken('user');
  console.warn('suppression du token auth........');
};
