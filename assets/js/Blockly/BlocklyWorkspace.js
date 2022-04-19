//=======================================================
//this file contains the variables that have all the workspace components (variables, Text, arrays, .....)
//also contains the operations of the variables. text, arrays, .. etc
//also contain the functions that read the blocks in the workspace, when add new block
// all the components in the workspace are stored in one container called component array
//=====================================================================================
// Blockly Workspace - begins
//============================= the variables at the workspace ======================
Blockly.Workspace = function (a) {
    console.log('inside workspace');
    console.log(a);
    this.id = Blockly.utils.genUid();
    Blockly.Workspace.WorkspaceDB_[this.id] = this;
    this.options = a || new Blockly.Options({});
    this.RTL = !!this.options.RTL;
    this.horizontalLayout = !!this.options.horizontalLayout;
    this.toolboxPosition = this.options.toolboxPosition;
    this.topBlocks_ = [];
    this.topComments_ = [];
    this.commentDB_ = Object.create(null);
    this.listeners_ = [];
    this.undoStack_ = [];
    this.redoStack_ = [];
    this.blockDB_ = Object.create(null);
    this.typedBlocksDB_ = Object.create(null);
    this.variableMap_ = new Blockly.VariableMap(this);
    this.potentialVariableMap_ = null;

    // this.id = Blockly.genUid();
    // Blockly.Workspace.WorkspaceDB_[this.id] = this;
    // this.options = a || {};
    // this.RTL = !!this.options.RTL;
    // this.horizontalLayout = !!this.options.horizontalLayout;
    // this.toolboxPosition = this.options.toolboxPosition;
    // this.topBlocks_ = [];
    // this.listeners_ = [];
    // this.undoStack_ = [];
    // this.redoStack_ = [];
    // this.blockDB_ = Object.create(null);
    this.variableList = [];
    this.variableValueList = [];
    this.arrayList = [];
    this.arrayValueList = [];
    this.arraydrpwnvalues = [];
    this.textList = [];
    this.textValueList = [];
    this.textDrpdwnValues = [];
};
//===============================variavles definition==========================================
Blockly.Workspace.prototype.getAllVariables = [];
Blockly.Workspace.prototype.topBlocks_ = [];
Blockly.Workspace.prototype.variableList = [];
Blockly.Workspace.prototype.variableValueList = [];
Blockly.Workspace.prototype.arrayList = [];
Blockly.Workspace.prototype.arrayValueList = [];
Blockly.Workspace.prototype.arraydrpwnvalues = [];
Blockly.Workspace.prototype.textList = [];
Blockly.Workspace.prototype.textValueList = [];
Blockly.Workspace.prototype.rendered = !1;
Blockly.Workspace.prototype.MAX_UNDO = 1024;
//==============================to read everything at the workspace============================================================
Blockly.Workspace.getAll = function () {
    var a = [],
      b;
    for (b in Blockly.Workspace.WorkspaceDB_)
        a.push(Blockly.Workspace.WorkspaceDB_[b]);
    return a;
};
//==============================when close the workspace=============================================
Blockly.Workspace.prototype.dispose = function () {
    this.listeners_.length = 0;
    this.clear();
    delete Blockly.Workspace.WorkspaceDB_[this.id]
};
Blockly.Workspace.SCAN_ANGLE = 3;
//=======================================when adding Variables, Arrays, Text==============================
Blockly.Workspace.prototype.addTopBlock = function (a) {
    //window.alert("add top block");
    console.log(a);
    this.topBlocks_.push(a);
    if (this.isFlyout) {
        a = Blockly.Variables.allUsedVariables(a);
        for (var b = 0; b < a.length; b++)-1 == this.variableList.indexOf(a[b]) && this.variableList.push(a[b])
        for (var b = 0; b < a.length; b++)-1 == this.arrayList.indexOf(a[b]) && this.arrayList.push(a[b])
        for (var b = 0; b < a.length; b++)-1 == this.textList.indexOf(a[b]) && this.textList.push(a[b])
    }
};
///===============================remove the top block at the workspace from components array============================================
Blockly.Workspace.prototype.removeTopBlock = function (a) {
    //window.alert("remove top block");
    if (!goog.array.remove(this.topBlocks_, a)) throw "Block not present in workspace's list of top-most blocks.";
};
//============================get the block regarding the screen X, Y (SVG)==================================================
Blockly.WorkspaceSvg.prototype.getTopBlocks = function (a) {
    //window.alert("get top block svg");
    var b = [].concat(this.topBlocks_);
    if (a && 1 < b.length) {
        var c = Math.sin(goog.math.toRadians(Blockly.Workspace.SCAN_ANGLE));
        this.RTL && (c *= -1);
        b.sort(function (a, b) {
            var f = a.getRelativeToSurfaceXY(),
                g = b.getRelativeToSurfaceXY();
            return f.y + c * f.x - (g.y + c * g.x)
        })
    }
    return b
}
//=====================================get the block regarding the screen X, Y==================================================
Blockly.Workspace.prototype.getTopBlocks = function (a) {
    //window.alert("get top block");
    //window.alert(a);
    console.log(Blockly.Workspace.prototype.topBlocks_);
    var b = [].concat(Blockly.Workspace.prototype.topBlocks_);
    if (a && 1 < b.length) {
        var c = Math.sin(goog.math.toRadians(Blockly.Workspace.SCAN_ANGLE));
        this.RTL && (c *= -1);
        b.sort(function (a, b) {
            var f = a.getRelativeToSurfaceXY(),
                g = b.getRelativeToSurfaceXY();
            return f.y + c * f.x - (g.y + c * g.x)
        })
    }
    //window.alert(b);
    return b
};
//===========================function to retrieve all the blocks in the workspace========================================
Blockly.Workspace.prototype.getAllBlocks = function () {
   // window.alert("get getAllBlocks");
    console.log(this.getTopBlocks(!1));
    for (var a = this.getTopBlocks(!0), b = 0; b < a.length; b++) {
        a.push.apply(a, a[b].getChildren());
        //window.alert("get all blocks" + a[b]);
        return a
    }
};
//====================function to clear the workspace from any blocks======================================
Blockly.Workspace.prototype.clear = function () {
    var a = Blockly.Events.getGroup();
    for (a || Blockly.Events.setGroup(!0); this.topBlocks_.length; ) this.topBlocks_[0].dispose();
    a || Blockly.Events.setGroup(!1);
    this.variableList.length = 0
    this.variableValueList.length = 0
    this.arrayList.length = 0
    this.arrayValueList.length = 0
    this.textList.length = 0
    this.textValueList.length = 0
    this.textDrpdwnValues.length = 0
};
//================================Not Called=======================================

