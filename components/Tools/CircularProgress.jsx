import React from 'react';

const CircularProgress = ({ radius, strokeWidth, progress, value }) => {
    const normalizedRadius = radius - strokeWidth / 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const progressOffset = ((100 - progress) / 100) * circumference;

    return (
        <svg width={radius * 2} height={radius * 2}>
            <circle
                stroke="#FFF0E3"
                strokeWidth={strokeWidth}
                fill="transparent"
                r={normalizedRadius}
                cx={radius}
                cy={radius}
            />
            <circle
                stroke="#fe9837"
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                strokeDashoffset={progressOffset}
                fill="transparent"
                r={normalizedRadius}
                cx={radius}
                cy={radius}
            />
            <text className="fw-bold font-20" x={radius} y={radius} textAnchor="middle" dominantBaseline="middle">
                {value}
            </text>
        </svg>
    );
};

export default CircularProgress;