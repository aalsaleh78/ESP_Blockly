//=========================================================
//The definition of the array set and its blocks. it also defines the components of each block (the panel, options, values, etc..)
//'array_node'
//'access_elements'
//====================================================================
// Arrays code - begins
//========================================= ESP32.array_node to get the values chosen by the user =======================
Blockly.ESP32.array_node = function (block) {
    var dropdown_panel2dropdown = block.getFieldValue('Panel2DropDown');
    var variable_arraydropdwn = Blockly.ESP32.variableDB_.getName(block.getFieldValue('varitem'), Blockly.Arrays.NAME_TYPE);
    var varValue1_value = Blockly.ESP32.valueToCode(block, "varValue1", Blockly.ESP32.ORDER_ASSIGNMENT) || "0";
    var varValue2_value = Blockly.ESP32.valueToCode(block, "varValue2", Blockly.ESP32.ORDER_ASSIGNMENT) || "0";

    var code = '';
    // console.log(dropdown_panel2dropdown);
    // console.log(variable_arraydropdwn);
    // console.log(varValue1_value);
    // console.log(varValue2_value);
    if (dropdown_panel2dropdown == 'Variable') {
        code = variable_arraydropdwn + "[" + varValue1_value + "]" + " = " + varValue2_value + ";\n";
    }
    else {
        code = variable_arraydropdwn + "[" + dropdown_panel2dropdown + "]" + " = " + varValue2_value + ";\n";
    }
    // console.log(code)
    return code
};
//========================================= ESP32.access_elements to get the values of the elements chosen by the user =======================
Blockly.ESP32.access_elements = function (block) {
    var dropdown_panel1dropdown = block.getFieldValue('dropdwn');

    var variable_arraydropdwn = Blockly.ESP32.variableDB_.getName(block.getFieldValue('varitem'), Blockly.Arrays.NAME_TYPE);
    var b = Blockly.ESP32.valueToCode(block, "varValue", Blockly.ESP32.ORDER_ASSIGNMENT) || "0";

    var code;
    if (dropdown_panel1dropdown == "Variable") {
        code = variable_arraydropdwn + "[" + b + "]";
    }
    else {
        code = variable_arraydropdwn + "[" + dropdown_panel1dropdown + "]";
    }

    return [code, Blockly.ESP32.ORDER_ATOMIC];
};
// Arrays code - ends

