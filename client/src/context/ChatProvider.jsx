import { set } from "mongoose";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
	const [selectedChat, setSelectedChat] = useState();
	const [user, setUser] = useState();
	const [notification, setNotification] = useState([]);
	const [chats, setChats] = useState([]);
	const [reFetch, setReFetch] = useState(false);
    const navigate = useNavigate();
	const [sencondUser, setSecondUser] = useState();

	useEffect(() => {
		if (selectedChat) {
			if (selectedChat.users[0]._id === user._id) {
				setSecondUser(selectedChat.users[1]);
			} else {
				setSecondUser(selectedChat.users[0]);
			}
		}
		setReFetch(!reFetch);
	}, [selectedChat]);


	useEffect(() => {
        

		const userData = JSON.parse(localStorage.getItem("userData"));
		if(userData){
            setUser(userData);
            navigate("/chats");
        } else {
            navigate("/");
        }
	}, [navigate]);

	return (
		<ChatContext.Provider
			value={{
				selectedChat,
				setSelectedChat,
				user,
				setUser,
				notification,
				setNotification,
				chats,
				setChats,
				reFetch,
				setReFetch,
				sencondUser,
			}}>
			{children}
		</ChatContext.Provider>
	);
};

export const ChatState = () => {
	return useContext(ChatContext);
};

export default ChatProvider;
