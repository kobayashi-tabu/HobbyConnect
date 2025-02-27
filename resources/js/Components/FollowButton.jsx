import { useRef, useState, useEffect } from 'react';

export default function PrimaryButton({
    className = '',
    disabled,
    children,
    isFollowingIni,
    ...props
}) {
    useEffect(() => {
                console.log(isFollowingIni);
            }, []);

    return (
        <button
            {...props}
            className={
                `inline-flex items-center justify-center rounded-md border border-transparent px-2 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out  focus:outline-none ${isFollowingIni ? 'bg-red-500 hover:bg-red-700 focus:bg-red-700' : 'bg-blue-500 hover:bg-blue-700 focus:bg-blue-700'} ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
