var Code = Code || {};
Code.SavedNodeObjects = {};
Code.PREV_EBOT_CODE_ = '//Main libraries\n#include "ESP_Blockly.h"\n\nvoid setup()\n{\n\t//Initialisations\n\tebot_setup();\n\n\t//Pin Modes\n}\n\nvoid loop()\n{\n\n}';

Code.multiColorTheme = function () {
    Code.multiColor = {
        input: "#61a55b",
        output: "#D64374",
        flow: "#d67d05",
        logic: "#16a085",
        variable: "#00acee",
        text: "#5ba58c",
        array: "#995ba5",
        advanced: "#8e44ad",
        multimedia: "#f44336",
        mouse: "#FF69B4",
        keyboard: "#FF69B4",
        time: "#7CC576",
        mqtt: "#16a085",
        mynode: "#0072FF",
        multitask: "#808080",
        bluetooth: "#006EC0",
        download_header: "#00acee",
        nav_header: "#515459",
        tree_root: "#32373a",
        flyout: "#808080",
        header: "#515459"
    };
    if (Blockly.Blocks.isMultitask) {
        // var ratio = 0.2;
        // Code.darkenColor(Code.multiColor, ratio);
        Code.multiColor.header = "#00acee";
    }
};
Code.multiColorTheme();
Code.mmoveType = ['if(isSerStrEqls(&Serial, "MMI||', 'Serial.print("MMO||', 'if(isSerStrEqls("MMI||', 'Serial.println(m0)'];

Code.codeWidgetHtml = function (content) {
    return "<div style='border: solid #fc3 ;width: 280px; height: 206px' id='content_CustomNode'>" +
        "    <textarea name='message' rows='10' cols='35' class='codemirror-textarea' id='myInput'>" + content + "</textarea>" +
        "</div>"
};

Code.containsAny = function (str, substrings) {
    for (var i = 0; i != substrings.length; i++) {
        var substring = substrings[i];
        if (str.indexOf(substring) != -1) {
            return true;
        }
    }
    return false;
};

// Generated code from the Blockly workspace.
Code.generateCpp = function () {
    var cppcode = Blockly.ESP32.workspaceToCode(Code.workspace);
    try {
        Code.containMouseMove = Code.containsAny(cppcode, Code.mmoveType);
        if (Code.containMouseMove) {
            Code.generateMouseUI();
            if (Code.win != null) {
                if (!Code.win.isVisible()) {
                    Code.win.setPosition(screen.width - 304, screen.availHeight - 104, []);
                    Code.win.showInactive();
                }
            }
        } else {
            if (Code.win != null) {
                Code.win.hide();
            }
        }
        // Code.tab_json[Code.current_key].xmldata = Code.generateXml();
    } catch (err) {
        console.log(err, "Code.generateCpp")
    }

    return cppcode;
};

// Generated XML and code from the Blockly workspace
Code.generateXml = function () {
    var ESP32XmlCppObj;
    var xmlText;
    var xmlDom;
    var xmlCppText = "";
    var count = Code.workspace.getAllBlocks().length;
    var cpp = Code.getEditedCpp();
    if (count > 1 || cpp !== Code.PREV_EBOT_CODE_) {
        if (Blockly.Blocks.ConnectedBoard == "FFC_ESP32") {
            if (cpp !== Code.Defualt_ESP328_Pro_) {
                xmlDom = Blockly.Xml.workspaceToDom(Code.workspace);
                xmlText = Blockly.Xml.domToPrettyText(xmlDom);
                ESP32XmlCppObj = {
                    xml: xmlText,
                    cpp: cpp,
                    vars: Code.workspace.variableList,
                    varsValues: Code.workspace.variableValueList,
                    arrays: Code.workspace.arrayList,
                    arraysValues: Code.workspace.arrayValueList,
                    arraysDropValues: Code.workspace.arraydrpwnvalues,
                    texts:Code.workspace.textList,
                    textsValues:Code.workspace.textValueList
                };
                xmlCppText = JSON.stringify(ESP32XmlCppObj);
            }
        }
    }
    return xmlCppText;
};

