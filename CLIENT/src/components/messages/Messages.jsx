import { useEffect, useRef } from "react";
import useGetMessages from "../../hooks/useGetMessage.js";
import MessageSkeleton from "../skeletons/MessageSkeleton.jsx";
import Message from "./Message";

const Messages = () => {
    const { messages, loading } = useGetMessages();
    const lastMessageRef = useRef();

    useEffect(() => {
        if (messages.length > 0) {
            setTimeout(() => {
                lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
            }, 100);
        }
    }, [messages]);

    return (
        <div className='px-4 flex-1 overflow-auto'>
            {!loading &&
                messages.length > 0 &&
                messages.map((message, index) => {
                    const isLastMessage = index === messages.length - 1;
                    return (
                        <div key={message._id} ref={isLastMessage ? lastMessageRef : null}>
                            <Message message={message} />
                        </div>
                    );
                })}

            {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}

            {!loading && messages.length === 0 && (
                <p className='text-center'>Send a message to start the conversation</p>
            )}
        </div>
    );
};

export default Messages;
