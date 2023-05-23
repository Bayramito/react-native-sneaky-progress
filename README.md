# React Native Sneaky Progress

## Description
 This component is a Progress Stepper that can be used to  progress through several steps in the progress bar. 
Built with React Native Skia and Reanimated v3.



## Installation

    npm i @bayramitto/react-native-sneaky-progress

or

    yarn add @bayramitto/react-native-sneaky-progress

## Preview
![ezgif-5-9760a86721](https://github.com/Bayramito/react-native-sneaky-progress/assets/44513402/f025d1b5-1752-4c76-8a7a-5a80e6eabb34)

## Example  Usage
```js
    import {Progress} from '@bayramitto/react-native-sneaky-progress';

    <Progress
        numberOfCurves={4}
        step={this.state.currentStep}
        totalSteps={20}
        stepSize={12}
        fontSize={10}
        strokeWidth={20}
        background={imagesTask.task_progress_bg}
        backgroundProps={{}}
        backgroundColor={"#EEEEEE"}
        strokeColor={"#6FD904"}
        backgroundShadowColor={"#000000"}
        textColor={"#000000"}
        onStep={x => console.log("current step", x)}
    />
```


## Properties   

| Prop  | Default  |      Type      | Description |
| :------------ |:---------------:|:--------------:| :-----|
| numberOfCurves | 4 |    `number`    | Number of curves in the progress bar |
| step | 0 |    `number`    | Current step in the progress bar |
| totalSteps | 20 |    `number`    | Total number of steps in the progress bar |
| stepSize | 12 |    `number`    | Size of the step in the progress bar |
| fontSize | 10 |    `number`    | Font size of the step in the progress bar |
| strokeWidth | 20 |    `number`    | Stroke width of the step in the progress bar |
| background | imagesTask.task_progress_bg |    `string`    | Background image of the progress bar |
| backgroundProps | {} |    `object`    | Background image props of the progress bar |
| onStep | x => console.log("current step", x) |   `function`   | Callback function when step changes in the progress bar |
| backgroundColor | #EEEEEE |    `string`    | Background color of the progress bar |
| strokeColor | #6FD904 | `string` (HEX) | Stroke color of the progress bar |
| backgroundShadowColor | #000000 |    `string`    | Background shadow color of the progress bar |
| textColor | #000000 |    `string`    | Text color of the progress bar |


## License 
MIT

## Author
Bayram Arif 





