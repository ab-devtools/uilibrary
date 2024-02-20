"use strict";(self.webpackChunkdino_ui_tools=self.webpackChunkdino_ui_tools||[]).push([[236],{"./src/stories/SideNavigation.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{SideNavigation:()=>SideNavigation,__namedExportsOrder:()=>__namedExportsOrder,default:()=>SideNavigation_stories});var defineProperty=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/defineProperty.js"),slicedToArray=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/slicedToArray.js"),react=__webpack_require__("./node_modules/react/index.js"),src=__webpack_require__("./src/index.ts"),Text=__webpack_require__("./src/components/Text/index.ts"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js"),Block=function Block(props){var children=props.children,label=props.label,open=props.open;return(0,jsx_runtime.jsxs)("div",{className:"side--navigation--block",children:[(0,jsx_runtime.jsx)("div",{className:"side--navigation--block--label",children:open&&(0,jsx_runtime.jsx)(Text.E,{size:"standard",type:"tertiary",children:label})}),children]})};Block.displayName="Block",Block.__docgenInfo={description:"",methods:[],displayName:"Block",props:{children:{required:!0,tsType:{name:"JSX.Element"},description:""},label:{required:!1,tsType:{name:"string"},description:""},open:{required:!1,tsType:{name:"boolean"},description:""}}};var types=__webpack_require__("./src/components/SideNavigation/NavigationItem/types.ts"),logo=__webpack_require__("./src/assets/images/logo.svg");const logo_closed_namespaceObject=__webpack_require__.p+"static/media/logo-closed.018fabad.svg";var avatar=__webpack_require__("./src/assets/images/avatar.jpg");function ownKeys(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);r&&(o=o.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,o)}return t}function _objectSpread(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?ownKeys(Object(t),!0).forEach((function(r){(0,defineProperty.A)(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):ownKeys(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}const SideNavigation_stories={title:"Side Navigation",component:src.E1,argTypes:{showAction:{options:[!0,!1]}}};var Template=function Template(args){var _useState=(0,react.useState)(!0),_useState2=(0,slicedToArray.A)(_useState,2),isOpen=_useState2[0],setIsOpen=_useState2[1];return(0,jsx_runtime.jsxs)(src.E1,_objectSpread(_objectSpread({setOpen:setIsOpen,open:isOpen},args),{},{children:[(0,jsx_runtime.jsxs)("main",{children:[(0,jsx_runtime.jsx)(src.s$,{As:function As(){return(0,jsx_runtime.jsx)("a",{href:"/https://ameriabank.am",children:(0,jsx_runtime.jsx)("img",{src:isOpen?logo:logo_closed_namespaceObject,alt:"Product Logo"})})},type:types.L.BLOCK_HEADER,isOpen,showAction:args.showAction,actionElm:args.actionElm}),(0,jsx_runtime.jsx)(Block,{open:isOpen,label:"Finance",children:(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)(src.s$,{As:function As(){return(0,jsx_runtime.jsxs)("a",{href:"/https://ameriabank.am",children:[(0,jsx_runtime.jsx)(src.In,{name:"document"}),(0,jsx_runtime.jsx)("div",{children:"Accounts"})]})},type:types.L.MAIN,isOpen,showAction:args.showAction,actionElm:args.actionElm,active:!0}),(0,jsx_runtime.jsx)(src.s$,{As:function As(){return(0,jsx_runtime.jsxs)("a",{href:"/https://ameriabank.am",children:[(0,jsx_runtime.jsx)(src.In,{name:"lock"}),(0,jsx_runtime.jsx)("div",{children:"Test"})]})},type:types.L.MAIN,isOpen,showAction:args.showAction,actionElm:args.actionElm}),(0,jsx_runtime.jsx)(src.s$,{As:function As(){return(0,jsx_runtime.jsxs)("div",{children:[(0,jsx_runtime.jsx)(src.In,{name:"home"}),(0,jsx_runtime.jsx)("div",{children:"Cards"})]})},type:types.L.MAIN,isOpen,expandable:!0,children:(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)(src.s$,{As:function As(){return(0,jsx_runtime.jsxs)("a",{href:"/https://ameriabank.am",children:[(0,jsx_runtime.jsx)(src.In,{name:"document"}),(0,jsx_runtime.jsx)("div",{children:"Accounts"})]})},type:types.L.SUB,isOpen}),(0,jsx_runtime.jsx)(src.s$,{As:function As(){return(0,jsx_runtime.jsxs)("a",{href:"/https://ameriabank.am",children:[(0,jsx_runtime.jsx)(src.In,{name:"savings"}),(0,jsx_runtime.jsx)("div",{children:"Savings"})]})},type:types.L.SUB,isOpen}),(0,jsx_runtime.jsx)(src.s$,{As:function As(){return(0,jsx_runtime.jsxs)("a",{href:"/https://ameriabank.am",children:[(0,jsx_runtime.jsx)(src.In,{name:"wallet"}),(0,jsx_runtime.jsx)("div",{children:"Overdraft"})]})},type:types.L.SUB,isOpen})]})}),(0,jsx_runtime.jsx)(src.s$,{As:function As(){return(0,jsx_runtime.jsxs)("a",{href:"/https://ameriabank.am",children:[(0,jsx_runtime.jsx)(src.In,{name:"savings"}),(0,jsx_runtime.jsx)("div",{children:"Savings"})]})},type:types.L.MAIN,isOpen,showBadge:!0,badgeContent:"888+"})]})}),(0,jsx_runtime.jsx)(Block,{open:isOpen,label:"Finance",children:(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)(src.s$,{As:function As(){return(0,jsx_runtime.jsxs)("a",{href:"/https://ameriabank.am",children:[(0,jsx_runtime.jsx)(src.In,{name:"wallet"}),(0,jsx_runtime.jsx)("div",{children:"Overdraft"})]})},type:types.L.MAIN,isOpen}),(0,jsx_runtime.jsx)(src.s$,{As:function As(){return(0,jsx_runtime.jsxs)("a",{href:"/https://ameriabank.am",children:[(0,jsx_runtime.jsx)(src.In,{name:"home"}),(0,jsx_runtime.jsx)("div",{children:"Mortgage"})]})},type:types.L.MAIN,isOpen}),(0,jsx_runtime.jsx)(src.s$,{As:function As(){return(0,jsx_runtime.jsxs)("div",{children:[(0,jsx_runtime.jsx)(src.In,{name:"savings"}),(0,jsx_runtime.jsx)("div",{children:"Car Leon"})]})},type:types.L.MAIN,isOpen,expandable:!0,children:(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)(src.s$,{As:function As(){return(0,jsx_runtime.jsxs)("a",{href:"/https://ameriabank.am",children:[(0,jsx_runtime.jsx)(src.In,{name:"savings"}),(0,jsx_runtime.jsx)("div",{children:"Savings"})]})},type:types.L.SUB,isOpen}),(0,jsx_runtime.jsx)(src.s$,{As:function As(){return(0,jsx_runtime.jsxs)("a",{href:"/https://ameriabank.am",children:[(0,jsx_runtime.jsx)(src.In,{name:"document"}),(0,jsx_runtime.jsx)("div",{children:"Accounts"})]})},type:types.L.SUB,isOpen})]})})]})})]}),(0,jsx_runtime.jsx)("footer",{children:(0,jsx_runtime.jsx)(Block,{children:(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)(src.s$,{type:types.L.MAIN,isOpen,As:function As(){return(0,jsx_runtime.jsxs)("a",{href:"/https://ameriabank.am",children:[(0,jsx_runtime.jsx)(src.In,{name:"mail"}),(0,jsx_runtime.jsx)("div",{children:"Messages"})]})}}),(0,jsx_runtime.jsx)(src.s$,{type:types.L.MAIN,isOpen,As:function As(){return(0,jsx_runtime.jsxs)("a",{href:"https://ameriabank.am",children:[(0,jsx_runtime.jsx)(src.In,{name:"notification2"}),(0,jsx_runtime.jsx)("div",{children:"Notifications"})]})}}),(0,jsx_runtime.jsx)(src.s$,{type:types.L.MAIN,isOpen,As:function As(){return(0,jsx_runtime.jsxs)("a",{href:"https://ameriabank.am",children:[(0,jsx_runtime.jsx)(src.In,{name:"settings"}),(0,jsx_runtime.jsx)("div",{children:"Settings"})]})}}),(0,jsx_runtime.jsx)(src.s$,{type:types.L.USER,isOpen,As:function As(){return(0,jsx_runtime.jsxs)("div",{onClick:function onClick(){return alert()},children:[(0,jsx_runtime.jsx)(src.eu,{imagePath:avatar,size:isOpen?"small":"xsmall"}),(0,jsx_runtime.jsx)(src.EY,{size:"medium",children:"Zhorzhik Grigoryan"}),(0,jsx_runtime.jsx)(src.In,{name:"logout"})]})}})]})})})]}))};Template.displayName="Template";var SideNavigation=Template.bind({});SideNavigation.args={showAction:!0,actionElm:(0,jsx_runtime.jsx)(src.$n,{buttonText:"Action",size:"large",iconProps:{name:"home"}})};const __namedExportsOrder=["SideNavigation"]},"./src/assets/images/avatar.jpg":(module,__unused_webpack_exports,__webpack_require__)=>{module.exports=__webpack_require__.p+"static/media/avatar.bf272857.jpg"},"./src/assets/images/logo.svg":(module,__unused_webpack_exports,__webpack_require__)=>{module.exports=__webpack_require__.p+"static/media/logo.830419fc.svg"}}]);