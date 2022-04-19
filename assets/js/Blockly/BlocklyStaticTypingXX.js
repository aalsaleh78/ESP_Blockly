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
//=========================================
Blockly.StaticTyping.getBlockVars = function (a) {
    //window.alert("getBlockVars");
    //window.alert(a);
    var b = [],
        c = a.getVars;
    if (c) {
        for (var c = c.call(a), d = 0; d < c.length; d++) {
            var e = c[d],
                f = a.getVarType;
            f ? (f = f.call(a, e), b.push([e, f])) : b.push([e, Blockly.Types.NULL])
        }
        window.alert("getBlockVars" + b);
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