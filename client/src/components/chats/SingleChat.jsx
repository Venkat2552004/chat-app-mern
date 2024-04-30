import React, { useEffect } from "react";
import { ChatState } from "./../../context/ChatProvider";
import { Button, Spinner } from "flowbite-react";
import { HiArrowNarrowLeft, HiEye } from "react-icons/hi";
import GroupOperationsModal from "../misc/GroupOperationsModal";
import ProfileModal from "../misc/ProfileModal";
import { useState } from "react";
import { MdSend } from "react-icons/md";
import ShortToast from "../misc/ShortToast";
import axios from "axios";
import ScrollableChat from "../misc/ScrollableChat";
import io from "socket.io-client";

const ENDPOINT = "http://localhost:3000";
var socket, selectedChatCompare;

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
	const [messages, setMessages] = useState([]);
	const [newMessage, setNewMessage] = useState("");
	const [loading, setLoading] = useState(false);
	const [toastMsg, setToastMsg] = useState("");
	const [showToast, setShowToast] = useState(false);
	const [socketConnected, setSocketConnected] = useState(false);
	
	const handleViewProfile = () => {
		if (selectedChat.isGroupChat) {
			setOpenGroupModal(true);
		} else {
			setOpenProfileModal(true);
		}
	};

	const fetchMessages = async () => {
		if (!selectedChat) return;
		try {
			const config = {
				headers: {
					Authorization: `Bearer ${user.token}`,
				},
			};
			setLoading(true);
			const { data } = await axios.get(
				`/api/message/${selectedChat._id}`,
				config
			);
			setMessages(data);
			setLoading(false);
			socket.emit('join chat', selectedChat._id);
		} catch (err) {
			setToastMsg("Unable to fetch messages");
			setShowToast(true);
			setTimeout(() => {
				setShowToast(false);
			}, 5000);
		}
	};

	

	const sendMessage = async () => {
		if (!newMessage) return;
		try {
			const config = {
				headers: {
					Authorization: `Bearer ${user.token}`,
				},
			};
			const msgDetails = {
				content: newMessage,
				chatId: selectedChat._id,
			};
			setNewMessage("");
			const { data } = await axios.post("/api/message/", msgDetails, config);
			socket.emit('new message', data);
			setMessages([...messages, data]);
		} catch (err) {
			setToastMsg("Unable to send message");
			setShowToast(true);
			setTimeout(() => {
				setShowToast(false);
			}, 5000);
		}
	};

	const typeHandler = (msg) => {
		setNewMessage(msg);
	};

	useEffect(() => {
		socket = io(ENDPOINT);
		socket.emit("setup", user);
		socket.on("connection", () => {
			setSocketConnected(true);
		});
	}, []);

	useEffect(() => {
		fetchMessages();
		selectedChatCompare = selectedChat;
	}, [selectedChat]);

	useEffect(() => {
		socket.on("message received", (newMessageRecieved) => {
			console.log("I am here" + newMessageRecieved);
			if (
				!selectedChatCompare ||
				selectedChatCompare._id === newMessageRecieved.chat._id
			) {
				
				setMessages([...messages, newMessageRecieved]);
			} else {
				//give notification
				console.log("Hii");
			}
		});
	});


	return (
		<>
			{console.log("rendered...........")}
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
					<div className='flex flex-col bg-slate-200 w-full h-full my-2 p-4 pb-3 rounded-md justify-end overflow-y-scroll'>
						{loading ? (
							<div className='flex self-center items-center justify-center h-full w-[50%]'>
								<Spinner className='self-center w-full h-full' size='lg' />
							</div>
						) : (
							<div>
								<ScrollableChat currentUser={user} messages={messages} />
							</div>
						)}
						<div className='bg-white w-full h-14 p-3 mt-2 rounded-full flex items-center'>
							<textarea
								placeholder='Type your message...'
								required
								className='text-black bg-white w-full h-full border-none focus:outline-nonehow to re overflow-y-auto resize-none mr-2'
								value={newMessage}
								onChange={(e) => typeHandler(e.target.value)}
								onKeyDown={(e) => {
									if (e.key === "Enter" && !e.shiftKey) {
										e.preventDefault();
										sendMessage();
									}
								}}
							/>
							{newMessage && (
								<MdSend
									className='h-5 w-5 text-black cursor-pointer'
									onClick={sendMessage}
								/>
							)}
						</div>
					</div>
				</>
			) : (
				<div className='flex items-center justify-center w-full h-full text-black text-2xl'>
					Click on a chat to view messages
				</div>
			)}
			{openGroupModal && (
				<GroupOperationsModal
					openModal={openGroupModal}
					setOpenModal={setOpenGroupModal}
					fetchMessages={fetchMessages}
				/>
			)}
			{openProfileModal && (
				<ProfileModal
					user={sencondUser}
					openModal={openProfileModal}
					setOpenModal={setOpenProfileModal}
				/>
			)}
			{showToast && <ShortToast toastMsg={toastMsg} setOpen={setShowToast} />}
		</>
	);
};

export default SingleChat;
