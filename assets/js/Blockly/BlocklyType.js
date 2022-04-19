//======================================================================
//this file adjust the block type that selected from the user, it check te compatability and the type of the block type
// Blockly Type Functions - begins
//====================================================================================
Blockly.Type = function (a) {
    //window.alert("Blockly.Type");
    if (void 0 === a.typeId || void 0 === a.typeMsgName || void 0 === a.compatibleTypes) throw Error("Creating a Type requires the following format:\n{\n  typeId: string,\n  typeMsgName: Blockly.Msg string member var name to\n               identify the translatable Type name.\n  compatibleTypes: [Blockly.Type,]\n}");
    if (!goog.isArray(a.compatibleTypes)) throw Error("The compatible types for a Blockly Types needs to be an array of Blockly.Type items.");
    this.typeId = a.typeId;
    this.typeMsgName_ =
        a.typeMsgName;
    this.compatibleTypes_ = a.compatibleTypes;
    this.compatibleTypes_.push(this);
    this.generatedCheckList_ = [];
    this.generateCheckList_()
};
Object.defineProperty(Blockly.Type.prototype, "typeName", {
    get: function () {
        return Blockly.Msg[this.typeMsgName_] || this.typeId
    },
    set: function (a) {
        console.warn('"Blockly.Type" property "typeName" is not allowed to be set.')
    }
});
Object.defineProperty(Blockly.Type.prototype, "output", {
    get: function () {
        return this.typeId
    },
    set: function (a) {
        console.warn('"Blockly.Type" property "output" is not allowed to be set.')
    }
});
Object.defineProperty(Blockly.Type.prototype, "checkList", {
    get: function () {
        return this.generatedCheckList_
    },
    set: function (a) {
        console.warn('"Blockly.Type" property "check" is not allowed to be set.')
    }
});
//======================= define a type of generated check list  and the compatability of the type=====================
Blockly.Type.prototype.generateCheckList_ = function (a) {
    this.generatedCheckList_ = [];
    for (a = 0; a < this.compatibleTypes_.length; a++) {
        for (var b = !0, c = 0; c < this.generatedCheckList_.length; c++) this.generatedCheckList_[c] === this.compatibleTypes_[a].typeId && (b = !1);
        b && this.generatedCheckList_.push(this.compatibleTypes_[a].typeId)
    }
};
//================================== check the copatability of the added object type to a block ==================================
Blockly.Type.prototype.addCompatibleType = function (a) {
    if (!(a && a.constructor && a instanceof Blockly.Type)) throw Error("To add a compatible type to " + this.typeId + " provide a Blockly.Type object.");
    this.compatibleTypes_.push(a);
    this.generateCheckList_()
};
//================================== check the copatability of the added types to a block items ==================================
Blockly.Type.prototype.addCompatibleTypes = function (a) {
    if (!goog.isArray(a)) throw Error("To add compatible types to the Blockly Type " + this.typeId + " provide an array of Blockly.Type items.");
    for (var b = 0; b < a.length; b++) {
        if (!(a[b] && a[b].constructor && a[b] instanceof Blockly.Type)) throw Error("To add a compatible type to " + this.typeId + " you must point to a Blockly.Type object.");
        this.compatibleTypes_.push(a[b])
    }
    this.generateCheckList_()
};
//========================= define the value type (char, text, bool, etc....)=================================
Blockly.Types = {};
Blockly.Types.CHARACTER = new Blockly.Type({
    typeId: "Character",
    typeMsgName: "ARD_TYPE_CHAR",
    compatibleTypes: []
});
Blockly.Types.TEXT = new Blockly.Type({
    typeId: "Text",
    typeMsgName: "ARD_TYPE_TEXT",
    compatibleTypes: [Blockly.Types.CHARACTER]
});
Blockly.Types.BOOLEAN = new Blockly.Type({
    typeId: "Boolean",
    typeMsgName: "ARD_TYPE_BOOL",
    compatibleTypes: []
});
Blockly.Types.SHORT_NUMBER = new Blockly.Type({
    typeId: "Short Number",
    typeMsgName: "ARD_TYPE_SHORT",
    compatibleTypes: []
});
Blockly.Types.NUMBER = new Blockly.Type({
    typeId: "Number",
    typeMsgName: "ARD_TYPE_NUMBER",
    compatibleTypes: []
});
Blockly.Types.LARGE_NUMBER = new Blockly.Type({
    typeId: "Large Number",
    typeMsgName: "ARD_TYPE_LONG",
    compatibleTypes: []
});
Blockly.Types.DECIMAL = new Blockly.Type({
    typeId: "Decimal",
    typeMsgName: "ARD_TYPE_DECIMAL",
    compatibleTypes: [Blockly.Types.BOOLEAN, Blockly.Types.SHORT_NUMBER, Blockly.Types.NUMBER, Blockly.Types.LARGE_NUMBER]
});
Blockly.Types.ARRAY = new Blockly.Type({
    typeId: "Array",
    typeMsgName: "ARD_TYPE_ARRAY",
    compatibleTypes: []
});
Blockly.Types.NULL = new Blockly.Type({
    typeId: "Null",
    typeMsgName: "ARD_TYPE_NULL",
    compatibleTypes: []
});
Blockly.Types.UNDEF = new Blockly.Type({
    typeId: "Undefined",
    typeMsgName: "ARD_TYPE_UNDEF",
    compatibleTypes: []
});
Blockly.Types.CHILD_BLOCK_MISSING = new Blockly.Type({
    typeId: "ChildBlockMissing",
    typeMsgName: "ARD_TYPE_CHILDBLOCKMISSING",
    compatibleTypes: []
});
Blockly.Types.NUMBER.addCompatibleTypes([Blockly.Types.BOOLEAN, Blockly.Types.SHORT_NUMBER, Blockly.Types.LARGE_NUMBER, Blockly.Types.DECIMAL]);
Blockly.Types.SHORT_NUMBER.addCompatibleTypes([Blockly.Types.BOOLEAN, Blockly.Types.NUMBER, Blockly.Types.LARGE_NUMBER, Blockly.Types.DECIMAL]);
Blockly.Types.LARGE_NUMBER.addCompatibleTypes([Blockly.Types.BOOLEAN, Blockly.Types.SHORT_NUMBER, Blockly.Types.NUMBER, Blockly.Types.DECIMAL]);
Blockly.Types.addType = function (a, b, c) {
    var d = a.toUpperCase().replace(/ /g, "_");
    if (void 0 !== Blockly.Types[d]) throw "The Blockly type " + d + " already exists.";
    Blockly.Types[d] = new Blockly.Type({
        typeId: a,
        typeName: b,
        compatibleTypes: c
    })
};
//========================== check the correcteness of array items and value types ====================================
Blockly.Types.getValidTypeArray = function () {
    var a = [],
        b;
    for (b in Blockly.Types) "UNDEF" === b || "CHILD_BLOCK_MISSING" === b || "NULL" === b || "ARRAY" === b || "function" === typeof Blockly.Types[b] || Blockly.Types[b] instanceof RegExp || a.push([Blockly.Types[b].typeName, b]);
    return a
};
//====================== check the type of block child type ===============================================
Blockly.Types.getChildBlockType = function (a) {
    for (var b = a; b && void 0 === b.getBlockType && 0 < b.inputList.length; ) b = b.inputList[0].connection.targetBlock();
    return b === a ? Blockly.Types.CHILD_BLOCK_MISSING : null === b ? Blockly.Types.CHILD_BLOCK_MISSING : b.getBlockType ? b.getBlockType() : Blockly.Types.NULL
};
Blockly.Types.regExpInt_ = new RegExp(/^-?\d+$/);
Blockly.Types.regExpFloat_ = new RegExp(/^-?[0-9]*[.][0-9]+$/);
Blockly.Types.identifyNumber = function (a) {
    return Blockly.Types.regExpInt_.test(a) ? (a = parseInt(a), isNaN(a) ? Blockly.Types.NULL : 32767 < a || -32768 > a ? Blockly.Types.LARGE_NUMBER : Blockly.Types.NUMBER) : Blockly.Types.regExpFloat_.test(a) ? Blockly.Types.DECIMAL : Blockly.Types.NULL
};
// Blockly Type Functions - ends