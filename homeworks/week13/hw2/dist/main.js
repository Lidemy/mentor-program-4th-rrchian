/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/* eslint-disable */
var discussionPlugin;
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/api.js":
/*!********************!*\
  !*** ./src/api.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getDiscussions\": () => (/* binding */ getDiscussions),\n/* harmony export */   \"addDiscussions\": () => (/* binding */ addDiscussions)\n/* harmony export */ });\n/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ \"jquery\");\n/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);\n\n\nfunction getDiscussions(apiUrl, siteKey, before, cb) {\n    let url = `${apiUrl}/api_comments.php?site_key=${siteKey}`;\n  \n    if (before) {\n      url += '&before=' + before;\n    }\n  \n    jquery__WEBPACK_IMPORTED_MODULE_0___default().ajax({\n      url\n    }).done(function(data) {\n      cb(data);\n    });\n  }\n\n  function addDiscussions(apiUrl, siteKey, data, cb){\n    jquery__WEBPACK_IMPORTED_MODULE_0___default().ajax({\n        type: 'POST',\n        url: `${apiUrl}/api_add_comments.php`,\n        data\n      }).done(function(data) {\n        cb(data)\n      });\n  }\n\n//# sourceURL=webpack://discussionPlugin/./src/api.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"init\": () => (/* binding */ init)\n/* harmony export */ });\n/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api */ \"./src/api.js\");\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ \"./src/utils.js\");\n/* harmony import */ var _templates__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./templates */ \"./src/templates.js\");\n/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! jquery */ \"jquery\");\n/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_3__);\n\n\n\n\n\nfunction init(options){\n    let siteKey = '';\n    let apiUrl = '';\n    let containerElement = null;\n    let discussionDOM = null;\n    let lastId = null;\n    let isEnd = false;\n    let loadMoreClassName\n    let discussionsClassName\n    let discussionsSelector\n    let formClassName \n    let formSelector\n\n  siteKey = options.siteKey\n  apiUrl = options.apiUrl\n\n  loadMoreClassName = `${siteKey}-load-more`\n  discussionsClassName = `${siteKey}-discussions`\n  discussionsSelector = '.' + discussionsClassName\n  formClassName = `${siteKey}-add-discussion-form`\n  formSelector = '.' + formClassName\n\n  containerElement = jquery__WEBPACK_IMPORTED_MODULE_3___default()(options.containerSelector)\n  containerElement.append((0,_templates__WEBPACK_IMPORTED_MODULE_2__.getForm)(formClassName, discussionsClassName))\n\n  ;(0,_utils__WEBPACK_IMPORTED_MODULE_1__.appendStyle)(_templates__WEBPACK_IMPORTED_MODULE_2__.cssTemplate)\n\n  discussionDOM = jquery__WEBPACK_IMPORTED_MODULE_3___default()(discussionsSelector);\n  getNewDiscussions();\n\n  jquery__WEBPACK_IMPORTED_MODULE_3___default()(discussionsSelector).on('click', '.' + loadMoreClassName, () => {\n    getNewDiscussions();\n  });\n\n  jquery__WEBPACK_IMPORTED_MODULE_3___default()(formSelector).submit(e => {\n    e.preventDefault();\n    const nickNameDOM = jquery__WEBPACK_IMPORTED_MODULE_3___default()(`${formSelector} input[name=nickname]`)\n    const contentDOM = jquery__WEBPACK_IMPORTED_MODULE_3___default()(`${formSelector} textarea[name=content]`)\n\n    const newDiscussion = {\n      'site_key': siteKey,\n      'nickname': nickNameDOM.val(),\n      'content': contentDOM.val()\n    };\n    (0,_api__WEBPACK_IMPORTED_MODULE_0__.addDiscussions)(apiUrl, siteKey, newDiscussion, data => {\n        if (!data.ok) {\n            alert(data.message);\n            return;\n          }\n          // make input and textarea empty by ''\n          nickNameDOM.val('');\n          contentDOM.val('');\n        \n          (0,_utils__WEBPACK_IMPORTED_MODULE_1__.appendDiscussionToDOM)(discussionDOM, newDiscussion, true);\n      })\n  })\n  function getNewDiscussions() {\n    const discussionDOM = jquery__WEBPACK_IMPORTED_MODULE_3___default()(discussionsSelector);\n  \n    jquery__WEBPACK_IMPORTED_MODULE_3___default()('.' + loadMoreClassName).hide();\n  \n    if (isEnd) {\n      return;\n    }\n  \n    (0,_api__WEBPACK_IMPORTED_MODULE_0__.getDiscussions)(apiUrl, siteKey, lastId, data => {\n      if (!data.ok) {\n        alert(data.message);\n        return;\n      }\n  \n      const discussions = data.discussions;\n  \n      discussions.forEach(discussion => (0,_utils__WEBPACK_IMPORTED_MODULE_1__.appendDiscussionToDOM)(discussionDOM, discussion));\n  \n      let length = discussions.length;\n  \n      if (length === 0) {\n        isEnd = true;\n        jquery__WEBPACK_IMPORTED_MODULE_3___default()('.' + loadMoreClassName).hide();\n      } else {\n        lastId = discussions[length - 1].id;\n        const loadMoreButtonHTML = (0,_templates__WEBPACK_IMPORTED_MODULE_2__.getLoadMoreButtonHTML)(loadMoreClassName)\n        jquery__WEBPACK_IMPORTED_MODULE_3___default()(discussionsSelector).append(loadMoreButtonHTML);\n      }\n    });\n  }  \n}\n\n//# sourceURL=webpack://discussionPlugin/./src/index.js?");

