//================================================================
//this code define the blocks at output set
// the output set contains Blockly.ESP32 blocks
    //'bluetoothtx'
    //'buzzer'
    //'lcd'
    //'led'
    //'motor'
    //'mp3_player'
    //'relay'
    //'rgbstrip'
    //'servo_device'
    //'steppermotor'
    //'customoutput'
    //=================================================================
// Output code - begins
//====================================================
//define the content of the bluetoothrx
Blockly.ESP32.bluetoothtx = function (block) {
    var dropdown_pin = block.getFieldValue('Pin');
    var chk_new_line = block.getFieldValue('chkNewline');
    var chk_delay = block.getFieldValue('chkDelay');
    var dropdown_baudrate = "9600";
    var value_vardata = Blockly.ESP32.valueToCode(block, 'varData', Blockly.ESP32.ORDER_ATOMIC);
    Blockly.ESP32.reservePin(block, dropdown_pin, Blockly.ESP32.PinTypes.OUTPUT, block.type);
    
    //============================= define the default view of the bluetoothrx output before customization
    
    var code = '';
    var serial = 'Serial';
    if (dropdown_pin == '14') {
        if (Blockly.Blocks.ConnectedBoard === 'FFC_ESP32') {
            serial = 'Serial1';
        }
        Blockly.ESP32.addSetup("io_" + dropdown_pin, serial + '.begin(' + dropdown_baudrate + '); //Serial Tx', !1);

        code = serial + '.print(' + value_vardata + ');\n';

        if (chk_new_line == 'TRUE') {
            code += serial + '.println();\n';
        }
    }
    else {
        Blockly.ESP32.addVariable('mybluetoothTx' + dropdown_pin, 'SoftwareSerial mybluetoothTx' + dropdown_pin + '(255,' + dropdown_pin + ');', !1);
        Blockly.ESP32.addInclude('serialtx', '#include "SoftwareSerial.h"');
        Blockly.ESP32.addSetup("io_" + dropdown_pin, 'mybluetoothTx' + dropdown_pin + '.begin(' + dropdown_baudrate + '); //Serial Tx', !1);

        code = 'mybluetoothTx' + dropdown_pin + '.print(' + value_vardata + ');\n';

        if (chk_new_line == 'TRUE') {
            code += 'mybluetoothTx' + dropdown_pin + '.println();\n';
        }
    }

    if (chk_delay == 'TRUE') {
        code += 'delay(100);\n';
    }
    return code;
};
//===========================================================================
//define the content of the buzzer
Blockly.ESP32.buzzer = function (block) {
    var dropdown_pin = block.getFieldValue('Pin');
    var isMute = block.getFieldValue('muteValue') === "mute";
    var SelectionDrpDwn = block.getFieldValue('SelectionDrpDwn');
    var dropdown_frequency = block.getFieldValue('frequency');
    var SingDrpDwn = block.getFieldValue('Sing');
    var variable_Frequency = Blockly.ESP32.valueToCode(block, 'varFrequency', Blockly.ESP32.ORDER_ATOMIC);
    var variable_Duration = Blockly.ESP32.valueToCode(block, 'varDuration', Blockly.ESP32.ORDER_ATOMIC);
    Blockly.ESP32.reservePin(block, dropdown_pin, Blockly.ESP32.PinTypes.OUTPUT, block.type);

    if (Blockly.isMobile && Blockly.Blocks.ConnectedBoard !== 'ESP32X') {
        if (isNaN(parseInt(variable_Frequency, 10))) {
            variable_Frequency = '"+' + variable_Frequency + '+"';
        }
        if (isNaN(parseInt(variable_Duration, 10))) {
            variable_Duration = '"+' + variable_Duration;
        }
        else {
            variable_Duration = variable_Duration + '"'
        }
    }
    // ================================= define the default view of the buzzer output before customization
    var code = '';

    if (dropdown_pin === '18' && Blockly.Blocks.ConnectedBoard === 'ESP324' && !Blockly.isMobile) {
        dropdown_pin = 'esp4_buzzer_pin';
    }

    if (SelectionDrpDwn == 'Frequency') {
        Blockly.ESP32.addSetup("io_" + dropdown_pin, "espSingInit(" + dropdown_pin + "); //Buzzer", !1);
        if (!isMute) {
            if (dropdown_frequency == 1000) {
                if (Blockly.isMobile) {
                    code = 'ESP32.WriteESP32("tn ' + Blockly.ESP32.pin_to_number(dropdown_pin) + ' ' + variable_Frequency + ' ' + variable_Duration + ');\n';
                } else {
                    code = 'tone(' + dropdown_pin + ', ' + variable_Frequency + ', ' + variable_Duration + ');\n';
                }
            }
            else {
                if (Blockly.isMobile) {
                    code = 'ESP32.WriteESP32("tn ' + Blockly.ESP32.pin_to_number(dropdown_pin) + ' ' + dropdown_frequency + ' ' + variable_Duration + ');\n';
                } else {
                    code = 'tone(' + dropdown_pin + ', ' + dropdown_frequency + ', ' + variable_Duration + ');\n';
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
    }
    else if (SelectionDrpDwn == 'Sing') {
        Blockly.ESP32.addSetup("io_" + dropdown_pin, "espSingInit(" + dropdown_pin + "); //Buzzer", !1);
        if (!isMute) {
            if (Blockly.isMobile) {
                code = 'ESP32.WriteESP32("sg ' + Blockly.ESP32.pin_to_number(dropdown_pin) + ' ' + SingDrpDwn + '");\n';
            } else {
                code = "espSing(" + SingDrpDwn + ");\n";
            }
        }
        else {
            if (Blockly.isMobile) {
                code = 'ESP32.WriteESP32("tn ' + Blockly.ESP32.pin_to_number(dropdown_pin) + ' 0 1");\n';
            } else {
                code = 'noTone(' + dropdown_pin + ');\n';
            }
        }
    }

    return code;
};
//===================================================================================
//define the content of the lcd
Blockly.ESP32.lcd = function (block) {
    if (Blockly.Blocks.isMultitask) {
        block.setWarningText("LCD not supported with Multitasking", "lcd_multitask");
        return "";
    }
    block.setWarningText(null, "lcd_multitask");

    var dropdown_pin = block.getFieldValue('Pin');
    var text_lcdname = 'lcd';
    var number_row = block.getFieldValue('row');
    var number_coloumn = block.getFieldValue('coloumn');
    var number_delay = Blockly.isMobile ? "" : block.getFieldValue('delay');
    var value_vardata = Blockly.ESP32.valueToCode(block, 'varData', Blockly.ESP32.ORDER_ATOMIC);
    Blockly.ESP32.reservePin(block, dropdown_pin, Blockly.ESP32.PinTypes.OUTPUT, block.type);

    if (!Blockly.isMobile) {
        Blockly.ESP32.addInclude('lcd', '#include "SoftwareSerial.h"');
        Blockly.ESP32.addSetup("io_" + dropdown_pin, text_lcdname + dropdown_pin + '.begin(2400); //LCD', !1);
        Blockly.ESP32.addVariable(text_lcdname + dropdown_pin, 'SoftwareSerial ' + text_lcdname + dropdown_pin + '(255,' + dropdown_pin + ');', !1);
        Blockly.ESP32.addVariable('d' + dropdown_pin, 'String ' + 'd' + dropdown_pin + ';', !1);
    }
    //=================================== define the default view of the lcd output before customization
    var code = '\n', option = '';
    if (block.getFieldValue('chkClear') == 'TRUE' && block.getFieldValue('chkScroll') == 'FALSE') {
        option = 'CN';
    }
    else if (block.getFieldValue('chkClear') == 'FALSE' && block.getFieldValue('chkScroll') == 'TRUE') {
        option = 'NY';
    }
    else if (block.getFieldValue('chkClear') == 'TRUE' && block.getFieldValue('chkScroll') == 'TRUE') {
        option = 'CY';
    }
    else {
        option = 'NN';
    }

    if (Blockly.isMobile) {
        code = 'ESP32.WriteEsp("ss ' + Blockly.ESP32.pin_to_number(dropdown_pin) + ' 2400 $' + ("0" + number_coloumn).slice(-2) + number_row + '' + option + '"+' + value_vardata + '+"#||")\nEsp.DelayEsp(200)\n';
    } else {
        code = 'd' + dropdown_pin + '="$' + ("0" + number_coloumn).slice(-2) + number_row + '' + option + '";\n';
        if (value_vardata.substring(0, 4) == "temp") {
            code += 'd' + dropdown_pin + '+=(int)(' + value_vardata + ');\nd' + dropdown_pin + '+="#";\n';
        } else {
            code += 'd' + dropdown_pin + '+=' + value_vardata + ';\nd' + dropdown_pin + '+="#";\n';
        }
        code += text_lcdname + dropdown_pin + '.println(d' + dropdown_pin + ');\ndelay(' + number_delay + ');\n';
    }
    return code;
};
/* Blockly.ESP32.led = function (block) {
var dropdown_pin = block.getFieldValue('Pin');
var dropdown_status = block.getFieldValue('status');
Blockly.ESP32.reservePin(block, dropdown_pin, Blockly.ESP32.PinTypes.OUTPUT, block.type);

var code = '';
var codeHeader = `\n<span class='codeKeyword'>void </span><span class='codeMethod'>IRAM_ATTR Task2</span>(void *parameter)
{
<span class='ml-tab1'>while(1)</span>
<span class='ml-tab1'>{</span>\n`;

var codeFooter = `\n<span class='ml-tab1'>}</span>
}\n`;

Blockly.ESP32.addSetup("io_" + dropdown_pin, "<span class='ml-tab1'>pinMode(" + (dropdown_pin == 8 ? 'PIN' : dropdown_pin) + ", OUTPUT); //LED</span>", !1);
code = "<span class='ml-tab2'>digitalWrite(" + (dropdown_pin == 8 ? 'PIN' : dropdown_pin) + ', ' + dropdown_status + ');</span>';

for (var i = 1; i <= block.outputCount_; i++) {
var dropdown_pinNxt = block.getFieldValue('PinAND' + i);
var dropdown_statusNxt = block.getFieldValue('status' + i);
Blockly.ESP32.reservePin(block, dropdown_pinNxt, Blockly.ESP32.PinTypes.OUTPUT, block.type);

Blockly.ESP32.addSetup("io_" + dropdown_pinNxt, "<span class='ml-tab1'>pinMode(" + (dropdown_pinNxt == 8 ? 'PIN' : dropdown_pinNxt) + ", OUTPUT); //LED</span>", !1);
code += "\n<span class='ml-tab2'>digitalWrite(" + (dropdown_pinNxt == 8 ? 'PIN' : dropdown_pinNxt) + ', ' + dropdown_statusNxt + ');</span>';
}

return codeHeader + code + codeFooter;
}; */
//==============================================================================
//define the content of the led

Blockly.ESP32.led = function (block) {
    var dropdown_pin = block.getFieldValue('Pin');
    var dropdown_status = block.getFieldValue('status');
    Blockly.ESP32.reservePin(block, dropdown_pin, Blockly.ESP32.PinTypes.OUTPUT, block.type);
    //======================== define the default view of the led output before customization
    var code = '';
    if (Blockly.isMobile) {
        dropdown_status = dropdown_status == 'HIGH' ? ' 1' : ' 0';
        code = 'ESP32.WriteESP32("dw ' + Blockly.ESP32.pin_to_number(dropdown_pin) + dropdown_status + '");\n';
    } else {
        Blockly.ESP32.addSetup("io_" + dropdown_pin, "pinMode(" + dropdown_pin + ", OUTPUT); //LED", !1);
        code = 'digitalWrite(' + dropdown_pin + ', ' + dropdown_status + ');\n';
    }

    for (var i = 1; i <= block.outputCount_; i++) {
        var dropdown_pinNxt = block.getFieldValue('PinAND' + i);
        var dropdown_statusNxt = block.getFieldValue('status' + i);
        Blockly.ESP32.reservePin(block, dropdown_pinNxt, Blockly.ESP32.PinTypes.OUTPUT, block.type);

        if (Blockly.isMobile) {
            dropdown_statusNxt = dropdown_statusNxt == 'HIGH' ? ' 1' : ' 0';
            code += 'ESP32.WriteESP32("dw ' + Blockly.ESP32.pin_to_number(dropdown_pinNxt) + dropdown_statusNxt + '");\n';
        } else {
            Blockly.ESP32.addSetup("io_" + dropdown_pinNxt, "pinMode(" + dropdown_pinNxt + ", OUTPUT); //LED", !1);
            code += 'digitalWrite(' + dropdown_pinNxt + ', ' + dropdown_statusNxt + ');\n';
        }
    }
    return code;
};
//============================================================================
//define the content of the motor

Blockly.ESP32.motor = function (block) {
    var checkbox_chkleft = block.getFieldValue('chkLeft') == 'TRUE';
    var checkbox_chkright = block.getFieldValue('chkRight') == 'TRUE';
    var value_varleft = Blockly.ESP32.valueToCode(block, 'varLeft', Blockly.ESP32.ORDER_ATOMIC);
    var value_varright = Blockly.ESP32.valueToCode(block, 'varRight', Blockly.ESP32.ORDER_ATOMIC);
    //==================================== define the default view of the motor output before customization
    var code = '', tempCode = '';
    if (checkbox_chkleft) {
        if (Blockly.isMobile) {
            tempCode += '"+' + value_varleft + '+" ';
        } else {
            if (Blockly.Blocks.ConnectedBoard === 'FFC_ESP32') {
                code = 'LeftMotor(' + value_varleft + ');\n';
            }
            else {
                code = 'LMotor_1(' + value_varleft + ');\n';
            }
        }
    } else if (Blockly.isMobile) {
        tempCode += '20 ';
    }

    if (checkbox_chkright) {
        if (Blockly.isMobile) {
            tempCode += '"+' + value_varright + '+"';
        } else {
            if (Blockly.Blocks.ConnectedBoard === 'FFC_ESP32') {
                code += 'RightMotor(' + value_varright + ');\n';
            }
            else {
                code += 'RMotor_1(' + value_varright + ');\n';
            }
        }
    } else if (Blockly.isMobile) {
        tempCode += '20 ';
    } //m 10 -5 2

    if (Blockly.isMobile) {
        code += 'ESP32.WriteEsp("m ' + tempCode + '");\n';
    }
    return code;
};
//======================================================================
//define the content of the mp3_player

Blockly.ESP32.mp3_player = function (block) {
    var dropdown_pin = block.getFieldValue('Pin');
    var SelectionDrpDwn = block.getFieldValue('SelectionDrpDwn');
    var TRACK_NUMBER = block.getFieldValue('TRACK_NUMBER');
    var VOLUME = block.getFieldValue('VOLUME');
    Blockly.ESP32.reservePin(block, dropdown_pin, Blockly.ESP32.PinTypes.OUTPUT, "mp3_player");
    //============================== define the default view of the mp3_player output before customization
    Blockly.ESP32.addInclude('mp3_playerinclude', '#include "SparkFun_WT2003S_MP3_Decoder.h"\n' +
        '// Defining some status codes from the WT2003S\n' +
        '#define STATUS_PLAY 0x01\n' +
        '#define STATUS_STOP 0x02\n' +
        '#define STATUS_PAUSE 0x03\n' +
        'WT2003S MP3_' + dropdown_pin + '; // Create an object of the WT2003S class called MP3');
    Blockly.ESP32.addVariable("mp3_" + dropdown_pin, 'SoftwareSerial mp3_' + dropdown_pin + '(255,' + dropdown_pin + ');', !1);
    Blockly.ESP32.addSetup("mp3_" + SelectionDrpDwn, "MP3_" + dropdown_pin + ".begin(mp3_" + dropdown_pin + ");\n\t" + "MP3_" + dropdown_pin + ".setVolume(" + 25 + ");", !1);

    var Code = '';
    if (SelectionDrpDwn == "Play") {
        Code = 'MP3_' + dropdown_pin + '.pause();';
    }
    else if (SelectionDrpDwn == "Stop") {
        Code = 'MP3_' + dropdown_pin + '.stopPlaying();';
    }
    else if (SelectionDrpDwn == "Setvolume") {
        Code = 'MP3_' + dropdown_pin + '.setVolume(' + VOLUME + ');';
    }
    else if (SelectionDrpDwn == "PlayTrackNumber") {
        Code = 'MP3_' + dropdown_pin + '.playTrackNumber(' + TRACK_NUMBER + ');';
    }
    else if (SelectionDrpDwn == "PlayPrevious") {
        Code = 'MP3_' + dropdown_pin + '.playPrevious();';
    }
    else if (SelectionDrpDwn == "PlayNext") {
        Code = 'MP3_' + dropdown_pin + '.playNext();';
    }

    return Code;
};
//====================================================================
//define the content of the relay

Blockly.ESP32.relay = function (block) {
    var dropdown_pin = block.getFieldValue('Pin');
    var dropdown_status = block.getFieldValue('status');
    var chk_flip = block.getFieldValue('chkFlip');
    Blockly.ESP32.reservePin(block, dropdown_pin, Blockly.ESP32.PinTypes.OUTPUT, block.type);
    //============================================ define the default view of the relay output before customization
    var code = '';
    if (Blockly.Blocks.ConnectedBoard === 'ESPX') {
        Blockly.ESP32.addInclude('relayespX', 'from esp import Relay');

        if (block.outputCount_) {
            if (chk_flip == "TRUE") {
                dropdown_status = dropdown_status === "HIGH" ? "LOW" : "HIGH";
            }
            code = '\n\tRelay(esp.' + dropdown_pin + ',esp.' + dropdown_status + ')';

            for (var i = 1; i <= block.outputCount_; i++) {
                var dropdown_pinNxt = block.getFieldValue('PinAND' + i);
                var dropdown_statusNxt = block.getFieldValue('status' + i);
                var chk_flipNxt = block.getFieldValue('chkFlip' + i);
                Blockly.ESP32.reservePin(block, dropdown_pinNxt, Blockly.ESP32.PinTypes.OUTPUT, block.type);

                if (chk_flipNxt == "TRUE") {
                    dropdown_statusNxt = dropdown_statusNxt === "HIGH" ? "LOW" : "HIGH";
                }
                code += '\n\tRelay(esp.' + dropdown_pinNxt + ',esp.' + dropdown_statusNxt + ')';
            }
        }
        else {
            if (chk_flip == "TRUE") {
                dropdown_status = dropdown_status === "HIGH" ? "LOW" : "HIGH";
            }
            code = '\n\tRelay(esp.' + dropdown_pin + ',esp.' + dropdown_status + ')';
        }
    }
    else {
        Blockly.ESP32.addSetup("io_" + dropdown_pin, "pinMode(" + dropdown_pin + ", OUTPUT); //Relay", !1);

        if (block.outputCount_) {
            if (Blockly.isMobile) {
                if (chk_flip == "TRUE") {
                    dropdown_status = dropdown_status === "HIGH" ? " 0" : " 1";
                } else {
                    dropdown_status = dropdown_status === 'HIGH' ? " 1" : " 0";
                }
                code = 'ESP32.WriteEsp("dw ' + Blockly.ESP32.pin_to_number(dropdown_pin) + dropdown_status + '");\n';
            } else {
                if (chk_flip == "TRUE") {
                    dropdown_status = dropdown_status === "HIGH" ? "LOW" : "HIGH";
                }
                code = 'digitalWrite(' + dropdown_pin + ',' + dropdown_status + ');\n';
            }

            for (var i = 1; i <= block.outputCount_; i++) {
                var dropdown_pinNxt = block.getFieldValue('PinAND' + i);
                var dropdown_statusNxt = block.getFieldValue('status' + i);
                var chk_flipNxt = block.getFieldValue('chkFlip' + i);
                Blockly.ESP32.reservePin(block, dropdown_pinNxt, Blockly.ESP32.PinTypes.OUTPUT, block.type);

                Blockly.ESP32.addSetup("io_" + dropdown_pinNxt, "pinMode(" + dropdown_pinNxt + ", OUTPUT); //LED", !1);

                if (Blockly.isMobile) {
                    if (chk_flipNxt == "TRUE") {
                        dropdown_statusNxt = dropdown_statusNxt === "HIGH" ? " 0" : " 1";
                    } else {
                        dropdown_statusNxt = dropdown_statusNxt === 'HIGH' ? " 1" : " 0";
                    }
                    code += 'ESP32.WriteEsp("dw ' + Blockly.ESP32.pin_to_number(dropdown_pinNxt) + dropdown_statusNxt + '");\n';
                } else {
                    if (chk_flipNxt == "TRUE") {
                        dropdown_statusNxt = dropdown_statusNxt === "HIGH" ? "LOW" : "HIGH";
                    }
                    code += 'digitalWrite(' + dropdown_pinNxt + ', ' + dropdown_statusNxt + ');\n';
                }
            }
        }
        else {
            if (Blockly.isMobile) {
                if (chk_flip == "TRUE") {
                    dropdown_status = dropdown_status === "HIGH" ? " 0" : " 1";
                } else {
                    dropdown_status = dropdown_status === 'HIGH' ? " 1" : " 0";
                }
                code = 'ESP32.WriteEsp("dw ' + Blockly.ESP32.pin_to_number(dropdown_pin) + dropdown_status + '");\n';
            } else {
                if (chk_flip == "TRUE") {
                    dropdown_status = dropdown_status === "HIGH" ? "LOW" : "HIGH";
                }
                code = 'digitalWrite(' + dropdown_pin + ',' + dropdown_status + ');\n';
            }
        }
    }
    return code;
};
//===================================================================================
//define the content of the rgbstrip
Blockly.ESP32.rgbstrip = function (block) {
    var dropdown_pin = block.getFieldValue('Pin');
    var dropdown_choice = block.getFieldValue('color_choice');
    var numberof_leds = block.getFieldValue('NumberofLeds');
    var numberof_ledsPro = block.getFieldValue('NumberofLedspro');
    var Delay1 = block.getFieldValue('Delay');
    var rainbow_delay = block.getFieldValue('Rainbow_Delay');
    var dropdown_Bounce = block.getFieldValue('Bounce');
    Blockly.ESP32.reservePin(block, dropdown_pin, Blockly.ESP32.PinTypes.OUTPUT, block.type);
    // define the default view of the rgbstrip output before customization
    var c1, c12, c13 = '';
    var IC = [];
    if (block.getField('picker1').value_) c1 = goog.color.hexToRgb(block.getField('picker1').value_);
    if (block.getField('picker2').value_) IC[0] = goog.color.hexToRgb(block.getField('picker2').value_);
    if (block.getField('picker3').value_) IC[1] = goog.color.hexToRgb(block.getField('picker3').value_);
    if (block.getField('picker4').value_) IC[2] = goog.color.hexToRgb(block.getField('picker4').value_);
    if (block.getField('picker5').value_) IC[3] = goog.color.hexToRgb(block.getField('picker5').value_);
    if (block.getField('picker6').value_) IC[4] = goog.color.hexToRgb(block.getField('picker6').value_);
    if (block.getField('picker7').value_) IC[5] = goog.color.hexToRgb(block.getField('picker7').value_);
    if (block.getField('picker8').value_) IC[6] = goog.color.hexToRgb(block.getField('picker8').value_);
    if (block.getField('picker9').value_) IC[7] = goog.color.hexToRgb(block.getField('picker9').value_);
    if (block.getField('picker10').value_) IC[8] = goog.color.hexToRgb(block.getField('picker10').value_);
    if (block.getField('picker11').value_) IC[9] = goog.color.hexToRgb(block.getField('picker11').value_);
    // if (block.getField('picker12').value_) c12 = goog.color.hexToRgb(block.getField('picker12').value_);
    // if (block.getField('picker13').value_) c13 = goog.color.hexToRgb(block.getField('picker13').value_);

    var code = '\n';
    if (Blockly.Blocks.ConnectedBoard === 'ESPX') {
        code = '';
        Blockly.ESP32.addSetup("rgbstripEboxSetup", "\n\t" + 'n' + dropdown_pin + "=esp.NeoPixInit(esp." + dropdown_pin + ',' + numberof_leds + ')');
        if (dropdown_choice == "color_wipe") {
            code += '\n\tesp.NeoPixColorWipe(n' + dropdown_pin + ',' + c1 + ',' + Delay1 + ')';
        }
        else if (dropdown_choice == "rainbow") {
            code += '\n\tesp.NeoPixRainbow(n' + dropdown_pin + ',' + rainbow_delay + ')';
        }
        else if (dropdown_choice == "individual_colors") {
            for (var i = 0; i < numberof_leds; i++) {
                var col = IC[i];
                code += '\n\tesp.NeoPixSinglePixel(n' + dropdown_pin + ',' + i + ',' + col + ')';
            }
            code.replace('undefined', '255, 255, 255');
        }
        else if (dropdown_choice == "Bounce") {
            code += '\n\tesp.NeoPixBounce(n' + dropdown_pin + ',' + c1 + ',' + Delay1 + ',' + 'esp.' + dropdown_Bounce + ')';
        }
    }
    else {
        if (Blockly.Blocks.ConnectedBoard === 'FFC_ESP32') {
            if (dropdown_pin === '17' || dropdown_pin == '11') {
                dropdown_pin = Blockly.isMobile ? dropdown_pin : 'strip' + dropdown_pin;
                numberof_leds = '4';
                block.setFieldValue(numberof_leds, 'NumberofLeds');
            }
            else if (!Blockly.isMobile) {
                Blockly.ESP32.addVariable('strip' + dropdown_pin, 'Adafruit_NeoPixel strip' + dropdown_pin + ' = Adafruit_NeoPixel(' + numberof_leds + ',' + dropdown_pin + ',NEO_GRB + NEO_KHZ800);', !1);
                Blockly.ESP32.addSetup("io_" + dropdown_pin, "pinMode(" + dropdown_pin + ", OUTPUT); //RGB LED", !1);
                Blockly.ESP32.addSetup("strip" + dropdown_pin, "strip" + dropdown_pin + ".begin();\n\tstrip" + dropdown_pin + ".show();", !1);
                dropdown_pin = 'strip' + dropdown_pin;
            }
        }
        else if (!Blockly.isMobile) {
            Blockly.ESP32.addInclude('rgbstrip', '#include "Adafruit_NeoPixel.h"');
            Blockly.ESP32.addVariable('strip' + dropdown_pin, 'Adafruit_NeoPixel strip' + dropdown_pin + ' = Adafruit_NeoPixel(' + numberof_leds + ',' + dropdown_pin + ',NEO_GRB + NEO_KHZ800);', !1);
            Blockly.ESP32.addSetup("io_" + dropdown_pin, "pinMode(" + dropdown_pin + ", OUTPUT); //RGB LED", !1);
            Blockly.ESP32.addSetup("strip" + dropdown_pin, "strip" + dropdown_pin + ".begin();\n\tstrip" + dropdown_pin + ".show();", !1);
            dropdown_pin = 'strip' + dropdown_pin;
        }

        if (dropdown_choice == "color_wipe") {
            if (Blockly.isMobile) {
                code = 'ESP32.WriteEsp("CL ' + Blockly.ESP32.pin_to_number(dropdown_pin) + ' ' + numberof_leds + ' 0 ' + c1.join(' ') + ' ' + Delay1 + '");\n';
            } else {
                code = 'colorWipe(&' + dropdown_pin + ', ' + c1 + ', ' + Delay1 + ');\n'
            }
        }
        else if (dropdown_choice == "rainbow") {
            if (Blockly.isMobile) {
                code = 'ESP32.WriteEsp("CL ' + Blockly.ESP32.pin_to_number(dropdown_pin) + ' ' + numberof_leds + ' 1 ' + rainbow_delay + '");\n';
            } else {
                code = 'rainbow(&' + dropdown_pin + ', ' + rainbow_delay + ');\n';
            }
        }
        else if (dropdown_choice == "individual_colors") {
            if (Blockly.Blocks.ConnectedBoard == 'FFC_ESP32' && (dropdown_pin == 'strip11' || dropdown_pin == '11')) {
                for (var i = 0; i < numberof_ledsPro; i++) {
                    if (Blockly.isMobile) {
                        var col = IC[i].join(' ');
                        code += 'ESP32.WriteEsp("CL ' + Blockly.ESP32.pin_to_number(dropdown_pin) + ' ' + numberof_ledsPro + ' 2 ' + i + ' ' + col + '");\n';
                    } else {
                        var col = IC[i];
                        code += '\n' + dropdown_pin + '.setPixelColor(' + (3 - i) + ', ' + dropdown_pin + '.Color(' + col + '));'
                    }
                }
            }
            else {
                for (var i = 0; i < numberof_leds; i++) {
                    if (Blockly.isMobile) {
                        var col = IC[i].join(' ');
                        code += 'ESP32.WriteEsp("CL ' + Blockly.ESP32.pin_to_number(dropdown_pin) + ' ' + numberof_leds + ' 2 ' + i + ' ' + col + '");\n';
                    } else {
                        var col = IC[i];
                        code += '\n' + dropdown_pin + '.setPixelColor(' + i + ', ' + dropdown_pin + '.Color(' + col + '));'
                    }
                }
            }
            if (!Blockly.isMobile) {
                code.replace('undefined', '255, 255, 255');
                code += '\n' + dropdown_pin + '.show();\n';
                code += 'delay(20);\n';
            }
        }
    }
    return code
};
//==========================================================================
//define the content of the servo_device

Blockly.ESP32.servo_device = function (block) {
    var dropdown_pin = block.getFieldValue('Pin');
    var value_varAngle = Blockly.ESP32.valueToCode(block, 'varAngle', Blockly.ESP32.ORDER_ATOMIC);
    Blockly.ESP32.reservePin(block, dropdown_pin, Blockly.ESP32.PinTypes.OUTPUT, block.type);
    // define the default view of the servo_device output before customization
    var code = '\n';
    if (Blockly.Blocks.ConnectedBoard === 'ESPX') {
        Blockly.ESP32.addSetup("servo_deviceEboxSetup", "\n\tservo" + dropdown_pin + "=esp.AttachServo(esp." + dropdown_pin + ')');

        if (block.outputCount_) {
            code += '\n\tesp.RotateServo(servo' + dropdown_pin + ',' + value_varAngle + ')';

            for (var a = 1; a <= block.outputCount_; a++) {
                var dropdown_pinNxt = block.getFieldValue('PinAND' + a);
                var value_varAngleNxt = Blockly.ESP32.valueToCode(block, 'Panel1' + a, Blockly.ESP32.ORDER_ATOMIC);

                code += '\n\tesp.RotateServo(servo' + dropdown_pinNxt + ',' + value_varAngleNxt + ')';
            }
        }
        else {
            code += '\n\tesp.RotateServo(servo' + dropdown_pin + ',' + value_varAngle + ')';
        }
    }
    else {
        if (!Blockly.isMobile) {
            Blockly.ESP32.addInclude('servo', '#include "Servo.h"');

            Blockly.ESP32.addSetup("io_" + dropdown_pin, "pinMode(" + dropdown_pin + ", OUTPUT); //Servo", !1);
            Blockly.ESP32.addSetup("Servo" + dropdown_pin, "myservo_" + dropdown_pin + ".attach(" + dropdown_pin + ",-90,90);", !1);
            Blockly.ESP32.addVariable('myservo_' + dropdown_pin, 'Servo myservo_' + dropdown_pin + ';', !1);
        }
        else if (isNaN(parseInt(value_varAngle, 10))) {
            value_varAngle = '"+' + value_varAngle + '+"';
            window.alert(value_varAngle);
        }

        if (block.outputCount_) {
            var totalCount = (block.outputCount_ + 1);

            if (Blockly.isMobile) {
                code = 'ESP32.WriteEsp("SE ' + totalCount + ' ' + Blockly.ESP32.pin_to_number(dropdown_pin) + ' ' + value_varAngle;
            } else {
                //window.alert(value_varAngle + "1");
                code = 'myservo_' + dropdown_pin + '.write(' + value_varAngle + ');\n';
            }

            for (var a = 1; a <= block.outputCount_; a++) {
                var dropdown_pinNxt = block.getFieldValue('PinAND' + a);
                var value_varAngleNxt = Blockly.ESP32.valueToCode(block, 'Panel1' + a, Blockly.ESP32.ORDER_ATOMIC);
                Blockly.ESP32.reservePin(block, dropdown_pinNxt, Blockly.ESP32.PinTypes.OUTPUT, block.type);

                if (!Blockly.isMobile) {
                    Blockly.ESP32.addSetup("io_" + dropdown_pinNxt, "pinMode(" + dropdown_pinNxt + ", OUTPUT); //Servo", !1);
                    Blockly.ESP32.addSetup("Servo" + dropdown_pinNxt, "myservo_" + dropdown_pinNxt + ".attach(" + dropdown_pinNxt + ",-90,90);", !1);
                    Blockly.ESP32.addVariable('myservo_' + dropdown_pinNxt, 'Servo myservo_' + dropdown_pinNxt + ';', !1);
                }
                else if (isNaN(parseInt(value_varAngleNxt, 10))) {
                    value_varAngleNxt = '"+' + value_varAngleNxt + '+"';
                }

                if (Blockly.isMobile) {
                    code += ' ' + Blockly.ESP32.pin_to_number(dropdown_pinNxt) + ' ' + value_varAngleNxt;
                } else {
                    //window.alert(value_varAngle + "2");
                    code += 'myservo_' + dropdown_pinNxt + '.write(' + value_varAngleNxt + ');\n';
                }
            }

            if (Blockly.isMobile) {
                code += '");\n ';
            }
        }
        else {
            if (Blockly.isMobile) {
                code = 'ESP32.WriteEsp("SE 1 ' + Blockly.ESP32.pin_to_number(dropdown_pin) + ' ' + value_varAngle + '");\n';
            } else {
                //=================================update here 16-5-22======================
                if (value_varAngle == 0)   //new
                    code += 'myservo_' + dropdown_pin + '.write(0);\n';  //new
                    else
                    code += 'myservo_' + dropdown_pin + '.write(' + value_varAngle + ');\n';
            }
        }
    }
    return code;
};
//================================================================================
//define the content of the steppermotor
Blockly.ESP32.steppermotor = function (block) {
    var dropdown_pin = block.getFieldValue('Pin');
    var DirectionPin = block.getFieldValue('DirectionPin');
    var Rotate = block.getFieldValue('Rotate');
    var Revolutions = block.getFieldValue('Revolutions');
    var degrees = block.getFieldValue('degrees');
    var RPM = block.getFieldValue('RPM');
    // define the default view of the steppermotor output before customization
    Blockly.ESP32.reservePin(block, dropdown_pin, Blockly.ESP32.PinTypes.OUTPUT, "steppermotor");
    Blockly.ESP32.reservePin(block, DirectionPin, Blockly.ESP32.PinTypes.OUTPUT, "steppermotor");

    Blockly.ESP32.addInclude('steppermotorinclude', '#include "Stepper.h"');
    Blockly.ESP32.addVariable('steppermotorvar' + dropdown_pin, 'Stepper stepper' + dropdown_pin + '(' + dropdown_pin + ',' + DirectionPin + ');', !1);

    return 'stepper' + dropdown_pin + '.rotateAngle(' + degrees + ',' + Rotate + ' * 360 + ' + Revolutions + ',' + RPM + ');\n';
};
//========================================================================================
//define the content of the customoutput

Blockly.ESP32.customoutput = function (block) {
    var dropdown_pinAng = block.getFieldValue('PinAnalog');
    var dropdown_pinDig = block.getFieldValue('Pin');
    var dropdown_Digitaldatatype = block.getFieldValue('digital_type');
    var text_name = block.getFieldValue('name').replace(/\s/g, "_");
    var dropdown_Type = block.getFieldValue('Type');
    var dropdown_Digitalstatus = block.getFieldValue('digital_value');
    var value_varDigital = Blockly.ESP32.valueToCode(block, 'varDigital', Blockly.ESP32.ORDER_ATOMIC);
    var value_varAnalog = Blockly.ESP32.valueToCode(block, 'varAnalog', Blockly.ESP32.ORDER_ATOMIC);
    // define the default view of the customoutput before customization
    if (dropdown_Type == 'Analog') {
        Blockly.ESP32.reservePin(block, dropdown_pinAng, Blockly.ESP32.PinTypes.OUTPUT, block.type);

        Blockly.ESP32.addInclude('customoutput' + text_name, '#define ' + text_name + '(p,x) analogWrite(p,x)');
        Blockly.ESP32.addSetup("io_" + dropdown_pinAng, "pinMode(" + dropdown_pinAng + ", OUTPUT); //Custom Output", !1);
    }
    else {
        Blockly.ESP32.reservePin(block, dropdown_pinDig, Blockly.ESP32.PinTypes.OUTPUT, block.type);

        Blockly.ESP32.addInclude('customoutput' + dropdown_Type + text_name, '#define ' + text_name + '(p,x) digitalWrite(p,x)');
        Blockly.ESP32.addSetup("io_" + dropdown_pinDig, "pinMode(" + dropdown_pinDig + ", OUTPUT); //Custom Output", !1);
    }

    var code = '';
    if (dropdown_Type == 'Digital') {
        if (dropdown_Digitaldatatype == 'Value') {
            if (Blockly.isMobile) {
                dropdown_Digitalstatus = dropdown_Digitalstatus == 'HIGH' ? ' 1' : ' 0';
                code = 'ESP32.WriteESP32("dw ' + Blockly.ESP32.pin_to_number(dropdown_pinDig) + dropdown_Digitalstatus + '");\n';
            } else {
                code = text_name + '(' + dropdown_pinDig + ',' + dropdown_Digitalstatus + ');\n';
            }
        }
        else {
            if (Blockly.isMobile) {
                code = 'ESP32.WriteESP32("dw ' + Blockly.ESP32.pin_to_number(dropdown_pinDig) + ' "+' + value_varDigital + '+"");\n';
            } else {
                code = text_name + '(' + dropdown_pinDig + ',' + value_varDigital + ');\n';
            }
        }
    }
    else {
        if (Blockly.isMobile) {
            code = 'ESP32.WriteESP32("aw ' + Blockly.ESP32.pin_to_number(dropdown_pinAng) + ' "+' + value_varAnalog + '+"");\n';
        } else {
            code = text_name + '(' + dropdown_pinAng + ',' + value_varAnalog + ');\n';
        }
    }
    return code;
};
// Output code - ends