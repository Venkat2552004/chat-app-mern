import React from "react";
import { useState } from "react";
import { Button, Card, Checkbox, Label, TextInput } from "flowbite-react";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [visible, setVisible] = useState(false);
	const navigate = useNavigate();

	const getGuestCreds = () => {
		setEmail("simp@example.com");
		setPassword("IamSimp");
	};

	const handleLogin = async (e) => {
		if (!email || !password) {
			return;
		}
		e.preventDefault();
		const formData = { email, password };
		try {
			const config = {
				headers: {
					"Content-Type": "application/json",
				},
			};

			const { data } = await axios.post("/api/user/login", formData, config);
			console.log(data);
			localStorage.setItem("userData", JSON.stringify(data));
			navigate("/chats");
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<Card className='max-w-sm'>
			<form onSubmit={handleLogin} className='flex flex-col gap-4'>
				<div>
					<div className='mb-2 block'>
						<Label htmlFor='login-email' value='Your email' />
					</div>
					<TextInput
						id='login-email'
						type='email'
						value={email}
						placeholder='simp@gmail.com'
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</div>
				<div>
					<div className='mb-2 block'>
						<Label htmlFor='login-password' value='Your password' />
					</div>
					<div className='flex'>
						<TextInput
							className='pr-2 w-full'
							id='login-password'
							value={password}
							type={visible ? "text" : "password"}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
						<div className='ml-2  content-center cursor-pointer'>
							{visible ? (
								<HiEye onClick={() => setVisible(false)} />
							) : (
								<HiEyeOff onClick={() => setVisible(true)} />
							)}
						</div>
					</div>
				</div>
				{/* <div className='flex items-center gap-2'>
					<Checkbox id='remember' />
					<Label htmlFor='remember'>Remember me</Label>
				</div> */}
				<Button type='submit' gradientMonochrome='failure'>
					Login
				</Button>
				<Button
					type='button'
					gradientMonochrome='failure'
					onClick={getGuestCreds}>
					Get Guest Creds
				</Button>
			</form>
		</Card>
	);
};

export default Login;
