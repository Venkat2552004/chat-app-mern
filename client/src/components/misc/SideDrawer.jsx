import React from "react";
import { Button, Drawer, Spinner } from "flowbite-react";
import { HiArrowSmRight } from "react-icons/hi";
import { useState } from "react";
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
	const {user, setSelectedChat, chats, setChats} = ChatState();

	const handleSearch = async () => {
		if(search === ""){
			setToastMsg("Please enter a search query");
			setOpenToast(true);
			return;
		}
		try{
			setLoading(true);
			const config = {
				headers: {
					Authorization: `Bearer ${user.token}`
				}
			}
			const {data} = await axios.get(`/api/user?search=${search}`, config);
			setLoading(false);
			setResult(data);
		} catch (err){
			setLoading(false);
			setToastMsg("Error fetching users");
			setOpenToast(true);
			return;
		}
	};

	const accessChat = async (id) => {
		try {
			setLoadingChat(true);
			const config = {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${user.token}`
				}
			}
			const {data} = await axios.post('/api/chat', {userId : id}, config);
			if(!chats.find((chat) => chat._id === data._id)){
				setChats([data, ...chats]);
			}
			setSelectedChat(data);
			setLoadingChat(false);

		} catch (err) {
			setToastMsg("Error fetching chats");
			setOpenToast(true);

		}
	}

	return (
		<>
			<Drawer
				open={open}
				onClose={handleClose}
				position='left'
				className='bg-slate-800'>
				<Drawer.Header
					title='Search Users'
					titleIcon={() => <></>}
					className='border-b-[2px]'
				/>

				<Drawer.Items>
					<div className='flex mt-2 items-center space-x-2'>
						<input
							type='text'
							placeholder='Type User Details'
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							className='rounded-full text-black'></input>
						<Button onClick={handleSearch}>
							<HiArrowSmRight />
						</Button>
					</div>
					{loading ? (
						<span>LOADING</span>
					) : (
						result?.map((user) => (
							<ChatList
								key={user._id}
								user={user}
								handleFunction={() => {
									accessChat(user._id);
								}}
							/>
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
		</>
	);
};

export default SideDrawer;
