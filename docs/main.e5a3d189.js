// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({12:[function(require,module,exports) {
var bundleURL = null;
function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp):\/\/[^)\n]+/g);
    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],11:[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();
  newLink.onload = function () {
    link.remove();
  };
  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;
function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');
    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":12}],39:[function(require,module,exports) {

        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
},{"_css_loader":11}],6:[function(require,module,exports) {

        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
},{"./../font/APJapanesefontT.ttf":[["APJapanesefontT.e94cf592.ttf",55],55],"_css_loader":11}],14:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.h = h;
exports.app = app;
function h(name, attributes) {
  var rest = [];
  var children = [];
  var length = arguments.length;

  while (length-- > 2) rest.push(arguments[length]);

  while (rest.length) {
    var node = rest.pop();
    if (node && node.pop) {
      for (length = node.length; length--;) {
        rest.push(node[length]);
      }
    } else if (node != null && node !== true && node !== false) {
      children.push(node);
    }
  }

  return typeof name === "function" ? name(attributes || {}, children) : {
    nodeName: name,
    attributes: attributes || {},
    children: children,
    key: attributes && attributes.key
  };
}

function app(state, actions, view, container) {
  var map = [].map;
  var rootElement = container && container.children[0] || null;
  var oldNode = rootElement && recycleElement(rootElement);
  var lifecycle = [];
  var skipRender;
  var isRecycling = true;
  var globalState = clone(state);
  var wiredActions = wireStateToActions([], globalState, clone(actions));

  scheduleRender();

  return wiredActions;

  function recycleElement(element) {
    return {
      nodeName: element.nodeName.toLowerCase(),
      attributes: {},
      children: map.call(element.childNodes, function (element) {
        return element.nodeType === 3 // Node.TEXT_NODE
        ? element.nodeValue : recycleElement(element);
      })
    };
  }

  function resolveNode(node) {
    return typeof node === "function" ? resolveNode(node(globalState, wiredActions)) : node != null ? node : "";
  }

  function render() {
    skipRender = !skipRender;

    var node = resolveNode(view);

    if (container && !skipRender) {
      rootElement = patch(container, rootElement, oldNode, oldNode = node);
    }

    isRecycling = false;

    while (lifecycle.length) lifecycle.pop()();
  }

  function scheduleRender() {
    if (!skipRender) {
      skipRender = true;
      setTimeout(render);
    }
  }

  function clone(target, source) {
    var out = {};

    for (var i in target) out[i] = target[i];
    for (var i in source) out[i] = source[i];

    return out;
  }

  function set(path, value, source) {
    var target = {};
    if (path.length) {
      target[path[0]] = path.length > 1 ? set(path.slice(1), value, source[path[0]]) : value;
      return clone(source, target);
    }
    return value;
  }

  function get(path, source) {
    var i = 0;
    while (i < path.length) {
      source = source[path[i++]];
    }
    return source;
  }

  function wireStateToActions(path, state, actions) {
    for (var key in actions) {
      typeof actions[key] === "function" ? function (key, action) {
        actions[key] = function (data) {
          var result = action(data);

          if (typeof result === "function") {
            result = result(get(path, globalState), actions);
          }

          if (result && result !== (state = get(path, globalState)) && !result.then // !isPromise
          ) {
              scheduleRender(globalState = set(path, clone(state, result), globalState));
            }

          return result;
        };
      }(key, actions[key]) : wireStateToActions(path.concat(key), state[key] = clone(state[key]), actions[key] = clone(actions[key]));
    }

    return actions;
  }

  function getKey(node) {
    return node ? node.key : null;
  }

  function eventListener(event) {
    return event.currentTarget.events[event.type](event);
  }

  function updateAttribute(element, name, value, oldValue, isSvg) {
    if (name === "key") {} else if (name === "style") {
      for (var i in clone(oldValue, value)) {
        var style = value == null || value[i] == null ? "" : value[i];
        if (i[0] === "-") {
          element[name].setProperty(i, style);
        } else {
          element[name][i] = style;
        }
      }
    } else {
      if (name[0] === "o" && name[1] === "n") {
        name = name.slice(2);

        if (element.events) {
          if (!oldValue) oldValue = element.events[name];
        } else {
          element.events = {};
        }

        element.events[name] = value;

        if (value) {
          if (!oldValue) {
            element.addEventListener(name, eventListener);
          }
        } else {
          element.removeEventListener(name, eventListener);
        }
      } else if (name in element && name !== "list" && !isSvg) {
        element[name] = value == null ? "" : value;
      } else if (value != null && value !== false) {
        element.setAttribute(name, value);
      }

      if (value == null || value === false) {
        element.removeAttribute(name);
      }
    }
  }

  function createElement(node, isSvg) {
    var element = typeof node === "string" || typeof node === "number" ? document.createTextNode(node) : (isSvg = isSvg || node.nodeName === "svg") ? document.createElementNS("http://www.w3.org/2000/svg", node.nodeName) : document.createElement(node.nodeName);

    var attributes = node.attributes;
    if (attributes) {
      if (attributes.oncreate) {
        lifecycle.push(function () {
          attributes.oncreate(element);
        });
      }

      for (var i = 0; i < node.children.length; i++) {
        element.appendChild(createElement(node.children[i] = resolveNode(node.children[i]), isSvg));
      }

      for (var name in attributes) {
        updateAttribute(element, name, attributes[name], null, isSvg);
      }
    }

    return element;
  }

  function updateElement(element, oldAttributes, attributes, isSvg) {
    for (var name in clone(oldAttributes, attributes)) {
      if (attributes[name] !== (name === "value" || name === "checked" ? element[name] : oldAttributes[name])) {
        updateAttribute(element, name, attributes[name], oldAttributes[name], isSvg);
      }
    }

    var cb = isRecycling ? attributes.oncreate : attributes.onupdate;
    if (cb) {
      lifecycle.push(function () {
        cb(element, oldAttributes);
      });
    }
  }

  function removeChildren(element, node) {
    var attributes = node.attributes;
    if (attributes) {
      for (var i = 0; i < node.children.length; i++) {
        removeChildren(element.childNodes[i], node.children[i]);
      }

      if (attributes.ondestroy) {
        attributes.ondestroy(element);
      }
    }
    return element;
  }

  function removeElement(parent, element, node) {
    function done() {
      parent.removeChild(removeChildren(element, node));
    }

    var cb = node.attributes && node.attributes.onremove;
    if (cb) {
      cb(element, done);
    } else {
      done();
    }
  }

  function patch(parent, element, oldNode, node, isSvg) {
    if (node === oldNode) {} else if (oldNode == null || oldNode.nodeName !== node.nodeName) {
      var newElement = createElement(node, isSvg);
      parent.insertBefore(newElement, element);

      if (oldNode != null) {
        removeElement(parent, element, oldNode);
      }

      element = newElement;
    } else if (oldNode.nodeName == null) {
      element.nodeValue = node;
    } else {
      updateElement(element, oldNode.attributes, node.attributes, isSvg = isSvg || node.nodeName === "svg");

      var oldKeyed = {};
      var newKeyed = {};
      var oldElements = [];
      var oldChildren = oldNode.children;
      var children = node.children;

      for (var i = 0; i < oldChildren.length; i++) {
        oldElements[i] = element.childNodes[i];

        var oldKey = getKey(oldChildren[i]);
        if (oldKey != null) {
          oldKeyed[oldKey] = [oldElements[i], oldChildren[i]];
        }
      }

      var i = 0;
      var k = 0;

      while (k < children.length) {
        var oldKey = getKey(oldChildren[i]);
        var newKey = getKey(children[k] = resolveNode(children[k]));

        if (newKeyed[oldKey]) {
          i++;
          continue;
        }

        if (newKey == null || isRecycling) {
          if (oldKey == null) {
            patch(element, oldElements[i], oldChildren[i], children[k], isSvg);
            k++;
          }
          i++;
        } else {
          var keyedNode = oldKeyed[newKey] || [];

          if (oldKey === newKey) {
            patch(element, keyedNode[0], keyedNode[1], children[k], isSvg);
            i++;
          } else if (keyedNode[0]) {
            patch(element, element.insertBefore(keyedNode[0], oldElements[i]), keyedNode[1], children[k], isSvg);
          } else {
            patch(element, oldElements[i], null, children[k], isSvg);
          }

          newKeyed[newKey] = children[k];
          k++;
        }
      }

      while (i < oldChildren.length) {
        if (getKey(oldChildren[i]) == null) {
          removeElement(element, oldElements[i], oldChildren[i]);
        }
        i++;
      }

      for (var i in oldKeyed) {
        if (!newKeyed[i]) {
          removeElement(element, oldKeyed[i][0], oldKeyed[i][1]);
        }
      }
    }
    return element;
  }
}
},{}],13:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _hyperapp = require("hyperapp");

