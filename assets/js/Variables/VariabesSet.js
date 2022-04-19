//=========================================================
//The definition of the variables set and its blocks. it also defines the components of each text block (the assign, number, arth. op., etc..), how the component appear to the user
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
// Define blocks for Variables menu - begins
//===================================== Define the components of assign_variable block   ===============================
Blockly.Blocks['assign_variable'] = {
    init: function () {
        var varValue = this.appendValueInput("varValue")
            .setCheck("Number")
            .appendField("set")
            .appendField(new Blockly.FieldVariable("var0"), "varName")
            .appendField("to");

        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Code.multiColor.variable);
        this.setTooltip("set");

        this.appendShadowBlock(varValue);
    },
    onchange: function (ev) {
        Blockly.Blocks.fn_onchange(this, ev, Code.multiColor.variable, true, true);
    }
};
//===================================== Define the components of math_number block   ===============================
Blockly.Blocks.math_number = {
    init: function () {
        this.appendDummyInput('math_Panel2')
            .appendField(new Blockly.FieldNumber(Blockly.Msg.zero), "NUM");

        this.setColour(Code.multiColor.variable);
        this.setOutput(true, "Number");

        var a = this;
        this.setTooltip(function () {
            var b = a.getParent();
            return b && b.getInputsInline() && b.tooltip || Blockly.Msg.MATH_NUMBER_TOOLTIP
        })
    },
    onchange: function (ev) {
        Blockly.Blocks.fn_onchange(this, ev, Code.multiColor.variable, true, true);
    }
};
//===================================== Define the components of variables_get block   ===============================
Blockly.Blocks.variables_get = {
    init: function () {
        this.appendDummyInput('Panel2')
            .appendField(new Blockly.FieldVariable(Blockly.Msg.VARIABLES_DEFAULT_NAME), "VAR");

        this.setColour(Code.multiColor.variable);
        this.setOutput(true, "Number");
        this.setTooltip(Blockly.Msg.VARIABLES_GET_TOOLTIP);
        this.contextMenuMsg_ = Blockly.Msg.VARIABLES_GET_CREATE_SET;
    },
    onchange: function (ev) {
        Blockly.Blocks.fn_onchange(this, ev, Code.multiColor.variable, true, true);
    },
    contextMenuType_: "variables_set",
    customContextMenu: function (a) {
        var b = {
            enabled: !0
        },
            c = this.getFieldValue("VAR");
        b.text = this.contextMenuMsg_.replace("%1",
            c);
        c = goog.dom.createDom("field", null, c);
        c.setAttribute("name", "VAR");
        c = goog.dom.createDom("block", null, c);
        c.setAttribute("type", this.contextMenuType_);
        b.callback = Blockly.ContextMenu.callbackFactory(this, c);
        a.push(b)
    }
};
//===================================== Define the components of math_arithmetic block   ===============================
Blockly.Blocks.math_arithmetic = {
    init: function () {
        var A = this.appendValueInput("A")
            .setCheck("Number");

        var Panel1 = this.appendDummyInput('Panel1')
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.MATH_ADDITION_SYMBOL, "ADD"],
                [Blockly.Msg.MATH_SUBTRACTION_SYMBOL, "MINUS"],
                [Blockly.Msg.MATH_MULTIPLICATION_SYMBOL, "MULTIPLY"],
                [Blockly.Msg.MATH_DIVISION_SYMBOL, "DIVIDE"]
            ]), "OP");

        var B = this.appendValueInput("B")
            .setCheck("Number");

        this.setInputsInline(true);
        this.setHelpUrl(Blockly.Msg.MATH_ARITHMETIC_HELPURL);
        this.setColour(Code.multiColor.variable);
        this.setOutput(true, "Number");
        var a = this;
        this.setTooltip(function () {
            var b = a.getFieldValue("OP");
            return {
                ADD: Blockly.Msg.MATH_ARITHMETIC_TOOLTIP_ADD,
                MINUS: Blockly.Msg.MATH_ARITHMETIC_TOOLTIP_MINUS,
                MULTIPLY: Blockly.Msg.MATH_ARITHMETIC_TOOLTIP_MULTIPLY,
                DIVIDE: Blockly.Msg.MATH_ARITHMdETIC_TOOLTIP_DIVIDE,
                POWER: Blockly.Msg.MATH_ARITHMETIC_TOOLTIP_POWER
            }[b]
        });

        this.appendShadowBlock(A);
        this.appendShadowBlock(B);
    },
    onchange: function (ev) {
        Blockly.Blocks.fn_onchange(this, ev, Code.multiColor.variable, true, true);
    }
};
//===================================== Define the components of increment block   ===============================
Blockly.Blocks['increment'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(Blockly.Msg.increment);

        var varValue = this.appendValueInput("varValue")
            .appendField(new Blockly.FieldVariable("var0"), "varName")
            .appendField("by")
            .setCheck("Number");

        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Code.multiColor.variable);
        this.setTooltip(Blockly.Msg.increment);

        if (!this.isInFlyout) {
            this.appendShadowBlock(varValue, 1, 1, 255);
        }
        else {
            varValue.setVisible(false);
        }
    },
    onchange: function (ev) {
        Blockly.Blocks.fn_onchange_var_incdec(this, ev);
    }
};
//===================================== Define the components of decrement block   ===============================
Blockly.Blocks['decrement'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(Blockly.Msg.decrement);

        var varValue = this.appendValueInput("varValue")
            .appendField(new Blockly.FieldVariable("var0"), "varName")
            .appendField("by")
            .setCheck("Number");

        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Code.multiColor.variable);
        this.setTooltip(Blockly.Msg.decrement);

        if (!this.isInFlyout) {
            this.appendShadowBlock(varValue, 1, 1, 255);
        }
        else {
            varValue.setVisible(false);
        }
    },
    onchange: function (ev) {
        Blockly.Blocks.fn_onchange_var_incdec(this, ev);
    }
};
//===================================== Define the components of Constrain block   ===============================
Blockly.Blocks['Constrain'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(Blockly.Msg.constrain);

        var varValueMin = this.appendValueInput("varValueMin")
            .appendField(new Blockly.FieldVariable("var0"), "varName")
            .appendField("to Min:")
            .setCheck("Number");

        var varValueMax = this.appendValueInput("varValueMax")
            .appendField("Max:")
            .setCheck("Number");

        this.setInputsInline(true);
        this.setOutput(true, "Number");
        this.setColour(Code.multiColor.variable);
        this.setTooltip(Blockly.Msg.constrain);

        if (!this.isInFlyout) {
            this.appendShadowBlock(varValueMin, 0, -10000, 10000);
            this.appendShadowBlock(varValueMax, 100, -10000, 10000);
        }
        else {
            varValueMin.setVisible(false);
            varValueMax.setVisible(false);
        }
    },
    onchange: function (ev) {
        if (!this.isInFlyout) {
            if (this.colour_ !== Code.multiColor.variable) {
                this.setColour(Code.multiColor.variable);
            }
            Blockly.Blocks.CheckStartnode(this);
            Blockly.Blocks.hidemutation(ev);
            if (!this.collapsed_) {
                var varValueMin = this.inputList[1];
                var varValueMax = this.inputList[2];

                if (!varValueMin.visible_) {
                    varValueMin.setVisible(true);
                    varValueMax.setVisible(true);

                    varValueMin.setAlign(true);
                }
            }
            else if (ev instanceof Blockly.Events.Create) {
                var varValueMin = this.inputList[1];
                var varValueMax = this.inputList[2];

                Blockly.Blocks.fn_varAlign([varValueMin, varValueMax]);
            }
        }
    }
};
//===================================== Define the components of MAP block   ===============================
Blockly.Blocks['Map_'] = {
    init: function () {
        var minvalue = Blockly.Blocks.MinValue < 0 ? 0 : Blockly.Blocks.MinValue;
        var maxvalue = Blockly.Blocks.MaxValue > 1023 ? 1023 : Blockly.Blocks.MaxValue;
        var Tomaxvalue = Blockly.Blocks.MaxValue > 255 ? 255 : Blockly.Blocks.MaxValue;

        this.appendDummyInput()
            .appendField(Blockly.Msg.map);

        var varValueFromMin = this.appendValueInput("varValueFromMin")
            .appendField(new Blockly.FieldVariable("var0"), "varName")
            .appendField(" From Min:")
            .setCheck("Number");

        var varValueFromMax = this.appendValueInput("varValueFromMax")
            .appendField("Max:")
            .setCheck("Number");

        var varValueToMin = this.appendValueInput("varValueToMin")
            .appendField("To Min:")
            .setCheck("Number");

        var varValueToMax = this.appendValueInput("varValueToMax")
            .appendField("Max:")
            .setCheck("Number");

        this.setInputsInline(true);
        this.setPreviousStatement(false, null);
        this.setNextStatement(false, null);
        this.setOutput(true, "Number");
        this.setColour(Code.multiColor.variable);
        this.setTooltip(Blockly.Msg.map);

        if (!this.isInFlyout) {
            this.appendShadowBlock(varValueFromMin, minvalue, -10000, 10000);
            this.appendShadowBlock(varValueFromMax, maxvalue, -10000, 10000);
            this.appendShadowBlock(varValueToMin, minvalue, -10000, 10000);
            this.appendShadowBlock(varValueToMax, Tomaxvalue, -10000, 10000);
        }
        else {
            varValueFromMin.setVisible(false);
            varValueFromMax.setVisible(false);
            varValueToMin.setVisible(false);
            varValueToMax.setVisible(false);
        }
    },
    onchange: function (ev) {
        if (!this.isInFlyout) {
            if (this.colour_ !== Code.multiColor.variable) {
                this.setColour(Code.multiColor.variable);
            }
            Blockly.Blocks.CheckStartnode(this);
            Blockly.Blocks.hidemutation(ev);
            if (!this.collapsed_) {
                var varValueFromMin = this.inputList[1];
                var varValueFromMax = this.inputList[2];
                var varValueToMin = this.inputList[3];
                var varValueToMax = this.inputList[4];

                if (!varValueFromMin.visible_) {
                    varValueFromMin.setVisible(true);
                    varValueFromMax.setVisible(true);
                    varValueToMin.setVisible(true);
                    varValueToMax.setVisible(true);

                    varValueFromMin.setAlign(true);
                }
            }
            else if (ev instanceof Blockly.Events.Create) {
                var varValueFromMin = this.inputList[1];
                var varValueFromMax = this.inputList[2];
                var varValueToMin = this.inputList[3];
                var varValueToMax = this.inputList[4];

                Blockly.Blocks.fn_varAlign([varValueFromMin, varValueFromMax, varValueToMin, varValueToMax]);
            }
        }
    }
};
//===================================== Define the components of inputreading block   ===============================
Blockly.Blocks['inputreading'] = {
    init: function () {
        var drop_items = [[Blockly.Msg.accelerometer, "accelerometer"], [Blockly.Msg.colorsensor, "colorsensor"], [Blockly.Msg.gyro, "gyro"], [Blockly.Msg.IRSensor, "ir"], [Blockly.Msg.lightsensor, "lightsensor"], [Blockly.Msg.resistor, "resistor"], [Blockly.Msg.sound_sensor, "mic"], [Blockly.Msg.temperature, "temperature"], [Blockly.Msg.touch_pad, "touchpad"], [Blockly.Msg.ultrasonic, "ultrasonic"]];

        this.appendDummyInput()
            .appendField(Blockly.Msg.value_of, "value")
            .appendField(new Blockly.FieldDropdown(drop_items), "device");

        var pinPanel = this.appendDummyInput('pinPanel')
            .appendField("Pin", "pinlabel")
            .appendField(new Blockly.FieldDropdown(Blockly.Blocks.InputPinArray), "Pin");

        var Panel1 = this.appendDummyInput("Panel1")
            .appendField("Acceleration in ")
            .appendField(new Blockly.FieldDropdown([["X", "X"], ["Y", "Y"], ["Z", "Z"]]), "choice");

        var Panel2 = this.appendDummyInput("Panel2")
            .appendField("Angle based on ")
            .appendField(new Blockly.FieldDropdown([["X", "angleX"], ["Y", "angleY"], ["Z", "angleZ"]]), "anglechoice")
            .appendField("axis", "axis");

        this.setInputsInline(true);
        this.setPreviousStatement(false, null);
        this.setNextStatement(false, null);
        this.setOutput(true, "Number");
        this.setColour(Code.multiColor.input);
        this.setTooltip('Returns the value of this input node');

        pinPanel.setVisible(false);
        Panel1.setVisible(false);
        Panel2.setVisible(false);
    },
    onchange: function (ev) {
        Blockly.Blocks.RemoveUsedPins(this);
        if (!this.isInFlyout) {
            if (this.colour_ !== Code.multiColor.input) {
                this.setColour(Code.multiColor.input);
            }
            Blockly.Blocks.CheckStartnode(this);
            Blockly.Blocks.hidemutation(ev);
            if (!this.collapsed_) {
                var mainPanel = this.inputList[0];
                var pinPanel = this.inputList[1];
                var Panel1 = this.inputList[2];
                var Panel2 = this.inputList[3];

                var device = mainPanel.fieldRow[1];

                if (Blockly.Blocks.ConnectedBoard == "ESP328" || Blockly.Blocks.ConnectedBoard == "ESP32X" || Blockly.isMobile) {
                    device.menuGenerator_ = [[Blockly.Msg.colorsensor, "colorsensor"],
                        [Blockly.Msg.IRSensor, "ir"], [Blockly.Msg.lightsensor, "lightsensor"],
                        [Blockly.Msg.resistor, "resistor"], [Blockly.Msg.sound_sensor, "mic"],
                        [Blockly.Msg.temperature, "temperature"], [Blockly.Msg.touch_pad, "touchpad"],
                        [Blockly.Msg.ultrasonic, "ultrasonic"]];
                    if (Blockly.Blocks.ConnectedBoard == "ESP32X" || Blockly.isMobile) {
                        device.menuGenerator_ = [[Blockly.Msg.colorsensor, "colorsensor"],
                            [Blockly.Msg.IRSensor, "ir"], [Blockly.Msg.lightsensor, "lightsensor"],
                            [Blockly.Msg.resistor, "resistor"], [Blockly.Msg.sound_sensor, "mic"],
                            [Blockly.Msg.temperature, "temperature"], [Blockly.Msg.ultrasonic, "ultrasonic"]];
                    }
                    if (device.value_ === 'accelerometer' || device.value_ === 'gyro') {
                        device.setValue("lightsensor");
                    }
                }
                else {
                    device.menuGenerator_ = [[Blockly.Msg.accelerometer, "accelerometer"],
                        [Blockly.Msg.colorsensor, "colorsensor"], [Blockly.Msg.gyro, "gyro"],
                        [Blockly.Msg.IRSensor, "ir"], [Blockly.Msg.lightsensor, "lightsensor"],
                        [Blockly.Msg.resistor, "resistor"], [Blockly.Msg.sound_sensor, "mic"],
                        [Blockly.Msg.temperature, "temperature"], [Blockly.Msg.touch_pad, "touchpad"],
                        [Blockly.Msg.ultrasonic, "ultrasonic"]];
                }

                device = device.value_;
                if (device === 'accelerometer' && !Panel1.visible_) {
                    pinPanel.setVisible(false);
                    Panel1.setVisible(true);
                    Panel2.setVisible(false);

                    pinPanel.setAlign(true);
                }
                else if (device === 'gyro' && !Panel2.visible_) {
                    pinPanel.setVisible(false);
                    Panel1.setVisible(false);
                    Panel2.setVisible(true);

                    pinPanel.setAlign(true);
                }
                else if (device !== 'gyro' && device !== 'accelerometer' && !pinPanel.visible_) {
                    pinPanel.setVisible(true);
                    Panel1.setVisible(false);
                    Panel2.setVisible(false);

                    pinPanel.setAlign(true);
                }
            }
        }
    }
};
//===================================== Define the components of inputreading_bl block   ===============================
Blockly.Blocks['inputreading_bl'] = {
    init: function () {
        var currPinArray = Blockly.Blocks.getUnusedpins(this);

        this.appendDummyInput()
            .appendField("Bluetooth RX")
            .appendField("Pin")
            .appendField(new Blockly.FieldDropdown(currPinArray), "Pin");

        this.setInputsInline(true);
        this.setPreviousStatement(false, null);
        this.setNextStatement(false, null);
        this.setOutput(true, "String");
        this.setColour(Code.multiColor.text);
        this.setTooltip('Returns value from Serial input');
    },
    onchange: function (ev) {
        Blockly.Blocks.fn_onchange(this, ev, Code.multiColor.text, false, true);
    }
};
// Define blocks for Variables menu - ends
//=========================================================================================

