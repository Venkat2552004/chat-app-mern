import React from "react";
import { ChatState } from "../../context/ChatProvider";
import SingleChat from "./SingleChat";
const ChatBox = () => {
	const { selectedChat } = ChatState();
	return (
		<div
			className={`${
				selectedChat ? "flex" : "hidden"
			} flex-col w-screen h-full bg-background-secondary rounded-lg p-2 pb-0 md:flex md:w-[59%]`}>
			<SingleChat />
		</div>
	);
};

export default ChatBox;
