"use strict";(self.webpackChunkdino_ui_tools=self.webpackChunkdino_ui_tools||[]).push([[425],{"./src/stories/Table.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Table:()=>Table,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/defineProperty.js"),_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js"),_index__WEBPACK_IMPORTED_MODULE_2__=(__webpack_require__("./node_modules/react/index.js"),__webpack_require__("./src/index.ts")),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/react/jsx-runtime.js");function ownKeys(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);r&&(o=o.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,o)}return t}function _objectSpread(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?ownKeys(Object(t),!0).forEach((function(r){(0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__.A)(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):ownKeys(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}var data=[{user:"Luke Skywalker",age:21,id:"fffffffsdf",visits:[7,8,9],progress:"fdfsdfsdfsd",status:"Active"}].concat((0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_4__.A)(Array(13).fill({user:"John Doe",age:30,id:"dsfsdf",visits:[4,5,6],progress:"divv",status:"Active"})),[{user:"John Doe",age:30,id:"dsfsdf",visits:[4,5,6],progress:"divv",status:"Active"},{user:"Bruce wayne",id:"fffffffeeeee",age:29,visits:[1,2,3],progress:"diff",status:"Active"}]),Template=function Template(args){return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_index__WEBPACK_IMPORTED_MODULE_2__.XI,_objectSpread(_objectSpread({},args),{},{data,onChange:function handleChange(state){console.log(state)},columns:[{Header:"User",accessor:"user",fixed:"left",widthInPercent:30,width:100},{Header:"Status",accessor:"status",widthInPercent:20},{accessor:"age",Header:"Age",widthInPercent:20,minWidth:100,columnProps:{sortable:!0}},{Header:"Profile Progress",accessor:"progress",widthInPercent:20},{Header:"Visits",widthInPercent:10,accessor:"visits",fixed:"right"}]}))};Template.displayName="Template";const __WEBPACK_DEFAULT_EXPORT__={title:"Table",component:_index__WEBPACK_IMPORTED_MODULE_2__.XI};var Table=Template.bind({});Table.args={fixedHeader:{y:500},withSelect:!0,data:[],columns:[]};const __namedExportsOrder=["Table"]}}]);