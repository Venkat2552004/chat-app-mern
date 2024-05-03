import React from "react";
import { Modal, Button } from "flowbite-react";
import { HiEye } from "react-icons/hi";

const ProfileModal = ({ user, openModal, setOpenModal }) => {
	return (
		<>
			<Modal
				dismissible
				placement='center'
				size='md'
				show={openModal}
				onClose={() => setOpenModal(false)}
				className='px-[10%] pt-[40%] w-screen md:flex md:pt-0 md:px-0 text-lg'>
				<Modal.Header className="bg-background-primary">{user.name}</Modal.Header>
				<Modal.Body className="bg-background-primary">
					<div className='space-y-10 flex flex-col font-bold items-center'>
						<img
							src={user.dp}
							alt='Profile Pic'
							className='max-w-40 max-h-40 rounded-full mx-auto'
						/>
						<p className="text-foreground-primary">{user.email}</p>
					</div>
				</Modal.Body>
			</Modal>
		</>
	);
};

export default ProfileModal;
