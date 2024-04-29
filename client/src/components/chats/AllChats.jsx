import React, { useEffect } from "react";
import { Button, Card } from "flowbite-react";
import { ChatState } from "../../context/ChatProvider";
import { useState } from "react";
import ShortToast from "../misc/ShortToast";
import axios from "axios";
import { HiPlus } from "react-icons/hi";



const AllChats = () => {

	const {user, chats, setChats, selectedChat, setSelectedChat } = ChatState();
	const [loggedUser, setLoggedUser] = useState();
	const [showToast, setShowToast] = useState(false);
	const [toastMsg, setToastMsg] = useState("");
	const fetchChats = async () => {
		try {
			const config = {
				headers: {
					Authorization: `Bearer ${user.token}`
				}
			}
			const {data} = await axios.get('/api/chat', config);
			setChats(data);
		} catch (err) {
			setToastMsg("Error fetching the chats");
			setShowToast(true);
		}
	};

	useEffect(() => {
		setLoggedUser(JSON.parse(localStorage.getItem("userData")));
		fetchChats();
	}, []);

	return (
		<>
			<div className='bg-white min-w-[40vw] rounded-md'>
				<div className='flex justify-between items-center bg-slate-500'>
					<h2 className='text-black'>My Conversations</h2>
					<Button onClick={() => createGroup()}>
						New Group
						<HiPlus className='h-5 w-5' />
					</Button>
				</div>
				<div className="flex p-4 bg-neutral-700 h-[95%] overflow-y-hidden">
					{chats ? (
						<div className="w-full bg-blue-400">
							{chats.map((chat) => (
								<Card
									key={chat._id}
									className="mb-4 cursor-pointer"
									onClick={() => setSelectedChat(chat)}
								>
									<p className="text-black">
										{chat.isGroupChat ? chat.chatName : (loggedUser.name === chat.users[0].name ? chat.users[1].name : chat.users[0].name)}
									</p>
								</Card>
							))}
						</div>
					) : (
						<span>Loading</span>
					)}
				</div>
			</div>
		</>
	);
};

export default AllChats;
