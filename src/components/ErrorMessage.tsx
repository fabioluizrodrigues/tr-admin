import { AlertOctagon, X } from 'lucide-react'
import React, { FC } from 'react'

interface ErrorMessageProps {
    message: string;
    onClose: () => void;
}

const ErrorMessage: FC<ErrorMessageProps> = ({ message, onClose }) => {
    return (
        <div className="alert shadow">
            <AlertOctagon color='red' />
            <div>
                <div className="text-red-500">
                    {message}
                </div>
            </div>
            <button className="btn btn-sm" onClick={() => onClose()}>
                <X />
            </button>
        </div>
    )
}

export default ErrorMessage