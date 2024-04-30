import React, { useEffect } from "react";
import { ChatState } from "./../../context/ChatProvider";
import { Button } from "flowbite-react";
import { HiArrowNarrowLeft, HiEye } from "react-icons/hi";
import GroupOperationsModal from "../misc/GroupOperationsModal";
import ProfileModal from "../misc/ProfileModal";
import { useState } from "react";

const SingleChat = () => {
	const {
		user,
		selectedChat,
		setSelectedChat,
		reFetch,
		setReFetch,
		sencondUser,
	} = ChatState();
	const [openGroupModal, setOpenGroupModal] = useState(false);
	const [openProfileModal, setOpenProfileModal] = useState(false);

	const handleViewProfile = () => {
		if (selectedChat.isGroupChat) {
			setOpenGroupModal(true);
		} else {
			setOpenProfileModal(true);
		}
	};

	return (
		<>
			{selectedChat ? (
				<>
					<div className='flex justify-between items-center bg-slate-200 w-full p-2 rounded-md'>
						<Button
							onClick={() => setSelectedChat(false)}
							className='flex md:hidden'>
							<HiArrowNarrowLeft className='h-5 w-5' />
						</Button>
						<h2 className='text-black text-2xl font-bold'>
							{selectedChat.isGroupChat
								? selectedChat.chatName.toUpperCase()
								: sencondUser?.name.toUpperCase()}
						</h2>
						<Button onClick={handleViewProfile}>
							<HiEye className='h-5 w-5' />
						</Button>
					</div>
					<div className='flex flex-col bg-slate-200 h-full my-2 p-4 rounded-md overflow-y-scroll justify-end'>
						<p>Messages</p>
					</div>
				</>
			) : (
				<div className='flex items-center justify-center w-full h-full text-black text-2xl'>
					Click on a chat to view messages
				</div>
			)}
			{openGroupModal && <GroupOperationsModal openModal={openGroupModal} setOpenModal={setOpenGroupModal} />}
			{openProfileModal && (
				<ProfileModal
					user={sencondUser}
					openModal={openProfileModal}
					setOpenModal={setOpenProfileModal}
				/>
			)}
		</>
	);
};

export default SingleChat;
