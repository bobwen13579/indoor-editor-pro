(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[1],{

/***/ "./store/configureStore.dev.ts":
/*!*************************************!*\
  !*** ./store/configureStore.dev.ts ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return configureStore; });\n/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux */ \"./node_modules/redux/es/redux.js\");\n/* harmony import */ var redux_logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! redux-logger */ \"./node_modules/redux-logger/dist/redux-logger.js\");\n/* harmony import */ var redux_logger__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(redux_logger__WEBPACK_IMPORTED_MODULE_1__);\n!(function webpackMissingModule() { var e = new Error(\"Cannot find module '../action/index'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }());\n\n\n\nfunction configureStore(initialState) {\n    if (initialState === void 0) { initialState = {}; }\n    return Object(redux__WEBPACK_IMPORTED_MODULE_0__[\"createStore\"])(!(function webpackMissingModule() { var e = new Error(\"Cannot find module '../action/index'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }()), initialState, Object(redux__WEBPACK_IMPORTED_MODULE_0__[\"compose\"])(Object(redux__WEBPACK_IMPORTED_MODULE_0__[\"applyMiddleware\"])(Object(redux_logger__WEBPACK_IMPORTED_MODULE_1__[\"createLogger\"])())));\n}\n\n\n//# sourceURL=webpack:///./store/configureStore.dev.ts?");

/***/ })

}]);