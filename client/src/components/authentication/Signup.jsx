import React from "react";
import { Button, Card, Checkbox, Label, TextInput } from "flowbite-react";
import logo from "../../assets/logo.png";

const Signup = () => {
	return (
		<Card className='max-w-sm'>
			<form className='flex flex-col gap-4'>
				<div>
					<div className='mb-2 block'>
						<Label htmlFor='name1' value='Your Name' />
					</div>
					<TextInput
						id='name1'
						
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
						required
					/>
				</div>
				<div>
					<div className='mb-2 block'>
						<Label htmlFor='password1' value='Your password' />
					</div>
					<TextInput id='password1' type='password' required />
				</div>
				<div>
					<div className='mb-2 block'>
						<Label htmlFor='password2' value='Confirm password' />
					</div>
					<TextInput id='password2' type='password' required />
				</div>
				<div className='flex items-center gap-2'>
					<Checkbox id='remember' />
					<Label htmlFor='remember'>Remember me</Label>
				</div>
				<Button type='submit'>Submit</Button>
			</form>
		</Card>
	);
};

export default Signup;
