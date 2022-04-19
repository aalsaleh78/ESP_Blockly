//=========================================================
//The definition of the Text set and its functions that can be selected by the user, also, get the valuse and text operations done by the user
    //'text_input'
    //'assign_text'
    //'append_text'
    //'substring_text'
    //'length_of'
    //'text_indexOfItem'
    //'text_to_variable'
    //'text_variable'
    //'variable_to_text'
//=====================================================================
// Text code - begins
//========================================= ESP32.assign_text to give the values to text =======================
Blockly.ESP32.assign_text = function (block) {
    var b = Blockly.ESP32.valueToCode(block, "TEXT", Blockly.ESP32.ORDER_ASSIGNMENT) || '""';
    var varName_value = block.getField("VAR").variable_.name;
    var code = varName_value + ' = ' + b + ';\n';
    Blockly.Workspace.prototype.createText(varName_value, "");

    return code;
};
//========================================= ESP32.text_input to get the values entered by the user =======================
Blockly.ESP32.text_input = function (block) {
    var code = block.getFieldValue("TEXT");

    return ['"' + code + '"', Blockly.ESP32.ORDER_ATOMIC]
};
//========================================= ESP32.append_text to get the values appended by the user =======================
Blockly.ESP32.append_text = function (block) {
    var b = Blockly.ESP32.valueToCode(block, "TEXT", Blockly.ESP32.ORDER_ASSIGNMENT) || '""';
    var varName_value = block.getField("VAR").variable_.name;
    var code = varName_value + ' += ' + b + ';\n';
    // var code = Blockly.ESP32.variableDB_.getName(block.getFieldValue("VAR"), Blockly.Variables.NAME_TYPE) + ' += ' + b + ';\n';

    return code;
};
//========================================= ESP32.substring_text to get sub string by user index =======================
Blockly.ESP32.substring_text = function (block) {
    var varfrom = Blockly.ESP32.valueToCode(block, 'Fromblock', Blockly.ESP32.ORDER_ATOMIC) || 0;
    var varTo = Blockly.ESP32.valueToCode(block, 'Toblock', Blockly.ESP32.ORDER_ATOMIC) || 0;
    // var textname = block.getFieldValue("VAR");
    var textname = block.getField("VAR").variable_.name;
    var code = textname + '.substring(' + varfrom + ',' + varTo + ')';

    return [code, Blockly.ESP32.ORDER_ATOMIC]
};
//========================================= ESP32.length_of to get the length of a text by the user =======================
Blockly.ESP32.length_of = function (block) {
    // var textname = block.getFieldValue("VAR");
    var textname = block.getField("VAR").variable_.name;
    var code = textname + '.length()';

    return [code, Blockly.ESP32.ORDER_ATOMIC]
};
//========================================= ESP32.text_indexOfItem to get the index of an item chosen by the user =======================
Blockly.ESP32.text_indexOfItem = function (block) {
    // var textname = block.getFieldValue("VAR");
    var textname = block.getField("VAR").variable_.name;
    var textvalue = block.getFieldValue("TEXT");
    var code = textname + '.indexOf("' + textvalue + '")';

    return [code, Blockly.ESP32.ORDER_ATOMIC]
};
//========================================= ESP32.text_to_variable to convert a text chosen by the user to Int value =======================
Blockly.ESP32.text_to_variable = function (block) {
    // var textname = block.getFieldValue("VAR");
    var textname = block.getField("VAR").variable_.name;
    var code = textname + '.toInt()';

    return [code, Blockly.ESP32.ORDER_ATOMIC]
};
//========================================= ESP32.variable_to_text to convert a value chosen by the user into Text =======================
Blockly.ESP32.variable_to_text = function (block) {
    // var varname = block.getFieldValue("varName");
    var varname = block.getField("varName").variable_.name;
    var code = 'String(' + varname + ')';

    return [code, Blockly.ESP32.ORDER_ATOMIC]
};
//========================================= ESP32.text_variable to get the name of a text chosen by the user =======================
Blockly.ESP32.text_variable = function (block) {
    // var code = block.getFieldValue("VAR");
    var code = block.getField("VAR").variable_.name;
    return [code, Blockly.ESP32.ORDER_ATOMIC]
};
// Text code - ends
