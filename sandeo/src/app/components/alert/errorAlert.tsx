// components/ErrorAlert.tsx
import React from 'react';

type CustomAlertProps = {
    message: string;
    onClose: () => void;
};

const ErrorAlert: React.FC<CustomAlertProps> = ({ message, onClose }) => {
    return (
        <div role="alert" className="alert alert-error  left-0 top-0 absolute w-full h-full z-10 content-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none"
                 viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <span className="text-4xl">Error! : {message}</span>
            <button className="btn btn-sm btn-primary text-xl" onClick={onClose}>Retour</button>
        </div>
    );
};

export default ErrorAlert;
