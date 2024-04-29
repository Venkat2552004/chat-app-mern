import React from 'react'

const ChatList = ({user, handleFunction}) => {
  return (
    <div className='flex m-4 rounded-xl space-x-2 bg-orange-500 items-center px-4 cursor-pointer' onClick={handleFunction}>
        <img src={user.dp} alt="User Pic" className="w-10 h-10 rounded-full" />
        <div>
            <p> {user.name}</p>
            <p> {user.email}</p>
        </div>
    </div>
  )
}

export default ChatList