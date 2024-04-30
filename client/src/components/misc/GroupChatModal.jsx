import React from "react";
import { Modal, Button, TextInput, Spinner } from "flowbite-react";
import ShortToast from "./ShortToast";
import { ChatState } from "../../context/ChatProvider";
import { useState, useEffect } from "react";
import axios from "axios";
import ChatList from "../chats/ChatList";
import UserBadgeIcon from "./UserBadgeIcon";

const GroupChatModal = ({ openModal, setOpenModal }) => {
	const [groupChatName, setGroupChatName] = useState("");
	const [selectedUsers, setSelectedUsers] = useState([]);
	const [search, setSearch] = useState("");
	const [result, setResult] = useState([]);
	const [loading, setLoading] = useState(false);
	const [toastMsg, setToastMsg] = useState("");
	const [openToast, setOpenToast] = useState(false);
	const { user, chats, setChats } = ChatState();

	const handleSubmit = async () => {
		if (groupChatName === "") {
			setToastMsg("Please enter a chat name");
			setOpenToast(true);
			setTimeout(() => {
				setOpenToast(false);
			}, 5000);
			return;
		}

		if (selectedUsers.length < 2) {
			setToastMsg("Please select atleast 2 users");
			setOpenToast(true);
			setTimeout(() => {
				setOpenToast(false);
			}, 5000);
			return;
		}
		try {
			setLoading(true);
			const config = {
				headers: {
					Authorization: `Bearer ${user.token}`,
				},
			};
			const chatDetails = {
				chatName: groupChatName,
				users: JSON.stringify(selectedUsers.map((user) => user._id)),
			};
			const { data } = await axios.post(
				"/api/chat/createGroup",
				chatDetails,
				config
			);
			setLoading(false);
			setChats([data, ...chats]);
			setOpenModal(false);

			setToastMsg("New GroupChat Created");
			setOpenToast(true);
			setTimeout(() => {
				setOpenToast(false);
			}, 5000);
		} catch (err) {
			setLoading(false);
			setToastMsg("Unable to create group chat");
			setOpenToast(true);
			setTimeout(() => {
				setOpenToast(false);
			}, 5000);
			return;
		}
	};

	const handleAddUser = (userToAdd) => {
		if (selectedUsers.includes(userToAdd)) {
			setToastMsg("User already added");
			setOpenToast(true);
			setTimeout(() => {
				setOpenToast(false);
			}, 5000);
			return;
		}
		setSelectedUsers([...selectedUsers, userToAdd]);
	};

	const handleUserRemove = (userToRemove) => {
		const newSelectedUsers = selectedUsers.filter(
			(user) => user._id !== userToRemove._id
		);
		setSelectedUsers(newSelectedUsers);
	};

	useEffect(() => {
		handleSearch();
	}, [search]);

	const handleSearch = async () => {
		if (search === "") {
			return;
		}
		try {
			setLoading(true);
			const config = {
				headers: {
					Authorization: `Bearer ${user.token}`,
				},
			};
			const { data } = await axios.get(`/api/user?search=${search}`, config);
			setLoading(false);
			setResult(data);
			if (data.length === 0) {
				setToastMsg("No users found");
				setOpenToast(true);
				setTimeout(() => {
					setOpenToast(false);
				}, 5000);
			}
		} catch (err) {
			setLoading(false);
			setToastMsg("Error fetching users");
			setOpenToast(true);
			setTimeout(() => {
				setOpenToast(false);
			}, 5000);
			return;
		}
	};

	return (
		<>
			<Modal
				dismissible
				placement='center'
				size='md'
				show={openModal}
				onClose={() => setOpenModal(false)}
				className='px-[10%] pt-[40%] w-screen md:flex md:pt-0 md:px-0 text-lg'>
				<Modal.Header>New Group Chat</Modal.Header>
				<Modal.Body className='flex flex-col items-center w-full'>
					<form className='space-y-4 w-full px-6'>
						<TextInput
							placeholder='Chat name'
							value={groupChatName}
							onChange={(e) => setGroupChatName(e.target.value)}
							required
						/>
						<TextInput
							placeholder='Search users'
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							required
						/>
					</form>
					{selectedUsers?.map((user) => (
						<UserBadgeIcon
							key={user._id}
							user={user}
							handleFunction={() => handleUserRemove(user)}
						/>
					))}
					{loading ? (
						<Spinner
							aria-label='Large spinner example'
							size='lg'
							className='mt-4'
						/>
					) : (
						result?.slice(0, 4).map((user) => (
							<div className='flex flex-col w-full'>
								<ChatList
									key={user._id}
									user={user}
									handleFunction={() => handleAddUser(user)}
									className='m-1 h-14 cursor-pointer'
								/>
							</div>
						))
					)}
					{openToast && (
						<ShortToast textMsg={toastMsg} setOpen={setOpenToast} />
					)}
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={handleSubmit}>Create Chat</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default GroupChatModal;
