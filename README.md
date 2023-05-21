# React Native Sneaky Progress
## A Sneak Shape Progress Stepper

## Installation

    npm i @bayramitto/react-native-sneaky-progress

## Description
### This component is a Progress Stepper that can be used to  progress through several steps in the progress bar


## Preview
https://twitter.com/i/status/1659489058999922688


## Example  Usage

    <AnimatedPathProgress
        numberOfCurves={4}
        step={this.state.currentStep}
        totalSteps={20}
        stepSize={12}
        fontSize={10}
        strokeWidth={20}
        background={imagesTask.task_progress_bg}
        backgroundProps={{}}
        onStep={x => console.log("current step", x)}
    />


## Properties   

| Prop  | Default  | Type | Description |
| :------------ |:---------------:| :---------------:| :-----|
| numberOfCurves | 4 | `number` | Number of curves in the progress bar |
| step | 0 | `number` | Current step in the progress bar |
| totalSteps | 20 | `number` | Total number of steps in the progress bar |
| stepSize | 12 | `number` | Size of the step in the progress bar |
| fontSize | 10 | `number` | Font size of the step in the progress bar |
| strokeWidth | 20 | `number` | Stroke width of the step in the progress bar |
| background | imagesTask.task_progress_bg | `string` | Background image of the progress bar |
| backgroundProps | {} | `object` | Background image props of the progress bar |
| onStep | x => console.log("current step", x) | `function` | Callback function when step changes in the progress bar |