exports.default = function () {
  return (0, _hyperapp.h)(
    "header",
    { className: "header" },
    (0, _hyperapp.h)(
      "h1",
      null,
      "OSHICON"
    ),
    (0, _hyperapp.h)(
      "p",
      null,
      "\u300C\u5A5A\u59FB\u5C4A\u306B\u540D\u524D\u3092\u66F8\u3044\u305F\u3089\u300D\u304C\u30B7\u30E5\u30DF\u30EC\u30FC\u30B7\u30E7\u30F3\u51FA\u6765\u308B\u30B5\u30A4\u30C8"
    )
  );
};
},{"hyperapp":14}],46:[function(require,module,exports) {
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

// If obj.hasOwnProperty has been overridden, then calling
// obj.hasOwnProperty(prop) will break.
// See: https://github.com/joyent/node/issues/1707

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

module.exports = function (qs, sep, eq, options) {
  sep = sep || '&';
  eq = eq || '=';
  var obj = {};

  if (typeof qs !== 'string' || qs.length === 0) {
    return obj;
  }

  var regexp = /\+/g;
  qs = qs.split(sep);

  var maxKeys = 1000;
  if (options && typeof options.maxKeys === 'number') {
    maxKeys = options.maxKeys;
  }

  var len = qs.length;
  // maxKeys <= 0 means that we should not limit keys count
  if (maxKeys > 0 && len > maxKeys) {
    len = maxKeys;
  }

  for (var i = 0; i < len; ++i) {
    var x = qs[i].replace(regexp, '%20'),
        idx = x.indexOf(eq),
        kstr,
        vstr,
        k,
        v;

    if (idx >= 0) {
      kstr = x.substr(0, idx);
      vstr = x.substr(idx + 1);
    } else {
      kstr = x;
      vstr = '';
    }

    k = decodeURIComponent(kstr);
    v = decodeURIComponent(vstr);

    if (!hasOwnProperty(obj, k)) {
      obj[k] = v;
    } else if (isArray(obj[k])) {
      obj[k].push(v);
    } else {
      obj[k] = [obj[k], v];
    }
  }

  return obj;
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};
},{}],47:[function(require,module,exports) {
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

var stringifyPrimitive = function (v) {
  switch (typeof v) {
    case 'string':
      return v;

    case 'boolean':
      return v ? 'true' : 'false';

    case 'number':
      return isFinite(v) ? v : '';

    default:
      return '';
  }
};

module.exports = function (obj, sep, eq, name) {
  sep = sep || '&';
  eq = eq || '=';
  if (obj === null) {
    obj = undefined;
  }

  if (typeof obj === 'object') {
    return map(objectKeys(obj), function (k) {
      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
      if (isArray(obj[k])) {
        return map(obj[k], function (v) {
          return ks + encodeURIComponent(stringifyPrimitive(v));
        }).join(sep);
      } else {
        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
      }
    }).join(sep);
  }

  if (!name) return '';
  return encodeURIComponent(stringifyPrimitive(name)) + eq + encodeURIComponent(stringifyPrimitive(obj));
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

function map(xs, f) {
  if (xs.map) return xs.map(f);
  var res = [];
  for (var i = 0; i < xs.length; i++) {
    res.push(f(xs[i], i));
  }
  return res;
}

var objectKeys = Object.keys || function (obj) {
  var res = [];
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);
  }
  return res;
};
},{}],45:[function(require,module,exports) {
'use strict';

exports.decode = exports.parse = require('./decode');
exports.encode = exports.stringify = require('./encode');
},{"./decode":46,"./encode":47}],44:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = sns;

