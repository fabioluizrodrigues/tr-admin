import { Ban } from 'lucide-react';
import React, { FC } from 'react'

interface IsEmptyListProps {
    message?: string;
}

export const IsEmptyList: FC<IsEmptyListProps> = ({ message }) => {
    return (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
            <div className='flex flex-row gap-2 p-5 bg-neutral-200 border border-neutral-400 shadow rounded'>
                <Ban />
                <p>{message ? message : 'Nenhum registro encontrato.'}</p>
            </div>
        </div>
    )
}
