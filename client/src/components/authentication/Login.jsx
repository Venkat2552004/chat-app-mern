import React from "react";
import { useState } from "react";
import { Button, Card, Checkbox, Label, TextInput } from "flowbite-react";
import { HiEye, HiEyeOff } from "react-icons/hi";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [visible, setVisible] = useState(false);
	const hanldeLogin = (e) => {};

	return (
		<Card className='max-w-sm'>
			<form className='flex flex-col gap-4'>
				<div>
					<div className='mb-2 block'>
						<Label htmlFor='email1' value='Your email' />
					</div>
					<TextInput
						id='email1'
						type='email'
						placeholder='simp@gmail.com'
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</div>
				<div>
					<div className='mb-2 block'>
						<Label htmlFor='password1' value='Your password' />
					</div>
					<div className='flex'>
						<TextInput
							className='pr-2 w-full'
							id='password1'
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
				<Button type='submit' onClick={hanldeLogin}>
					Login
				</Button>
			</form>
		</Card>
	);
};

export default Login;
