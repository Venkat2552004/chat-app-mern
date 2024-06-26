import React from "react";
import { ChatState } from "../../context/ChatProvider";
import { useState, useEffect } from "react";
import ShortToast from "./ShortToast";
import UserBadgeIcon from "./UserBadgeIcon";
import { Modal, Button, TextInput, Spinner } from "flowbite-react";
import axios from "axios";
import ChatList from "../chats/ChatList";

const GroupOperationsModal = ({ openModal, setOpenModal, fetchMessages }) => {
	const { user, selectedChat, setSelectedChat, reFetch, setReFetch } =
		ChatState();
	const [newUsers, setNewUsers] = useState([]);
	const [selectedUsers, setSelectedUsers] = useState([
		...selectedChat.users,
		...newUsers,
	]);
	const [search, setSearch] = useState("");
	const [result, setResult] = useState([]);
	const [loading, setLoading] = useState(false);
	const [groupChatName, setGroupChatName] = useState("");
	const [openToast, setOpenToast] = useState(false);
	const [toastMsg, setToastMsg] = useState("");

	const handleSubmit = async () => {
		if (groupChatName === "" && newUsers.length < 1) {
			setToastMsg("Fill atleast one field");
			setOpenToast(true);
			setTimeout(() => {
				setOpenToast(false);
			}, 5000);
			return;
		}

		if (!(groupChatName === "")) {
			try {
				setLoading(true);
				const config = {
					headers: {
						Authorization: `Bearer ${user.token}`,
					},
				};
				const chatDetails = {
					chatId: selectedChat._id,
					chatName: groupChatName,
				};
				const { data } = await axios.put(
					"/api/chat/renameGroup",
					chatDetails,
					config
				);
				setSelectedChat(data);
				setReFetch(!reFetch);
				setLoading(false);
				setToastMsg("Changes Applied successfully");
				setOpenToast(true);
				setTimeout(() => {
					setOpenToast(false);
				}, 5000);
			} catch (err) {
				setToastMsg("Error renaming group");
				setOpenToast(true);
				setTimeout(() => {
					setOpenToast(false);
				}, 5000);
			}
		}
		if (newUsers.length > 0) {
			try {
				const config = {
					headers: {
						Authorization: `Bearer ${user.token}`,
					},
				};
				const chatDetails = {
					chatId: selectedChat._id,
					userIds: JSON.stringify(newUsers.map((user) => user._id)),
				};
				setLoading(true);
				const { data } = await axios.post(
					"/api/chat/addToGroup",
					chatDetails,
					config
				);
				setSelectedChat(data);
				setLoading(false);
				setToastMsg("Changes Applied successfully");
				setNewUsers([]);
				setOpenToast(true);
				setTimeout(() => {
					setOpenToast(false);
				}, 5000);
			} catch (err) {
				setToastMsg("Error adding users to group");
				setOpenToast(true);
				setTimeout(() => {
					setOpenToast(false);
				}, 5000);
			}
		}
	};

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

	useEffect(() => {
		handleSearch();
	}, [search]);

	useEffect(() => {
		setSelectedUsers([...selectedChat.users, ...newUsers]);
	}, [newUsers]);

	const handleExitGroup = () => {
		if (selectedChat.admin._id === user._id && selectedChat.users.length > 1) {
			setToastMsg("Remove remaining users first");
			setOpenToast(true);
			setTimeout(() => {
				setOpenToast(false);
			}, 5000);
			return;
		}

		try {
			const config = {
				headers: {
					Authorization: `Bearer ${user.token}`,
				},
			};
			const chatDetails = {
				chatId: selectedChat._id,
				userId: user._id,
			};
			axios.post("/api/chat/removeFromGroup", chatDetails, config);
			setOpenModal(false);
			setReFetch(!reFetch);
			setSelectedChat(null);
			setToastMsg("You left the group, bye bye");
			setOpenToast(true);
			setTimeout(() => {
				setOpenToast(false);
			}, 5000);
		} catch (err) {
			setToastMsg("Error leaving from group");
			setOpenToast(true);
			setTimeout(() => {
				setOpenToast(false);
			}, 5000);
		}
	};

	const handleAddUser = async (userToAdd) => {
		// userToAdd will not be same reference even though it is present in selectedChat.users(so use some)
		if (selectedChat.users.some((user) => user._id === userToAdd._id)) {
			setToastMsg("User already in the group");
			setOpenToast(true);
			setTimeout(() => {
				setOpenToast(false);
			}, 5000);
			return;
		}

		// userToAdd will  be same reference even though it is present in selectedChat.users(so we can use includes)
		if (newUsers.some((user) => user._id === userToAdd._id)) {
			setToastMsg("User already selected");
			setOpenToast(true);
			setTimeout(() => {
				setOpenToast(false);
			}, 5000);
			return;
		}
		setNewUsers([...newUsers, userToAdd]);
	};

	const handleRemoveUser = async (userToRemove) => {
		if (selectedChat.admin._id !== user._id) {
			setToastMsg("Only admin can remove users");
			setOpenToast(true);
			setTimeout(() => {
				setOpenToast(false);
			}, 5000);
			return;
		}

		if (
			selectedChat.admin._id === userToRemove._id &&
			selectedChat.users.length > 1
		) {
			setToastMsg("Remove remaining users first");
			setOpenToast(true);
			setTimeout(() => {
				setOpenToast(false);
			}, 5000);
			return;
		}

		if (selectedChat.users.some((user) => user._id === userToRemove._id)) {
			try {
				const config = {
					headers: {
						Authorization: `Bearer ${user.token}`,
					},
				};
				const chatDetails = {
					chatId: selectedChat._id,
					userId: userToRemove._id,
				};
				const { data } = await axios.post(
					"/api/chat/removeFromGroup",
					chatDetails,
					config
				);
				if (selectedChat.users.length === 0) {
					setSelectedChat(null);
				} else {
					setSelectedChat(data);
				}
				setReFetch(!reFetch);

				// after deleting the last user, write api and code to delete the group from db
				setToastMsg("User removed from group");
				setOpenToast(true);
				setTimeout(() => {
					setOpenToast(false);
				}, 5000);
			} catch (err) {
				setToastMsg("Error removing user from group");
				setOpenToast(true);
				setTimeout(() => {
					setOpenToast(false);
				}, 5000);
			}
		} else {
			setNewUsers(newUsers.filter((user) => user._id !== userToRemove._id));
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
				className='px-[10%] pt-[40%] w-full md:flex md:pt-0 md:px-0 text-lg'>
				<Modal.Header className='bg-background-primary'>
					{selectedChat.chatName}
				</Modal.Header>
				<Modal.Body className='flex flex-col items-center w-full bg-background-primary'>
					<div className='flex flex-wrap overflow-y-scroll h-[110px] mb-2 '>
						{selectedUsers.map(
							(user1) =>
								user1._id !== user._id && (
									<UserBadgeIcon
										key={user1._id}
										user={user1}
										handleFunction={() => handleRemoveUser(user1)}
									/>
								)
						)}
					</div>

					<form className='space-y-4 w-full px-6'>
						<TextInput
							placeholder='New Chat name'
							value={groupChatName}
							onChange={(e) => setGroupChatName(e.target.value)}
						/>
						{selectedChat.admin._id === user._id && (
							<TextInput
								placeholder='Add new members?'
								value={search}
								onChange={(e) => setSearch(e.target.value)}
							/>
						)}
					</form>

					{loading ? (
						<Spinner
							aria-label='Large spinner example'
							size='lg'
							className='mt-4'
						/>
					) : (
						result?.slice(0, 3).map((user) => (
							<div
								className='flex flex-col w-full bg-background-secondary mt-3 rounded-md'
								key={user._id}>
								<ChatList
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
				<Modal.Footer className='bg-background-primary flex items-center justify-between'>
					<Button onClick={handleSubmit}>Apply Changes</Button>
					<Button color='failure' onClick={handleExitGroup}>
						Leave Group
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default GroupOperationsModal;
