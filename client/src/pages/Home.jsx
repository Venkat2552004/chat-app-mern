import React, { useEffect } from "react";
import Signup from "../components/authentication/Signup";
import Login from "../components/authentication/Login";
import logo from "../assets/logo.png";
import { useState } from "react";
import { Tabs } from "flowbite-react";

const Home = () => {
	const [action, setAction] = useState("Signup");

	return (
		<section className='w-full h-screen flex flex-col items-center justify-center'>
			<div className='w-fit' style={{ width: "40%", maxWidth: "380px" }}>
				<img src={logo} alt='logo' className='' />
				<Tabs style='fullWidth' className='text-black'>
					<Tabs.Item active title='Login'>
						<Login />
					</Tabs.Item>
					<Tabs.Item title='Signup'>
						<Signup />
					</Tabs.Item>
				</Tabs>
			</div>
		</section>
	);
};

export default Home;
