import React from "react";

// , message, wbText, wbRef, bbText, bbRef 

const AlertConfirm = ({ isvisible, onClose, message}: { isvisible: boolean, onClose: () => void, message: string }) => {
    if (!isvisible) return null

    const handleClose = (e:any) => {
        if (e.target.id === 'wrapper') onClose()
    }

    return (
        <div className=' fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center' id="wrapper" onClick={handleClose}>
            <div className=' w-auto h-auto flex flex-col bg-shade2 rounded-3xl'>
                <button className='text-white text-xl place-self-end pr-6 pt-4' onClick={() => onClose()}>X</button>
                <div className=' p-2 rounded h-auto flex flex-col items-center ms-16 me-16 mb-5'>
                    <p className=" w-72 text-center text-white text-xl font-semibold font-poppins leading-loose">{message}</p>
                    <div className=" mt-6 origin-bottom">
                        <button className="bg-tint6 h-11 w-36 rounded-2xl text-[#274A3D] text-base font-semibold font-poppins mt-4">Ya</button>
                        <button className="bg-shade6 h-11 w-36 rounded-2xl text-white text-base font-semibold font-poppins mt-4 ms-4" onClick={() => onClose()}>Tidak</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AlertConfirm