// Load xml text into blocks
Code.replaceBlocksfromXml = function (blocksXml, isExample) {
    $('.loading-div').show();
    var loadTimeout = 500;
    var xmlDom = null;
    var EspXmlCppObj = {};
    try {
        if (Code.isJson(blocksXml)) {
            EspXmlCppObj = JSON.parse(blocksXml);
            var objKeys = Object.keys(EspXmlCppObj);
            if (objKeys.length > 0) {
                if ('xml' in EspXmlCppObj) {
                    blocksXml = EspXmlCppObj.xml;
                }
            }
        }
        xmlDom = Blockly.Xml.textToDom(blocksXml);
    } catch (err) {
        Code.writeLog(err, "Code.replaceBlocksfromXml");
        return false;
    }
    Code.workspace.clear();
    var sucess = false;
    if (xmlDom) {
        var blocksCount = xmlDom.getElementsByTagName('block').length;
        if(blocksXml.indexOf('block type="multitask"') !== -1){
            Code.multitaskToggle(true, true);
        }
        sucess = Code.loadBlocksfromXmlDom(xmlDom);
        if ('vars' in EspXmlCppObj) {
            Code.workspace.variableList = EspXmlCppObj.vars;
        }
        if ('varsValues' in EspXmlCppObj) {
            Code.workspace.variableValueList = EspXmlCppObj.varsValues;
        }
        if ('arrays' in EspXmlCppObj) {
            Code.workspace.arrayList = EspXmlCppObj.arrays;
        }
        if ('arraysValues' in EspXmlCppObj) {
            Code.workspace.arrayValueList = EspXmlCppObj.arraysValues;
        }
        if ('arraysDropValues' in EspXmlCppObj) {
            Code.workspace.arraydrpwnvalues = EspXmlCppObj.arraysDropValues;
        }
        if ('texts' in EspXmlCppObj) {
            Code.workspace.arraydrpwnvalues = EspXmlCppObj.texts;
        }
        if ('textsValues' in EspXmlCppObj) {
            Code.workspace.arraydrpwnvalues = EspXmlCppObj.textsValues;
        }
        if (isExample) {
            EspXmlCppObj.cpp = Code.generateCpp();
        }
        if ('cpp' in EspXmlCppObj) {
            if (blocksCount > 100) {
                loadTimeout = loadTimeout * blocksCount / 75;
            }
            setTimeout(function () {
                Code.replaceCppCodeFromEditor(EspXmlCppObj.cpp, true);
                $('.loading-div').hide();
            }, loadTimeout);
        }
    }
    setTimeout(function () {
        $('.loading-div').hide();
    }, loadTimeout);
    return sucess;
};

Code.touchWidgetHtml = function () {
    //window.alert("gggggg");
    return "<table>" +
        "    <tr>" +
        "        <td class='space'></td>" +
        "        <td rowspan='6'>" +
        "            <table>" +
        "                <tr>" +
        "                    <td></td>" +
        "                    <td>" +
        "                        <div name='1' class='button_round'>" +
        "                            <h2>&#8743;</h2>" +
        "                        </div>" +
        "                    </td>" +
        "                    <td></td>" +
        "                </tr>" +
        "                <tr>" +
        "                    <td>" +
        "                        <div name='0' class='button_round'>" +
        "                            <h2>&#60;</h2>" +
        "                        </div>" +
        "                    </td>" +
        "                    <td></td>" +
        "                    <td>" +
        "                        <div name='3' class='button_round'>" +
        "                            <h2>&#62;</h2>" +
        "                        </div>" +
        "                    </td>" +
        "                </tr>" +
        "                <tr>" +
        "                    <td></td>" +
        "                    <td>" +
        "                        <div name='2' class='button_round'>" +
        "                            <h2>&#8744;</h2>" +
        "                        </div>" +
        "                    </td>" +
        "                    <td></td>" +
        "                </tr>" +
        "            </table>" +
        "        </td>" +
        "        <td class='space'></td>" +
        "        <td rowspan='6'>" +
        "            <div><img name='7' class='top' src='images/top.png'/></div>" +
        "            <div><img name='6' src='images/top2.png'/></div>" +
        "            <div><img name='8' src='images/top2.png'/></div>" +
        "            <div><img name='9' src='images/top2.png'/></div>" +
        "            <div><img name='5' src='images/top2.png'/></div>" +
        "            <div><img name='4' class='bottom' src='images/bottom.png'/></div>" +
        "        </td>" +
        "        <td class='space'></td>" +
        "    </tr>" +
        "</table>";
};

// Render the code for added blocks
Code.renderContent = function (isPrev) {
    var content = document.getElementById('content_' + Code.selected);
    var allBlocks = Code.workspace.getAllBlocks();
    var index = -1;
    for (var i = 0; i < allBlocks.length; i++) {
        if (allBlocks[i].type === "esp32start") {
            index = i;
            break;
        }
    }
    
    if (index === -1) {
        var defaultblocks = document.getElementById('defaultBlock');
        Blockly.Xml.domToWorkspace(defaultblocks, Code.workspace);
    }
    else {
    // if (content.id == 'content_blockcode' || content.id == 'content_esp32' || content.id == 'content_blocks' || content.id == 'content_CustomNode') {
        if (Code.blocklyIsDragging()) return;
        var esp32Code = Code.generateCpp();
        Code.replaceCppCodeFromEditor(esp32Code, isPrev);
    }
  };
  
  Code.replaceCppCodeFromEditor = function (esp32Code, isPrev) {
    if (esp32Code !== Code.PREV_ESP32_CODE_ && isPrev) {
        Code.PREV_ESP32_CODE_ = esp32Code;
    }
    // Code.editor.setValue(esp32Code);
  };


  

