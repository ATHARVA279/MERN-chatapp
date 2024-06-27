import useGetConversations from "../../hooks/useGetConversations";
import Conversation from "./Conversation";

const Conversations = () => {
    const { loading, conversations } = useGetConversations();
    console.log(conversations);

    if (loading) {
        return <span className='loading loading-spinner mx-auto'></span>;
    }

    return (
        <div className='py-2 flex flex-col overflow-auto'>
            {conversations && conversations.length > 0 ? (
                conversations.map((conversation, idx) => (
                    <Conversation
                        key={conversation._id}
                        conversation={conversation}
                        lastIdx={idx === conversations.length - 1}
                    />
                ))
            ) : (
                <p className='text-center'>No conversations found.</p>
            )}
        </div>
    );
};

export default Conversations;
