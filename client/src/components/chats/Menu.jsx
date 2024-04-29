import React, { useState } from "react";
import {
	Avatar,
	Dropdown,
	Button,
	DropdownDivider,
	Drawer,
} from "flowbite-react";
import { HiOutlineSearch } from "react-icons/hi";
import logo from "../../assets/logo.png";
import { ChatState } from "../../context/ChatProvider";
import ProfileModal from "../misc/ProfileModal";
import { useNavigate } from "react-router-dom";
import SideDrawer from "../misc/SideDrawer";

const Menu = () => {
	const [search, setSearch] = useState("");
	const [searchResult, setSearchresult] = useState([]);
	const [loading, setLoading] = useState(false);
	const [loadingChat, setLoadingChat] = useState();
	const { user } = ChatState();
	const [openModal, setOpenModal] = useState(false);
	const [modalData, setModalData] = useState(user);
	const [openDrawer, setOpenDrawer] = useState(false);
	const navigate = useNavigate();

	const logoutHandler = () => {
		localStorage.removeItem("userData");
		navigate("/");
	};

	return (
		<div>
			<nav className='flex justify-between items-center w-screen h-18 p-4 bg-slate-300'>
				<Button
					onClick={() => setOpenDrawer(true)}
					className='items-center rounded-full'>
					Search User
					<HiOutlineSearch className='ml-2 h-5 w-4' />
				</Button>
				<h3 className='text-black text-2xl font-medium'>Gossimps</h3>
				<div className='grid grid-flow-col space-x-4'>
					<Dropdown
						label='Notifications'
						dismissOnClick={false}
						arrowIcon={false}>
						{/* <Dropdown.Item icon={HiViewGrid}>Dashboard</Dropdown.Item>
					<DropdownDivider /> */}
					</Dropdown>
					<Dropdown
						label={
							<Avatar
								alt='Profile Pic'
								placeholderInitials={user.name[0] + user.name[1]}
								img={user.dp}
								rounded
							/>
						}
						inline>
						<Dropdown.Item
							onClick={() => {
								setModalData(user);
								setOpenModal(true);
							}}
							className='text-lg'>
							My Profile
						</Dropdown.Item>

						<DropdownDivider />
						<Dropdown.Item onClick={logoutHandler} className='text-lg'>
							Logout{" "}
						</Dropdown.Item>
					</Dropdown>
				</div>
			</nav>
			<ProfileModal
				user={modalData}
				openModal={openModal}
				setOpenModal={setOpenModal}
			/>
			{openDrawer && <SideDrawer open={openDrawer} setIsOpen={setOpenDrawer} />}
		</div>
	);
};

export default Menu;
