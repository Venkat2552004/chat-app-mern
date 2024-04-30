import { isSameSender, isLastMessage } from "../../config/chatLogic";

const ScrollableChat = ({ messages, currentUser }) => {
	return (
		<div className='h-screen'>
			<div className='h-full pt-7 overflow-x-hidden overflow-y-auto '>
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
								className={`p-2 px-3 ml-3 rounded-lg ${
									msg.sender._id === currentUser._id
										? "bg-blue-500 text-white"
										: "bg-gray-300 text-black"
								}`}>
								{msg.content}
							</span>
						</div>
					))}
			</div>
		</div>
	);
};

export default ScrollableChat;
