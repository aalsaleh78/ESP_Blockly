//=========================================================
//The definition of the logic set and its functions that can be done by the user, also, get the valuse and configurations done by the user
    //'controls_if'
    //'logic_compare'
    //'logic_operation'
    //'logic_negate'
    //'logic_boolean'
    //'logic_null'
    //'logic_ternary'
//=====================================================================
// Logic code - begins
//========================================= ESP32.controls_if to get the values chosen by the user =======================
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
//========================================= ESP32.logic_compare to get the values chosen by the user =======================
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
//========================================= ESP32.logic_operation to get the values chosen by the user =======================
Blockly.ESP32.logic_operation = function (a) {
    var isESP32X = Blockly.Blocks.ConnectedBoard === 'ESP32X';
    var andValue = isESP32X ? "and" : "&&";
    var orValue = isESP32X ? "or" : "||";
    var trueValue = isESP32X ? "True" : "true";
    var falseValue = isESP32X ? "False" : "false";

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
//========================================= ESP32.logic_negate to get the values chosen by the user =======================
Blockly.ESP32.logic_negate = function (a) {
    var isESP32X = Blockly.Blocks.ConnectedBoard === 'ESP32X';
    var negate = isESP32X ? "not " : "!";
    var falseValue = isESP32X ? "False " : "false";

    var b = Blockly.ESP32.ORDER_UNARY_PREFIX;
    return [negate + (Blockly.ESP32.valueToCode(a, "BOOL", b) || falseValue), b]
};
//========================================= ESP32.logic_boolean to get the values chosen by the user =======================
Blockly.ESP32.logic_boolean = function (a) {
    var isESP32X = Blockly.Blocks.ConnectedBoard === 'ESP32X';
    var trueValue = isESP32X ? "True" : "true";
    var falseValue = isESP32X ? "False" : "false";

    return ["TRUE" == a.getFieldValue("BOOL") ? trueValue : falseValue, Blockly.ESP32.ORDER_ATOMIC]
};
//========================================= ESP32.logic_null to get the values chosen by the user =======================
Blockly.ESP32.logic_null = function (a) {
    return ["NULL", Blockly.ESP32.ORDER_ATOMIC]
};
//========================================= ESP32.logic_ternary to get the values chosen by the user =======================
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
// Logic code - ends

