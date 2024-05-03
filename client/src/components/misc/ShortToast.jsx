import React from 'react'
import { Toast } from "flowbite-react";
import { HiExclamation } from "react-icons/hi";

const ShortToast = ({textMsg, setOpen}) => {
  return (
		<div className='fixed bottom-0 left-1/2 transform -translate-x-1/2 mb-4 z-50'>
			<Toast className=''>
				<div className='inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-100 text-cyan-500 dark:bg-cyan-800 dark:text-cyan-200'>
					<HiExclamation className='h-5 w-5' />
				</div>
				<div className='ml-3 text-sm font-normal'>{textMsg}</div>
				<Toast.Toggle onDismiss={() => setOpen(false)} />
			</Toast>
		</div>
	);
}

export default ShortToast