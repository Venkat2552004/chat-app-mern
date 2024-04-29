import React, { useState } from "react";
import {
	Avatar,
	Dropdown,
	Button,
	
} from "flowbite-react";
import { ChatState } from "../../context/ChatProvider";
import ProfileModal from "../misc/ProfileModal";
import { useNavigate } from "react-router-dom";
import SideDrawer from "../misc/SideDrawer";
import { HiBell, HiOutlineLogout, HiUserAdd } from "react-icons/hi";

const Menu = () => {
	
	const { user } = ChatState();
	const [openModal, setOpenModal] = useState(false);
	const [modalData, setModalData] = useState(user);
	const [openDrawer, setOpenDrawer] = useState(false);
	const navigate = useNavigate();

	const handleLogout = () => {
		localStorage.removeItem("userData");
		navigate("/");
	};


	return (
		<div>
			<nav className='flex justify-between w-[screen - m-4] h-[60px] bg-slate-300 rounded-md px-5 py-3 mx-2 my-2 overflow-hidden'>
				<div className='flex w-[50%] justify-start space-x-8 sm:space-x-5 '>
					<Button
						onClick={() => setOpenDrawer(true)}
						className='items-center rounded-lg'>
						<label className='hidden sm:block mr-2'>New Chat</label>
						<HiUserAdd className='h-5 w-5' />
					</Button>
					<Dropdown label={<HiBell className='h-5 w-5' />}
					dismissOnClick={false} arrowIcon={false}>
						<Dropdown.Item>Dashboard</Dropdown.Item>
					</Dropdown>
				</div>

				<div className='flex w-[50%] justify-end space-x-8 sm:space-x-5'>
					<Button
						onClick={() => handleLogout(true)}
						className='items-center rounded-lg'>
						<label className='hidden sm:block mr-2'>Logout</label>
						<HiOutlineLogout className=' h-5 w-5' />
					</Button>

					<Avatar
						alt='Profile Pic'
						placeholderInitials={user.name[0] + user.name[1]}
						img={user.dp}
						rounded
						onClick={() => setOpenModal(true)}
					/>
				</div>
			</nav>
			{openModal && <ProfileModal
				user={modalData}
				openModal={openModal}
				setOpenModal={setOpenModal}
			/>}
			{openDrawer && <SideDrawer open={openDrawer} setIsOpen={setOpenDrawer} />}
		</div>
	);
};

export default Menu;
