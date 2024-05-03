import React from "react";
import { Button, Drawer, Spinner } from "flowbite-react";
import { HiArrowSmRight } from "react-icons/hi";
import { useState, useEffect } from "react";
import ShortToast from "./ShortToast";
import axios from "axios";
import { ChatState } from "../../context/ChatProvider";
import ChatList from "../chats/ChatList";

const SideDrawer = ({ open, setIsOpen }) => {
	const handleClose = () => setIsOpen(false);
	const [search, setSearch] = useState("");
	const [result, setResult] = useState([]);
	const [loading, setLoading] = useState(false);
	const [loadingChat, setLoadingChat] = useState(false);
	const [openToast, setOpenToast] = useState(false);
	const [toastMsg, setToastMsg] = useState("");
	const { user, setSelectedChat, chats, setChats} =  ChatState();

	useEffect(() => {
		handleSearch();
	}, [search]);

	const handleSearchClick = () => {
		if (search === "") {
			setToastMsg("Please enter a search query");
			setOpenToast(true);
			setTimeout(() => {
				setOpenToast(false);
			}, 5000);
			return;
		}
		handleSearch();
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

	const accessChat = async (id) => {
		try {
			setLoadingChat(true);
			const config = {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${user.token}`,
				},
			};
			const { data } = await axios.post("/api/chat", { userId: id }, config);
			if (!chats.find((chat) => chat._id === data._id)) {
				setChats([data, ...chats]);
			}
			// Sort the users in the chat so that logged users comes last (only 2 users)
			

			setSelectedChat(data);
			setLoadingChat(false);
		} catch (err) {
			setToastMsg("Error fetching chats");
			setOpenToast(true);
		}
	};

	return (
		<div className='flex items-center'>
			<Drawer
				open={open}
				onClose={handleClose}
				position='left'
				className='bg-slate-100 w-full h-full sm:w-[500px]'>
				<Drawer.Header
					title='Search Users'
					titleIcon={() => <></>}
					className='text-xl text-black border-b-[2px] border-black '
				/>

				<Drawer.Items>
					<div className='flex justify-center space-x-4 mt-3'>
						<input
							type='text'
							placeholder='Type User Details'
							value={search}
							onChange={(e) => {
								setSearch(e.target.value);
							}}
							className='rounded-full text-black'></input>
						<Button onClick={handleSearchClick}>
							<HiArrowSmRight className='w-5 h-5' />
						</Button>
					</div>
					{loading ? (
						<div className='text-center mt-5'>
							<Spinner aria-label='Center-aligned spinner' size='lg' />
						</div>
					) : (
						result?.map((user) => (
							<div
								className='flex flex-col w-full bg-background-secondary mt-3 rounded-md overflow-y-scroll'
								key={user._id}>
								<ChatList
									user={user}
									handleFunction={() => {
										setIsOpen(false);
										accessChat(user._id);
									}}
								/>
							</div>
						))
					)}
					{loadingChat && (
						<Spinner aria-label='Large spinner example' size='lg' />
					)}
				</Drawer.Items>
				<div>
					{openToast && (
						<ShortToast textMsg={toastMsg} setOpen={setOpenToast} />
					)}
				</div>
			</Drawer>
		</div>
	);
};

export default SideDrawer;
