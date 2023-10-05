import React, { FC } from 'react'

interface IsLoadingPanelProps {
    message?: string;
}

export const IsLoadingPanel: FC<IsLoadingPanelProps> = ({ message }) => {
    return (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
            <div className='flex flex-row gap-2 p-5 bg-neutral-200 border border-neutral-400 shadow rounded'>
                <span className="loading loading-spinner loading-xs"></span>
                <p>{message ? message : 'Carregando...'}</p>
            </div>
        </div>
    )
}
