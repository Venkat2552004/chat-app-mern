import React from "react";
import { HiX } from "react-icons/hi";

const UserBadgeIcon = ({ user, handleFunction }) => {
	return (
		<div
			className='flex flex-col items-center justify-start text-black font-md cursor-pointer'
			onClick={handleFunction}>
			{user.name}
			<HiX className='pl-1' />
		</div>
	);
};

export default UserBadgeIcon;
