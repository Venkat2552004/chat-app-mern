import React, { useEffect } from "react";
import { Button, Card, Spinner } from "flowbite-react";
import { ChatState } from "../../context/ChatProvider";
import { useState } from "react";
import ShortToast from "../misc/ShortToast";
import axios from "axios";
import { HiPlus } from "react-icons/hi";
import GroupChatModal from "./../misc/GroupChatModal";

const AllChats = () => {
	const {
		user,
		chats,
		setChats,
		selectedChat,
		setSelectedChat,
		reFetch,
		setReFetch,
		secondUser,
	} = ChatState();
	const [showToast, setShowToast] = useState(false);
	const [toastMsg, setToastMsg] = useState("");
	const [openModal, setOpenModal] = useState(false);
	const fetchChats = async () => {
		try {
			const config = {
				headers: {
					Authorization: `Bearer ${user.token}`,
				},
			};
			const { data } = await axios.get("/api/chat", config);
			setChats(data);
		} catch (err) {
			setToastMsg("Unable to fetch the chats");
			setShowToast(true);
		}
	};

	useEffect(() => {
		fetchChats();
	}, [reFetch]);

	return (
		<>
			<div
				className={`${
					selectedChat ? "hidden" : "flex"
				} flex-col w-screen h-full bg-white rounded-lg p-2 md:flex md:w-[40%]`}>
				<div className='flex justify-between items-center bg-slate-200 w-full p-2 mb-2 rounded-md'>
					<h2 className='text-black text-2xl font-bold'>Conversations</h2>

					<Button onClick={() => setOpenModal(true)} pill>
						<HiPlus className='h-4 w-4' />
					</Button>
				</div>
				<div className='flex w-full h-full rounded-md overflow-y-scroll scrollbar-hide'>
					{chats ? (
						<div className='items-center bg-slate-200 w-full h-full p-1'>
							{chats.map((chat) => (
								<div
									key={chat._id}
									className='bg-white m-1 cursor-pointer p-3 rounded-md'
									onClick={() => setSelectedChat(chat)}>
									<p className='text-black font-bold text-lg'>
										{chat.isGroupChat
											? chat.chatName
											: user.name === chat.users[0].name
											? chat.users[1].name
											: chat.users[0].name}
									</p>
									{chat.latestMessage && (
										<p className='text-black '>
											<b>{chat.latestMessage.sender.name}</b>:{" "}
											{chat.latestMessage.content.substring(0, 30)}{" "}
											{chat.latestMessage.content.length > 30 && "..."}
										</p>
									)}
								</div>
								
							))}
						</div>
					) : (
						<Spinner className='m-auto' />
					)}
				</div>
			</div>
			{openModal && (
				<GroupChatModal
					user={user}
					openModal={openModal}
					setOpenModal={setOpenModal}
				/>
			)}
			{showToast && <ShortToast toastMsg={toastMsg} setOpen={setShowToast} />}
		</>
	);
};

export default AllChats;
