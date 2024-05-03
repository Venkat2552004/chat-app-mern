import React from 'react'

const ChatList = ({user, handleFunction}) => {
return (
	<div
		className='flex items-center text-sm mt-3 w-full rounded-xl space-x-4 bg-slate-300 text-black p-2 cursor-pointer '
		onClick={handleFunction}>
		<img src={user.dp} alt='User Pic' className='w-10 h-10 rounded-full' />
		<div>
			<b> {user.name}</b>
			<p className='md:hidden'>
				{" "}
				{user.email.length > 15 ? user.email.slice(0, 15) + "..." : user.email}
			</p>
			<p className='hidden md:flex'>
				{" "}
				{user.email.length > 30 ? user.email.slice(0, 30) + "..." : user.email}
			</p>
		</div>
	</div>
);
}

export default ChatList