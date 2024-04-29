import React from 'react'

const ChatList = ({user, handleFunction}) => {
  return (
		<div
			className='flex m-4 rounded-xl space-x-4 bg-slate-100 text-black items-center p-3 cursor-pointer '
			onClick={handleFunction}>
			<img src={user.dp} alt='User Pic' className='w-10 h-10 rounded-full' />
			<div>
				<p> {user.name}</p>
				<p> {user.email}</p>
			</div>
		</div>
	);
}

export default ChatList