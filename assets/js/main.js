//=======================================================
//This is the main file of the system. all the blocks, variables, arrays, text, flow, logic are initialized and declared here
//=========================================================================
'use strict';
//========================= define the code variable and tabs that contain blocks ====================
var Code = Code || {};
Code.workspace = null; // Blockly's main workspace (svg type)
// let workspace;
Code.TABS_ = ['blocks', 'esp32', 'blockcode'];// List of tab names.
Code.selected = 'blockcode';
var toolbox_width = 90;
let actionQueue = [];

//===================== define the Variables that initialize values in block components =====================
Blockly.Blocks.MinValue = 0;
Blockly.Blocks.MaxValue = 1023;
Blockly.Blocks.ConnectedBoard = "FFC_ESP32";
Blockly.Blocks.isMultitask = false;
Blockly.Blocks.isBothinputoutput = 'OFF';
Blockly.Blocks.ArraySize = 0;
Blockly.Blocks.START_NODE = ["esp32start", "multitask"];
Blockly.Blocks.CustomeArrayTxt = "Type your custom code here";
Blockly.Blocks.MutationCanvas = null;
Blockly.Blocks.InputPinArray = [["A0", "A0"], ["A1", "A1"], ["A2", "A2"], ["A3", "A3"], ["A4", "A4"], ["A5", "A5"], ["A6", "A6"], ["A7", "A7"], ["A8", "A8"], ["A9", "A9"]];
Blockly.Blocks.OutputPinArray = [["O0", "O0"], ["O1", "O1"], ["O2", "O2"], ["O3", "O3"], ["O4", "O4"], ["O5", "O5"], ["O6", "O6"], ["O7", "O7"], ["O8", "O8"], ["O9", "O9"]];
Blockly.Blocks.OutputPinArray_AW = [["2", "2"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"]];
//end
//================ the function that listen to drag blocks in the workspace ==================
Blockly.dragMode_ = Blockly.DRAG_NONE;
Code.blocklyIsDragging = function () {
    return (Blockly.dragMode_ != 0);
};
// =================== function to define the workspace window size,define the blocks on the workspace =========================
Code.tabClick = function (clickedName) {
    var window_height = $(window).height();
    var window_width = $(window).width();
    var header_height = $(".blockly-header").height();
    var toolbox_height = window_height - header_height;
    var container_width = window_width - toolbox_width;

    var container = document.getElementById('iContainer');
    container.style.width = container_width + "px";

    var half_width = container_width * .65;
    var code_width = container_width * .34;

    var element_blocks = document.getElementById('content_blocks');
    var element_esp32 = document.getElementById('content_esp32');

   /*  for (var i = 0; i < Code.TABS_.length; i++) {
        var name = Code.TABS_[i];
        document.getElementById('tab_' + name).className = 'taboff';
    } */

    Code.selected = clickedName;
    // document.getElementById('tab_' + clickedName).className = 'tabon';
    // document.getElementById('content_' + clickedName).style.visibility = 'visible';
return;
    if (clickedName == 'esp32') {
        Code.workspace.setVisible(false);

        element_blocks.style.visibility = 'hidden';

        element_esp32.style.display = '';
        element_esp32.style.position = "absolute";
        element_esp32.style.width = container_width + "px";
        element_esp32.style.left = "0px";

        $(".splitter").css({"display": "none"});

        if ($(window).width() < 768) {
            $("body").css({"overflow": "hidden"})
        }
    }
    else if (clickedName == 'blocks') {
        Code.workspace.setVisible(true);

        element_blocks.style.visibility = 'visible';
        element_blocks.style.width = container_width + 'px';

        element_esp32.style.display = 'none';

        $(".splitter").css({"display": "none"});

        if ($(window).width() < 768) {
            $("body").css({"overflow": "hidden"})
        }
    }
    else if (clickedName == 'blockcode') {
        Code.workspace.setVisible(true);

        element_blocks.style.visibility = 'visible';

        element_esp32.style.display = '';
        element_esp32.style.position = "static";
        element_esp32.style.width = code_width + "px";
        element_esp32.style.right = toolbox_width + "px";
        element_esp32.style.left = "auto";
        element_esp32.style.top = header_height + 'px';

        $(".splitter").css({"display": "block"});

        if ($(window).width() > 768) {
            element_blocks.style.top = "55" + 'px';
            element_blocks.style.height = svg_height + 'px';
            element_blocks.style.width = half_width + 'px';
        }
        else if ($(window).width() < 768) {
            $("body").css({"overflow-y": "scroll"});
            var svg_height = window_height - 50;
            element_blocks.style.top = "55" + 'px';
            element_blocks.style.height = svg_height + 'px';
            var responsive_width = window_width-20;
            element_blocks.style.width = responsive_width + 'px';
            element_esp32.style.width  = responsive_width + 'px';
            
        }
    }

    $(".toolbox-btm").css({"top": header_height + "px"});

    $('#btm_toolbox').slimScroll({
        color: '#515459',
        opacity: 1,
        zIndex: 99999,
        height: toolbox_height
    });

    Blockly.svgResize(Code.workspace);
};
// =============================================== define the objects to be defined in the workspace ==================
var goog = /* goog || */ {};
goog.isDef = function (a) {
    return void 0 !== a
};
goog.typeOf = function (a) {
    var b = typeof a;
    if ("object" == b)
        if (a) {
            if (a instanceof Array) return "array";
            if (a instanceof Object) return b;
            var c = Object.prototype.toString.call(a);
            if ("[object Window]" == c) return "object";
            if ("[object Array]" == c || "number" == typeof a.length && "undefined" != typeof a.splice && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("splice")) return "array";
            if ("[object Function]" == c || "undefined" != typeof a.call && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("call")) return "function"
        } else return "null";
    else if ("function" == b && "undefined" == typeof a.call) return "object";
    return b
};
goog.inherits = function (a, b) {
    function c() {
    }

    c.prototype = b.prototype;
    a.superClass_ = b.prototype;
    a.prototype = new c;
    a.prototype.constructor = a;
    a.base = function (a, c, f) {
        for (var g = Array(arguments.length - 2), h = 2; h < arguments.length; h++) g[h - 2] = arguments[h];
        return b.prototype[c].apply(a, g)
    }
};
// =============================================== define the color, styles of all blocks in the workspace ==================
goog.color = {};
goog.color.names = {
    aliceblue: "#f0f8ff",
    antiquewhite: "#faebd7",
    aqua: "#00ffff",
    aquamarine: "#7fffd4",
    azure: "#f0ffff",
    beige: "#f5f5dc",
    bisque: "#ffe4c4",
    black: "#000000",
    blanchedalmond: "#ffebcd",
    blue: "#0000ff",
    blueviolet: "#8a2be2",
    brown: "#a52a2a",
    burlywood: "#deb887",
    cadetblue: "#5f9ea0",
    chartreuse: "#7fff00",
    chocolate: "#d2691e",
    coral: "#ff7f50",
    cornflowerblue: "#6495ed",
    cornsilk: "#fff8dc",
    crimson: "#dc143c",
    cyan: "#00ffff",
    darkblue: "#00008b",
    darkcyan: "#008b8b",
    darkgoldenrod: "#b8860b",
    darkgray: "#a9a9a9",
    darkgreen: "#006400",
    darkgrey: "#a9a9a9",
    darkkhaki: "#bdb76b",
    darkmagenta: "#8b008b",
    darkolivegreen: "#556b2f",
    darkorange: "#ff8c00",
    darkorchid: "#9932cc",
    darkred: "#8b0000",
    darksalmon: "#e9967a",
    darkseagreen: "#8fbc8f",
    darkslateblue: "#483d8b",
    darkslategray: "#2f4f4f",
    darkslategrey: "#2f4f4f",
    darkturquoise: "#00ced1",
    darkviolet: "#9400d3",
    deeppink: "#ff1493",
    deepskyblue: "#00bfff",
    dimgray: "#696969",
    dimgrey: "#696969",
    dodgerblue: "#1e90ff",
    firebrick: "#b22222",
    floralwhite: "#fffaf0",
    forestgreen: "#228b22",
    fuchsia: "#ff00ff",
    gainsboro: "#dcdcdc",
    ghostwhite: "#f8f8ff",
    gold: "#ffd700",
    goldenrod: "#daa520",
    gray: "#808080",
    green: "#008000",
    greenyellow: "#adff2f",
    grey: "#808080",
    honeydew: "#f0fff0",
    hotpink: "#ff69b4",
    indianred: "#cd5c5c",
    indigo: "#4b0082",
    ivory: "#fffff0",
    khaki: "#f0e68c",
    lavender: "#e6e6fa",
    lavenderblush: "#fff0f5",
    lawngreen: "#7cfc00",
    lemonchiffon: "#fffacd",
    lightblue: "#add8e6",
    lightcoral: "#f08080",
    lightcyan: "#e0ffff",
    lightgoldenrodyellow: "#fafad2",
    lightgray: "#d3d3d3",
    lightgreen: "#90ee90",
    lightgrey: "#d3d3d3",
    lightpink: "#ffb6c1",
    lightsalmon: "#ffa07a",
    lightseagreen: "#20b2aa",
    lightskyblue: "#87cefa",
    lightslategray: "#778899",
    lightslategrey: "#778899",
    lightsteelblue: "#b0c4de",
    lightyellow: "#ffffe0",
    lime: "#00ff00",
    limegreen: "#32cd32",
    linen: "#faf0e6",
    magenta: "#ff00ff",
    maroon: "#800000",
    mediumaquamarine: "#66cdaa",
    mediumblue: "#0000cd",
    mediumorchid: "#ba55d3",
    mediumpurple: "#9370db",
    mediumseagreen: "#3cb371",
    mediumslateblue: "#7b68ee",
    mediumspringgreen: "#00fa9a",
    mediumturquoise: "#48d1cc",
    mediumvioletred: "#c71585",
    midnightblue: "#191970",
    mintcream: "#f5fffa",
    mistyrose: "#ffe4e1",
    moccasin: "#ffe4b5",
    navajowhite: "#ffdead",
    navy: "#000080",
    oldlace: "#fdf5e6",
    olive: "#808000",
    olivedrab: "#6b8e23",
    orange: "#ffa500",
    orangered: "#ff4500",
    orchid: "#da70d6",
    palegoldenrod: "#eee8aa",
    palegreen: "#98fb98",
    paleturquoise: "#afeeee",
    palevioletred: "#db7093",
    papayawhip: "#ffefd5",
    peachpuff: "#ffdab9",
    peru: "#cd853f",
    pink: "#ffc0cb",
    plum: "#dda0dd",
    powderblue: "#b0e0e6",
    purple: "#800080",
    red: "#ff0000",
    rosybrown: "#bc8f8f",
    royalblue: "#4169e1",
    saddlebrown: "#8b4513",
    salmon: "#fa8072",
    sandybrown: "#f4a460",
    seagreen: "#2e8b57",
    seashell: "#fff5ee",
    sienna: "#a0522d",
    silver: "#c0c0c0",
    skyblue: "#87ceeb",
    slateblue: "#6a5acd",
    slategray: "#708090",
    slategrey: "#708090",
    snow: "#fffafa",
    springgreen: "#00ff7f",
    steelblue: "#4682b4",
    tan: "#d2b48c",
    teal: "#008080",
    thistle: "#d8bfd8",
    tomato: "#ff6347",
    turquoise: "#40e0d0",
    violet: "#ee82ee",
    wheat: "#f5deb3",
    white: "#ffffff",
    whitesmoke: "#f5f5f5",
    yellow: "#ffff00",
    yellowgreen: "#9acd32"
};
// ========================= convert the hex color values to color =================
goog.color.parse = function (a) {
    var b = {};
    a = String(a);
    var c = goog.color.prependHashIfNecessaryHelper(a);
    if (goog.color.isValidHexColor_(c)) return b.hex = goog.color.normalizeHex(c), b.type = "hex", b;
    c = goog.color.isValidRgbColor_(a);
    if (c.length) return b.hex = goog.color.rgbArrayToHex(c), b.type = "rgb", b;
    if (goog.color.names && (c = goog.color.names[a.toLowerCase()])) return b.hex = c, b.type = "named", b;
    throw Error(a + " is not a valid color string");
};
// ========================= check the correctness values of the entered color is valid or not =================
goog.color.isValidColor = function (a) {
    var b = goog.color.prependHashIfNecessaryHelper(a);
    return !!(goog.color.isValidHexColor_(b) || goog.color.isValidRgbColor_(a).length || goog.color.names && goog.color.names[a.toLowerCase()])
};
//======================= parse or convert RGB values to color =======================
goog.color.parseRgb = function (a) {
    var b = goog.color.isValidRgbColor_(a);
    if (!b.length) throw Error(a + " is not a valid RGB color");
    return b
};
goog.color.hexToRgbStyle = function (a) {
    return goog.color.rgbStyle_(goog.color.hexToRgb(a))
};
goog.color.hexTripletRe_ = /#(.)(.)(.)/;
goog.color.normalizeHex = function (a) {
    if (!goog.color.isValidHexColor_(a)) throw Error("'" + a + "' is not a valid hex color");
    4 == a.length && (a = a.replace(goog.color.hexTripletRe_, "#$1$1$2$2$3$3"));
    return a.toLowerCase()
};
goog.color.hexToRgb = function (a) {
    a = goog.color.normalizeHex(a);
    var b = parseInt(a.substr(1, 2), 16),
        c = parseInt(a.substr(3, 2), 16);
    a = parseInt(a.substr(5, 2), 16);
    return [b, c, a]
};
goog.color.rgbToHex = function (a, b, c) {
    a = Number(a);
    b = Number(b);
    c = Number(c);
    if (a != (a & 255) || b != (b & 255) || c != (c & 255)) throw Error('"(' + a + "," + b + "," + c + '") is not a valid RGB color');
    a = goog.color.prependZeroIfNecessaryHelper(a.toString(16));
    b = goog.color.prependZeroIfNecessaryHelper(b.toString(16));
    c = goog.color.prependZeroIfNecessaryHelper(c.toString(16));
    return "#" + a + b + c
};
goog.color.rgbArrayToHex = function (a) {
    return goog.color.rgbToHex(a[0], a[1], a[2])
};
goog.color.rgbToHsl = function (a, b, c) {
    a /= 255;
    b /= 255;
    c /= 255;
    var d = Math.max(a, b, c),
        e = Math.min(a, b, c),
        f = 0,
        g = 0,
        h = .5 * (d + e);
    d != e && (d == a ? f = 60 * (b - c) / (d - e) : d == b ? f = 60 * (c - a) / (d - e) + 120 : d == c && (f = 60 * (a - b) / (d - e) + 240), g = 0 < h && .5 >= h ? (d - e) / (2 * h) : (d - e) / (2 - 2 * h));
    return [Math.round(f + 360) % 360, g, h]
};
goog.color.rgbArrayToHsl = function (a) {
    return goog.color.rgbToHsl(a[0], a[1], a[2])
};
goog.color.hueToRgb_ = function (a, b, c) {
    0 > c ? c += 1 : 1 < c && --c;
    return 1 > 6 * c ? a + 6 * (b - a) * c : 1 > 2 * c ? b : 2 > 3 * c ? a + (b - a) * (2 / 3 - c) * 6 : a
};
goog.color.hslToRgb = function (a, b, c) {
    a /= 360;
    if (0 == b) c = b = a = 255 * c;
    else {
        var d, e;
        e = .5 > c ? c * (1 + b) : c + b - b * c;
        d = 2 * c - e;
        c = 255 * goog.color.hueToRgb_(d, e, a + 1 / 3);
        b = 255 * goog.color.hueToRgb_(d, e, a);
        a = 255 * goog.color.hueToRgb_(d, e, a - 1 / 3)
    }
    return [Math.round(c), Math.round(b), Math.round(a)]
};
goog.color.hslArrayToRgb = function (a) {
    return goog.color.hslToRgb(a[0], a[1], a[2])
};
goog.color.validHexColorRe_ = /^#(?:[0-9a-f]{3}){1,2}$/i;
goog.color.isValidHexColor_ = function (a) {
    return goog.color.validHexColorRe_.test(a)
};
goog.color.normalizedHexColorRe_ = /^#[0-9a-f]{6}$/;
goog.color.isNormalizedHexColor_ = function (a) {
    return goog.color.normalizedHexColorRe_.test(a)
};
goog.color.rgbColorRe_ = /^(?:rgb)?\((0|[1-9]\d{0,2}),\s?(0|[1-9]\d{0,2}),\s?(0|[1-9]\d{0,2})\)$/i;
goog.color.isValidRgbColor_ = function (a) {
    var b = a.match(goog.color.rgbColorRe_);
    if (b) {
        a = Number(b[1]);
        var c = Number(b[2]),
            b = Number(b[3]);
        if (0 <= a && 255 >= a && 0 <= c && 255 >= c && 0 <= b && 255 >= b) return [a, c, b]
    }
    return []
};
goog.color.prependZeroIfNecessaryHelper = function (a) {
    return 1 == a.length ? "0" + a : a
};
goog.color.prependHashIfNecessaryHelper = function (a) {
    return "#" == a.charAt(0) ? a : "#" + a
};
goog.color.rgbStyle_ = function (a) {
    return "rgb(" + a.join(",") + ")"
};
goog.color.hsvToRgb = function (a, b, c) {
    var d = 0,
        e = 0,
        f = 0;
    if (0 == b) f = e = d = c;
    else {
        var g = Math.floor(a / 60),
            h = a / 60 - g;
        a = c * (1 - b);
        var k = c * (1 - b * h);
        b = c * (1 - b * (1 - h));
        switch (g) {
            case 1:
                d = k;
                e = c;
                f = a;
                break;
            case 2:
                d = a;
                e = c;
                f = b;
                break;
            case 3:
                d = a;
                e = k;
                f = c;
                break;
            case 4:
                d = b;
                e = a;
                f = c;
                break;
            case 5:
                d = c;
                e = a;
                f = k;
                break;
            case 6:
            case 0:
                d = c, e = b, f = a
        }
    }
    return [Math.floor(d), Math.floor(e), Math.floor(f)]
};
goog.color.rgbToHsv = function (a, b, c) {
    var d = Math.max(Math.max(a, b), c),
        e = Math.min(Math.min(a, b), c);
    if (e == d) e = a = 0;
    else {
        var f = d - e,
            e = f / d;
        a = 60 * (a == d ? (b - c) / f : b == d ? 2 + (c - a) / f : 4 + (a - b) / f);
        0 > a && (a += 360);
        360 < a && (a -= 360)
    }
    return [a, e, d]
};
goog.color.rgbArrayToHsv = function (a) {
    return goog.color.rgbToHsv(a[0], a[1], a[2])
};
goog.color.hsvArrayToRgb = function (a) {
    return goog.color.hsvToRgb(a[0], a[1], a[2])
};
goog.color.hexToHsl = function (a) {
    a = goog.color.hexToRgb(a);
    return goog.color.rgbToHsl(a[0], a[1], a[2])
};
goog.color.hslToHex = function (a, b, c) {
    return goog.color.rgbArrayToHex(goog.color.hslToRgb(a, b, c))
};
goog.color.hslArrayToHex = function (a) {
    return goog.color.rgbArrayToHex(goog.color.hslToRgb(a[0], a[1], a[2]))
};
goog.color.hexToHsv = function (a) {
    return goog.color.rgbArrayToHsv(goog.color.hexToRgb(a))
};
goog.color.hsvToHex = function (a, b, c) {
    return goog.color.rgbArrayToHex(goog.color.hsvToRgb(a, b, c))
};
goog.color.hsvArrayToHex = function (a) {
    return goog.color.hsvToHex(a[0], a[1], a[2])
};
goog.color.hslDistance = function (a, b) {
    var c, d;
    c = .5 >= a[2] ? a[1] * a[2] : a[1] * (1 - a[2]);
    d = .5 >= b[2] ? b[1] * b[2] : b[1] * (1 - b[2]);
    return (a[2] - b[2]) * (a[2] - b[2]) + c * c + d * d - 2 * c * d * Math.cos(2 * (a[0] / 360 - b[0] / 360) * Math.PI)
};
goog.color.blend = function (a, b, c) {
    c = goog.math.clamp(c, 0, 1);
    return [Math.round(c * a[0] + (1 - c) * b[0]), Math.round(c * a[1] + (1 - c) * b[1]), Math.round(c * a[2] + (1 - c) * b[2])]
};
goog.color.darken = function (a, b) {
    return goog.color.blend([0, 0, 0], a, b)
};
goog.color.lighten = function (a, b) {
    return goog.color.blend([255, 255, 255], a, b)
};
goog.color.highContrast = function (a, b) {
    for (var c = [], d = 0; d < b.length; d++) c.push({
        color: b[d],
        diff: goog.color.yiqBrightnessDiff_(b[d], a) + goog.color.colorDiff_(b[d], a)
    });
    c.sort(function (a, b) {
        return b.diff - a.diff
    });
    return c[0].color
};
goog.color.yiqBrightness_ = function (a) {
    return Math.round((299 * a[0] + 587 * a[1] + 114 * a[2]) / 1E3)
};
goog.color.yiqBrightnessDiff_ = function (a, b) {
    return Math.abs(goog.color.yiqBrightness_(a) - goog.color.yiqBrightness_(b))
};
goog.color.colorDiff_ = function (a, b) {
    return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]) + Math.abs(a[2] - b[2])
};

goog.debug = {};
goog.debug.Error = function (a) {
    if (Error.captureStackTrace) Error.captureStackTrace(this, goog.debug.Error);
    else {
        var b = Error().stack;
        b && (this.stack = b)
    }
    a && (this.message = String(a));
    this.reportErrorToServer = !0
};
goog.inherits(goog.debug.Error, Error);
goog.debug.Error.prototype.name = "CustomError";

goog.dom = {};
goog.dom.NodeType = {
    ELEMENT: 1,
    ATTRIBUTE: 2,
    TEXT: 3,
    CDATA_SECTION: 4,
    ENTITY_REFERENCE: 5,
    ENTITY: 6,
    PROCESSING_INSTRUCTION: 7,
    COMMENT: 8,
    DOCUMENT: 9,
    DOCUMENT_TYPE: 10,
    DOCUMENT_FRAGMENT: 11,
    NOTATION: 12
};
goog.dom.getViewportSize = function (a) {
    return goog.dom.getViewportSize_(a || window)
};
goog.dom.getViewportSize_ = function (a) {
    a = a.document;
    a = goog.dom.isCss1CompatMode_(a) ? a.documentElement : a.body;
    return new goog.math.Size(a.clientWidth, a.clientHeight)
};
goog.dom.isCss1CompatMode_ = function (a) {
    return goog.dom.COMPAT_MODE_KNOWN_ ? goog.dom.ASSUME_STANDARDS_MODE : "CSS1Compat" == a.compatMode
};

goog.string = {};
goog.string.DETECT_DOUBLE_ESCAPING = !1;
goog.string.FORCE_NON_DOM_HTML_UNESCAPING = !1;
goog.string.Unicode = {
    NBSP: "\u00a0"
};
goog.string.startsWith = function (a, b) {
    return 0 == a.lastIndexOf(b, 0)
};
goog.string.endsWith = function (a, b) {
    var c = a.length - b.length;
    return 0 <= c && a.indexOf(b, c) == c
};
goog.string.caseInsensitiveStartsWith = function (a, b) {
    return 0 == goog.string.caseInsensitiveCompare(b, a.substr(0, b.length))
};
goog.string.caseInsensitiveEndsWith = function (a, b) {
    return 0 == goog.string.caseInsensitiveCompare(b, a.substr(a.length - b.length, b.length))
};
goog.string.caseInsensitiveEquals = function (a, b) {
    return a.toLowerCase() == b.toLowerCase()
};
goog.string.subs = function (a, b) {
    for (var c = a.split("%s"), d = "", e = Array.prototype.slice.call(arguments, 1); e.length && 1 < c.length;) d += c.shift() + e.shift();
    return d + c.join("%s")
};
goog.string.collapseWhitespace = function (a) {
    return a.replace(/[\s\xa0]+/g, " ").replace(/^\s+|\s+$/g, "")
};
goog.string.isEmptyOrWhitespace = function (a) {
    return /^[\s\xa0]*$/.test(a)
};
goog.string.isEmptyString = function (a) {
    return 0 == a.length
};
goog.string.isEmpty = goog.string.isEmptyOrWhitespace;
goog.string.isEmptyOrWhitespaceSafe = function (a) {
    return goog.string.isEmptyOrWhitespace(goog.string.makeSafe(a))
};
goog.string.isEmptySafe = goog.string.isEmptyOrWhitespaceSafe;
goog.string.isBreakingWhitespace = function (a) {
    return !/[^\t\n\r ]/.test(a)
};
goog.string.isAlpha = function (a) {
    return !/[^a-zA-Z]/.test(a)
};
goog.string.isNumeric = function (a) {
    return !/[^0-9]/.test(a)
};
goog.string.isAlphaNumeric = function (a) {
    return !/[^a-zA-Z0-9]/.test(a)
};
goog.string.isSpace = function (a) {
    return " " == a
};
goog.string.isUnicodeChar = function (a) {
    return 1 == a.length && " " <= a && "~" >= a || "\u0080" <= a && "\ufffd" >= a
};
goog.string.stripNewlines = function (a) {
    return a.replace(/(\r\n|\r|\n)+/g, " ")
};
goog.string.canonicalizeNewlines = function (a) {
    return a.replace(/(\r\n|\r|\n)/g, "\n")
};
goog.string.normalizeWhitespace = function (a) {
    return a.replace(/\xa0|\s/g, " ")
};
goog.string.normalizeSpaces = function (a) {
    return a.replace(/\xa0|[ \t]+/g, " ")
};
goog.string.collapseBreakingSpaces = function (a) {
    return a.replace(/[\t\r\n ]+/g, " ").replace(/^[\t\r\n ]+|[\t\r\n ]+$/g, "")
};
goog.string.trim = goog.TRUSTED_SITE && String.prototype.trim ? function (a) {
        return a.trim()
    } : function (a) {
        return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g, "")
    };
