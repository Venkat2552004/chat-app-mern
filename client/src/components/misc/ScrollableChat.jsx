import { isSameSender, isLastMessage } from "../../config/chatLogic";
import { TypeAnimation } from "react-type-animation";
import { useEffect, useRef } from "react";

const ScrollableChat = ({ messages, currentUser }) => {
	const messagesEndRef = useRef(null);

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
	};

	useEffect(() => {
		scrollToBottom();
	}, [messages]);

	return (
		<div className='flex flex-col h-full'>
			<div className='flex-grow pt-7 overflow-x-hidden overflow-y-scroll '>
				{messages &&
					messages.map((msg, i) => (
						<div
							key={msg._id}
							className={`mb-2 flex ${
								msg.sender._id === currentUser._id
									? "justify-end"
									: "justify-start"
							}`}>
							{isSameSender(messages, msg, i, currentUser._id) ||
							isLastMessage(messages, i, currentUser._id) ? (
								<img
									src={msg.sender.dp}
									alt='User Pic'
									className='w-10 h-10 rounded-full'
								/>
							) : (
								<div className='w-10 h-10'></div> // Placeholder div
							)}
							<span
								className={`text-foreground-primary p-2 px-3 ml-3 rounded-lg ${
									msg.sender._id === currentUser._id
										? "bg-blue-500 text-white"
										: "bg-background-secondary text-black"
								}`}>
								{msg.content}
							</span>
						</div>
					))}
				<div ref={messagesEndRef} />
			</div>
		</div>
	);
};

export default ScrollableChat;
