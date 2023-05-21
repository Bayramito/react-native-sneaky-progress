import React from "react";
interface ProgressProps {
    step: number;
    totalSteps: number;
    stepSize?: number;
    fontSize?: number;
    numberOfCurves?: number;
    onStep?: (step: number) => void;
    strokeWidth?: number;
    background?: string;
    fontFamily?: string;
}
declare const Progress: React.FC<ProgressProps>;
export default Progress;
