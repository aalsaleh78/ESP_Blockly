//=========================================================
//The definition of the Variables set and its functions that can be selected by the user, also, get the valuse and variables types selected by the user
    //'assign_variable'
    //'math_number'
    //'variables_get'
    //'math_arithmetic'
    //increment'
    //'decrement'
    //'Constrain'
    //'Map_
    //'inputreading'
    //'inputreading_bl'
    //=====================================================================
// Variables code - begins
//========================================= ESP32.assign_variable to give the values to variable =======================
Blockly.ESP32.assign_variable = function (block) {
    var varValue_value = Blockly.ESP32.valueToCode(block, "varValue", Blockly.ESP32.ORDER_ASSIGNMENT) || "0";
    var varName_value = block.getField("varName").variable_.name;
    var code = varName_value + " = " + varValue_value + ";\n";
    Blockly.Workspace.prototype.createVariable(varName_value, varValue_value);

    return code;
};
//========================================= ESP32.math_number to determine the value (Inf. or number) =======================
Blockly.ESP32.math_number = function (a) {
    a = parseFloat(a.getFieldValue("NUM"));
    Infinity == a ? a = "INFINITY" : -Infinity == a && (a = "-INFINITY");
    return [a, Blockly.ESP32.ORDER_ATOMIC]
};
//========================================= ESP32.variables_get to get the name & value of a variable =======================
Blockly.ESP32.variables_get = function (a) {
    return [a.getField("VAR").variable_.name, Blockly.ESP32.ORDER_ATOMIC];
};
//========================================= ESP32.math_arithmetic to define the operation of 2 values (+, - , x, /, ^) =======================
Blockly.ESP32.math_arithmetic = function (a) {
    var b = {
        ADD: [" + ", Blockly.ESP32.ORDER_ADDITIVE],
        MINUS: [" - ", Blockly.ESP32.ORDER_ADDITIVE],
        MULTIPLY: [" * ", Blockly.ESP32.ORDER_MULTIPLICATIVE],
        DIVIDE: [" / ", Blockly.ESP32.ORDER_MULTIPLICATIVE],
        POWER: [null, Blockly.ESP32.ORDER_NONE]
    }[a.getFieldValue("OP")],
        c = b[0],
        b = b[1],
        d = Blockly.ESP32.valueToCode(a, "A", b) || "0";
    a = Blockly.ESP32.valueToCode(a, "B", b) || "0";
    return c ? [d + c + a, b] : ["Math.pow(" + d + ", " + a + ")", Blockly.ESP32.ORDER_UNARY_POSTFIX]
};
//========================================= ESP32.increment to use decrement variable =======================
Blockly.ESP32.increment = function (block) {
    var varValue_value = Blockly.ESP32.valueToCode(block, 'varValue', Blockly.ESP32.ORDER_ATOMIC);
    var varName_value = block.getField("varName").variable_.name;

    var code = varName_value + '=' + varName_value + '+' + varValue_value + ';\n';

    return code;
};
//========================================= ESP32.decrement to use decrement variable =======================
Blockly.ESP32.decrement = function (block) {
    var varValue_value = Blockly.ESP32.valueToCode(block, 'varValue', Blockly.ESP32.ORDER_ATOMIC);
    var varName_value = block.getField("varName").variable_.name;

    var code = varName_value + '=' + varName_value + '-' + varValue_value + ';\n';

    return code;
};
//========================================= ESP32.Constraine to give constrain to a variable (min, max) =======================
Blockly.ESP32.Constrain = function (block) {
    var variable_ValueMin = Blockly.ESP32.valueToCode(block, 'varValueMin', Blockly.ESP32.ORDER_ATOMIC);
    var variable_ValueMax = Blockly.ESP32.valueToCode(block, 'varValueMax', Blockly.ESP32.ORDER_ATOMIC);
    var varname = block.getField("varName").variable_.name;
    // var varname = Blockly.ESP32.variableDB_.getName(block.getFieldValue("varName"), Blockly.Variables.NAME_TYPE);

    var code = "";
    if (Blockly.isMobile) {
        code = 'ESP32.Constrain(' + varname + ',' + variable_ValueMin + ',' + variable_ValueMax + ')';
    } else {
        code = 'constrain(' + varname + ',' + variable_ValueMin + ',' + variable_ValueMax + ')';
    }

    return [code, Blockly.ESP32.ORDER_ATOMIC];
};
//========================================= ESP32.Map_ to give the map to variable =======================
Blockly.ESP32.Map_ = function (block) {
    var variable_ValueFromMin = Blockly.ESP32.valueToCode(block, 'varValueFromMin', Blockly.ESP32.ORDER_ATOMIC);
    var variable_ValueFromMax = Blockly.ESP32.valueToCode(block, 'varValueFromMax', Blockly.ESP32.ORDER_ATOMIC);
    var variable_ValueToMin = Blockly.ESP32.valueToCode(block, 'varValueToMin', Blockly.ESP32.ORDER_ATOMIC);
    var variable_ValueToMax = Blockly.ESP32.valueToCode(block, 'varValueToMax', Blockly.ESP32.ORDER_ATOMIC);
    var varname = block.getField("varName").variable_.name;
    // var varname = Blockly.ESP32.variableDB_.getName(block.getFieldValue("varName"), Blockly.Variables.NAME_TYPE);

    var code = "";
    if (Blockly.isMobile) {
        code = 'ESP32.Map(' + varname + ',' + variable_ValueFromMin + ',' + variable_ValueFromMax + ',' + variable_ValueToMin + ',' + variable_ValueToMax + ')';
    } else {
        code = 'map(' + varname + ',' + variable_ValueFromMin + ',' + variable_ValueFromMax + ',' + variable_ValueToMin + ',' + variable_ValueToMax + ')';
    }

    return [code, Blockly.ESP32.ORDER_ATOMIC];
};
//========================================= ESP32.inputreading to get the value of Accelorometer selected by the user =======================
Blockly.ESP32.inputreading = function (block) {
    var dropdown_pin = block.getFieldValue('Pin');
    var dropdown_device = block.getFieldValue('device');
    var dropdown_choice = block.getFieldValue('choice');
    var angledropdown_choice = block.getFieldValue('anglechoice');

    var code = '';
    if (dropdown_device == 'lightsensor') {
        block.setWarningText('Make sure Light Sensor is connected to pin ' + dropdown_pin);
        Blockly.ESP32.reservePin(block, dropdown_pin, Blockly.ESP32.PinTypes.INPUT, "lightsensor");

        Blockly.ESP32.addInclude('lightsensor', '#define cds(x) analogRead(x)');
        Blockly.ESP32.addSetup("io_" + dropdown_pin, "pinMode(" + dropdown_pin + ", INPUT); //Light Sensor", !1);
        code = 'cds(' + dropdown_pin + ')';

    }
    else if (dropdown_device == 'resistor') {
        block.setWarningText('Make sure Potentiometer is connected to pin ' + dropdown_pin);
        Blockly.ESP32.reservePin(block, dropdown_pin, Blockly.ESP32.PinTypes.INPUT, "resistor");

        Blockly.ESP32.addInclude('resistor', '#define Potentiometer(x) (analogRead(x))');
        Blockly.ESP32.addSetup("io_" + dropdown_pin, "pinMode(" + dropdown_pin + ", INPUT); //Potentiometer", !1);
        code = 'Potentiometer(' + dropdown_pin + ')';
    }
    else if (dropdown_device == 'ir') {
        block.setWarningText('Make sure IR Sensor is connected to pin ' + dropdown_pin);
        Blockly.ESP32.reservePin(block, dropdown_pin, Blockly.ESP32.PinTypes.INPUT, "ir");

        Blockly.ESP32.addInclude('IR', '#define ir(x) analogRead(x)');
        Blockly.ESP32.addSetup("io_" + dropdown_pin, "pinMode(" + dropdown_pin + ", INPUT); //IR", !1);
        code = 'ir(' + dropdown_pin + ')';
    }
    else if (dropdown_device == 'temperature') {
        block.setWarningText('Make sure Temperature Sensor is connected to pin ' + dropdown_pin);
        Blockly.ESP32.reservePin(block, dropdown_pin, Blockly.ESP32.PinTypes.INPUT, "temperature");

        Blockly.ESP32.addInclude('temperature', '#define temp(x) ((analogRead(x)*0.833) / 2.048)');
        Blockly.ESP32.addSetup("io_" + dropdown_pin, "pinMode(" + dropdown_pin + ", INPUT); //Temperature", !1);
        code = 'temp(' + dropdown_pin + ')';
    }
    else if (dropdown_device == 'colorsensor') {
        block.setWarningText('Make sure Color Sensor is connected to pin ' + dropdown_pin);
        Blockly.ESP32.reservePin(block, dropdown_pin, Blockly.ESP32.PinTypes.INPUT, "colorsensor");

        Blockly.ESP32.addInclude('colorsensor', '#define colour(x) (senseColor(x))');
        Blockly.ESP32.addSetup("io_" + dropdown_pin, "pinMode(" + dropdown_pin + ", INPUT); //Colour Sensor", !1);
        code = 'colour(' + dropdown_pin + ')';
    }
    else if (dropdown_device == 'ultrasonic') {
        block.setWarningText('Make sure Ultrasonic is connected to pin ' + dropdown_pin);
        Blockly.ESP32.reservePin(block, dropdown_pin, Blockly.ESP32.PinTypes.INPUT, "ultrasonic");

        Blockly.ESP32.addInclude('ultrasonic', '#define ultrasound(x) ((analogRead(x)*0.833)/4)');
        Blockly.ESP32.addSetup("io_" + dropdown_pin, "pinMode(" + dropdown_pin + ", INPUT); //Ultra Sonic", !1);
        code = 'ultrasound(' + dropdown_pin + ')';
    }
    else if (dropdown_device == 'accelerometer') {
        block.setWarningText(null);
        if (Blockly.isMobile) {
            code = 'ESP32.ReadESP32("mp' + dropdown_choice + '")';
        } else {
            Blockly.ESP32.addSetup("accelerometer_temp", "mpu6050_init();" + " //accelerometer or gyro", !1);
            code = 'readFromMPU(' + 'realAcceleration' + dropdown_choice + ')';
        }
    }
    else if (dropdown_device == 'accelerometer_mobile') {
        block.setWarningText(null);
        code = 'ESP32.AccelerometerReadESP32("' + dropdown_choice + '")';
    }
    else if (dropdown_device == 'gyro') {
        block.setWarningText(null);
        if (Blockly.isMobile) {
            code = 'ESP32.ReadESP32("mp' + angledropdown_choice.replace("angle", "").toLowerCase() + '")';
        } else {
            Blockly.ESP32.addSetup("accelerometer_temp", "mpu6050_init();" + " //accelerometer or gyro", !1);
            code = 'readFromMPU(' + angledropdown_choice + ')';
        }
    }
    else if (dropdown_device == 'touchpad') {
        block.setWarningText('Make sure Touchpad is connected to pin ' + dropdown_pin);
        Blockly.ESP32.addInclude('touchpad', '#define touchpad(x) (round(analogRead(x)*0.85/80)-1)');
        code = 'touchpad(' + dropdown_pin + ')';
    }
    else if (dropdown_device == 'mic') {
        block.setWarningText('Make sure Sound Sensor is connected to pin ' + dropdown_pin);
        Blockly.ESP32.reservePin(block, dropdown_pin, Blockly.ESP32.PinTypes.INPUT, 'mic');

        Blockly.ESP32.addInclude('sound_sensor', '#define soundLevel(x) (max(0,(analogRead(x)-600)/4.24))');
        Blockly.ESP32.addSetup("io_" + dropdown_pin, "pinMode(" + dropdown_pin + ", INPUT); //Sound Sensor", !1);
        code = 'soundLevel(' + dropdown_pin + ')';
    }
    return [code, Blockly.ESP32.ORDER_ATOMIC];
};
//========================================= ESP32.inputreading bluetoothrx to get the values to bluetoothrx =======================
Blockly.ESP32.inputreading_bl = function (block) {
    var dropdown_pin = block.getFieldValue('Pin');
    var dropdown_baudrate = "9600";
    Blockly.ESP32.reservePin(block, dropdown_pin, Blockly.ESP32.PinTypes.INPUT, "bluetoothrx");

    var serial = 'Serial';
    if (dropdown_pin == '15') {
        if (Blockly.Blocks.ConnectedBoard === 'FFC_ESP32') {
            serial = 'Serial1';
        }
        Blockly.ESP32.addSetup("io_" + dropdown_pin, serial + '.begin(' + dropdown_baudrate + '); //Bluetooth Rx', !1);
    }
    else {
        serial = 'mybluetoothRx' + dropdown_pin;
        Blockly.ESP32.addInclude('bluetoothrx', '#include <SoftwareSerial.h>');

        Blockly.ESP32.addVariable(serial, 'SoftwareSerial ' + serial + '(' + dropdown_pin + ',255);', !1);
        Blockly.ESP32.addSetup("io_" + dropdown_pin, serial + '.begin(' + dropdown_baudrate + '); ', !1);
    }

    var method = 'String esp32ReadString' + dropdown_pin + '()' +
        '\n{' +
        '\n\tif(' + serial + '.available() >0 ){' +
        '\n\t\treturn ' + serial + '.readString();' +
        '\n\t}' +
        '\n\treturn "";' +
        '\n}';

    Blockly.ESP32.addFunction('bluetooth_input_reading' + dropdown_pin, method);

    var code = 'esp32ReadString' + dropdown_pin + '()';
    return [code, Blockly.ESP32.ORDER_ATOMIC];
};
// Variables code - ends
