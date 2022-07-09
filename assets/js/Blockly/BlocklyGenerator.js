//===========================================================
//this file generate a code from blocks to write on the workspace
//=================================================
// Override Blockly Generator's function - begins
Blockly.Generator = function (a) {
    this.name_ = a;
    this.FUNCTION_NAME_PLACEHOLDER_REGEXP_ = new RegExp(this.FUNCTION_NAME_PLACEHOLDER_, "g")
};
Blockly.Generator.NAME_TYPE = "generated_function";
Blockly.Generator.prototype.INFINITE_LOOP_TRAP = null;
Blockly.Generator.prototype.STATEMENT_PREFIX = null;
Blockly.Generator.prototype.INDENT = "  ";
Blockly.Generator.prototype.COMMENT_WRAP = 60;
Blockly.Generator.prototype.ORDER_OVERRIDES = [];
//=========================================================================
//===============================generate the code from the current workspace====================================
Blockly.Generator.prototype.workspaceToCode = function (a) {
    //window.alert("workspaceToCode==" +a);
    a || (console.warn("No workspace specified in workspaceToCode call.  Guessing."), a = Blockly.getMainWorkspace());
    //window.alert("workspaceToCode");
    //Blockly.Workspace.prototype.updateVariableList(a);
    // window.alert(a[0]);
    var b = [];
    console.log(a);
    this.init(a);
    //a = "";
    a = a.getTopBlocks(!0);
   // window.alert("workspaceToCode2");
       // window.alert("before getTopBlocks a=" + a.length);
    ////    a.length = 4;
       // window.alert("After getTopBlocks a=" +a.length);
    for (var c = 0, d; d = a[c]; c++) {

        var e = this.blockToCode(d);
        //window.alert("workspaceToCodeStatement==>" + e);
        //window.alert("workspaceToCode3");
        //window.alert("a[0]=" + a[0]);
        //window.alert("d=" + d);
        //window.alert("e=" + e);
        //if (b.indexOf(e)>=0) continue;
        goog.isArray(e) && (e = e[0]);
        //window.alert("b length==" + b.length);
        var unique = [];
        for (var i = 0, n; n = b.pop(); i++) {
            //var n = 
            // window.alert("n==" + n);
            if (unique.indexOf(n) < 0) {
                unique.push(n);
            }
        }
        //window.alert("workspaceToCode4");
        e && (d.outputConnection && this.scrubNakedValue && (e = this.scrubNakedValue(e)), b.push(e))
    }
    //    var unique = [];
    //    for (var i = 0; i < b.length; i++) {
    //        if (unique.indexOf(b[i]) < 0) {
    //            unique.push(b[i]);
    //        }
    //    }
    // window.alert("b=" + b);
    // window.alert("unique=" + unique);
    b = b.join("\n");
    if (e == "") { Blockly.Workspace.prototype.variableList.length = 0; }
    b = this.finish(b);
    //window.alert(b.replace(/[ \t]+\n/g, ""));

    return b = b.replace(/[ \t]+\n/g, "");
};
//============================add prefix line to the code==================================
Blockly.Generator.prototype.prefixLines = function (a, b) {
    //window.alert("a==>" + a + "  b==>" + b);
    return b + a.replace(/(?!\n$)\n/g, "\n" + b)
};
//========================get the comment text to add it in the code ====================================
Blockly.Generator.prototype.allNestedComments = function (a) {
    var b = [];
    a = a.getDescendants();
    for (var c = 0; c < a.length; c++) {
        var d = a[c].getCommentText();
        d && b.push(d)
    }
    b.length && b.push("");
    return b.join("\n")
};
//=======================convert a block to c code ========================================
Blockly.Generator.prototype.blockToCode = function (a) {
    //window.alert("blockToCode"+a);
    if (!a) return "";
    var cc = a.getNextBlock();
    //window.alert("next block : " + this.blockToCode(cc));
    if (a.disabled) return this.blockToCode(cc);
    var b = this[a.type];
    //window.alert("next block : b== " + b);
    goog.asserts.assertFunction(b, 'Language "%s" does not know how to generate code for block type "%s".', this.name_, a.type);
    if (b) {
        b = b.call(a, a);
        //window.alert("next block : b2== " + b);
        //window.alert("blockToCode2");
        //window.alert(b);
    }
    else {
        b = Blockly.ESP32.myNodesCode.call(a, a);
        //window.alert("next block : b3== " + b);
        //window.alert("blockToCode3");
    }
    if (goog.isArray(b)) return goog.asserts.assert(a.outputConnection, 'Expecting string from statement block "%s".', a.type), [this.scrub_(a, b[0]), b[1]];
    if (goog.isString(b)) {
        //window.alert("next block : b4== " + b);
        var c = a.id.replace(/\$/g, "$$$$");
        // window.alert(a);
        this.STATEMENT_PREFIX && (b =
            this.STATEMENT_PREFIX.replace(/%1/g, "'" + c + "'") + b);
        //window.alert("blockToCode" + a);
        //window.alert("blockToCode5");
        return this.scrub_(a, b)
    }
    if (null === b) return "";
    goog.asserts.fail("Invalid code generated: %s", b)
};
//===========================get the value from the block to make it as a code==============================
Blockly.Generator.prototype.valueToCode = function (a, b, c) {
    isNaN(c) && goog.asserts.fail('Expecting valid order from block "%s".', a.type);
    var d = a.getInputTargetBlock(b);
    if (!d) return "";
    b = this.blockToCode(d);
    if ("" === b) return "";
    goog.asserts.assertArray(b, 'Expecting tuple from value block "%s".', d.type);
    a = b[0];
    b = b[1];
    isNaN(b) && goog.asserts.fail('Expecting valid order from value block "%s".', d.type);
    if (!a) return "";
    var d = !1,
        e = Math.floor(c),
        f = Math.floor(b);
    if (e <= f && (e != f || 0 != e && 99 != e))
        for (d = !0, e = 0; e < this.ORDER_OVERRIDES.length; e++)
            if (this.ORDER_OVERRIDES[e][0] ==
                c && this.ORDER_OVERRIDES[e][1] == b) {
                d = !1;
                break
            }
    d && (a = "(" + a + ")");
    return a
};
//=======================convert a block statement to code ===============================
Blockly.Generator.prototype.statementToCode = function (a, b) {
    var c = a.getInputTargetBlock(b),
        d = this.blockToCode(c);
    goog.asserts.assertString(d, 'Expecting code from statement block "%s".', c && c.type);
    return d
};
//=======================convert a block loop to code ===============================
Blockly.Generator.prototype.addLoopTrap = function (a, b) {
    b = b.replace(/\$/g, "$$$$");
    this.INFINITE_LOOP_TRAP && (a = this.INFINITE_LOOP_TRAP.replace(/%1/g, "'" + b + "'") + a);
    this.STATEMENT_PREFIX && (a += this.prefixLines(this.STATEMENT_PREFIX.replace(/%1/g, "'" + b + "'"), this.INDENT));
    return a
};
//======================= add a reserved or key word to the code ===============================
Blockly.Generator.prototype.RESERVED_WORDS_ = "";
Blockly.Generator.prototype.addReservedWords = function (a) {
    this.RESERVED_WORDS_ += a + ","
};
//======================= add a specific function to code ===============================
Blockly.Generator.prototype.FUNCTION_NAME_PLACEHOLDER_ = "{leCUI8hutHZI4480Dc}";
Blockly.Generator.prototype.provideFunction_ = function (a, b) {
    if (!this.definitions_[a]) {
        var c = this.variableDB_.getDistinctName(a, Blockly.Procedures.NAME_TYPE);
        this.functionNames_[a] = c;
        for (var c = b.join("\n").replace(this.FUNCTION_NAME_PLACEHOLDER_REGEXP_, c), d; d != c; ) d = c, c = c.replace(/^((  )*)  /gm, "$1" + this.INDENT);
        this.definitions_[a] = c
    }
    return this.functionNames_[a]
};

Blockly.Block.prototype.getNextBlock = function () 
{ return this.nextConnection && this.nextConnection.targetBlock() };
// Override Blockly Generator's function - begins