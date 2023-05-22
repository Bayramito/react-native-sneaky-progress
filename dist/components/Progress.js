import React from "react";
import { BlurMask, Canvas, Circle, Group, LinearGradient, Paint, Path, Shadow, Skia, Text, fitbox, processTransform2d, rect, rrect, useFont, useTouchHandler, vec, } from "@shopify/react-native-skia";
import { Dimensions, Image, View } from "react-native";
import { runOnJS, useDerivedValue, withTiming } from "react-native-reanimated";
const { width } = Dimensions.get("screen");
/*==========================================================================
     SETUP
 ===========================================================================*/
const HORIZONTAL_SHIFT = 30;
const LINE_HEIGHT = 80;
const LINE_START_Y = 60;
const RADIUS = 10;
const Progress = ({ step, totalSteps, stepSize, fontSize, numberOfCurves, onStep, strokeWidth, background, backgroundProps, textColor, backgroundShadowColor, strokeColor, backgroundColor, }) => {
    if (step > totalSteps) {
        throw new Error("Step cannot be greater than total steps");
    }
    else if (numberOfCurves < 2) {
        throw new Error("Number of curves cannot be less than 2");
    }
    else if (numberOfCurves > 14) {
        throw new Error("Number of curves cannot be greater than 14");
    }
    const STROKE_WIDTH = strokeWidth || 20;
    const NUMBER_OF_CURVES = numberOfCurves || 4;
    const CURVE_GAP_X = (width - HORIZONTAL_SHIFT * 2) / NUMBER_OF_CURVES;
    /*==========================================================================
         COLORS
     ===========================================================================*/
    const BACKGROUND_COLOR = backgroundColor || "#EEEEEE";
    const PROGRESS_COLOR = strokeColor || "#6FD904";
    const WAY_SHADOW_COLOR = backgroundShadowColor || "#21212145";
    const CIRCLE_FILL_COLOR = [`${PROGRESS_COLOR}60`, "#FFFFFF40"];
    const TEXT_COLOR = textColor || "#000000";
    /*==========================================================================
       CONSTANTS
     ===========================================================================*/
    const CURRENT_PROGRESS = step;
    const TOTAL_STEPS = totalSteps;
    const FONT_SIZE = fontSize || 12;
    const STEP_SIZE = stepSize || 12;
    const path = Skia.Path.Make();
    const font = useFont(require("../../lib/assets/Gilroy-Regular.ttf"), FONT_SIZE);
    Array.from({ length: NUMBER_OF_CURVES }).forEach((_, i) => {
        if (i === 0)
            path.moveTo(HORIZONTAL_SHIFT, LINE_START_Y);
        const isOdd = i % 2 === 0;
        path.lineTo(HORIZONTAL_SHIFT + CURVE_GAP_X * i, isOdd ? LINE_HEIGHT : LINE_START_Y);
        path.rArcTo(RADIUS, RADIUS, 0, false, isOdd, CURVE_GAP_X, RADIUS);
        if (i === NUMBER_OF_CURVES - 1) {
            path.lineTo(HORIZONTAL_SHIFT + CURVE_GAP_X * (i + 1), isOdd ? LINE_START_Y : LINE_HEIGHT);
        }
    });
    const src = path.computeTightBounds();
    const centered = fitRect(src, rect(HORIZONTAL_SHIFT, RADIUS / 2, width - HORIZONTAL_SHIFT * 2, LINE_HEIGHT + CURVE_GAP_X + NUMBER_OF_CURVES));
    path.transform(centered);
    const geo = new PathGeometry(path);
    const calculatedProgress = (CURRENT_PROGRESS / TOTAL_STEPS) * 100;
    const totalLength = geo.getTotalLength();
    const progress = useDerivedValue(() => withTiming(calculatedProgress / 100, { duration: 300 }, (isFinished) => {
        if (isFinished) {
            if (onStep)
                runOnJS(onStep)(step);
        }
    }), [step]);
    const onTouch = useTouchHandler({
        onStart: (e) => {
            const { x, y } = e;
        },
    });
    if (!font)
        return null;
    return (React.createElement(View, null,
        background && (React.createElement(Background, { background: background, backgroundProps: Object.assign({ width: width, height: src.height + LINE_HEIGHT }, backgroundProps) })),
        React.createElement(Canvas, { style: { width: width, height: src.height + LINE_HEIGHT }, onTouch: onTouch },
            React.createElement(Group, null,
                React.createElement(Shadow, { color: BACKGROUND_COLOR, dx: 0, dy: 0, blur: 5 }),
                React.createElement(Path, { path: path, style: "stroke", strokeWidth: STROKE_WIDTH, color: BACKGROUND_COLOR, strokeCap: "round" })),
            React.createElement(Group, null,
                React.createElement(Shadow, { color: WAY_SHADOW_COLOR, dx: 0, dy: 0, blur: 15 }),
                React.createElement(Path, { path: path, style: "stroke", strokeWidth: STROKE_WIDTH - 4, color: PROGRESS_COLOR, strokeCap: "round", end: progress.value })),
            Array.from({ length: TOTAL_STEPS }).map((item, index) => {
                return (React.createElement(StepCircle, Object.assign({ key: index }, {
                    geo,
                    totalLength,
                    TOTAL_STEPS,
                    index,
                    STEP_SIZE,
                    CURRENT_PROGRESS,
                    PROGRESS_COLOR,
                    FONT_SIZE,
                    font,
                    CIRCLE_FILL_COLOR,
                    TEXT_COLOR,
                })));
            }))));
};
export default Progress;
const StepCircle = ({ geo, totalLength, TOTAL_STEPS, index, STEP_SIZE, CURRENT_PROGRESS, PROGRESS_COLOR, FONT_SIZE, font, x, y, CIRCLE_FILL_COLOR, TEXT_COLOR, }) => {
    const isLastStep = index === TOTAL_STEPS - 1;
    const point = geo.getPointAtLength((totalLength / TOTAL_STEPS) * (index + 1));
    const border = Skia.Path.Make();
    border.addRRect(rrect(rect(point.x - (isLastStep ? STEP_SIZE * 1.1 : STEP_SIZE), point.y - (isLastStep ? STEP_SIZE * 1.1 : STEP_SIZE), isLastStep ? STEP_SIZE * 2.4 : STEP_SIZE * 2, isLastStep ? STEP_SIZE * 2.4 : STEP_SIZE * 2), isLastStep ? STEP_SIZE * 2 : STEP_SIZE, isLastStep ? STEP_SIZE * 2 : STEP_SIZE));
    return (React.createElement(Group, null,
        React.createElement(Circle, { cx: point.x, cy: point.y, r: isLastStep ? STEP_SIZE * 1.2 : STEP_SIZE, color: "white" },
            CURRENT_PROGRESS > index && (React.createElement(Paint, null,
                React.createElement(LinearGradient, { start: vec(point.x, point.y), end: vec(point.x + STEP_SIZE, point.y + STEP_SIZE), colors: CIRCLE_FILL_COLOR }))),
            React.createElement(BlurMask, { blur: 5, style: "inner" })),
        React.createElement(Path, { style: "stroke", color: PROGRESS_COLOR, path: border, strokeWidth: 0.5 }),
        React.createElement(Text, { text: `${index + 1}`, x: point.x - (FONT_SIZE / 2) * (index >= 10 ? 0.75 : 0.75), y: point.y + (FONT_SIZE / 2) * 0.7, font: font, color: TEXT_COLOR || "black" })));
};
const Background = ({ backgroundProps, background, }) => {
    return (React.createElement(Image, { source: background, style: Object.assign({ position: "absolute", top: 0, left: 0 }, backgroundProps), resizeMode: "cover" }));
};
class PathGeometry {
    constructor(path, resScale = 1) {
        Object.defineProperty(this, "totalLength", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "contour", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        const it = Skia.ContourMeasureIter(path, false, resScale);
        const contour = it.next();
        this.totalLength = contour.length();
        this.contour = contour;
    }
    getTotalLength() {
        return this.totalLength;
    }
    getPointAtLength(length) {
        const [pos] = this.contour.getPosTan(length);
        return pos;
    }
}
const fitRect = (src, dst) => processTransform2d(fitbox("contain", src, dst));
