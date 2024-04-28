import React from 'react';

const ExpandableContent = ({ isExpanded, onClose, children }: { isExpanded: boolean, onClose: () => void, children: React.ReactNode }) => {
    if (!isExpanded) return null

    const handleClose = (e:any) => {
        if (e.target.id === 'wrapper') onClose()
    }

    return (
        <div className='flex flex-col'>
            {children}
        </div>
    )
}

export default ExpandableContent