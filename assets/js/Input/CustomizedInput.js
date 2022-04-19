//================================================================
//this code define the input blocks at input set
// the input set contains Blockly.ESP32 blocks
    //'bluetoothrx'
    //'button'
    //'remote'
    //'IR'
    //'lightsensor'
    //'resistor'
    //'serialrx'
    //'temperature'
    //'touch_Pade'
    //'ultrasonic'
    //'custominput'
//===============================================================
// Input code - begins

/* Blockly.ESP32.bluetoothrx = function (block) {
var dropdown_pin = block.getFieldValue('Pin');
var dropdown_choice = block.getFieldValue('datatype');
var text_txtchar = block.getFieldValue('txtchar');
var statements_outputstmt = Blockly.ESP32.statementToCode(block, 'OutputStmt');
    
Blockly.ESP32.reservePin(block, dropdown_pin, Blockly.ESP32.PinTypes.INPUT, block.type);

var code = '';
var serial = 'Serial';
    
Blockly.ESP32.addInclude('bluetoothrx', `<span class='codeHeader'>#include "BluetoothSerial.h"</span>`);
Blockly.ESP32.addVariable('mybluetoothRx15' + dropdown_pin, `\nvoid Bluetooth_Task (void *parameter);\nTaskHandle_t Task_BLUET_Handle;\n\nBluetoothSerial SerialBT;`, !1);
// Blockly.ESP32.addVariable('mybluetoothRx' + dropdown_pin, 'SoftwareSerial mybluetoothRx' + dropdown_pin + '(' + dropdown_pin + ',255);', !1);
Blockly.ESP32.addSetup("io_" + dropdown_pin, `<span class='ml-tab1'>SerialBT.begin("ESP32_Blutooth");</span>  <br><span class='ml-tab1'>pinMode(${dropdown_pin == 15 ? 'BT_TSK_LED' : dropdown_pin}, OUTPUT);//BT_TSK_LED selected pin on which bluetooth is attached, functionality of ping(OUTPUT)</span> <br><span class='ml-tab1'>xTaskCreate(Bluetooth_Task, "BLUE_TASK",2524,NULL,1,&Task_BLUET_Handle);</span>`, !1);
// Blockly.ESP32.addSetup("io_" + dropdown_pin, serial + '.begin(' + dropdown_baudrate + '); //Bluetooth Rx', !1);
   
let bluetoothData = dropdown_choice == 'Character' ? "'" + text_txtchar.charAt(0) + "'" : '"' + text_txtchar + '"';

var codeHeader = `<br>// the below seggregation of tasks are required for FreeRTOS capablitites
<span class='codeKeyword'>void </span><span class='codeMethod'>IRAM_ATTR Bluetooth_Task</span>(void *parameter)
{
<span class='ml-tab1'>while(1)</span>
<span class='ml-tab1'>{</span>
<span class='ml-tab2'>RunIndicator();</span>
<span class='ml-tab2'>//cheack the blutooth is connected </span>
<span class='ml-tab2'>if (SerialBT.available())</span>
<span class='ml-tab2'>{</span>
<span class='ml-tab3'>Bluetooth_data = SerialBT.read(); // Bluetooth_data data is the data received from the bt device</span>
<span class='ml-tab3'>//start sending data to the mobile</span>
<span class='ml-tab3'>SerialBT.write(Bluetooth_data);</span>
<span class='ml-tab3'>//update the bluetooth data with the received data</span>
<span class='ml-tab2'>}</span>`;

var codeFooter = `\n<span class='ml-tab2'>vTaskDelay(100/portTICK_PERIOD_MS);</span>
<span class='ml-tab1'>}</span>
}\n`;

code = `\n<span class='ml-tab2'>if(Bluetooth_data == ${bluetoothData}) // 'A' represents the character to be compared , equivelent text comparision should be added</span>
<span class='ml-tab2'>{</span>
<span class='ml-tab3'>digitalWrite(BT_TSK_LED,HIGH);</span>${statements_outputstmt == '' ? '' : "<div class='ml-tab3'>" + statements_outputstmt + "</div>"}
<span class='ml-tab2'>}</span>`;

for (var b = 1; b <= block.elseifCount_; b++) {
var dropdown_pinELSEIF = block.getFieldValue('PinELSEIF' + b);
var dropdown_baudrateELSEIF = "9600";
var dropdown_choiceELSEIF = block.getFieldValue('datatypeELSEIF' + b);
var text_txtcharELSEIF = block.getFieldValue('txtcharELSEIF' + b);
var elseifcode = Blockly.ESP32.statementToCode(block, "varelseifblock" + b);
Blockly.ESP32.reservePin(block, dropdown_pinELSEIF, Blockly.ESP32.PinTypes.INPUT, block.type);

let bluetoothData = dropdown_choiceELSEIF == 'Character' ? "'" + text_txtcharELSEIF.charAt(0) + "'" : '"' + text_txtcharELSEIF + '"';
code += `\n<span class='ml-tab2'>else if(Bluetooth_data == ${bluetoothData}) // 'A' represents the character to be compared , equivelent text comparision should be added</span>
<span class='ml-tab2'>{</span>
<span class='ml-tab3'>digitalWrite(BT_TSK_LED,HIGH);</span>${elseifcode == '' ? '' : "<div class='ml-tab3'>" + elseifcode + "</div>"}
<span class='ml-tab2'>}</span>`;
}

for (var b = 1; b <= block.elseCount_; b++) {
var elsecode = Blockly.ESP32.statementToCode(block, "varelseblock" + b);
if (elsecode.trim().substring(0, 2) == "if") {
code += "else" + elsecode;
} else {
code += `\n<span class='ml-tab2'>else</span>\n<span class='ml-tab2'>{</span>\n ${elsecode == '' ? '' : "<div class='ml-tab3'>" + elsecode + "</div>"} <span class='ml-tab2'>}</span>\n`;
}
}
return codeHeader + code + codeFooter;
};
Blockly.ESP32.button = function (block) {
var dropdown_pin = block.getFieldValue('Pin');
var dropdown_state = block.getFieldValue('state');
var statements_outputstmt = Blockly.ESP32.statementToCode(block, 'OutputStmt');
Blockly.ESP32.reservePin(block, dropdown_pin, Blockly.ESP32.PinTypes.INPUT, block.type);

var code = '';
Blockly.ESP32.addVariable('button', `\nTaskHandle t Task_Handle_1;`, !1);
    
var codeHeader = `\n<span class='codeKeyword'>void </span><span class='codeMethod'>IRAM_ATTR Task1</span>(void *parameter)
{
<span class='ml-tab1'>while(1)</span>
<span class='ml-tab1'>{</span>\n`;

var codeFooter = `\n<span class='ml-tab2'>if (ButtonPressed == true)</span>
<span class='ml-tab2'>{</span>\n
<span class='ml-tab2'>}</span>
<span class='ml-tab1'>}</span>
}\n`;

Blockly.ESP32.addSetup("io_" + dropdown_pin, `<span class='ml-tab1'>pinMode(${dropdown_pin}, INPUT);</span>
<span class='ml-tab1'>xTaskCreate(Taskl "TASK1",1024,NULL,1,&Task_Handle_1);</span>`, !1);

if (block.andCount_ || block.orCount_) {
dropdown_state = dropdown_state == 'PRESSED' ? '0' : '1';
code = `<span class='ml-tab2'>if((digitalRead(${dropdown_pin}) == ${dropdown_state})`;

for (var a = 1; a <= this.andCount_; a++) {
var dropdown_pinAND = block.getFieldValue('PinAND' + a);
var dropdown_stateAND = block.getFieldValue('stateAND' + a);
Blockly.ESP32.reservePin(block, dropdown_pinAND, Blockly.ESP32.PinTypes.INPUT, block.type);

Blockly.ESP32.addSetup("io_" + dropdown_pinAND, "<span class='ml-tab1'>pinMode(" + dropdown_pinAND + ", INPUT);</span>", !1);

dropdown_stateAND = dropdown_stateAND == 'PRESSED' ? '0' : '1';
code += ` && (digitalRead(${dropdown_pinAND}) == ${dropdown_stateAND})`;
}

for (var a = 1; a <= this.orCount_; a++) {
var dropdown_pinOR = block.getFieldValue('PinOR' + a);
var dropdown_stateOR = block.getFieldValue('stateOR' + a);
Blockly.ESP32.reservePin(block, dropdown_pinOR, Blockly.ESP32.PinTypes.INPUT, block.type);

Blockly.ESP32.addSetup("io_" + dropdown_pinOR, "<span class='ml-tab1'>pinMode(" + dropdown_pinOR + ", INPUT);</span>", !1);

dropdown_stateOR = dropdown_stateOR == 'PRESSED' ? '0' : '1';
code += ` || (digitalRead(${dropdown_pinOR}) == ${dropdown_stateOR})`;
}

code += `)</span>
<span class='ml-tab2'>{</span>
<span class='ml-tab3'>viaskDelav(50/portTICK PERIOD MS);</span>
<span class='ml-tab3'>ButtonPressed = true;</span>${statements_outputstmt == '' ? '' : "<div class='ml-tab3'>" + statements_outputstmt + "</div>"}
<span class='ml-tab2'>}</span>`;
}
else {
dropdown_state = dropdown_state == 'PRESSED' ? '0' : '1';
code += `<span class='ml-tab2'>if(digitalRead(${dropdown_pin}) == ${dropdown_state})</span>
<span class='ml-tab2'>{</span>
<span class='ml-tab3'>viaskDelav(50/portTICK PERIOD MS);</span>
<span class='ml-tab3'>ButtonPressed = true;</span>${statements_outputstmt == '' ? '' : "<div class='ml-tab3'>" + statements_outputstmt + "</div>"}
<span class='ml-tab2'>}</span>`;
}

for (var b = 1; b <= block.elseifCount_; b++) {
var dropdown_pinELSEIF = block.getFieldValue('PinELSEIF' + b);
var dropdown_stateELSEIF = block.getFieldValue('stateELSEIF' + b);
var elseifcode = Blockly.ESP32.statementToCode(block, "varelseifblock" + b);
Blockly.ESP32.reservePin(block, dropdown_pinELSEIF, Blockly.ESP32.PinTypes.INPUT, block.type);

Blockly.ESP32.addSetup("io_" + dropdown_pinELSEIF, "<span class='ml-tab1'>pinMode(" + dropdown_pinELSEIF + ", INPUT);</span>", !1);

dropdown_stateELSEIF = dropdown_stateELSEIF == 'PRESSED' ? '0' : '1';
// code += '\nelse if(button(' + dropdown_pinELSEIF + ',' + dropdown_stateELSEIF + '))\n{';

code += `\n<span class='ml-tab2'>else if(digitalRead(${dropdown_pinELSEIF}) == ${dropdown_stateELSEIF})</span>\n`;

// code += '\n' + elseifcode + '}\n'
code += `<span class='ml-tab2'>{</span>
<span class='ml-tab3'>viaskDelav(50/portTICK PERIOD MS);</span>
<span class='ml-tab3'>ButtonPressed = true;</span>${elseifcode == '' ? '' : "<div class='ml-tab3'>" + elseifcode + "</div>"}
<span class='ml-tab2'>}</span>`;
}

for (var b = 1; b <= block.elseCount_; b++) {
var elsecode = Blockly.ESP32.statementToCode(block, "varelseblock" + b);
if (elsecode.trim().substring(0, 2) == "if") {
code += "else" + elsecode;
} else {
code += "\n<span class='ml-tab2'>else</span>\n<span class='ml-tab2'>{</span>\n" + elsecode + "<span class='ml-tab2'>}</span>\n";
}
}
    
return codeHeader + code + codeFooter;
}; */
//====================================================
//Define the function of bluetoothrx input block
Blockly.ESP32.bluetoothrx = function (block) {
    var dropdown_pin = block.getFieldValue('Pin');
    var dropdown_choice = block.getFieldValue('datatype');
    var text_txtchar = block.getFieldValue('txtchar');
    var dropdown_baudrate = "9600";
    var statements_outputstmt = Blockly.ESP32.statementToCode(block, 'OutputStmt');
    Blockly.ESP32.reservePin(block, dropdown_pin, Blockly.ESP32.PinTypes.INPUT, block.type);

    var code = '';
    var serial = 'Serial';
    if (dropdown_pin == '15') {
        if (Blockly.Blocks.ConnectedBoard === 'FFC_ESP32') {
            serial = 'Serial1';
        }
        Blockly.ESP32.addSetup("io_" + dropdown_pin, serial + '.begin(' + dropdown_baudrate + '); //Bluetooth Rx', !1);

        if (dropdown_choice == 'Character') {
            code = 'if(isSerCharEqls(&' + serial + ', \'' + text_txtchar.charAt(0) + '\'))\n{\n' + statements_outputstmt + '\n}\n';
        }
        else {
            code = 'if(isSerStrEqls(&' + serial + ', "' + text_txtchar + '"))\n{\n' + statements_outputstmt + '\n}\n';
        }
    }
    else {
        Blockly.ESP32.addInclude('bluetoothrx', '#include "BluetoothSerial.h"');

        Blockly.ESP32.addVariable('mybluetoothRx' + dropdown_pin, 'SoftwareSerial mybluetoothRx' + dropdown_pin + '(' + dropdown_pin + ',255);', !1);
        Blockly.ESP32.addSetup("io_" + dropdown_pin, 'mybluetoothRx' + dropdown_pin + '.begin(' + dropdown_baudrate + '); ', !1);

        if (dropdown_choice == 'Character') {
            code = 'if(isSerCharEqls(&mybluetoothRx' + dropdown_pin + ', \'' + text_txtchar.charAt(0) + '\'))\n{\n' + statements_outputstmt + '\n}\n';
        }
        else {
            code = 'if(isSerStrEqls(&mybluetoothRx' + dropdown_pin + ',"' + text_txtchar + '"))\n{\n' + statements_outputstmt + '\n}\n';
        }
    }

    for (var b = 1; b <= block.elseifCount_; b++) {
        var dropdown_pinELSEIF = block.getFieldValue('PinELSEIF' + b);
        var dropdown_baudrateELSEIF = "9600";
        var dropdown_choiceELSEIF = block.getFieldValue('datatypeELSEIF' + b);
        var text_txtcharELSEIF = block.getFieldValue('txtcharELSEIF' + b);
        var elseifcode = Blockly.ESP32.statementToCode(block, "varelseifblock" + b);
        Blockly.ESP32.reservePin(block, dropdown_pinELSEIF, Blockly.ESP32.PinTypes.INPUT, block.type);

        if (dropdown_pinELSEIF == '15') {
            if (Blockly.Blocks.ConnectedBoard === 'FFC_ESP32') {
                serial = 'Serial1';
            }
            Blockly.ESP32.addSetup("io_" + dropdown_pinELSEIF, serial + '.begin(' + dropdown_baudrateELSEIF + '); //Bluetooth Rx', !1);

            if (dropdown_choiceELSEIF == 'Character') {
                code += 'else if(isSerCharEqls(&' + serial + ', \'' + text_txtcharELSEIF.charAt(0) + '\'))\n{\n' + elseifcode + '}\n';
            }
            else {
                code += 'else if(isSerStrEqls(&' + serial + ', "' + text_txtcharELSEIF + '"))\n{\n' + elseifcode + '}\n';
            }
        }
        else {
            Blockly.ESP32.addInclude('bluetoothrx', '#include "BluetoothSerial.h"');
            Blockly.ESP32.addVariable('mybluetoothRx' + dropdown_pinELSEIF, 'SoftwareSerial mybluetoothRx' + dropdown_pinELSEIF + '(' + dropdown_pinELSEIF + ',255);', !1);
            Blockly.ESP32.addSetup("io_" + dropdown_pinELSEIF, 'mybluetoothRx' + dropdown_pinELSEIF + '.begin(' + dropdown_baudrateELSEIF + '); ', !1);

            if (dropdown_choiceELSEIF == 'Character') {
                code += 'else if(isSerCharEqls(&mybluetoothRx' + dropdown_pinELSEIF + ', \'' + text_txtcharELSEIF.charAt(0) + '\'))\n{\n' + elseifcode + '}\n';
            }
            else {
                code += 'else if(isSerStrEqls(&mybluetoothRx' + dropdown_pinELSEIF + ',"' + text_txtcharELSEIF + '"))\n{\n' + elseifcode + '}\n';
            }
        }
    }

    for (var b = 1; b <= block.elseCount_; b++) {
        var elsecode = Blockly.ESP32.statementToCode(block, "varelseblock" + b);
        if (elsecode.trim().substring(0, 2) == "if") {
            code += "else" + elsecode;
        } else {
            code += "else\n{\n" + elsecode + "}\n";
        }
    }
    return code;
};
//==================================================================
//Define the function of button input block
Blockly.ESP32.button = function (block) {
    var dropdown_pin = block.getFieldValue('Pin');
    var dropdown_state = block.getFieldValue('state');
    var statements_outputstmt = Blockly.ESP32.statementToCode(block, 'OutputStmt');
    Blockly.ESP32.reservePin(block, dropdown_pin, Blockly.ESP32.PinTypes.INPUT, block.type);

    var code = '';

    Blockly.ESP32.addSetup("io_" + dropdown_pin, "pinMode(" + dropdown_pin + ", INPUT); //Button", !1);

    if (block.andCount_ || block.orCount_) {
        if (Blockly.isMobile) {
            dropdown_state = dropdown_state == 'PRESSED' ? '0' : '1';
            code = '\nif((ESP32.ReadESP32("dr ' + Blockly.ESP32.pin_to_number(dropdown_pin) + '")==' + dropdown_state + ')';
        } else {
            code = 'if((button(' + dropdown_pin + ',' + dropdown_state + '))';
        }

        for (var a = 1; a <= this.andCount_; a++) {
            var dropdown_pinAND = block.getFieldValue('PinAND' + a);
            var dropdown_stateAND = block.getFieldValue('stateAND' + a);
            Blockly.ESP32.reservePin(block, dropdown_pinAND, Blockly.ESP32.PinTypes.INPUT, block.type);

            Blockly.ESP32.addSetup("io_" + dropdown_pinAND, "pinMode(" + dropdown_pinAND + ", INPUT); ", !1);

            if (Blockly.isMobile) {
                dropdown_stateAND = dropdown_stateAND == 'PRESSED' ? '0' : '1';
                code += '&&(ESP32.ReadESP32("dr ' + Blockly.ESP32.pin_to_number(dropdown_pinAND) + '")==' + dropdown_stateAND + ')';
            } else {
                code += '&&(button(' + dropdown_pinAND + ',' + dropdown_stateAND + '))';
            }
        }

        for (var a = 1; a <= this.orCount_; a++) {
            var dropdown_pinOR = block.getFieldValue('PinOR' + a);
            var dropdown_stateOR = block.getFieldValue('stateOR' + a);
            Blockly.ESP32.reservePin(block, dropdown_pinOR, Blockly.ESP32.PinTypes.INPUT, block.type);

            Blockly.ESP32.addSetup("io_" + dropdown_pinOR, "pinMode(" + dropdown_pinOR + ", INPUT); ", !1);

            if (Blockly.isMobile) {
                dropdown_stateOR = dropdown_stateOR == 'PRESSED' ? '0' : '1';
                code += '||(ESP32.ReadESP32("dr ' + Blockly.ESP32.pin_to_number(dropdown_pinOR) + '")==' + dropdown_stateOR + ')';
            } else {
                code += '||(button(' + dropdown_pinOR + ',' + dropdown_stateOR + '))';
            }
        }

        code += ')\n{\n' + statements_outputstmt + '}\n'
    }
    else {
        if (Blockly.isMobile) {
            dropdown_state = dropdown_state == 'PRESSED' ? '0' : '1';
            code = '\nif(ESP32.ReadESP32("dr ' + Blockly.ESP32.pin_to_number(dropdown_pin) + '")==' + dropdown_state + ')\n{';
        } else {
            code += 'if(button(' + dropdown_pin + ',' + dropdown_state + '))\n{';
        }
        code += '\n' + statements_outputstmt + '}\n'
    }

    for (var b = 1; b <= block.elseifCount_; b++) {
        var dropdown_pinELSEIF = block.getFieldValue('PinELSEIF' + b);
        var dropdown_stateELSEIF = block.getFieldValue('stateELSEIF' + b);
        var elseifcode = Blockly.ESP32.statementToCode(block, "varelseifblock" + b);
        Blockly.ESP32.reservePin(block, dropdown_pinELSEIF, Blockly.ESP32.PinTypes.INPUT, block.type);

        Blockly.ESP32.addSetup("io_" + dropdown_pinELSEIF, "pinMode(" + dropdown_pinELSEIF + ", INPUT); ", !1);

        if (Blockly.isMobile) {
            dropdown_stateELSEIF = dropdown_stateELSEIF == 'PRESSED' ? '0' : '1';
            code += '\nelse if(ESP32.ReadESP32("dr ' + Blockly.ESP32.pin_to_number(dropdown_pinELSEIF) + '")==' + dropdown_stateELSEIF + ')\n{';
        } else {
            code += 'else if(button(' + dropdown_pinELSEIF + ',' + dropdown_stateELSEIF + '))\n{';
        }
        code += '\n' + elseifcode + '}\n'
    }

    for (var b = 1; b <= block.elseCount_; b++) {
        var elsecode = Blockly.ESP32.statementToCode(block, "varelseblock" + b);
        if (elsecode.trim().substring(0, 2) == "if") {
            code += "else" + elsecode;
        } else {
            code += "else\n{\n" + elsecode + "}\n";
        }
    }
    return code;
};
//==================================================================
//Define the function of remote input block
Blockly.ESP32.remote = function (block) {
    var dropdown_pin = block.getFieldValue('Pin');
    var selected_button = block.getFieldValue('remoteButton');
    var statements_outputstmt = Blockly.ESP32.statementToCode(block, 'OutputStmt');
    Blockly.ESP32.reservePin(block, dropdown_pin, Blockly.ESP32.PinTypes.INPUT, block.type);

    var naviganid;
    switch (selected_button) {
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

    var code = '';
    if (!Blockly.isMobile) {
        Blockly.ESP32.addVariable('rc' + dropdown_pin.slice(-1), 'IR rc' + dropdown_pin.slice(-1) + '(' + dropdown_pin + ');', !1);
    }
    Blockly.ESP32.addSetup("io_" + dropdown_pin, "rc" + dropdown_pin.slice(-1) + ".enable(HW_CH); //Remote", !1);

    if (Blockly.isMobile) {
        code = 'if(ESP32.ReadESP32("ir ' + Blockly.ESP32.pin_to_number(dropdown_pin) + ' ' + naviganid + '")==1)';
    } else {
        code = 'if(ir_rc(&rc' + dropdown_pin.slice(-1) + ',' + selected_button + '))';
    }
    code += '\n{\n' + statements_outputstmt + '\n}\n';
    return code;
};
//==================================================================
//Define the function of IR input block
Blockly.ESP32.IR = function (block) {
    var dropdown_pin = block.getFieldValue('Pin');
    var dropdown_rangelimit = block.getFieldValue('RangeLimit');
    var number_sensorrangemin = block.getFieldValue('SensorRangeMin');
    var number_sensorrangemax = block.getFieldValue('SensorRangeMax');
    var statements_outputstmt = Blockly.ESP32.statementToCode(block, 'OutputStmt');
    Blockly.ESP32.reservePin(block, dropdown_pin, Blockly.ESP32.PinTypes.INPUT, block.type);

    var code = '';

    Blockly.ESP32.addDeclaration('IR', '#define ir(x) analogRead(x)');
    // Blockly.ESP32.addInclude('IR', '#define ir(x) analogRead(x)');

    Blockly.ESP32.addSetup("io_" + dropdown_pin, "pinMode(" + dropdown_pin + ", INPUT); //IR", !1);

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
                if (block.andCount_ || block.orCount_) {
                    if (dropdown_rangelimit == 'Inside') {
                        if (Blockly.isMobile) {
                            code = 'if((ESP32.ReadESP32("ar ' + Blockly.ESP32.pin_to_number(dropdown_pin) + '")>=' + number_sensorrangemin + ' && ESP32.ReadESP32("ar ' + Blockly.ESP32.pin_to_number(dropdown_pin) + '")<=' + number_sensorrangemax + ')';
                        } else {
                            code = 'if((ir(' + dropdown_pin + ')>=' + number_sensorrangemin + ' && ir(' + dropdown_pin + ')<=' + number_sensorrangemax + ')';
                        }
                    }
                    else {
                        if (Blockly.isMobile) {
                            code = 'if((ESP32.ReadESP32("ar ' + Blockly.ESP32.pin_to_number(dropdown_pin) + '")<=' + number_sensorrangemin + ' || ESP32.ReadESP32("ar ' + Blockly.ESP32.pin_to_number(dropdown_pin) + '")>=' + number_sensorrangemax + ')';
                        } else {
                            code = 'if((ir(' + dropdown_pin + ')<=' + number_sensorrangemin + ' || ir(' + dropdown_pin + ')>=' + number_sensorrangemax + ')';
                        }
                    }

                    for (var a = 1; a <= this.andCount_; a++) {
                        var dropdown_pinAND = block.getFieldValue('PinAND' + a);
                        var dropdown_rangelimitAND = block.getFieldValue('RangeLimitAND' + a);
                        var number_sensorrangeminAND = block.getFieldValue('SensorRangeMinAND' + a);
                        var number_sensorrangemaxAND = block.getFieldValue('SensorRangeMaxAND' + a);
                        Blockly.ESP32.reservePin(block, dropdown_pinAND, Blockly.ESP32.PinTypes.INPUT, block.type);

                        Blockly.ESP32.addSetup("io_" + dropdown_pinAND, "pinMode(" + dropdown_pinAND + ", INPUT); //IR", !1);

                        if (dropdown_rangelimitAND == 'Inside') {
                            if (Blockly.isMobile) {
                                code += '&&(ESP32.ReadESP32("ar ' + Blockly.ESP32.pin_to_number(dropdown_pinAND) + '")>=' + number_sensorrangeminAND + ' && ESP32.ReadESP32("ar ' + Blockly.ESP32.pin_to_number(dropdown_pinAND) + '")<=' + number_sensorrangemaxAND + ')';
                            } else {
                                code += '&&(ir(' + dropdown_pinAND + ')>=' + number_sensorrangeminAND + ' && ir(' + dropdown_pinAND + ')<=' + number_sensorrangemaxAND + ')';
                            }
                        }
                        else {
                            if (Blockly.isMobile) {
                                code += '&&(ESP32.ReadESP32("ar ' + Blockly.ESP32.pin_to_number(dropdown_pinAND) + '")<=' + number_sensorrangeminAND + ' || ESP32.ReadESP32("ar ' + Blockly.ESP32.pin_to_number(dropdown_pinAND) + '")>=' + number_sensorrangemaxAND + ')';
                            } else {
                                code += '&&(ir(' + dropdown_pinAND + ')<=' + number_sensorrangeminAND + ' || ir(' + dropdown_pinAND + ')>=' + number_sensorrangemaxAND + ')';
                            }
                        }
                    }

                    for (var a = 1; a <= this.orCount_; a++) {
                        var dropdown_pinOR = block.getFieldValue('PinOR' + a);
                        var dropdown_rangelimitOR = block.getFieldValue('RangeLimitOR' + a);
                        var number_sensorrangeminOR = block.getFieldValue('SensorRangeMinOR' + a);
                        var number_sensorrangemaxOR = block.getFieldValue('SensorRangeMaxOR' + a);
                        Blockly.ESP32.reservePin(block, dropdown_pinOR, Blockly.ESP32.PinTypes.INPUT, block.type);

                        Blockly.ESP32.addSetup("io_" + dropdown_pinOR, "pinMode(" + dropdown_pinOR + ", INPUT); //IR", !1);

                        if (dropdown_rangelimitOR == 'Inside') {
                            if (Blockly.isMobile) {
                                code += '||(ESP32.ReadESP32("ar ' + Blockly.ESP32.pin_to_number(dropdown_pinOR) + '")>=' + number_sensorrangeminOR + ' && ESP32.ReadESP32("ar ' + Blockly.ESP32.pin_to_number(dropdown_pinOR) + '")<=' + number_sensorrangemaxOR + ')';
                            } else {
                                code += '||(ir(' + dropdown_pinOR + ')>=' + number_sensorrangeminOR + ' && ir(' + dropdown_pinOR + ')<=' + number_sensorrangemaxOR + ')';
                            }
                        }
                        else {
                            if (Blockly.isMobile) {
                                code += '||(ESP32.ReadESP32("ar ' + Blockly.ESP32.pin_to_number(dropdown_pinOR) + '")<=' + number_sensorrangeminOR + '|| ESP32.ReadESP32("ar ' + Blockly.ESP32.pin_to_number(dropdown_pinOR) + '")>=' + number_sensorrangemaxOR + ')';
                            } else {
                                code += '||(ir(' + dropdown_pinOR + ')<=' + number_sensorrangeminOR + ' || ir(' + dropdown_pinOR + ')>=' + number_sensorrangemaxOR + ')';
                            }
                        }
                    }

                    code += ')\n{\n' + statements_outputstmt + '\n}\n';
                }
                else {
                    if (dropdown_rangelimit == 'Inside') {
                        if (Blockly.isMobile) {
                            code = 'if(ESP32.ReadESP32("ar ' + Blockly.ESP32.pin_to_number(dropdown_pin) + '")>=' + number_sensorrangemin + ' && ESP32.ReadESP32("ar ' + Blockly.ESP32.pin_to_number(dropdown_pin) + '")<=' + number_sensorrangemax + ')\n{\n' + statements_outputstmt + '\n}\n';
                        } else {
                            code = 'if(ir(' + dropdown_pin + ')>=' + number_sensorrangemin + ' && ir(' + dropdown_pin + ')<=' + number_sensorrangemax + ')\n{\n' + statements_outputstmt + '\n}\n';
                        }
                    }
                    else {
                        if (Blockly.isMobile) {
                            code = 'if(ESP32.ReadESP32("ar ' + Blockly.ESP32.pin_to_number(dropdown_pin) + '")<=' + number_sensorrangemin + ' || ESP32.ReadESP32("ar ' + Blockly.ESP32.pin_to_number(dropdown_pin) + '")>=' + number_sensorrangemax + ')\n{\n' + statements_outputstmt + '}\n';
                        } else {
                            code = 'if(ir(' + dropdown_pin + ')<=' + number_sensorrangemin + ' || ir(' + dropdown_pin + ')>=' + number_sensorrangemax + ')\n{\n' + statements_outputstmt + '}\n';
                        }
                    }
                }
            }

        }
    }

    for (var b = 1; b <= block.elseifCount_; b++) {
        var dropdown_pinELSEIF = block.getFieldValue('PinELSEIF' + b);
        var dropdown_rangelimitELSEIF = block.getFieldValue('RangeLimitELSEIF' + b);
        var number_sensorrangeminELSEIF = block.getFieldValue('SensorRangeMinELSEIF' + b);
        var number_sensorrangemaxELSEIF = block.getFieldValue('SensorRangeMaxELSEIF' + b);
        var elseifcode = Blockly.ESP32.statementToCode(block, "varelseifblock" + b);
        Blockly.ESP32.reservePin(block, dropdown_pinELSEIF, Blockly.ESP32.PinTypes.INPUT, block.type);

        Blockly.ESP32.addSetup("io_" + dropdown_pinELSEIF, "pinMode(" + dropdown_pinELSEIF + ", INPUT); //Light Sensor", !1);

        if (dropdown_rangelimitELSEIF == 'Inside') {
            if (Blockly.isMobile) {
                code += 'else if(ESP32.ReadESP32("ar ' + Blockly.ESP32.pin_to_number(dropdown_pinELSEIF) + '")>=' + number_sensorrangeminELSEIF + ' && ESP32.ReadESP32("ar ' + Blockly.ESP32.pin_to_number(dropdown_pinELSEIF) + '")<=' + number_sensorrangemaxELSEIF + ')\n{\n' + elseifcode + '}\n';
            } else {
                code += 'else if(ir(' + dropdown_pinELSEIF + ')>=' + number_sensorrangeminELSEIF + ' && ir(' + dropdown_pinELSEIF + ')<=' + number_sensorrangemaxELSEIF + ')\n{\n' + elseifcode + '}\n';
            }
        }
        else {
            if (Blockly.isMobile) {
                code += 'else if(ESP32.ReadESP32("ar ' + Blockly.ESP32.pin_to_number(dropdown_pinELSEIF) + '")<=' + number_sensorrangeminELSEIF + ' || ESP32.ReadESP32("ar ' + Blockly.ESP32.pin_to_number(dropdown_pinELSEIF) + '")>=' + number_sensorrangemaxELSEIF + ')\n{\n' + elseifcode + '}\n';
            } else {
                code += 'else if(ir(' + dropdown_pinELSEIF + ')<=' + number_sensorrangeminELSEIF + ' || ir(' + dropdown_pinELSEIF + ')>=' + number_sensorrangemaxELSEIF + ')\n{\n' + elseifcode + '}\n';
            }
        }
    }

    for (var b = 1; b <= block.elseCount_; b++) {
        var elsecode = Blockly.ESP32.statementToCode(block, "varelseblock" + b);
        if (elsecode.trim().substring(0, 2) == "if") {
            code += "else" + elsecode;
        } else {
            code += "else\n{\n" + elsecode + "}\n";
        }
    }

    return code;
};
//==================================================================
//Define the function of lightsensor input block
Blockly.ESP32.lightsensor = function (block) {
    var dropdown_pin = block.getFieldValue('Pin');
    var dropdown_rangelimit = block.getFieldValue('RangeLimit');
    var number_sensorrangemin = block.getFieldValue('SensorRangeMin');
    var number_sensorrangemax = block.getFieldValue('SensorRangeMax');
    var statements_outputstmt = Blockly.ESP32.statementToCode(block, 'OutputStmt');
    Blockly.ESP32.reservePin(block, dropdown_pin, Blockly.ESP32.PinTypes.INPUT, block.type);

    var code = '';

    Blockly.ESP32.addInclude('lightsensor', '#define cds(x) analogRead(x)');
    Blockly.ESP32.addSetup("io_" + dropdown_pin, "pinMode(" + dropdown_pin + ", INPUT); //Light Sensor", !1);
    if (!isNaN(number_sensorrangemin) && !isNaN(number_sensorrangemax)) {
        if (Number(number_sensorrangemin) >= Number(number_sensorrangemax)) {
            block.setWarningText("The Sensor Range Min value must be less than Max value", "io_pwm_value" + dropdown_pin);
        }
        else {
            block.setWarningText(null, "io_pwm_value" + dropdown_pin);
            if (block.andCount_ || block.orCount_) {
                if (dropdown_rangelimit == 'Inside') {
                    if (Blockly.isMobile) {
                        code = 'if((ESP32.ReadESP32("ar ' + Blockly.ESP32.pin_to_number(dropdown_pin) + '")>=' + number_sensorrangemin + ' && ESP32.ReadESP32("ar ' + Blockly.ESP32.pin_to_number(dropdown_pin) + '")<=' + number_sensorrangemax + ')';
                    } else {
                        code = 'if((cds(' + dropdown_pin + ')>=' + number_sensorrangemin + ' && cds(' + dropdown_pin + ')<=' + number_sensorrangemax + ')';
                    }
                }
                else {
                    if (Blockly.isMobile) {
                        code = 'if((ESP32.ReadESP32("ar ' + Blockly.ESP32.pin_to_number(dropdown_pin) + '")<=' + number_sensorrangemin + ' || ESP32.ReadESP32("ar ' + Blockly.ESP32.pin_to_number(dropdown_pin) + '")>=' + number_sensorrangemax + ')';
                    } else {
                        code = 'if((cds(' + dropdown_pin + ')<=' + number_sensorrangemin + ' || cds(' + dropdown_pin + ')>=' + number_sensorrangemax + ')';
                    }
                }

                for (var a = 1; a <= this.andCount_; a++) {
                    var dropdown_pinAND = block.getFieldValue('PinAND' + a);
                    var dropdown_rangelimitAND = block.getFieldValue('RangeLimitAND' + a);
                    var number_sensorrangeminAND = block.getFieldValue('SensorRangeMinAND' + a);
                    var number_sensorrangemaxAND = block.getFieldValue('SensorRangeMaxAND' + a);
                    Blockly.ESP32.reservePin(block, dropdown_pinAND, Blockly.ESP32.PinTypes.INPUT, block.type);

                    Blockly.ESP32.addSetup("io_" + dropdown_pinAND, "pinMode(" + dropdown_pinAND + ", INPUT); //Light Sensor", !1);
                    if (dropdown_rangelimitAND == 'Inside') {
                        if (Blockly.isMobile) {
                            code += '&&(ESP32.ReadESP32("ar ' + Blockly.ESP32.pin_to_number(dropdown_pinAND) + '")>=' + number_sensorrangeminAND + ' && ESP32.ReadESP32("ar ' + Blockly.ESP32.pin_to_number(dropdown_pinAND) + '")<=' + number_sensorrangemaxAND + ')';
                        } else {
                            code += '&&(cds(' + dropdown_pinAND + ')>=' + number_sensorrangeminAND + ' && cds(' + dropdown_pinAND + ')<=' + number_sensorrangemaxAND + ')';
                        }
                    }
                    else {
                        if (Blockly.isMobile) {
                            code += '&&(ESP32.ReadESP32("ar ' + Blockly.ESP32.pin_to_number(dropdown_pinAND) + '")<=' + number_sensorrangeminAND + ' || ESP32.ReadESP32("ar ' + Blockly.ESP32.pin_to_number(dropdown_pinAND) + '")>=' + number_sensorrangemaxAND + ')';
                        } else {
                            code += '&&(cds(' + dropdown_pinAND + ')<=' + number_sensorrangeminAND + ' || cds(' + dropdown_pinAND + ')>=' + number_sensorrangemaxAND + ')';
                        }
                    }
                }

                for (var a = 1; a <= this.orCount_; a++) {
                    var dropdown_pinOR = block.getFieldValue('PinOR' + a);
                    var dropdown_rangelimitOR = block.getFieldValue('RangeLimitOR' + a);
                    var number_sensorrangeminOR = block.getFieldValue('SensorRangeMinOR' + a);
                    var number_sensorrangemaxOR = block.getFieldValue('SensorRangeMaxOR' + a);
                    Blockly.ESP32.reservePin(block, dropdown_pinOR, Blockly.ESP32.PinTypes.INPUT, block.type);

                    Blockly.ESP32.addSetup("io_" + dropdown_pinOR, "pinMode(" + dropdown_pinOR + ", INPUT); //Light Sensor", !1);
                    if (dropdown_rangelimitOR == 'Inside') {
                        if (Blockly.isMobile) {
                            code += '||(ESP32.ReadESP32("ar ' + Blockly.ESP32.pin_to_number(dropdown_pinOR) + '")>=' + number_sensorrangeminOR + ' && ESP32.ReadESP32("ar ' + Blockly.ESP32.pin_to_number(dropdown_pinOR) + '")<=' + number_sensorrangemaxOR + ')';
                        } else {
                            code += '||(cds(' + dropdown_pinOR + ')>=' + number_sensorrangeminOR + ' && cds(' + dropdown_pinOR + ')<=' + number_sensorrangemaxOR + ')';
                        }
                    }
                    else {
                        if (Blockly.isMobile) {
                            code += '||(ESP32.ReadESP32("ar ' + Blockly.ESP32.pin_to_number(dropdown_pinOR) + '")<=' + number_sensorrangeminOR + '|| ESP32.ReadESP32("ar ' + Blockly.ESP32.pin_to_number(dropdown_pinOR) + '")>=' + number_sensorrangemaxOR + ')';
                        } else {
                            code += '||(cds(' + dropdown_pinOR + ')<=' + number_sensorrangeminOR + ' || cds(' + dropdown_pinOR + ')>=' + number_sensorrangemaxOR + ')';
                        }
                    }
                }

                code += ')\n{\n' + statements_outputstmt + '\n}\n';
            }
            else {
                if (dropdown_rangelimit == 'Inside') {
                    if (Blockly.isMobile) {
                        code = 'if(ESP32.ReadESP32("ar ' + Blockly.ESP32.pin_to_number(dropdown_pin) + '")>=' + number_sensorrangemin + ' && ESP32.ReadESP32("ar ' + Blockly.ESP32.pin_to_number(dropdown_pin) + '")<=' + number_sensorrangemax + ')\n{\n' + statements_outputstmt + '\n}\n';
                    } else {
                        code = 'if(cds(' + dropdown_pin + ')>=' + number_sensorrangemin + ' && cds(' + dropdown_pin + ')<=' + number_sensorrangemax + ')\n{\n' + statements_outputstmt + '}\n';
                    }
                }
                else {
                    if (Blockly.isMobile) {
                        code = 'if(ESP32.ReadESP32("ar ' + Blockly.ESP32.pin_to_number(dropdown_pin) + '")<=' + number_sensorrangemin + ' || ESP32.ReadESP32("ar ' + Blockly.ESP32.pin_to_number(dropdown_pin) + '")>=' + number_sensorrangemax + ')\n{\n' + statements_outputstmt + '}\n';
                    } else {
                        code = 'if(cds(' + dropdown_pin + ')<=' + number_sensorrangemin + ' || cds(' + dropdown_pin + ')>=' + number_sensorrangemax + ')\n{\n' + statements_outputstmt + '}\n';
                    }
                }
            }
        }
    }

    for (var b = 1; b <= block.elseifCount_; b++) {
        var dropdown_pinELSEIF = block.getFieldValue('PinELSEIF' + b);
        var dropdown_rangelimitELSEIF = block.getFieldValue('RangeLimitELSEIF' + b);
        var number_sensorrangeminELSEIF = block.getFieldValue('SensorRangeMinELSEIF' + b);
        var number_sensorrangemaxELSEIF = block.getFieldValue('SensorRangeMaxELSEIF' + b);
        var elseifcode = Blockly.ESP32.statementToCode(block, "varelseifblock" + b);
        Blockly.ESP32.reservePin(block, dropdown_pinELSEIF, Blockly.ESP32.PinTypes.INPUT, block.type);

        Blockly.ESP32.addSetup("io_" + dropdown_pinELSEIF, "pinMode(" + dropdown_pinELSEIF + ", INPUT); //Light Sensor", !1);
        if (dropdown_rangelimitELSEIF == 'Inside') {
            if (Blockly.isMobile) {
                code += 'else if(ESP32.ReadESP32("ar ' + Blockly.ESP32.pin_to_number(dropdown_pinELSEIF) + '")>=' + number_sensorrangeminELSEIF + ' && ESP32.ReadESP32("ar ' + Blockly.ESP32.pin_to_number(dropdown_pinELSEIF) + '")<=' + number_sensorrangemaxELSEIF + ')\n{\n' + elseifcode + '}\n';
            } else {
                code += 'else if(cds(' + dropdown_pinELSEIF + ')>=' + number_sensorrangeminELSEIF + ' && cds(' + dropdown_pinELSEIF + ')<=' + number_sensorrangemaxELSEIF + ')\n{\n' + elseifcode + '}\n';
            }
        }
        else {
            if (Blockly.isMobile) {
                code += 'else if(ESP32.ReadESP32("ar ' + Blockly.ESP32.pin_to_number(dropdown_pinELSEIF) + '")<=' + number_sensorrangeminELSEIF + ' || ESP32.ReadESP32("ar ' + Blockly.ESP32.pin_to_number(dropdown_pinELSEIF) + '")>=' + number_sensorrangemaxELSEIF + ')\n{\n' + elseifcode + '}\n';
            } else {
                code += 'else if(cds(' + dropdown_pinELSEIF + ')<=' + number_sensorrangeminELSEIF + ' || cds(' + dropdown_pinELSEIF + ')>=' + number_sensorrangemaxELSEIF + ')\n{\n' + elseifcode + '}\n';
            }
        }
    }

    for (var b = 1; b <= block.elseCount_; b++) {
        var elsecode = Blockly.ESP32.statementToCode(block, "varelseblock" + b);
        if (elsecode.trim().substring(0, 2) == "if") {
            code += "else" + elsecode;
        } else {
            code += "else\n{" + elsecode + "}\n";
        }
    }

    return code;
};
//==================================================================
//Define the function of resistor input block
Blockly.ESP32.resistor = function (block) {
    var dropdown_pin = block.getFieldValue('Pin');
    var dropdown_rangelimit = block.getFieldValue('RangeLimit');
    var number_sensorrangemin = block.getFieldValue('SensorRangeMin');
    var number_sensorrangemax = block.getFieldValue('SensorRangeMax');
    var statements_outputstmt = Blockly.ESP32.statementToCode(block, 'OutputStmt');
    Blockly.ESP32.reservePin(block, dropdown_pin, Blockly.ESP32.PinTypes.INPUT, block.type);

    var code = '';

    Blockly.ESP32.addInclude('resistor', '#define Potentiometer(x) (analogRead(x))');
    Blockly.ESP32.addSetup("io_" + dropdown_pin, "pinMode(" + dropdown_pin + ", INPUT); //Potentiometer", !1);
    if (!isNaN(number_sensorrangemin) && !isNaN(number_sensorrangemax)) {
        if (Number(number_sensorrangemin) >= Number(number_sensorrangemax)) {
            block.setWarningText("The Sensor Range Min value must be less than Max value", "io_pwm_value" + dropdown_pin);
        }
        else {
            block.setWarningText(null, "io_pwm_value" + dropdown_pin);
            if (block.andCount_ || block.orCount_) {
                if (dropdown_rangelimit == 'Inside') {
                    if (Blockly.isMobile) {
                        code = 'if((ESP32.ReadEsp("ar ' + Blockly.ESP32.pin_to_number(dropdown_pin) + '")>=' + number_sensorrangemin + ' && ESP32.ReadEsp("ar ' + Blockly.ESP32.pin_to_number(dropdown_pin) + '")<=' + number_sensorrangemax + ')';
                    } else {
                        code = 'if((Potentiometer(' + dropdown_pin + ')>=' + number_sensorrangemin + ' && Potentiometer(' + dropdown_pin + ')<=' + number_sensorrangemax + ')';
                    }
                }
                else {
                    if (Blockly.isMobile) {
                        code = 'if((ESP32.ReadEsp("ar ' + Blockly.ESP32.pin_to_number(dropdown_pin) + '")<=' + number_sensorrangemin + ' || ESP32.ReadEsp("ar ' + Blockly.ESP32.pin_to_number(dropdown_pin) + '")>=' + number_sensorrangemax + ')';
                    } else {
                        code = 'if((Potentiometer(' + dropdown_pin + ')<=' + number_sensorrangemin + ' || Potentiometer(' + dropdown_pin + ')>=' + number_sensorrangemax + ')';
                    }
                }

                for (var a = 1; a <= this.andCount_; a++) {
                    var dropdown_pinAND = block.getFieldValue('PinAND' + a);
                    var dropdown_rangelimitAND = block.getFieldValue('RangeLimitAND' + a);
                    var number_sensorrangeminAND = block.getFieldValue('SensorRangeMinAND' + a);
                    var number_sensorrangemaxAND = block.getFieldValue('SensorRangeMaxAND' + a);
                    Blockly.ESP32.reservePin(block, dropdown_pinAND, Blockly.ESP32.PinTypes.INPUT, block.type);

                    Blockly.ESP32.addSetup("io_" + dropdown_pinAND, "pinMode(" + dropdown_pinAND + ", INPUT); //Potentiometer", !1);
                    if (dropdown_rangelimitAND == 'Inside') {
                        if (Blockly.isMobile) {
                            code += '&&(ESP32.ReadEsp("ar ' + Blockly.ESP32.pin_to_number(dropdown_pinAND) + '")>=' + number_sensorrangeminAND + ' && ESP32.ReadEsp("ar ' + Blockly.ESP32.pin_to_number(dropdown_pinAND) + '")<=' + number_sensorrangemaxAND + ')';
                        } else {
                            code += '&&(Potentiometer(' + dropdown_pinAND + ')>=' + number_sensorrangeminAND + ' && Potentiometer(' + dropdown_pinAND + ')<=' + number_sensorrangemaxAND + ')';
                        }
                    }
                    else {
                        if (Blockly.isMobile) {
                            code += '&&(ESP32.ReadEsp("ar ' + Blockly.ESP32.pin_to_number(dropdown_pinAND) + '")<=' + number_sensorrangeminAND + ' || ESP32.ReadEsp("ar ' + Blockly.ESP32.pin_to_number(dropdown_pinAND) + '")>=' + number_sensorrangemaxAND + ')';
                        } else {
                            code += '&&(Potentiometer(' + dropdown_pinAND + ')<=' + number_sensorrangeminAND + '|| Potentiometer(' + dropdown_pinAND + ')>=' + number_sensorrangemaxAND + ')';
                        }
                    }
                }

                for (var a = 1; a <= this.orCount_; a++) {
                    var dropdown_pinOR = block.getFieldValue('PinOR' + a);
                    var dropdown_rangelimitOR = block.getFieldValue('RangeLimitOR' + a);
                    var number_sensorrangeminOR = block.getFieldValue('SensorRangeMinOR' + a);
                    var number_sensorrangemaxOR = block.getFieldValue('SensorRangeMaxOR' + a);
                    Blockly.ESP32.reservePin(block, dropdown_pinOR, Blockly.ESP32.PinTypes.INPUT, block.type);

                    Blockly.ESP32.addSetup("io_" + dropdown_pinOR, "pinMode(" + dropdown_pinOR + ", INPUT); //Potentiometer", !1);
                    if (dropdown_rangelimitOR == 'Inside') {
                        if (Blockly.isMobile) {
                            code += '||(ESP32.ReadEsp("ar ' + Blockly.ESP32.pin_to_number(dropdown_pinOR) + '")>=' + number_sensorrangeminOR + ' && ESP32.ReadEsp("ar ' + Blockly.ESP32.pin_to_number(dropdown_pinOR) + '")<=' + number_sensorrangemaxOR + ')';
                        } else {
                            code += '||(Potentiometer(' + dropdown_pinOR + ')>=' + number_sensorrangeminOR + ' && Potentiometer(' + dropdown_pinOR + ')<=' + number_sensorrangemaxOR + ')';
                        }
                    }
                    else {
                        if (Blockly.isMobile) {
                            code += '||(ESP32.ReadEsp("ar ' + Blockly.ESP32.pin_to_number(dropdown_pinOR) + '")<=' + number_sensorrangeminOR + '|| ESP32.ReadEsp("ar ' + Blockly.ESP32.pin_to_number(dropdown_pinOR) + '")>=' + number_sensorrangemaxOR + ')';
                        } else {
                            code += '||(Potentiometer(' + dropdown_pinOR + ')<=' + number_sensorrangeminOR + ' || Potentiometer(' + dropdown_pinOR + ')>=' + number_sensorrangemaxOR + ')';
                        }
                    }
                }

                code += ')\n{\n' + statements_outputstmt + '\n}\n';
            }
            else {
                if (dropdown_rangelimit == 'Inside') {
                    if (Blockly.isMobile) {
                        code = 'if(ESP32.ReadEsp("ar ' + Blockly.ESP32.pin_to_number(dropdown_pin) + '")>=' + number_sensorrangemin + ' && ESP32.ReadEsp("ar ' + Blockly.ESP32.pin_to_number(dropdown_pin) + '")<=' + number_sensorrangemax + ')\n{\n' + statements_outputstmt + '\n}\n';
                    } else {
                        code = 'if(Potentiometer(' + dropdown_pin + ')>=' + number_sensorrangemin + ' && Potentiometer(' + dropdown_pin + ')<=' + number_sensorrangemax + ')\n{\n' + statements_outputstmt + '\n}\n';
                    }
                }
                else {
                    if (Blockly.isMobile) {
                        code = 'if(ESP32.ReadEsp("ar ' + Blockly.ESP32.pin_to_number(dropdown_pin) + '")<=' + number_sensorrangemin + ' || ESP32.ReadEsp("ar ' + Blockly.ESP32.pin_to_number(dropdown_pin) + '")>=' + number_sensorrangemax + ')\n{\n' + statements_outputstmt + '}\n';
                    } else {
                        code = 'if(Potentiometer(' + dropdown_pin + ')<=' + number_sensorrangemin + ' || Potentiometer(' + dropdown_pin + ')>=' + number_sensorrangemax + ')\n{\n' + statements_outputstmt + '}\n';
                    }
                }
            }
        }
    }

    for (var b = 1; b <= block.elseifCount_; b++) {
        var dropdown_pinELSEIF = block.getFieldValue('PinELSEIF' + b);
        var dropdown_rangelimitELSEIF = block.getFieldValue('RangeLimitELSEIF' + b);
        var number_sensorrangeminELSEIF = block.getFieldValue('SensorRangeMinELSEIF' + b);
        var number_sensorrangemaxELSEIF = block.getFieldValue('SensorRangeMaxELSEIF' + b);
        var elseifcode = Blockly.ESP32.statementToCode(block, "varelseifblock" + b);
        Blockly.ESP32.reservePin(block, dropdown_pinELSEIF, Blockly.ESP32.PinTypes.INPUT, block.type);

        Blockly.ESP32.addSetup("io_" + dropdown_pinELSEIF, "pinMode(" + dropdown_pinELSEIF + ", INPUT); //Light Sensor", !1);
        if (dropdown_rangelimitELSEIF == 'Inside') {
            if (Blockly.isMobile) {
                code += 'else if(ESP32.ReadEsp("ar ' + Blockly.ESP32.pin_to_number(dropdown_pinELSEIF) + '")>=' + number_sensorrangeminELSEIF + ' && ESP32.ReadEsp("ar ' + Blockly.ESP32.pin_to_number(dropdown_pinELSEIF) + '")<=' + number_sensorrangemaxELSEIF + ')\n{\n' + elseifcode + '}\n';
            } else {
                code += 'else if(Potentiometer(' + dropdown_pinELSEIF + ')>=' + number_sensorrangeminELSEIF + ' && Potentiometer(' + dropdown_pinELSEIF + ')<=' + number_sensorrangemaxELSEIF + ')\n{\n' + elseifcode + '}\n';
            }
        }
        else {
            if (Blockly.isMobile) {
                code += 'else if(ESP32.ReadEsp("ar ' + Blockly.ESP32.pin_to_number(dropdown_pinELSEIF) + '")<=' + number_sensorrangeminELSEIF + ' || ESP32.ReadEsp("ar ' + Blockly.ESP32.pin_to_number(dropdown_pinELSEIF) + '")>=' + number_sensorrangemaxELSEIF + ')\n{\n' + elseifcode + '}\n';
            } else {
                code += 'else if(Potentiometer(' + dropdown_pinELSEIF + ')<=' + number_sensorrangeminELSEIF + ' || Potentiometer(' + dropdown_pinELSEIF + ')>=' + number_sensorrangemaxELSEIF + ')\n{\n' + elseifcode + '}\n';
            }
        }
    }

    for (var b = 1; b <= block.elseCount_; b++) {
        var elsecode = Blockly.ESP32.statementToCode(block, "varelseblock" + b);
        if (elsecode.trim().substring(0, 2) == "if") {
            code += "else" + elsecode;
        } else {
            code += "else\n{\n" + elsecode + "}\n";
        }
    }

    return code;
};
//==================================================================
//Define the function of serialx input block
Blockly.ESP32.serialrx = function (block) {
    var dropdown_pin = block.getFieldValue('Pin');
    var dropdown_choice = block.getFieldValue('choice');
    var text_txtchar = block.getFieldValue('txtchar');
    var dropdown_baudrate = block.getFieldValue('baudrate');
    var statements_outputstmt = Blockly.ESP32.statementToCode(block, 'OutputStmt');
    Blockly.ESP32.reservePin(block, dropdown_pin, Blockly.ESP32.PinTypes.INPUT, block.type);

    var code = '';
    var serial = '&Serial,';
    if (dropdown_pin == '15') {
        Blockly.ESP32.addSetup("io_" + dropdown_baudrate, 'Serial.begin(' + dropdown_baudrate + '); //Serial Rx', !1);

        if (dropdown_choice == 'character') {
            code += 'if(isSerCharEqls(' + serial + '\'' + text_txtchar.charAt(0) + '\'))\n{\n' + statements_outputstmt + '\n}\n';
        }
        else {
            code += 'if(isSerStrEqls(' + serial + '"' + text_txtchar + '"))\n{\n' + statements_outputstmt + '\n}\n';
        }
    }
    else {
        Blockly.ESP32.addInclude('mserialRx', '#include "SoftwareSerial.h"');

        Blockly.ESP32.addVariable('myserialRx' + dropdown_pin, 'SoftwareSerial myserialRx' + dropdown_pin + '(' + dropdown_pin + ',255);', !1);
        Blockly.ESP32.addSetup("io_" + dropdown_pin, 'myserialRx' + dropdown_pin + '.begin(' + dropdown_baudrate + '); ', !1);

        if (dropdown_choice == 'character') {
            code += 'if(isSerCharEqls(&myserialRx' + dropdown_pin + ', \'' + text_txtchar.charAt(0) + '\'))\n{\n' + statements_outputstmt + '\n}\n';
        }
        else {
            code += 'if(isSerStrEqls(&myserialRx' + dropdown_pin + ',"' + text_txtchar + '"))\n{\n' + statements_outputstmt + '\n}\n';
        }
    }

    for (var b = 1; b <= block.elseifCount_; b++) {
        var dropdown_pinELSEIF = block.getFieldValue('PinELSEIF' + b);
        var dropdown_baudrateELSEIF = block.getFieldValue('baudrateELSEIF' + b);
        var dropdown_choiceELSEIF = block.getFieldValue('choiceELSEIF' + b);
        var text_txtcharELSEIF = block.getFieldValue('txtcharELSEIF' + b);
        var elseifcode = Blockly.ESP32.statementToCode(block, "varelseifblock" + b);
        Blockly.ESP32.reservePin(block, dropdown_pinELSEIF, Blockly.ESP32.PinTypes.INPUT, block.type);

        if (dropdown_pinELSEIF == '15') {
            Blockly.ESP32.addSetup("io_" + dropdown_baudrateELSEIF, 'Serial.begin(' + dropdown_baudrateELSEIF + '); //Serial Rx', !1);

            if (dropdown_choiceELSEIF == 'character') {
                code += 'else if(isSerCharEqls(' + serial + '\'' + text_txtcharELSEIF.charAt(0) + '\'))\n{\n' + elseifcode + '}\n';
            }
            else {
                code += 'else if(isSerStrEqls(' + serial + '"' + text_txtcharELSEIF + '"))\n{\n' + elseifcode + '}\n';
            }
        }
        else {
            Blockly.ESP32.addInclude('mserialRx', '#include "SoftwareSerial.h"');

            Blockly.ESP32.addVariable('myserialRx' + dropdown_pinELSEIF, 'SoftwareSerial myserialRx' + dropdown_pinELSEIF + '(' + dropdown_pinELSEIF + ',255);', !1);
            Blockly.ESP32.addSetup("io_" + dropdown_pinELSEIF, 'myserialRx' + dropdown_pinELSEIF + '.begin(' + dropdown_baudrateELSEIF + '); ', !1);

            if (dropdown_choiceELSEIF == 'character') {
                code += 'else if(isSerCharEqls(&myserialRx' + dropdown_pinELSEIF + ', \'' + text_txtcharELSEIF.charAt(0) + '\'))\n{\n' + elseifcode + '}\n';
            }
            else {
                code += 'else if(isSerStrEqls(&myserialRx' + dropdown_pinELSEIF + ',"' + text_txtcharELSEIF + '"))\n{\n' + elseifcode + '}\n';
            }
        }
    }

    for (var b = 1; b <= block.elseCount_; b++) {
        var elsecode = Blockly.ESP32.statementToCode(block, "varelseblock" + b);
        if (elsecode.trim().substring(0, 2) == "if") {
            code += "else" + elsecode;
        } else {
            code += "else\n{\n" + elsecode + "}\n";
        }
    }
    return code;
};
//==================================================================
//Define the function of temperature input block
Blockly.ESP32.temperature = function (block) {
    var dropdown_pin = block.getFieldValue('Pin');
    var dropdown_rangelimit = block.getFieldValue('RangeLimit');
    var number_sensorrangemin = block.getFieldValue('SensorRangeMin');
    var number_sensorrangemax = block.getFieldValue('SensorRangeMax');
    var statements_outputstmt = Blockly.ESP32.statementToCode(block, 'OutputStmt');
    Blockly.ESP32.reservePin(block, dropdown_pin, Blockly.ESP32.PinTypes.INPUT, block.type);

    var temp_func = '';
    var code = '';

    Blockly.ESP32.addInclude('temperature', '#define temp(x) (analogRead(x) / 2.048)');

    Blockly.ESP32.addSetup("io_" + dropdown_pin, "pinMode(" + dropdown_pin + ", INPUT); //Temperature", !1);
    temp_func = 'temp(' + dropdown_pin + ')';

    if (isNaN(Number(number_sensorrangemin)) || isNaN(Number(number_sensorrangemax))) {
        block.setWarningText("Invalid Range", "pwm_value");
    }
    else {
        if (Number(number_sensorrangemin) >= Number(number_sensorrangemax)) {
            block.setWarningText("The Sensor Range Min value must be less than Max value", "pwm_value");
        }
        else {
            if (Number(number_sensorrangemin < 0) || Number(number_sensorrangemax > 100)) {
                block.setWarningText("The Sensor Range value set must be between 0 and 100", "pwm_value");
            }
            else {
                block.setWarningText(null);
                if (block.andCount_ || block.orCount_) {
                    if (dropdown_rangelimit == 'Inside') {
                        if (Blockly.isMobile) {
                            code = 'if((ESP32.ReadEsp("te ' + Blockly.ESP32.pin_to_number(dropdown_pin) + '")>=' + number_sensorrangemin + ' && ESP32.ReadEsp("te ' + Blockly.ESP32.pin_to_number(dropdown_pin) + '")<=' + number_sensorrangemax + ')';
                        } else {
                            code = 'if((' + temp_func + ' >= ' + number_sensorrangemin + ' && ' + temp_func + ' <= ' + number_sensorrangemax + ')';
                        }
                    }
                    else {
                        if (Blockly.isMobile) {
                            code = 'if((ESP32.ReadEsp("te ' + Blockly.ESP32.pin_to_number(dropdown_pin) + '")<=' + number_sensorrangemin + ' || ESP32.ReadEsp("te ' + Blockly.ESP32.pin_to_number(dropdown_pin) + '")>=' + number_sensorrangemax + ')';
                        } else {
                            code = 'if((' + temp_func + ' <= ' + number_sensorrangemin + ' || ' + temp_func + ')>=' + number_sensorrangemax + ')';
                        }
                    }

                    for (var a = 1; a <= this.andCount_; a++) {
                        var dropdown_pinAND = block.getFieldValue('PinAND' + a);
                        var dropdown_rangelimitAND = block.getFieldValue('RangeLimitAND' + a);
                        var number_sensorrangeminAND = block.getFieldValue('SensorRangeMinAND' + a);
                        var number_sensorrangemaxAND = block.getFieldValue('SensorRangeMaxAND' + a);
                        Blockly.ESP32.reservePin(block, dropdown_pinAND, Blockly.ESP32.PinTypes.INPUT, block.type);

                        Blockly.ESP32.addInclude('temperature', '#define temp(x) (analogRead(x) / 2.048)');

                        Blockly.ESP32.addSetup("io_" + dropdown_pinAND, "pinMode(" + dropdown_pinAND + ", INPUT); //Temperature", !1);
                        temp_func = 'temp(' + dropdown_pinAND + ')';

                        if (dropdown_rangelimitAND == 'Inside') {
                            if (Blockly.isMobile) {
                                code += '&&(ESP32.ReadEsp("te ' + Blockly.ESP32.pin_to_number(dropdown_pinAND) + '")>=' + number_sensorrangeminAND + ' && ESP32.ReadEsp("te ' + Blockly.ESP32.pin_to_number(dropdown_pinAND) + '")<=' + number_sensorrangemaxAND + ')';
                            } else {
                                code += ' && (' + temp_func + ' >= ' + number_sensorrangeminAND + ' && ' + temp_func + ' <= ' + number_sensorrangemaxAND + ')';
                            }
                        }
                        else {
                            if (Blockly.isMobile) {
                                code += '&&(ESP32.ReadEsp("te ' + Blockly.ESP32.pin_to_number(dropdown_pinAND) + '")<=' + number_sensorrangeminAND + ' || ESP32.ReadEsp("te ' + Blockly.ESP32.pin_to_number(dropdown_pinAND) + '")>=' + number_sensorrangemaxAND + ')';
                            } else {
                                code += ' && (' + temp_func + ' <= ' + number_sensorrangeminAND + ' || ' + temp_func + ' >= ' + number_sensorrangemaxAND + ')';
                            }
                        }
                    }

                    for (var a = 1; a <= this.orCount_; a++) {
                        var dropdown_pinOR = block.getFieldValue('PinOR' + a);
                        var dropdown_rangelimitOR = block.getFieldValue('RangeLimitOR' + a);
                        var number_sensorrangeminOR = block.getFieldValue('SensorRangeMinOR' + a);
                        var number_sensorrangemaxOR = block.getFieldValue('SensorRangeMaxOR' + a);
                        Blockly.ESP32.reservePin(block, dropdown_pinOR, Blockly.ESP32.PinTypes.INPUT, block.type);

                        Blockly.ESP32.addInclude('temperature', '#define temp(x) (analogRead(x) / 2.048)');

                        Blockly.ESP32.addSetup("io_" + dropdown_pinOR, "pinMode(" + dropdown_pinOR + ", INPUT); //Temperature", !1);
                        temp_func = 'temp(' + dropdown_pinOR + ')';

                        if (dropdown_rangelimitOR == 'Inside') {
                            if (Blockly.isMobile) {
                                code += '||(ESP32.ReadEsp("te ' + Blockly.ESP32.pin_to_number(dropdown_pinOR) + '")>=' + number_sensorrangeminOR + ' && ESP32.ReadEsp("te ' + Blockly.ESP32.pin_to_number(dropdown_pinOR) + '")<=' + number_sensorrangemaxOR + ')';
                            } else {
                                code += ' || (' + temp_func + ' >= ' + number_sensorrangeminOR + ' && ' + temp_func + ' <= ' + number_sensorrangemaxOR + ')';
                            }
                        }
                        else {
                            if (Blockly.isMobile) {
                                code += '||(ESP32.ReadEsp("te ' + Blockly.ESP32.pin_to_number(dropdown_pinOR) + '")<=' + number_sensorrangeminOR + '|| ESP32.ReadEsp("te ' + Blockly.ESP32.pin_to_number(dropdown_pinOR) + '")>=' + number_sensorrangemaxOR + ')';
                            } else {
                                code += ' || (' + temp_func + ' <= ' + number_sensorrangeminOR + ' || ' + temp_func + ' >= ' + number_sensorrangemaxOR + ')';
                            }
                        }
                    }

                    code += ')\n{\n' + statements_outputstmt + '\n}\n';
                }
                else {
                    if (dropdown_rangelimit == 'Inside') {
                        if (Blockly.isMobile) {
                            code = 'if(ESP32.ReadEsp("te ' + Blockly.ESP32.pin_to_number(dropdown_pin) + '")>=' + number_sensorrangemin + ' && ESP32.ReadEsp("te ' + Blockly.ESP32.pin_to_number(dropdown_pin) + '")<=' + number_sensorrangemax + ')\n{\n' + statements_outputstmt + '\n}\n';
                        } else {
                            code = 'if(' + temp_func + ' >= ' + number_sensorrangemin + ' && ' + temp_func + ' <= ' + number_sensorrangemax + ')\n{\n' + statements_outputstmt + '}\n';
                        }
                    }
                    else {
                        if (Blockly.isMobile) {
                            code = 'if(ESP32.ReadEsp("te ' + Blockly.ESP32.pin_to_number(dropdown_pin) + '")<=' + number_sensorrangemin + ' || ESP32.ReadEsp("te ' + Blockly.ESP32.pin_to_number(dropdown_pin) + '")>=' + number_sensorrangemax + ')\n{\n' + statements_outputstmt + '}\n';
                        } else {
                            code = 'if(' + temp_func + ' <= ' + number_sensorrangemin + ' || ' + temp_func + ' >= ' + number_sensorrangemax + ')\n{\n' + statements_outputstmt + '}\n';
                        }
                    }
                }
            }
        }
    }

    for (var b = 1; b <= block.elseifCount_; b++) {
        var dropdown_pinELSEIF = block.getFieldValue('PinELSEIF' + b);
        var dropdown_rangelimitELSEIF = block.getFieldValue('RangeLimitELSEIF' + b);
        var number_sensorrangeminELSEIF = block.getFieldValue('SensorRangeMinELSEIF' + b);
        var number_sensorrangemaxELSEIF = block.getFieldValue('SensorRangeMaxELSEIF' + b);
        var elseifcode = Blockly.ESP32.statementToCode(block, "varelseifblock" + b);
        Blockly.ESP32.reservePin(block, dropdown_pinELSEIF, Blockly.ESP32.PinTypes.INPUT, block.type);

        Blockly.ESP32.addInclude('temperature', '#define temp(x) (analogRead(x) / 2.048)');

        Blockly.ESP32.addSetup("io_" + dropdown_pinELSEIF, "pinMode(" + dropdown_pinELSEIF + ", INPUT); //Temperature", !1);
        temp_func = 'temp(' + dropdown_pinELSEIF + ')';

        if (dropdown_rangelimitELSEIF == 'Inside') {
            if (Blockly.isMobile) {
                code += 'else if(ESP32.ReadEsp("te ' + Blockly.ESP32.pin_to_number(dropdown_pinELSEIF) + '")>=' + number_sensorrangeminELSEIF + ' && ESP32.ReadEsp("te ' + Blockly.ESP32.pin_to_number(dropdown_pinELSEIF) + '")<=' + number_sensorrangemaxELSEIF + ')\n{\n' + elseifcode + '}\n';
            } else {
                code += 'else if(' + temp_func + ' >= ' + number_sensorrangeminELSEIF + ' && ' + temp_func + ' <= ' + number_sensorrangemaxELSEIF + ')\n{\n' + elseifcode + '}\n';
            }
        }
        else {
            if (Blockly.isMobile) {
                code += 'else if(ESP32.ReadEsp("te ' + Blockly.ESP32.pin_to_number(dropdown_pinELSEIF) + '")<=' + number_sensorrangeminELSEIF + ' || ESP32.ReadEsp("te ' + Blockly.ESP32.pin_to_number(dropdown_pinELSEIF) + '")>=' + number_sensorrangemaxELSEIF + ')\n{\n' + elseifcode + '}\n';
            } else {
                code += 'else if(' + temp_func + ' <= ' + number_sensorrangeminELSEIF + ' || ' + temp_func + ' >= ' + number_sensorrangemaxELSEIF + ')\n{\n' + elseifcode + '}\n';
            }
        }
    }

    for (var b = 1; b <= block.elseCount_; b++) {
        var elsecode = Blockly.ESP32.statementToCode(block, "varelseblock" + b);
        if (elsecode.trim().substring(0, 2) == "if") {
            code += "else" + elsecode;
        } else {
            code += "else\n{" + elsecode + "}\n";
        }
    }

    return code;
};
//==================================================================
//Define the function of touch_Pad input block
Blockly.ESP32.touch_pad = function (block) {
    //window.alert("sssssssssssssss");
    var dropdown_pin = block.getFieldValue('Pin');
    var isButton = block.getFieldValue('touchType') === "Type2";
    var drpdwntouch_pin = block.getFieldValue('touchPin');
    var drpdwntouch_button = block.getFieldValue('touchButton');
    var statements_outputstmt = Blockly.ESP32.statementToCode(block, 'OutputStmt');
    Blockly.ESP32.reservePin(block, dropdown_pin, Blockly.ESP32.PinTypes.INPUT, block.type);

    var code = '';
    Blockly.ESP32.addInclude('touch_pad', '#define touchpad(x) (round(analogRead(x)*0.85/80)-1)');
    if (block.andCount_ || block.orCount_) {
        code = 'if((touchpad(' + dropdown_pin + ')== ' + (isButton ? drpdwntouch_button : drpdwntouch_pin) + ')';

        for (var a = 1; a <= this.andCount_; a++) {
            var dropdown_pinAND = block.getFieldValue('PinAND' + a);
            var isButtonAND = block.getFieldValue('touchTypeAND' + a) === "Type2";
            var drpdwntouch_pinAND = block.getFieldValue('touchPinAND' + a);
            var drpdwntouch_buttonAND = block.getFieldValue('touchButtonAND' + a);
            Blockly.ESP32.reservePin(block, dropdown_pinAND, Blockly.ESP32.PinTypes.INPUT, block.type);

            code += '&&(touchpad(' + dropdown_pinAND + ')== ' + (isButtonAND ? drpdwntouch_buttonAND : drpdwntouch_pinAND) + ')';
        }

        for (var a = 1; a <= this.orCount_; a++) {
            var dropdown_pinOR = block.getFieldValue('PinOR' + a);
            var isButtonOR = block.getFieldValue('touchTypeOR' + a) === "Type2";
            var drpdwntouch_pinOR = block.getFieldValue('touchPinOR' + a);
            var drpdwntouch_buttonOR = block.getFieldValue('touchButtonOR' + a);
            Blockly.ESP32.reservePin(block, dropdown_pinOR, Blockly.ESP32.PinTypes.INPUT, block.type);

            code += '||(touchpad(' + dropdown_pinOR + ')== ' + (isButtonOR ? drpdwntouch_buttonOR : drpdwntouch_pinOR) + ')';
        }

        code += ')\n{\n' + statements_outputstmt + '\n}\n';
    }
    else {
        code = 'if(touchpad(' + dropdown_pin + ')== ' + (isButton ? drpdwntouch_button : drpdwntouch_pin) + ')\n{\n' + statements_outputstmt + '\n}\n';
    }

    for (var b = 1; b <= block.elseifCount_; b++) {
        var dropdown_pinELSEIF = block.getFieldValue('PinELSEIF' + b);
        var isButtonELSEIF = block.getFieldValue('touchTypeELSEIF') === "Type2";
        var drpdwntouch_pinELSEIF = block.getFieldValue('touchPinELSEIF' + b);
        var drpdwntouch_buttonELSEIF = block.getFieldValue('touchButtonELSEIF' + b);
        var elseifcode = Blockly.ESP32.statementToCode(block, "varelseifblock" + b);
        Blockly.ESP32.reservePin(block, dropdown_pinELSEIF, Blockly.ESP32.PinTypes.INPUT, block.type);

        code += 'else if(touchpad(' + dropdown_pinELSEIF + ')== ' + (isButtonELSEIF ? drpdwntouch_buttonELSEIF : drpdwntouch_pinELSEIF) + ')\n{\n' + elseifcode + '\n}\n';
    }

    for (var b = 1; b <= block.elseCount_; b++) {
        var elsecode = Blockly.ESP32.statementToCode(block, "varelseblock" + b);
        if (elsecode.trim().substring(0, 2) == "if") {
            code += "else" + elsecode;
        } else {
            code += "else\n{\n" + elsecode + "}\n";
        }
    }
    return code;
};
Blockly.ESP32.ultrasonic = function (block) {
    var dropdown_pin = block.getFieldValue('Pin');
    var dropdown_rangelimit = block.getFieldValue('RangeLimit');
    var number_sensorrangemin = block.getFieldValue('SensorRangeMin');
    var number_sensorrangemax = block.getFieldValue('SensorRangeMax');
    var statements_outputstmt = Blockly.ESP32.statementToCode(block, 'OutputStmt');
    Blockly.ESP32.reservePin(block, dropdown_pin, Blockly.ESP32.PinTypes.INPUT, block.type);

    var code = '';

    Blockly.ESP32.addInclude('ultrasonic', '#define ultrasound(x) ((analogRead(x)*0.833)/4)');

    Blockly.ESP32.addSetup("io_" + dropdown_pin, "pinMode(" + dropdown_pin + ", INPUT); //Ultra Sonic", !1);

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
                block.setWarningText(null);
                if (block.andCount_ || block.orCount_) {
                    if (dropdown_rangelimit == 'Inside') {
                        if (Blockly.isMobile) {
                            code = 'if((ESP32.ReadEsp("us ' + Blockly.ESP32.pin_to_number(dropdown_pin) + '")>=' + number_sensorrangemin + ' && ESP32.ReadEsp("us ' + Blockly.ESP32.pin_to_number(dropdown_pin) + '")<=' + number_sensorrangemax + ')';
                        } else {
                            code = 'if((ultrasound(' + dropdown_pin + ')>=' + number_sensorrangemin + ' && ultrasound(' + dropdown_pin + ')<=' + number_sensorrangemax + ')';
                        }
                    }
                    else {
                        if (Blockly.isMobile) {
                            code = 'if((ESP32.ReadEsp("us ' + Blockly.ESP32.pin_to_number(dropdown_pin) + '")<=' + number_sensorrangemin + ' || ESP32.ReadEsp("us ' + Blockly.ESP32.pin_to_number(dropdown_pin) + '")>=' + number_sensorrangemax + ')';
                        } else {
                            code = 'if((ultrasound(' + dropdown_pin + ')<=' + number_sensorrangemin + '|| ultrasound(' + dropdown_pin + ')>=' + number_sensorrangemax + ')';
                        }
                    }

                    for (var a = 1; a <= this.andCount_; a++) {
                        var dropdown_pinAND = block.getFieldValue('PinAND' + a);
                        var dropdown_rangelimitAND = block.getFieldValue('RangeLimitAND' + a);
                        var number_sensorrangeminAND = block.getFieldValue('SensorRangeMinAND' + a);
                        var number_sensorrangemaxAND = block.getFieldValue('SensorRangeMaxAND' + a);
                        Blockly.ESP32.reservePin(block, dropdown_pinAND, Blockly.ESP32.PinTypes.INPUT, block.type);

                        Blockly.ESP32.addSetup("io_" + dropdown_pinAND, "pinMode(" + dropdown_pinAND + ", INPUT); //Ultra Sonic", !1);

                        if (dropdown_rangelimitAND == 'Inside') {
                            if (Blockly.isMobile) {
                                code += '&&(ESP32.ReadEsp("us ' + Blockly.ESP32.pin_to_number(dropdown_pinAND) + '")>=' + number_sensorrangeminAND + ' && ESP32.ReadEsp("us ' + Blockly.ESP32.pin_to_number(dropdown_pinAND) + '")<=' + number_sensorrangemaxAND + ')';
                            } else {
                                code += '&&(ultrasound(' + dropdown_pinAND + ')>=' + number_sensorrangeminAND + ' && ultrasound(' + dropdown_pinAND + ')<=' + number_sensorrangemaxAND + ')';
                            }
                        }
                        else {
                            if (Blockly.isMobile) {
                                code += '&&(ESP32.ReadEsp("us ' + Blockly.ESP32.pin_to_number(dropdown_pinAND) + '")<=' + number_sensorrangeminAND + ' || ESP32.ReadEsp("us ' + Blockly.ESP32.pin_to_number(dropdown_pinAND) + '")>=' + number_sensorrangemaxAND + ')';
                            } else {
                                code += '&&(ultrasound(' + dropdown_pinAND + ')<=' + number_sensorrangeminAND + ' || ultrasound(' + dropdown_pinAND + ')>=' + number_sensorrangemaxAND + ')';
                            }
                        }
                    }

                    for (var a = 1; a <= this.orCount_; a++) {
                        var dropdown_pinOR = block.getFieldValue('PinOR' + a);
                        var dropdown_rangelimitOR = block.getFieldValue('RangeLimitOR' + a);
                        var number_sensorrangeminOR = block.getFieldValue('SensorRangeMinOR' + a);
                        var number_sensorrangemaxOR = block.getFieldValue('SensorRangeMaxOR' + a);
                        Blockly.ESP32.reservePin(block, dropdown_pinOR, Blockly.ESP32.PinTypes.INPUT, block.type);

                        Blockly.ESP32.addSetup("io_" + dropdown_pinOR, "pinMode(" + dropdown_pinOR + ", INPUT); //Ultra Sonic", !1);

                        if (dropdown_rangelimitOR == 'Inside') {
                            if (Blockly.isMobile) {
                                code += '||(ESP32.ReadEsp("us ' + Blockly.ESP32.pin_to_number(dropdown_pinOR) + '")>=' + number_sensorrangeminOR + ' && ESP32.ReadEsp("us ' + Blockly.ESP32.pin_to_number(dropdown_pinOR) + '")<=' + number_sensorrangemaxOR + ')';
                            } else {
                                code += '||(ultrasound(' + dropdown_pinOR + ')>=' + number_sensorrangeminOR + ' && ultrasound(' + dropdown_pinOR + ')<=' + number_sensorrangemaxOR + ')';
                            }
                        }
                        else {
                            if (Blockly.isMobile) {
                                code += '||(ESP32.ReadEsp("us ' + Blockly.ESP32.pin_to_number(dropdown_pinOR) + '")<=' + number_sensorrangeminOR + '|| ESP32.ReadEsp("us ' + Blockly.ESP32.pin_to_number(dropdown_pinOR) + '")>=' + number_sensorrangemaxOR + ')';
                            } else {
                                code += '||(ultrasound(' + dropdown_pinOR + ')<=' + number_sensorrangeminOR + ' || ultrasound(' + dropdown_pinOR + ')>=' + number_sensorrangemaxOR + ')';
                            }
                        }
                    }

                    code += ')\n{\n' + statements_outputstmt + '\n}\n';
                }
                else {
                    if (dropdown_rangelimit == 'Inside') {
                        if (Blockly.isMobile) {
                            code = 'if(ESP32.ReadEsp("us ' + Blockly.ESP32.pin_to_number(dropdown_pin) + '")>=' + number_sensorrangemin + ' && ESP32.ReadEsp("us ' + Blockly.ESP32.pin_to_number(dropdown_pin) + '")<=' + number_sensorrangemax + ')\n{\n' + statements_outputstmt + '\n}\n';
                        } else {
                            code = 'if(ultrasound(' + dropdown_pin + ')>=' + number_sensorrangemin + ' && ultrasound(' + dropdown_pin + ')<=' + number_sensorrangemax + ')\n{\n' + statements_outputstmt + '\n}\n';
                        }
                    }
                    else {
                        if (Blockly.isMobile) {
                            code = 'if(ESP32.ReadEsp("us ' + Blockly.ESP32.pin_to_number(dropdown_pin) + '")<=' + number_sensorrangemin + ' || ESP32.ReadEsp("us ' + Blockly.ESP32.pin_to_number(dropdown_pin) + '")>=' + number_sensorrangemax + ')\n{\n' + statements_outputstmt + '}\n';
                        } else {
                            code = 'if(ultrasound(' + dropdown_pin + ')<=' + number_sensorrangemin + '|| ultrasound(' + dropdown_pin + ')>=' + number_sensorrangemax + ')\n{\n' + statements_outputstmt + '}\n';
                        }
                    }
                }
            }
        }
    }

    for (var b = 1; b <= block.elseifCount_; b++) {
        var dropdown_pinELSEIF = block.getFieldValue('PinELSEIF' + b);
        var dropdown_rangelimitELSEIF = block.getFieldValue('RangeLimitELSEIF' + b);
        var number_sensorrangeminELSEIF = block.getFieldValue('SensorRangeMinELSEIF' + b);
        var number_sensorrangemaxELSEIF = block.getFieldValue('SensorRangeMaxELSEIF' + b);
        var elseifcode = Blockly.ESP32.statementToCode(block, "varelseifblock" + b);
        Blockly.ESP32.reservePin(block, dropdown_pinELSEIF, Blockly.ESP32.PinTypes.INPUT, block.type);

        Blockly.ESP32.addSetup("io_" + dropdown_pinELSEIF, "pinMode(" + dropdown_pinELSEIF + ", INPUT); //Light Sensor", !1);

        if (dropdown_rangelimitELSEIF == 'Inside') {
            if (Blockly.isMobile) {
                code += 'else if(ESP32.ReadEsp("us ' + Blockly.ESP32.pin_to_number(dropdown_pinELSEIF) + '")>=' + number_sensorrangeminELSEIF + ' && ESP32.ReadEsp("us ' + Blockly.ESP32.pin_to_number(dropdown_pinELSEIF) + '")<=' + number_sensorrangemaxELSEIF + ')\n{\n' + elseifcode + '}\n';
            } else {
                code += 'else if(ultrasound(' + dropdown_pinELSEIF + ')>=' + number_sensorrangeminELSEIF + ' && ultrasound(' + dropdown_pinELSEIF + ')<=' + number_sensorrangemaxELSEIF + ')\n{\n' + elseifcode + '}\n';
            }
        }
        else {
            if (Blockly.isMobile) {
                code += 'else if(ESP32.ReadEsp("us ' + Blockly.ESP32.pin_to_number(dropdown_pinELSEIF) + '")<=' + number_sensorrangeminELSEIF + ' || ESP32.ReadEsp("us ' + Blockly.ESP32.pin_to_number(dropdown_pinELSEIF) + '")>=' + number_sensorrangemaxELSEIF + ')\n{\n' + elseifcode + '}\n';
            } else {
                code += 'else if(ultrasound(' + dropdown_pinELSEIF + ')<=' + number_sensorrangeminELSEIF + ' || ultrasound(' + dropdown_pinELSEIF + ')>=' + number_sensorrangemaxELSEIF + ')\n{\n' + elseifcode + '}\n';
            }
        }
    }

    for (var b = 1; b <= block.elseCount_; b++) {
        var elsecode = Blockly.ESP32.statementToCode(block, "varelseblock" + b);
        if (elsecode.trim().substring(0, 2) == "if")
            code += "else" + elsecode;
        else
            code += "else\n{" + elsecode + "}\n";
    }

    return code;
};
//==================================================================
//Define the function of custominput input block
Blockly.ESP32.custominput = function (block) {
    var dropdown_pin = block.getFieldValue('Pin');
    var dropdown_rangelimit = block.getFieldValue('RangeLimit');
    var number_sensorrangemin = block.getFieldValue('SensorRangeMin');
    var number_sensorrangemax = block.getFieldValue('SensorRangeMax');
    var dropdown_status = block.getFieldValue('status');
    var dropdown_choice = block.getFieldValue('choice');
    var txt_name = block.getFieldValue('name').replace(/\s/g, "_");
    block.setFieldValue(txt_name, 'name');
    var statements_outputstmt = Blockly.ESP32.statementToCode(block, 'OutputStmt');
    Blockly.ESP32.reservePin(block, dropdown_pin, Blockly.ESP32.PinTypes.INPUT, block.type);

    var code = '\n';
    Blockly.ESP32.addInclude('custominput' + txt_name, '#define ' + txt_name + '(x) analogRead(x)');

    Blockly.ESP32.addSetup("io_" + dropdown_pin, "pinMode(" + dropdown_pin + ", INPUT); //" + txt_name, !1);

    if (block.andCount_ || block.orCount_) {
        if (dropdown_choice == 'SIGNAL') {
            if (dropdown_rangelimit == 'Inside') {
                if (Blockly.isMobile) {
                    code = 'if((ESP32.ReadESP32("ar ' + Blockly.ESP32.pin_to_number(dropdown_pin) + '")>=' + number_sensorrangemin + ' && ESP32.ReadESP32("ar ' + Blockly.ESP32.pin_to_number(dropdown_pin) + '")<=' + number_sensorrangemax + ')';
                } else {
                    code = 'if((' + txt_name + '(' + dropdown_pin + ')>=' + number_sensorrangemin + ' && ' + txt_name + '(' + dropdown_pin + ')<=' + number_sensorrangemax + ')';
                }
            }
            else {
                if (Blockly.isMobile) {
                    code = 'if((ESP32.ReadESP32("ar ' + Blockly.ESP32.pin_to_number(dropdown_pin) + '")<=' + number_sensorrangemin + ' && ESP32.ReadESP32("ar ' + Blockly.ESP32.pin_to_number(dropdown_pin) + '")>=' + number_sensorrangemax + ')';
                } else {
                    code = 'if((' + txt_name + '(' + dropdown_pin + ')<=' + number_sensorrangemin + ' || ' + txt_name + '(' + dropdown_pin + ')>=' + number_sensorrangemax + ')';
                }
            }
        }
        else {
            if (Blockly.isMobile) {
                dropdown_status = dropdown_status == 'RISING' ? "1" : "0";
                code = 'if((ESP32.ReadESP32("ar ' + Blockly.ESP32.pin_to_number(dropdown_pin) + '")==' + dropdown_status + ')';
            } else {
                code = 'if((' + 'edge' + '(' + dropdown_pin + ', ' + dropdown_status + '))';
            }
        }

        for (var a = 1; a <= this.andCount_; a++) {
            var dropdown_statusAND = block.getFieldValue('statusAND' + a);
            var dropdown_choiceAND = block.getFieldValue('choiceAND' + a);
            var dropdown_pinAND = block.getFieldValue('PinAND' + a);
            var dropdown_rangelimitAND = block.getFieldValue('RangeLimitAND' + a);
            var number_sensorrangeminAND = block.getFieldValue('SensorRangeMinAND' + a);
            var number_sensorrangemaxAND = block.getFieldValue('SensorRangeMaxAND' + a);
            Blockly.ESP32.reservePin(block, dropdown_pinAND, Blockly.ESP32.PinTypes.INPUT, block.type);

            Blockly.ESP32.addSetup("io_" + dropdown_pinAND, "pinMode(" + dropdown_pinAND + ", INPUT);//" + txt_name, !1);

            if (dropdown_choiceAND == 'SIGNAL') {
                if (dropdown_rangelimitAND == 'Inside') {
                    if (Blockly.isMobile) {
                        code += '&&(ESP32.ReadESP32("ar ' + Blockly.ESP32.pin_to_number(dropdown_pinAND) + '")>=' + number_sensorrangeminAND + ' && ESP32.ReadESP32("ar ' + Blockly.ESP32.pin_to_number(dropdown_pinAND) + '")<=' + number_sensorrangemaxAND + ')';
                    } else {
                        code += '&&(' + txt_name + '(' + dropdown_pinAND + ')>=' + number_sensorrangeminAND + ' && ' + txt_name + '(' + dropdown_pinAND + ')<=' + number_sensorrangemaxAND + ')';
                    }
                }
                else {
                    if (Blockly.isMobile) {
                        code += '&&(ESP32.ReadESP32("ar ' + Blockly.ESP32.pin_to_number(dropdown_pinAND) + '")<=' + number_sensorrangeminAND + ' && ESP32.ReadESP32("ar ' + Blockly.ESP32.pin_to_number(dropdown_pinAND) + '")>=' + number_sensorrangemaxAND + ')';
                    } else {
                        code += '&&(' + txt_name + '(' + dropdown_pinAND + ')<=' + number_sensorrangeminAND + ' || ' + txt_name + '(' + dropdown_pinAND + ')>=' + number_sensorrangemaxAND + ')';
                    }
                }
            }
            else {
                if (Blockly.isMobile) {
                    dropdown_statusAND = dropdown_statusAND == 'RISING' ? "1" : "0";
                    code += '&&(ESP32.ReadESP32("ar ' + Blockly.ESP32.pin_to_number(dropdown_pinAND) + '")==' + dropdown_statusAND + ')';
                } else {
                    code += '&&(' + 'edge' + '(' + dropdown_pinAND + ',' + dropdown_statusAND + '))';
                }
            }
        }

        for (var a = 1; a <= this.orCount_; a++) {
            var dropdown_statusOR = block.getFieldValue('statusOR' + a);
            var dropdown_choiceOR = block.getFieldValue('choiceOR' + a);
            var dropdown_pinOR = block.getFieldValue('PinOR' + a);
            var dropdown_rangelimitOR = block.getFieldValue('RangeLimitOR' + a);
            var number_sensorrangeminOR = block.getFieldValue('SensorRangeMinOR' + a);
            var number_sensorrangemaxOR = block.getFieldValue('SensorRangeMaxOR' + a);
            Blockly.ESP32.reservePin(block, dropdown_pinOR, Blockly.ESP32.PinTypes.INPUT, block.type);

            Blockly.ESP32.addSetup("io_" + dropdown_pinOR, "pinMode(" + dropdown_pinOR + ", INPUT); //" + txt_name, !1);

            if (dropdown_choiceOR == 'SIGNAL') {
                if (dropdown_rangelimitOR == 'Inside') {
                    if (Blockly.isMobile) {
                        code += '||(ESP32.ReadESP32("ar ' + Blockly.ESP32.pin_to_number(dropdown_pinOR) + '")>=' + number_sensorrangeminOR + ' || ESP32.ReadESP32("ar ' + Blockly.ESP32.pin_to_number(dropdown_pinOR) + '")<=' + number_sensorrangemaxOR + ')';
                    } else {
                        code += '||(' + txt_name + '(' + dropdown_pinOR + ')>=' + number_sensorrangeminOR + ' && ' + txt_name + '(' + dropdown_pinOR + ')<=' + number_sensorrangemaxOR + ')';
                    }
                }
                else {
                    if (Blockly.isMobile) {
                        code += '||(ESP32.ReadESP32("ar ' + Blockly.ESP32.pin_to_number(dropdown_pinOR) + '")<=' + number_sensorrangeminOR + ' || ESP32.ReadESP32("ar ' + Blockly.ESP32.pin_to_number(dropdown_pinOR) + '")>=' + number_sensorrangemaxOR + ')';
                    } else {
                        code += '||(' + txt_name + '(' + dropdown_pinOR + ')<=' + number_sensorrangeminOR + ' || ' + txt_name + '(' + dropdown_pinOR + ')>=' + number_sensorrangemaxOR + ')';
                    }
                }
            }
            else {
                if (Blockly.isMobile) {
                    dropdown_statusOR = dropdown_statusOR == 'RISING' ? "1" : "0";
                    code += '||(ESP32.ReadESP32("ar ' + Blockly.ESP32.pin_to_number(dropdown_pinOR) + '")==' + dropdown_statusOR + ')';
                } else {
                    code += '||(' + 'edge' + '(' + dropdown_pinOR + ', ' + dropdown_statusOR + '))';
                }
            }
        }

        code += ')\n{\n' + statements_outputstmt + '\n}\n';
    }
    else {
        if (dropdown_choice == 'SIGNAL') {
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
                                code = 'if(ESP32.ReadESP32("ar ' + Blockly.ESP32.pin_to_number(dropdown_pin) + '")>=' + number_sensorrangemin + ' && ESP32.ReadESP32("ar ' + Blockly.ESP32.pin_to_number(dropdown_pin) + '")<=' + number_sensorrangemax + ')\n{\n' + statements_outputstmt + '\n}\n';
                            } else {
                                code = 'if(' + txt_name + '(' + dropdown_pin + ')>=' + number_sensorrangemin + ' && ' + txt_name + '(' + dropdown_pin + ')<=' + number_sensorrangemax + ')\n{\n' + statements_outputstmt + '\n}\n';
                            }
                        }
                        else {
                            if (Blockly.isMobile) {
                                code = 'if(ESP32.ReadESP32("ar ' + Blockly.ESP32.pin_to_number(dropdown_pin) + '")<=' + number_sensorrangemin + ' && ESP32.ReadESP32("ar ' + Blockly.ESP32.pin_to_number(dropdown_pin) + '")>=' + number_sensorrangemax + ')\n{\n' + statements_outputstmt + '}\n';
                            } else {
                                code = 'if(' + txt_name + '(' + dropdown_pin + ')<=' + number_sensorrangemin + '|| ' + txt_name + '(' + dropdown_pin + ')>=' + number_sensorrangemax + ')\n{\n' + statements_outputstmt + '}\n';
                            }
                        }
                    }
                }
            }
        }
        else {
            if (Blockly.isMobile) {
                dropdown_status = dropdown_status == 'RISING' ? "1" : "0";
                code = 'if((ESP32.ReadESP32("ar ' + Blockly.ESP32.pin_to_number(dropdown_pin) + '")==' + dropdown_status + '))\n{\n' + statements_outputstmt + '}\n';
            } else {
                code = 'if(' + 'edge' + '(' + dropdown_pin + ', ' + dropdown_status + '))\n{\n' + statements_outputstmt + '}\n';
            }
        }
    }

    for (var a = 1; a <= block.elseifCount_; a++) {
        var dropdown_statusELSEIF = block.getFieldValue('statusELSEIF' + a);
        var dropdown_choiceELSEIF = block.getFieldValue('choiceELSEIF' + a);
        var dropdown_pinELSEIF = block.getFieldValue('PinELSEIF' + a);
        var dropdown_rangelimitELSEIF = block.getFieldValue('RangeLimitELSEIF' + a);
        var number_sensorrangeminELSEIF = block.getFieldValue('SensorRangeMinELSEIF' + a);
        var number_sensorrangemaxELSEIF = block.getFieldValue('SensorRangeMaxELSEIF' + a);
        var elseifcode = Blockly.ESP32.statementToCode(block, "varelseifblock" + a);
        Blockly.ESP32.reservePin(block, dropdown_pinELSEIF, Blockly.ESP32.PinTypes.INPUT, block.type);

        Blockly.ESP32.addSetup("io_" + dropdown_pinELSEIF, "pinMode(" + dropdown_pinELSEIF + ", INPUT); //" + txt_name, !1);

        if (dropdown_choiceELSEIF == 'SIGNAL') {
            if (isNaN(Number(number_sensorrangeminELSEIF)) || isNaN(Number(number_sensorrangemaxELSEIF))) {
                block.setWarningText("Invalid Range", "pwm_value");
            }
            else {
                if (Number(number_sensorrangeminELSEIF) >= Number(number_sensorrangemaxELSEIF)) {
                    block.setWarningText("The Sensor Range Min value must be less than Max value", "pwm_value");
                }
                else {
                    if (Number(number_sensorrangeminELSEIF < 0) || Number(number_sensorrangemaxELSEIF > 1023)) {
                        block.setWarningText("The Sensor Range value set must be between 0 and 1023", "pwm_value");
                    }
                    else {
                        block.setWarningText(null);
                        if (dropdown_rangelimitELSEIF == 'Inside') {
                            if (Blockly.isMobile) {
                                code += 'else if(ESP32.ReadESP32("ar ' + Blockly.ESP32.pin_to_number(dropdown_pinELSEIF) + '")>=' + number_sensorrangeminELSEIF + ' && ESP32.ReadESP32("ar ' + Blockly.ESP32.pin_to_number(dropdown_pinELSEIF) + '")<=' + number_sensorrangemaxELSEIF + ')\n{\n' + elseifcode + '\n}\n';
                            } else {
                                code += 'else if(' + txt_name + '(' + dropdown_pinELSEIF + ')>=' + number_sensorrangeminELSEIF + ' && ' + txt_name + '(' + dropdown_pinELSEIF + ')<=' + number_sensorrangemaxELSEIF + ')\n{\n' + elseifcode + '\n}\n';
                            }
                        }
                        else {
                            if (Blockly.isMobile) {
                                code += 'else if(ESP32.ReadESP32("ar ' + Blockly.ESP32.pin_to_number(dropdown_pinELSEIF) + '")<=' + number_sensorrangeminELSEIF + ' && ESP32.ReadESP32("ar ' + Blockly.ESP32.pin_to_number(dropdown_pinELSEIF) + '")>=' + number_sensorrangemaxELSEIF + ')\n{\n' + elseifcode + '\n}\n';
                            } else {
                                code += 'else if(' + txt_name + '(' + dropdown_pinELSEIF + ')<=' + number_sensorrangeminELSEIF + '|| ' + txt_name + '(' + dropdown_pinELSEIF + ')>=' + number_sensorrangemaxELSEIF + ')\n{\n' + elseifcode + '}\n';
                            }
                        }
                    }
                }
            }
        }
        else {
            if (Blockly.isMobile) {
                dropdown_statusELSEIF = dropdown_statusELSEIF == 'RISING' ? '1' : '0';
                code += 'else if((ESP32.ReadESP32("ar ' + Blockly.ESP32.pin_to_number(dropdown_pinELSEIF) + '")==' + dropdown_statusELSEIF + '))\n{\n' + elseifcode + '}\n';
            } else {
                code += 'else if(' + 'edge' + '(' + dropdown_pinELSEIF + ',' + dropdown_statusELSEIF + '))\n{\n' + elseifcode + '}\n';
            }
        }
    }

    for (var b = 1; b <= block.elseCount_; b++) {
        var elsecode = Blockly.ESP32.statementToCode(block, "varelseblock" + b);
        if (elsecode.trim().substring(0, 2) == "if") {
            code += "else" + elsecode;
        } else {
            code += "else\n{\n" + elsecode + "}\n";
        }
    }
    return code;
};
// Input code - ends