var _querystring = require('querystring');

var _querystring2 = _interopRequireDefault(_querystring);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function sns(_ref) {
    var type = _ref.type,
        url = _ref.url,
        text = _ref.text,
        hashtags = _ref.hashtags;

    if (!url || !text) {
        return;
    }
    switch (type) {
        case 'twitter':
            var twContent = {
                url: url,
                text: text
            };
            if (hashtags) {
                twContent.hashtags = hashtags.join(' #');
            }
            var twurl = 'https://twitter.com/share?' + _querystring2.default.stringify(twContent);
            window.open(twurl);
            break;
        case 'line':
            var lineUrl = 'http://line.me/R/msg/text?' + [encodeURIComponent(text), encodeURIComponent(url)].join(' ');
            location.href = lineUrl;
            break;
        case 'facebook':
            var fburl = 'http://www.facebook.com/sharer.php?u=' + url;
            window.open(fburl);
            break;
        case 'copy':
            var temp = document.createElement('div');
            temp.style.position = 'absolute';
            temp.style.top = '0';
            temp.style.left = '0';
            temp.innerHTML = (text + ' ' + url).replace(/\n/g, '<br>');

            document.body.appendChild(temp);
            var range = document.createRange();
            range.selectNode(temp);
            var selection = document.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);

            var result = document.execCommand('copy');
            document.body.removeChild(temp);
            return result;
        default:
    }
}
},{"querystring":45}],23:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _hyperapp = require("hyperapp");

