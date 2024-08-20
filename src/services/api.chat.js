import {api} from "./api";

export const ask = async (question) => {
    try {
        return await api.post('ask', {question});
    } catch (error) {
        console.log(error);
    }
}
