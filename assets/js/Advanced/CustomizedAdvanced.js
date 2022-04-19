//=========================================================
//The definition of the advanced set and its functions that can be done by the user, also, get the valuse and configurations done by the user
//'inputreading_digital'
//'inputreading_analog'
//'digital_write'
//'analog_write'
//'digital_read'
//'analog_read'
//'tone'
//'bluetooth_connect'
//'bluetooth_rename'
//'bluetooth_disconnect'
//=====================================================================
// Advanced code - begins
//========================================= ESP32.inputreading_digital to get the values chosen by the user =======================
Blockly.ESP32.inputreading_digital = function (block) {
    var dropdown_pin = block.getFieldValue('Pin');
    var code = 'digitalRead(' + dropdown_pin + ')';
    if (Blockly.isMobile) {
        code = 'ESP32.ReadESP32("dr ' + Blockly.ESP32.pin_to_number(dropdown_pin) + '")';
    }
    return [code, Blockly.ESP32.ORDER_ATOMIC];
};
//========================================= ESP32.inputreading_analog to get the values chosen by the user =======================
Blockly.ESP32.inputreading_analog = function (block) {
    var dropdown_pin = block.getFieldValue('Pin');
    var code = 'analogRead(' + dropdown_pin + ')';
    if (Blockly.isMobile) {
        code = 'ESP32.ReadESP32("ar ' + Blockly.ESP32.pin_to_number(dropdown_pin) + '")';
    }
    return [code, Blockly.ESP32.ORDER_ATOMIC];
};
//========================================= ESP32.digital_write to get the values chosen by the user =======================
Blockly.ESP32.digital_write = function (block) {
    var dropdown_pin = block.getFieldValue('Pin');
    var dropdown_datatype = block.getFieldValue('datatype');
    var dropdown_status = block.getFieldValue('status');
    var variable_Value = Blockly.ESP32.valueToCode(block, 'varValue', Blockly.ESP32.ORDER_ATOMIC);

    Blockly.ESP32.addSetup("io_" + dropdown_pin, "pinMode(" + dropdown_pin + ", OUTPUT);", !1);
    //===================== get the values based on user's choices ============================
    var code = "";
    if (dropdown_datatype == 'Variable') {
        if (Blockly.isMobile) {
            code = 'ESP32.WriteESP32("dw ' + dropdown_pin + ' "+' + variable_Value + '+"");\n';
        } else {
            code = 'digitalWrite(' + dropdown_pin + ',' + variable_Value + ');\n';
        }
    }
    else {
        if (dropdown_status == 'HIGH') {
            if (Blockly.isMobile) {
                code = 'ESP32.WriteESP32("dw ' + dropdown_pin + ' 1");\n';
            } else {
                code = 'digitalWrite(' + dropdown_pin + ',1);\n';
            }
        }
        else {
            if (Blockly.isMobile) {
                code = 'ESP32.WriteESP32("dw ' + dropdown_pin + ' 0");\n';
            } else {
                code = 'digitalWrite(' + dropdown_pin + ',0);\n';
            }
        }
    }
    return code;
};
//========================================= ESP32.digital_read to get the values chosen by the user =======================
Blockly.ESP32.digital_read = function (block) {
    var dropdown_pin = block.getFieldValue('Pin');
    var dropdown_state = block.getFieldValue('state');
    var statements_outputstmt = Blockly.ESP32.statementToCode(block, 'OutputStmt');
    Blockly.ESP32.reservePin(block, dropdown_pin, Blockly.ESP32.PinTypes.INPUT, block.type);

    Blockly.ESP32.addSetup("io_" + dropdown_pin, "pinMode(" + dropdown_pin + ", INPUT);", !1);

    var code = '\n';
    if (dropdown_state == 'HIGH') {
        if (Blockly.isMobile) {
            code = '\nif(ESP32.ReadESP32("dr ' + Blockly.ESP32.pin_to_number(dropdown_pin) + '")==1)\n{\n' + statements_outputstmt + '\n}\n';
        } else {
            code = '\nif(digitalRead(' + dropdown_pin + ')==1)\n{\n' + statements_outputstmt + '\n}\n';
        }
    } else {
        if (Blockly.isMobile) {
            code = '\nif(ESP32.ReadESP32("dr ' + Blockly.ESP32.pin_to_number(dropdown_pin) + '")==0)\n{\n' + statements_outputstmt + '\n}\n';
        } else {
            code = '\nif(digitalRead(' + dropdown_pin + ')==0)\n{\n' + statements_outputstmt + '\n}\n';
        }
    }
    return code;
};
//========================================= ESP32.analog_read to get the values chosen by the user =======================
Blockly.ESP32.analog_read = function (block) {
    var dropdown_pin = block.getFieldValue('Pin');
    var dropdown_rangelimit = block.getFieldValue('RangeLimit');
    var number_sensorrangemin = block.getFieldValue('SensorRangeMin');
    var number_sensorrangemax = block.getFieldValue('SensorRangeMax');
    var statements_outputstmt = Blockly.ESP32.statementToCode(block, 'OutputStmt');
    Blockly.ESP32.reservePin(block, dropdown_pin, Blockly.ESP32.PinTypes.INPUT, block.type);

    Blockly.ESP32.addSetup("io_" + dropdown_pin, "pinMode(" + dropdown_pin + ", INPUT);", !1);

    var code = '';
    if (isNaN(Number(number_sensorrangemin)) || isNaN(Number(number_sensorrangemax))) {
        block.setWarningText("Invalid Range", "pwm_value");
    } else {
        if (Number(number_sensorrangemin) >= Number(number_sensorrangemax)) {
            block.setWarningText("The Sensor Range Min value must be less than Max value", "pwm_value");
        } else {
            if (Number(number_sensorrangemin < 0) || Number(number_sensorrangemax > 1023)) {
                block.setWarningText("The Sensor Range value set must be between 0 and 1023", "pwm_value");
            } else {
                if (dropdown_rangelimit == 'Inside') {
                    if (Blockly.isMobile) {
                        code = 'if(ESP32.ReadESP32("ar ' + Blockly.ESP32.pin_to_number(dropdown_pin) + '")>=' + number_sensorrangemin + ' && ESP32.ReadESP32("ar ' + Blockly.ESP32.pin_to_number(dropdown_pin) + '")<=' + number_sensorrangemax + ')\n{\n' + statements_outputstmt + '\n}\n';
                    } else {
                        code = 'if(analogRead(' + dropdown_pin + ')>=' + number_sensorrangemin + ' && analogRead(' + dropdown_pin + ')<=' + number_sensorrangemax + ')\n{\n' + statements_outputstmt + '\n}\n';
                    }
                }
                else {
                    if (Blockly.isMobile) {
                        code = 'if(ESP32.ReadESP32("ar ' + Blockly.ESP32.pin_to_number(dropdown_pin) + '")<=' + number_sensorrangemin + ' && ESP32.ReadESP32("ar ' + Blockly.ESP32.pin_to_number(dropdown_pin) + '")>=' + number_sensorrangemax + ')\n{\n' + statements_outputstmt + '}\n';
                    } else {
                        code = 'if(analogRead(' + dropdown_pin + ')<=' + number_sensorrangemin + ' || analogRead(' + dropdown_pin + ')>=' + number_sensorrangemax + ')\n{\n' + statements_outputstmt + '}\n';
                    }
                }
            }
        }
    }
    return code;
};
//========================================= ESP32.analog_write to get the values chosen by the user =======================
Blockly.ESP32.analog_write = function (block) {
    var dropdown_pin = block.getFieldValue('Pin');
    var variable_Value = Blockly.ESP32.valueToCode(block, 'varValue', Blockly.ESP32.ORDER_ATOMIC);
    if (dropdown_pin == '9' && !Blockly.isMobile) {
        dropdown_pin = 'ESP32_led_pin';
    }

    Blockly.ESP32.addSetup("io_" + dropdown_pin, "pinMode(" + dropdown_pin + ", OUTPUT);", !1);

    var code = "";
    if (Blockly.isMobile) {
        code = 'ESP32.WriteESP32("aw ' + dropdown_pin + ' "+' + variable_Value + '+"");\n';
    } else {
        code = 'analogWrite(' + dropdown_pin + ',' + variable_Value + ');\n';
    }
    return code;
};
//========================================= ESP32.tone to get the values chosen by the user =======================
Blockly.ESP32.tone = function (block) {
    var dropdown_pin = block.getFieldValue('Pin');
    var isMute = block.getFieldValue('muteValue') === "mute";
    var dropdown_frequency = block.getFieldValue('frequency');
    var number_duration = block.getFieldValue('duration');
    var variable_Frequency = Blockly.ESP32.valueToCode(block, 'varFrequency', Blockly.ESP32.ORDER_ATOMIC);
    Blockly.ESP32.reservePin(block, dropdown_pin, Blockly.ESP32.PinTypes.OUTPUT, "buzzer");

    if (Blockly.isMobile) {
        if (isNaN(parseInt(variable_Frequency, 10))) {
            variable_Frequency = '"+' + variable_Frequency + '+"';
        }
    }

    var code = '\n';
    //==================== get the values from user selects baesd on the frequency ======================
    Blockly.ESP32.addSetup("io_" + dropdown_pin, "pinMode(" + dropdown_pin + ", OUTPUT);", !1);
    if (!isMute) {
        if (dropdown_frequency == 1000) {
            if (Blockly.isMobile) {
                code = 'ESP32.WriteESP32("tn ' + Blockly.ESP32.pin_to_number(dropdown_pin) + ' ' + variable_Frequency + ' ' + number_duration + '");\n';
            } else {
                code = 'tone(' + dropdown_pin + ', ' + variable_Frequency + ', ' + number_duration + ');\n';
            }
        }
        else {
            if (Blockly.isMobile) {
                code = 'ESP32.WriteESP32("tn ' + Blockly.ESP32.pin_to_number(dropdown_pin) + ' ' + dropdown_frequency + ' ' + number_duration + '");\n';
            } else {
                code = 'tone(' + dropdown_pin + ', ' + dropdown_frequency + ', ' + number_duration + ');\n';
            }
        }
    }
    else {
        if (Blockly.isMobile) {
            code = 'ESP32.WriteESP32("tn ' + Blockly.ESP32.pin_to_number(dropdown_pin) + ' 0 1");\n';
        } else {
            code = 'noTone(' + dropdown_pin + ');\n';
        }
    }
    return code;
};
//========================================= ESP32.bluetooth_rename to get the values renamed by the user =======================
Blockly.ESP32.bluetooth_rename = function (block) {
    var bluetooth_name = block.getFieldValue('blueooth_name');
    Blockly.ESP32.addSetup("bluetooth_baud", "Serial1.begin(9600); ", !1);

    return '\nsetBluetoothName("' + bluetooth_name + '",' + Blockly.Blocks.ConnectedBoard.replace("_", "") + ');';
};
//========================================= ESP32.bluetooth_connect to get the values chosen by the user =======================
Blockly.ESP32.bluetooth_connect = function (block) {
    var bluetooth_name = block.getFieldValue('blueooth_name');
    Blockly.ESP32.addSetup("bluetooth_baud", "Serial1.begin(9600); ", !1);

    return '\nconnectBluetoothTo("' + bluetooth_name + '",' + Blockly.Blocks.ConnectedBoard.replace("_", "") + ');';
};
//========================================= ESP32.bluetooth_disconnect to get the values chosen by the user =======================
Blockly.ESP32.bluetooth_disconnect = function (block) {
    Blockly.ESP32.addSetup("bluetooth_baud", "Serial1.begin(9600); ", !1);

    return '\ndisconnectBluetooth(' + Blockly.Blocks.ConnectedBoard.replace("_", "") + ');';
};
// Advanced code - ends
