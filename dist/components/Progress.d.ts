import React from "react";
import { StyleSheet } from "react-native";
interface ProgressProps {
    step: number;
    totalSteps: number;
    stepSize?: number;
    fontSize?: number;
    numberOfCurves?: number;
    onStep?: (step: number) => void;
    strokeWidth?: number;
    background?: string;
    textColor?: string;
    backgroundProps?: StyleSheet.NamedStyles<any>;
    backgroundColor?: string;
    strokeColor?: string;
    backgroundShadowColor?: string;
}
declare const Progress: React.FC<ProgressProps>;
export default Progress;
