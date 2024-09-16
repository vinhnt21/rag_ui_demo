import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import './Message.css';

const Message = ({ role, message, source }) => {
    const [showLinks, setShowLinks] = useState(false);

    const isBot = role === "chatbot";

    const toggleLinks = () => {
        setShowLinks(!showLinks);
    };

    return (
        <div className={`flex ${isBot ? 'justify-start' : 'justify-end'}`}>
            <div>
                <p className={`font-bold ${isBot ? 'text-left mt-2' : 'text-right'}`}>{role}</p>
                {/*max with is 80% container*/}
                <div className={`${isBot ? 'px-2' : 'w-fit p-2 border shadow-lg bg-gray-200 rounded-md max-w-11/12'}`}>
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{message}</ReactMarkdown>
                </div>
                {source && (
                    <div className="text-gray-500 w-fit max-w-3xl">
                        <button
                            onClick={toggleLinks}
                            className="flex items-center text-blue-500 mt-2"
                        >
                            <span>Nguồn</span>
                            <span className={`ml-1 transform transition-transform ${showLinks ? 'rotate-90' : 'rotate-90'}`}>
                                &#9654;
                            </span>
                        </button>
                        {showLinks && (
                            <div className="mt-2">
                                {source.map((link, index) => (
                                    <p key={index}>
                                        <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                                            {link}
                                        </a>
                                    </p>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Message;