var _sns = require("../lib/sns");

var _sns2 = _interopRequireDefault(_sns);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function snsClick(type, state) {
  var text = "婚姻届に名前が書ける。証人にもなれる。";
  if (state.inputs.husbandFullname && state.inputs.wifeFullname) {
    text = state.inputs.husbandFullname + "\u3068" + state.inputs.wifeFullname + "\u306E\u5A5A\u59FB\u5C4A\u3092\u66F8\u3044\u3066\u307F\u305F\u3088\u3002";
  }
  (0, _sns2.default)({
    type: type,
    url: location.href,
    text: text,
    hashtags: ["oshicon"]
  });
}

exports.default = function (_ref) {
  var state = _ref.state;
  return (0, _hyperapp.h)(
    "footer",
    { className: "footer" },
    (0, _hyperapp.h)(
      "p",
      null,
      "\u203B \u753B\u50CF\u306F\u9577\u62BC\u3057\u30FB\u53F3\u30AF\u30EA\u30C3\u30AF\u3067\u4FDD\u5B58\u3057\u3066\u304F\u3060\u3055\u3044\u3002"
    ),
    (0, _hyperapp.h)(
      "p",
      null,
      "\u203B \u5B9F\u969B\u306E\u5A5A\u59FB\u5C4A\u306F\u66F8\u540D\u3092\u76F4\u7B46\u3067\u66F8\u304F\u5FC5\u8981\u304C\u3042\u308B\u305F\u3081\u3001\u3053\u3061\u3089\u3067\u4F5C\u6210\u3057\u305F\u3082\u306E\u306F\u63D0\u51FA\u51FA\u6765\u307E\u305B\u3093"
    ),
    (0, _hyperapp.h)(
      "p",
      null,
      "\u30D5\u30A9\u30F3\u30C8:",
      (0, _hyperapp.h)(
        "a",
        { href: "http://www8.plala.or.jp/p_dolce/index.html", target: "_blank" },
        "\u3042\u3093\u305A\u3044\u308D\u69D8\uFF1A\u3042\u3093\u305A\u3082\u3058"
      )
    ),
    (0, _hyperapp.h)(
      "p",
      null,
      "\u30B7\u30A7\u30A2\u3059\u308B"
    ),
    (0, _hyperapp.h)(
      "button",
      {
        className: "tw",
        onclick: function onclick(e) {
          snsClick("twitter", state);
        }
      },
      "\u30C4\u30A4\u30FC\u30C8"
    ),
    (0, _hyperapp.h)(
      "button",
      {
        className: "line",
        onclick: function onclick(e) {
          snsClick("line", state);
        }
      },
      "LINE\u3067\u9001\u308B"
    ),
    (0, _hyperapp.h)(
      "button",
      {
        className: "copy",
        onclick: function onclick(e) {
          snsClick("copy", state);
        }
      },
      "URL\u3092\u30B3\u30D4\u30FC"
    )
  );
};
},{"hyperapp":14,"../lib/sns":44}],17:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _hyperapp = require("hyperapp");

exports.default = function (_ref) {
  var state = _ref.state,
      actions = _ref.actions;
  return (0, _hyperapp.h)(
    "div",
    { className: "painter" },
    (0, _hyperapp.h)(
      "div",
      { className: "inputs" },
      (0, _hyperapp.h)(
        "p",
        null,
        (0, _hyperapp.h)(
          "label",
          null,
          "\u592B\u306B\u306A\u308B\u4EBA: \u6C0F"
        ),
        (0, _hyperapp.h)("input", {
          type: "text",
          name: "husbandSurname",
          onchange: function onchange(e) {
            return actions.changeName(e.target);
          }
        }),
        (0, _hyperapp.h)(
          "label",
          { className: "second" },
          "\u540D"
        ),
        (0, _hyperapp.h)("input", {
          type: "text",
          name: "husbandName",
          onchange: function onchange(e) {
            return actions.changeName(e.target);
          }
        })
      ),
      (0, _hyperapp.h)(
        "p",
        null,
        (0, _hyperapp.h)(
          "label",
          null,
          "\u59BB\u306B\u306A\u308B\u4EBA: \u6C0F"
        ),
        (0, _hyperapp.h)("input", {
          type: "text",
          name: "wifeSurname",
          onchange: function onchange(e) {
            return actions.changeName(e.target);
          }
        }),
        (0, _hyperapp.h)(
          "label",
          { className: "second" },
          "\u540D"
        ),
        (0, _hyperapp.h)("input", {
          type: "text",
          name: "wifeName",
          onchange: function onchange(e) {
            return actions.changeName(e.target);
          }
        })
      ),
      (0, _hyperapp.h)(
        "p",
        null,
        (0, _hyperapp.h)(
          "label",
          null,
          "\u8A3C\u4EBA1"
        ),
        (0, _hyperapp.h)("input", {
          type: "text",
          name: "witness1",
          onchange: function onchange(e) {
            return actions.changeName(e.target);
          }
        }),
        (0, _hyperapp.h)(
          "label",
          { className: "second" },
          "\u8A3C\u4EBA2"
        ),
        (0, _hyperapp.h)("input", {
          type: "text",
          name: "witness2",
          onchange: function onchange(e) {
            return actions.changeName(e.target);
          }
        })
      )
    ),
    (0, _hyperapp.h)("canvas", {
      className: "canvas",
      width: "1500",
      height: "1000",
      oncreate: function oncreate(elm) {
        var image = document.createElement("img");
        image.src = "./assets/konintodoke.png";
        image.onload = function () {
          actions.setCanvas(elm);
          actions.setImage(image);
          actions.updateImage();
        };
      }
    })
  );
};
},{"hyperapp":14}],7:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.main = undefined;

