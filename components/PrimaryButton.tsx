import React from 'react';
import Link from 'next/link';

interface PrimaryButtonProps {
    href?: string;
    onClick?: () => void;
    children: React.ReactNode;
    className?: string;
    showIcon?: boolean;
}

const PrimaryButton = ({
    href,
    onClick,
    children,
    className = '',
    showIcon = true
}: PrimaryButtonProps) => {
    const baseClasses = "group relative px-8 py-4 bg-neutral-30 text-white font-sans font-medium text-lg rounded-full transition-all hover:scale-105 active:scale-95 shadow-md hover:shadow-lg flex items-center gap-3";
    const combinedClasses = `${baseClasses} ${className}`;

    const Icon = () => (
        <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
    );

    if (href) {
        return (
            <Link href={href} className={combinedClasses}>
                <span>{children}</span>
                {showIcon && <Icon />}
            </Link>
        );
    }

    return (
        <button onClick={onClick} className={combinedClasses}>
            <span>{children}</span>
            {showIcon && <Icon />}
        </button>
    );
};

export default PrimaryButton;
