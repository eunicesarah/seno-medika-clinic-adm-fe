import React from 'react';

const Popup = ({ isvisible, onClose, children }: { isvisible: boolean, onClose: () => void, children: React.ReactNode }) => {
    if (!isvisible) return null

    const handleClose = (e:any) => {
        if (e.target.id === 'wrapper') onClose()
    }

    return (
        <div className=' fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center' id="wrapper" onClick={handleClose}>
            <div className='w-[600px] flex flex-col bg-shade2 rounded-2xl'>
                <button className='text-white text-xl place-self-end pr-8 pt-4' onClick={() => onClose()}>X</button>
                <div className=' p-2 rounded h-auto'>{children}</div>
            </div>
        </div>
    )
}

export default Popup