goog.string.trimLeft = function (a) {
    return a.replace(/^[\s\xa0]+/, "")
};
goog.string.trimRight = function (a) {
    return a.replace(/[\s\xa0]+$/, "")
};
goog.string.caseInsensitiveCompare = function (a, b) {
    var c = String(a).toLowerCase(),
        d = String(b).toLowerCase();
    return c < d ? -1 : c == d ? 0 : 1
};
goog.string.numberAwareCompare_ = function (a, b, c) {
    if (a == b) return 0;
    if (!a) return -1;
    if (!b) return 1;
    for (var d = a.toLowerCase().match(c), e = b.toLowerCase().match(c), f = Math.min(d.length, e.length), g = 0; g < f; g++) {
        c = d[g];
        var h = e[g];
        if (c != h) return a = parseInt(c, 10), !isNaN(a) && (b = parseInt(h, 10), !isNaN(b) && a - b) ? a - b : c < h ? -1 : 1
    }
    return d.length != e.length ? d.length - e.length : a < b ? -1 : 1
};
goog.string.intAwareCompare = function (a, b) {
    return goog.string.numberAwareCompare_(a, b, /\d+|\D+/g)
};
goog.string.floatAwareCompare = function (a, b) {
    return goog.string.numberAwareCompare_(a, b, /\d+|\.\d+|\D+/g)
};
goog.string.numerateCompare = goog.string.floatAwareCompare;
goog.string.urlEncode = function (a) {
    return encodeURIComponent(String(a))
};
goog.string.urlDecode = function (a) {
    return decodeURIComponent(a.replace(/\+/g, " "))
};
goog.string.newLineToBr = function (a, b) {
    return a.replace(/(\r\n|\r|\n)/g, b ? "<br />" : "<br>")
};
goog.string.htmlEscape = function (a, b) {
    if (b) a = a.replace(goog.string.AMP_RE_, "&amp;").replace(goog.string.LT_RE_, "&lt;").replace(goog.string.GT_RE_, "&gt;").replace(goog.string.QUOT_RE_, "&quot;").replace(goog.string.SINGLE_QUOTE_RE_, "&#39;").replace(goog.string.NULL_RE_, "&#0;"), goog.string.DETECT_DOUBLE_ESCAPING && (a = a.replace(goog.string.E_RE_, "&#101;"));
    else {
        if (!goog.string.ALL_RE_.test(a)) return a;
        -1 != a.indexOf("&") && (a = a.replace(goog.string.AMP_RE_, "&amp;"));
        -1 != a.indexOf("<") && (a = a.replace(goog.string.LT_RE_,
            "&lt;"));
        -1 != a.indexOf(">") && (a = a.replace(goog.string.GT_RE_, "&gt;"));
        -1 != a.indexOf('"') && (a = a.replace(goog.string.QUOT_RE_, "&quot;"));
        -1 != a.indexOf("'") && (a = a.replace(goog.string.SINGLE_QUOTE_RE_, "&#39;"));
        -1 != a.indexOf("\x00") && (a = a.replace(goog.string.NULL_RE_, "&#0;"));
        goog.string.DETECT_DOUBLE_ESCAPING && -1 != a.indexOf("e") && (a = a.replace(goog.string.E_RE_, "&#101;"))
    }
    return a
};
goog.string.AMP_RE_ = /&/g;
goog.string.LT_RE_ = /</g;
goog.string.GT_RE_ = />/g;
goog.string.QUOT_RE_ = /"/g;
goog.string.SINGLE_QUOTE_RE_ = /'/g;
goog.string.NULL_RE_ = /\x00/g;
goog.string.E_RE_ = /e/g;
goog.string.ALL_RE_ = goog.string.DETECT_DOUBLE_ESCAPING ? /[\x00&<>"'e]/ : /[\x00&<>"']/;
goog.string.unescapeEntities = function (a) {
    return goog.string.contains(a, "&") ? !goog.string.FORCE_NON_DOM_HTML_UNESCAPING && "document" in goog.global ? goog.string.unescapeEntitiesUsingDom_(a) : goog.string.unescapePureXmlEntities_(a) : a
};
goog.string.unescapeEntitiesWithDocument = function (a, b) {
    return goog.string.contains(a, "&") ? goog.string.unescapeEntitiesUsingDom_(a, b) : a
};
goog.string.unescapeEntitiesUsingDom_ = function (a, b) {
    var c = {
            "&amp;": "&",
            "&lt;": "<",
            "&gt;": ">",
            "&quot;": '"'
        },
        d;
    d = b ? b.createElement("div") : goog.global.document.createElement("div");
    return a.replace(goog.string.HTML_ENTITY_PATTERN_, function (a, b) {
        var g = c[a];
        if (g) return g;
        if ("#" == b.charAt(0)) {
            var h = Number("0" + b.substr(1));
            isNaN(h) || (g = String.fromCharCode(h))
        }
        g || (d.innerHTML = a + " ", g = d.firstChild.nodeValue.slice(0, -1));
        return c[a] = g
    })
};
goog.string.unescapePureXmlEntities_ = function (a) {
    return a.replace(/&([^;]+);/g, function (a, c) {
        switch (c) {
            case "amp":
                return "&";
            case "lt":
                return "<";
            case "gt":
                return ">";
            case "quot":
                return '"';
            default:
                if ("#" == c.charAt(0)) {
                    var d = Number("0" + c.substr(1));
                    if (!isNaN(d)) return String.fromCharCode(d)
                }
                return a
        }
    })
};
goog.string.HTML_ENTITY_PATTERN_ = /&([^;\s<&]+);?/g;
goog.string.whitespaceEscape = function (a, b) {
    return goog.string.newLineToBr(a.replace(/  /g, " &#160;"), b)
};
goog.string.preserveSpaces = function (a) {
    return a.replace(/(^|[\n ]) /g, "$1" + goog.string.Unicode.NBSP)
};
goog.string.stripQuotes = function (a, b) {
    for (var c = b.length, d = 0; d < c; d++) {
        var e = 1 == c ? b : b.charAt(d);
        if (a.charAt(0) == e && a.charAt(a.length - 1) == e) return a.substring(1, a.length - 1)
    }
    return a
};
goog.string.truncate = function (a, b, c) {
    c && (a = goog.string.unescapeEntities(a));
    a.length > b && (a = a.substring(0, b - 3) + "...");
    c && (a = goog.string.htmlEscape(a));
    return a
};
goog.string.truncateMiddle = function (a, b, c, d) {
    c && (a = goog.string.unescapeEntities(a));
    if (d && a.length > b) {
        d > b && (d = b);
        var e = a.length - d;
        a = a.substring(0, b - d) + "..." + a.substring(e)
    } else a.length > b && (d = Math.floor(b / 2), e = a.length - d, a = a.substring(0, d + b % 2) + "..." + a.substring(e));
    c && (a = goog.string.htmlEscape(a));
    return a
};
goog.string.specialEscapeChars_ = {
    "\x00": "\\0",
    "\b": "\\b",
    "\f": "\\f",
    "\n": "\\n",
    "\r": "\\r",
    "\t": "\\t",
    "\x0B": "\\x0B",
    '"': '\\"',
    "\\": "\\\\",
    "<": "<"
};
goog.string.jsEscapeCache_ = {
    "'": "\\'"
};
goog.string.quote = function (a) {
    a = String(a);
    for (var b = ['"'], c = 0; c < a.length; c++) {
        var d = a.charAt(c),
            e = d.charCodeAt(0);
        b[c + 1] = goog.string.specialEscapeChars_[d] || (31 < e && 127 > e ? d : goog.string.escapeChar(d))
    }
    b.push('"');
    return b.join("")
};
goog.string.escapeString = function (a) {
    for (var b = [], c = 0; c < a.length; c++) b[c] = goog.string.escapeChar(a.charAt(c));
    return b.join("")
};
goog.string.escapeChar = function (a) {
    if (a in goog.string.jsEscapeCache_) return goog.string.jsEscapeCache_[a];
    if (a in goog.string.specialEscapeChars_) return goog.string.jsEscapeCache_[a] = goog.string.specialEscapeChars_[a];
    var b, c = a.charCodeAt(0);
    if (31 < c && 127 > c) b = a;
    else {
        if (256 > c) {
            if (b = "\\x", 16 > c || 256 < c) b += "0"
        } else b = "\\u", 4096 > c && (b += "0");
        b += c.toString(16).toUpperCase()
    }
    return goog.string.jsEscapeCache_[a] = b
};
goog.string.contains = function (a, b) {
    return -1 != a.indexOf(b)
};
goog.string.caseInsensitiveContains = function (a, b) {
    return goog.string.contains(a.toLowerCase(), b.toLowerCase())
};
goog.string.countOf = function (a, b) {
    return a && b ? a.split(b).length - 1 : 0
};
goog.string.removeAt = function (a, b, c) {
    var d = a;
    0 <= b && b < a.length && 0 < c && (d = a.substr(0, b) + a.substr(b + c, a.length - b - c));
    return d
};
goog.string.remove = function (a, b) {
    var c = new RegExp(goog.string.regExpEscape(b), "");
    return a.replace(c, "")
};
goog.string.removeAll = function (a, b) {
    var c = new RegExp(goog.string.regExpEscape(b), "g");
    return a.replace(c, "")
};
goog.string.regExpEscape = function (a) {
    return String(a).replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1").replace(/\x08/g, "\\x08")
};
goog.string.repeat = String.prototype.repeat ? function (a, b) {
        return a.repeat(b)
    } : function (a, b) {
        return Array(b + 1).join(a)
    };
goog.string.padNumber = function (a, b, c) {
    a = goog.isDef(c) ? a.toFixed(c) : String(a);
    c = a.indexOf(".");
    -1 == c && (c = a.length);
    return goog.string.repeat("0", Math.max(0, b - c)) + a
};
goog.string.makeSafe = function (a) {
    return null == a ? "" : String(a)
};
goog.string.buildString = function (a) {
    return Array.prototype.join.call(arguments, "")
};
goog.string.getRandomString = function () {
    return Math.floor(2147483648 * Math.random()).toString(36) + Math.abs(Math.floor(2147483648 * Math.random()) ^ goog.now()).toString(36)
};
goog.string.compareVersions = function (a, b) {
    for (var c = 0, d = goog.string.trim(String(a)).split("."), e = goog.string.trim(String(b)).split("."), f = Math.max(d.length, e.length), g = 0; 0 == c && g < f; g++) {
        var h = d[g] || "",
            k = e[g] || "";
        do {
            h = /(\d*)(\D*)(.*)/.exec(h) || ["", "", "", ""];
            k = /(\d*)(\D*)(.*)/.exec(k) || ["", "", "", ""];
            if (0 == h[0].length && 0 == k[0].length) break;
            var c = 0 == h[1].length ? 0 : parseInt(h[1], 10),
                m = 0 == k[1].length ? 0 : parseInt(k[1], 10),
                c = goog.string.compareElements_(c, m) || goog.string.compareElements_(0 == h[2].length, 0 == k[2].length) ||
                    goog.string.compareElements_(h[2], k[2]),
                h = h[3],
                k = k[3]
        } while (0 == c)
    }
    return c
};
goog.string.compareElements_ = function (a, b) {
    return a < b ? -1 : a > b ? 1 : 0
};
goog.string.hashCode = function (a) {
    for (var b = 0, c = 0; c < a.length; ++c) b = 31 * b + a.charCodeAt(c) >>> 0;
    return b
};
goog.string.uniqueStringCounter_ = 2147483648 * Math.random() | 0;
goog.string.createUniqueString = function () {
    return "goog_" + goog.string.uniqueStringCounter_++
};
goog.string.toNumber = function (a) {
    var b = Number(a);
    return 0 == b && goog.string.isEmptyOrWhitespace(a) ? NaN : b
};
goog.string.isLowerCamelCase = function (a) {
    return /^[a-z]+([A-Z][a-z]*)*$/.test(a)
};
goog.string.isUpperCamelCase = function (a) {
    return /^([A-Z][a-z]*)+$/.test(a)
};
goog.string.toCamelCase = function (a) {
    return String(a).replace(/\-([a-z])/g, function (a, c) {
        return c.toUpperCase()
    })
};
goog.string.toSelectorCase = function (a) {
    return String(a).replace(/([A-Z])/g, "-$1").toLowerCase()
};
goog.string.toTitleCase = function (a, b) {
    var c = goog.isString(b) ? goog.string.regExpEscape(b) : "\\s";
    return a.replace(new RegExp("(^" + (c ? "|[" + c + "]+" : "") + ")([a-z])", "g"), function (a, b, c) {
        return b + c.toUpperCase()
    })
};
goog.string.capitalize = function (a) {
    return String(a.charAt(0)).toUpperCase() + String(a.substr(1)).toLowerCase()
};
goog.string.parseInt = function (a) {
    isFinite(a) && (a = String(a));
    return goog.isString(a) ? /^\s*-?0x/i.test(a) ? parseInt(a, 16) : parseInt(a, 10) : NaN
};
goog.string.splitLimit = function (a, b, c) {
    a = a.split(b);
    for (var d = []; 0 < c && a.length;) d.push(a.shift()), c--;
    a.length && d.push(a.join(b));
    return d
};
goog.string.lastComponent = function (a, b) {
    if (b) "string" == typeof b && (b = [b]);
    else return a;
    for (var c = -1, d = 0; d < b.length; d++)
        if ("" != b[d]) {
            var e = a.lastIndexOf(b[d]);
            e > c && (c = e)
        }
    return -1 == c ? a : a.slice(c + 1)
};
goog.string.editDistance = function (a, b) {
    var c = [],
        d = [];
    if (a == b) return 0;
    if (!a.length || !b.length) return Math.max(a.length, b.length);
    for (var e = 0; e < b.length + 1; e++) c[e] = e;
    for (e = 0; e < a.length; e++) {
        d[0] = e + 1;
        for (var f = 0; f < b.length; f++) d[f + 1] = Math.min(d[f] + 1, c[f + 1] + 1, c[f] + Number(a[e] != b[f]));
        for (f = 0; f < c.length; f++) c[f] = d[f]
    }
    return d[b.length]
};

goog.isNull = function (a) {
    return null === a
};
goog.isDefAndNotNull = function (a) {
    return null != a
};
goog.isArray = function (a) {
    return "array" == goog.typeOf(a)
};
goog.isArrayLike = function (a) {
    var b = goog.typeOf(a);
    return "array" == b || "object" == b && "number" == typeof a.length
};
goog.isDateLike = function (a) {
    return goog.isObject(a) && "function" == typeof a.getFullYear
};
goog.isString = function (a) {
    return "string" == typeof a
};
goog.isBoolean = function (a) {
    return "boolean" == typeof a
};
goog.isNumber = function (a) {
    return "number" == typeof a
};
goog.isFunction = function (a) {
    return "function" == goog.typeOf(a)
};
goog.isObject = function (a) {
    var b = typeof a;
    return "object" == b && null != a || "function" == b
};
goog.getUid = function (a) {
    return a[goog.UID_PROPERTY_] || (a[goog.UID_PROPERTY_] = ++goog.uidCounter_)
};
goog.hasUid = function (a) {
    return !!a[goog.UID_PROPERTY_]
};
goog.removeUid = function (a) {
    null !== a && "removeAttribute" in a && a.removeAttribute(goog.UID_PROPERTY_);
    try {
        delete a[goog.UID_PROPERTY_]
    } catch (b) {
    }
};

goog.math = {};
goog.math.randomInt = function (a) {
    return Math.floor(Math.random() * a)
};
goog.math.uniformRandom = function (a, b) {
    return a + Math.random() * (b - a)
};
goog.math.clamp = function (a, b, c) {
    return Math.min(Math.max(a, b), c)
};
goog.math.modulo = function (a, b) {
    var c = a % b;
    return 0 > c * b ? c + b : c
};
goog.math.lerp = function (a, b, c) {
    return a + c * (b - a)
};
goog.math.nearlyEquals = function (a, b, c) {
    return Math.abs(a - b) <= (c || 1E-6)
};
goog.math.standardAngle = function (a) {
    return goog.math.modulo(a, 360)
};
goog.math.standardAngleInRadians = function (a) {
    return goog.math.modulo(a, 2 * Math.PI)
};
goog.math.toRadians = function (a) {
    return a * Math.PI / 180
};
goog.math.toDegrees = function (a) {
    return 180 * a / Math.PI
};
goog.math.angleDx = function (a, b) {
    return b * Math.cos(goog.math.toRadians(a))
};
goog.math.angleDy = function (a, b) {
    return b * Math.sin(goog.math.toRadians(a))
};
goog.math.angle = function (a, b, c, d) {
    return goog.math.standardAngle(goog.math.toDegrees(Math.atan2(d - b, c - a)))
};
goog.math.angleDifference = function (a, b) {
    var c = goog.math.standardAngle(b) - goog.math.standardAngle(a);
    180 < c ? c -= 360 : -180 >= c && (c = 360 + c);
    return c
};
goog.math.sign = Math.sign || function (a) {
        return 0 < a ? 1 : 0 > a ? -1 : a
    };
goog.math.longestCommonSubsequence = function (a, b, c, d) {
    c = c || function (a, b) {
            return a == b
        };
    d = d || function (b, c) {
            return a[b]
        };
    for (var e = a.length, f = b.length, g = [], h = 0; h < e + 1; h++) g[h] = [], g[h][0] = 0;
    for (var k = 0; k < f + 1; k++) g[0][k] = 0;
    for (h = 1; h <= e; h++)
        for (k = 1; k <= f; k++) c(a[h - 1], b[k - 1]) ? g[h][k] = g[h - 1][k - 1] + 1 : g[h][k] = Math.max(g[h - 1][k], g[h][k - 1]);
    for (var m = [], h = e, k = f; 0 < h && 0 < k;) c(a[h - 1], b[k - 1]) ? (m.unshift(d(h - 1, k - 1)), h--, k--) : g[h - 1][k] > g[h][k - 1] ? h-- : k--;
    return m
};
goog.math.sum = function (a) {
    return goog.array.reduce(arguments, function (a, c) {
        return a + c
    }, 0)
};
goog.math.average = function (a) {
    return goog.math.sum.apply(null, arguments) / arguments.length
};
goog.math.sampleVariance = function (a) {
    var b = arguments.length;
    if (2 > b) return 0;
    var c = goog.math.average.apply(null, arguments);
    return goog.math.sum.apply(null, goog.array.map(arguments, function (a) {
            return Math.pow(a - c, 2)
        })) / (b - 1)
};
goog.math.standardDeviation = function (a) {
    return Math.sqrt(goog.math.sampleVariance.apply(null, arguments))
};
goog.math.isInt = function (a) {
    return isFinite(a) && 0 == a % 1
};
goog.math.isFiniteNumber = function (a) {
    return isFinite(a) && !isNaN(a)
};
goog.math.isNegativeZero = function (a) {
    return 0 == a && 0 > 1 / a
};
goog.math.log10Floor = function (a) {
    if (0 < a) {
        var b = Math.round(Math.log(a) * Math.LOG10E);
        return b - (parseFloat("1e" + b) > a ? 1 : 0)
    }
    return 0 == a ? -Infinity : NaN
};
goog.math.safeFloor = function (a, b) {
    goog.asserts.assert(!goog.isDef(b) || 0 < b);
    return Math.floor(a + (b || 2E-15))
};
goog.math.safeCeil = function (a, b) {
    goog.asserts.assert(!goog.isDef(b) || 0 < b);
    return Math.ceil(a - (b || 2E-15))
};
goog.math.Size = function (a, b) {
    this.width = a;
    this.height = b
};
goog.math.Coordinate = function (a, b) {
    this.x = goog.isDef(a) ? a : 0;
    this.y = goog.isDef(b) ? b : 0
};

goog.style = {};
goog.style.getViewportPageOffset = function (a) {
    var b = a.body;
    a = a.documentElement;
    return new goog.math.Coordinate(b.scrollLeft || a.scrollLeft, b.scrollTop || a.scrollTop)
};

goog.asserts = {};
goog.asserts.ENABLE_ASSERTS = goog.DEBUG;
goog.asserts.AssertionError = function (a, b) {
    b.unshift(a);
    goog.debug.Error.call(this, goog.string.subs.apply(null, b));
    b.shift();
    this.messagePattern = a
};
goog.inherits(goog.asserts.AssertionError, goog.debug.Error);
goog.asserts.AssertionError.prototype.name = "AssertionError";
goog.asserts.DEFAULT_ERROR_HANDLER = function (a) {
    throw a;
};
goog.asserts.errorHandler_ = goog.asserts.DEFAULT_ERROR_HANDLER;
goog.asserts.doAssertFailure_ = function (a, b, c, d) {
    var e = "Assertion failed";
    if (c) var e = e + (": " + c),
        f = d;
    else a && (e += ": " + a, f = b);
    a = new goog.asserts.AssertionError("" + e, f || []);
    goog.asserts.errorHandler_(a)
};
goog.asserts.setErrorHandler = function (a) {
    goog.asserts.ENABLE_ASSERTS && (goog.asserts.errorHandler_ = a)
};
goog.asserts.assert = function (a, b, c) {
    goog.asserts.ENABLE_ASSERTS && !a && goog.asserts.doAssertFailure_("", null, b, Array.prototype.slice.call(arguments, 2));
    return a
};
goog.asserts.fail = function (a, b) {
    goog.asserts.ENABLE_ASSERTS && goog.asserts.errorHandler_(new goog.asserts.AssertionError("Failure" + (a ? ": " + a : ""), Array.prototype.slice.call(arguments, 1)))
};
goog.asserts.assertNumber = function (a, b, c) {
    goog.asserts.ENABLE_ASSERTS && !goog.isNumber(a) && goog.asserts.doAssertFailure_("Expected number but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
    return a
};
goog.asserts.assertString = function (a, b, c) {
    goog.asserts.ENABLE_ASSERTS && !goog.isString(a) && goog.asserts.doAssertFailure_("Expected string but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
    return a
};
goog.asserts.assertFunction = function (a, b, c) {
    goog.asserts.ENABLE_ASSERTS && !goog.isFunction(a) && goog.asserts.doAssertFailure_("Expected function but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
    return a
};
goog.asserts.assertObject = function (a, b, c) {
    goog.asserts.ENABLE_ASSERTS && !goog.isObject(a) && goog.asserts.doAssertFailure_("Expected object but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
    return a
};
goog.asserts.assertArray = function (a, b, c) {
    goog.asserts.ENABLE_ASSERTS && !goog.isArray(a) && goog.asserts.doAssertFailure_("Expected array but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
    return a
};
goog.asserts.assertBoolean = function (a, b, c) {
    goog.asserts.ENABLE_ASSERTS && !goog.isBoolean(a) && goog.asserts.doAssertFailure_("Expected boolean but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
    return a
};
goog.asserts.assertElement = function (a, b, c) {
    !goog.asserts.ENABLE_ASSERTS || goog.isObject(a) && a.nodeType == goog.dom.NodeType.ELEMENT || goog.asserts.doAssertFailure_("Expected Element but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
    return a
};
goog.asserts.assertInstanceof = function (a, b, c, d) {
    !goog.asserts.ENABLE_ASSERTS || a instanceof b || goog.asserts.doAssertFailure_("Expected instanceof %s but got %s.", [goog.asserts.getType_(b), goog.asserts.getType_(a)], c, Array.prototype.slice.call(arguments, 3));
    return a
};
goog.asserts.assertObjectPrototypeIsIntact = function () {
    for (var a in Object.prototype) goog.asserts.fail(a + " should not be enumerable in Object.prototype.")
};
goog.asserts.getType_ = function (a) {
    return a instanceof Function ? a.displayName || a.name || "unknown type name" : a instanceof Object ? a.constructor.displayName || a.constructor.name || Object.prototype.toString.call(a) : null === a ? "null" : typeof a
};

//========================= define function for blocks action of Input menu =========================
//========================== Add BluetoothRx input on the workspace =======================
function inputBluetoothRx(val) {
  actionQueue.push({ type: 'l', value: val });
  assembleBlocks.push({item: 'bluetoothrx', value: val});
}
//========================== Add Button input on the workspace =======================
function inputButton(val) {
  actionQueue.push({ type: 'l', value: val });
    assembleBlocks.push({item: 'button', value: val});
}
//========================== Add Remote input on the workspace =======================
function inputIrRemote(val) {
  actionQueue.push({ type: 'l', value: val });
}
//========================== Add IR sensor input on the workspace =======================
function inputIrSensor(val) {
  actionQueue.push({ type: 'l', value: val });
}
//========================== Add LightSensor input on the workspace =======================
function inputLightSensor(val) {
  actionQueue.push({ type: 'l', value: val });
}
//========================== Add Potentiometer input on the workspace =======================
function inputPotentiometer(val) {
  actionQueue.push({ type: 'l', value: val });
}
//========================== Add SerialRx input on the workspace =======================
function inputSerialRx(val) {
  actionQueue.push({ type: 'l', value: val });
}
//========================== Add Temperature input on the workspace =======================
function inputTemperature(val) {
  actionQueue.push({ type: 'l', value: val });
}
//========================== Add Touchpad input on the workspace =======================
function inputTouchpad(val) {
  actionQueue.push({ type: 'l', value: val });
}
//========================== Add Ultrasonic input on the workspace =======================
function inputUltrasonic(val) {
  actionQueue.push({ type: 'l', value: val });
}
//===========================================================================================
//================== Function for blocks action of Output menu =====================
//========================== Add BluetoothTx output on the workspace =======================
function outputBluetoothTx(val) {
  actionQueue.push({ type: 'l', value: val });
}
//========================== Add Buzzer output on the workspace =======================
function outputBuzzer(val) {
  actionQueue.push({ type: 'l', value: val });
}
//========================== Add LCD output on the workspace =======================
function outputLcd(val) {
  actionQueue.push({ type: 'l', value: val });
}
//========================== Add LED output on the workspace =======================
function outputLed(val) {
  actionQueue.push({ type: 'l', value: val });
}
//========================== Add Motor output on the workspace =======================
function outputMotor(val) {
  actionQueue.push({ type: 'l', value: val });
}
//========================== Add Mp3Player output on the workspace =======================
function outputMp3Player(val) {
  actionQueue.push({ type: 'l', value: val });
}
//========================== Add Relay output on the workspace =======================
function outputRelay(val) {
  actionQueue.push({ type: 'l', value: val });
}
//========================== Add RgbStrip output on the workspace =======================
function outputRgbStrip(val) {
  actionQueue.push({ type: 'l', value: val });
}
//========================== Add Servo output on the workspace =======================
function outputServo(val) {
  actionQueue.push({ type: 'l', value: val });
}
//========================== Add StepperMotor output on the workspace =======================
function outputStepperMotor(val) {
  actionQueue.push({ type: 'l', value: val });
}
//========================================================================================
//============================= Function for blocks action of Flow menu=================
//========================== Add Break flow on the workspace =======================
function flowBreak(val) {
  actionQueue.push({ type: 'l', value: val });
}
//========================== Add CustomCode flow on the workspace =======================
function flowCustomCode(val) {
  actionQueue.push({ type: 'l', value: val });
}
//========================== Add Delay flow on the workspace =======================
function flowDelay(val) {
  actionQueue.push({ type: 'l', value: val });
}
//========================== Add Repeat flow on the workspace =======================
function flowRepeat(val) {
  actionQueue.push({ type: 'l', value: val });
}
//========================== Add Stop flow on the workspace =======================
function flowStop(val) {
  actionQueue.push({ type: 'l', value: val });
}
//========================== Add WaitInput flow on the workspace =======================
function flowWaitInput(val) {
  actionQueue.push({ type: 'l', value: val });
}
//========================== Adgust the lines and their number at the workspace =======================
// String.prototype.lines = function() { return this.split(/\r*\n*<br>/); }
String.prototype.lines = function() { return this.replace(/<div><br><\/div>/ig, "\r").replace(/<br>/ig, "\r").replace(/<div>/ig, "\r").split(/\r/); }
String.prototype.lineCount = function() { return this.lines().length; }

//====================== Get text area column counts: input id ================================
function getTextAreaColCount(p_strTextAreaId)  {
    return (document.getElementById(p_strTextAreaId).innerHTML).lineCount();
    // return (document.getElementById(p_strTextAreaId).value).lineCount();
}

//=============================== Update code container manually=======================
function updateCodeContainer() { 
    updateLineNumber();
    update_height('iCodeLineNumber');
    update_height('iCodeOutput');
}

//================================ Update height on text update =====================================
function auto_height(elem) {  
    update_height(elem.id);

    if (elem.id == 'iCodeOutput') {
        updateLineNumber();
        update_height('iCodeLineNumber');
    }
}

// ============================== Change height for selected text area ===========================
function update_height(textAreaId) {  
    let elem = document.getElementById(textAreaId);
    elem.style.height = "1px";
    elem.style.height = (elem.scrollHeight)+"px";
}

// ==================== Update line number when blocks added ===================================
function updateLineNumber() {
    let nTotalLines = getTextAreaColCount('iCodeOutput');
    let strLines = '';

    for (let i = 1; i <= nTotalLines; i++) {
        strLines += i + '<br>';
        // strLines += i + '\n';
    }
    var codeLineNumber = document.getElementById('iCodeLineNumber');
    codeLineNumber.innerHTML = strLines;
    // codeLineNumber.value = strLines;
}

// ============================ On change code on the workspace =================================
function taChange(event) {
    if (event.target.id == 'iCodeOutput' && event.keyCode == 13) {
        // let output = document.getElementById('iCodeOutput');
        // output.innerHTML += '\r';
    }
}

//================================== Code information variables ================================
let arrCodeKeywords = ['void'];
let objCodeClassNames = {keyword: 'codeKeyword', header: 'codeHeader', method: 'codeMethod'};

// Update code
function toCode(lang) { 
  assembleBlocks = [];
  

  let strWorkSpaceCode = Blockly[lang].workspaceToCode(Code.workspace);
  let output = document.getElementById('iCodeOutput');
  let strCode = strWorkSpaceCode;
  strCode = strCode.replace(/\n/ig, "<br>");

  output.innerHTML = strCode;// + '<br><br>' + strWorkSpaceCode;
  updateCodeContainer();
}

//================================= Coding standards, variables and codes information for added blocks ===================================
let codeType = {header: 'header', variable: 'variable', setupBegin: 'setupBegin', setupCode: 'setupCode', setupEnd: 'setupEnd', method: 'method', loop: 'loop'};
let assembleBlocks = [];

// Assemble code
function getAssembleCode() {
    let strAssembleCode = '';

    if(assembleBlocks.length == 0)
        strAssembleCode += getDefaultCodeByStrName(codeType.header) + getDefaultCodeByStrName(codeType.setupBegin) + getDefaultCodeByStrName(codeType.setupEnd) + getDefaultCodeByStrName(codeType.loop);
    else {
        strAssembleCode += getDefaultCodeByStrName(codeType.header);
        for (let i = 0; i < assembleBlocks.length; i++) {
            const element = assembleBlocks[i];
            strAssembleCode += window['get_' + element.item](codeType.header);
        }

        strAssembleCode += '<br>';
        for (let i = 0; i < assembleBlocks.length; i++) {
            const element = assembleBlocks[i];
            strAssembleCode += window['get_' + element.item](codeType.variable);
        }

        strAssembleCode += getDefaultCodeByStrName(codeType.setupBegin);
        for (let i = 0; i < assembleBlocks.length; i++) {
            const element = assembleBlocks[i];
            strAssembleCode += window['get_' + element.item](codeType.setupCode);
        }
        strAssembleCode += getDefaultCodeByStrName(codeType.setupEnd);
        strAssembleCode += getDefaultCodeByStrName(codeType.loop);

        for (let i = 0; i < assembleBlocks.length; i++) {
            const element = assembleBlocks[i];
            strAssembleCode += window['get_' + element.item](codeType.method);
        }
    }

    return strAssembleCode;
}

// ====================================== Get default code by structure name ===================================
function getDefaultCodeByStrName(name) {
    let strCodeByName = '';

    switch (name) {
        case 'header':
            strCodeByName = '<span class="codeHeader">#include "ESP_Blockly.h"';
            break;
    
        case 'setupBegin': 
            strCodeByName = `<br><span class='codeKeyword'>void </span><span class='codeMethod'>setup</span>()<br>
            {<br>`;
            break;
    
        case 'setupEnd': 
            strCodeByName = `<span class='ml-tab1'>Serial.begin(115200); //Serial Tx</span><br>
            }<br>
            <br>`;
            break;
    
        case 'loop': 
            strCodeByName = `<span class='codeKeyword'>void </span><span class='codeMethod'>loop</span>()<br>
            {<br>
                <span class='ml-tab1'>Serial.printf("setup done");</span> <br>
            }<br>`;
            break;
    }

    return strCodeByName;
}

// ========================= Get bluetoothrx code by name =========================
function  get_bluetoothrx(name) {
    let strCodeByName = '';

    switch (name) {
        case 'header':
            strCodeByName = `<span class='codeHeader'>#include "BluetoothSerial.h"</span><br>`;
            break;
            
        case 'variable':
                strCodeByName = `void Bluetooth_Task (void *parameter);<br>
                TaskHandle_t Task_BLUET_Handle;<br>
                <br>
                BluetoothSerial SerialBT;<br>
                `;
                break;
        
        case 'setupCode': 
            strCodeByName = `<span class='ml-tab1'>SerialBT.begin("ESP32_Blutooth");</span>  <br>
            <span class='ml-tab1'>pinMode(BT_TSK_LED, OUTPUT);//BT_TSK_LED selected pin on which bluetooth is attached, functionality of ping(OUTPUT)</span> <br>
            <span class='ml-tab1'>xTaskCreate(Bluetooth_Task, "BLUE_TASK",2524,NULL,1,&Task_BLUET_Handle);</span> <br>`;
            break;
    
        case 'method': 
            strCodeByName = `<br>// the below seggregation of tasks are required for FreeRTOS capablitites<br>
            <span class='codeKeyword'>void </span><span class='codeMethod'>IRAM_ATTR Bluetooth_Task</span>(void *parameter)<br>
            {<br>
                <span class='ml-tab1'>while(1)</span><br>
                <span class='ml-tab1'>{</span><br>
                    <span class='ml-tab2'>RunIndicator();</span><br>
                    <span class='ml-tab2'>//cheack the blutooth is connected </span><br>
                    <span class='ml-tab2'>if (SerialBT.available())</span> <br>
                    <span class='ml-tab2'>{</span><br>
                        <span class='ml-tab3'>Bluetooth_data = SerialBT.read(); // Bluetooth_data data is the data received from the bt device</span><br>
                  <span class='ml-tab3'>//start sending data to the mobile</span><br>
                  <span class='ml-tab3'>SerialBT.write(Bluetooth_data);</span><br>
                  <span class='ml-tab3'>//update the bluetooth data with the received data</span> <br>
                <span class='ml-tab2'>}</span><br>
                <span class='ml-tab2'>if((Bluetooth_data == 'A') || (Bluetooth_data == 'a')) // 'A' represents the character to be compared , equivelent text comparision should be added</span><br>
                <span class='ml-tab2'>{</span><br>
                    <span class='ml-tab3'>digitalWrite(BT_TSK_LED,HIGH);</span><br>
                <span class='ml-tab2'>}</span><br>
                <span class='ml-tab2'>vTaskDelay(100/portTICK_PERIOD_MS);</span> <br>
                <span class='ml-tab1'>}</span><br>
            }<br>`;
            break;
    }

    return strCodeByName;
}

// =============================== Get button code by name ==============================
function  get_button(name) {
    let strCodeByName = '';

    switch (name) {
        case 'header':
            strCodeByName = '';
            break;
            
        case 'variable':
                strCodeByName = 'TaskHandle t Task_Handle_1;<br>';
                break;
        
        case 'setupCode': 
            strCodeByName = `<span class='ml-tab1'>pinMode(A0, INPUT);</span>  <br>
            <span class='ml-tab1'>xTaskCreate(Taskl "TASK1",1024,NULL,1,&Task_Handle_1);</span> <br>`;
            break;
    
        case 'method': 
            strCodeByName = `<br><span class='codeKeyword'>void </span><span class='codeMethod'>IRAM_ATTR Task1</span>(void *parameter)<br>
            {<br>
                <span class='ml-tab1'>while(1)</span><br>
                <span class='ml-tab1'>{</span><br>
                    <span class='ml-tab2'>if(digitalRead(A0) == 1)</span> <br>
                    <span class='ml-tab2'>{</span><br>
                        <span class='ml-tab3'>viaskDelav(50/portTICK PERIOD MS);</span><br>
                        <span class='ml-tab3'>if(digitalRead(A0) == 1)</span><br>
                        <span class='ml-tab3'>{</span><br>
                            <span class='ml-tab4'>ButtonPressed = true;</span><br>
                        <span class='ml-tab3'>}</span><br>
                    <span class='ml-tab2'>}</span><br>
                    <span class='ml-tab2'>if (ButtonPressed == true)</span><br>
                    <span class='ml-tab2'>{</span><br>
                        <br>
                    <span class='ml-tab2'>}</span><br>
                <span class='ml-tab1'>}</span><br>
            }<br>`;
            break;
    }

    return strCodeByName;
}

// ============================= Get remote code by name ==================================
function  get_remote(name) {
    let strCodeByName = '';
    return strCodeByName;
}

//===================================== Get IR code by name ===================================
function  get_IR(name) {
    let strCodeByName = '';
    return strCodeByName;
}

// ============================== Get lightsensor code by name ===============================
function  get_lightsensor(name) {
    let strCodeByName = '';
    return strCodeByName;
}

// =============================== Get resistor code by name ==============================
function  get_resistor(name) {
    let strCodeByName = '';
    return strCodeByName;
}

// ========================= Get serialrx code by name ==============================
function  get_serialrx(name) {
    let strCodeByName = '';
    return strCodeByName;
}

// =================================== Get temperature code by name =======================
function  get_temperature(name) {
    let strCodeByName = '';
    return strCodeByName;
}

// ================================ Get touch_pad code by name =============================
function  get_touch_pad(name) {
    let strCodeByName = '';
    return strCodeByName;
}

// ===================================== Get ultrasonic code by name ===============================
function  get_ultrasonic(name) {
    let strCodeByName = '';
    return strCodeByName;
}

//================================ Get bluetoothrx code by name ==================================
function  get_bluetoothtx(name) {
    let strCodeByName = '';
    return strCodeByName;
}

//================================= Get buzzer code by name ====================================
function  get_buzzer(name) {
    let strCodeByName = '';
    return strCodeByName;
}

// ================================= Get LCD code by name ====================================
function  get_lcd(name) {
    let strCodeByName = '';
    return strCodeByName;
}

// =================================== Get LED code by name ======================================
function  get_led(name) {
    let strCodeByName = '';
    return strCodeByName;
}

// ================================== Get motor code by name ==========================================
function  get_motor(name) {
    let strCodeByName = '';
    return strCodeByName;
}

// ================================= Get bluetomp3_playerothrx code by name ==============================
function  get_mp3_player(name) {
    let strCodeByName = '';
    return strCodeByName;
}

// ============================== Get relay code by name =======================================
function  get_relay(name) {
    let strCodeByName = '';
    return strCodeByName;
}

// ========================= Get rgbstrip code by name =====================================
function  get_rgbstrip(name) {
    let strCodeByName = '';
    return strCodeByName;
}

//================================== Get servo_device code by name ==================================
function  get_servo_device(name) {
    let strCodeByName = '';
    return strCodeByName;
}

// ================================== Get steppermotor code by name ===================================
function  get_steppermotor(name) {
    let strCodeByName = '';
    return strCodeByName;
}

// Get bluetoothrx code by name
function  get_controls_flow_statements(name) {
    let strCodeByName = '';
    return strCodeByName;
}

// Get bluetoothrx code by name
function  get_customcode(name) {
    let strCodeByName = '';
    return strCodeByName;
}

// Get bluetoothrx code by name
function  get_flow_delay(name) {
    let strCodeByName = '';
    return strCodeByName;
}

// Get bluetoothrx code by name
function  get_flow_repeat(name) {
    let strCodeByName = '';
    return strCodeByName;
}

// Get bluetoothrx code by name
function  get_flow_stop(name) {
    let strCodeByName = '';
    return strCodeByName;
}

// Get bluetoothrx code by name
function  get_waitinput(name) {
    let strCodeByName = '';
    return strCodeByName;
}
//====================================================================================================================
//===================== the menu components (Input, Output, Flow, Logic, Variables, Text, Array, Advanced)========================
const injectToolbox = () => {
  let menus = [
                    {
                        "categoryName": "Input",
                        "categorystyle": "input_category",
                        "nodes": [
                            "<block type='bluetoothrx'></block>",
                            "<block type='button'></block>",
                            "<block type='remote'></block>",
                            "<block type='IR'></block>",
                            "<block type='lightsensor'></block>",
                            "<block type='resistor'></block>",
                            "<block type='serialrx'></block>",
                            "<block type='temperature'></block>",
                            "<block type='touch_pad'></block>",
                            "<block type='ultrasonic'></block>",
                            "<block type='custominput'></block>"
                        ]
                    },
                    {
                        "categoryName": "Output",
                        "categorystyle": "output_category",
                        "nodes": [
                            "<block type='bluetoothtx'></block>",
                            "<block type='buzzer'></block>",
                            "<block type='lcd'></block>",
                            "<block type='led'></block>",
                            "<block type='motor'></block>",
                            "<block type='mp3_player'></block>",
                            "<block type='relay'></block>",
                            "<block type='rgbstrip'></block>",
                            "<block type='servo_device'></block>",
                            "<block type='steppermotor'></block>",
                            "<block type='customoutput'></block>"
                        ]
                    },
                    {
                        "categoryName": "Flow",
                        "categorystyle": "flow_category",
                        "nodes": [
                            "<block type='controls_flow_statements'></block>",
                            "<block type='customcode'></block>",
                            "<block type='flow_delay'></block>",
                            "<block type='flow_repeat'></block>",
                            "<block type='flow_stop'></block>",
                            "<block type='waitinput'></block>"
                        ]
                    },
                    {
                        "categoryName": "Logic",
                        "categorystyle": "logic_category",
                        "nodes": [
                            "<block type='controls_if'></block>",
                            "<block type='logic_compare'></block>",
                            "<block type='logic_operation'></block>",
                            "<block type='logic_negate'></block>",
                            "<block type='logic_boolean'></block>",
                            "<block type='logic_null'></block>",
                            "<block type='logic_ternary'></block>"
                        ]
                    },
                    {
                        "categoryName": "Variables",
                        "categorystyle": "VARIABLE",
                        "nodes": [
                            "<block type='assign_variable'></block>",
                            "<block type='math_number'></block>",
                            "<block type='variables_get'></block>",
                            "<block type='math_arithmetic'></block>",
                            "<block type='increment'></block>",
                            "<block type='decrement'></block>",
                            "<block type='Constrain'></block>",
                            "<block type='Map_'></block>",
                            "<block type='inputreading'></block>",
                            "<block type='inputreading_bl'></block>"
                        ]
                    },
                    {
                        "categoryName": "Text",
                        "categorystyle": "TEXTS",
                        "nodes": [
                            "<block type='text_input'></block>",
                            "<block type='assign_text'></block>",
                            "<block type='append_text'></block>",
                            "<block type='substring_text'></block>",
                            "<block type='length_of'></block>",
                            "<block type='text_indexOfItem'></block>",
                            "<block type='text_to_variable'></block>",
                            "<block type='variable_to_text'></block>",
                            "<block type='text_variable'></block>"
                        ]
                    },
                    {
                        "categoryName": "Arrays",
                        "categorystyle": "ARRAY",
                        "nodes": [
                            "<block type='array_node'></block>",
                            "<block type='access_elements'></block>"
                        ]
                    },
                    {
                        "categoryName": "Advanced",
                        "categorystyle": "advanced_category",
                        "nodes": [
                            "<block type='inputreading_digital'></block>",
                            "<block type='inputreading_analog'></block>",
                            "<block type='digital_write'></block>",
                            "<block type='analog_write'></block>",
                            "<block type='digital_read'></block>",
                            "<block type='analog_read'></block>",
                            "<block type='tone'></block>",
                            "<block type='bluetooth_connect'></block>",
                            "<block type='bluetooth_rename'></block>",
                            "<block type='bluetooth_disconnect'></block>"
                        ]
                    }
                ];
  let toolboxXML = document.getElementById("toolbox");
  toolboxXML.innerHTML =  '';

  for (let i = 0; i < menus.length; i++) {
    const menu = menus[i];
    
    toolboxXML.innerHTML += '<category name="' + menu.categoryName + '" categorystyle="' + menu.categorystyle + '">' + menu.nodes.join("") + '</category>';
  }

//   if (workspace)
//       workspace.dispose();
//   workspace = Blockly.inject('blocklyDiv', {
//========================Start to collect the workspace component and scale in xml format ============================
  if (Code.workspace)
      Code.workspace.dispose();
  Code.workspace = Blockly.inject('blocklyDiv', {
      toolbox: toolboxXML,
      scrollbars: true,
      collapse: true,
      grid:
         {spacing: 25,
          length: 3,
          colour: '#ccc',
          snap: true},
          trashcan: true,
      zoom: {
          controls: true,
          wheel: true,
          startScale: 1,
          maxScale: 1.3,
          minScale: 0.5,
          scaleSpeed: 1.2
      }
  });
  let xml = '<xml>' + '<block type="esp32start" deletable="false" movable="false"></block>' + '</xml>';
//   Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(xml), workspace);
  Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(xml), Code.workspace);
  
  Code.tabClick(Code.selected);

    for (var i = 0; i < Code.TABS_.length; i++) {
        var name = Code.TABS_[i];
        Code.bindClick('tab_' + name, function (name_) {
            return function () {
                Code.tabClick(name_);
            };
        }(name));
    }

//   workspace.addChangeListener(onFirstComment);
Code.workspace.addChangeListener(onFirstComment);
}

let isCreated = false;
function onFirstComment(event) {
//   workspace.addChangeListener(Blockly.Events.disableOrphans);
Code.workspace.addChangeListener(Blockly.Events.disableOrphans);

//   console.log(event.type);
//   console.log(event.oldValue, event.newValue);
  switch (event.type) {
    case 'create':
        isCreated = true;
        break;
    case 'ui':
        if (event.oldValue)
            isCreated = true;
        break;
    case 'finished_loading':
    case 'change':
    case 'delete':
      toCode('ESP32'); 
      break;
    case 'move':
        if (isCreated == true)
            toCode('ESP32'); 
        isCreated = false;
        break;
  
    default:
      break;
  }
}

window.onload = () => {
  const canvasContainer = document.querySelector(".cCanvasContainer");
  canvasContainer.oncontextmenu = function (e) {
      e.preventDefault();
  };

    injectToolbox();
}

Blockly.Blocks.controls_if_elseif = {
  init: function () {
      this.appendDummyInput()
          .appendField(Blockly.Msg.CONTROLS_IF_ELSEIF_TITLE_ELSEIF);

      this.setColour(109);
      this.setPreviousStatement(!0);
      this.setNextStatement(!0);
      this.setTooltip(Blockly.Msg.CONTROLS_IF_ELSEIF_TOOLTIP);
      this.contextMenu = !1
  }
};

Blockly.Blocks.lightelseif = {
  init: function () {
      this.appendDummyInput()
          .appendField(Blockly.Msg.CONTROLS_IF_ELSEIF_TITLE_ELSEIF);

      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(109);
      this.setTooltip(Blockly.Msg.CONTROLS_IF_ELSEIF_TOOLTIP);

      this.contextMenu = false;
  }
};

Blockly.Blocks.andblock = {
    init: function () {
        this.appendDummyInput()
            .appendField("AND");

        this.setInputsInline(true);
        this.setPreviousStatement(['controls_if_if']);
        this.setNextStatement(true, null);
        this.setColour(Code.multiColor.logic);
        this.setTooltip("AND");

        this.contextMenu = false;
    }
};

Blockly.Blocks.orblock = {
    init: function () {
        this.appendDummyInput()
            .appendField("OR");

        this.setInputsInline(true);
        this.setPreviousStatement(['controls_if_if']);
        this.setNextStatement(true, null);
        this.setColour(Code.multiColor.logic);
        this.setTooltip("OR");

        this.contextMenu = false;
    }
};

Blockly.Blocks.multi_stmt = {
    init: function () {
        this.appendDummyInput()
            .appendField("Next Output");

        this.setInputsInline(true);
        this.setPreviousStatement(['initial_stmt']);
        this.setNextStatement(true, null);
        this.setColour(Code.multiColor.output);
        this.setTooltip("Next Output");

        this.contextMenu = false;
    }
};

Blockly.Blocks.initial_stmt = {
    init: function () {
        this.appendDummyInput()
            .appendField("Output");

        this.setInputsInline(true);
        this.setPreviousStatement(false, null);
        this.setNextStatement(true, null);
        this.setColour(Code.multiColor.output);
        this.setTooltip("Output");

        this.contextMenu = false;
    }
};

Blockly.Blocks.fn_mutationToDom = function (currentBlock) {
    if (!currentBlock.andCount_ && !currentBlock.orCount_ && !currentBlock.elseifCount_ && !currentBlock.elseCount_) return null;

    var a = document.createElement("mutation");
    currentBlock.andCount_ && a.setAttribute("andcondition", currentBlock.andCount_);
    currentBlock.orCount_ && a.setAttribute("orcondition", currentBlock.orCount_);
    currentBlock.elseifCount_ && a.setAttribute("elseif", currentBlock.elseifCount_);
    currentBlock.elseCount_ && a.setAttribute("else", 1);
    return a;
};

Blockly.Blocks.fno_mutationToDom = function (currentBlock) {
    if (!currentBlock.outputCount_) return null;

    var a = document.createElement("mutation");
    currentBlock.outputCount_ && a.setAttribute("andcondition", currentBlock.outputCount_);
    return a;
};

Blockly.Blocks.fn_domToMutation = function (xmlElement, currentBlock) {
    currentBlock.andCount_ = parseInt(xmlElement.getAttribute("andcondition"), 10) || 0;
    currentBlock.orCount_ = parseInt(xmlElement.getAttribute("orcondition"), 10) || 0;
    currentBlock.elseifCount_ = parseInt(xmlElement.getAttribute("elseif"), 10) || 0;
    currentBlock.elseCount_ = parseInt(xmlElement.getAttribute("else"), 10) || 0;
    currentBlock.updateShape_();
};

Blockly.Blocks.fno_domToMutation = function (xmlElement, currentBlock) {
    currentBlock.outputCount_ = parseInt(xmlElement.getAttribute("andcondition"), 10) || 0;
    currentBlock.updateShape_();
};

Blockly.Blocks.fn_decompose = function (a, currentBlock) {
  var b = a.newBlock("controls_if_if");
  b.initSvg();

  var c, e, d;
  for (c = b.nextConnection, e = 1; e <= currentBlock.elseCount_; e++) {
      d = a.newBlock("controls_if_else");
      d.initSvg();
      c.connect(d.previousConnection);
      c = d.nextConnection;
  }
  for (c = b.nextConnection, e = 1; e <= currentBlock.elseifCount_; e++) {
      d = a.newBlock("lightelseif");
      d.initSvg();
      c.connect(d.previousConnection);
      c = d.nextConnection;
  }
  for (c = b.nextConnection, e = 1; e <= currentBlock.orCount_; e++) {
      d = a.newBlock("orblock");
      d.initSvg();
      c.connect(d.previousConnection);
      c = d.nextConnection;
  }
  for (c = b.nextConnection, e = 1; e <= currentBlock.andCount_; e++) {
      d = a.newBlock("andblock");
      d.initSvg();
      c.connect(d.previousConnection);
      c = d.nextConnection;
  }
  return b;
};

Blockly.Blocks.fno_decompose = function (a, currentBlock) {
    var b = a.newBlock("initial_stmt");
    b.initSvg();

    var c, e, d;
    for (c = b.nextConnection, e = 1; e <= currentBlock.outputCount_; e++) {
        d = a.newBlock("multi_stmt");
        d.initSvg();
        c.connect(d.previousConnection);
        c = d.nextConnection;
    }
    return b;
};
//====================================================================
Blockly.Blocks.fn_compose = function (a, currentBlock) {
  var b = a.nextConnection.targetBlock();
  currentBlock.andCount_ = 0;
  currentBlock.orCount_ = 0;
  currentBlock.elseifCount_ = 0;
  currentBlock.elseCount_ = 0;
  currentBlock.outputCount_ = 0;
  a = [null];
  var x = [null];
  for (var c = [null], e = null; b;) {
      switch (b.type) {
          case "andblock":
              currentBlock.andCount_++;
              //currentBlock.setInputsInline(false);
              e = b.statementConnection_;
              break;
          case "orblock":
              currentBlock.orCount_++;
              //currentBlock.setInputsInline(false);
              e = b.statementConnection_;
              break;
          case "lightelseif":
              currentBlock.elseifCount_++;
              a.push(b.valueConnection_);
              c.push(b.statementConnection_);
              break;
          case "controls_if_else":
              currentBlock.elseCount_++;
              e = b.statementConnection_;
              break;
          case "multi_stmt":
              currentBlock.outputCount_++;
              //currentBlock.setInputsInline(true);
              break;
          default:
              throw "Unknown block type.";
      }
      b = b.nextConnection && b.nextConnection.targetBlock()
  }
  currentBlock.updateShape_();

  for (b = 1; b <= currentBlock.elseifCount_; b++) {
      Blockly.Mutator.reconnect(c[b], currentBlock, "varelseifblock" + b);
  }
  if (currentBlock.elseCount_) {
      Blockly.Mutator.reconnect(e, currentBlock, "varelseblock1");
  }
};

Blockly.Blocks.fn_saveconnections = function (a, currentBlock) {
    a = a.nextConnection.targetBlock();
    var ss;
    for (var b = 1; a;) {
        switch (a.type) {
            case "andblock":
                ss = currentBlock.getInput('OutputStmt');
                currentBlock.statementConnection_ = ss && ss.connection.targetConnection;
                break;
            case "orblock":
                ss = currentBlock.getInput('OutputStmt');
                currentBlock.statementConnection_ = ss && ss.connection.targetConnection;
                break;
            case "lightelseif":
                ss = currentBlock.getInput("varelseifblock" + b);
                a.statementConnection_ = ss && ss.connection.targetConnection;
                b++;
                break;
            case "controls_if_else":
                ss = currentBlock.getInput("varelseblock1");
                a.statementConnection_ = ss && ss.connection.targetConnection;
                break;
            case "multi_stmt":
                break;
            default:
                throw "Unknown block type.";
        }
        a = a.nextConnection && a.nextConnection.targetBlock();
    }
};

Blockly.Blocks.fn_updateshape = function (currentBlock) {
  var stConn = currentBlock.statementConnection_;

  if ((stConn === null || typeof(stConn) === 'undefined') &&
      currentBlock.andCount_ === 0 && currentBlock.orCount_ === 0 &&
      currentBlock.elseifCount_ === 0 && currentBlock.elseCount_ === 0) {
      var ss = currentBlock.getInput('OutputStmt');
      stConn = currentBlock.statementConnection_ = ss && ss.connection.targetConnection;
  }

  var Panel1AND, Panel2AND, Panel3AND;
  var Panel1OR, Panel2OR, Panel3OR;
  var Panel1ELSEIF, Panel2ELSEIF, Panel3ELSEIF;
  var j = 1, a = 1, te;
  var minvalue, maxvalue;
  var currPinArray = Blockly.Blocks.getUnusedpins(currentBlock);

  Blockly.Blocks.fvalsAND = [];
  Blockly.Blocks.fvalsOR = [];
  Blockly.Blocks.fvalsELSEIF = [];
  Blockly.Blocks.fvalsNEXT = [];

  for (j = 1; j <= currentBlock.andCount_; j++) {
      Panel1AND = currentBlock.getInput("Panel1AND" + j);

      if (currentBlock.type == "button" || currentBlock.type == "touch_sensor") {
          Blockly.Blocks.fvalsAND.push({
              fId: ("PinAND" + j),
              fValPin: Panel1AND && Panel1AND.fieldRow[1].value_,
              fValstate: Panel1AND && Panel1AND.fieldRow[2].value_
          });
      }
      else if (currentBlock.type == "custominput") {
          Panel2AND = currentBlock.getInput("Panel2AND" + j);
          Panel3AND = currentBlock.getInput("Panel3AND" + j);

          Blockly.Blocks.fvalsAND.push({
              fId: ("PinAND" + j),
              fValPin: Panel1AND && Panel1AND.fieldRow[1].value_,
              fValchoice: Panel1AND && Panel1AND.fieldRow[2].value_,
              fValRangeLimit: Panel2AND && Panel2AND.fieldRow[0].value_,
              fValSensorRangeMin: Panel2AND && Panel2AND.fieldRow[1].text_,
              fValSensorRangeMax: Panel2AND && Panel2AND.fieldRow[2].text_,
              fValstatus: Panel3AND && Panel3AND.fieldRow[0].value_
          });
      }
      else if (currentBlock.type == "colorsensor") {
          Panel3AND = currentBlock.getInput("Panel3AND" + j);

          Blockly.Blocks.fvalsAND.push({
              fId: ("PinAND" + j),
              fValPin: Panel1AND && Panel1AND.fieldRow[1].value_,
              fValRangeLimit: Panel1AND && Panel1AND.fieldRow[3].value_,
              fValRange: Panel3AND && Panel3AND.fieldRow[0].value_,
              fValSensorRangeMin: Panel3AND && Panel3AND.fieldRow[1].value_,
              fValSensorRangeMax: Panel3AND && Panel3AND.fieldRow[2].value_
          });
      }
      else if (currentBlock.type == "touch_pad") {
          Panel2AND = currentBlock.getInput("Panel2AND" + j);
          Panel3AND = currentBlock.getInput("Panel3AND" + j);

          Blockly.Blocks.fvalsAND.push({
              fId: ("PinAND" + j),
              fValPin: Panel1AND && Panel1AND.fieldRow[1].value_,
              fValchoice: Panel1AND && Panel1AND.fieldRow[2].value_,
              fValname: Panel2AND && Panel2AND.fieldRow[0].value_,
              fValButton: Panel3AND && Panel3AND.fieldRow[0].text_
          });
      }
      else {
          Blockly.Blocks.fvalsAND.push({
              fId: ("PinAND" + j),
              fValPin: Panel1AND && Panel1AND.fieldRow[1].value_,
              fValRangeLimit: Panel1AND && Panel1AND.fieldRow[3].value_,
              fValSensorRangeMin: Panel1AND && Panel1AND.fieldRow[5].text_,
              fValSensorRangeMax: Panel1AND && Panel1AND.fieldRow[7].text_
          });
      }
  }
  for (j = 1; j <= currentBlock.orCount_; j++) {
      Panel1OR = currentBlock.getInput("Panel1OR" + j);

      if (currentBlock.type == "button" || currentBlock.type == "touch_sensor") {
          Blockly.Blocks.fvalsOR.push({
              fId: ("PinOR" + j),
              fValPin: Panel1OR && Panel1OR.fieldRow[1].value_,
              fValstate: Panel1OR && Panel1OR.fieldRow[2].value_
          });
      }
      else if (currentBlock.type == "custominput") {
          Panel2OR = currentBlock.getInput("Panel2OR" + j);
          Panel3OR = currentBlock.getInput("Panel3OR" + j);

          Blockly.Blocks.fvalsOR.push({
              fId: ("PinOR" + j),
              fValPin: Panel1OR && Panel1OR.fieldRow[1].value_,
              fValchoice: Panel1OR && Panel1OR.fieldRow[2].value_,
              fValRangeLimit: Panel2OR && Panel2OR.fieldRow[0].value_,
              fValSensorRangeMin: Panel2OR && Panel2OR.fieldRow[1].text_,
              fValSensorRangeMax: Panel2OR && Panel2OR.fieldRow[2].text_,
              fValstatus: Panel3OR && Panel3OR.fieldRow[0].value_
          });
      }
      else if (currentBlock.type == "colorsensor") {
          Panel3OR = currentBlock.getInput("Panel3OR" + j);

          Blockly.Blocks.fvalsOR.push({
              fId: ("PinOR" + j),
              fValPin: Panel1OR && Panel1OR.fieldRow[1].value_,
              fValRangeLimit: Panel1OR && Panel1OR.fieldRow[3].value_,
              fValRange: Panel3OR && Panel3OR.fieldRow[0].value_,
              fValSensorRangeMin: Panel3OR && Panel3OR.fieldRow[1].value_,
              fValSensorRangeMax: Panel3OR && Panel3OR.fieldRow[2].value_
          });
      }
      else if (currentBlock.type == "touch_pad") {
          Panel2OR = currentBlock.getInput("Panel2OR" + j);
          Panel3OR = currentBlock.getInput("Panel3OR" + j);

          Blockly.Blocks.fvalsOR.push({
              fId: ("PinOR" + j),
              fValPin: Panel1OR && Panel1OR.fieldRow[1].value_,
              fValchoice: Panel1OR && Panel1OR.fieldRow[2].value_,
              fValname: Panel2OR && Panel2OR.fieldRow[0].value_,
              fValButton: Panel3OR && Panel3OR.fieldRow[0].text_
          });
      }
      else {
          Blockly.Blocks.fvalsOR.push({
              fId: ("PinOR" + j),
              fValPin: Panel1OR && Panel1OR.fieldRow[1].value_,
              fValRangeLimit: Panel1OR && Panel1OR.fieldRow[3].value_,
              fValSensorRangeMin: Panel1OR && Panel1OR.fieldRow[5].text_,
              fValSensorRangeMax: Panel1OR && Panel1OR.fieldRow[7].text_
          });
      }
  }
  for (j = 1; j <= currentBlock.elseifCount_; j++) {
      Panel1ELSEIF = currentBlock.getInput("Panel1ELSEIF" + j);

      if (currentBlock.type == "button" || currentBlock.type == "touch_sensor") {
          Blockly.Blocks.fvalsELSEIF.push({
              fId: ("PinELSEIF" + j),
              fValPin: Panel1ELSEIF && Panel1ELSEIF.fieldRow[1].value_,
              fValstate: Panel1ELSEIF && Panel1ELSEIF.fieldRow[2].value_
          });
      }
      else if (currentBlock.type == "slide_node") {
          Blockly.Blocks.fvalsELSEIF.push({
              fValstate: Panel1ELSEIF ? Panel1ELSEIF.fieldRow[1].text_ : "DOWN, DOWN, DOWN"
          });
      }
      else if (currentBlock.type == "custominput") {
          Panel2ELSEIF = currentBlock.getInput("Panel2ELSEIF" + j);
          Panel3ELSEIF = currentBlock.getInput("Panel3ELSEIF" + j);

          Blockly.Blocks.fvalsELSEIF.push({
              fId: ("PinELSEIF" + j),
              fValPin: Panel1ELSEIF && Panel1ELSEIF.fieldRow[1].value_,
              fValchoice: Panel1ELSEIF && Panel1ELSEIF.fieldRow[2].value_,
              fValRangeLimit: Panel2ELSEIF && Panel2ELSEIF.fieldRow[0].value_,
              fValSensorRangeMin: Panel2ELSEIF && Panel2ELSEIF.fieldRow[1].text_,
              fValSensorRangeMax: Panel2ELSEIF && Panel2ELSEIF.fieldRow[2].text_,
              fValstatus: Panel3ELSEIF && Panel3ELSEIF.fieldRow[0].value_
          });
      }
      else if (currentBlock.type == "serialrx") {
          Blockly.Blocks.fvalsELSEIF.push({
              fId: ("PinELSEIF" + j),
              fValPin: Panel1ELSEIF && Panel1ELSEIF.fieldRow[1].value_,
              fValname: Panel1ELSEIF && Panel1ELSEIF.fieldRow[3].value_,
              fValchoice: Panel1ELSEIF && Panel1ELSEIF.fieldRow[4].value_,
              fValchar: Panel1ELSEIF && Panel1ELSEIF.fieldRow[5].text_
          });
      }
      else if (currentBlock.type == "bluetoothrx") {
          Blockly.Blocks.fvalsELSEIF.push({
              fId: ("PinELSEIF" + j),
              fValPin: Panel1ELSEIF && Panel1ELSEIF.fieldRow[1].value_,
              fValchoice: Panel1ELSEIF && Panel1ELSEIF.fieldRow[2].value_,
              fValchar: Panel1ELSEIF && Panel1ELSEIF.fieldRow[3].text_
          });
      }
      else if (currentBlock.type == "bluetooth_remote") {
          if (Blockly.isMobile) {
              Blockly.Blocks.fvalsELSEIF.push({
                  fId: ("PinELSEIF" + j),
                  fValchoice: Panel1ELSEIF && Panel1ELSEIF.fieldRow[2].value_,
                  fValname: Panel1ELSEIF ? Panel1ELSEIF.fieldRow[3].text_ : "S"
              });
          } else {
              Blockly.Blocks.fvalsELSEIF.push({
                  fId: ("PinELSEIF" + j),
                  fValPin: Panel1ELSEIF && Panel1ELSEIF.fieldRow[1].value_,
                  fValchoice: Panel1ELSEIF && Panel1ELSEIF.fieldRow[3].value_,
                  fValname: Panel1ELSEIF ? Panel1ELSEIF.fieldRow[4].text_ : "S"
              });
          }
      }
      else if (currentBlock.type == "touch_pad") {
          Panel2ELSEIF = currentBlock.getInput("Panel2ELSEIF" + j);
          Panel3ELSEIF = currentBlock.getInput("Panel3ELSEIF" + j);

          Blockly.Blocks.fvalsELSEIF.push({
              fId: ("PinELSEIF" + j),
              fValPin: Panel1ELSEIF && Panel1ELSEIF.fieldRow[1].value_,
              fValchoice: Panel1ELSEIF && Panel1ELSEIF.fieldRow[2].value_,
              fValname: Panel2ELSEIF && Panel2ELSEIF.fieldRow[0].value_,
              fValButton: Panel3ELSEIF && Panel3ELSEIF.fieldRow[0].text_
          });
      }
      else if (currentBlock.type == "gyro" || currentBlock.type == "gyro_mobile" ||
          currentBlock.type == "accelerometer" || currentBlock.type == "accelerometer_mobile") {
          Blockly.Blocks.fvalsELSEIF.push({
              fValname: Panel1ELSEIF && Panel1ELSEIF.fieldRow[2].value_,
              fValRangeLimit: Panel1ELSEIF && Panel1ELSEIF.fieldRow[4].value_,
              fValAccMin: Panel1ELSEIF && Panel1ELSEIF.fieldRow[6].text_,
              fValAccMax: Panel1ELSEIF && Panel1ELSEIF.fieldRow[8].text_
          });
      }
      else if (currentBlock.type == "colorsensor") {
          Panel3ELSEIF = currentBlock.getInput("Panel3ELSEIF" + j);

          Blockly.Blocks.fvalsELSEIF.push({
              fId: ("PinELSEIF" + j),
              fValPin: Panel1ELSEIF && Panel1ELSEIF.fieldRow[1].value_,
              fValRangeLimit: Panel1ELSEIF && Panel1ELSEIF.fieldRow[3].value_,
              fValRange: Panel3ELSEIF && Panel3ELSEIF.fieldRow[0].value_,
              fValSensorRangeMin: Panel3ELSEIF && Panel3ELSEIF.fieldRow[1].value_,
              fValSensorRangeMax: Panel3ELSEIF && Panel3ELSEIF.fieldRow[2].value_
          });
      }
      else {
          Blockly.Blocks.fvalsELSEIF.push({
              fId: ("PinELSEIF" + j),
              fValPin: Panel1ELSEIF && Panel1ELSEIF.fieldRow[1].value_,
              fValRangeLimit: Panel1ELSEIF && Panel1ELSEIF.fieldRow[3].value_,
              fValSensorRangeMin: Panel1ELSEIF && Panel1ELSEIF.fieldRow[5].text_,
              fValSensorRangeMax: Panel1ELSEIF && Panel1ELSEIF.fieldRow[7].text_
          });
      }
  }

  // Remove All inputs
  for (a = 1; currentBlock.getInput("Panel1AND" + a);) {
      currentBlock.removeInput("Panel1AND" + a), a++;
  }
  for (a = 1; currentBlock.getInput("Panel2AND" + a);) {
      currentBlock.removeInput("Panel2AND" + a), a++;
  }
  for (a = 1; currentBlock.getInput("Panel3AND" + a);) {
      currentBlock.removeInput("Panel3AND" + a), a++;
  }
  for (a = 1; currentBlock.getInput("Panel1OR" + a);) {
      currentBlock.removeInput("Panel1OR" + a), a++;
  }
  for (a = 1; currentBlock.getInput("Panel2OR" + a);) {
      currentBlock.removeInput("Panel2OR" + a), a++;
  }
  for (a = 1; currentBlock.getInput("Panel3OR" + a);) {
      currentBlock.removeInput("Panel3OR" + a), a++;
  }
  for (a = 1; currentBlock.getInput("Panel1ELSEIF" + a);) {
      currentBlock.removeInput("Panel1ELSEIF" + a), a++;
  }
  for (a = 1; currentBlock.getInput("Panel2ELSEIF" + a);) {
      currentBlock.removeInput("Panel2ELSEIF" + a), a++;
  }
  for (a = 1; currentBlock.getInput("Panel3ELSEIF" + a);) {
      currentBlock.removeInput("Panel3ELSEIF" + a), a++;
  }
  for (a = 1; currentBlock.getInput("varelseifblock" + a);) {
      currentBlock.removeInput("varelseifblock" + a), a++;
  }
  for (a = 1; currentBlock.getInput("varelseblock" + a);) {
      currentBlock.removeInput("varelseblock" + a), a++;
  }
  //end

  //AND Append
  for (a = 1, te = 0; a <= currentBlock.andCount_, te < currentBlock.andCount_; a++, te++) {
      if (currentBlock.type == "button") {
          Panel1AND = currentBlock.appendDummyInput("Panel1AND" + a)
              .appendField(new Blockly.FieldImage("assets/images/resources/and.png", 19, 19, "*"))
              .appendField(new Blockly.FieldDropdown(currPinArray), "PinAND" + a)
              .appendField(new Blockly.FieldDropdown([["PRESSED", "PRESSED"], ["RELEASED", "RELEASED"]]), "stateAND" + a);
      }
      else if (currentBlock.type == "touch_sensor") {
          Panel1AND = currentBlock.appendDummyInput("Panel1AND" + a)
              .appendField(new Blockly.FieldImage("assets/images/resources/and.png", 19, 19, "*"))
              .appendField(new Blockly.FieldDropdown(currPinArray), "PinAND" + a)
              .appendField(new Blockly.FieldDropdown([["Touched", "Touched"], ["Untouched", "Untouched"]]), "stateAND" + a);
      }
      else if (currentBlock.type == "custominput") {
          minvalue = Blockly.Blocks.MinValue < 0 ? 0 : Blockly.Blocks.MinValue;
          maxvalue = Blockly.Blocks.MaxValue > 1023 ? 1023 : Blockly.Blocks.MaxValue;

          Panel1AND = currentBlock.appendDummyInput("Panel1AND" + a)
              .appendField(new Blockly.FieldImage("assets/images/resources/and.png", 19, 19, "*"))
              .appendField(new Blockly.FieldDropdown(currPinArray), "PinAND" + a)
              .appendField(new Blockly.FieldDropdown([["SIGNAL", "SIGNAL"], ["EDGE", "EDGE"]]), "choiceAND" + a)
              .appendField(" ");

          Panel2AND = currentBlock.appendDummyInput("Panel2AND" + a)
              .appendField(new Blockly.FieldDropdown([["Inside", "Inside"], ["Outside", "Outside"]]), "RangeLimitAND" + a)
              .appendField(new Blockly.FieldNumber(minvalue, minvalue, maxvalue), "SensorRangeMinAND" + a)
              .appendField(new Blockly.FieldNumber(maxvalue, minvalue, maxvalue), "SensorRangeMaxAND" + a);

          Panel3AND = currentBlock.appendDummyInput("Panel3AND" + a)
              .appendField(new Blockly.FieldDropdown([["RISING", "RISING"], ["FALLING", "FALLING"]]), "statusAND" + a);
      }
      else if (currentBlock.type == "colorsensor") {
          minvalue = Blockly.Blocks.MinValue < 0 ? 0 : Blockly.Blocks.MinValue;
          maxvalue = Blockly.Blocks.MaxValue > 360 ? 360 : Blockly.Blocks.MaxValue;

          Panel1AND = currentBlock.appendDummyInput("Panel1AND" + a)
              .appendField(new Blockly.FieldImage("assets/images/resources/and.png", 19, 19, "*"))
              .appendField(new Blockly.FieldDropdown(currPinArray), "PinAND" + a)
              .appendField("Range")
              .appendField(new Blockly.FieldDropdown([["Color", "Color"], ["White", "White"], ["Black", "Black"]]), "optionAND" + a);

          Panel2AND = currentBlock.appendDummyInput("Panel2AND" + a)
              .appendField("Inside", "rangeLabelAND" + a)
              .appendField("0", "minLabelAND" + a)
              .appendField(new Blockly.FieldColour("#FF0000"), "pickerMinAND" + a)
              .appendField("45", "maxLabelAND" + a)
              .appendField(new Blockly.FieldColour("#ffbf00"), "pickerMaxAND" + a);

          Panel3AND = currentBlock.appendDummyInput("Panel3AND" + a)
              .appendField(new Blockly.FieldDropdown([["Inside", "Inside"]]), "rangeValueAND" + a)
              .appendField(new Blockly.FieldDropdown([["0", "0"]]), "minValueAND" + a)
              .appendField(new Blockly.FieldDropdown([["45", "45"]]), "maxValueAND" + a);

          Panel3AND.setVisible(false);
      }
      else if (currentBlock.type == "touch_pad") {
          var touchDropDown = [["T0", "0"], ["T1", "1"], ["T2", "2"], ["T3", "3"], ["T4", "4"], ["T5", "5"], ["T6", "6"], ["T7", "7"], ["T8", "8"], ["T9", "9"], ["T10", "10"], ["T11", "11"]];

          Panel1AND = currentBlock.appendDummyInput("Panel1AND" + a)
              .appendField(new Blockly.FieldImage("assets/images/resources/and.png", 19, 19, "*"))
              .appendField(new Blockly.FieldDropdown(currPinArray), "PinAND" + a)
              .appendField(new Blockly.FieldDropdown([["Type1", "Type1"], ["Type2", "Type2"]]), "touchTypeAND" + a)
              .appendField("Select Pin");

          Panel2AND = currentBlock.appendDummyInput("Panel2AND" + a)
              .appendField(new Blockly.FieldDropdown(touchDropDown), "touchPinAND" + a);

          Panel3AND = currentBlock.appendDummyInput("Panel3AND" + a)
              .appendField(new Blockly.FieldTouch("0"), "touchButtonAND" + a);
      }
      else if (currentBlock.type == "ultrasonic") {
          minvalue = (Blockly.Blocks.MinValue < 0 || Blockly.Blocks.MinValue > 249) ? 0 : Blockly.Blocks.MinValue;
          maxvalue = (Blockly.Blocks.MaxValue < 0 || Blockly.Blocks.MaxValue > 250) ? 250 : Blockly.Blocks.MaxValue;

          Panel1AND = currentBlock.appendDummyInput("Panel1AND" + a)
              .appendField(new Blockly.FieldImage("assets/images/resources/and.png", 19, 19, "*"))
              .appendField(new Blockly.FieldDropdown(currPinArray), "PinAND" + a)
              .appendField("Range")
              .appendField(new Blockly.FieldDropdown([["Inside", "Inside"], ["Outside", "Outside"]]), "RangeLimitAND" + a)
              .appendField("Min")
              .appendField(new Blockly.FieldNumber(minvalue, minvalue, maxvalue), "SensorRangeMinAND" + a)
              .appendField("Max")
              .appendField(new Blockly.FieldNumber(maxvalue, minvalue, maxvalue), "SensorRangeMaxAND" + a);
      }
      else if (currentBlock.type == "temperature") {
          minvalue = Blockly.Blocks.MinValue < 0 ? 0 : Blockly.Blocks.MinValue;
          maxvalue = Blockly.Blocks.MaxValue > 100 ? 100 : Blockly.Blocks.MaxValue;

          Panel1AND = currentBlock.appendDummyInput("Panel1AND" + a)
              .appendField(new Blockly.FieldImage("assets/images/resources/and.png", 19, 19, "*"))
              .appendField(new Blockly.FieldDropdown(currPinArray), "PinAND" + a)
              .appendField("Range")
              .appendField(new Blockly.FieldDropdown([["Inside", "Inside"], ["Outside", "Outside"]]), "RangeLimitAND" + a)
              .appendField("Min")
              .appendField(new Blockly.FieldNumber(minvalue, minvalue, maxvalue), "SensorRangeMinAND" + a)
              .appendField("Max")
              .appendField(new Blockly.FieldNumber(maxvalue, minvalue, maxvalue), "SensorRangeMaxAND" + a);
      }
      else if (currentBlock.type == "lightsensor" || currentBlock.type == "resistor" || currentBlock.type == "IR") {
          minvalue = Blockly.Blocks.MinValue < 0 ? 0 : Blockly.Blocks.MinValue;
          maxvalue = Blockly.Blocks.MaxValue > 1023 ? 1023 : Blockly.Blocks.MaxValue;

          Panel1AND = currentBlock.appendDummyInput("Panel1AND" + a)
              .appendField(new Blockly.FieldImage("assets/images/resources/and.png", 19, 19, "*"))
              .appendField(new Blockly.FieldDropdown(currPinArray), "PinAND" + a)
              .appendField("Range")
              .appendField(new Blockly.FieldDropdown([["Inside", "Inside"], ["Outside", "Outside"]]), "RangeLimitAND" + a)
              .appendField("Min")
              .appendField(new Blockly.FieldNumber(minvalue, minvalue, maxvalue), "SensorRangeMinAND" + a)
              .appendField("Max")
              .appendField(new Blockly.FieldNumber(maxvalue, minvalue, maxvalue), "SensorRangeMaxAND" + a);
      }
      else if (currentBlock.type == "mic") {
          minvalue = Blockly.Blocks.MinValue < 0 ? 0 : Blockly.Blocks.MinValue;
          maxvalue = Blockly.Blocks.MaxValue > 100 ? 100 : Blockly.Blocks.MaxValue;

          Panel1AND = currentBlock.appendDummyInput("Panel1AND" + a)
              .appendField(new Blockly.FieldImage("assets/images/resources/and.png", 19, 19, "*"))
              .appendField(new Blockly.FieldDropdown(currPinArray), "PinAND" + a)
              .appendField("Volume")
              .appendField(new Blockly.FieldDropdown([["Inside", "Inside"], ["Outside", "Outside"]]), "RangeLimitAND" + a)
              .appendField("Min(%)")
              .appendField(new Blockly.FieldNumber(60, minvalue, maxvalue), "SensorRangeMinAND" + a)
              .appendField("Max(%)")
              .appendField(new Blockly.FieldNumber(maxvalue, minvalue, maxvalue), "SensorRangeMaxAND" + a);
      }

      currentBlock.removeInput('OutputStmt');
      currentBlock.appendStatementInput("OutputStmt")
          .setCheck(null);

      if (typeof(Blockly.Blocks.fvalsAND[te]) != "undefined" && Blockly.Blocks.fvalsAND[te].fId == ("PinAND" + a)) {
          if (currentBlock.type == "button" || currentBlock.type == "touch_sensor") {
              var PinAND = Panel1AND.fieldRow[1];
              var stateAND = Panel1AND.fieldRow[2];

              PinAND.setValue(Blockly.Blocks.fvalsAND[te].fValPin);
              stateAND.setValue(Blockly.Blocks.fvalsAND[te].fValstate);
          }
          else if (currentBlock.type == "custominput") {
              var PinAND = Panel1AND.fieldRow[1];
              var choiceAND = Panel1AND.fieldRow[2];
              var RangeLimitAND = Panel2AND.fieldRow[0];
              var SensorRangeMinAND = Panel2AND.fieldRow[1];
              var SensorRangeMaxAND = Panel2AND.fieldRow[2];
              var statusAND = Panel3AND.fieldRow[0];

              PinAND.setValue(Blockly.Blocks.fvalsAND[te].fValPin);
              choiceAND.setValue(Blockly.Blocks.fvalsAND[te].fValchoice);
              RangeLimitAND.setValue(Blockly.Blocks.fvalsAND[te].fValRangeLimit);
              SensorRangeMinAND.setValue(Blockly.Blocks.fvalsAND[te].fValSensorRangeMin);
              SensorRangeMaxAND.setValue(Blockly.Blocks.fvalsAND[te].fValSensorRangeMax);
              statusAND.setValue(Blockly.Blocks.fvalsAND[te].fValstatus);

              if (choiceAND.value_ == 'SIGNAL') {
                  Panel2AND.setVisible(true);
                  Panel3AND.setVisible(false);
              }
              else {
                  Panel2AND.setVisible(false);
                  Panel3AND.setVisible(true);
              }
          }
          else if (currentBlock.type == "colorsensor") {
              var PinAND = Panel1AND.fieldRow[1];
              var optionAND = Panel1AND.fieldRow[3];
              var rangeLabelAND = Panel2AND.fieldRow[0];
              var minLabelAND = Panel2AND.fieldRow[1];
              var pickerMinAND = Panel2AND.fieldRow[2];
              var maxLabelAND = Panel2AND.fieldRow[3];
              var pickerMaxAND = Panel2AND.fieldRow[4];
              var rangeValueAND = Panel3AND.fieldRow[0];
              var minValueAND = Panel3AND.fieldRow[1];
              var maxValueAND = Panel3AND.fieldRow[2];

              var rangeValue = Blockly.Blocks.fvalsAND[te].fValRange;

              var minValue = Blockly.Blocks.fvalsAND[te].fValSensorRangeMin;
              minValue = isNaN(parseInt(minValue)) ? 0 : parseInt(minValue);
              var minValueColor = ColorWheel.HsvToHex({h: minValue, s: 100, v: 100});

              var maxValue = Blockly.Blocks.fvalsAND[te].fValSensorRangeMax;
              maxValue = isNaN(parseInt(maxValue)) ? 45 : parseInt(maxValue);
              var maxValueColor = ColorWheel.HsvToHex({h: maxValue, s: 100, v: 100});

              PinAND.setValue(Blockly.Blocks.fvalsAND[te].fValPin);
              optionAND.setValue(Blockly.Blocks.fvalsAND[te].fValRangeLimit);
              rangeValueAND.setValue(rangeValue);
              minValueAND.setValue(minValue.toString());
              maxValueAND.setValue(maxValue.toString());

              rangeLabelAND.setValue(rangeValue);

              minLabelAND.setValue(minValue.toString());
              pickerMinAND.setValue(minValueColor);

              maxLabelAND.setValue(maxValue.toString());
              pickerMaxAND.setValue(maxValueColor);

              if (optionAND.value_ == 'Color') {
                  Panel2AND.setVisible(true);
              }
              else {
                  Panel2AND.setVisible(false);
              }
          }
          else if (currentBlock.type == "touch_pad") {
              var PinAND = Panel1AND.fieldRow[1];
              var touchTypeAND = Panel1AND.fieldRow[2];
              var touchPinAND = Panel2AND.fieldRow[0];
              var touchButtonAND = Panel3AND.fieldRow[0];

              PinAND.setValue(Blockly.Blocks.fvalsAND[te].fValPin);
              touchTypeAND.setValue(Blockly.Blocks.fvalsAND[te].fValchoice);
              touchPinAND.setValue(Blockly.Blocks.fvalsAND[te].fValname);
              touchButtonAND.setValue(Blockly.Blocks.fvalsAND[te].fValButton);

              if (touchTypeAND.value_ == 'Type1') {
                  Panel2AND.setVisible(true);
                  Panel3AND.setVisible(false);
              } else {
                  Panel2AND.setVisible(false);
                  Panel3AND.setVisible(true);
              }
          }
          else {
              var PinAND = Panel1AND.fieldRow[1];
              var RangeLimitAND = Panel1AND.fieldRow[3];
              var SensorRangeMinAND = Panel1AND.fieldRow[5];
              var SensorRangeMaxAND = Panel1AND.fieldRow[7];

              PinAND.setValue(Blockly.Blocks.fvalsAND[te].fValPin);
              RangeLimitAND.setValue(Blockly.Blocks.fvalsAND[te].fValRangeLimit);
              SensorRangeMinAND.setValue(Blockly.Blocks.fvalsAND[te].fValSensorRangeMin);
              SensorRangeMaxAND.setValue(Blockly.Blocks.fvalsAND[te].fValSensorRangeMax);
          }
      }
  }

  //OR APPEND
  for (a = 1, te = 0; a <= currentBlock.orCount_, te < currentBlock.orCount_; a++, te++) {
      if (currentBlock.type == "button") {
          Panel1OR = currentBlock.appendDummyInput("Panel1OR" + a)
              .appendField(new Blockly.FieldImage("assets/images/resources/oricon.png", 19, 19, "*"))
              .appendField(new Blockly.FieldDropdown(currPinArray), "PinOR" + a)
              .appendField(new Blockly.FieldDropdown([["PRESSED", "PRESSED"], ["RELEASED", "RELEASED"]]), "stateOR" + a);
      }
      else if (currentBlock.type == "touch_sensor") {
          Panel1OR = currentBlock.appendDummyInput("Panel1OR" + a)
              .appendField(new Blockly.FieldImage("assets/images/resources/oricon.png", 19, 19, "*"))
              .appendField(new Blockly.FieldDropdown(currPinArray), "PinOR" + a)
              .appendField(new Blockly.FieldDropdown([["Touched", "Touched"], ["Untouched", "Untouched"]]), "stateOR" + a);
      }
      else if (currentBlock.type == "custominput") {
          minvalue = Blockly.Blocks.MinValue < 0 ? 0 : Blockly.Blocks.MinValue;
          maxvalue = Blockly.Blocks.MaxValue > 1023 ? 1023 : Blockly.Blocks.MaxValue;

          Panel1OR = currentBlock.appendDummyInput("Panel1OR" + a)
              .appendField(new Blockly.FieldImage("assets/images/resources/oricon.png", 19, 19, "*"))
              .appendField(new Blockly.FieldDropdown(currPinArray), "PinOR" + a)
              .appendField(new Blockly.FieldDropdown([["SIGNAL", "SIGNAL"], ["EDGE", "EDGE"]]), "choiceOR" + a)
              .appendField(" ");

          Panel2OR = currentBlock.appendDummyInput("Panel2OR" + a)
              .appendField(new Blockly.FieldDropdown([["Inside", "Inside"], ["Outside", "Outside"]]), "RangeLimitOR" + a)
              .appendField(new Blockly.FieldNumber(minvalue, minvalue, maxvalue), "SensorRangeMinOR" + a)
              .appendField(new Blockly.FieldNumber(maxvalue, minvalue, maxvalue), "SensorRangeMaxOR" + a);

          Panel3OR = currentBlock.appendDummyInput("Panel3OR" + a)
              .appendField(new Blockly.FieldDropdown([["RISING", "RISING"], ["FALLING", "FALLING"]]), "statusOR" + a);
      }
      else if (currentBlock.type == "colorsensor") {
          minvalue = Blockly.Blocks.MinValue < 0 ? 0 : Blockly.Blocks.MinValue;
          maxvalue = Blockly.Blocks.MaxValue > 360 ? 360 : Blockly.Blocks.MaxValue;

          Panel1OR = currentBlock.appendDummyInput("Panel1OR" + a)
              .appendField(new Blockly.FieldImage("assets/images/resources/oricon.png", 19, 19, "*"))
              .appendField(new Blockly.FieldDropdown(currPinArray), "PinOR" + a)
              .appendField("Range")
              .appendField(new Blockly.FieldDropdown([["Color", "Color"], ["White", "White"], ["Black", "Black"]]), "optionOR" + a);

          Panel2OR = currentBlock.appendDummyInput("Panel2OR" + a)
              .appendField("Inside", "rangeLabelOR" + a)
              .appendField("0", "minLabelOR" + a)
              .appendField(new Blockly.FieldColour("#FF0000"), "pickerMinOR" + a)
              .appendField("45", "maxLabelOR" + a)
              .appendField(new Blockly.FieldColour("#ffbf00"), "pickerMaxOR" + a);

          Panel3OR = currentBlock.appendDummyInput("Panel3OR" + a)
              .appendField(new Blockly.FieldDropdown([["Inside", "Inside"]]), "rangeValueOR" + a)
              .appendField(new Blockly.FieldDropdown([["0", "0"]]), "minValueOR" + a)
              .appendField(new Blockly.FieldDropdown([["45", "45"]]), "maxValueOR" + a);

          Panel3OR.setVisible(false);
      }
      else if (currentBlock.type == "touch_pad") {
          var touchDropDown = [["T0", "0"], ["T1", "1"], ["T2", "2"], ["T3", "3"], ["T4", "4"], ["T5", "5"], ["T6", "6"], ["T7", "7"], ["T8", "8"], ["T9", "9"], ["T10", "10"], ["T11", "11"]];

          Panel1OR = currentBlock.appendDummyInput("Panel1OR" + a)
              .appendField(new Blockly.FieldImage("assets/images/resources/oricon.png", 19, 19, "*"))
              .appendField(new Blockly.FieldDropdown(currPinArray), "PinOR" + a)
              .appendField(new Blockly.FieldDropdown([["Type1", "Type1"], ["Type2", "Type2"]]), "touchTypeOR" + a)
              .appendField("Select Pin");

          Panel2OR = currentBlock.appendDummyInput("Panel2OR" + a)
              .appendField(new Blockly.FieldDropdown(touchDropDown), "touchPinOR" + a);

          Panel3OR = currentBlock.appendDummyInput("Panel3OR" + a)
              .appendField(new Blockly.FieldTouch("0"), "touchButtonOR" + a);
      }
      else if (currentBlock.type == "ultrasonic") {
          minvalue = (Blockly.Blocks.MinValue < 0 || Blockly.Blocks.MinValue > 249) ? 0 : Blockly.Blocks.MinValue;
          maxvalue = (Blockly.Blocks.MaxValue < 0 || Blockly.Blocks.MaxValue > 250) ? 250 : Blockly.Blocks.MaxValue;

          Panel1OR = currentBlock.appendDummyInput("Panel1OR" + a)
              .appendField(new Blockly.FieldImage("assets/images/resources/oricon.png", 19, 19, "*"))
              .appendField(new Blockly.FieldDropdown(currPinArray), "PinOR" + a)
              .appendField("Range")
              .appendField(new Blockly.FieldDropdown([["Inside", "Inside"], ["Outside", "Outside"]]), "RangeLimitOR" + a)
              .appendField("Min")
              .appendField(new Blockly.FieldNumber(minvalue, minvalue, maxvalue), "SensorRangeMinOR" + a)
              .appendField("Max")
              .appendField(new Blockly.FieldNumber(maxvalue, minvalue, maxvalue), "SensorRangeMaxOR" + a);
      }
      else if (currentBlock.type == "temperature") {
          minvalue = Blockly.Blocks.MinValue < 0 ? 0 : Blockly.Blocks.MinValue;
          maxvalue = Blockly.Blocks.MaxValue > 100 ? 100 : Blockly.Blocks.MaxValue;

          Panel1OR = currentBlock.appendDummyInput("Panel1OR" + a)
              .appendField(new Blockly.FieldImage("assets/images/resources/oricon.png", 19, 19, "*"))
              .appendField(new Blockly.FieldDropdown(currPinArray), "PinOR" + a)
              .appendField("Range")
              .appendField(new Blockly.FieldDropdown([["Inside", "Inside"], ["Outside", "Outside"]]), "RangeLimitOR" + a)
              .appendField("Min")
              .appendField(new Blockly.FieldNumber(minvalue, minvalue, maxvalue), "SensorRangeMinOR" + a)
              .appendField("Max")
              .appendField(new Blockly.FieldNumber(maxvalue, minvalue, maxvalue), "SensorRangeMaxOR" + a);
      }
      else if (currentBlock.type == "lightsensor" || currentBlock.type == "resistor" || currentBlock.type == "IR") {
          minvalue = Blockly.Blocks.MinValue < 0 ? 0 : Blockly.Blocks.MinValue;
          maxvalue = Blockly.Blocks.MaxValue > 1023 ? 1023 : Blockly.Blocks.MaxValue;

          Panel1OR = currentBlock.appendDummyInput("Panel1OR" + a)
              .appendField(new Blockly.FieldImage("assets/images/resources/oricon.png", 19, 19, "*"))
              .appendField(new Blockly.FieldDropdown(currPinArray), "PinOR" + a)
              .appendField("Range")
              .appendField(new Blockly.FieldDropdown([["Inside", "Inside"], ["Outside", "Outside"]]), "RangeLimitOR" + a)
              .appendField("Min")
              .appendField(new Blockly.FieldNumber(minvalue, minvalue, maxvalue), "SensorRangeMinOR" + a)
              .appendField("Max")
              .appendField(new Blockly.FieldNumber(maxvalue, minvalue, maxvalue), "SensorRangeMaxOR" + a);
      }
      else if (currentBlock.type == "mic") {
          minvalue = Blockly.Blocks.MinValue < 0 ? 0 : Blockly.Blocks.MinValue;
          maxvalue = Blockly.Blocks.MaxValue > 100 ? 100 : Blockly.Blocks.MaxValue;

          Panel1OR = currentBlock.appendDummyInput("Panel1OR" + a)
              .appendField(new Blockly.FieldImage("assets/images/resources/oricon.png", 19, 19, "*"))
              .appendField(new Blockly.FieldDropdown(currPinArray), "PinOR" + a)
              .appendField("Volume")
              .appendField(new Blockly.FieldDropdown([["Inside", "Inside"], ["Outside", "Outside"]]), "RangeLimitOR" + a)
              .appendField("Min(%)")
              .appendField(new Blockly.FieldNumber(60, minvalue, maxvalue), "SensorRangeMinOR" + a)
              .appendField("Max(%)")
              .appendField(new Blockly.FieldNumber(maxvalue, minvalue, maxvalue), "SensorRangeMaxOR" + a);
      }

      currentBlock.removeInput('OutputStmt');
      currentBlock.appendStatementInput("OutputStmt")
          .setCheck(null);

      if (typeof(Blockly.Blocks.fvalsOR[te]) != "undefined") {
          if (Blockly.Blocks.fvalsOR[te].fId == ("PinOR" + a)) {
              if (currentBlock.type == "button" || currentBlock.type == "touch_sensor") {
                  var PinOR = Panel1OR.fieldRow[1];
                  var stateOR = Panel1OR.fieldRow[2];

                  PinOR.setValue(Blockly.Blocks.fvalsOR[te].fValPin);
                  stateOR.setValue(Blockly.Blocks.fvalsOR[te].fValstate);
              }
              else if (currentBlock.type == "custominput") {
                  var PinOR = Panel1OR.fieldRow[1];
                  var choiceOR = Panel1OR.fieldRow[2];
                  var RangeLimitOR = Panel2OR.fieldRow[0];
                  var SensorRangeMinOR = Panel2OR.fieldRow[1];
                  var SensorRangeMaxOR = Panel2OR.fieldRow[2];
                  var statusOR = Panel3OR.fieldRow[0];

                  PinOR.setValue(Blockly.Blocks.fvalsOR[te].fValPin);
                  choiceOR.setValue(Blockly.Blocks.fvalsOR[te].fValchoice);
                  RangeLimitOR.setValue(Blockly.Blocks.fvalsOR[te].fValRangeLimit);
                  SensorRangeMinOR.setValue(Blockly.Blocks.fvalsOR[te].fValSensorRangeMin);
                  SensorRangeMaxOR.setValue(Blockly.Blocks.fvalsOR[te].fValSensorRangeMax);
                  statusOR.setValue(Blockly.Blocks.fvalsOR[te].fValstatus);

                  if (choiceOR.value_ == 'SIGNAL') {
                      Panel2OR.setVisible(true);
                      Panel3OR.setVisible(false);
                  }
                  else {
                      Panel2OR.setVisible(false);
                      Panel3OR.setVisible(true);
                  }
              }
              else if (currentBlock.type == "colorsensor") {
                  var PinOR = Panel1OR.fieldRow[1];
                  var optionOR = Panel1OR.fieldRow[3];
                  var rangeLabelOR = Panel2OR.fieldRow[0];
                  var minLabelOR = Panel2OR.fieldRow[1];
                  var pickerMinOR = Panel2OR.fieldRow[2];
                  var maxLabelOR = Panel2OR.fieldRow[3];
                  var pickerMaxOR = Panel2OR.fieldRow[4];
                  var rangeValueOR = Panel3OR.fieldRow[0];
                  var minValueOR = Panel3OR.fieldRow[1];
                  var maxValueOR = Panel3OR.fieldRow[2];

                  var rangeValue = Blockly.Blocks.fvalsOR[te].fValRange;

                  var minValue = Blockly.Blocks.fvalsOR[te].fValSensorRangeMin;
                  minValue = isNaN(parseInt(minValue)) ? 0 : parseInt(minValue);
                  var minValueColor = ColorWheel.HsvToHex({h: minValue, s: 100, v: 100});

                  var maxValue = Blockly.Blocks.fvalsOR[te].fValSensorRangeMax;
                  maxValue = isNaN(parseInt(maxValue)) ? 45 : parseInt(maxValue);
                  var maxValueColor = ColorWheel.HsvToHex({h: maxValue, s: 100, v: 100});

                  PinOR.setValue(Blockly.Blocks.fvalsOR[te].fValPin);
                  optionOR.setValue(Blockly.Blocks.fvalsOR[te].fValRangeLimit);
                  rangeValueOR.setValue(rangeValue);
                  minValueOR.setValue(minValue.toString());
                  maxValueOR.setValue(maxValue.toString());

                  rangeLabelOR.setValue(rangeValue);

                  minLabelOR.setValue(minValue.toString());
                  pickerMinOR.setValue(minValueColor);

                  maxLabelOR.setValue(maxValue.toString());
                  pickerMaxOR.setValue(maxValueColor);

                  if (optionOR.value_ == 'Color') {
                      Panel2OR.setVisible(true);
                  }
                  else {
                      Panel2OR.setVisible(false);
                  }
              }
              else if (currentBlock.type == "touch_pad") {
                  var PinOR = Panel1OR.fieldRow[1];
                  var touchTypeOR = Panel1OR.fieldRow[2];
                  var touchPinOR = Panel2OR.fieldRow[0];
                  var touchButtonOR = Panel3OR.fieldRow[0];

                  PinOR.setValue(Blockly.Blocks.fvalsOR[te].fValPin);
                  touchTypeOR.setValue(Blockly.Blocks.fvalsOR[te].fValchoice);
                  touchPinOR.setValue(Blockly.Blocks.fvalsOR[te].fValname);
                  touchButtonOR.setValue(Blockly.Blocks.fvalsOR[te].fValButton);

                  if (touchTypeOR.value_ == 'Type1') {
                      Panel2OR.setVisible(true);
                      Panel3OR.setVisible(false);
                  } else {
                      Panel2OR.setVisible(false);
                      Panel3OR.setVisible(true);
                  }
              }
              else {
                  var PinOR = Panel1OR.fieldRow[1];
                  var RangeLimitOR = Panel1OR.fieldRow[3];
                  var SensorRangeMinOR = Panel1OR.fieldRow[5];
                  var SensorRangeMaxOR = Panel1OR.fieldRow[7];

                  PinOR.setValue(Blockly.Blocks.fvalsOR[te].fValPin);
                  RangeLimitOR.setValue(Blockly.Blocks.fvalsOR[te].fValRangeLimit);
                  SensorRangeMinOR.setValue(Blockly.Blocks.fvalsOR[te].fValSensorRangeMin);
                  SensorRangeMaxOR.setValue(Blockly.Blocks.fvalsOR[te].fValSensorRangeMax)
              }
          }
      }
  }

  //ELSE IF Append
  for (a = 1, te = 0; a <= currentBlock.elseifCount_, te < currentBlock.elseifCount_; a++, te++) {
      if (currentBlock.type == "button") {
          Panel1ELSEIF = currentBlock.appendDummyInput("Panel1ELSEIF" + a)
              .appendField("Else if")
              .appendField(new Blockly.FieldDropdown(currPinArray), "PinELSEIF" + a)
              .appendField(new Blockly.FieldDropdown([["PRESSED", "PRESSED"], ["RELEASED", "RELEASED"]]), "stateELSEIF" + a);

          currentBlock.appendStatementInput("varelseifblock" + a)
              .setCheck(null);
      }
      else if (currentBlock.type == "touch_sensor") {
          Panel1ELSEIF = currentBlock.appendDummyInput("Panel1ELSEIF" + a)
              .appendField("Else if")
              .appendField(new Blockly.FieldDropdown(currPinArray), "PinELSEIF" + a)
              .appendField(new Blockly.FieldDropdown([["Touched", "Touched"], ["Untouched", "Untouched"]]), "stateELSEIF" + a);

          currentBlock.appendStatementInput("varelseifblock" + a)
              .setCheck(null);
      }
      else if (currentBlock.type == "slide_node") {
          Panel1ELSEIF = currentBlock.appendDummyInput("Panel1ELSEIF" + a)
              .appendField("Else if")
              .appendField(new Blockly.FieldSlide("DOWN, DOWN, DOWN"), "toggleSwitchELSEIF" + a);

          currentBlock.appendStatementInput("varelseifblock" + a)
              .setCheck(null);
      }
      else if (currentBlock.type == "custominput") {
          minvalue = Blockly.Blocks.MinValue < 0 ? 0 : Blockly.Blocks.MinValue;
          maxvalue = Blockly.Blocks.MaxValue > 1023 ? 1023 : Blockly.Blocks.MaxValue;

          Panel1ELSEIF = currentBlock.appendDummyInput("Panel1ELSEIF" + a)
              .appendField("Else if")
              .appendField(new Blockly.FieldDropdown(currPinArray), "PinELSEIF" + a)
              .appendField(new Blockly.FieldDropdown([["SIGNAL", "SIGNAL"], ["EDGE", "EDGE"]]), "choiceELSEIF" + a)
              .appendField(" ");

          Panel2ELSEIF = currentBlock.appendDummyInput("Panel2ELSEIF" + a)
              .appendField(new Blockly.FieldDropdown([["Inside", "Inside"], ["Outside", "Outside"]]), "RangeLimitELSEIF" + a)
              .appendField(new Blockly.FieldNumber(minvalue, minvalue, maxvalue), "SensorRangeMinELSEIF" + a)
              .appendField(new Blockly.FieldNumber(maxvalue, minvalue, maxvalue), "SensorRangeMaxELSEIF" + a);

          Panel3ELSEIF = currentBlock.appendDummyInput("Panel3ELSEIF" + a)
              .appendField(new Blockly.FieldDropdown([["RISING", "RISING"], ["FALLING", "FALLING"]]), "statusELSEIF" + a);

          currentBlock.appendStatementInput("varelseifblock" + a)
              .setCheck(null);
      }
      else if (currentBlock.type == "serialrx") {
          Panel1ELSEIF = currentBlock.appendDummyInput("Panel1ELSEIF" + a)
              .appendField("Else if")
              .appendField(new Blockly.FieldDropdown(currPinArray), "PinELSEIF" + a)
              .appendField("Baud Rate:")
              .appendField(new Blockly.FieldDropdown([["300", "300"], ["600", "600"], ["1200", "1200"], ["2400", "2400"], ["4800", "4800"], ["9600", "9600"], ["14400", "14400"], ["19200", "19200"], ["28800", "28800"], ["38400", "38400"], ["57600", "57600"], ["115200", "115200"]]), "baudrateELSEIF" + a)
              .appendField(new Blockly.FieldDropdown([["Character", "character"], ["Text", "Text"]]), "choiceELSEIF" + a)
              .appendField(new Blockly.FieldTextInput("A"), "txtcharELSEIF" + a);

          currentBlock.appendStatementInput("varelseifblock" + a)
              .setCheck(null);

          Panel1ELSEIF.fieldRow[2].setValue("115200");
      }
      else if (currentBlock.type == "bluetoothrx") {
          Panel1ELSEIF = currentBlock.appendDummyInput("Panel1ELSEIF" + a)
              .appendField("Else if")
              .appendField(new Blockly.FieldDropdown(currPinArray), "PinELSEIF" + a)
              .appendField(new Blockly.FieldDropdown([["Character", "Character"], ["Text", "Text"]]), "datatypeELSEIF" + a)
              .appendField(new Blockly.FieldTextInput("A"), "txtcharELSEIF" + a);

          currentBlock.appendStatementInput("varelseifblock" + a)
              .setCheck(null);
      }
      else if (currentBlock.type == "bluetooth_remote") {
          Panel1ELSEIF = currentBlock.appendDummyInput("Panel1ELSEIF" + a)
              .appendField("Else if");

          if (!Blockly.isMobile) {
              Panel1ELSEIF.appendField(new Blockly.FieldDropdown(currPinArray), "PinELSEIF" + a)
          }

          Panel1ELSEIF.appendField("Select Control")
              .appendField(new Blockly.FieldDropdown([["Type1", "Type1"], ["Type2", "Type2"]]), "drpdwntypeELSEIF" + a)
              .appendField(new Blockly.FieldRemote1("S"), "remoteButtonELSEIF" + a);

          currentBlock.appendStatementInput("varelseifblock" + a)
              .setCheck(null);
      }
      else if (currentBlock.type == "touch_pad") {
          var touchDropDown = [["T0", "0"], ["T1", "1"], ["T2", "2"], ["T3", "3"], ["T4", "4"], ["T5", "5"], ["T6", "6"], ["T7", "7"], ["T8", "8"], ["T9", "9"], ["T10", "10"], ["T11", "11"]];

          Panel1ELSEIF = currentBlock.appendDummyInput("Panel1ELSEIF" + a)
              .appendField("Else if")
              .appendField(new Blockly.FieldDropdown(currPinArray), "PinELSEIF" + a)
              .appendField(new Blockly.FieldDropdown([["Type1", "Type1"], ["Type2", "Type2"]]), "touchTypeELSEIF" + a)
              .appendField("Select Pin");

          Panel2ELSEIF = currentBlock.appendDummyInput("Panel2ELSEIF" + a)
              .appendField(new Blockly.FieldDropdown(touchDropDown), "touchPinELSEIF" + a);

          Panel3ELSEIF = currentBlock.appendDummyInput("Panel3ELSEIF" + a)
              .appendField(new Blockly.FieldTouch("0"), "touchButtonELSEIF" + a);

          currentBlock.appendStatementInput("varelseifblock" + a)
              .setCheck(null);
      }
      else if (currentBlock.type == "gyro" || currentBlock.type == "gyro_mobile") {
          var minRange = currentBlock.type == "gyro" ? -180 : -50;
          var maxRange = currentBlock.type == "gyro" ? 180 : 50;

          Panel1ELSEIF = currentBlock.appendDummyInput("Panel1ELSEIF" + a)
              .appendField("Else if")
              .appendField(" Angle based on ")
              .appendField(new Blockly.FieldDropdown([["X", "X"], ["Y", "Y"], ["Z", "Z"]]), "choiceELSEIF" + a)
              .appendField("axis, Range")
              .appendField(new Blockly.FieldDropdown([["Inside", "Inside"], ["Outside", "Outside"]]), "RangeLimitELSEIF" + a)
              .appendField("Min")
              .appendField(new Blockly.FieldNumber(minRange, minRange, maxRange), "GyroMinELSEIF" + a)
              .appendField("Max")
              .appendField(new Blockly.FieldNumber(maxRange, minRange, maxRange), "GyroMaxELSEIF" + a);

          currentBlock.appendStatementInput("varelseifblock" + a)
              .setCheck(null);
      }
      else if (currentBlock.type == "accelerometer" || currentBlock.type == "accelerometer_mobile") {
          var minRange = currentBlock.type == "accelerometer" ? -5000 : -50;
          var maxRange = currentBlock.type == "accelerometer" ? 5000 : 50;

          Panel1ELSEIF = currentBlock.appendDummyInput("Panel1ELSEIF" + a)
              .appendField("Else if")
              .appendField(" Acceleration in")
              .appendField(new Blockly.FieldDropdown([["X", "X"], ["Y", "Y"], ["Z", "Z"]]), "choiceELSEIF" + a)
              .appendField("axis, Range")
              .appendField(new Blockly.FieldDropdown([["Inside", "Inside"], ["Outside", "Outside"]]), "RangeLimitELSEIF" + a)
              .appendField("Min")
              .appendField(new Blockly.FieldNumber(minRange, minRange, maxRange), "AccMinELSEIF" + a)
              .appendField("Max")
              .appendField(new Blockly.FieldNumber(maxRange, minRange, maxRange), "AccMaxELSEIF" + a);

          currentBlock.appendStatementInput("varelseifblock" + a)
              .setCheck(null);
      }
      else if (currentBlock.type == "colorsensor") {
          minvalue = Blockly.Blocks.MinValue < 0 ? 0 : Blockly.Blocks.MinValue;
          maxvalue = Blockly.Blocks.MaxValue > 360 ? 360 : Blockly.Blocks.MaxValue;

          Panel1ELSEIF = currentBlock.appendDummyInput("Panel1ELSEIF" + a)
              .appendField("Else if")
              .appendField(new Blockly.FieldDropdown(currPinArray), "PinELSEIF" + a)
              .appendField("Range")
              .appendField(new Blockly.FieldDropdown([["Color", "Color"], ["White", "White"], ["Black", "Black"]]), "optionELSEIF" + a);

          Panel2ELSEIF = currentBlock.appendDummyInput("Panel2ELSEIF" + a)
              .appendField("Inside", "rangeLabelELSEIF" + a)
              .appendField("0", "minLabelELSEIF" + a)
              .appendField(new Blockly.FieldColour("#FF0000"), "pickerMinELSEIF" + a)
              .appendField("45", "maxLabelELSEIF" + a)
              .appendField(new Blockly.FieldColour("#ffbf00"), "pickerMaxELSEIF" + a);

          Panel3ELSEIF = currentBlock.appendDummyInput("Panel3ELSEIF" + a)
              .appendField(new Blockly.FieldDropdown([["Inside", "Inside"]]), "rangeValueELSEIF" + a)
              .appendField(new Blockly.FieldDropdown([["0", "0"]]), "minValueELSEIF" + a)
              .appendField(new Blockly.FieldDropdown([["45", "45"]]), "maxValueELSEIF" + a);

          currentBlock.appendStatementInput("varelseifblock" + a)
              .setCheck(null);

          Panel3ELSEIF.setVisible(false);
      }
      else if (currentBlock.type == "ultrasonic") {
          minvalue = (Blockly.Blocks.MinValue < 0 || Blockly.Blocks.MinValue > 249) ? 0 : Blockly.Blocks.MinValue;
          maxvalue = (Blockly.Blocks.MaxValue < 0 || Blockly.Blocks.MaxValue > 250) ? 250 : Blockly.Blocks.MaxValue;

          Panel1ELSEIF = currentBlock.appendDummyInput("Panel1ELSEIF" + a)
              .appendField("Else if")
              .appendField(new Blockly.FieldDropdown(currPinArray), "PinELSEIF" + a)
              .appendField("Range")
              .appendField(new Blockly.FieldDropdown([["Inside", "Inside"], ["Outside", "Outside"]]), "RangeLimitELSEIF" + a)
              .appendField("Min")
              .appendField(new Blockly.FieldNumber(minvalue, minvalue, maxvalue), "SensorRangeMinELSEIF" + a)
              .appendField("Max")
              .appendField(new Blockly.FieldNumber(maxvalue, minvalue, maxvalue), "SensorRangeMaxELSEIF" + a);

          currentBlock.appendStatementInput("varelseifblock" + a)
              .setCheck(null);
      }
      else if (currentBlock.type == "temperature") {
          minvalue = Blockly.Blocks.MinValue < 0 ? 0 : Blockly.Blocks.MinValue;
          maxvalue = Blockly.Blocks.MaxValue > 100 ? 100 : Blockly.Blocks.MaxValue;

          Panel1ELSEIF = currentBlock.appendDummyInput("Panel1ELSEIF" + a)
              .appendField("Else if")
              .appendField(new Blockly.FieldDropdown(currPinArray), "PinELSEIF" + a)
              .appendField("Range")
              .appendField(new Blockly.FieldDropdown([["Inside", "Inside"], ["Outside", "Outside"]]), "RangeLimitELSEIF" + a)
              .appendField("Min")
              .appendField(new Blockly.FieldNumber(minvalue, minvalue, maxvalue), "SensorRangeMinELSEIF" + a)
              .appendField("Max")
              .appendField(new Blockly.FieldNumber(maxvalue, minvalue, maxvalue), "SensorRangeMaxELSEIF" + a);

          currentBlock.appendStatementInput("varelseifblock" + a)
              .setCheck(null);
      }
      else if (currentBlock.type == "lightsensor" || currentBlock.type == "resistor" ||
          currentBlock.type == "IR" || currentBlock.type == "analog_read") {
          minvalue = Blockly.Blocks.MinValue < 0 ? 0 : Blockly.Blocks.MinValue;
          maxvalue = Blockly.Blocks.MaxValue > 1023 ? 1023 : Blockly.Blocks.MaxValue;

          Panel1ELSEIF = currentBlock.appendDummyInput("Panel1ELSEIF" + a)
              .appendField("Else if")
              .appendField(new Blockly.FieldDropdown(currPinArray), "PinELSEIF" + a)
              .appendField("Range")
              .appendField(new Blockly.FieldDropdown([["Inside", "Inside"], ["Outside", "Outside"]]), "RangeLimitELSEIF" + a)
              .appendField("Min")
              .appendField(new Blockly.FieldNumber(minvalue, minvalue, maxvalue), "SensorRangeMinELSEIF" + a)
              .appendField("Max")
              .appendField(new Blockly.FieldNumber(maxvalue, minvalue, maxvalue), "SensorRangeMaxELSEIF" + a);

          currentBlock.appendStatementInput("varelseifblock" + a)
              .setCheck(null);
      }
      else if (currentBlock.type == "mic") {
          minvalue = Blockly.Blocks.MinValue < 0 ? 0 : Blockly.Blocks.MinValue;
          maxvalue = Blockly.Blocks.MaxValue > 100 ? 100 : Blockly.Blocks.MaxValue;

          Panel1ELSEIF = currentBlock.appendDummyInput("Panel1ELSEIF" + a)
              .appendField("Else if")
              .appendField(new Blockly.FieldDropdown(currPinArray), "PinELSEIF" + a)
              .appendField("Volume")
              .appendField(new Blockly.FieldDropdown([["Inside", "Inside"], ["Outside", "Outside"]]), "RangeLimitELSEIF" + a)
              .appendField("Min(%)")
              .appendField(new Blockly.FieldNumber(60, minvalue, maxvalue), "SensorRangeMinELSEIF" + a)
              .appendField("Max(%)")
              .appendField(new Blockly.FieldNumber(maxvalue, minvalue, maxvalue), "SensorRangeMaxELSEIF" + a);

          currentBlock.appendStatementInput("varelseifblock" + a)
              .setCheck(null);
      }

      if (typeof(Blockly.Blocks.fvalsELSEIF[te]) != "undefined") {
          if (currentBlock.type == "gyro" || currentBlock.type == "gyro_mobile" ||
              currentBlock.type == "accelerometer" || currentBlock.type == "accelerometer_mobile") {
              var choiceELSEIF = Panel1ELSEIF.fieldRow[2];
              var RangeLimitELSEIF = Panel1ELSEIF.fieldRow[4];
              var GyroMinELSEIF = Panel1ELSEIF.fieldRow[6];
              var GyroMaxELSEIF = Panel1ELSEIF.fieldRow[8];

              choiceELSEIF.setValue(Blockly.Blocks.fvalsELSEIF[te].fValname);
              RangeLimitELSEIF.setValue(Blockly.Blocks.fvalsELSEIF[te].fValRangeLimit);
              GyroMinELSEIF.setValue(Blockly.Blocks.fvalsELSEIF[te].fValAccMin);
              GyroMaxELSEIF.setValue(Blockly.Blocks.fvalsELSEIF[te].fValAccMax)
          }
          else if (currentBlock.type == "slide_node") {
              var toggleSwitchELSEIF = Panel1ELSEIF.fieldRow[1];

              toggleSwitchELSEIF.setValue(Blockly.Blocks.fvalsELSEIF[te].fValstate);
          }
          if (Blockly.Blocks.fvalsELSEIF[te].fId == ("PinELSEIF" + a)) {
              if (currentBlock.type == "button" || currentBlock.type == "touch_sensor") {
                  var PinELSEIF = Panel1ELSEIF.fieldRow[1];
                  var stateELSEIF = Panel1ELSEIF.fieldRow[2];

                  PinELSEIF.setValue(Blockly.Blocks.fvalsELSEIF[te].fValPin);
                  stateELSEIF.setValue(Blockly.Blocks.fvalsELSEIF[te].fValstate);
              }
              else if (currentBlock.type == "custominput") {
                  var PinELSEIF = Panel1ELSEIF.fieldRow[1];
                  var choiceELSEIF = Panel1ELSEIF.fieldRow[2];
                  var RangeLimitELSEIF = Panel2ELSEIF.fieldRow[0];
                  var SensorRangeMinELSEIF = Panel2ELSEIF.fieldRow[1];
                  var SensorRangeMaxELSEIF = Panel2ELSEIF.fieldRow[2];
                  var statusELSEIF = Panel3ELSEIF.fieldRow[0];

                  PinELSEIF.setValue(Blockly.Blocks.fvalsELSEIF[te].fValPin);
                  choiceELSEIF.setValue(Blockly.Blocks.fvalsELSEIF[te].fValchoice);
                  RangeLimitELSEIF.setValue(Blockly.Blocks.fvalsELSEIF[te].fValRangeLimit);
                  SensorRangeMinELSEIF.setValue(Blockly.Blocks.fvalsELSEIF[te].fValSensorRangeMin);
                  SensorRangeMaxELSEIF.setValue(Blockly.Blocks.fvalsELSEIF[te].fValSensorRangeMax);
                  statusELSEIF.setValue(Blockly.Blocks.fvalsELSEIF[te].fValstatus);

                  if (choiceELSEIF.value_ == 'SIGNAL') {
                      Panel2ELSEIF.setVisible(true);
                      Panel3ELSEIF.setVisible(false);
                  }
                  else {
                      Panel2ELSEIF.setVisible(false);
                      Panel3ELSEIF.setVisible(true);
                  }
              }
              else if (currentBlock.type == "serialrx") {
                  var PinELSEIF = Panel1ELSEIF.fieldRow[1];
                  var baudrateELSEIF = Panel1ELSEIF.fieldRow[3];
                  var choiceELSEIF = Panel1ELSEIF.fieldRow[4];
                  var txtcharELSEIF = Panel1ELSEIF.fieldRow[5];

                  PinELSEIF.setValue(Blockly.Blocks.fvalsELSEIF[te].fValPin);
                  baudrateELSEIF.setValue(Blockly.Blocks.fvalsELSEIF[te].fValname);
                  choiceELSEIF.setValue(Blockly.Blocks.fvalsELSEIF[te].fValchoice);
                  txtcharELSEIF.setValue(Blockly.Blocks.fvalsELSEIF[te].fValchar);
              }
              else if (currentBlock.type == "bluetoothrx") {
                  var PinELSEIF = Panel1ELSEIF.fieldRow[1];
                  var datatypeELSEIF = Panel1ELSEIF.fieldRow[2];
                  var txtcharELSEIF = Panel1ELSEIF.fieldRow[3];

                  PinELSEIF.setValue(Blockly.Blocks.fvalsELSEIF[te].fValPin);
                  datatypeELSEIF.setValue(Blockly.Blocks.fvalsELSEIF[te].fValchoice);
                  txtcharELSEIF.setValue(Blockly.Blocks.fvalsELSEIF[te].fValchar);
              }
              else if (currentBlock.type == "bluetooth_remote") {
                  if (Blockly.isMobile) {
                      var drpdwntypeELSEIF = Panel1ELSEIF.fieldRow[2];
                      var remoteButtonELSEIF = Panel1ELSEIF.fieldRow[3];
                  }
                  else {
                      var PinELSEIF = Panel1ELSEIF.fieldRow[1];
                      var drpdwntypeELSEIF = Panel1ELSEIF.fieldRow[3];
                      var remoteButtonELSEIF = Panel1ELSEIF.fieldRow[4];

                      PinELSEIF.setValue(Blockly.Blocks.fvalsELSEIF[te].fValPin)
                  }
                  drpdwntypeELSEIF.setValue(Blockly.Blocks.fvalsELSEIF[te].fValchoice);
                  remoteButtonELSEIF.setValue(Blockly.Blocks.fvalsELSEIF[te].fValname);
              }
              else if (currentBlock.type == "touch_pad") {
                  var PinELSEIF = Panel1ELSEIF.fieldRow[1];
                  var touchTypeELSEIF = Panel1ELSEIF.fieldRow[2];
                  var touchPinELSEIF = Panel2ELSEIF.fieldRow[0];
                  var touchButtonELSEIF = Panel3ELSEIF.fieldRow[0];

                  PinELSEIF.setValue(Blockly.Blocks.fvalsELSEIF[te].fValPin);
                  touchTypeELSEIF.setValue(Blockly.Blocks.fvalsELSEIF[te].fValchoice);
                  touchPinELSEIF.setValue(Blockly.Blocks.fvalsELSEIF[te].fValname);
                  touchButtonELSEIF.setValue(Blockly.Blocks.fvalsELSEIF[te].fValButton);

                  if (touchTypeELSEIF.value_ == 'Type1') {
                      Panel2ELSEIF.setVisible(true);
                      Panel3ELSEIF.setVisible(false);
                  } else {
                      Panel2ELSEIF.setVisible(false);
                      Panel3ELSEIF.setVisible(true);
                  }
              }
              else if (currentBlock.type == "colorsensor") {
                  var PinELSEIF = Panel1ELSEIF.fieldRow[1];
                  var optionELSEIF = Panel1ELSEIF.fieldRow[3];
                  var rangeLabelELSEIF = Panel2ELSEIF.fieldRow[0];
                  var minLabelELSEIF = Panel2ELSEIF.fieldRow[1];
                  var pickerMinELSEIF = Panel2ELSEIF.fieldRow[2];
                  var maxLabelELSEIF = Panel2ELSEIF.fieldRow[3];
                  var pickerMaxELSEIF = Panel2ELSEIF.fieldRow[4];
                  var rangeValueELSEIF = Panel3ELSEIF.fieldRow[0];
                  var minValueELSEIF = Panel3ELSEIF.fieldRow[1];
                  var maxValueELSEIF = Panel3ELSEIF.fieldRow[2];

                  var rangeValue = Blockly.Blocks.fvalsELSEIF[te].fValRange;

                  var minValue = Blockly.Blocks.fvalsELSEIF[te].fValSensorRangeMin;
                  minValue = isNaN(parseInt(minValue)) ? 0 : parseInt(minValue);
                  var minValueColor = ColorWheel.HsvToHex({h: minValue, s: 100, v: 100});

                  var maxValue = Blockly.Blocks.fvalsELSEIF[te].fValSensorRangeMax;
                  maxValue = isNaN(parseInt(maxValue)) ? 45 : parseInt(maxValue);
                  var maxValueColor = ColorWheel.HsvToHex({h: maxValue, s: 100, v: 100});

                  PinELSEIF.setValue(Blockly.Blocks.fvalsELSEIF[te].fValPin);
                  optionELSEIF.setValue(Blockly.Blocks.fvalsELSEIF[te].fValRangeLimit);
                  rangeValueELSEIF.setValue(rangeValue);
                  minValueELSEIF.setValue(minValue.toString());
                  maxValueELSEIF.setValue(maxValue.toString());

                  rangeLabelELSEIF.setValue(rangeValue);

                  minLabelELSEIF.setValue(minValue.toString());
                  pickerMinELSEIF.setValue(minValueColor);

                  maxLabelELSEIF.setValue(maxValue.toString());
                  pickerMaxELSEIF.setValue(maxValueColor);

                  if (optionELSEIF.value_ == 'Color') {
                      Panel2ELSEIF.setVisible(true);
                  }
                  else {
                      Panel2ELSEIF.setVisible(false);
                  }
              }
              else {
                  var PinELSEIF = Panel1ELSEIF.fieldRow[1];
                  var RangeLimitELSEIF = Panel1ELSEIF.fieldRow[3];
                  var SensorRangeMinELSEIF = Panel1ELSEIF.fieldRow[5];
                  var SensorRangeMaxELSEIF = Panel1ELSEIF.fieldRow[7];

                  PinELSEIF.setValue(Blockly.Blocks.fvalsELSEIF[te].fValPin);
                  RangeLimitELSEIF.setValue(Blockly.Blocks.fvalsELSEIF[te].fValRangeLimit);
                  SensorRangeMinELSEIF.setValue(Blockly.Blocks.fvalsELSEIF[te].fValSensorRangeMin);
                  SensorRangeMaxELSEIF.setValue(Blockly.Blocks.fvalsELSEIF[te].fValSensorRangeMax)
              }
          }
      }
  }

  //ELSE APPEND
  for (a = 1; a <= currentBlock.elseCount_; a++) {
      currentBlock.appendStatementInput("varelseblock" + a)
          .appendField("Else")
          .setCheck(null);
  }

  Blockly.Mutator.reconnect(stConn, currentBlock, "OutputStmt");

  var Panel1, offsetPanel, Panel2, colorPanel, delayPanel, varR, varG, varB, insideVarBlock;

  for (j = 1; j <= currentBlock.outputCount_; j++) {
      Panel1 = currentBlock.getInput("Panel1" + j);

      if (currentBlock.type == "servo_device") {
          var angleValue;
          if (Panel1) {
              insideVarBlock = Panel1.connection.targetBlock();
              if (insideVarBlock.type === "angle") {
                  angleValue = Blockly.ESP32.valueToCode(currentBlock, "Panel1" + j, Blockly.ESP32.ORDER_ATOMIC)
              }
          }

          Blockly.Blocks.fvalsNEXT.push({
              fId: ("PinAND" + j),
              fValPin: Panel1 && Panel1.fieldRow[1].value_,
              fValangle: angleValue,
              fConnection: Panel1 && Panel1.connection.targetConnection
          });
      }
      else if (currentBlock.type == "servo_continuous") {
          offsetPanel = currentBlock.getInput("offsetPanel" + j);
          Panel2 = currentBlock.getInput("Panel2" + j);

          var angleValue;
          if (Panel1) {
              insideVarBlock = Panel1.connection.targetBlock();
              if (insideVarBlock.type === "math_number" && insideVarBlock.isShadow_) {
                  angleValue = Blockly.ESP32.valueToCode(currentBlock, "Panel1" + j, Blockly.ESP32.ORDER_ATOMIC)
              }
          }

          Blockly.Blocks.fvalsNEXT.push({
              fId: ("PinAND" + j),
              fValPin: Panel1 && Panel1.fieldRow[1].value_,
              fValangle: angleValue,
              fValchkbox: offsetPanel ? offsetPanel.fieldRow[1].state_.toString() : "FALSE",
              fValoffset: Panel2 && Panel2.fieldRow[0].text_,
              fConnection: Panel1 && Panel1.connection.targetConnection
          });
      }
      else if (currentBlock.type == "led") {
          Blockly.Blocks.fvalsNEXT.push({
              fId: ("PinAND" + j),
              fValPin: Panel1 && Panel1.fieldRow[1].value_,
              fValStatus: Panel1 && Panel1.fieldRow[2].value_
          });
      }
      else if (currentBlock.type == "relay") {
          Blockly.Blocks.fvalsNEXT.push({
              fId: ("PinAND" + j),
              fValPin: Panel1 && Panel1.fieldRow[1].value_,
              fValFlip: Panel1 ? Panel1.fieldRow[3].state_.toString() : "FALSE",
              fValStatus: Panel1 && Panel1.fieldRow[4].value_
          });
      }
      else if (currentBlock.type == "rgbled") {
          colorPanel = currentBlock.getInput("colorPanel" + j);
          delayPanel = currentBlock.getInput("delayPanel" + j);
          varR = currentBlock.getInput("varR" + j);
          varG = currentBlock.getInput("varG" + j);
          varB = currentBlock.getInput("varB" + j);

          var Rvalue, Gvalue, Bvalue;
          if (varR && varG && varB) {
              insideVarBlock = varR.connection.targetBlock();
              if (insideVarBlock && insideVarBlock.type === "math_number" && insideVarBlock.isShadow_) {
                  Rvalue = Blockly.ESP32.valueToCode(currentBlock, "varR" + j, Blockly.ESP32.ORDER_ATOMIC)
              }

              insideVarBlock = varG.connection.targetBlock();
              if (insideVarBlock && insideVarBlock.type === "math_number" && insideVarBlock.isShadow_) {
                  Gvalue = Blockly.ESP32.valueToCode(currentBlock, "varG" + j, Blockly.ESP32.ORDER_ATOMIC)
              }

              insideVarBlock = varB.connection.targetBlock();
              if (insideVarBlock && insideVarBlock.type === "math_number" && insideVarBlock.isShadow_) {
                  Bvalue = Blockly.ESP32.valueToCode(currentBlock, "varB" + j, Blockly.ESP32.ORDER_ATOMIC)
              }
          }

          Blockly.Blocks.fvalsNEXT.push({
              fId: ("PinAND" + j),
              fValPin: Panel1 && Panel1.fieldRow[1].value_,
              fValchoice: Panel1 && Panel1.fieldRow[2].value_,
              fValcolor: colorPanel ? colorPanel.fieldRow[1].colour_ : "#ffffff",
              fvaldelay: delayPanel && delayPanel.fieldRow[1].text_,
              fvarR: Rvalue,
              fvarG: Gvalue,
              fvarB: Bvalue,
              fRConnection: varR && varR.connection.targetConnection,
              fGConnection: varG && varG.connection.targetConnection,
              fBConnection: varB && varB.connection.targetConnection
          });
      }
  }

  currPinArray = Blockly.Blocks.getUnusedpins(currentBlock);

  // Remove All inputs
  for (a = 1; currentBlock.getInput("Panel1" + a);) {
      currentBlock.removeInput("Panel1" + a), a++;
  }
  for (a = 1; currentBlock.getInput("offsetPanel" + a);) {
      currentBlock.removeInput("offsetPanel" + a), a++;
  }
  for (a = 1; currentBlock.getInput("colorPanel" + a);) {
      currentBlock.removeInput("colorPanel" + a), a++;
  }
  for (a = 1; currentBlock.getInput("delayPanel" + a);) {
      currentBlock.removeInput("delayPanel" + a), a++;
  }
  for (a = 1; currentBlock.getInput("varR" + a);) {
      currentBlock.removeInput("varR" + a), a++;
  }
  for (a = 1; currentBlock.getInput("varG" + a);) {
      currentBlock.removeInput("varG" + a), a++;
  }
  for (a = 1; currentBlock.getInput("varB" + a);) {
      currentBlock.removeInput("varB" + a), a++;
  }
  for (a = 1; currentBlock.getInput("varDigital" + a);) {
      currentBlock.removeInput("varDigital" + a), a++;
  }
  for (a = 1; currentBlock.getInput("varAnalog" + a);) {
      currentBlock.removeInput("varAnalog" + a), a++;
  }
  for (a = 1; currentBlock.getInput("Panel2" + a);) {
      currentBlock.removeInput("Panel2" + a), a++;
  }
  for (a = 1; currentBlock.getInput("Panel3" + a);) {
      currentBlock.removeInput("Panel3" + a), a++;
  }
  for (a = 1; currentBlock.getInput("Panel4" + a);) {
      currentBlock.removeInput("Panel4" + a), a++;
  }
  for (a = 1; currentBlock.getInput("Panel5" + a);) {
      currentBlock.removeInput("Panel5" + a), a++;
  }
  for (a = 1; currentBlock.getInput("BouncePanel" + a);) {
      currentBlock.removeInput("BouncePanel" + a), a++;
  }
  //end

  for (a = 1, te = 0; a <= currentBlock.outputCount_, te < currentBlock.outputCount_; a++, te++) {
      if (currentBlock.type == "servo_device") {
          Panel1 = currentBlock.appendValueInput("Panel1" + a)
              .appendField("; Pin")
              .appendField(new Blockly.FieldDropdown(currPinArray), "PinAND" + a)
              .appendField(" ")
              .setCheck("Number");

          currentBlock.appendShadowBlock(Panel1, 90, 0, 0, Blockly.Block.shadowType.ANGLE);
      }
      else if (currentBlock.type == "servo_continuous") {
          Panel1 = currentBlock.appendValueInput("Panel1" + a)
              .appendField("; Pin")
              .appendField(new Blockly.FieldDropdown(currPinArray), "PinAND" + a)
              .appendField(" Speed ")
              .setCheck("Number");

          offsetPanel = currentBlock.appendDummyInput('offsetPanel' + a)
              .appendField(" ")
              .appendField(new Blockly.FieldCheckbox("FALSE"), "chkbox" + a)
              .appendField("Offset");

          Panel2 = currentBlock.appendDummyInput('Panel2' + a)
              .appendField(new Blockly.FieldNumber(0), "offset" + a);

          currentBlock.appendShadowBlock(Panel1, 0, -10, 10);
      }
      else if (currentBlock.type == "led") {
          Panel1 = currentBlock.appendDummyInput("Panel1" + a)
              .appendField("; Pin")
              .appendField(new Blockly.FieldDropdown(currPinArray), "PinAND" + a)
              .appendField(new Blockly.FieldDropdown([["ON", "HIGH"], ["OFF", "LOW"]]), "status" + a);
      }
      else if (currentBlock.type == "relay") {
          Panel1 = currentBlock.appendDummyInput("Panel1" + a)
              .appendField("; Pin")
              .appendField(new Blockly.FieldDropdown(currPinArray), "PinAND" + a)
              .appendField("Flip")
              .appendField(new Blockly.FieldCheckbox("FALSE"), "chkFlip" + a)
              .appendField(new Blockly.FieldDropdown([["ON", "HIGH"], ["OFF", "LOW"]]), "status" + a);
      }
      else if (currentBlock.type == "rgbled") {
          var dropdown_types = [["Color", "color"], ["Variable", "variable"]];

          Panel1 = currentBlock.appendDummyInput("Panel1" + a)
              .appendField("; Pin")
              .appendField(new Blockly.FieldDropdown(currPinArray), "PinAND" + a)
              .appendField(new Blockly.FieldDropdown(dropdown_types), "choice" + a);

          colorPanel = currentBlock.appendDummyInput("colorPanel" + a)
              .appendField(" ")
              .appendField(new Blockly.FieldColour("#33FF33"), "color" + a);

          delayPanel = currentBlock.appendDummyInput('delayPanel' + a)
              .appendField(Blockly.Msg.flow_delay)
              .appendField(new Blockly.FieldNumber(100, 0, 1000), "Delay" + a);

          varR = currentBlock.appendValueInput("varR" + a)
              .setCheck("Number");

          varG = currentBlock.appendValueInput("varG" + a)
              .setCheck("Number");

          varB = currentBlock.appendValueInput("varB" + a)
              .setCheck("Number");
      }

      if (typeof(Blockly.Blocks.fvalsNEXT[te]) != "undefined") {
          if (Blockly.Blocks.fvalsNEXT[te].fId == ("PinAND" + a)) {
              if (currentBlock.type == "servo_device") {
                  var PinAND = Panel1.fieldRow[1];

                  var varConnecton = Blockly.Blocks.fvalsNEXT[te].fConnection;
                  if (varConnecton) {
                      if (varConnecton.sourceBlock_.type === "angle") {
                          var angle = Panel1.connection.targetBlock().inputList[0].fieldRow[0];

                          angle.setValue(Blockly.Blocks.fvalsNEXT[te].fValangle);
                      }
                      else {
                          insideVarBlock = Panel1.connection && Panel1.connection.targetBlock();
                          if (insideVarBlock != null) {
                              insideVarBlock.dispose();
                          }

                          Panel1.connection.connect(varConnecton);
                      }
                  }

                  PinAND.setValue(Blockly.Blocks.fvalsNEXT[te].fValPin);
              }
              else if (currentBlock.type == "servo_continuous") {
                  var PinAND = Panel1.fieldRow[1];
                  var chkbox = offsetPanel.fieldRow[1];
                  var offset = Panel2.fieldRow[0];

                  var varConnecton = Blockly.Blocks.fvalsNEXT[te].fConnection;
                  if (varConnecton) {
                      if (varConnecton.sourceBlock_.type === "math_number" && varConnecton.sourceBlock_.isShadow_) {
                          var angle = Panel1.connection.targetBlock().inputList[0].fieldRow[0];

                          angle.setValue(Blockly.Blocks.fvalsNEXT[te].fValangle);
                      }
                      else {
                          insideVarBlock = Panel1.connection && Panel1.connection.targetBlock();
                          if (insideVarBlock != null) {
                              insideVarBlock.dispose();
                          }

                          Panel1.connection.connect(varConnecton);
                      }
                  }

                  PinAND.setValue(Blockly.Blocks.fvalsNEXT[te].fValPin);
                  chkbox.setValue(Blockly.Blocks.fvalsNEXT[te].fValchkbox);
                  offset.setValue(Blockly.Blocks.fvalsNEXT[te].fValoffset);

                  Panel2.setVisible(chkbox.state_);
              }
              else if (currentBlock.type == "led") {
                  var PinAND = Panel1.fieldRow[1];
                  var status = Panel1.fieldRow[2];

                  PinAND.setValue(Blockly.Blocks.fvalsNEXT[te].fValPin);
                  status.setValue(Blockly.Blocks.fvalsNEXT[te].fValStatus);
              }
              else if (currentBlock.type == "relay") {
                  var PinAND = Panel1.fieldRow[1];
                  var chkFlip = Panel1.fieldRow[3];
                  var status = Panel1.fieldRow[4];

                  PinAND.setValue(Blockly.Blocks.fvalsNEXT[te].fValPin);
                  chkFlip.setValue(Blockly.Blocks.fvalsNEXT[te].fValFlip);
                  status.setValue(Blockly.Blocks.fvalsNEXT[te].fValStatus);
              }
              else if (currentBlock.type == "rgbled") {
                  var PinAND = Panel1.fieldRow[1];
                  var choice = Panel1.fieldRow[2];
                  var color = colorPanel.fieldRow[1];
                  var Delay = delayPanel.fieldRow[1];

                  PinAND.setValue(Blockly.Blocks.fvalsNEXT[te].fValPin);
                  choice.setValue(Blockly.Blocks.fvalsNEXT[te].fValchoice);
                  color.setValue(Blockly.Blocks.fvalsNEXT[te].fValcolor);
                  Delay.setValue(Blockly.Blocks.fvalsNEXT[te].fvaldelay);

                  if (choice.value_ == "color") {
                      colorPanel.setVisible(true);
                      delayPanel.setVisible(false);
                      varR.setVisible(false);
                      varG.setVisible(false);
                      varB.setVisible(false);

                      insideVarBlock = varR.connection && varR.connection.targetBlock();
                      if (insideVarBlock != null) {
                          insideVarBlock.dispose();
                      }
                      insideVarBlock = varG.connection && varG.connection.targetBlock();
                      if (insideVarBlock != null) {
                          insideVarBlock.dispose();
                      }
                      insideVarBlock = varB.connection && varB.connection.targetBlock();
                      if (insideVarBlock != null) {
                          insideVarBlock.dispose();
                      }
                  }
                  else if (choice.value_ == "rainbow") {
                      colorPanel.setVisible(false);
                      delayPanel.setVisible(true);
                      varR.setVisible(false);
                      varG.setVisible(false);
                      varB.setVisible(false);

                      insideVarBlock = varR.connection && varR.connection.targetBlock();
                      if (insideVarBlock != null) {
                          insideVarBlock.dispose();
                      }
                      insideVarBlock = varG.connection && varG.connection.targetBlock();
                      if (insideVarBlock != null) {
                          insideVarBlock.dispose();
                      }
                      insideVarBlock = varB.connection && varB.connection.targetBlock();
                      if (insideVarBlock != null) {
                          insideVarBlock.dispose();
                      }
                  }
                  else {
                      colorPanel.setVisible(false);
                      delayPanel.setVisible(false);
                      varR.setVisible(true);
                      varG.setVisible(true);
                      varB.setVisible(true);

                      var varRConnecton = Blockly.Blocks.fvalsNEXT[te].fRConnection;
                      var varGConnecton = Blockly.Blocks.fvalsNEXT[te].fGConnection;
                      var varBConnecton = Blockly.Blocks.fvalsNEXT[te].fBConnection;

                      if (varRConnecton) {
                          if (varRConnecton.sourceBlock_.type === "math_number" && varRConnecton.sourceBlock_.isShadow_) {
                              currentBlock.appendShadowBlock(varR, Blockly.Blocks.fvalsNEXT[te].fvarR, 0, 255);
                          }
                          else {
                              insideVarBlock = varR.connection && varR.connection.targetBlock();
                              if (insideVarBlock != null) {
                                  insideVarBlock.dispose();
                              }

                              varR.connection.connect(varRConnecton);
                          }
                      }

                      if (varGConnecton) {
                          if (varGConnecton.sourceBlock_.type === "math_number" && varGConnecton.sourceBlock_.isShadow_) {
                              currentBlock.appendShadowBlock(varG, Blockly.Blocks.fvalsNEXT[te].fvarG, 0, 255);
                          }
                          else {
                              insideVarBlock = varG.connection && varG.connection.targetBlock();
                              if (insideVarBlock != null) {
                                  insideVarBlock.dispose();
                              }

                              varG.connection.connect(varGConnecton);
                          }
                      }

                      if (varBConnecton) {
                          if (varBConnecton.sourceBlock_.type === "math_number" && varBConnecton.sourceBlock_.isShadow_) {
                              currentBlock.appendShadowBlock(varB, Blockly.Blocks.fvalsNEXT[te].fvarB, 0, 255);
                          }
                          else {
                              insideVarBlock = varB.connection && varB.connection.targetBlock();
                              if (insideVarBlock != null) {
                                  insideVarBlock.dispose();
                              }

                              varB.connection.connect(varBConnecton);
                          }
                      }
                  }
              }
          }
      }
  }
};

// Pin checking functions
Blockly.Blocks.getUnusedpins = function (block) {
  var arrpin = [], subType;

  if (Blockly.Blocks.isBothinputoutput == 'OFF') {
      
    if (Blockly.Blocks.ConnectedBoard == "FFC_ESP32") {
          if (block.type == "lightsensor" ||
              block.type == "resistor" || block.type == "IR" ||
              block.type == "ultrasonic" ||
              block.type == "button" || block.type == "remote" ||
              block.type == "colorsensor" || block.type == "mic" ||
              block.type == "custominput" ||
              block.type == "digital_read" || block.type == "analog_read" ||
              block.type == "counter") {
              arrpin = [["A0", "A0"], ["A1", "A1"], ["A2", "A2"], ["A3", "A3"], ["A4", "A4"], ["A5", "A5"], ["A6", "A6"], ["A7", "A7"], ["A8", "A8"], ["A9", "A9"]];
          }
          else if (block.type == "waitinput" && (subType = block.getFieldValue('device')) !== null) {
              if (subType == "lightsensor" || subType == "variableresistor" ||
                  subType == "ultrasonoic" || subType == "soundsensor" ||
                  subType == "IR" || subType == "edge" ||
                  subType == "remote" || subType == "button") {
                  arrpin = [["A0", "A0"], ["A1", "A1"], ["A2", "A2"], ["A3", "A3"], ["A4", "A4"], ["A5", "A5"], ["A6", "A6"], ["A7", "A7"], ["A8", "A8"], ["A9", "A9"]];
              }
              else if (subType == "SerialRX" || subType == "bluetoothrx") {
                  arrpin = [["BUILT IN", "15"], ["A0", "A0"], ["A1", "A1"], ["A2", "A2"], ["A3", "A3"], ["A4", "A4"], ["A5", "A5"], ["A6", "A6"], ["A7", "A7"], ["A8", "A8"], ["A9", "A9"]];
              }
          }
          else if (block.type == "temperature") {
              arrpin = [["BUILT IN", "16"], ["A0", "A0"], ["A1", "A1"], ["A2", "A2"], ["A3", "A3"], ["A4", "A4"], ["A5", "A5"], ["A6", "A6"], ["A7", "A7"], ["A8", "A8"], ["A9", "A9"]];
          }
          else if (block.type == "inputreading" && (subType = block.getFieldValue('device')) == "temperature") {
              arrpin = [["BUILT IN", "16"], ["A0", "A0"], ["A1", "A1"], ["A2", "A2"], ["A3", "A3"], ["A4", "A4"], ["A5", "A5"], ["A6", "A6"], ["A7", "A7"], ["A8", "A8"], ["A9", "A9"]];
          }
          else if (block.type == "servo_device" || block.type == "relay" ||
              block.type == "lcd" || block.type == "servo_continuous" ||
              block.type == "tone" || block.type == "digital_write" ||
              block.type == "steppermotor" || block.type == "mp3_player") {
              arrpin = [["O0", "O0"], ["O1", "O1"], ["O2", "O2"], ["O3", "O3"], ["O4", "O4"], ["O5", "O5"], ["O6", "O6"], ["O7", "O7"], ["O8", "O8"], ["O9", "O9"]];
          }
          else if (block.type == "customoutput") {
              arrpin = [["O0", "O0"], ["O1", "O1"], ["O2", "O2"], ["O3", "O3"], ["O4", "O4"], ["O5", "O5"], ["O6", "O6"], ["O7", "O7"], ["O8", "O8"], ["O9", "O9"]];
              Blockly.Blocks.OutputPinArray_AW = [["0", "0"], ["1", "1"], ["2", "2"], ["4", "4"], ["5", "5"]];
          }
          else if (block.type == "buzzer") {
              arrpin = [["BUILT IN", "12"], ["O0", "O0"], ["O1", "O1"], ["O2", "O2"], ["O3", "O3"], ["O4", "O4"], ["O5", "O5"], ["O6", "O6"], ["O7", "O7"], ["O8", "O8"], ["O9", "O9"]];
          }
          else if (block.type == "rgbstrip" || block.type == "rgbled") {
              arrpin = [["BUILT IN", "11"], ["O0", "O0"], ["O1", "O1"], ["O2", "O2"], ["O3", "O3"], ["O4", "O4"], ["O5", "O5"], ["O6", "O6"], ["O7", "O7"], ["O8", "O8"], ["O9", "O9"]];
          }
          else if (block.type == "analog_write") {
              arrpin = [["0", "0"], ["1", "1"], ["2", "2"], ["4", "4"], ["5", "5"]];
          }
          else if (block.type == "bluetoothrx" || block.type == "serialrx" ||
              block.type == "bluetooth_remote" || block.type == "inputreading_bl") {
              arrpin = [["BUILT IN", "15"], ["A0", "A0"], ["A1", "A1"], ["A2", "A2"], ["A3", "A3"], ["A4", "A4"], ["A5", "A5"], ["A6", "A6"], ["A7", "A7"], ["A8", "A8"], ["A9", "A9"]];
          }
          else if (block.type == "led") {
              arrpin = [["BUILT IN", "8"], ["O0", "O0"], ["O1", "O1"], ["O2", "O2"], ["O3", "O3"], ["O4", "O4"], ["O5", "O5"], ["O6", "O6"], ["O7", "O7"], ["O8", "O8"], ["O9", "O9"]];
          }
          else if (block.type == "serialtx" || block.type == "bluetoothtx") {
              arrpin = [["BUILT IN", "14"], ["O0", "O0"], ["O1", "O1"], ["O2", "O2"], ["O3", "O3"], ["O4", "O4"], ["O5", "O5"], ["O6", "O6"], ["O7", "O7"], ["O8", "O8"], ["O9", "O9"]];
          }
          else if (block.type == "rtcset_time" || block.type == "rtcget_time") {
              arrpin = [["6", "6"], ["7", "7"]];
          }
          else {
              arrpin = [["A0", "A0"], ["A1", "A1"], ["A2", "A2"], ["A3", "A3"], ["A4", "A4"], ["A5", "A5"], ["A6", "A6"], ["A7", "A7"], ["A8", "A8"], ["A9", "A9"]];
          }
      }
  }
  else {
      if (Blockly.Blocks.ConnectedBoard == "FFC_ESP32") { 
          if (block.type == "lightsensor" ||
              block.type == "resistor" || block.type == "IR" ||
              block.type == "ultrasonic" || block.type == "remote" ||
              block.type == "colorsensor" || block.type == "mic" ||
              block.type == "custominput" ||
              block.type == "digital_read" || block.type == "analog_read" ||
              block.type == "counter") {
              arrpin = [["A0", "A0"], ["A1", "A1"], ["A2", "A2"], ["A3", "A3"], ["A4", "A4"], ["A5", "A5"], ["A6", "A6"], ["A7", "A7"], ["A8", "A8"], ["A9", "A9"]];
          }
          else if (block.type == "button") {
              arrpin = [["A0", "A0"], ["A1", "A1"], ["A2", "A2"], ["A3", "A3"], ["A4", "A4"], ["A5", "A5"],
                  ["A6", "A6"], ["A7", "A7"], ["A8", "A8"], ["A9", "A9"], ["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"],
                  ["5", "5"], ["6", "6"], ["7", "7"]];
          }
          else if (block.type == "waitinput" && (subType = block.getFieldValue('device')) !== null) {
              if (subType == "lightsensor" || subType == "variableresistor" ||
                  subType == "ultrasonoic" || subType == "soundsensor" || subType == "IR" ||
                  subType == "edge" || subType == "remote" || subType == "button") {
                  arrpin = [["A0", "A0"], ["A1", "A1"], ["A2", "A2"], ["A3", "A3"], ["A4", "A4"], ["A5", "A5"],
                      ["A6", "A6"], ["A7", "A7"], ["A8", "A8"], ["A9", "A9"]];
              }
              else if (subType == "SerialRX" || subType == "bluetoothrx") {
                  arrpin = [["BUILT IN", "15"], ["A0", "A0"], ["A1", "A1"], ["A2", "A2"], ["A3", "A3"], ["A4", "A4"],
                      ["A5", "A5"], ["A6", "A6"], ["A7", "A7"], ["A8", "A8"], ["A9", "A9"]];
              }
          }
          else if (block.type == "temperature") {
              arrpin = [["BUILT IN", "16"], ["A0", "A0"], ["A1", "A1"], ["A2", "A2"], ["A3", "A3"], ["A4", "A4"], ["A5", "A5"], ["A6", "A6"], ["A7", "A7"], ["A8", "A8"], ["A9", "A9"]];
          }
          else if (block.type == "inputreading" && (subType = block.getFieldValue('device')) == "temperature") {
              arrpin = [["BUILT IN", "16"], ["A0", "A0"], ["A1", "A1"], ["A2", "A2"], ["A3", "A3"], ["A4", "A4"], ["A5", "A5"], ["A6", "A6"], ["A7", "A7"], ["A8", "A8"], ["A9", "A9"]];
          }
          else if (block.type == "tone" || block.type == "digital_write") {
              arrpin = [["O0", "O0"], ["O1", "O1"], ["O2", "O2"], ["O3", "O3"], ["O4", "O4"], ["O5", "O5"], ["O6", "O6"], ["O7", "O7"], ["O8", "O8"], ["O9", "O9"]];
          }
          else if (block.type == "steppermotor") {
              arrpin = [["O0", "O0"], ["O1", "O1"], ["O2", "O2"], ["O3", "O3"], ["O4", "O4"], ["O5", "O5"], ["O6", "O6"], ["O7", "O7"], ["O8", "O8"], ["O9", "O9"], ["A0", "A0"], ["A1", "A1"], ["A2", "A2"], ["A3", "A3"], ["A4", "A4"], ["A5", "A5"],
                  ["A6", "A6"], ["A7", "A7"], ["A8", "A8"], ["A9", "A9"]];
          }
          else if (block.type == "servo_device" || block.type == "relay" ||
              block.type == "lcd" || block.type == "servo_continuous" || block.type == "mp3_player") {
              arrpin = [["O0", "O0"], ["O1", "O1"], ["O2", "O2"], ["O3", "O3"], ["O4", "O4"], ["O5", "O5"], ["O6", "O6"], ["O7", "O7"], ["O8", "O8"], ["O9", "O9"],
                  ["A0", "A0"], ["A1", "A1"], ["A2", "A2"], ["A3", "A3"], ["A4", "A4"], ["A5", "A5"],
                  ["A6", "A6"], ["A7", "A7"], ["A8", "A8"], ["A9", "A9"]];
          }
          else if (block.type == "customoutput") {
              arrpin = [["O0", "O0"], ["O1", "O1"], ["O2", "O2"], ["O3", "O3"], ["O4", "O4"], ["O5", "O5"], ["O6", "O6"], ["O7", "O7"], ["O8", "O8"], ["O9", "O9"],
                  ["A0", "A0"], ["A1", "A1"], ["A2", "A2"], ["A3", "A3"], ["A4", "A4"], ["A5", "A5"],
                  ["A6", "A6"], ["A7", "A7"], ["A8", "A8"], ["A9", "A9"]];
              Blockly.Blocks.OutputPinArray_AW = [["0", "0"], ["1", "1"], ["2", "2"], ["4", "4"], ["5", "5"]];
          }
          else if (block.type == "buzzer") {
              arrpin = [["BUILT IN", "12"], ["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"],
                  ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"],
                  ["A0", "A0"], ["A1", "A1"], ["A2", "A2"],
                  ["A3", "A3"], ["A4", "A4"], ["A5", "A5"], ["A6", "A6"], ["A7", "A7"], ["A8", "A8"], ["A9", "A9"]];
          }
          else if (block.type == "rgbstrip" || block.type == "rgbled") {
              arrpin = [["BUILT IN", "11"], ["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"],
                  ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["A0", "A0"], ["A1", "A1"], ["A2", "A2"],
                  ["A3", "A3"], ["A4", "A4"], ["A5", "A5"], ["A6", "A6"], ["A7", "A7"], ["A8", "A8"], ["A9", "A9"]];
          }
          else if (block.type == "analog_write") {
              arrpin = [["0", "0"], ["1", "1"], ["2", "2"], ["4", "4"], ["5", "5"]];
          }
          else if (block.type == "bluetooth_remote" || block.type == "bluetoothrx" ||
              block.type == "serialrx" || block.type == "inputreading_bl") {
              arrpin = [["BUILT IN", "15"], ["A0", "A0"], ["A1", "A1"], ["A2", "A2"],
                  ["A3", "A3"], ["A4", "A4"], ["A5", "A5"], ["A6", "A6"], ["A7", "A7"], ["A8", "A8"], ["A9", "A9"],
                  ["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"],
                  ["5", "5"], ["6", "6"], ["7", "7"]];
          }
          else if (block.type == "led") {
              arrpin = [["BUILT IN", "8"], ["O0", "O0"], ["O1", "O1"], ["O2", "O2"], ["O3", "O3"], ["O4", "O4"], ["O5", "O5"], ["O6", "O6"], ["O7", "O7"], ["O8", "O8"], ["O9", "O9"],
                  ["A0", "A0"], ["A1", "A1"], ["A2", "A2"],
                  ["A3", "A3"], ["A4", "A4"], ["A5", "A5"], ["A6", "A6"], ["A7", "A7"], ["A8", "A8"], ["A9", "A9"]];
          }
          else if (block.type == "serialtx" || block.type == "bluetoothtx") {
              arrpin = [["BUILT IN", "14"], ["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"],
                  ["6", "6"], ["7", "7"], ["A0", "A0"], ["A1", "A1"], ["A2", "A2"],
                  ["A3", "A3"], ["A4", "A4"], ["A5", "A5"], ["A6", "A6"], ["A7", "A7"], ["A8", "A8"], ["A9", "A9"]];
          }
          else if (block.type == "rtcset_time" || block.type == "rtcget_time") {
              arrpin = [["6", "6"], ["7", "7"]];
          }
          else {
              arrpin = [["A0", "A0"], ["A1", "A1"], ["A2", "A2"], ["A3", "A3"], ["A4", "A4"], ["A5", "A5"], ["A6", "A6"], ["A7", "A7"], ["A8", "A8"], ["A9", "A9"]];
          }
      }
  }

  var allBlocks = Blockly.getMainWorkspace().getAllBlocks();
  var arrids = [], b, currtype;
  if (block.type == "inputreading" || block.type == "waitinput") {
      currtype = block.getFieldValue('device');
  }
  else {
      currtype = block.type;
  }

  for (var i = allBlocks.length - 1; i >= 0; i--) {
      b = allBlocks[i];
      arrids.push(b.id);
      if (b.type == "inputreading" || b.type == "lightsensor" ||
          b.type == "resistor" || b.type == "IR" || b.type == "waitinput" ||
          b.type == "temperature" || b.type == "ultrasonic" ||
          b.type == "button" || b.type == "remote" || b.type == "bluetooth_disconnect" ||
          b.type == "colorsensor" || b.type == "mic" || b.type == "inputreading_bl" ||
          b.type == "custominput" || b.type == "serialrx" ||
          b.type == "bluetoothrx" || b.type == "buzzer" || b.type == "mp3_player" ||
          b.type == "servo_device" || b.type == "led" ||
          b.type == "relay" || b.type == "rgbled" || b.type == "steppermotor" ||
          b.type == "serialtx" || b.type == "bluetoothtx" ||
          b.type == "lcd" || b.type == "customoutput" || b.type == "touch_sensor" ||
          b.type == "bluetooth_remote" || b.type === "video" ||
          b.type === "audio" || b.type === "openfile" || b.type === "openweb" ||
          b.type === "viewimage" || b.type === "MouseMove_Output" ||
          b.type === "MouseClick_Output" || b.type === "Keyboard_Output" ||
          b.type === "analog_write" || b.type === "digital_write" ||
          b.type == "servo_continuous" || b.type === "rgbstrip" || b.type == "counter" ||
          b.type == "analog_read" || b.type == "inputreading_analog" || b.type == "digital_read" ||
          b.type == "inputreading_digital" || b.type == "rtcget_time" || b.type == "rtcset_time" ||
          b.type == "Map_" || b.type == "bluetooth_rename" || b.type == "bluetooth_connect") {

          var temptype = b.type;

          if (b.type == "inputreading" || b.type == "waitinput") {
              temptype = b.getFieldValue('device');
          }

          var count = 1, x, index = -1;
          if (temptype != currtype && b.disabled != 1) {
              count = 1;
              while (count <= b.elseifCount_) {
                  x = b.getFieldValue("PinELSEIF" + count);
                  arrpin.forEach(function (item, index) {
                      if (item[1] === x) {
                          arrpin.splice(index, 1);
                      }
                  });
                  count++;
              }

              count = 1;
              while (count <= b.andCount_) {
                  x = b.getFieldValue("PinAND" + count);
                  arrpin.forEach(function (item, index) {
                      if (item[1] === x) {
                          arrpin.splice(index, 1);
                      }
                  });
                  count++;
              }

              count = 1;
              while (count <= b.orCount_) {
                  x = b.getFieldValue("PinOR" + count);
                  arrpin.forEach(function (item, index) {
                      if (item[1] === x) {
                          arrpin.splice(index, 1);
                      }
                  });
                  count++;
              }

              count = 1;
              while (count <= b.outputCount_) {
                  x = b.getFieldValue("PinAND" + count);
                  arrpin.forEach(function (item, index) {
                      if (item[1] === x) {
                          arrpin.splice(index, 1);
                      }
                  });
                  count++;
              }

              x = b.getFieldValue("Pin");

              arrpin.forEach(function (item, index) {
                  if ((currtype === 'bluetoothrx' || currtype === 'inputreading_bl') && (temptype === 'bluetoothrx' || temptype === 'inputreading_bl')) {
                      //bluetooth rx and input reading bluetooth are same so dont want to remove pin
                  }
                  else if (item[1] === x) {
                      arrpin.splice(index, 1);
                  }
              });

              if (temptype == "steppermotor") {
                  var stepDirPin = b.getFieldValue("DirectionPin");
                  arrpin.forEach(function (item, index) {
                      if (item[1] === stepDirPin) {
                          arrpin.splice(index, 1);
                      }
                  });
              }

              if ((temptype === "rtcget_time" || temptype === "rtcset_time") && (currtype !== "rtcget_time" && currtype !== "rtcset_time")) {
                  arrpin.forEach(function (item, index) {
                      if (item[1] === "6") {
                          arrpin.splice(index, 1);
                      }
                  });
                  arrpin.forEach(function (item, index) {
                      if (item[1] === "7") {
                          arrpin.splice(index, 1);
                      }
                  });
              }
          }
      }
  }
  return arrpin;
};

Blockly.Blocks.RemoveUsedPins = function (block) {
    var currPinArray = Blockly.Blocks.getUnusedpins(block);

    var j = 1, c, x, indexSelPin, PinELSEIF, PinAND, PinOR;

    for (j = 1; j <= block.elseifCount_; j++) {
        PinELSEIF = block.getField("PinELSEIF" + j);
        PinELSEIF.menuGenerator_ = currPinArray;
        PinELSEIF.trimOptions_();
        c = PinELSEIF.getOptions_()[0];
        x = PinELSEIF.value_;
        indexSelPin = -1;
        currPinArray.forEach(function (item, i) {
            if (item[1] === x) {
                indexSelPin = i;
            }
        });
        if (indexSelPin == -1) {
            PinELSEIF.setValue(c[1]);
        }
    }

    for (j = 1; j <= block.andCount_; j++) {
        PinAND = block.getField("PinAND" + j);
        PinAND.menuGenerator_ = currPinArray;
        PinAND.trimOptions_();
        c = PinAND.getOptions_()[0];
        x = PinAND.value_;
        indexSelPin = -1;
        currPinArray.forEach(function (item, i) {
            if (item[1] === x) {
                indexSelPin = i;
            }
        });
        if (indexSelPin == -1) {
            PinAND.setValue(c[1]);
        }
    }

    for (j = 1; j <= block.orCount_; j++) {
        PinOR = block.getField("PinOR" + j);
        PinOR.menuGenerator_ = currPinArray;
        PinOR.trimOptions_();
        c = PinOR.getOptions_()[0];
        x = PinOR.value_;
        indexSelPin = -1;
        currPinArray.forEach(function (item, i) {
            if (item[1] === x) {
                indexSelPin = i;
            }
        });
        if (indexSelPin == -1) {
            PinOR.setValue(c[1]);
        }
    }

    for (j = 1; j <= block.outputCount_; j++) {
        PinAND = block.getField("PinAND" + j);
        PinAND.menuGenerator_ = currPinArray;
        PinAND.trimOptions_();
        c = PinAND.getOptions_()[0];
        x = PinAND.value_;
        indexSelPin = -1;
        currPinArray.forEach(function (item, i) {
            if (item[1] === x) {
                indexSelPin = i;
            }
        });
        if (indexSelPin == -1) {
            PinAND.setValue(c[1]);
        }
    }

    if (currPinArray.length > 0) {
        if (block.type === "rtcget_time" || block.type === "rtcset_time") {
            var rtcCount = 0;
            if (currPinArray.length === 2) {
                currPinArray.forEach(function (item, i) {
                    if (item[1] === "6" || item[1] === "7") {
                        rtcCount++;
                    }
                });
            }
            if (rtcCount !== 2) {
                // block.setEnabled(1);
            }
        }
        else {
            var Pin = block.getField("Pin");
            Pin.menuGenerator_ = currPinArray;
            Pin.trimOptions_();
            c = Pin.getOptions_()[0];
            x = Pin.value_;
            indexSelPin = -1;
            currPinArray.forEach(function (item, i) {
                if (item[1] === x) {
                    indexSelPin = i;
                }
            });
            if (indexSelPin == -1) {
                Pin.setValue(c[1])
            }

            if (block.type == "steppermotor") {
                var stepPin = Pin.value_;
                var stepPinArray = currPinArray.slice();
                stepPinArray.forEach(function (item, i) {
                    if (item[1] === stepPin) {
                        stepPinArray.splice(i, 1);
                    }
                });
                var DirectionPin = block.getField("DirectionPin");
                var stepDirPin = DirectionPin.value_;
                if (stepDirPin === stepPin) {
                    DirectionPin.setValue(stepPinArray[0][1]);
                }
                DirectionPin.menuGenerator_ = stepPinArray;
                currPinArray.forEach(function (item, i) {
                    if (item[1] === stepDirPin) {
                        currPinArray.splice(i, 1);
                    }
                });
            }
        }
    }
    else {
        if (!block.type === "rtcget_time" && !block.type === "rtcset_time") {
            block.setFieldValue("No pins available", "Summary");
        }
        // block.setEnabled(1);
    }
};
//end

Blockly.Blocks.CheckStartnode = function (block) {
    if (typeof block.workspace.isDragging === "function" && !block.workspace.isDragging() && !block.isInFlyout) {
        var rootStart = block.getRootBlock();
        if (!rootStart || Blockly.Blocks.START_NODE.indexOf(rootStart.type) == -1) {
            // block.setEnabled(true);
        }
        else {
            if (Blockly.Blocks.isMultitask && block.type === "lcd") {
                // block.setEnabled(true);
            } else {
                // block.setEnabled(false);
            }
        }
    }
};

Blockly.Blocks.hidemutation = function (ev) {
    if (Blockly.Blocks.MutationCanvas && Blockly.selected == null || ev.element == 'click' || ev.element == 'category' || ev.element == 'selected') {
        if (Blockly.Blocks.MutationCanvas === null) {
            Blockly.Blocks.MutationCanvas = document.getElementsByClassName("blocklyBubbleCanvas")[0];
        }
        Blockly.Blocks.MutationCanvas.innerHTML = "";
    }
};

Blockly.Blocks.fn_onchange_out_serial = function (block, event) {
    Blockly.Blocks.RemoveUsedPins(block);
    if (!block.isInFlyout) {
        if (block.colour_ !== Code.multiColor.output) {
            block.setColour(Code.multiColor.output);
        }
        Blockly.Blocks.CheckStartnode(block);
        Blockly.Blocks.hidemutation(event);
        if (!block.collapsed_) {
            var varData = block.inputList[1];
            var secondPanel = block.inputList[2];

            if (!varData.visible_) {
                varData.setVisible(true);
                secondPanel.setVisible(true);

                varData.setAlign(true);
            }
        }
        else if (event instanceof Blockly.Events.Create) {
            var varData = block.inputList[1];

            Blockly.Blocks.fn_varAlign([varData]);
        }
    }
};

Blockly.Blocks.fn_onchange = function (block, event, color, isNoPin, isNoAlign) {
    if (!isNoPin) {
        Blockly.Blocks.RemoveUsedPins(block);
    }

    if (!block.isInFlyout) {
        if (block.colour_ !== color) {
            block.setColour(color);
        }
        Blockly.Blocks.CheckStartnode(block);
        Blockly.Blocks.hidemutation(event);
        if (!block.collapsed_ && !isNoAlign) {
            var Panel1 = block.inputList[1];
            if (!Panel1.visible_) {
                Panel1.setVisible(true);

                Panel1.setAlign(true);
            }
        }
    }
};

Blockly.Blocks.fn_varAlign = function (valueInputsArray) {
    valueInputsArray.forEach(function (item) {
        var current = item.visible_;
        item.setVisible(true);
        item.setVisible(current);
    });
};

Blockly.FieldDropdown.prototype.trimOptions_ = function () {
    this.suffixField = this.prefixField = null;
    var a = this.menuGenerator_;
    if (goog.isArray(a) && !(2 > a.length)) {
        var b = a.map(function (a) {
                return a[0]
            }),
            c = Blockly.shortestStringLength(b),
            d = Blockly.commonWordPrefix(b, c),
            e = Blockly.commonWordSuffix(b, c);
        if ((d || e) && !(c <= d + e)) {
            d && (this.prefixField = b[0].substring(0, d - 1));
            e && (this.suffixField = b[0].substr(1 - e));
            b = [];
            for (c = 0; c < a.length; c++) {
                var f = a[c][0],
                    g = a[c][1],
                    f = f.substring(d, f.length - e);
                b[c] = [f, g]
            }
            this.menuGenerator_ =
                b
        }
    }
};

Blockly.FieldDropdown.prototype.getOptions_ = function () {
    return goog.isFunction(this.menuGenerator_) ? this.menuGenerator_.call(this) : this.menuGenerator_
};

// FieldTouch Functions
Blockly.FieldTouch = function (a, b, c) {
    Blockly.FieldTouch.superClass_.constructor.call(this, a, b);
    this.clickevent = c;
    this.text_ = a;
};
goog.inherits(Blockly.FieldTouch, Blockly.Field);
Blockly.FieldTouch.prototype.init = function () {
    Blockly.FieldTouch.superClass_.init.call(this);
    this.borderRect_.style.fillOpacity = .6;
    this.setValue(this.getValue())
};
Blockly.FieldTouch.prototype.clickEventListener = function (imageElement, functionName) {
    if (functionName) {
        imageElement.addEventListener("click", functionName);
        imageElement.addEventListener("touchstart", functionName);
    }
};
Blockly.FieldTouch.prototype.CURSOR = "default";
Blockly.FieldTouch.prototype.dispose = function () {
    Blockly.WidgetDiv.hideIfOwner(this);
    Blockly.FieldTouch.superClass_.dispose.call(this)
};
Blockly.FieldTouch.prototype.getValue = function () {
    return this.text_
};
Blockly.FieldTouch.prototype.setValue = function (a) {
    this.sourceBlock_ && Blockly.Events.isEnabled() && this.text_ != a && Blockly.Events.fire(new Blockly.Events.Change(this.sourceBlock_, "field", this.name, this.text_, a));
    this.text_ = a;
};
Blockly.FieldTouch.prototype.getText = function () {
    return this.text_
};
Blockly.FieldTouch.prototype.showEditor_ = function () {
    Blockly.WidgetDiv.show(this, this.sourceBlock_.RTL, Blockly.FieldTouch.widgetDispose_);
    var g = this;
    var currblock = this.sourceBlock_;
    var touchPinName = this.name.replace("touchButton", "");

    var a = document.createElement("div");
    a.className = "touchpad_widget";
    a.innerHTML = Code.touchWidgetHtml();

    var b = goog.dom.getViewportSize(),
        c = goog.style.getViewportPageOffset(document),
        d = this.getAbsoluteXY_(),
        e = this.getScaledBBox_();
    var f = {height: a.clientHeight, width: a.clientWidth};
    d.y = d.y + f.height + e.height >= b.height + c.y ? d.y - (f.height - 1) : d.y + (e.height - 1);
    this.sourceBlock_.RTL ? (d.x += e.width, d.x -= f.width, d.x < c.x && (d.x = c.x)) : d.x > b.width + c.x - f.width && (d.x = b.width + c.x - f.width);
    Blockly.WidgetDiv.position(d.x - 4, d.y + 5, b, c, this.sourceBlock_.RTL);
    Blockly.WidgetDiv.DIV.appendChild(a);
    Blockly.WidgetDiv.DIV.style.height = a.offsetHeight + "px";

    $(".touchpad_widget .active").removeClass("active");
    $(".touchpad_widget [name='" + this.text_ + "']").addClass("active");

    var touch_input = $(".touchpad_widget table table div, .touchpad_widget table img");
    touch_input.unbind("click");
    touch_input.click(function () {
        $(".touchpad_widget .active").removeClass("active");
        $(this).addClass("active");
        var text = this.attributes["name"].value;
        currblock.getField('touchPin' + touchPinName).setValue(text);
        g.sourceBlock_ && (a = g.callValidator(text));
        null !== a && g.setValue(a);
    });
};
Blockly.FieldTouch.widgetDispose_ = function () {
    Blockly.FieldTouch.changeEventKey_ && goog.events.unlistenByKey(Blockly.FieldTouch.changeEventKey_)
};
//end

// FieldRemote1 Functions
Blockly.FieldRemote1 = function (a, b, c) {
    Blockly.FieldRemote1.superClass_.constructor.call(this, a, b);
    this.clickevent = c;
    this.text_ = a;
};
goog.inherits(Blockly.FieldRemote1, Blockly.Field);
Blockly.FieldRemote1.prototype.init = function () {
    Blockly.FieldRemote1.superClass_.init.call(this);
    this.borderRect_.style.fillOpacity = .6;
    this.setValue(this.getValue())
};
Blockly.FieldRemote1.prototype.clickEventListener = function (imageElement, functionName) {
    if (functionName) {
        imageElement.addEventListener("click", functionName);
        imageElement.addEventListener("touchstart", functionName);
    }
};
Blockly.FieldRemote1.prototype.CURSOR = "default";
Blockly.FieldRemote1.prototype.dispose = function () {
    Blockly.WidgetDiv.hideIfOwner(this);
    Blockly.FieldRemote1.superClass_.dispose.call(this)
};
Blockly.FieldRemote1.prototype.getValue = function () {
    return this.text_
};
Blockly.FieldRemote1.prototype.setValue = function (a) {
    this.sourceBlock_ && Blockly.Events.isEnabled() && this.button_ != a && Blockly.Events.fire(new Blockly.Events.Change(this.sourceBlock_, "field", this.name, this.button_, a));
    this.button_ = a;
    this.text_ = a;
};
Blockly.FieldRemote1.prototype.getText = function () {
    return this.text_
};
Blockly.FieldRemote1.prototype.showEditor_ = function () {
    Blockly.WidgetDiv.show(this, this.sourceBlock_.RTL, Blockly.FieldRemote1.widgetDispose_);
    var g = this;

    var htmlContent = "";
    var type = "Type3";
    if (this.sourceBlock_.type === "bluetooth_remote") {
        type = this.sourceBlock_.getFieldValue("drpdwntype" + this.name.replace("remoteButton", ""));
        if (type === "Type1") {
            htmlContent = Code.blRemote1WidgetHtml();
        } else {
            htmlContent = Code.blRemote2WidgetHtml();
        }
    } else {
        htmlContent = Code.irRemoteWidgetHtml();
    }

    var a = document.createElement("div");
    a.className = "widget-remote";
    a.innerHTML = htmlContent;

    var b = goog.dom.getViewportSize(),
        c = goog.style.getViewportPageOffset(document),
        d = this.getAbsoluteXY_(),
        e = this.getScaledBBox_();
    var f = {height: a.clientHeight, width: a.clientWidth};
    d.y = d.y + f.height + e.height >= b.height + c.y ? d.y - (f.height - 1) : d.y + (e.height - 1);
    this.sourceBlock_.RTL ? (d.x += e.width, d.x -= f.width, d.x < c.x && (d.x = c.x)) : d.x > b.width + c.x - f.width && (d.x = b.width + c.x - f.width);
    Blockly.WidgetDiv.position(d.x - 76, d.y + 5, b, c, this.sourceBlock_.RTL);
    Blockly.WidgetDiv.DIV.appendChild(a);
    Blockly.WidgetDiv.DIV.style.height = a.offsetHeight + "px";

    if (type === "Type1" || type === "Type3") {
        $(".widget-remote button.active").removeClass("active");
        $(".widget-remote button[name='" + this.button_ + "']").addClass("active");
        var remote_button_ir = $(".widget-remote button");
        remote_button_ir.unbind("click");
        remote_button_ir.click(function () {
            $(".widget-remote button.active").removeClass("active");
            $(this).addClass("active");
            g.sourceBlock_ && (a = g.callValidator(this.name));
            null !== a && g.setValue(a);
        });
    }
    else {
        $(".widget-remote div.active").removeClass("active");
        $(".widget-remote div[name='" + this.button_ + "']").addClass("active");
        var remote_button_bl = $(".widget-remote div h3");
        remote_button_bl.unbind("click");
        remote_button_bl.click(function () {
            $(".widget-remote div.active").removeClass("active");
            $(this).parent().addClass("active");
            g.sourceBlock_ && (a = g.callValidator(this.innerText));
            null !== a && g.setValue(a);
        });
    }
};
Blockly.FieldRemote1.widgetDispose_ = function () {
    Blockly.FieldRemote1.changeEventKey_ && goog.events.unlistenByKey(Blockly.FieldRemote1.changeEventKey_)
};
//end

// FieldSlide Functions
Blockly.FieldSlide = function (a, b, c) {
    Blockly.FieldSlide.superClass_.constructor.call(this, a, b);
    this.clickevent = c;
    this.text_ = a;
};
goog.inherits(Blockly.FieldSlide, Blockly.Field);
Blockly.FieldSlide.prototype.init = function () {
    Blockly.FieldSlide.superClass_.init.call(this);
    this.borderRect_.style.fillOpacity = .6;
    this.setValue(this.getValue())
};
Blockly.FieldSlide.prototype.clickEventListener = function (imageElement, functionName) {
    if (functionName) {
        imageElement.addEventListener("click", functionName);
        imageElement.addEventListener("touchstart", functionName);
    }
};
Blockly.FieldSlide.prototype.CURSOR = "default";
Blockly.FieldSlide.prototype.dispose = function () {
    Blockly.WidgetDiv.hideIfOwner(this);
    Blockly.FieldSlide.superClass_.dispose.call(this)
};
Blockly.FieldSlide.prototype.getValue = function () {
    return this.button_
};
Blockly.FieldSlide.prototype.setValue = function (a) {
    this.sourceBlock_ && Blockly.Events.isEnabled() && this.button_ != a && Blockly.Events.fire(new Blockly.Events.Change(this.sourceBlock_, "field", this.name, this.button_, a));
    this.button_ = a;
    this.text_ = a;
};
Blockly.FieldSlide.prototype.getText = function () {
    return this.button_
};
Blockly.FieldSlide.prototype.showEditor_ = function () {
    Blockly.WidgetDiv.show(this, this.sourceBlock_.RTL, Blockly.FieldSlide.widgetDispose_);
    var g = this;

    var a = document.createElement("div");
    a.className = "widget_slide_switch";
    a.innerHTML = Code.slideWidgetHtml();

    var b = goog.dom.getViewportSize(),
        c = goog.style.getViewportPageOffset(document),
        d = this.getAbsoluteXY_(),
        e = this.getScaledBBox_();
    var f = {height: a.clientHeight, width: a.clientWidth};
    d.y = d.y + f.height + e.height >= b.height + c.y ? d.y - (f.height - 1) : d.y + (e.height - 1);
    this.sourceBlock_.RTL ? (d.x += e.width, d.x -= f.width, d.x < c.x && (d.x = c.x)) : d.x > b.width + c.x - f.width && (d.x = b.width + c.x - f.width);
    Blockly.WidgetDiv.position(d.x - 4, d.y + 5, b, c, this.sourceBlock_.RTL);
    Blockly.WidgetDiv.DIV.appendChild(a);
    Blockly.WidgetDiv.DIV.style.height = a.offsetHeight + "px";

    var toggle_input = $(".widget_slide_switch input");
    toggle_input.unbind("change");
    toggle_input.change(function () {
        var text = "";
        $(".toggleCheck1").is(":checked") ? text += "UP, " : text += "DOWN, ";
        $(".toggleCheck2").is(":checked") ? text += "UP, " : text += "DOWN, ";
        $(".toggleCheck3").is(":checked") ? text += "UP" : text += "DOWN";

        g.sourceBlock_ && (a = g.callValidator(text));
        null !== a && g.setValue(a);
    });

    var items = this.button_.replace(/ /g, "").split(",");
    $("input[class='toggleCheck1']")[0].checked = items[0] === "UP";
    $("input[class='toggleCheck2']")[0].checked = items[1] === "UP";
    $("input[class='toggleCheck3']")[0].checked = items[2] === "UP";
};
Blockly.FieldSlide.widgetDispose_ = function () {
    Blockly.FieldSlide.changeEventKey_ && goog.events.unlistenByKey(Blockly.FieldSlide.changeEventKey_)
};
//end

// Text Nodes
Blockly.Blocks['text_input'] = {
    init: function () {
        this.appendDummyInput('Panel1')
            .appendField('"', (!0))
            .appendField(new Blockly.FieldTextInput(""), "TEXT")
            .appendField('"', (!1));

        var a = this;
        this.setOutput(true, "String");
        this.setInputsInline(true);
        this.setPreviousStatement(false, null);
        this.setNextStatement(false, null);
        this.setColour(Code.multiColor.text);
        this.setHelpUrl(Blockly.Msg.TEXT_TEXT_HELPURL);
        this.setTooltip(function () {
            var b = a.getParent();
            return b && b.getInputsInline() && b.tooltip || Blockly.Msg.TEXT_TEXT_TOOLTIP
        });
    },
    onchange: function (ev) {
        Blockly.Blocks.fn_onchange(this, ev, Code.multiColor.text, true, true);
    }
};
//end

// Shadow Block
Blockly.Block.prototype.appendShadowBlock = function (valueInput, value, min, max, type) {
    if (valueInput && valueInput.connection && valueInput.connection.targetBlock() === null) {
        type = type || Blockly.Block.shadowType.NUMBER;

        var shadowBlock = this.workspace.newBlock(type);
        // make this block shadow
        shadowBlock.setShadow(true);
        switch (type) {
            case Blockly.Block.shadowType.NUMBER:
                var valueField = shadowBlock.inputList[0].fieldRow[0];
                if (value != undefined) {
                    valueField.text_ = value.toString();
                    valueField.value_ = value.toString();
                }
                if (min != undefined) {
                    valueField.min_ = min;
                }
                if (max != undefined) {
                    valueField.max_ = max;
                }
                break;
            case Blockly.Block.shadowType.TEXT:
                var valueField = shadowBlock.inputList[0].fieldRow[1];
                if (value != undefined) {
                    valueField.text_ = value.toString();
                }
                break;
            case Blockly.Block.shadowType.ANGLE:
                var valueField = shadowBlock.inputList[0].fieldRow[0];
                if (value != undefined) {
                    valueField.text_ = value.toString();
                }
                break;
        }
        // render it
        if (typeof shadowBlock.initSvg === "function") {
            shadowBlock.initSvg();
            shadowBlock.render();
        }

        // get an output connection
        var shadowOutputConnection = shadowBlock.outputConnection;
        // get an input connection
        var valueConnection = valueInput.connection;

        // then connect
        valueConnection.connect(shadowOutputConnection);
    }
};

Blockly.Block.shadowType = {
    NUMBER: "math_number",
    TEXT: "text_input",
    BOOL: "logic_boolean",
    ANGLE: "angle"
};
//end

// Single Blocks
Blockly.Blocks["angle"] = {
    init: function () {
        this.appendDummyInput('Panel1')
            .appendField(new Blockly.FieldAngle(90), "angle");

        this.setColour(Code.multiColor.output);
        this.setOutput(true, "Number");
    },
    onchange: function (ev) {
        Blockly.Blocks.fn_onchange(this, ev, Code.multiColor.output, true, true);
    }
};

// FieldCode Functions
Blockly.FieldCode = function (a, b, c) {
    Blockly.FieldCode.superClass_.constructor.call(this, a, b);
    this.clickevent = c;
    this.text_ = a;
};
goog.inherits(Blockly.FieldCode, Blockly.Field);
Blockly.FieldCode.prototype.init = function () {
    Blockly.FieldCode.superClass_.init.call(this);
    this.borderRect_.style.fillOpacity = .6;
    this.setValue(this.getValue())
};
Blockly.FieldCode.prototype.clickEventListener = function (imageElement, functionName) {
    if (functionName) {
        imageElement.addEventListener("click", functionName);
        imageElement.addEventListener("touchstart", functionName);
    }
};
Blockly.FieldCode.prototype.CURSOR = "default";
Blockly.FieldCode.prototype.dispose = function () {
    Blockly.WidgetDiv.hideIfOwner(this);
    Blockly.FieldCode.superClass_.dispose.call(this)
};
Blockly.FieldCode.prototype.getValue = function () {
    return this.text_
};
Blockly.FieldCode.prototype.setValue = function (a) {
    this.sourceBlock_ && Blockly.Events.isEnabled() && this.text_ != a && Blockly.Events.fire(new Blockly.Events.Change(this.sourceBlock_, "field", this.name, this.text_, a));
    this.text_ = a;
};
Blockly.FieldCode.prototype.getText = function () {
    return this.text_
};
Blockly.FieldCode.prototype.showEditor_ = function () {
    Blockly.WidgetDiv.show(this, this.sourceBlock_.RTL, Blockly.FieldCode.widgetDispose_);
    var g = this;

    var a = document.createElement("div");
    a.className = "widget_custom_code";
    a.innerHTML = Code.codeWidgetHtml(this.text_);

    var b = goog.dom.getViewportSize(),
        c = goog.style.getViewportPageOffset(document),
        d = this.getAbsoluteXY_(),
        e = this.getScaledBBox_();
    var f = {height: a.clientHeight, width: a.clientWidth};
    d.y = d.y + f.height + e.height >= b.height + c.y ? d.y - (f.height - 1) : d.y + (e.height - 1);
    this.sourceBlock_.RTL ? (d.x += e.width, d.x -= f.width, d.x < c.x && (d.x = c.x)) : d.x > b.width + c.x - f.width && (d.x = b.width + c.x - f.width);
    Blockly.WidgetDiv.position(d.x - 39, d.y + 5, b, c, this.sourceBlock_.RTL);
    Blockly.WidgetDiv.DIV.appendChild(a);
    Blockly.WidgetDiv.DIV.style.height = a.offsetHeight + "px";

    var editor;
    editor = CodeMirror.fromTextArea(document.getElementById("myInput"), {
        lineNumbers: true,
        matchBrackets: true,
        lineWrapping: true,
        mode: "text/x-c++src"
    });
    editor.setSize(null, 200);

    var text = editor.getValue();
    var custom_code = $(".widget_custom_code textarea");
    custom_code.unbind("keyup");
    custom_code.unbind("focus");
    custom_code.on('keyup', function () {
        text = editor.getValue();
        var textee = $('.widget-Customtoggleswitch textarea').val();
        if (text == "") {
            g.sourceBlock_ && (a = g.callValidator("Click here to type your custom code"));
            null !== a && g.setValue(a);
        }
        else {
            g.sourceBlock_ && (a = g.callValidator(text));
            null !== a && g.setValue(a);
        }
    });
    custom_code.on('focus', function () {
        if (editor.getValue() == 'Click here to type your custom code') {
            editor.setValue('');
            g.sourceBlock_ && (a = g.callValidator(text));
            null !== a && g.setValue(a);
        }
    });
};
Blockly.FieldCode.widgetDispose_ = function () {
    Blockly.FieldCode.changeEventKey_ && goog.events.unlistenByKey(Blockly.FieldCode.changeEventKey_)
};
//end

Blockly.shortestStringLength = function (a) {
    if (!a.length) return 0;
    for (var b = a[0].length, c = 1; c < a.length; c++) b = Math.min(b, a[c].length);
    return b
};
Blockly.commonWordPrefix = function (a, b) {
    if (!a.length) return 0;
    if (1 == a.length) return a[0].length;
    for (var c = 0, d = b || Blockly.shortestStringLength(a), e = 0; e < d; e++) {
        for (var f = a[0][e], g = 1; g < a.length; g++)
            if (f != a[g][e]) return c;
        " " == f && (c = e + 1)
    }
    for (g = 1; g < a.length; g++)
        if ((f = a[g][e]) && " " != f) return c;
    return d
};
Blockly.commonWordSuffix = function (a, b) {
    if (!a.length) return 0;
    if (1 == a.length) return a[0].length;
    for (var c = 0, d = b || Blockly.shortestStringLength(a), e = 0; e < d; e++) {
        for (var f = a[0].substr(-e - 1, 1), g = 1; g < a.length; g++)
            if (f != a[g].substr(-e - 1, 1)) return c;
        " " == f && (c = e + 1)
    }
    for (g = 1; g < a.length; g++)
        if ((f = a[g].charAt(a[g].length - e - 1)) && " " != f) return c;
    return d
};

Blockly.Msg.flow_delay = "Delay";
Blockly.Msg.servo = "Servo";
Blockly.Msg.controls_flow_statements = "Break";
Blockly.Msg.CONTROLS_FLOW_STATEMENTS_OPERATOR_BREAK = "break out of loop";
Blockly.Msg.CONTROLS_FLOW_STATEMENTS_OPERATOR_CONTINUE = "continue with next iteration of loop";
Blockly.Msg.customcode = "Custom Code";
Blockly.Msg.flow_repeat = "Repeat";
Blockly.Msg.flow_stop = "Stop";
Blockly.Msg.waitinput = "Wait Input";

Blockly.Msg.lightsensor = "Light Sensor";
Blockly.Msg.resistor = "Potentiometer";
Blockly.Msg.ultrasonic = "Ultrasonic";
Blockly.Msg.sound_sensor = "Sound Sensor";
Blockly.Msg.bluetoothrx = "Bluetooth Rx";
Blockly.Msg.IR = "IR";
Blockly.Msg.button = "Button";
Blockly.Msg.slide_node = "Slide Switch";

Blockly.Msg.accelerometer = "Accelerometer";
Blockly.Msg.colorsensor = "Color Sensor";
Blockly.Msg.gyro = "Gyro";
Blockly.Msg.IRSensor = "IR Sensor";
Blockly.Msg.temperature = "Temperature";
Blockly.Msg.touch_pad = "Touchpad";
Blockly.Msg.value_of = "Value Of";

Blockly.Msg.zero = "0";
Blockly.Msg.VARIABLES_GET_TOOLTIP = "Returns the value of this variable.";
Blockly.Msg.VARIABLES_GET_CREATE_SET = "Create 'set %1'";
Blockly.Msg.increment = "Increment";
Blockly.Msg.decrement = "Decrement";
Blockly.Msg.constrain = "Constrain";
Blockly.Msg.map = "Map";

Blockly.Msg.bluetooth_connect = "Bluetooth Connect";
Blockly.Msg.bluetooth_disconnect = "Bluetooth Disconnect";
Blockly.Msg.bluetooth_rename = "Bluetooth Rename";
Blockly.Msg.tone = "Tone";
Blockly.Msg.analogread = "Analog Read";
Blockly.Msg.digitalread = "Digital Read";
Blockly.Msg.analogwrite = "Analog Write";
Blockly.Msg.digitalwrite = "Digital Write";
Blockly.Msg.analogreadPin = "Analog Read Pin";
Blockly.Msg.digitalreadPin = "Digital Read Pin";        
Blockly.Msg.TEXT_INDEXOF_TOOLTIP = "Returns the index of the first/last occurrence of the first text in the second text. Returns %1 if text is not found.";
Blockly.Msg.TEXT_INDEXOF_HELPURL = "https://github.com/google/blockly/wiki/Text#finding-text";  // untranslated
Blockly.Msg.TEXT_APPEND_TOOLTIP = "Append some text to variable '%1'.";
Blockly.Msg.TEXT_APPEND_HELPURL = "https://github.com/google/blockly/wiki/Text#text-modification";  // untranslated
Blockly.Msg.TEXT_TEXT_TOOLTIP = "A letter, word, or line of text.";
Blockly.Msg.TEXT_TEXT_HELPURL = "https://en.wikipedia.org/wiki/String_(computer_science)";

Blockly.Msg.DELETE_Array = "Delete the '%1' array";
Blockly.Msg.array = "Array";
Blockly.Msg.RENAME_ARRAY = "Rename array...";
Blockly.Msg.CHANGE_ARRAY_INITIAL_VALUE = 'Change array initial value...';
Blockly.Msg.fill_array = "Fill Array";
Blockly.Msg.RENAME_ARRAY_TITLE = "Rename all '%1' arrays to:";
Blockly.Msg.CHANGE_ARRAY_INITIAL_VALUE_TITLE = 'Change initial value of "%1" array to:';
Blockly.Msg.NEW_VARIABLE = "Create variable...";
Blockly.Msg.MODIFY_VARIABLE = "Modify Variable..";
Blockly.SVG_NS = "http://www.w3.org/2000/svg";
Blockly.Msg.enable = "Enable";
Blockly.Msg.VARIABLE_ALREADY_EXISTS = "A variable named '%1' already exists.";
Blockly.Msg.create_variable = "Create Variable";
Blockly.Msg.placeholder_var_name = "Enter Variable name";
Blockly.Msg.NEW_TEXT = "Create Text...";
Blockly.Msg.MODIFY_TEXT = "Modify Text..";
Blockly.Msg.NEW_ARRAY = "Create Array..";
Blockly.Msg.MODIFY_ARRAY = "Modify Array..";

Blockly.Field.prototype.SERIALIZABLE = true;

Blockly.Block.prototype.getInputTargetBlock = function (a) {
    return (a = this.getInput(a)) && a.connection && a.connection.targetBlock()
};
Blockly.Field.prototype.getScaledBBox_ = function () {
    var a = this.borderRect_.getBBox();
    return new goog.math.Size(a.width * this.sourceBlock_.workspace.scale, a.height * this.sourceBlock_.workspace.scale)
};

// Code to support for Variable Nodes - begins
// Block Functions - begins
/* Blockly.Block.prototype.getField = function (a) {
    for (var b = 0, c; c = this.inputList[b]; b++)
        for (var d = 0, e; e = c.fieldRow[d]; d++)
            if (e.name === a) return e;
    return null
};
Blockly.Block.prototype.getFieldValue = function (a) {
    return (a = this.getField(a)) ? a.getValue() : null
}; */
// Block Functions - ends
// Name Functions - begins
Blockly.Names.prototype.getName = function (a, b) {
    var c = a.toLowerCase() + "_" + b,
        d = b == Blockly.Variables.NAME_TYPE ? this.variablePrefix_ : "";
    if (c in this.db_) return d + this.db_[c];
    var e = this.getDistinctName(a, b);
    this.db_[c] = e.substr(d.length);
    return e
    var c = a.toLowerCase() + "_" + b,
        d = b == Blockly.Arrays.NAME_TYPE ? this.variablePrefix_ : "";
    if (c in this.db_) return d + this.db_[c];
    var e = this.getDistinctName(a, b);
    this.db_[c] = e.substr(d.length);
    return e
    var c = a.toLowerCase() + "_" + b,
        d = b == Blockly.Text.NAME_TYPE ? this.variablePrefix_ : "";
    if (c in this.db_) return d + this.db_[c];
    var e = this.getDistinctName(a, b);
    this.db_[c] = e.substr(d.length);
    return e
};
Blockly.Names.prototype.getDistinctName = function (a, b) {
    for (var c = this.safeName_(a), d = ""; this.dbReverse_[c + d] || c + d in this.reservedDict_;) d = d ? d + 1 : 2;
    c += d;
    this.dbReverse_[c] = !0;
    return (b == Blockly.Variables.NAME_TYPE ? this.variablePrefix_ : "") + c
};
Blockly.Names.prototype.safeName_ = function (a) {
    a ? (a = encodeURI(a.replace(/ /g, "_")).replace(/[^\w]/g, "_"), -1 != "0123456789".indexOf(a[0]) && (a = "my_" + a)) : a = "unnamed";
    return a
};
// Name Functions - ends

goog = goog || {};
goog.global = this;

goog.labs = {};
goog.labs.userAgent = {};
goog.labs.userAgent.util = {};
goog.labs.userAgent.util.getNativeUserAgentString_ = function () {
    var a = goog.labs.userAgent.util.getNavigator_();
    return a && (a = a.userAgent) ? a : ""
};
goog.labs.userAgent.util.getNavigator_ = function () {
    return goog.global.navigator
};
goog.labs.userAgent.util.userAgent_ = goog.labs.userAgent.util.getNativeUserAgentString_();
goog.labs.userAgent.util.getUserAgent = function () {
    return goog.labs.userAgent.util.userAgent_
};
goog.labs.userAgent.util.matchUserAgent = function (a) {
    var b = goog.labs.userAgent.util.getUserAgent();
    return goog.string.contains(b, a)
};
goog.labs.userAgent.browser = {};
goog.labs.userAgent.browser.matchIE_ = function () {
    return goog.labs.userAgent.util.matchUserAgent("Trident") || goog.labs.userAgent.util.matchUserAgent("MSIE")
};
goog.labs.userAgent.browser.isIE = goog.labs.userAgent.browser.matchIE_;

goog.userAgent = {};
goog.userAgent.ASSUME_IE = !1;
goog.userAgent.BROWSER_KNOWN_ = goog.userAgent.ASSUME_IE || goog.userAgent.ASSUME_EDGE || goog.userAgent.ASSUME_GECKO || goog.userAgent.ASSUME_MOBILE_WEBKIT || goog.userAgent.ASSUME_WEBKIT || goog.userAgent.ASSUME_OPERA;
goog.userAgent.IE = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_IE : goog.labs.userAgent.browser.isIE();
goog.dom.BrowserFeature = {
    CAN_ADD_NAME_OR_TYPE_ATTRIBUTES: !goog.userAgent.IE || goog.userAgent.isDocumentModeOrHigher(9),
    CAN_USE_CHILDREN_ATTRIBUTE: !goog.userAgent.GECKO && !goog.userAgent.IE || goog.userAgent.IE && goog.userAgent.isDocumentModeOrHigher(9) || goog.userAgent.GECKO && goog.userAgent.isVersionOrHigher("1.9.1"),
    CAN_USE_INNER_TEXT: goog.userAgent.IE && !goog.userAgent.isVersionOrHigher("9"),
    CAN_USE_PARENT_ELEMENT_PROPERTY: goog.userAgent.IE || goog.userAgent.OPERA || goog.userAgent.WEBKIT,
    INNER_HTML_NEEDS_SCOPED_ELEMENT: goog.userAgent.IE,
    LEGACY_IE_RANGES: goog.userAgent.IE && !goog.userAgent.isDocumentModeOrHigher(9)
};
goog.dom.createDom = function (a, b, c) {
    return goog.dom.createDom_(document, arguments)
};
goog.dom.createElement = function (a) {
    return document.createElement(String(a))
};
goog.dom.setProperties = function (a, b) {
    goog.object.forEach(b, function (b, d) {
        "style" == d ? a.style.cssText = b : "class" == d ? a.className = b : "for" == d ? a.htmlFor = b : goog.dom.DIRECT_ATTRIBUTE_MAP_.hasOwnProperty(d) ? a.setAttribute(goog.dom.DIRECT_ATTRIBUTE_MAP_[d], b) : goog.string.startsWith(d, "aria-") || goog.string.startsWith(d, "data-") ? a.setAttribute(d, b) : a[d] = b
    })
};
goog.dom.DIRECT_ATTRIBUTE_MAP_ = {
    cellpadding: "cellPadding",
    cellspacing: "cellSpacing",
    colspan: "colSpan",
    frameborder: "frameBorder",
    height: "height",
    maxlength: "maxLength",
    nonce: "nonce",
    role: "role",
    rowspan: "rowSpan",
    type: "type",
    usemap: "useMap",
    valign: "vAlign",
    width: "width"
};
goog.dom.createDom_ = function (a, b) {
    var c = String(b[0]),
        d = b[1];
    if (!goog.dom.BrowserFeature.CAN_ADD_NAME_OR_TYPE_ATTRIBUTES && d && (d.name || d.type)) {
        c = ["<", c];
        d.name && c.push(' name="', goog.string.htmlEscape(d.name), '"');
        if (d.type) {
            c.push(' type="', goog.string.htmlEscape(d.type), '"');
            var e = {};
            goog.object.extend(e, d);
            delete e.type;
            d = e
        }
        c.push(">");
        c = c.join("")
    }
    c = a.createElement(c);
    d && (goog.isString(d) ? c.className = d : goog.isArray(d) ? c.className = d.join(" ") : goog.dom.setProperties(c, d));
    2 < b.length && goog.dom.append_(a,
        c, b, 2);
    return c
};

// Array Functions - begins
Blockly.Arrays = {};
Blockly.Arrays.NAME_TYPE = "ARRAY";
Blockly.Arrays.allUsedArrays = function (a) {
    var b;
    if (a instanceof Blockly.Block) b = a.getDescendants();
    else if (a.getAllBlocks) b = a.getAllBlocks();
    else throw "Not Block or Workspace: " + a;
    a = Object.create(null);
    for (var c = 0; c < b.length; c++) {
        var d = b[c].getVars();
        if (d)
            for (var e = 0; e < d.length; e++) {
                var f = d[e];
                f && (a[f.toLowerCase()] = f)
            }
    }
    b = [];
    for (var g in a) b.push(a[g]);
    return b
};
Blockly.Arrays.allArrays = function (a) {
    a instanceof Blockly.Block && console.warn("Deprecated call to Blockly.Arrays.allArrays with a block instead of a workspace.  You may want Blockly.Arrays.allUsedArrays ");
    return a.arrayList
};
Blockly.Arrays.flyoutCategory = function (a) {
    a = a.arrayList;
    var b = [];

    var c = goog.dom.createDom("button");
    c.setAttribute("text", Blockly.Msg.NEW_ARRAY);
    b.push(c);

    c = goog.dom.createDom("button");
    c.setAttribute("text", Blockly.Msg.MODIFY_ARRAY);
    b.push(c);

    c = goog.dom.createDom("block");
    c.setAttribute("type", "array_node");
    b.push(c);

    c = goog.dom.createDom("block");
    c.setAttribute("type", "access_elements");
    b.push(c);

    return b
};
Blockly.Arrays.generateUniqueName = function (a, b) {
    a = a.arrayList;
    var b = "";
    if (a.length)
        for (var c = 1, d = 0, e = "ijkmnopqrstuvwxyzabcdefgh".charAt(d); !b;) {
            for (var f = !1, g = 0; g < a.length; g++)
                if (a[g].toLowerCase() == e) {
                    f = !0;
                    break
                }
            f ? (d++, 25 == d && (d = 0, c++), e = "ijkmnopqrstuvwxyzabcdefgh".charAt(d), 1 < c && (e += c)) : b = e
        } else b = "i";
    return b
};
Blockly.Arrays.createArray = function (a, type) {
    var callbackcall = function (b, value, arraysize) {
        if (b) {
            b = b.replace(/ /g, '_');
            if (-1 != a.arrayIndexOf(b)) {
                window.alert(Blockly.Msg.ARRAY_ALREADY_EXISTS.replace("%1", b.toLowerCase()));
            }
            else {
                Blockly.Workspace.prototype.createArray(b, value, arraysize);
                Blockly.Blocks.ArraySize = arraysize;
                toCode('ESP32');
            }
        }
        else {
            b = null;
        }
        return b
    };
    if (type == Blockly.Msg.MODIFY_ARRAY) {
        Code.createmodifyArrayPopup(Blockly.Workspace.prototype.arrayList, Blockly.Workspace.prototype.arrayValueList, Blockly.Workspace.prototype.arraydrpwnvalues)
    }
    else {
        Code.createArrayPopup(callbackcall)
    }
};
Blockly.Arrays.promptName = function (a, b, callbackArrayReName) {
    console.log('Blockly.Arrays.promptName');
    // var c = prompt(a, b);
    Code.createRenameArrayPopup(a, b, function (prev_name, c) {
        c && (c = c.replace(/[\s\xa0]+/g, " ").replace(/^ | $/g, ""), c == Blockly.Msg.RENAME_ARRAY || c == Blockly.Msg.NEW_ARRAY) && (c = null);
        // callbackArrayReName(prev_name, c);
        Blockly.Workspace.prototype.renameArray(prev_name, c);
    });
};
Blockly.Arrays.promptValue = function (a, b, callbackArrayValueChange) {
    var index = Code.workspace.arrayIndexOf(b);
    if (index !== -1) {
        b = Code.workspace.arrayValueList[index];
        // var c = prompt(a, b);
        var call = function (c) {
            c && (c = c.replace(/[\s\xa0]+/g, " ").replace(/^ | $/g, ""),
            c == Blockly.Msg.RENAME_ARRAY || c == Blockly.Msg.NEW_ARRAY) && (c = null);
            callbackArrayValueChange(c);
        };
        Code.createchangeInitialArrayPopup(a, b, call);
    }
};
// Array Functions - ends

Blockly.Workspace.prototype.arrayIndexOf = function (a) {
    if(this.arrayList) {
        for (var b = 0, c; c = this.arrayList[b]; b++)
            if (Blockly.Names.equals(c, a)) return b;
    }
    
    return -1
};
Blockly.Workspace.prototype.fireChangeListener = function (a) {
    a.recordUndo && (this.undoStack_.push(a), this.redoStack_.length = 0, this.undoStack_.length > this.MAX_UNDO && this.undoStack_.unshift());
    for (var b = 0, c; c = this.listeners_[b]; b++) c(a)
};

Blockly.Events.fire = function (a) {
    Blockly.Events.isEnabled() && (Blockly.Events.FIRE_QUEUE_.length || setTimeout(Blockly.Events.fireNow_, 0), Blockly.Events.FIRE_QUEUE_.push(a))
};
Blockly.Events.fireNow_ = function () {
    for (var a = Blockly.Events.filter(Blockly.Events.FIRE_QUEUE_, !0), b = Blockly.Events.FIRE_QUEUE_.length = 0, c; c = a[b]; b++) {
        var d = Blockly.Workspace.getById(c.workspaceId);
        d && d.fireChangeListener(c);
    }
};

// FieldArray Functions - begins
Blockly.FieldArray = function (a, b) {
    Blockly.FieldArray.superClass_.constructor.call(this, Blockly.FieldArray.dropdownCreate, b);
    this.setValue(a || "")
};
goog.inherits(Blockly.FieldArray, Blockly.FieldDropdown);
Blockly.FieldArray.prototype.init = function () {
    this.fieldGroup_ || (Blockly.FieldArray.superClass_.init.call(this), this.getValue() || this.setValue(Blockly.Arrays.generateUniqueName(this.sourceBlock_.isInFlyout ? this.sourceBlock_.workspace.targetWorkspace : this.sourceBlock_.workspace)), this.sourceBlock_.isInFlyout || Blockly.Workspace.prototype.createArray(this.getValue()))
};
/* Blockly.FieldArray.prototype.getValue = function () {
    return this.text_;
}; */
Blockly.FieldArray.prototype.setValue = function (a) {
    this.sourceBlock_ && Blockly.Events.isEnabled() && Blockly.Events.fire(new Blockly.Events.Change(this.sourceBlock_, "field", this.name, this.value_, a));
    this.value_ = a;
    this.text_ = a; //this.setText(a)
};
Blockly.FieldArray.dropdownCreate = function () {
    var str = this.sourceBlock_;
    var a = this.sourceBlock_ && this.sourceBlock_.workspace ? Blockly.Workspace.prototype.arrayList.slice(0) : [],
        b = this.text_; //this.getText();
    b && -1 == a.indexOf(b) && a.push(b);
    a.sort(goog.string.caseInsensitiveCompare);
    a.push(Blockly.Msg.RENAME_ARRAY);
    a.push(Blockly.Msg.CHANGE_ARRAY_INITIAL_VALUE);
    a.push(Blockly.Msg.DELETE_Array.replace("%1", b));
    for (var b = [], c = 0; c < a.length; c++) b[c] = [a[c], a[c]];
    return b
};
Blockly.arrayDeleteFunction = function (arrayName) {
    return Blockly.Workspace.prototype.deleteArray(arrayName), null;
};
// FieldArray Functions - ends

// Variable Functions - begins
// Blockly.Variables.NAME_TYPE = "VARIABLE";
Blockly.Variables.allUsedVariables = function (a) {
    var b;
    if (a instanceof Blockly.Block) b = a.getDescendants();
    else if (a.getAllBlocks) b = a.getAllBlocks();
    else throw "Not Block or Workspace: " + a;
    a = Object.create(null);
    for (var c = 0; c < b.length; c++) {
        var d = b[c].getVars();
        if (d)
            for (var e = 0; e < d.length; e++) {
                var f = d[e];
                f && (a[f.toLowerCase()] = f)
            }
    }
    b = [];
    for (var g in a) b.push(a[g]);
    return b
};
Blockly.Variables.allVariables = function (a) {
    a instanceof Blockly.Block && console.warn("Deprecated call to Blockly.Variables.allVariables with a block instead of a workspace.  You may want Blockly.Variables.allUsedVariables");
    return a.variableList
};
Blockly.Variables.flyoutCategory = function (a) {
    a = a.variableList;
    var b = [];

    var c = goog.dom.createDom("button", "var_create");
    c.setAttribute("text", Blockly.Msg.NEW_VARIABLE);
    b.push(c);

    c = goog.dom.createDom("button");
    c.setAttribute("text", Blockly.Msg.MODIFY_VARIABLE);
    b.push(c);

    c = goog.dom.createDom("block");
    c.setAttribute("type", "assign_variable");
    b.push(c);

    c = goog.dom.createDom("block");
    c.setAttribute("type", "math_number");
    b.push(c);

    c = goog.dom.createDom("block");
    c.setAttribute("type", "variables_get");
    b.push(c);

    c = goog.dom.createDom("block");
    c.setAttribute("type", "math_arithmetic");
    b.push(c);

    c = goog.dom.createDom("block");
    c.setAttribute("type", "inputreading");
    b.push(c);

    c = goog.dom.createDom("block");
    c.setAttribute("type", "inputreading_bl");
    b.push(c);

    c = goog.dom.createDom("block");
    c.setAttribute("type", "increment");
    b.push(c);

    c = goog.dom.createDom("block");
    c.setAttribute("type", "decrement");
    b.push(c);

    c = goog.dom.createDom("block");
    c.setAttribute("type", "Constrain");
    b.push(c);

    c = goog.dom.createDom("block");
    c.setAttribute("type", "Map_");
    b.push(c);

    return b;
};
Blockly.Variables.generateUniqueName = function (a) {
    a = a.variableList;
    var b = "";
    if (a.length)
        for (var c = 1, d = 0, e = "ijkmnopqrstuvwxyzabcdefgh".charAt(d); !b;) {
            for (var f = !1, g = 0; g < a.length; g++)
                if (a[g].toLowerCase() == e) {
                    f = !0;
                    break
                }
            f ? (d++, 25 == d && (d = 0, c++), e = "ijkmnopqrstuvwxyzabcdefgh".charAt(d), 1 < c && (e += c)) : b = e
        } else b = "i";
    return b
};
Blockly.Variables.createVariable = function (a, type) {
    var callback = function (b, value) {
        if (b) {
            b = b.replace(/ /g, '_');
            if (-1 != a.variableIndexOf(b)) {
                window.alert(Blockly.Msg.VARIABLE_ALREADY_EXISTS.replace("%1", b.toLowerCase()));
            }
            else {
                let custVar = a.createVariable(b, 'int_c');
                Blockly.Workspace.prototype.createVariable(b, value);
                toCode('ESP32'); 
            }
        }
        else {
            b = null;
        }
        return b
    };
    if (type == Blockly.Msg.MODIFY_VARIABLE) {
        Code.listVariablePopup("node");
    }
    else {
        Code.createVariablePopup(callback)
    }
};
Blockly.Variables.promptName = function (a, b, callbackVarReName) {
    console.log('Blockly.Variables.promptName');
    b = a.split("'") && a.split("'").length > 1 && a.split("'")[1];
    //a=title //b=var name
    Code.createRenameVariablePopup(a, b, function (prev_name, c) {
        c && (c = c.replace(/[\s\xa0]+/g, " ").replace(/^ | $/g, ""), c == Blockly.Msg.RENAME_VARIABLE || c == Blockly.Msg.NEW_VARIABLE) && (c = null);
        Blockly.Workspace.prototype.renameVariable(prev_name, c);
        // callbackVarReName(prev_name, c);
    });
};
Blockly.Variables.promptValue = function (a, b, callback) {
    var index = Code.workspace.variableIndexOf(b);
    if (index !== -1) {
        b = Code.workspace.variableValueList[index];
        var call = function (c) {
            c && (c = c.replace(/[\s\xa0]+/g, " ").replace(/^ | $/g, ""), c == Blockly.Msg.RENAME_VARIABLE || c == Blockly.Msg.NEW_VARIABLE) && (c = null);
            callback(c);
        };
        Code.createchangeInitialVariablePopup(a, b, call);
    }
};
Blockly.variableDeleteFunction = function (arrayName) {
    return Blockly.Workspace.prototype.deleteVariable(arrayName), null
};
// Variable Functions - ends

// Text Functions - begins
Blockly.Text = {};
Blockly.Text.NAME_TYPE = "TEXTS";
Blockly.Text.allUsedText = function (a) {
    var b;
    if (a instanceof Blockly.Block) b = a.getDescendants();
    else if (a.getAllBlocks) b = a.getAllBlocks();
    else throw "Not Block or Workspace: " + a;
    a = Object.create(null);
    for (var c = 0; c < b.length; c++) {
        var d = b[c].getVars();
        if (d)
            for (var e = 0; e < d.length; e++) {
                var f = d[e];
                f && (a[f.toLowerCase()] = f)
            }
    }
    b = [];
    for (var g in a) b.push(a[g]);
    return b
};
Blockly.Text.allText = function (a) {
    a instanceof Blockly.Block && console.warn("Deprecated call to Blockly.Text.allText with a block instead of a workspace.  You may want Blockly.Text.allUsedText ");
    return a.textList
};
Blockly.Text.flyoutCategory = function (a) {
    a = a.textList;

    var b = [],
        c = goog.dom.createDom("button");
    c.setAttribute("text", Blockly.Msg.NEW_TEXT);
    b.push(c);

    c = goog.dom.createDom("button");
    c.setAttribute("text", Blockly.Msg.MODIFY_TEXT);
    b.push(c);

    c = goog.dom.createDom("block");
    c.setAttribute("type", "assign_text");
    b.push(c);

    c = goog.dom.createDom("block");
    c.setAttribute("type", "text_input");
    b.push(c);

    c = goog.dom.createDom("block");
    c.setAttribute("type", "text_variable");
    b.push(c);

    c = goog.dom.createDom("block");
    c.setAttribute("type", "append_text");
    b.push(c);

    c = goog.dom.createDom("block");
    c.setAttribute("type", "substring_text");
    b.push(c);

    c = goog.dom.createDom("block");
    c.setAttribute("type", "length_of");
    b.push(c);

    c = goog.dom.createDom("block");
    c.setAttribute("type", "text_indexOfItem");
    b.push(c);

    c = goog.dom.createDom("block");
    c.setAttribute("type", "text_to_variable");
    b.push(c);

    c = goog.dom.createDom("block");
    c.setAttribute("type", "variable_to_text");
    b.push(c);

    return b;
};
Blockly.Text.createText = function (a, type) {
    var callbackcall = function (b, value) {
        if (b) {
            b = b.replace(/ /g, '_');
            if (-1 != Blockly.Workspace.prototype.textIndexOf(b)) {
                window.alert(Blockly.Msg.TEXT_ALREADY_EXISTS.replace("%1", b.toLowerCase()));
            }
            else {
                Blockly.Workspace.prototype.createText(b, value);
                toCode('ESP32'); 
            }
        }
        else {
            b = null;
        }
        return b
    };
    if (type == Blockly.Msg.MODIFY_TEXT) {
        Code.listTextPopup()
    }
    else {
        Code.createtextPopup(callbackcall);
    }
};
Blockly.textDeleteFunction = function (textName) {
    return Blockly.Workspace.prototype.deleteText(textName), null;
};
// Text Functions - ends

Blockly.BlockSvg.TAB_WIDTH = 8;
Blockly.FlyoutButton.MARGIN = 5;
Blockly.FlyoutButton.prototype.width = 0;
Blockly.FlyoutButton.prototype.height = 0;
Blockly.FlyoutButton.prototype.createDom = function () {
    this.svgGroup_ = Blockly.createSvgElement("g", {
        "class": this.text_ === Blockly.Msg.enable ? "multiFlyoutButton" : "blocklyFlyoutButton"
    }, this.workspace_.getCanvas());
    var a = Blockly.createSvgElement("rect", {
            "class": this.text_ === "Enable" ? "multiFlyoutButtonShadow" : "blocklyFlyoutButtonShadow",
            rx: 4,
            ry: 4,
            x: 1,
            y: 1
        }, this.svgGroup_),
        b = Blockly.createSvgElement("rect", {
            "class": this.text_ === "Enable" ? "multiFlyoutButtonBackground" : "blocklyFlyoutButtonBackground",
            rx: 4,
            ry: 4
        }, this.svgGroup_),
        c = Blockly.createSvgElement("text", {
            "class": "blocklyText",
            x: 0,
            y: 0,
            "text-anchor": "middle"
        }, this.svgGroup_);
    c.textContent = this.text_;
    this.width =
        c.getComputedTextLength() + 2 * Blockly.FlyoutButton.MARGIN;
    this.height = 20;
    a.setAttribute("width", this.width);
    a.setAttribute("height", this.height);
    b.setAttribute("width", this.width);
    b.setAttribute("height", this.height);
    c.setAttribute("x", this.width / 2);
    c.setAttribute("y", this.height - Blockly.FlyoutButton.MARGIN);
    this.updateTransform_();
    return this.svgGroup_
};
Blockly.FlyoutButton.prototype.updateTransform_ = function () {
    this.svgGroup_.setAttribute("transform", "translate(" + 16 + "," + this.position_.y + ")")
};
Blockly.Flyout.terminateDrag_ = function () {
    Blockly.Flyout.startFlyout_ && (Blockly.Flyout.startFlyout_.dragMode_ == Blockly.DRAG_FREE && Blockly.Touch.clearTouchIdentifier(), Blockly.Flyout.startFlyout_.dragMode_ = Blockly.DRAG_NONE, Blockly.Flyout.startFlyout_ = null);
    Blockly.Flyout.onMouseUpWrapper_ && (Blockly.unbindEvent_(Blockly.Flyout.onMouseUpWrapper_), Blockly.Flyout.onMouseUpWrapper_ = null);
    Blockly.Flyout.onMouseMoveBlockWrapper_ && (Blockly.unbindEvent_(Blockly.Flyout.onMouseMoveBlockWrapper_), Blockly.Flyout.onMouseMoveBlockWrapper_ =
        null);
    Blockly.Flyout.onMouseMoveWrapper_ && (Blockly.unbindEvent_(Blockly.Flyout.onMouseMoveWrapper_), Blockly.Flyout.onMouseMoveWrapper_ = null);
    Blockly.Flyout.startDownEvent_ = null;
    Blockly.Flyout.startBlock_ = null
};
Blockly.FlyoutButton.prototype.onMouseUp = function (a) {
    a.preventDefault();
    a.stopPropagation();
    Blockly.Flyout.terminateDrag_();
    if (this.text_ == Blockly.Msg.MODIFY_ARRAY || this.text_ == Blockly.Msg.NEW_ARRAY) {
        Blockly.Arrays.createArray(this.targetWorkspace_, this.text_)
    }
    else if (this.text_ == Blockly.Msg.MODIFY_TEXT || this.text_ == Blockly.Msg.NEW_TEXT) {
        Blockly.Text.createText(this.targetWorkspace_, this.text_)
    }
    else if (this.text_ == Blockly.Msg.MODIFY_VARIABLE || this.text_ == Blockly.Msg.NEW_VARIABLE) {
        Blockly.Variables.createVariable(this.targetWorkspace_, this.text_)
    }
    else if (this.text_ == Blockly.Msg.enable || this.text_ == Blockly.Msg.disable) {
        if (!Blockly.isMobile) {
            Code.multitaskToggle(this.text_ === Blockly.Msg.enable);
        }
    }
    else if (this.text_ === Blockly.Msg.mqtt_dashboard) {
        if (!Blockly.isMobile) {
            Code.mqttDashboard();
        }
    }
};
//=====================================================
//Blockly.Flyout.prototype.show = function (a) {
//    this.workspace_.setResizesEnabled(!1);
//    this.hide();
//    this.clearOldBlocks_();
//    let strCategory = '';

//    setTimeout(() => {
//        strCategory = this.workspace_.targetWorkspace.toolbox_.lastCategory_.styleName;

//        if (strCategory == Blockly.Variables.NAME_TYPE) {
//            a = Blockly.Variables.flyoutCategory(this.workspace_.targetWorkspace)
//        }
//        else if (strCategory == Blockly.Text.NAME_TYPE) {
//            a = Blockly.Text.flyoutCategory(this.workspace_.targetWorkspace)
//        }
//        else if (strCategory == Blockly.Arrays.NAME_TYPE) {
//            a = Blockly.Arrays.flyoutCategory(this.workspace_.targetWorkspace)
//        }
//    
//        this.setVisible(!0);
//        a = Blockly.utils.toolbox.convertToolboxToJSON(a);
//        a = this.createFlyoutInfo_(a);
//        this.layout_(a.contents, a.gaps);
//    
//        this.listeners_.push(Blockly.bindEventWithChecks_(this.svgBackground_,
//            "mouseover", this,
//            function () {
//                for (var a = this.workspace_.getTopBlocks(!1), b = 0, c; c = a[b]; b++) c.removeSelect()
//            }));
//        this.horizontalLayout ? (this.height_ = 0) : (this.width_ = 0);
//        this.workspace_.setResizesEnabled(!0);
//        this.reflow();
//        this.filterForCapacity_();
//        this.position();
//        this.reflowWrapper_ = this.reflow.bind(this);
//        this.workspace_.addChangeListener(this.reflowWrapper_);
//    }, 0);
//};
//==============================================================
Blockly.Flyout.prototype.addBlockListeners_ = function (a, b, c) {
    this.listeners_.push(Blockly.bindEventWithChecks_(a, "mousedown", null, this.blockMouseDown_(b)));
    this.listeners_.push(Blockly.bindEventWithChecks_(c, "mousedown", null, this.blockMouseDown_(b)));
    this.listeners_.push(Blockly.bindEvent_(a, "mouseover", b, b.addSelect));
    this.listeners_.push(Blockly.bindEvent_(a, "mouseout", b, b.removeSelect));
    this.listeners_.push(Blockly.bindEvent_(c, "mouseover", b, b.addSelect));
    this.listeners_.push(Blockly.bindEvent_(c,
        "mouseout", b, b.removeSelect))
};
Blockly.Touch.isMouseOrTouchEvent = function (a) {
    return goog.string.startsWith(a.type, "touch") || goog.string.startsWith(a.type, "mouse")
};
Blockly.Touch.checkTouchIdentifier = function (a) {
    var b = a.changedTouches && a.changedTouches[0] && void 0 != a.changedTouches[0].identifier && null != a.changedTouches[0].identifier ? a.changedTouches[0].identifier : "mouse";
    return void 0 != Blockly.Touch.touchIdentifier_ && null != Blockly.Touch.touchIdentifier_ ? Blockly.Touch.touchIdentifier_ == b : "mousedown" == a.type || "touchstart" == a.type ? (Blockly.Touch.touchIdentifier_ = b, !0) : !1
};
Blockly.Touch.shouldHandleEvent = function (a) {
    return !Blockly.Touch.isMouseOrTouchEvent(a) || Blockly.Touch.checkTouchIdentifier(a)
};
Blockly.Touch.setClientFromTouch = function (a) {
    if (goog.string.startsWith(a.type, "touch")) {
        var b = a.changedTouches[0];
        a.clientX = b.clientX;
        a.clientY = b.clientY
    }
};
Blockly.bindEventWithChecks_ = function (a, b, c, d, e) {
    var f = !1,
        g = function (a) {
            var b = !e;
            a = Blockly.Touch.splitEventByTouches(a);
            for (var g = 0, h; h = a[g]; g++) {
                if (!b || Blockly.Touch.shouldHandleEvent(h)) Blockly.Touch.setClientFromTouch(h), c ? d.call(c, h) : d(h), f = !0
            }
        };
    a.addEventListener(b, g, !1);
    var h = [
        [a, b, g]
    ];
    if (b in Blockly.Touch.TOUCH_MAP)
        for (var k = function (a) {
            g(a);
            f && a.preventDefault()
        }, m = 0, p; p = Blockly.Touch.TOUCH_MAP[b][m]; m++) a.addEventListener(p, k, !1), h.push([a, p, k]);
    return h
};
Blockly.HorizontalFlyout.prototype.backgroundButtons_ = [];
Blockly.VerticalFlyout.prototype.backgroundButtons_ = [];
// Blockly.Flyout.prototype.layout_ = function (a, b) {
Blockly.HorizontalFlyout.prototype.layout_ = Blockly.VerticalFlyout.prototype.layout_ = function (a, b) {
    // this.workspace_.scale = this.targetWorkspace_.scale; //zoom the toolbox while zooming the workspace
    var c = this.MARGIN,
        d = this.RTL ? c : c + Blockly.BlockSvg.TAB_WIDTH;
    this.horizontalLayout_ && this.RTL && (a = a.reverse());
    for (var e = 0, f; f = a[e]; e++) {
        if ("block" == f.type) {
            f = f.block;
            for (var g = f.getDescendants(), h = 0, k; k = g[h]; h++) k.isInFlyout = !0;
            f.render();
            g = f.getSvgRoot();
            h = f.getHeightWidth();
            k = f.outputConnection ? Blockly.BlockSvg.TAB_WIDTH : 0;
            this.horizontalLayout_ && (d += k);
            f.moveBy(this.horizontalLayout_ && this.RTL ? d + h.width -
                k : d, c);
            this.horizontalLayout_ ? d += h.width + b[e] - k : c += h.height + b[e];
            h = Blockly.createSvgElement("rect", {
                "fill-opacity": 0
            }, null);
            h.tooltip = f;
            Blockly.Tooltip.bindMouseEvents(h);
            this.workspace_.getCanvas().insertBefore(h, f.getSvgRoot());
            f.flyoutRect_ = h;
            this.backgroundButtons_[e] = h;
            this.addBlockListeners_(g, f, h)
        } else "button" == f.type && (f = f.button,
            g = f.createDom(),
            f.moveTo(d, c),
            f.show(), Blockly.bindEventWithChecks_(g, "mouseup", f, f.onMouseUp),
            this.buttons_.push(f), this.horizontalLayout_ ? d += f.width + b[e] : c += f.height +
                b[e])
    }
};
Blockly.createSvgElement = function (a, b, c, d) {
    a = document.createElementNS(Blockly.SVG_NS, a);
    for (var e in b) a.setAttribute(e, b[e]);
    document.body.runtimeStyle && (a.runtimeStyle = a.currentStyle = a.style);
    c && c.appendChild(a);
    return a
};

Blockly.Themes.Classic.categoryStyles = {
    colour_category: { colour: "20" },
    list_category: { colour: "260" },
    logic_category: { colour: "210" },
    loop_category: { colour: "120" },
    math_category: { colour: "230" },
    procedure_category: { colour: "290" },
    TEXTS: { colour: "160" },
    variable_category: { colour: "330" },
    variable_dynamic_category: { colour: "310" },

    input_category: { colour: "310" },
    output_category: { colour: "310" },
    flow_category: { colour: "310" },
    VARIABLE: { colour: "310" },
    ARRAY: { colour: "310" },
    advanced_category: { colour: "310" },
};

// Code to support for Variable Nodes - ends