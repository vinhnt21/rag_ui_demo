import Message from "../components/Message";
import {useEffect, useRef, useState} from "react";
import {ask} from "../services/api.chat";

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [question, setQuestion] = useState('');
    const messagesEndRef = useRef(null);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);


    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({behavior: 'smooth'});
    }
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (!question) return;
        const userMessage = {role: "user", message: question};
        setQuestion('');
        setMessages([...messages, userMessage]);
        try {
            const response = await ask(question);
            const chatbotMessage = {role: "chatbot", message: response.data
                    .message, source: response.data.source};
            setMessages([...messages, userMessage, chatbotMessage]);
        } catch (error) {
            const chatbotMessage = {role: "chatbot", message: error.message};
            setMessages([...messages, userMessage, chatbotMessage]);
        }
    }

    const handleOnchangeInput = (e) => {
        console.log(question);
        setQuestion(e.target.value);
    }
    return (
        <div className="container border shadow-2xl bg-gray-50 h-screen mx-auto p-8">
            <h1 className={`font-bold text-2xl text-center`}>Demo Chatbot</h1>
            <div className={`container h-5/6 overflow-y-auto mb-8`}>
                {messages.map((message, index) => {
                    return <Message key={index} role={message.role} message={message.message} source={message?.source}/>
                })}
                <div ref={messagesEndRef}/>
            </div>
            <form className={`flex p-2 border shadow-lg bg-gray-200 rounded-md max-w-4/5`} onSubmit={handleFormSubmit}>
                <input
                    className={`w-full bg-gray-200 focus:outline-none focus:ring-0 border-none`}
                    type="text"
                    placeholder="Type your question here"
                    name="question"
                    onChange={handleOnchangeInput}
                    value={question}
                />
                <button
                    className={`p-2 border shadow-lg bg-black text-white px-8 rounded-md max-w-4/5`}
                    type="submit"
                >
                    Send
                </button>
            </form>
        </div>
    )
}
export default Chat;