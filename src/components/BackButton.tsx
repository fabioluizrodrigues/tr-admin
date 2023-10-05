'use client'

import { ChevronLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { FC } from 'react'

interface BackButtonProps {
    url?: string;
}

const BackButton: FC<BackButtonProps> = ({ url = '' }) => {
    const router = useRouter();

    function doAction() {
        if (!url) {
            router.back()
        } else {
            router.push(url)
        }
    }

    return (
        <button className='btn' onClick={() => doAction()}>
            <ChevronLeft />Voltar
        </button>
    )
}

export default BackButton