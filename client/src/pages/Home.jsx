import React, { useEffect } from "react";
import Signup from "../components/authentication/Signup";
import Login from "../components/authentication/Login";
import { useState } from "react";
import { Tabs } from "flowbite-react";

const Home = () => {
	const [action, setAction] = useState("Signup");

	return (
		<section className='w-screen h-screen flex flex-col items-center justify-center'>
			<div className='title'>Gossimps</div>
			<div className='w-fit' style={{ width: '40%', maxWidth:"380px" }}>
				<Tabs style='fullWidth' className="text-black">
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
