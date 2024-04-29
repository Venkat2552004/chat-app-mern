import React from "react";
import {
	Button,
	Card,
	Checkbox,
	Label,
	TextInput,
	Toast,
} from "flowbite-react";
import { HiEye, HiEyeOff, HiExclamation } from "react-icons/hi";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [visiblePassoword, setVisiblePassword] = useState(false);
	const [confirmPassword, setConfirmPassword] = useState("");
	const [visibleConfirmPassoword, setVisibleConfirmPassword] = useState(false);
	const [dp, setDp] = useState("");
	const navigate = useNavigate();



	
	const handleSignup = async (e) => {
		if (!name || !email || !password || !confirmPassword) {
			return;
		}

		if (password !== confirmPassword) {
			return;
		}
		e.preventDefault();
		const formData = new FormData();
		formData.append("name", name);
		formData.append("email", email);
		formData.append("password", password);
		formData.append("dp", dp);
		try {
			const config = {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			};

			const { data } = await axios.post("/api/user/signup", formData, config);
			localStorage.setItem("userData", JSON.stringify(data));
			window.location.href = "/chats";
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<Card className='max-w-sm'>
			<form onSubmit={handleSignup} className='flex flex-col gap-4'>
				<div>
					<div className='mb-2 block'>
						<Label htmlFor='signup-name' value='Your Name' />
					</div>
					<TextInput
						id='signup-name'
						onChange={(e) => setName(e.target.value)}
						type='text'
						placeholder='Simper'
						required
					/>
					<div className='mb-2 block'>
						<Label htmlFor='signup-email' value='Your email' />
					</div>
					<TextInput
						id='signup-email'
						type='email'
						placeholder='simp@gmail.com'
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</div>
				<div>
					<div className='mb-2 block'>
						<Label htmlFor='signup-password' value='Your password' />
					</div>
					<div className='flex'>
						<TextInput
							className='pr-2 w-full'
							id='signup-password'
							type={visiblePassoword ? "text" : "password"}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
						<div className='ml-2  content-center cursor-pointer'>
							{visiblePassoword ? (
								<HiEye onClick={() => setVisiblePassword(false)} />
							) : (
								<HiEyeOff onClick={() => setVisiblePassword(true)} />
							)}
						</div>
					</div>
				</div>
				<div>
					<div className='mb-2 block'>
						<Label htmlFor='signup-c-password' value='Confirm password' />
					</div>
					<div className='flex'>
						<TextInput
							className='pr-2 w-full'
							id='signup-c-password'
							type={visibleConfirmPassoword ? "text" : "password"}
							onChange={(e) => setConfirmPassword(e.target.value)}
							required
						/>
						<div className='ml-2  content-center cursor-pointer'>
							{visibleConfirmPassoword ? (
								<HiEye onClick={() => setVisibleConfirmPassword(false)} />
							) : (
								<HiEyeOff onClick={() => setVisibleConfirmPassword(true)} />
							)}
						</div>
					</div>
				</div>
				<div className='flex'>
					<div className='content-center mr-0 ml-5'>
						<Label htmlFor='dp' value='Image' />
					</div>
					<TextInput
						id='dp'
						className='ml-5 mr-5'
						type='file'
						accept='image/*'
						onChange={(e) => setDp(e.target.files[0])}
					/>
				</div>
				{/* <div className='flex items-center gap-2'>
					<Checkbox id='remember' />
					<Label htmlFor='remember'>Remember me</Label>
				</div> */}
				<Button type='submit' gradientMonochrome='failure'>
					Sign Up
				</Button>
			</form>
		</Card>
	);
};

export default Signup;