Blockly.Workspace.prototype.updateVariableList = function (a) {
    //window.alert("updateVariableList");
    //window.alert(a);
    if (!this.isFlyout) {
        a && (this.variableList.length = 0);
        a = Blockly.Variables.allUsedVariables(this);
        //window.alert(variableList.length);
        //window.alert(a);
        for (var b = 0; b < a.length; b++) this.createVariable(a[b])
    }
};
//==============================update the array list=========================================
Blockly.Workspace.prototype.updateArrayList = function (a) {
    if (!this.isFlyout) {
        a && (this.arrayList.length = 0);
        a = Blockly.Arrays.allUsedArrays(this);
        for (var b = 0; b < a.length; b++) this.createArray(a[b])
    }
};
//============================update the text list==========================================
Blockly.Workspace.prototype.updateTextList = function (a) {
    if (!this.isFlyout) {
        a && (this.textList.length = 0);
        a = Blockly.Text.allUsedText(this);
        for (var b = 0; b < a.length; b++) this.createText(a[b])
    }
};
//===============================Not Called=======================================
Blockly.Workspace.prototype.changeInitialVariable = function (name, value) {
    //a name //b second value
    value = value.replace(/\D/g, '');
    var c = this.variableIndexOf(name);
    if (c !== -1) {
        this.variableValueList[c] = value;
    }
};
//=============================change the initial value of array items=========================================
Blockly.Workspace.prototype.changeInitialArray = function (a, b) {
    b = b.replace(/ /g, '_');
    var c = this.arrayIndexOf(a),
        d = this.arrayIndexOf(b);
    if (-1 != d && this.arrayList[d] != b) var e = this.arrayList[d];
    Blockly.Events.setGroup(!0);
    var c = this.arrayIndexOf(a);
    if (c !== -1) {
        this.arrayValueList[c] = b;
    }
};
//===============================renameVariable from Menue of block=======================================
Blockly.Workspace.prototype.renameVariable = function (a, b) {
    console.log(this);
    //window.alert(this);
    //window.alert(a);
    // window.alert(b);
    console.log('rename var', a, b);
    b = b.replace(/ /g, '_');
    var c = this.variableIndexOf(a),
        d = this.variableIndexOf(b);

    //window.alert(d);
    if (-1 != d && this.variableList[d] != b) {
        var e = this.variableList[d];

    }
    Blockly.Events.setGroup(!0);
    console.log(this.getAllBlocks());
    //window.alert(this.getAllBlocks().length);
    //window.alert(console.log.toString());
    for (var f = this.getAllBlocks(), g = 0; g < f.length; g++) {
        //window.alert(f[g]);
        f[g].renameVar(a, b), e && f[g].renameVar(e, b);
    }
    //window.alert(e);
    Blockly.Events.setGroup(!1);
    c == d || -1 != c && -1 == d ? this.variableList[c] = b : -1 != c && -1 != d ? (this.variableList.splice(c, 1), this.variableList[d] = b) : (this.variableList.push(b), console.log("Tried to rename an non-existent variable."))
    toCode('ESP32');
    //window.alert(this.variableList[0]);
    //window.alert(this.variableList[1]);
};
//===============================Rename array (Has error)=======================================
Blockly.Workspace.prototype.renameArray = function (a, b) {
    console.log('Blockly.Workspace.prototype.renameArray');
    b = b.replace(/ /g, '_');
    var c = this.arrayIndexOf(a),
        d = this.arrayIndexOf(b);
    if (-1 != d && this.arrayList[d] != b) var e = this.arrayList[d];
    Blockly.Events.setGroup(!0);
    for (var f = this.getAllBlocks(), g = 0; g < f.length; g++) f[g].renameArry(a, b), e && f[g].renameArry(e, b);
    Blockly.Events.setGroup(!1);
    c == d || -1 != c && -1 == d ? this.arrayList[c] = b : -1 != c && -1 != d ? (this.arrayList.splice(c, 1), this.arrayList[d] = b) : (this.arrayList.push(b), console.log("Tried to rename an non-existent variable."))
    toCode('ESP32');
};
//============================when create new variable with name, value================================
Blockly.Workspace.prototype.createVariable = function (a, b, c) {
    //window.alert("createVariable");
    //window.alert(this.variableIndexOf(a));
    //window.alert(this.variableList[0]);
    //window.alert(this.variableList[1]);
    //window.alert(c);
    //if(this.variableIndexOf(a)==-

-1 == this.variableIndexOf(a) && this.variableList.push(a) && this.variableValueList.push(b)
    //Blockly.Workspace.prototype.addTopBlock(variableValueList);
    //// window.alert(variableList[0]);
    // window.alert(variableList[1]);
    // window.alert(variableList[2]);
};
//===========================create array at the workspace====================================
Blockly.Workspace.prototype.createArray = function (a, b, c) {
-1 == this.arrayIndexOf(a) && this.arrayList.push(a) && this.arrayValueList.push(b) && this.arraydrpwnvalues.push(c)
};
//===============================create Text at the workspace================================
Blockly.Workspace.prototype.createText = function (a, b) {
-1 == this.textIndexOf(a) && this.textList.push(a) && this.textValueList.push(b)
};
//===============================================================
/* Blockly.WorkspaceSvg.prototype.createVariable = function (a, b, c) {
a = Blockly.WorkspaceSvg.superClass_.createVariable.call(this, a, b, c);
this.refreshToolboxSelection();
return a;
}; */
/* Blockly.WorkspaceSvg.prototype.createVariable = function (a, b) {
console.log(a, b);
console.log(Blockly.WorkspaceSvg.superClass_.createVariable);
let temp = Blockly.WorkspaceSvg.superClass_.createVariable.call(this, a, b);
console.log(temp);
this.toolbox_ && this.toolbox_.flyout_ && !Blockly.Flyout.startFlyout_ && this.toolbox_.refreshSelection()
return temp;
}; */
//===========================get the used variables at the workspace=========================================
Blockly.Workspace.prototype.getVariableUses = function (a) {
    //window.alert("get used vars");
    for (var b = [], c = this.getAllBlocks(), d = 0; d < c.length; d++) {
        var e = c[d].getVars();
        if (e)
            for (var f = 0; f < e.length; f++) {
                var g = e[f];
                g && Blockly.Names.equals(g, a) && b.push(c[d])
            }
    }
    return b
};
//=======================get the used array at the workspace==========================
Blockly.Workspace.prototype.getArrayUses = function (a) {
    for (var b = [], c = this.getAllBlocks(), d = 0; d < c.length; d++) {
        var e = c[d].getArry();
        if (e)
            for (var f = 0; f < e.length; f++) {
                var g = e[f];
                g && Blockly.Names.equals(g, a) && b.push(c[d])
            }
    }
    return b
};
//=======================get the used text at the workspace========================
Blockly.Workspace.prototype.getTextUses = function (a) {
    for (var b = [], c = this.getAllBlocks(), d = 0; d < c.length; d++) {
        var e = c[d].getTexts();
        if (e)
            for (var f = 0; f < e.length; f++) {
                var g = e[f];
                g && Blockly.Names.equals(g, a) && b.push(c[d])
            }
    }
    return b
};
//=======================Delete a variable from Variable Set===========================
Blockly.Workspace.prototype.deleteVariable = function (a) {
    //window.alert("Delete menue");
    //window.alert(b);
    var b = this.variableIndexOf(a);
    //window.alert(b);
    if (-1 != b) {
        var c = this.getVariableUses(a);
        //window.alert(c);
        if (1 < c.length) {
            for (var d = 0, e; e = c[d]; d++)
                if ("procedures_defnoreturn" == e.type || "procedures_defreturn" == e.type) {
                    b = e.getFieldValue("NAME");
                    window.alert(Blockly.Msg.CANNOT_DELETE_VARIABLE_PROCEDURE.replace("%1", a).replace("%2", b));
                    return
                }
            if (!window.confirm(Blockly.Msg.DELETE_VARIABLE_CONFIRMATION.replace("%1", c.length).replace("%2", a))) {
                //window.alert("Return");
                return
            }
        }
        //window.alert("here");
        Blockly.Events.setGroup(!0);
        for (d = 0; d < c.length; d++) c[d].dispose(!0, !1);
        Blockly.Events.setGroup(!1);
        this.variableList.splice(b, 1);
        this.variableValueList.splice(b, 1);
    }
    Code.renderContent(false);
    Code.listVariablePopup('toolbox')
    toCode('ESP32');
};
//==========================delete an array fro mworkspace=================================
Blockly.Workspace.prototype.deleteArray = function (a) {
    var b = this.arrayIndexOf(a);
    if (-1 != b) {
        var c = this.getArrayUses(a);
        if (1 < c.length) {
            for (var d = 0, e; e = c[d]; d++)
                if ("procedures_defnoreturn" == e.type || "procedures_defreturn" == e.type) {
                    b = e.getFieldValue("NAME");
                    window.alert(Blockly.Msg.CANNOT_DELETE_VARIABLE_PROCEDURE.replace("%1", a).replace("%2", b));
                    return
                }
            if (!window.confirm(Blockly.Msg.DELETE_ARRAY_CONFIRMATION.replace("%1", c.length).replace("%2", a))) return
        }
        Blockly.Events.setGroup(!0);
        for (d = 0; d <
        c.length; d++) c[d].dispose(!0, !1);
        Blockly.Events.setGroup(!1);
        this.arrayList.splice(b, 1);
        this.arrayValueList.splice(b, 1);
        toCode('ESP32');
    }
    Code.renderContent(false);
    Code.createmodifyArrayPopup(Code.workspace.arrayList, Code.workspace.arrayValueList, Code.workspace.arraydrpwnvalues)
};
//================================delete text from the workspace=================================
Blockly.Workspace.prototype.deleteText = function (a) {
    var b = this.textIndexOf(a);
    if (-1 != b) {
        var c = this.getTextUses(a);
        if (1 < c.length) {
            for (var d = 0, e; e = c[d]; d++)
                if ("procedures_defnoreturn" == e.type || "procedures_defreturn" == e.type) {
                    b = e.getFieldValue("NAME");
                    window.alert(Blockly.Msg.CANNOT_DELETE_VARIABLE_PROCEDURE.replace("%1", a).replace("%2", b));
                    return
                }
            if (!window.confirm(Blockly.Msg.DELETE_Text_CONFIRMATION.replace("%1", c.length).replace("%2", a))) return
        }
        Blockly.Events.setGroup(!0);
        for (d = 0; d <
        c.length; d++) c[d].dispose(!0, !1);
        Blockly.Events.setGroup(!1);
        this.textList.splice(b, 1)
        this.textValueList.splice(b, 1)
    }
    Code.renderContent(false);
    Code.listTextPopup();
    toCode('ESP32');
};
//=========================get the index of a variable at variable list================================
Blockly.Workspace.prototype.variableIndexOf = function (a) {
    for (var b = 0, c; c = this.variableList[b]; b++)
        if (Blockly.Names.equals(c, a)) return b;
    return -1
};
//=========================get the index of a array at variable list================================
Blockly.Workspace.prototype.arrayIndexOf = function (a) {
    for (var b = 0, c; c = this.arrayList[b]; b++)
        if (Blockly.Names.equals(c, a)) return b;
    return -1
};
//=========================get the index of a text at variable list================================
Blockly.Workspace.prototype.textIndexOf = function (a) {
    for (var b = 0, c; c = this.textList[b]; b++)
        if (Blockly.Names.equals(c, a)) return b;
    return -1
};
//=====================================================
Blockly.Workspace.prototype.getWidth = function () {
    return 0
};
Blockly.Workspace.prototype.newBlock = function (a, b) {
   // window.alert("new block");
    return new Blockly.Block(this, a, b)
};
Blockly.Workspace.prototype.remainingCapacity = function () {
    return isNaN(this.options.maxBlocks) ? Infinity : this.options.maxBlocks - this.getAllBlocks().length
};
//============================undo any action at the workspace=============================
Blockly.Workspace.prototype.undo = function (a) {
    var b = a ? this.redoStack_ : this.undoStack_,
        c = a ? this.undoStack_ : this.redoStack_,
        d = b.pop();
    if (d) {

        for (var e = [d]; b.length && d.group && d.group == b[b.length - 1].group; ) e.push(b.pop());
        for (b = 0; d = e[b]; b++) c.push(d);
        e = Blockly.Events.filter(e, a);
        Blockly.Events.recordUndo = !1;
        for (b = 0; d = e[b]; b++) d.run(a);
        Blockly.Events.recordUndo = !0
    }
};
//==========================clear undo history=======================
Blockly.Workspace.prototype.clearUndo = function () {
    this.undoStack_.length = 0;
    this.redoStack_.length = 0;
    Blockly.Events.clearPendingUndo()
};
Blockly.Workspace.prototype.addChangeListener = function (a) {
    this.listeners_.push(a);
    return a
};
Blockly.Workspace.prototype.removeChangeListener = function (a) {
    goog.array.remove(this.listeners_, a)
};
Blockly.Workspace.prototype.fireChangeListener = function (a) {
    a.recordUndo && (this.undoStack_.push(a), this.redoStack_.length = 0, this.undoStack_.length > this.MAX_UNDO && this.undoStack_.unshift());
    for (var b = 0, c; c = this.listeners_[b]; b++) c(a)
};
//=========================get block at the workspace by ID==============================
Blockly.Workspace.prototype.getBlockById = function (a) {
    //window.alert("getBlockById");
    return this.blockDB_[a] || null
};
Blockly.Workspace.WorkspaceDB_ = Object.create(null);
Blockly.Workspace.getById = function (a) {
    return Blockly.Workspace.WorkspaceDB_[a] || null
};
//=============================================================================
Blockly.Workspace.prototype.clear = Blockly.Workspace.prototype.clear;
Blockly.Workspace.prototype.clearUndo = Blockly.Workspace.prototype.clearUndo;
Blockly.Workspace.prototype.addChangeListener = Blockly.Workspace.prototype.addChangeListener;
Blockly.Workspace.prototype.removeChangeListener = Blockly.Workspace.prototype.removeChangeListener;
// Blockly Workspace - ends

// WidgetDiv Functions - begins 
// Blockly.WidgetDiv.position = function (a, b, c, d, e) {
//     b < d.y && (b = d.y);
//     e ? a > c.width + d.x && (a = c.width + d.x) : a < d.x && (a = d.x);
//     Blockly.WidgetDiv.DIV.style.left = a + "px";
//     Blockly.WidgetDiv.DIV.style.top = b + "px";
//     Blockly.WidgetDiv.DIV.style.height = c.height + "px"
// };
// WidgetDiv Functions - ends