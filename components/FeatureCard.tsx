import React from 'react';
import Image from 'next/image';

interface FeatureCardProps {
    title: string;
    description: string;
    iconSrc: string;
    className?: string;
    iconBgClass?: string;
}

const FeatureCard = ({
    title,
    description,
    iconSrc,
    className = '',
    iconBgClass = 'bg-vibe-50', // Default color
}: FeatureCardProps) => {
    return (
        <div className={`feature-card ${className}`}>
            <div className={`w-18 h-18 rounded-lg flex items-center justify-center mb-6 ${iconBgClass}`}>
                <Image src={iconSrc} alt="" width={40} height={40} />
            </div>
            <h3 className="font-heading text-2xl font-bold text-text-primary">{title}</h3>
            <p className="font-sans text-text-primary text-base leading-relaxed">
                {description}
            </p>
        </div>
    );
};

export default FeatureCard;
