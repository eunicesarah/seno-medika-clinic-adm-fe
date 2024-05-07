import React from 'react';
import Image from 'next/image';
import failedLogo from '../../../public/failed.svg';

const AlertFailed = ({ isvisible, onClose, topMessage, bottomMessage}: { isvisible: boolean, onClose: () => void, topMessage: string, bottomMessage:string }) => {
    if (!isvisible) return null

    const handleClose = (e:any) => {
        if (e.target.id === 'wrapper') onClose()
    }

    return (
        <div className=' fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center' id="wrapper" onClick={handleClose}>
            <div className=' w-auto h-auto flex flex-col bg-shade2 rounded-3xl'>
                <button className='text-white text-xl place-self-end pr-6 pt-4' onClick={() => onClose()}>X</button>
                <div className=' p-2 rounded h-auto flex flex-col items-center ms-16 me-16 mb-5'>
                    <p className=" w-72 mb-5 text-center text-white text-xl font-semibold font-poppins leading-loose">{topMessage}</p>
                    <Image
                    src={failedLogo}
                    className=' w-20 h-20'
                    alt="ok"/>
                    <p className='w-64 mt-5 text-center text-white text-base font-normal font-poppins leading-normal'>{bottomMessage}</p>
                </div>
            </div>
        </div>
    )
}

export default AlertFailed;