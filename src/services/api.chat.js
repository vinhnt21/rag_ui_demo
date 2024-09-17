import {api} from "./api";

export const ask = async (question, history_chat) => {
    try {
        return await api.post('ask', {question, history_chat});
    } catch (error) {
        console.log(error);
        return {data: {message: "Đã có lỗi xảy ra, vui lòng thử lại sau"}};
    }
}
