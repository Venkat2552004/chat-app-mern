import React, { useState } from "react";
import { Avatar, Dropdown, Button } from "flowbite-react";
import { ChatState } from "../../context/ChatProvider";
import ProfileModal from "../misc/ProfileModal";
import { useNavigate } from "react-router-dom";
import SideDrawer from "../misc/SideDrawer";
import { HiSun, HiMoon, HiOutlineLogout, HiUserAdd } from "react-icons/hi";

const Menu = () => {
	const { user, theme, setTheme } = ChatState();
	const [openModal, setOpenModal] = useState(false);
	const [modalData, setModalData] = useState(user);
	const [openDrawer, setOpenDrawer] = useState(false);
	const navigate = useNavigate();

	const handleLogout = () => {
		localStorage.removeItem("userData");
		navigate("/");
	};
	const toggleTheme = () => {
		if (theme === "light") {
			setTheme("dark");
			document.documentElement.classList.add("dark");
		} else {
			setTheme("light");
			document.documentElement.classList.remove("dark");
		}
	};

	return (
		<div>
			<nav className='flex justify-between w-[screen - m-4] h-[60px] bg-background-primary rounded-md px-5 py-3 mx-2 my-2 overflow-hidden'>
				<div className='flex w-[50%] justify-start space-x-8 sm:space-x-5 '>
					<Button
						onClick={() => setOpenDrawer(true)}
						className='items-center rounded-lg'>
						<label className='hidden sm:block mr-2'>New Chat</label>
						<HiUserAdd className='h-5 w-5' />
					</Button>
					<Button className='flex items-center'>
						{theme === "light" ? (
							<HiSun onClick={toggleTheme} className='h-5 w-5' />
						) : (
							<HiMoon onClick={toggleTheme} className='h-5 w-5' />
						)}
					</Button>
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
						className="cursor-pointer"
					/>
				</div>
			</nav>
			{openModal && (
				<ProfileModal
					user={modalData}
					openModal={openModal}
					setOpenModal={setOpenModal}
				/>
			)}
			{openDrawer && <SideDrawer open={openDrawer} setIsOpen={setOpenDrawer} />}
		</div>
	);
};

export default Menu;
