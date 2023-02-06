import { getToken } from "../Auth/TokenProvider";
import jwt_decode from 'jwt-decode';

export const getCurrentUser = async () => {
    const token = await getToken();
    const user = await jwt_decode(token);
    return user;
}