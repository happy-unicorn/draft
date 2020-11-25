import createFocusPlugin from "draft-js-focus-plugin";
import createBlockDndPlugin from "draft-js-drag-n-drop-plugin";
// import { composeDecorators } from "draft-js-plugins-editor";

const focusPlugin = createFocusPlugin();
const blockDndPlugin = createBlockDndPlugin();

// const decorators = [
//   focusPlugin.decorator,
//   blockDndPlugin.decorator
// ];

export default [
  focusPlugin,
  blockDndPlugin
];