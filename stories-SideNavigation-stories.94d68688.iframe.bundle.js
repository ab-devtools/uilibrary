"use strict";(self.webpackChunkdino_ui_tools=self.webpackChunkdino_ui_tools||[]).push([[1236],{"./src/assets/images/avatar.jpg":(module,__unused_webpack_exports,__webpack_require__)=>{module.exports=__webpack_require__.p+"static/media/avatar.bf272857.jpg"},"./src/stories/SideNavigation.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{SideNavigation:()=>SideNavigation,__namedExportsOrder:()=>__namedExportsOrder,default:()=>SideNavigation_stories});var defineProperty=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/defineProperty.js"),slicedToArray=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/slicedToArray.js"),react=__webpack_require__("./node_modules/react/index.js"),src=__webpack_require__("./src/index.ts"),Text=__webpack_require__("./src/components/Text/index.ts"),Divider=__webpack_require__("./src/components/Divider/index.ts"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js"),Block=function Block(props){var children=props.children,label=props.label;return(0,jsx_runtime.jsxs)("div",{className:"navigation-block",children:[(0,jsx_runtime.jsx)("div",{className:"navigation-block__label",children:(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)(Text.E,{size:"standard",type:"tertiary",className:"navigation-block__label__text",children:label}),(0,jsx_runtime.jsx)(Divider.c,{type:"primary",isHorizontal:!0,className:"navigation-block__label__divider"})]})}),(0,jsx_runtime.jsx)("div",{className:"navigation-block__inner",children})]})};Block.displayName="Block",Block.__docgenInfo={description:"",methods:[],displayName:"Block",props:{children:{required:!0,tsType:{name:"ReactNode"},description:""},label:{required:!1,tsType:{name:"string"},description:""},isOpen:{required:!1,tsType:{name:"boolean"},description:""}}};var types=__webpack_require__("./src/components/SideNavigation/NavigationItem/types.ts");const logo_namespaceObject=__webpack_require__.p+"static/media/logo.830419fc.svg",logo_closed_namespaceObject=__webpack_require__.p+"static/media/logo-closed.018fabad.svg";var avatar=__webpack_require__("./src/assets/images/avatar.jpg"),IconDocument=__webpack_require__("./src/components/SVGIcons/IconDocument.tsx"),IconLockClosed=__webpack_require__("./src/components/SVGIcons/IconLockClosed.tsx"),IconHome=__webpack_require__("./src/components/SVGIcons/IconHome.tsx"),IconSavings=__webpack_require__("./src/components/SVGIcons/IconSavings.tsx"),IconWallet=__webpack_require__("./src/components/SVGIcons/IconWallet.tsx"),IconSignOut=__webpack_require__("./src/components/SVGIcons/IconSignOut.tsx"),IconDocumentFilled=__webpack_require__("./src/components/SVGIcons/IconDocumentFilled.tsx");function ownKeys(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);r&&(o=o.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,o)}return t}function _objectSpread(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?ownKeys(Object(t),!0).forEach((function(r){(0,defineProperty.A)(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):ownKeys(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}const SideNavigation_stories={title:"Side Navigation",component:src.E1y,argTypes:{}};var Template=function Template(args){var _useState=(0,react.useState)(!0),_useState2=(0,slicedToArray.A)(_useState,2),isOpen=_useState2[0],setIsOpen=_useState2[1];return(0,jsx_runtime.jsxs)(src.E1y,_objectSpread(_objectSpread({},args),{},{setOpen:setIsOpen,isOpen,children:[(0,jsx_runtime.jsx)("header",{children:(0,jsx_runtime.jsx)(src.s$M,{As:function As(){return(0,jsx_runtime.jsx)("div",{children:(0,jsx_runtime.jsx)(src._V3,{imagePath:isOpen?logo_namespaceObject:logo_closed_namespaceObject,isBackgroundImage:!1})})},type:types.L.MAIN,isOpen})}),(0,jsx_runtime.jsxs)("main",{children:[(0,jsx_runtime.jsx)(Block,{isOpen,label:"Finance",children:(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)(src.s$M,{As:function As(){return(0,jsx_runtime.jsxs)("a",{href:"/https://ameriabank.am",children:[(0,jsx_runtime.jsx)(IconDocumentFilled.A,{}),(0,jsx_runtime.jsx)(src.EYj,{children:"Accounts"})]})},type:types.L.MAIN,isOpen,active:!0}),(0,jsx_runtime.jsx)(src.s$M,{As:function As(){return(0,jsx_runtime.jsxs)("a",{href:"/https://ameriabank.am",children:[(0,jsx_runtime.jsx)(IconLockClosed.A,{}),(0,jsx_runtime.jsx)(src.EYj,{children:"Test"})]})},type:types.L.MAIN,isOpen,showAction:args.showAction}),(0,jsx_runtime.jsx)(src.s$M,{As:function As(){return(0,jsx_runtime.jsxs)("a",{children:[(0,jsx_runtime.jsx)(IconHome.A,{}),(0,jsx_runtime.jsx)(src.EYj,{children:"Cards"})]})},type:types.L.MAIN,isOpen,expandable:!0,children:(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)(src.s$M,{As:function As(){return(0,jsx_runtime.jsxs)("a",{href:"/https://ameriabank.am",children:[(0,jsx_runtime.jsx)(IconDocument.A,{}),(0,jsx_runtime.jsx)(src.EYj,{children:"Accounts"})]})},type:types.L.SUB,isOpen}),(0,jsx_runtime.jsx)(src.s$M,{As:function As(){return(0,jsx_runtime.jsxs)("a",{href:"/https://ameriabank.am",children:[(0,jsx_runtime.jsx)(IconSavings.A,{}),(0,jsx_runtime.jsx)(src.EYj,{children:"Savings"})]})},type:types.L.SUB,isOpen}),(0,jsx_runtime.jsx)(src.s$M,{As:function As(){return(0,jsx_runtime.jsxs)("a",{href:"/https://ameriabank.am",children:[(0,jsx_runtime.jsx)(IconWallet.A,{}),(0,jsx_runtime.jsx)(src.EYj,{children:"Overdraft"})]})},type:types.L.SUB,isOpen})]})}),(0,jsx_runtime.jsx)(src.s$M,{As:function As(){return(0,jsx_runtime.jsxs)("a",{href:"/https://ameriabank.am",children:[(0,jsx_runtime.jsx)(IconSavings.A,{}),(0,jsx_runtime.jsx)(src.EYj,{children:"Savings"})]})},type:types.L.MAIN,isOpen,showBadge:!0,badgeContent:"888+"})]})}),(0,jsx_runtime.jsx)(Block,{isOpen,label:"Finance",children:(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)(src.s$M,{As:function As(){return(0,jsx_runtime.jsxs)("a",{href:"/https://ameriabank.am",children:[(0,jsx_runtime.jsx)(IconWallet.A,{}),(0,jsx_runtime.jsx)(src.EYj,{children:"Overdraft"})]})},type:types.L.MAIN,isOpen}),(0,jsx_runtime.jsx)(src.s$M,{As:function As(){return(0,jsx_runtime.jsxs)("a",{href:"/https://ameriabank.am",children:[(0,jsx_runtime.jsx)(IconHome.A,{}),(0,jsx_runtime.jsx)(src.EYj,{children:"Mortgage"})]})},type:types.L.MAIN,isOpen}),(0,jsx_runtime.jsx)(src.s$M,{As:function As(){return(0,jsx_runtime.jsxs)("a",{children:[(0,jsx_runtime.jsx)(IconSavings.A,{}),(0,jsx_runtime.jsx)(src.EYj,{children:"Car Leon"})]})},type:types.L.MAIN,isOpen,expandable:!0,children:(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)(src.s$M,{As:function As(){return(0,jsx_runtime.jsxs)("a",{href:"/https://ameriabank.am",children:[(0,jsx_runtime.jsx)(IconSavings.A,{}),(0,jsx_runtime.jsx)(src.EYj,{children:"Savings"})]})},type:types.L.SUB,isOpen}),(0,jsx_runtime.jsx)(src.s$M,{As:function As(){return(0,jsx_runtime.jsxs)("a",{href:"/https://ameriabank.am",children:[(0,jsx_runtime.jsx)(IconDocument.A,{}),(0,jsx_runtime.jsx)(src.EYj,{children:"Accounts"})]})},type:types.L.SUB,isOpen})]})})]})})]}),(0,jsx_runtime.jsx)("footer",{children:(0,jsx_runtime.jsx)(Block,{children:(0,jsx_runtime.jsx)(src.s$M,{type:types.L.USER,isOpen,expandable:!0,As:function As(){return(0,jsx_runtime.jsxs)("div",{className:"flexbox align-items--center",children:[(0,jsx_runtime.jsx)(src.euF,{imagePath:avatar,size:"xsmall"}),isOpen?(0,jsx_runtime.jsx)(src.EYj,{className:"flexbox align-items--center justify-content--between profile-text",children:(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:["Zhorzhik Grigoryan",(0,jsx_runtime.jsx)("a",{href:"https://ameriabank.am",children:(0,jsx_runtime.jsx)(IconSignOut.A,{})})]})}):null]})},children:(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)(src.s$M,{As:function As(){return(0,jsx_runtime.jsx)("a",{href:"/",children:(0,jsx_runtime.jsx)(src.EYj,{className:"text-truncate",children:" Zhorzhik Grigoryan"})})},type:types.L.SUB,isOpen}),(0,jsx_runtime.jsx)(src.s$M,{As:function As(){return(0,jsx_runtime.jsxs)("a",{href:"/https://ameriabank.am",children:[(0,jsx_runtime.jsx)(IconSignOut.A,{}),(0,jsx_runtime.jsx)(src.EYj,{children:"Logout"})]})},type:types.L.SUB,isOpen})]})})})})]}))};Template.displayName="Template";var SideNavigation=Template.bind({});SideNavigation.args={};const __namedExportsOrder=["SideNavigation"]}}]);