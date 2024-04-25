import React from "react";
import { Button, Card, Checkbox, Label, TextInput } from "flowbite-react";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { useState } from "react";

const Signup = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [visiblePassoword, setVisiblePassword] = useState(false);
	const [visibleConfirmPassoword, setVisibleConfirmPassword] = useState(false);
	const [dp, setDp] = useState(null);

	const handleSignup = (e) => {};
	return (
		<Card className='max-w-sm'>
			<form className='flex flex-col gap-4'>
				<div>
					<div className='mb-2 block'>
						<Label htmlFor='name1' value='Your Name' />
					</div>
					<TextInput
						id='name1'
						onChange={(e) => setName(e.target.value)}
						type='text'
						placeholder='Simper'
						required
					/>
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
						<Label htmlFor='password1' value='Your password' />
					</div>
					<div className='flex'>
						<TextInput
							className='pr-2 w-full'
							id='password1'
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
						onChange={(e) => setDp(e.target.value)}
					/>
				</div>
				{/* <div className='flex items-center gap-2'>
					<Checkbox id='remember' />
					<Label htmlFor='remember'>Remember me</Label>
				</div> */}
				<Button type='submit' onClick={handleSignup}>
					Sign Up
				</Button>
			</form>
		</Card>
	);
};

export default Signup;
