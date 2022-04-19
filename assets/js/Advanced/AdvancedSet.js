//=========================================================
//The definition of the advanced set and its blocks. it also defines the components of each block (the panel, array, pin, etc..)
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
// Define blocks for Advanced menu - begins
//===================================== Define the components of inputreading_digital block   ===============================
Blockly.Blocks['inputreading_digital'] = {
    init: function () {
        var currPinArray = [["A0", "A0"], ["A1", "A1"], ["A2", "A2"], ["A3", "A3"], ["A4", "A4"], ["A5", "A5"], ["A6", "A6"], ["A7", "A7"]];

        this.appendDummyInput("Panel1")
            .appendField(Blockly.Msg.digitalreadPin)
            .appendField(new Blockly.FieldDropdown(currPinArray), "Pin");

        this.setInputsInline(true);
        this.setPreviousStatement(false, null);
        this.setNextStatement(false, null);
        this.setOutput(true, "Number");
        this.setColour(Code.multiColor.advanced);
        this.setTooltip(Blockly.Msg.digitalread);
    },
    onchange: function (ev) {
        Blockly.Blocks.fn_onchange_adv_input(this, ev);
    }
};
//===================================== Define the components of inputreading_analog block   ===============================
Blockly.Blocks['inputreading_analog'] = {
    init: function () {
        var currPinArray = [["A0", "A0"], ["A1", "A1"], ["A2", "A2"], ["A3", "A3"], ["A4", "A4"], ["A5", "A5"], ["A6", "A6"], ["A7", "A7"]];

        this.appendDummyInput("Panel1")
            .appendField(Blockly.Msg.analogreadPin)
            .appendField(new Blockly.FieldDropdown(currPinArray), "Pin");

        this.setInputsInline(true);
        this.setPreviousStatement(false, null);
        this.setNextStatement(false, null);
        this.setOutput(true, "Number");
        this.setColour(Code.multiColor.advanced);
        this.setTooltip(Blockly.Msg.analogread);
    },
    onchange: function (ev) {
        Blockly.Blocks.fn_onchange_adv_input(this, ev);
    }
};
//===================================== Define the components of digital_write block   ===============================
Blockly.Blocks['digital_write'] = {
    init: function () {
        var currPinArray = Blockly.Blocks.getUnusedpins(this);

        this.appendDummyInput()
            .appendField(Blockly.Msg.digitalwrite);

        var Panel1 = this.appendDummyInput('Panel1')
            .appendField("Pin")
            .appendField(new Blockly.FieldDropdown(currPinArray), "Pin")
            .appendField(new Blockly.FieldDropdown([["Value", "Value"], ["Variable", "Variable"]]), "datatype")
            .appendField(" ");

        var PanelValue = this.appendDummyInput('PanelValue')
            .appendField(new Blockly.FieldDropdown([["HIGH", "HIGH"], ["LOW", "LOW"]]), "status");

        var varValue = this.appendValueInput("varValue")
            .setCheck("Number");

        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Code.multiColor.output);
        this.setTooltip(Blockly.Msg.digitalwrite);

        Panel1.setVisible(false);
        PanelValue.setVisible(false);
        varValue.setVisible(false);
    },
    onchange: function (ev) {
        Blockly.Blocks.RemoveUsedPins(this);
        if (!this.isInFlyout) {
            if (this.colour_ !== Code.multiColor.output) {
                this.setColour(Code.multiColor.output);
            }
            Blockly.Blocks.CheckStartnode(this);
            Blockly.Blocks.hidemutation(ev);
            if (!this.collapsed_) {
                var Panel1 = this.inputList[1];
                var PanelValue = this.inputList[2];
                var varValue = this.inputList[3];

                var datatype_Value = Panel1.fieldRow[2].value_;

                if (!Panel1.visible_) {
                    Panel1.setVisible(true);
                }
                //============================== select the components from the use ====================
                if (datatype_Value === 'Value' && !PanelValue.visible_) {
                    PanelValue.setVisible(true);
                    varValue.setVisible(false);
                    var insideVarBlock = varValue.connection && varValue.connection.targetBlock();
                    if (insideVarBlock != null) {
                        insideVarBlock.dispose();
                    }

                    Panel1.setAlign(true);
                }
                else if (datatype_Value !== 'Value' && !varValue.visible_) {
                    PanelValue.setVisible(false);
                    varValue.setVisible(true);

                    this.appendShadowBlock(varValue, 0, 0, 255);

                    Panel1.setAlign(true);
                }

                Blockly.Blocks.fn_varAlign([varValue]);
            }
            else if (ev instanceof Blockly.Events.Create) {
                var varValue = this.inputList[3];

                Blockly.Blocks.fn_varAlign([varValue]);
            }
        }
    }
};
//===================================== Define the components of analog_write block   ===============================
Blockly.Blocks['analog_write'] = {
    init: function () {
        var currPinArray = Blockly.Blocks.getUnusedpins(this);

        this.appendDummyInput()
            .appendField(Blockly.Msg.analogwrite);

        var Panel1 = this.appendDummyInput('Panel1')
            .appendField("Pin")
            .appendField(new Blockly.FieldDropdown(currPinArray), "Pin")
            .appendField(" ");

        var varValue = this.appendValueInput("varValue")
            .setCheck("Number");

        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Code.multiColor.output);
        this.setTooltip(Blockly.Msg.analogwrite);

        if (!this.isInFlyout) {
            this.appendShadowBlock(varValue, 0, 0, 255);
        }
        else {
            Panel1.setVisible(false);
            varValue.setVisible(false);
        }
    },
    onchange: function (ev) {
        Blockly.Blocks.RemoveUsedPins(this);
        if (!this.isInFlyout) {
            if (this.colour_ !== Code.multiColor.output) {
                this.setColour(Code.multiColor.output);
            }
            Blockly.Blocks.CheckStartnode(this);
            Blockly.Blocks.hidemutation(ev);
            if (!this.collapsed_) {
                var Panel1 = this.inputList[1];
                var varValue = this.inputList[2];

                if (!Panel1.visible_) {
                    Panel1.setVisible(true);
                    varValue.setVisible(true);

                    Panel1.setAlign(true);
                }
            }
            else if (ev instanceof Blockly.Events.Create) {
                var varValue = this.inputList[2];

                Blockly.Blocks.fn_varAlign([varValue]);
            }
        }
    }
};
//===================================== Define the components of digital_read block   ===============================
Blockly.Blocks['digital_read'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(Blockly.Msg.digitalread);

        var Panel1 = this.appendDummyInput('Panel1')
            .appendField("Pin")
            .appendField(new Blockly.FieldDropdown(Blockly.Blocks.InputPinArray), "Pin")
            .appendField(new Blockly.FieldDropdown([["HIGH", "HIGH"], ["LOW", "LOW"]]), "state");

        var OutputStmt = this.appendStatementInput("OutputStmt")
            .setCheck(null);

        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Code.multiColor.input);
        this.setTooltip(Blockly.Msg.digitalread);

        Panel1.setVisible(false);
        if (this.isInFlyout) {
            OutputStmt.setVisible(false);
        }
    },
    onchange: function (ev) {
        Blockly.Blocks.fn_onchange(this, ev, Code.multiColor.input);
    }
};
//===================================== Define the components of analog_read block   ===============================
Blockly.Blocks['analog_read'] = {
    init: function () {
        var currPinArray = Blockly.Blocks.getUnusedpins(this);
        var minvalue = Blockly.Blocks.MinValue < 0 ? 0 : Blockly.Blocks.MinValue;
        var maxvalue = Blockly.Blocks.MaxValue > 1023 ? 1023 : Blockly.Blocks.MaxValue;

        this.appendDummyInput()
            .appendField(Blockly.Msg.analogread);

        var Panel1 = this.appendDummyInput('Panel1')
            .appendField("Pin")
            .appendField(new Blockly.FieldDropdown(currPinArray), "Pin")
            .appendField("Range")
            .appendField(new Blockly.FieldDropdown([["Inside", "Inside"], ["Outside", "Outside"]]), "RangeLimit")
            .appendField("Min")
            .appendField(new Blockly.FieldNumber(minvalue, 0, 1023), "SensorRangeMin")
            .appendField("Max")
            .appendField(new Blockly.FieldNumber(maxvalue, 0, 1023), "SensorRangeMax");

        var OutputStmt = this.appendStatementInput("OutputStmt")
            .setCheck(null);

        this.setInputsInline(true);
        this.setPreviousStatement(true, "lightsensor");
        this.setNextStatement(true, "lightsensor");
        this.setColour(Code.multiColor.input);
        this.setTooltip(Blockly.Msg.analogread);

        Panel1.setVisible(false);
        if (this.isInFlyout) {
            OutputStmt.setVisible(false);
        }
    },
    onchange: function (ev) {
        Blockly.Blocks.fn_onchange(this, ev, Code.multiColor.input);
    }
};
//===================================== Define the components of tone block   ===============================
Blockly.Blocks['tone'] = {
    init: function () {
        var currPinArray = Blockly.Blocks.getUnusedpins(this);
        var thisBlock = this;
        var frequencyList = [["Do", "2093"], ["Re", "2349"], ["Me", "2637"],
            ["Fa", "3793"], ["So", "3136"], ["La", "3520"], ["Ti", "3951"],
            ["Custom", "1000"]];

        var mutebutton = new Blockly.FieldImage("assets/images/icons/sound.png", 15, 15, "*", function (newOp) {
            var pinPanel = thisBlock.inputList[1];

            var muteValue = pinPanel.fieldRow[0];
            var mute = pinPanel.fieldRow[1];

            if (muteValue.text_ == "mute") {
                newOp = "assets/images/icons/sound.png";
                muteValue.setValue("sound");
            }
            else {
                newOp = "assets/images/icons/mute.png";
                muteValue.setValue("mute");
            }
            mute.setValue(newOp);
        });

        this.appendDummyInput()
            .appendField(Blockly.Msg.tone);

        var pinPanel = this.appendDummyInput('pinPanel')
            .appendField(new Blockly.FieldTextInput("sound"), "muteValue")
            .appendField(mutebutton, 'mute')
            .appendField("Pin")
            .appendField(new Blockly.FieldDropdown(currPinArray), "Pin");

        var freqListPanel = this.appendDummyInput('freqListPanel')
            .appendField("Freq")
            .appendField(new Blockly.FieldDropdown(frequencyList), "frequency");

        var varFrequency = this.appendValueInput("varFrequency")
            .setCheck("Number");

        var durationPanel = this.appendDummyInput('durationTypePanel')
            .appendField("Duration ")
            .appendField(new Blockly.FieldNumber(1000, 1, 9999), "duration");

        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Code.multiColor.output);
        this.setTooltip(Blockly.Msg.tone);

        pinPanel.setVisible(false);
        freqListPanel.setVisible(false);
        varFrequency.setVisible(false);
        durationPanel.setVisible(false);
    },
    //============================ In case of any change of the user on the block components ===================
    onchange: function (ev) {
        Blockly.Blocks.RemoveUsedPins(this);
        if (!this.isInFlyout) {
            if (this.colour_ !== Code.multiColor.output) {
                this.setColour(Code.multiColor.output);
            }
            Blockly.Blocks.CheckStartnode(this);
            Blockly.Blocks.hidemutation(ev);
            if (!this.collapsed_) {
                var pinPanel = this.inputList[1];
                var freqListPanel = this.inputList[2];
                var varFrequency = this.inputList[3];
                var durationPanel = this.inputList[4];

                var muteValue = pinPanel.fieldRow[0];
                var mute = pinPanel.fieldRow[1];

                var insideVarBlock, changes = 0;
                if (!pinPanel.visible_) {
                    pinPanel.setVisible(true);
                    muteValue.setVisible(false);

                    changes++;
                }

                muteValue = muteValue.text_;
                if (muteValue == "mute") {
                    if (mute.src_ !== "assets/images/icons/mute.png") {
                        mute.setValue("assets/images/icons/mute.png");
                    }
                    if (freqListPanel.visible_) {
                        freqListPanel.setVisible(false);
                        varFrequency.setVisible(false);
                        durationPanel.setVisible(false);

                        insideVarBlock = varFrequency.connection && varFrequency.connection.targetBlock();
                        if (insideVarBlock != null) {
                            insideVarBlock.dispose();
                        }

                        changes++;
                    }
                }
                else if (muteValue === "sound") {
                    if (!freqListPanel.visible_) {
                        mute.setValue("assets/images/icons/sound.png");
                        freqListPanel.setVisible(true);
                        durationPanel.setVisible(true);

                        changes++;
                    }

                    var frequencyValue = freqListPanel.fieldRow[1].value_;
                    if (frequencyValue == '1000' && !varFrequency.visible_) {
                        varFrequency.setVisible(true);

                        this.appendShadowBlock(varFrequency, 1000, 1, 9999);
                        changes++;
                    }
                    else if (frequencyValue !== '1000' && varFrequency.visible_) {
                        varFrequency.setVisible(false);

                        insideVarBlock = varFrequency.connection && varFrequency.connection.targetBlock();
                        if (insideVarBlock != null) {
                            insideVarBlock.dispose();
                        }

                        changes++;
                    }
                }

                if (changes > 0) {
                    pinPanel.setAlign(true);
                }

                Blockly.Blocks.fn_varAlign([varFrequency]);
            }
            else if (ev instanceof Blockly.Events.Create) {
                var varFrequency = this.inputList[3];

                Blockly.Blocks.fn_varAlign([varFrequency]);
            }
        }
    }
};
//===================================== Define the components of bluetooth_connect block   ===============================
Blockly.Blocks['bluetooth_connect'] = {
    init: function () {
        this.appendDummyInput('Panel')
            .appendField(Blockly.Msg.bluetooth_connect);

        var Panel1 = this.appendDummyInput('Panel1')
            .appendField("Connect Bluetooth To")
            .appendField(new Blockly.FieldTextInput("Bluetooth"), "blueooth_name");

        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Code.multiColor.bluetooth);
        this.setTooltip(Blockly.Msg.bluetooth_connect);

        Panel1.setVisible(false);
    },
    onchange: function (ev) {
        Blockly.Blocks.fn_onchange_adv_bluetooth(this, ev);
    }
};
//===================================== Define the components of bluetooth_rename block   ===============================
Blockly.Blocks['bluetooth_rename'] = {
    init: function () {
        this.appendDummyInput('Panel')
            .appendField(Blockly.Msg.bluetooth_rename);

        var Panel1 = this.appendDummyInput('Panel1')
            .appendField("Rename Bluetooth To")
            .appendField(new Blockly.FieldTextInput("Bluetooth"), "blueooth_name");

        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Code.multiColor.bluetooth);
        this.setTooltip(Blockly.Msg.bluetooth_rename);

        Panel1.setVisible(false);
    },
    onchange: function (ev) {
        Blockly.Blocks.fn_onchange_adv_bluetooth(this, ev);
    }
};
//===================================== Define the components of bluetooth_disconnect block   ===============================
Blockly.Blocks['bluetooth_disconnect'] = {
    init: function () {
        this.appendDummyInput('Panel')
            .appendField(Blockly.Msg.bluetooth_disconnect);

        var Panel1 = this.appendDummyInput('Panel1')
            .appendField("Disconnect Bluetooth");

        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Code.multiColor.bluetooth);
        this.setTooltip(Blockly.Msg.bluetooth_connect);

        Panel1.setVisible(false);
    },
    onchange: function (ev) {
        Blockly.Blocks.fn_onchange_adv_bluetooth(this, ev);
    }
};
// Define blocks for Advanced menu - ends