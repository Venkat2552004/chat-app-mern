import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ChatProvider from "./context/ChatProvider.jsx";

import Home from "./pages/Home";
import Chats from "./pages/Chats";
import bg from "./assets/bg.jpeg";

const App = () => {
	const router = new createBrowserRouter([
		{
			path: "/",
			element: (
				<ChatProvider>
					<Home />
				</ChatProvider>
			),
		},
		{
			path: "/chats",
			element: (
				<ChatProvider>
					<Chats />
				</ChatProvider>
			),
		},
	]);

	return (
		<div className='font-sans'>
			<RouterProvider router={router} />
		</div>
	);
};

export default App;
