//=======================================================================
//this code define how to write the blocks in C language
//==========================================================
// Customize Blockly code to 'C' - begins
//defintion of operations be used in blocks
//=====================================================
Blockly.ESP32 = new Blockly.Generator("ESP32");
Blockly.ESP32.StaticTyping = new Blockly.StaticTyping;
Blockly.ESP32.addReservedWords("Blockly,setup,loop,if,else,for,switch,case,while,do,break,continue,return,goto,define,include,HIGH,LOW,INPUT,OUTPUT,INPUT_PULLUP,true,false,integer,constants,floating,point,void,boolean,char,unsigned,byte,int,word,long,float,double,string,String,static,volatile,const,sizeof,pinMode,digitalWrite,digitalRead,analogReference,analogRead,analogWrite,tone,noTone,shiftOut,shitIn,pulseIn,millis,micros,delay,delayMicroseconds,min,max,abs,constrain,map,map_,pow,sqrt,sin,cos,tan,randomSeed,random,lowByte,highByte,bitRead,bitWrite,bitSet,bitClear,bit,attachInterrupt,detachInterrupt,interrupts,noInterrupts");
Blockly.ESP32.ORDER_ATOMIC = 0;
Blockly.ESP32.ORDER_UNARY_POSTFIX = 1;
Blockly.ESP32.ORDER_UNARY_PREFIX = 2;
Blockly.ESP32.ORDER_MULTIPLICATIVE = 3;
Blockly.ESP32.ORDER_ADDITIVE = 4;
Blockly.ESP32.ORDER_SHIFT = 5;
Blockly.ESP32.ORDER_RELATIONAL = 6;
Blockly.ESP32.ORDER_EQUALITY = 7;
Blockly.ESP32.ORDER_BITWISE_AND = 8;
Blockly.ESP32.ORDER_BITWISE_XOR = 9;
Blockly.ESP32.ORDER_BITWISE_OR = 10;
Blockly.ESP32.ORDER_LOGICAL_AND = 11;
Blockly.ESP32.ORDER_LOGICAL_OR = 12;
Blockly.ESP32.ORDER_CONDITIONAL = 13;
Blockly.ESP32.ORDER_ASSIGNMENT = 14;
Blockly.ESP32.ORDER_NONE = 99;
Blockly.ESP32.PinTypes = {
    INPUT: "INPUT",
    OUTPUT: "OUTPUT"
};
Blockly.ESP32.ConnDiagArrPublic = Object.create(null);
Blockly.ESP32.PowerCalcArrPublic = Object.create(null);
Blockly.ESP32.DEF_FUNC_NAME = Blockly.ESP32.FUNCTION_NAME_PLACEHOLDER_;
//end
//============================================================
// Util Functions
//get feild values in a bock
Blockly.ESP32.myNodesCode = function (block) {
    // console.log(block);

    let  strFieldValue = '';
    if(block.getFieldValue("TEXT") && block.getFieldValue("TEXT").length == 1) 
        strFieldValue = ["'" + block.getFieldValue("TEXT") + "'", null];
    else if(block.getFieldValue("TEXT") && block.getFieldValue("TEXT").length > 1) 
        strFieldValue = ['"' + block.getFieldValue("TEXT") + '"', null];
    else if(block.getFieldValue("angle")) 
        strFieldValue = [block.getFieldValue("angle"), null];
    else if(block.getFieldValue("NUM")) 
        strFieldValue = [block.getFieldValue("NUM"), null];
    
    return strFieldValue;
};
//=====================================================================
//initialize the variables
Blockly.ESP32.init = function (a) {
    // console.log('test');

    Blockly.ESP32.includes_ = Object.create(null);
    Blockly.ESP32.definitions_ = Object.create(null);
    Blockly.ESP32.variables_ = Object.create(null);
    Blockly.ESP32.arrays_ = Object.create(null);
    Blockly.ESP32.codeFunctions_ = Object.create(null);
    Blockly.ESP32.userFunctions_ = Object.create(null);
    Blockly.ESP32.functionNames_ = Object.create(null);
    Blockly.ESP32.setups_ = Object.create(null);
    Blockly.ESP32.pins_ = Object.create(null);
    Blockly.ESP32.ConnDiagArr = Object.create(null);
    Blockly.ESP32.PowerCalcArr = Object.create(null);
    Blockly.ESP32.variableDB_ ? Blockly.ESP32.variableDB_.reset() : Blockly.ESP32.variableDB_ =
            new Blockly.Names(Blockly.ESP32.RESERVED_WORDS_);
    var b = Blockly.ESP32.StaticTyping.collectVarsWithTypes(a);
    Blockly.ESP32.StaticTyping.setProcedureArgs(a, b);
    for (var c in b) Blockly.ESP32.addVariable(c, Blockly.ESP32.getESP32Type_(b[c]) + " " + Blockly.ESP32.variableDB_.getName(c, Blockly.Variables.NAME_TYPE) + ";")
};
//===================================================================================================
//this function is the main function that the excution start from it
//====================================================================================================
Blockly.ESP32.finish = function (a) {
//window.alert("finish");
    var b = [],
        c = [],
        d = [],
        vars = [],
        arrs = [],
        txts = [],
        e = [],
        f,
        intVar = 'int ',
        intCVar = 'int_c',
        stringVar = 'String ',
        endColon = ';';
        //=================================
        
        //==================================
    var i = 0;
    for (f in Blockly.ESP32.includes_) {
        var found = false;
        for (var item in b) {
            if (b[item] == Blockly.ESP32.includes_[f]) {
                found = true;
                break;
            }
        }
        if (!found) {
            b.push(Blockly.ESP32.includes_[f]);
        }
    }
    b.length && b.push("\n");
    for (f in Blockly.ESP32.variables_) {
        if (!Blockly.ESP32.variables_[f].startsWith(intVar) && !Blockly.ESP32.variables_[f].startsWith(intCVar)) {
        
            d.push(Blockly.ESP32.variables_[f]);
        }
        if (Blockly.ESP32.variables_[f].startsWith(intCVar)) {
        //window.alert(Blockly.ESP32.variables_[f]);
            d.push(Blockly.ESP32.variables_[f].replace(intCVar, intVar) + endColon);
        }
    }
    for (f in Blockly.ESP32.arrays_) {
        if (!Blockly.ESP32.arrays_[f].startsWith(intVar) && !Blockly.ESP32.arrays_[f].startsWith(intCVar)) {
            d.push(Blockly.ESP32.variables_[f])
        }
        if (Blockly.ESP32.arrays_[f].startsWith(intCVar)) {
            d.push(Blockly.ESP32.arrays_[f].replace(intCVar, intVar))
        }
    }

    d.length && d.push("\n");
    //window.alert(Blockly.Workspace.prototype.variableList[0]);
    //window.alert(Blockly.Workspace.prototype.variableList[1]);
    //window.alert(Blockly.Workspace.prototype.variableList[2]);
    for (f in Blockly.Workspace.prototype.variableList) vars.push(intVar + Blockly.Workspace.prototype.variableList[f] + " = " + (Blockly.Workspace.prototype.variableValueList[f] ? Blockly.Workspace.prototype.variableValueList[f] : '0') + endColon);
    // vars.length && vars.push("\n");
    //window.alert(vars);
    for (f in Blockly.Workspace.prototype.arrayList) vars.push(intVar + Blockly.Workspace.prototype.arrayList[f] + "[" + (Blockly.Workspace.prototype.arraydrpwnvalues[f] ? Blockly.Workspace.prototype.arraydrpwnvalues[f] : 0) + "] = {" + (Blockly.Workspace.prototype.arrayValueList[f] ? Blockly.Workspace.prototype.arrayValueList[f] : '') + "}" + endColon);
    // arrs.length && arrs.push("\n");
    
    for (f in Blockly.Workspace.prototype.textList) txts.push(stringVar + Blockly.Workspace.prototype.textList[f] + ' = "' + (Blockly.Workspace.prototype.textValueList[f] ? Blockly.Workspace.prototype.textValueList[f] : '') + '"' + endColon);
    // txts.length && txts.push("\n");
    for (f in Blockly.ESP32.definitions_) c.push(Blockly.ESP32.definitions_[f]);
    c.length && c.push("\n");
    for (f in Blockly.ESP32.codeFunctions_) e.push(Blockly.ESP32.codeFunctions_[f]);
    for (f in Blockly.ESP32.userFunctions_) e.push(Blockly.ESP32.userFunctions_[f]);
    e.length && e.push("\n");
    var g = [""],
        h = "";
    void 0 !== Blockly.ESP32.setups_.userSetupCode && (h = "\n" + Blockly.ESP32.setups_.userSetupCode, delete Blockly.ESP32.setups_.userSetupCode);
    for (f in Blockly.ESP32.setups_) g.push(Blockly.ESP32.setups_[f]);
    h && g.push(h);
    delete Blockly.ESP32.includes_;
    delete Blockly.ESP32.definitions_;
    delete Blockly.ESP32.codeFunctions_;
    delete Blockly.ESP32.userFunctions_;
    delete Blockly.ESP32.functionNames_;
    delete Blockly.ESP32.setups_;
    delete Blockly.ESP32.pins_;
    delete Blockly.ESP32.ConnDiagArr;
    delete Blockly.ESP32.PowerCalcArr;
    Blockly.ESP32.variableDB_.reset();
    var e4s_include = '';
    var e4s_setup = '';
    var eXs_include = '';
    var eXs_setup = '';
        
    if (Blockly.Blocks.ConnectedBoard === 'FFC_ESP32') {
        e4s_include = '';
        e4s_setup = '\n<span class="ml-tab1">Serial.begin(115200); //Serial Tx</span>'; //'\n<span class='ml-tab1'>Serial.printf("setup done");</span>';
    }
    a && (a = Blockly.ESP32.prefixLines(a, Blockly.ESP32.INDENT));

    var taskScheduler = "";
    var taskInclude = "";
    if (Blockly.Blocks.isMultitask) {
        taskScheduler = "\n\tvTaskStartScheduler();";
        taskInclude = '#include "ESP_Blockly.h"\n';
    }
    //===========================================
    //combine the code of the existant blocks at the window
    //=======================================================
    b = (c.length ? "<span class='codeComments'>//Definitions</span>\n" : "") + c.join("\n") + taskInclude + "<span class='codeComments'>//Main libraries</span>\n" + b.join("\n") + '<span class="codeHeader">#include "ESP_Blockly.h"</span>\n' + e4s_include + (vars.length > 0 ? "\n" : "") + vars.join("\n") + (vars.length > 0 ? "\n" : "") + arrs.join("\n") + (txts.length > 0 ? "\n" : "") + txts.join("\n") + (txts.length > 0 ? "\n" : "") + (d.length ? "\n<span class='codeComments'>//Presetup</span>\n" : "") + d.join('\n') + e.join("\n\n");
    g = "\n<span class='codeComments'>//Setup</span>\n<span class='codeKeyword'>void </span><span class='codeMethod'>setup</span>() \n{" + e4s_setup + "\n" + g.join("\n\t") + taskScheduler + "\n}\n\n";
    a = "<span class='codeComments'>//Tasks of Functions</span>\n\n<span class='codeComments'>//Main LOOP</span>\n<span class='codeKeyword'>void </span><span class='codeMethod'>loop</span>()\n{\nSerial.printf(\"setup done\");\n" + a.replace(/\n/g, "\n\t") + "\n}\n";
    // a = "<span class='codeKeyword'>void </span><span class='codeMethod'>loop</span>()\n{\n<span class='ml-tab1'>//DO NOT WRITE ANY CODE HERE</span>\n}\n" + a.replace(/\n/g, "\n\t") + "\n";
    //window.alert(b);
    //window.alert(g);
    //window.alert(a);
    return b + g + a
};
//====================================================================================
// add header file (include file)
//==========================================================
Blockly.ESP32.addInclude = function (a, b) {
    void 0 === Blockly.ESP32.includes_[a] && (Blockly.ESP32.includes_[a] = b)
};
//add the declration to variables
//====================================================
Blockly.ESP32.addDeclaration = function (a, b) {
    void 0 === Blockly.ESP32.definitions_[a] && (Blockly.ESP32.definitions_[a] = b)
};
//==========================================================
//add a new variable to the code
Blockly.ESP32.addVariable = function (a, b, c) 
{
//window.alert("Add var in code");
//window.alert(a);
//window.alert(b);
//window.alert(c);
//window.alert(d);
    var d = !1;
    if (c || void 0 === Blockly.ESP32.variables_[a]) Blockly.ESP32.variables_[a] = b, d = !0;
        return d
   
};
//===============Add array to the code=========================
Blockly.ESP32.addArray = function (a, b, c) {
    var d = !1;
    if (c || void 0 === Blockly.ESP32.arrays_[a]) Blockly.ESP32.arrays_[a] = b, d = !0;
    return d
};
//================ add the setup block =====================
Blockly.ESP32.addSetup = function (a, b, c) {
    var d = !1;
    if (c || void 0 === Blockly.ESP32.setups_[a]) Blockly.ESP32.setups_[a] = b, d = !0;
    return d
};
//==========================add function to the c code==========================

