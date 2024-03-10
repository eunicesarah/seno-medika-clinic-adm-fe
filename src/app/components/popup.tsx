import React from 'react';

const Popup = ({ isvisible, onClose, children }: { isvisible: boolean, onClose: () => void, children: React.ReactNode }) => {
    if (!isvisible) return null

    const handleClose = (e:any) => {
        if (e.target.id === 'wrapper') onClose()
    }

    return (
        <div className=' fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center' id="wrapper" onClick={handleClose}>
            <div className='w-[600px] flex flex-col'>
                <button className='text-white text-xl place-self-end' onClick={() => onClose()}>X</button>
                <div className=' p-2 rounded h-60'>{children}</div>
            </div>
        </div>
    )
}

export default Popup