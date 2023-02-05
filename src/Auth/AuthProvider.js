import { API_URL } from "../Utils/Constants";
import { getToken } from "../Auth/TokenProvider";

export const getCurrentUser = async () => {
    try {
        const response = fetch(API_URL + "users/13", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + await getToken(),
            },
        });
        const json = await response.json();
        return json;
    } catch (error) {
        console.error(error);
    }
};