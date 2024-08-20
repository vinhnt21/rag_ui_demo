import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import './Message.css'

const Message = ({role, message, source}) => {


    const isBot = role === "chatbot";
    return (
        <div className={`flex ${isBot ? 'justify-start' : 'justify-end'} w-full`}>
            <div>
                <p className={`font-bold ${isBot ? 'text-left mt-2' : 'text-right'}`}>{role}</p>
                {/*max with is 80% container*/}
                <div className={`${isBot ? 'px-2' : 'w-fit p-2 border shadow-lg bg-gray-200 rounded-md max-w-3xl'}`}>
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{message}</ReactMarkdown>
                </div>
                {source && <div className={`text-gray-500 w-fit max-w-3xl`}>Nguồn:
                    <ReactMarkdown>{source}</ReactMarkdown>
                </div>}
            </div>
        </div>
    )
}
export default Message;