Blockly.ESP32.addFunction = function (a, b) {
    if (void 0 === Blockly.ESP32.codeFunctions_[a]) {
        var c = Blockly.ESP32.variableDB_.getDistinctName(a, Blockly.Generator.NAME_TYPE);
        Blockly.ESP32.codeFunctions_[a] = b.replace(Blockly.ESP32.DEF_FUNC_NAME, c);
        Blockly.ESP32.functionNames_[a] = c
    }
    return Blockly.ESP32.functionNames_[a]
};
var index = 0;
//==================================================================
Blockly.ESP32.reservePin = function (a, b, c, d) {
    var temp = ""; //a.setWarningText(null, d)
    void 0 !== Blockly.ESP32.pins_[b] ? Blockly.ESP32.pins_[b] != c ? temp = "" : temp = "" : (Blockly.ESP32.pins_[b] = c, temp = "")
    void 0 !== Blockly.ESP32.ConnDiagArr[b] ? Blockly.ESP32.ConnDiagArr[b] != d ? temp = "" : temp = "" : (Blockly.ESP32.ConnDiagArr[b] = d, temp = "")
    delete Blockly.ESP32.ConnDiagArrPublic;
    Blockly.ESP32.ConnDiagArrPublic = Blockly.ESP32.ConnDiagArr;

    void 0 !== Blockly.ESP32.PowerCalcArr[b] ? Blockly.ESP32.PowerCalcArr[b] != d ? temp = "" : temp = "" : (Blockly.ESP32.PowerCalcArr[b + "-" + index] = d, temp = "")
    delete Blockly.ESP32.PowerCalcArrPublic;
    Blockly.ESP32.PowerCalcArrPublic = Blockly.ESP32.PowerCalcArr;
    index++;
};
Blockly.ESP32.scrubNakedValue = function (a) {
    return a + ";\n"
};
Blockly.ESP32.quote_ = function (a) {
    a = a.replace(/\\/g, "\\\\").replace(/\n/g, "\\\n").replace(/\$/g, "\\$").replace(/'/g, "\\'");
    return '"' + a + '"'
};
Blockly.ESP32.scrub_ = function (a, b) {
    if (null === b) return "";
    var c = "";
    if (!a.outputConnection || !a.outputConnection.targetConnection) {
        var d = a.getCommentText();
        d && (c += this.prefixLines(d, "// ") + "\n");
        for (var e = 0; e < a.inputList.length; e++) a.inputList[e].type == Blockly.INPUT_VALUE && (d = a.inputList[e].connection.targetBlock()) && (d = this.allNestedComments(d)) && (c += this.prefixLines(d, "// "))
    }
    e = a.nextConnection && a.nextConnection.targetBlock();
    e = this.blockToCode(e);
    return c + b + e
};
//============================== get the typr of entered data in the block =======================
Blockly.ESP32.getESP32Type_ = function (a) {
    switch (a.typeId) {
        case Blockly.Types.SHORT_NUMBER.typeId:
            return "char";
        case Blockly.Types.NUMBER.typeId:
            return "int";
        case Blockly.Types.LARGE_NUMBER.typeId:
            return "long";
        case Blockly.Types.DECIMAL.typeId:
            return "float";
        case Blockly.Types.TEXT.typeId:
            return "String";
        case Blockly.Types.CHARACTER.typeId:
            return "char";
        case Blockly.Types.BOOLEAN.typeId:
            return "boolean";
        case Blockly.Types.NULL.typeId:
            return Blockly.isMobile ? "var" : "int";
        case Blockly.Types.UNDEF.typeId:
            return "undefined";
        case Blockly.Types.CHILD_BLOCK_MISSING.typeId:
            return "int";
        default:
            return "Invalid Blockly Type"
    }
};
//==================================================================
Blockly.ESP32.noGeneratorCodeInline = function () {
    return ["", Blockly.ESP32.ORDER_ATOMIC]
};
Blockly.ESP32.noGeneratorCodeLine = function () {
    return ""
};
//end
//===================================Generate the code for the logic nodes===============================
// Logic Nodes Code generators
Blockly.ESP32.controls_if = function (a) {
    var b = 0,
        c = Blockly.ESP32.valueToCode(a, "IF" + b, Blockly.ESP32.ORDER_NONE) || "false",
        d = Blockly.ESP32.statementToCode(a, "DO" + b);

    var code = "if (" + c + ") {\n" + d + "}";

    for (b = 1; b <= a.elseifCount_; b++) {
        c = Blockly.ESP32.valueToCode(a, "IF" + b, Blockly.ESP32.ORDER_NONE) || "false";
        d = Blockly.ESP32.statementToCode(a, "DO" + b);

        code += "\nelse if (" + c + ") {\n" + d + "}";
    }

    if (a.elseCount_ > 0) {
        d = Blockly.ESP32.statementToCode(a, "ELSE");

        code += "\nelse {\n" + d + "}";
    }

    return code + "\n"
};
//==========compare logic nodes ===============================
Blockly.ESP32.logic_compare = function (a) {
    var firstBlock = this.getInputTargetBlock("A");
    var secondBlock = this.getInputTargetBlock("B");
    if (firstBlock && secondBlock && !firstBlock.outputConnection.checkType_(secondBlock.outputConnection)) {
        a.setWarningText("Invalid comparison: " + firstBlock.outputConnection.check_[0] + " with " + secondBlock.outputConnection.check_[0] + "!", "logic_compare");
        return [""];
    }
    a.setWarningText(null, "logic_compare");

    var b = {
        EQ: "==",
        NEQ: "!=",
        LT: "<",
        LTE: "<=",
        GT: ">",
        GTE: ">="
    }[a.getFieldValue("OP")];

    var c = "==" == b || "!=" == b ? Blockly.ESP32.ORDER_EQUALITY : Blockly.ESP32.ORDER_RELATIONAL;
    var d = Blockly.ESP32.valueToCode(a, "A", c) || "0";
    a = Blockly.ESP32.valueToCode(a, "B", c) || "0";
    return [d + " " + b + " " + a, c];
};
//====================== convert logic operation into c code =========================
Blockly.ESP32.logic_operation = function (a) {
    var isEspX = Blockly.Blocks.ConnectedBoard === 'ESPX';
    var andValue = isEspX ? "and" : "&&";
    var orValue = isEspX ? "or" : "||";
    var trueValue = isEspX ? "True" : "true";
    var falseValue = isEspX ? "False" : "false";

    var b = "AND" == a.getFieldValue("OP") ? andValue : orValue,
        c = andValue == b ? Blockly.ESP32.ORDER_LOGICAL_AND : Blockly.ESP32.ORDER_LOGICAL_OR,
        d = Blockly.ESP32.valueToCode(a, "A", c) || falseValue;
    a = Blockly.ESP32.valueToCode(a, "B", c) || falseValue;
    if (d || a) {
        var e = andValue == b ? trueValue : falseValue;
        d || (d = e);
        a || (a = e)
    } else a = d = falseValue;
    return [d + " " + b + " " + a, c]
};
//==================== negate or opposite value of a logic node ======================
Blockly.ESP32.logic_negate = function (a) {
    var isEspX = Blockly.Blocks.ConnectedBoard === 'ESPX';
    var negate = isEspX ? "not " : "!";
    var falseValue = isEspX ? "False " : "false";

    var b = Blockly.ESP32.ORDER_UNARY_PREFIX;
    return [negate + (Blockly.ESP32.valueToCode(a, "BOOL", b) || falseValue), b]
};
//=======================================================
Blockly.ESP32.logic_boolean = function (a) {
    var isEspX = Blockly.Blocks.ConnectedBoard === 'ESPX';
    var trueValue = isEspX ? "True" : "true";
    var falseValue = isEspX ? "False" : "false";

    return ["TRUE" == a.getFieldValue("BOOL") ? trueValue : falseValue, Blockly.ESP32.ORDER_ATOMIC]
};
//======================================================
Blockly.ESP32.logic_null = function (a) {
    return ["NULL", Blockly.ESP32.ORDER_ATOMIC]
};
Blockly.ESP32.logic_ternary = function (a) {
    var parentConnection = this.outputConnection.targetConnection;
    var firstBlock = this.getInputTargetBlock("THEN");
    var secondBlock = this.getInputTargetBlock("ELSE");

    var errorMessage = "Invalid operation!";
    var notValid = false;

    if (parentConnection && firstBlock && !parentConnection.checkType_(firstBlock.outputConnection)) {
        if (parentConnection.check_ && firstBlock.outputConnection.check_) {
            errorMessage = "Returning " + firstBlock.outputConnection.check_[0] + " type instead of " + parentConnection.check_[0] + " type!";
        }
        notValid = true;
    }
    else if (parentConnection && secondBlock && !parentConnection.checkType_(secondBlock.outputConnection)) {
        if (parentConnection.check_ && secondBlock.outputConnection.check_) {
            errorMessage = "Returning " + firstBlock.outputConnection.check_[0] + " type instead of " + parentConnection.check_[0] + " type!";
        }
        notValid = true;
    }
    else if (firstBlock && secondBlock && !firstBlock.outputConnection.checkType_(secondBlock.outputConnection)) {
        if (parentConnection && parentConnection.check_ && secondBlock.outputConnection.check_ && firstBlock.outputConnection.check_) {
            errorMessage = "Returning " + firstBlock.outputConnection.check_[0] + "|" + secondBlock.outputConnection.check_[0] + " type instead of " + parentConnection.check_[0] + " type!";
        }
        notValid = true;
    }

    if (notValid) {
        a.setWarningText(errorMessage, "logic_ternary");
        return [""];
    }

    a.setWarningText(null, "logic_ternary");

    var b = Blockly.ESP32.valueToCode(a, "IF", Blockly.ESP32.ORDER_CONDITIONAL) || "false",
        c = Blockly.ESP32.valueToCode(a, "THEN", Blockly.ESP32.ORDER_CONDITIONAL) || "NULL";
    a = Blockly.ESP32.valueToCode(a, "ELSE", Blockly.ESP32.ORDER_CONDITIONAL) || "NULL";
    return [b + " ? " + c + " : " + a, Blockly.ESP32.ORDER_CONDITIONAL]
};
//end
// Customize Blockly code to 'C' - ends