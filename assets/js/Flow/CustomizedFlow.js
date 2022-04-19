//=========================================================
//The definition of the flow set and its functions that can be done by the user, also, get the valuse and configurations done by the user
    //'controls_flow_statements'
    //'customcode'
    //'flow_delay'
    //'flow_repeat'
    //'flow_stop'
    //'waitinput'
//=====================================================================
// Flow code - begins
//========================================= ESP32.flow_statements to get the values chosen by the user =======================
Blockly.ESP32.controls_flow_statements = function (block) {
    if (Blockly.Blocks.ConnectedBoard === 'ESPX') {
        switch (block.getFieldValue("FLOW")) {
            case "BREAK":
                return "\n\tbreak";
            case "CONTINUE":
                return "\n\tcontinue"
        }
        throw "Unknown flow statement.";
    }
    else {
        switch (block.getFieldValue("FLOW")) {
            case "BREAK":
                return "break;\n";
            case "CONTINUE":
                return "continue;\n"
        }
        throw "Unknown flow statement.";
    }
};
//========================================= ESP32.customcode to get the values chosen by the user =======================
Blockly.ESP32.customcode = function (block) {
    var dropdown_option = block.getFieldValue('option');
    var dropdown_type = block.getFieldValue('type');
    var text_content = block.getFieldValue('customCode');

    var code = '';
    if (Blockly.Blocks.ConnectedBoard === 'ESPX') {
        if (dropdown_option == 'COMMENT') {
            if (dropdown_type === "before") {
                code = "\n'''\n" + text_content + "\n'''";
            }
            else {
                code = "\n\t'''\n\t" + text_content.split("\n").join("\n\t") + "\n\t'''";
            }
        }
        else {
            if (dropdown_type === "before") {
                code = '#(Custom code)\n' + text_content + '\n';
            }
            else {
                code = '\n\t#(Custom code)\n\t' + text_content.split("\n").join("\n\t");
            }
        }
    }
    else {
        if (dropdown_option == 'COMMENT') {
            if (dropdown_type === "setup") {
                code += "/* " + text_content.split("\n").join("\n\t") + "*/\n";
            }
            else {
                code = '/* ' + text_content + ' */\n';
            }
        }
        else {
            if (dropdown_type === "setup") {
                code = "/*(Custom code)*/\n\t" + text_content.split("\n").join("\n\t")
            }
            else {
                code = "/*(Custom code)*/\n" + text_content + "\n";
            }
        }
    }

    switch (dropdown_type) {
        case "before":
            Blockly.ESP32.addFunction('custom_code_' + dropdown_option + dropdown_type + text_content, code);
            code = '';
            break;
        case "setup":
            Blockly.ESP32.addSetup('custom_code_' + dropdown_option + dropdown_type + text_content, code);
            code = '';
            break;
    }

    return code;
};
//========================================= ESP32.flow_delay to get the values chosen by the user =======================
Blockly.ESP32.flow_delay = function (block) {
    var dropdown_choice = block.getFieldValue('choice');
    var number_hour = block.getFieldValue('hour');
    var number_min = block.getFieldValue('min');
    var number_sec = block.getFieldValue('sec');
    var number_ms = block.getFieldValue('ms');
    var value_varaible_value = Blockly.ESP32.valueToCode(block, 'variable_value', Blockly.ESP32.ORDER_ATOMIC);

    var code = '';
    if (Blockly.Blocks.ConnectedBoard === 'ESPX') {
        Blockly.ESP32.addInclude('flow_delayEspX', 'import time');
        if (dropdown_choice == 'interval') {
            if (number_hour > 0 || number_min > 0 || number_sec > 0 || number_ms > 0) {
                var totalms = parseInt(number_ms) / 1000 + parseInt(number_sec) + parseInt(number_min) * 60 + parseInt(number_hour) * 60 * 60;
                code = '\n\ttime.sleep(' + totalms + ')';
            } else {
                code = '\n\ttime.sleep(0)';
            }
        } else {
            code = '\n\ttime.sleep(' + value_varaible_value + ')';
        }
    }
    else {
        if (dropdown_choice == 'interval') {
            if (number_hour > 0 || number_min > 0 || number_sec > 0 || number_ms > 0) {
                var duration_value = parseInt(number_hour) * 3600000 + parseInt(number_min) * 60000 + parseInt(number_sec) * 1000 + parseInt(number_ms);
                if (Blockly.isMobile) {
                    code = 'ESP32.DelayEsp(' + duration_value + ');\n';
                } else {
                    code = 'delay(' + duration_value + '); //Delay for ' + number_hour + ' hours ' + number_min + ' mins ' + number_sec + ' sec ' + number_ms + ' ms\n';
                }
            }
            else {
                if (Blockly.isMobile) {
                    code = 'ESP32.DelayEsp(0);\n';
                } else {
                    code = 'delay(0);\n';
                }
            }
        }
        else {
            if (Blockly.isMobile) {
                code = 'ESP32.DelayEsp(' + value_varaible_value + ');\n';
            } else {
                code = 'delay(' + value_varaible_value + ');\n';
            }
        }
    }
    return code;
};
//========================================= ESP32.flow_repeat to get the values chosen by the user =======================
Blockly.ESP32.flow_repeat = function (block) {
    var checkbox_chkforever = block.getFieldValue('chkForever');
    var value_vartimes = Blockly.ESP32.valueToCode(block, 'vartimes', Blockly.ESP32.ORDER_ATOMIC);
    var statements_outputstmt = Blockly.ESP32.statementToCode(block, "OutputStmt");
    statements_outputstmt = Blockly.ESP32.addLoopTrap(statements_outputstmt, block.id);

    var code = '';
    if (Blockly.Blocks.ConnectedBoard === 'ESPX') {
        if (statements_outputstmt != '') {
            var hp = statements_outputstmt.split('\n');
            hp.forEach(function (item) {
                code += '\n\t' + item;
            })
        }

        if (checkbox_chkforever == 'FALSE') {
            return "\n\tfor i in range(" + value_vartimes + "):" + code;
        }
        else {
            return "\n\twhile True:" + code;
        }
    }
    else {
        if (checkbox_chkforever == 'FALSE') {
            var intVar = "int ";
            if (Blockly.isMobile) {
                intVar = "var ";
            }
            var d = Blockly.ESP32.variableDB_.getDistinctName("count", Blockly.Variables.NAME_TYPE),
                e = value_vartimes;
            value_vartimes.match(/^\w+$/) || Blockly.isNumber(value_vartimes) || (e = Blockly.ESP32.variableDB_.getDistinctName("repeat_end", Blockly.Variables.NAME_TYPE), code += intVar + e + " = 0" + value_vartimes + ";\n");

            return code + ("for (" + intVar + d + " = 0; " + d + " < " +
                e + "; " + d + "++) \n{\n" + statements_outputstmt + "}\n")
        }
        else {
            return ("for (;;) \n{\n" + statements_outputstmt + "}\n")
        }
    }
};
//========================================= ESP32.flow_stop to get the values chosen by the user =======================
Blockly.ESP32.flow_stop = function (block) {
    if (Blockly.Blocks.ConnectedBoard === 'ESPX') {
        return '\n\twhile True:\n\t\tpass';
    } else {
        return 'while(1);\n';
    }
};
//========================================= ESP32.waitinput to get the values chosen by the user =======================
Blockly.ESP32.waitinput = function (block) {
    var dropdown_device = block.getFieldValue('device');
    var dropdown_pin2 = block.getFieldValue('Pin');
    var dropdown_rangelimit = block.getFieldValue('RangeLimit');
    var number_sensorrangemin = block.getFieldValue('SensorRangeMin');
    var number_sensorrangemax = block.getFieldValue('SensorRangeMax');
    var dropdown_status = block.getFieldValue('status');
    var dropdown_state = block.getFieldValue('state');
    var dropdown_navigan = block.getFieldValue('remoteButton');
    var dropdown_choice = block.getFieldValue('datatype');
    var text_txtchar = block.getFieldValue('txtchar');
    var dropdown_baudrate = "9600";
    var dropdown_baudrate2 = block.getFieldValue('baudrate');
    var text_txtchar2 = block.getFieldValue('txtchar2');
    var dropdown_state2 = block.getFieldValue('toggleSwitch');

    var code = '';
    if (dropdown_device == 'lightsensor') {
        Blockly.ESP32.reservePin(block, dropdown_pin2, Blockly.ESP32.PinTypes.INPUT, block.type);

        Blockly.ESP32.addInclude('lightsensor', '#define cds(x) analogRead(x)');
        Blockly.ESP32.addSetup("io_" + dropdown_pin2, "pinMode(" + dropdown_pin2 + ", INPUT); //Light Sensor", !1);

        if (isNaN(Number(number_sensorrangemin)) || isNaN(Number(number_sensorrangemax))) {
            block.setWarningText("Invalid Range", "pwm_value");
        }
        else {
            if (Number(number_sensorrangemin) >= Number(number_sensorrangemax)) {
                block.setWarningText("The Sensor Range Min value must be less than Max value", "pwm_value");
            }
            else {
                if (Number(number_sensorrangemin < 0) || Number(number_sensorrangemax > 1023)) {
                    block.setWarningText("The Sensor Range value set must be between 0 and 1023", "pwm_value");
                }
                else {
                    block.setWarningText(null);

                    if (dropdown_rangelimit == 'Inside') {
                        if (Blockly.isMobile) {
                            code = 'while(!(ESP32.ReadEsp("ar ' + Blockly.ESP32.pin_to_number(dropdown_pin2) + '")>=' + number_sensorrangemin + ' && ESP32.ReadEsp("ar ' + Blockly.ESP32.pin_to_number(dropdown_pin2) + '")<=' + number_sensorrangemax + '));\n';
                        } else {
                            code = 'while(!(cds(' + dropdown_pin2 + ')>=' + number_sensorrangemin + ' && cds(' + dropdown_pin2 + ')<=' + number_sensorrangemax + '));\n';
                        }
                    }
                    else {
                        if (Blockly.isMobile) {
                            code = 'while(!(ESP32.ReadEsp("ar ' + Blockly.ESP32.pin_to_number(dropdown_pin2) + '")<=' + number_sensorrangemin + ' && ESP32.ReadEsp("ar ' + Blockly.ESP32.pin_to_number(dropdown_pin2) + '")>=' + number_sensorrangemax + '));\n';
                        } else {
                            code = 'while(!(cds(' + dropdown_pin2 + ')<=' + number_sensorrangemin + '|| cds(' + dropdown_pin2 + ')>=' + number_sensorrangemax + '));\n';
                        }
                    }
                }
            }
        }
    }
    else if (dropdown_device == 'variableresistor') {
        Blockly.ESP32.reservePin(block, dropdown_pin2, Blockly.ESP32.PinTypes.INPUT, block.type);

        Blockly.ESP32.addInclude('resistor', '#define Potentiometer(x) (analogRead(x))');
        Blockly.ESP32.addSetup("io_" + dropdown_pin2, "pinMode(" + dropdown_pin2 + ", INPUT); //Potentiometer", !1);

        if (isNaN(Number(number_sensorrangemin)) || isNaN(Number(number_sensorrangemax))) {
            block.setWarningText("Invalid Range", "pwm_value");
        }
        else {
            if (Number(number_sensorrangemin) >= Number(number_sensorrangemax)) {
                block.setWarningText("The Sensor Range Min value must be less than Max value", "pwm_value");
            }
            else {
                if (Number(number_sensorrangemin < 0) || Number(number_sensorrangemax > 1023)) {
                    block.setWarningText("The Sensor Range value set must be between 0 and 1023", "pwm_value");
                }
                else {
                    block.setWarningText(null);
                    if (dropdown_rangelimit == 'Inside') {
                        if (Blockly.isMobile) {
                            code = 'while(!(ESP32.ReadEsp("ar ' + Blockly.ESP32.pin_to_number(dropdown_pin2) + '")>=' + number_sensorrangemin + ' && ESP32.ReadEsp("ar ' + Blockly.ESP32.pin_to_number(dropdown_pin2) + '")<=' + number_sensorrangemax + '));\n';
                        } else {
                            code = 'while(!(Potentiometer(' + dropdown_pin2 + ')>=' + number_sensorrangemin + ' && Potentiometer(' + dropdown_pin2 + ')<=' + number_sensorrangemax + '));\n';
                        }
                    }
                    else {
                        if (Blockly.isMobile) {
                        } else {
                            code = 'while(!(Potentiometer(' + dropdown_pin2 + ')<=' + number_sensorrangemin + '|| Potentiometer(' + dropdown_pin2 + ')>=' + number_sensorrangemax + '));\n';
                        }
                    }
                }
            }
        }
    }
    else if (dropdown_device == 'IR') {
        Blockly.ESP32.reservePin(block, dropdown_pin2, Blockly.ESP32.PinTypes.INPUT, block.type);

        Blockly.ESP32.addInclude('IR', '#define ir(x) analogRead(x)');
        Blockly.ESP32.addSetup("io_" + dropdown_pin2, "pinMode(" + dropdown_pin2 + ", INPUT); //IR", !1);

        if (isNaN(Number(number_sensorrangemin)) || isNaN(Number(number_sensorrangemax))) {
            block.setWarningText("Invalid Range", "pwm_value");
        }
        else {
            if (Number(number_sensorrangemin) >= Number(number_sensorrangemax)) {
                block.setWarningText("The Sensor Range Min value must be less than Max value", "pwm_value");
            }
            else {
                if (Number(number_sensorrangemin < 0) || Number(number_sensorrangemax > 1023)) {
                    block.setWarningText("The Sensor Range value set must be between 0 and 1023", "pwm_value");
                }
                else {
                    block.setWarningText(null);

                    if (dropdown_rangelimit == 'Inside') {
                        if (Blockly.isMobile) {
                            code = 'while(!(ESP32.ReadEsp("ar ' + Blockly.ESP32.pin_to_number(dropdown_pin2) + '")>=' + number_sensorrangemin + ' && ESP32.ReadEsp("ar ' + Blockly.ESP32.pin_to_number(dropdown_pin2) + '")<=' + number_sensorrangemax + '));\n';
                        } else {
                            code = 'while(!(ir(' + dropdown_pin2 + ')>=' + number_sensorrangemin + ' && ir(' + dropdown_pin2 + ')<=' + number_sensorrangemax + '));\n';
                        }
                    }
                    else {
                        if (Blockly.isMobile) {
                            code = 'while(!(ESP32.ReadEsp("ar ' + Blockly.ESP32.pin_to_number(dropdown_pin2) + '")<=' + number_sensorrangemin + ' && ESP32.ReadEsp("ar ' + Blockly.ESP32.pin_to_number(dropdown_pin2) + '")>=' + number_sensorrangemax + '));\n';
                        } else {
                            code = 'while(!(ir(' + dropdown_pin2 + ')<=' + number_sensorrangemin + '|| ir(' + dropdown_pin2 + ')>=' + number_sensorrangemax + '));\n';
                        }
                    }
                }
            }
        }
    }
    else if (dropdown_device == 'edge') {
        Blockly.ESP32.reservePin(block, dropdown_pin2, Blockly.ESP32.PinTypes.INPUT, block.type);

        if (Blockly.isMobile) {
            dropdown_status = dropdown_status == 'RISING' ? "1" : "0";
            code = '\nwhile(!(ESP32.ReadEsp("ar ' + Blockly.ESP32.pin_to_number(dropdown_pin2) + '")==' + dropdown_status + '));\n';
        } else {
            Blockly.ESP32.addSetup("io_" + dropdown_pin2, "pinMode(" + dropdown_pin2 + ", INPUT); //Edge", !1);
            code = 'while(!(edge(' + dropdown_pin2 + ',' + dropdown_status + ')));\n';
        }
    }
    else if (dropdown_device == 'button') {
        Blockly.ESP32.reservePin(block, dropdown_pin2, Blockly.ESP32.PinTypes.INPUT, block.type);

        if (Blockly.isMobile) {
            dropdown_state = dropdown_state == 'PRESSED' ? "0" : "1";
            code = '\nwhile(!(ESP32.ReadEsp("dr ' + Blockly.ESP32.pin_to_number(dropdown_pin2) + '")==' + dropdown_state + '));\n';
        } else {
            Blockly.ESP32.addSetup("io_" + dropdown_pin2, "pinMode(" + dropdown_pin2 + ", INPUT); //Button", !1);
            code = 'while(!(button(' + dropdown_pin2 + ',' + dropdown_state + ')));\n';
        }
    }
    else if (dropdown_device == 'remote') {
        Blockly.ESP32.reservePin(block, dropdown_pin2, Blockly.ESP32.PinTypes.INPUT, block.type);
        if (Blockly.isMobile) {
            var naviganid;
            switch (dropdown_navigan) {
                case 'FW':
                    naviganid = 13;
                    break;
                case 'BW':
                    naviganid = 31;
                    break;
                case 'R':
                    naviganid = 47;
                    break;
                case 'L':
                    naviganid = 63;
                    break;
                case 'F1':
                    naviganid = 19;
                    break;
                case 'F2':
                    naviganid = 49;
                    break;
                case 'F3':
                    naviganid = 11;
                    break;
                case 'F4':
                    naviganid = 41;
                    break;
                case 'F5':
                    naviganid = 25;
                    break;
                case 'F6':
                    naviganid = 59;
                    break;
                default:
                    naviganid = 13;
                    break;
            }
            code = 'while(!(ESP32.ReadEsp("ir ' + naviganid + '")));\n';
        } else {
            Blockly.ESP32.addSetup("io_" + dropdown_pin2, "pinMode(" + dropdown_pin2 + ", INPUT); //Remote", !1);
            Blockly.ESP32.addVariable('rc' + dropdown_pin2.slice(-1), 'IR rc' + dropdown_pin2.slice(-1) + '(' + dropdown_pin2 + ');', !1);
            code = 'while(!(ir_rc(&rc' + dropdown_pin2.slice(-1) + ',' + dropdown_navigan + ')));\n';
        }
    }
    else if (dropdown_device == 'BluetoothRx') {
        var serial = 'Serial';
        if (dropdown_pin2 == '15') {
            Blockly.ESP32.addSetup("io_" + dropdown_pin2, serial + '.begin(' + dropdown_baudrate + '); //Bluetooth Rx', !1);

            if (dropdown_choice == 'Character') {
                code += 'while(!(isSerCharEqls(&' + serial + ', \'' + text_txtchar.charAt(0) + '\')));\n';
            } else {
                code += 'while(!(isSerStrEqls(&' + serial + ', "' + text_txtchar + '")));\n';
            }
        }
        else {
            Blockly.ESP32.addInclude('bluetoothrx', '#include "SoftwareSerial.h"');
            Blockly.ESP32.addVariable('mybluetoothRx' + dropdown_pin2, 'SoftwareSerial mybluetoothRx' + dropdown_pin2 + '(' + dropdown_pin2 + ',255);', !1);
            Blockly.ESP32.addSetup("io_" + dropdown_pin2, 'mybluetoothRx' + dropdown_pin2 + '.begin(' + dropdown_baudrate + '); ', !1);

            if (dropdown_choice == 'Character') {
                code += 'while(!(isSerCharEqls(&mybluetoothRx' + dropdown_pin2 + ', \'' + text_txtchar.charAt(0) + '\')));\n';
            }
            else {
                code += 'while(!(isSerStrEqls(&mybluetoothRx' + dropdown_pin2 + ',"' + text_txtchar + '")));\n';
            }
        }
    }
    else if (dropdown_device == 'SerialRX') {
        if (dropdown_pin2 == '15') {
            Blockly.ESP32.addSetup("io_" + dropdown_baudrate2, 'Serial.begin(' + dropdown_baudrate2 + '); //Serial Rx', !1);

            if (dropdown_choice == 'character') {
                code += 'while(!(isSerCharEqls(&Serial, \'' + text_txtchar2.charAt(0) + '\')));\n';
            } else {
                code += 'while(!(isSerStrEqls(&Serial, "' + text_txtchar2 + '")));\n';
            }
        }
        else {
            Blockly.ESP32.addInclude('bluetoothrx', '#include "SoftwareSerial.h"');
            Blockly.ESP32.addVariable('mybluetoothRx' + dropdown_pin2, 'SoftwareSerial mybluetoothRx' + dropdown_pin2 + '(' + dropdown_pin2 + ',255);', !1);
            Blockly.ESP32.addSetup("io_" + dropdown_pin2, 'mybluetoothRx' + dropdown_pin2 + '.begin(' + dropdown_baudrate2 + '); ', !1);

            if (dropdown_choice == 'character') {
                code += 'while(!(isSerCharEqls(&mybluetoothRx' + dropdown_pin2 + ', \'' + text_txtchar2.charAt(0) + '\')));\n';
            } else {
                code += 'while(!(isSerStrEqls(&mybluetoothRx' + dropdown_pin2 + ',"' + text_txtchar2 + '")));\n';
            }
        }
    }
    else if (dropdown_device == 'ultrasonoic') {
        Blockly.ESP32.addInclude('ultrasonic', '#define ultrasound(x) ((analogRead(x)*0.833)/4)');
        Blockly.ESP32.addSetup("io_" + dropdown_pin2, "pinMode(" + dropdown_pin2 + ", INPUT); //Ultra Sonic", !1);

        if (isNaN(Number(number_sensorrangemin)) || isNaN(Number(number_sensorrangemax))) {
            block.setWarningText("Invalid Range", "pwm_value");
        }
        else {
            if (Number(number_sensorrangemin) >= Number(number_sensorrangemax)) {
                block.setWarningText("The Sensor Range Min value must be less than Max value", "pwm_value");
            }
            else {
                if (Number(number_sensorrangemin < 0) || Number(number_sensorrangemax > 300)) {
                    block.setWarningText("The Sensor Range value set must be between 0 and 300", "pwm_value");
                }
                else {
                    if (dropdown_rangelimit == 'Inside') {
                        if (Blockly.isMobile) {
                            code = 'while(!(ESP32.ReadEsp("us ' + Blockly.ESP32.pin_to_number(dropdown_pin2) + '")>=' + number_sensorrangemin + ' && ESP32.ReadEsp("us ' + Blockly.ESP32.pin_to_number(dropdown_pin2) + '")<=' + number_sensorrangemax + '));\n';
                        } else {
                            code = 'while(!(ultrasound(' + dropdown_pin2 + ')>=' + number_sensorrangemin + ' && ultrasound(' + dropdown_pin2 + ')<=' + number_sensorrangemax + '));\n';
                        }
                    }
                    else {
                        if (Blockly.isMobile) {
                            code = 'while(!(ESP32.ReadEsp("us ' + Blockly.ESP32.pin_to_number(dropdown_pin2) + '")<=' + number_sensorrangemin + ' && ESP32.ReadEsp("us ' + Blockly.ESP32.pin_to_number(dropdown_pin2) + '")>=' + number_sensorrangemax + '));\n';
                        } else {
                            code = 'while(!(ultrasound(' + dropdown_pin2 + ')<=' + number_sensorrangemin + '|| ultrasound(' + dropdown_pin2 + ')>=' + number_sensorrangemax + '));\n';
                        }
                    }
                }
            }

        }
    }
    else if (dropdown_device == 'soundsensor') {
        Blockly.ESP32.reservePin(block, dropdown_pin2, Blockly.ESP32.PinTypes.INPUT, block.type);
        Blockly.ESP32.addInclude('sound_sensor', '#define soundLevel(x) ((analogRead(x)-600)/424)');
        Blockly.ESP32.addSetup("io_" + dropdown_pin2, "pinMode(" + dropdown_pin2 + ", INPUT); //Sound Sensor", !1);

        if (dropdown_rangelimit == 'Inside') {
            if (Blockly.isMobile) {
                code = 'while(!(ESP32.ReadEsp("mi ' + Blockly.ESP32.pin_to_number(dropdown_pin2) + '")>=' + number_sensorrangemin + ' && ESP32.ReadEsp("mi ' + Blockly.ESP32.pin_to_number(dropdown_pin2) + '")<=' + number_sensorrangemax + '));\n';
            } else {
                code = 'while(!(soundLevel(' + dropdown_pin2 + ')>=' + number_sensorrangemin + ' && soundLevel(' + dropdown_pin2 + ')<=' + number_sensorrangemax + '));\n';
            }
        }
        else {
            if (Blockly.isMobile) {
                code = 'while(!(ESP32.ReadEsp("mi ' + Blockly.ESP32.pin_to_number(dropdown_pin2) + '")<=' + number_sensorrangemin + ' && ESP32.ReadEsp("mi ' + Blockly.ESP32.pin_to_number(dropdown_pin2) + '")>=' + number_sensorrangemax + '));\n';
            } else {
                code = 'while(!(soundLevel(' + dropdown_pin2 + ')<=' + number_sensorrangemin + ' || soundLevel(' + dropdown_pin2 + ')>=' + number_sensorrangemax + '));\n';
            }
        }
    }
    else if (dropdown_device == 'slidenode') {
        Blockly.ESP32.addSetup("slide_switch1", "pinMode(16, INPUT_PULLUP); //Slide Switches", !1);
        Blockly.ESP32.addSetup("slide_switch2", "pinMode(17, INPUT_PULLUP); //Slide Switches", !1);
        Blockly.ESP32.addSetup("slide_switch3", "pinMode(18, INPUT_PULLUP); //Slide Switches", !1);

        var items = dropdown_state2.replace(/ /g, "").split(",");
        var switch1 = Blockly.isMobile ? "0" : "digitalRead(18)";
        var switch2 = Blockly.isMobile ? "0" : "digitalRead(17)";
        var switch3 = Blockly.isMobile ? "0" : "digitalRead(16)";

        if (items[0].trim() === "UP") {
            Blockly.isMobile ? switch3 = "1" : switch1 = "!digitalRead(18)";
        }
        if (items[1].trim() === "UP") {
            switch2 = Blockly.isMobile ? "1" : "!digitalRead(17)";
        }
        if (items[2].trim() === "UP") {
            Blockly.isMobile ? switch1 = "1" : switch3 = "!digitalRead(16)";
        }

        if (Blockly.isMobile) {
            var binary = switch1 + switch2 + switch3;
            code = 'while(!(ESP32.ReadEsp("DIP") == ' + parseInt(binary, 2) + '));\n';
        } else {
            code = 'while(!(' + switch1 + ' && ' + switch2 + ' && ' + switch3 + '));\n';
        }
    }
    return code;
};
// Flow code - ends
