import React from "react";
import { ChatState } from "../../context/ChatProvider";
import { Card } from "flowbite-react";

const ChatBox = () => {
	const { selectedChat } = ChatState();
	return (
		<div
			className={`${
				selectedChat ? "flex" : "hidden"
			} flex-col w-screen h-full bg-white rounded-lg p-2 md:flex md:w-[59%]`}>
			 ChatBox
		</div>
	);
};

export default ChatBox;