Blockly.inject.bindDocumentEvents_ = function () {
    /* Blockly.documentEventsBound_ || (Blockly.bindEventWithChecks_(document, "keydown", null, Blockly.onKeyDown_), Blockly.bindEventWithChecks_(document, "touchend", null, Blockly.longStop_), Blockly.bindEventWithChecks_(document, "touchcancel", null, Blockly.longStop_), document.addEventListener("mouseup", Blockly.onMouseUp_, !1), goog.userAgent.IPAD && Blockly.bindEventWithChecks_(window, "orientationchange", document, function () {
        Blockly.svgResize(Blockly.getMainWorkspace())
    }));
    Blockly.documentEventsBound_ = !0 */
};

// StaticTyping Functions - begins
Blockly.StaticTyping = function () {
    this.varTypeDict = Object.create(null);
    this.pendingVarTypeDict = Object.create(null)
};
//=====================================================================
Blockly.StaticTyping.prototype.collectVarsWithTypes = function (a) {
//window.alert("collectVarsWithTypes");
//window.alert(a);
    this.varTypeDict = Object.create(null);
    this.pendingVarTypeDict = Object.create(null);
    a = Blockly.StaticTyping.getAllStatementsOrdered(a);
    for (var b = 0; b < a.length; b++)
        for (var c = Blockly.StaticTyping.getBlockVars(a[b]), d = 0; d < c.length; d++) {
            var e = c[d][0],
                f = c[d][1];
                //window.alert(e);
                //window.alert(f);
            goog.isArray(f) && (this.varTypeDict[f[1]] ? f = this.varTypeDict[f[1]] : (goog.isArray(this.pendingVarTypeDict[f[1]]) ? this.pendingVarTypeDict[f[1]].push(e) : this.pendingVarTypeDict[f[1]] = [e], f =
                    Blockly.Types.UNDEF));
            this.assignTypeToVars(a[b], e, f)
        }
    return this.varTypeDict
};
///=======================================================================================
Blockly.StaticTyping.getAllStatementsOrdered = function (a) {
//window.alert("getAllStatementsOrdered");
    // console.log(a);
    if (!a.getTopBlocks) throw "Not a valid workspace: " + a;
    var b = function (a) {
            var c, d, h, k = [];
            do {
                k.push(a);
                h = a.nextConnection;
                d = a.getConnections_();
                a = null;
                for (var l = 0; l < d.length; l++) d[l].type == Blockly.NEXT_STATEMENT && (c = d[l].targetBlock()) && (d[l] === h ? a = c : k = k.concat(b(c)))
            } while (a);
            return k
        },
        c = [];
    // console.log(a);
    a = a.getTopBlocks(!0);
    for (var d = 0; d < a.length; d++) c = c.concat(b(a[d]));
   // window.alert(c);
    return c
};
//==========================================================================
Blockly.StaticTyping.getBlockVars = function (a) {
//window.alert("getBlockVars");
//window.alert(a);
    var b = [],
        c = a.getVars;
    if (c)
    {
        for (var c = c.call(a), d = 0; d < c.length; d++) {
            var e = c[d],
                f = a.getVarType;
            f ? (f = f.call(a, e), b.push([e, f])) : b.push([e, Blockly.Types.NULL])
        }
        //window.alert("getBlockVars"+b);
        }
    return b
};
//========================================================================
Blockly.StaticTyping.prototype.assignTypeToVars = function (a, b, c) {
//window.alert("assignTypeToVars");
//window.alert(a);
//window.alert(b);
//window.alert(c);
    switch (this.varTypeDict[b]) {
        case void 0:
        case Blockly.Types.UNDEF:
            this.varTypeDict[b] = c;
            if (c != Blockly.Types.UNDEF && void 0 !== this.pendingVarTypeDict[b])
                for (var d = 0; d < this.pendingVarTypeDict[b].length; d++) this.assignTypeToVars(a, this.pendingVarTypeDict[b][d], c);
            break;
        default:
            this.setBlockTypeWarning(a, c, b, this.varTypeDict[b])
    }
};
Blockly.StaticTyping.prototype.setBlockTypeWarning = function (a, b, c) {
    b == Blockly.Types.CHILD_BLOCK_MISSING || this.varTypeDict[c] == Blockly.Types.CHILD_BLOCK_MISSING ? a.setWarningText(null, "varType") : this.varTypeDict[c] !== b && b !== Blockly.Types.UNDEF ? a.setWarningText("The variable " + c + ' has been first assigned to the "' + this.varTypeDict[c].typeName + '" type\nand this block tries to assign the type "' + b.typeName + '"!', "varType") : a.setWarningText(null, "varType")
};
//============================================================================
Blockly.StaticTyping.prototype.setProcedureArgs = function (a) {
//window.alert("setProcedureArgs");
    a = a.getTopBlocks();
    for (var b = 0, c = a.length; b < c; b++) {
        var d = a[b].setArgsType;
        d && d.call(a[b], this.varTypeDict)
    }
};
// StaticTyping Functions - ends


