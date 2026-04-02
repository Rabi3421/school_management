'use client';

import React from 'react';
import * as LucideIcons from 'lucide-react';

interface IconProps {
    name: string;
    variant?: 'outline' | 'solid'; // kept for API compatibility — Lucide has one style
    size?: number;
    className?: string;
    onClick?: () => void;
    disabled?: boolean;
    [key: string]: unknown;
}

function Icon({
    name,
    size = 24,
    className = '',
    onClick,
    disabled = false,
    variant: _variant,
    ...props
}: IconProps) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const IconComponent = (LucideIcons as unknown as Record<string, React.ComponentType<any>>)[name];

    if (!IconComponent) {
        const Fallback = LucideIcons.HelpCircle;
        return (
            <Fallback
                size={size}
                className={`text-gray-400 ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
                onClick={disabled ? undefined : onClick}
                {...(props as React.SVGProps<SVGSVGElement>)}
            />
        );
    }

    return (
        <IconComponent
            size={size}
            className={`${disabled ? 'opacity-50 cursor-not-allowed' : onClick ? 'cursor-pointer hover:opacity-80' : ''} ${className}`}
            onClick={disabled ? undefined : onClick}
            {...(props as React.SVGProps<SVGSVGElement>)}
        />
    );
}

export default Icon;