/***/ }),

/***/ "./src/templates.js":
/*!**************************!*\
  !*** ./src/templates.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"cssTemplate\": () => (/* binding */ cssTemplate),\n/* harmony export */   \"getLoadMoreButtonHTML\": () => (/* binding */ getLoadMoreButtonHTML),\n/* harmony export */   \"getForm\": () => (/* binding */ getForm)\n/* harmony export */ });\nconst cssTemplate = '.card { margin-top: 12px;}'\n\nfunction getLoadMoreButtonHTML(className){\n    return `<button class=\"${className} btn btn-primary\">載入更多</button>`\n}\n\nfunction getForm(className, discussionsClassName){\n    return `\n    <div>    \n      <form class=\"${className}\">\n        <div class=\"form-group\">\n          <label>暱稱</label>\n          <input class=\"form-control\" name=\"nickname\" type=\"text\">\n          <label>留言內容</label>\n          <textarea class=\"form-control\" name=\"content\" rows=\"3\"></textarea>\n        </div>\n        <button class=\"btn btn-primary\" type=\"submit\">送出</button>\n      </form>\n      <div class=\"${discussionsClassName}\">\n      </div>\n    </div>\n    `\n}\n\n//# sourceURL=webpack://discussionPlugin/./src/templates.js?");

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"escape\": () => (/* binding */ escape),\n/* harmony export */   \"appendDiscussionToDOM\": () => (/* binding */ appendDiscussionToDOM),\n/* harmony export */   \"appendStyle\": () => (/* binding */ appendStyle)\n/* harmony export */ });\nfunction escape(toOutput) {\n    return toOutput\n      .replace(/\\&/g, '&amp;')\n      .replace(/\\</g, '&lt;')\n      .replace(/\\>/g, '&gt;')\n      .replace(/\\\"/g, '&quot;')\n      .replace(/\\'/g, '&#x27')\n      .replace(/\\//g, '&#x2F');\n  }\n  \n  function appendDiscussionToDOM(container, discussion, isPrepend) {\n    // card template\n    const html = `\n      <div class=\"card\">\n        <div class=\"card-body\">\n          <h5 class=\"card-title\">${escape(discussion.nickname)}</h5>\n          <p class=\"card-text\">${escape(discussion.content)}</p>\n        </div>\n      </div>\n    `;\n  \n    if (isPrepend) {\n      container.prepend(html);\n    } else {\n      container.append(html);\n    }\n  }\n\n  function appendStyle(cssTemplate){\n    const styleElement = document.createElement('style')\n    styleElement.type = 'text/css'\n    styleElement.appendChild(document.createTextNode(cssTemplate))\n    document.head.appendChild(styleElement)  \n  }\n\n//# sourceURL=webpack://discussionPlugin/./src/utils.js?");

/***/ }),

/***/ "jquery":
/*!*************************!*\
  !*** external "jQuery" ***!
  \*************************/
/***/ ((module) => {

module.exports = jQuery;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	discussionPlugin = __webpack_exports__;
/******/ 	
/******/ })()
;