var _hyperapp = require("hyperapp");

var _Header = require("./components/Header");

var _Header2 = _interopRequireDefault(_Header);

var _Footer = require("./components/Footer");

var _Footer2 = _interopRequireDefault(_Footer);

var _Painter = require("./components/Painter");

var _Painter2 = _interopRequireDefault(_Painter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//@jsx h

var state = {
  canvas: null,
  image: null,
  inputs: {
    husbandSurname: "",
    husbandName: "",
    wifeSurname: "",
    wifeName: "",
    husbandFullname: "",
    wifeFullname: "",
    witness1: "",
    witness2: ""
  }
};

window.positions = {
  husbandSurname: {
    x: 305,
    y: 300
  },
  husbandName: {
    x: 420,
    y: 300
  },
  wifeSurname: {
    x: 540,
    y: 300
  },
  wifeName: {
    x: 660,
    y: 300
  },
  husbandFullname: {
    x: 360,
    y: 925
  },
  wifeFullname: {
    x: 600,
    y: 925
  },
  witness1: {
    x: 1010,
    y: 288
  },
  witness2: {
    x: 1260,
    y: 288
  }
};

var actions = {
  setName: function setName(elm) {
    return function (state) {
      state.inputs[elm.name] = elm.value;
      state.inputs.husbandFullname = state.inputs.husbandSurname + state.inputs.husbandName;
      state.inputs.wifeFullname = state.inputs.wifeSurname + state.inputs.wifeName;
      return state;
    };
  },
  changeName: function changeName(elm) {
    return function (state, actions) {
      actions.updateImage(actions.setName(elm));
    };
  },
  setCanvas: function setCanvas(canvas) {
    return function (state, actions) {
      var context = canvas.getContext("2d");
      context.font = "20px 'APJapanesefontT'";
      context.textAlign = "center";
      // setInterval(() => {
      //   actions.updateImage();
      // }, 500);
      return {
        canvas: canvas,
        context: context
      };
    };
  },
  setImage: function setImage(elm) {
    return function (state) {
      return { image: elm };
    };
  },
  updateImage: function updateImage(e) {
    return function (state) {
      // console.log(state.canvas);
      console.log(state);
      state.context.drawImage(state.image, 0, 0);
      Object.keys(positions).map(function (keys) {
        console.log(keys);
        if (state.inputs[keys]) {
          state.context.fillText(state.inputs[keys], positions[keys].x, positions[keys].y);
        }
      });
    };
  }
};

var view = function view(state, actions) {
  return (0, _hyperapp.h)(
    "main",
    null,
    (0, _hyperapp.h)(_Header2.default, null),
    (0, _hyperapp.h)(_Painter2.default, { state: state, actions: actions }),
    (0, _hyperapp.h)(_Footer2.default, { state: state })
  );
};

var main = exports.main = (0, _hyperapp.app)(state, actions, view, document.body);
},{"hyperapp":14,"./components/Header":13,"./components/Footer":23,"./components/Painter":17}],4:[function(require,module,exports) {
"use strict";

require("reset.css");

require("./scss/style.scss");

require("./js/app");
},{"reset.css":39,"./scss/style.scss":6,"./js/app":7}],59:[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';

var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };

  module.bundle.hotData = null;
}

module.bundle.Module = Module;

var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '59786' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
      // Clear the console after HMR
      console.clear();
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');

      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);

      removeErrorOverlay();

      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;

  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';

  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(+k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},[59,4], null)