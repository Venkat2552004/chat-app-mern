import React, { useEffect, useState } from "react";
import axios from "axios";
import { ChatState } from "../context/ChatProvider";
import Menu from "../components/chats/Menu";
import AllChats from "./../components/chats/AllChats";
import ChatBox from "../components/chats/ChatBox";

const Chats = () => {
	const { user } = ChatState();
	

	return (
		<div className='w-screen'>
			{user && <Menu />}
			<div className="flex justify-between p-3 w-screen h-[91.5vh]">
				{user && <AllChats />}
				{user && <ChatBox />}
			</div>
		</div>
	);
};

export default Chats;
