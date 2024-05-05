import React from 'react';
import Image from 'next/image';
import okLogo from '../../../public/ok.svg';

const AlertSuccess = ({ isvisible, onClose, message}: { isvisible: boolean, onClose: () => void , message: string }) => {
    if (!isvisible) return null

    const handleClose = (e:any) => {
        if (e.target.id === 'wrapper') onClose()
    }


    return (
        <div className=' fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center' id="wrapper" onClick={handleClose}>
            <div className=' w-auto h-auto flex flex-col bg-shade2 rounded-3xl'>
                <button className='text-white text-xl place-self-end pr-6 pt-4' onClick={() => onClose()}>X</button>
                <div className=' p-2 rounded h-auto flex flex-col items-center ms-16 me-16 mb-5'>
                    <p className=" w-72 mb-5 text-center text-white text-xl font-semibold font-poppins leading-loose">{message}</p>
                    <Image
                    src={okLogo}
                    className=' w-20 h-20'
                    alt="ok"/>
                </div>
            </div>
        </div>
    )
}

export default AlertSuccess;