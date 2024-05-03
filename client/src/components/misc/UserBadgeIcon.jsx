import React from "react";
import { HiX } from "react-icons/hi";

const UserBadgeIcon = ({ user, handleFunction }) => {
	return (
		<div
			className='flex items-center m-2 rounded-lg h-[25px] text-sm p-2 bg-blue-300 justify-start text-black font-md cursor-pointer'
			onClick={handleFunction}>
			{user.name}
			<HiX className='pl-1' />
		</div>
	);
};

export default UserBadgeIcon;
