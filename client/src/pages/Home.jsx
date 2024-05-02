import React, { useEffect } from "react";
import Signup from "../components/authentication/Signup";
import Login from "../components/authentication/Login";
import logo from "../assets/logo.png";
import { Tabs } from "flowbite-react";

const Home = () => {

	return (
		<section className='w-full h-screen flex flex-col items-center justify-center bg-[url(https://i.pinimg.com/originals/63/23/77/6323774b3d68f3cf8a247e1fb76cc709.png)] bg-no-repeat bg-cover'>
			<div className='w-fit' style={{ width: "90%", maxWidth: "380px" }}>
				<img src={logo} alt='logo' className='' />
				<Tabs style='fullWidth' className='text-black active:'>
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
