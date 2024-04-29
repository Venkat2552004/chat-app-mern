import React from "react";
import { Modal, Button } from "flowbite-react";
import { HiEye } from "react-icons/hi";

const ProfileModal = ({ user, openModal, setOpenModal }) => {
	return (
		<>
			<Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
				<Modal.Header >{user.name}</Modal.Header>
				<Modal.Body>
					<div className='space-y-10 flex flex-col text-sky-950 font-bold items-center'>
						<img
							src={user.dp}
							alt='Profile Pic'
							className='w-40 h-40 rounded-full mx-auto'
						/>
						<p>{user.email}</p>
					</div>
				</Modal.Body>
			</Modal>
		</>
	);
};

export default ProfileModal;
