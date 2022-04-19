//=========================================================
//The definition of the advanced set and its functions that can be done bu the user, also, get the valuse and configurations done by the user
//'controls_flow_statements'
//'customcode'
//'flow_delay'
//'flow_repeat'
//'flow_stop'
//'waitinput'
//=====================================================================
// Define blocks for Flow menu - begins
//===================================== Define the components of controls_flow_statements block   ===============================
Blockly.Blocks['controls_flow_statements'] = {
    init: function () {
        var a = [
          [Blockly.Msg.CONTROLS_FLOW_STATEMENTS_OPERATOR_BREAK, "BREAK"],
          [Blockly.Msg.CONTROLS_FLOW_STATEMENTS_OPERATOR_CONTINUE, "CONTINUE"]
      ];
        // define the icon of the controls_flow_statements flow block
        
        this.appendDummyInput()
          .appendField(new Blockly.FieldImage("assets/images/icons/yellow.png", 15, 15, { alt: "*", flipRtl: "FALSE" }))
          .appendField("Break");
        // define the default view of the controls_flow_statements before customization
       
        var Panel1 = this.appendDummyInput('Panel1')
          .appendField(new Blockly.FieldDropdown(a), "FLOW");

        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Code.multiColor.flow);
        this.setHelpUrl("");

        this.setTooltip(function () {
            var a = Panel1.fieldRow[0].value_;
            return {
                BREAK: Blockly.Msg.CONTROLS_FLOW_STATEMENTS_TOOLTIP_BREAK,
                CONTINUE: Blockly.Msg.CONTROLS_FLOW_STATEMENTS_TOOLTIP_CONTINUE
            }[a]
        });
    },
    onchange: function (a) {
        if (!this.isInFlyout) {
            if (this.colour_ !== Code.multiColor.flow) {
                this.setColour(Code.multiColor.flow);
            }
            Blockly.Blocks.hidemutation(a);
            if (!this.collapsed_) {
                var Panel1 = this.inputList[1];
                if (!Panel1.visible_) {
                    Panel1.setVisible(true);

                    Panel1.setAlign(true);
                }
            }
        }
    },
    LOOP_TYPES: ["flow_repeat"]
};
//===================================== Define the components of customcode block   ===============================
Blockly.Blocks['customcode'] = {
    init: function () {
        this.appendDummyInput()
          .appendField(new Blockly.FieldImage("assets/images/icons/yellow.png", 15, 15, { alt: "*", flipRtl: "FALSE" }))
          .appendField("Custom Code");

        var Panel1 = this.appendDummyInput('Panel1')
          .appendField(new Blockly.FieldDropdown([["COMMENT", "COMMENT"], ["Code", "PLAIN TEXT"]]), "option")
          .appendField(new Blockly.FieldDropdown([["Inside Loop", "loop"], ["Inside Setup", "setup"], ["Before Setup", "before"]]), "type")
          .appendField(new Blockly.FieldTextInput("Click here to type your custom code"), "customCode");
        // .appendField(new Blockly.FieldCode("Click here to type your custom code"), "customCode");

        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Code.multiColor.flow);
        this.setTooltip(Blockly.Msg.customcode);
        this.setHelpUrl("");
    },
    onchange: function (ev) {
        Blockly.Blocks.fn_onchange(this, ev, Code.multiColor.flow, true);
    }
};
//===================================== Define the components of flow_delay block   ===============================
Blockly.Blocks['flow_delay'] = {
    init: function () {
        this.appendDummyInput()
          .appendField(new Blockly.FieldImage("assets/images/icons/yellow.png", 15, 15, { alt: "*", flipRtl: "FALSE" }))
          .appendField("Delay");

        var pnlChoice = this.appendDummyInput('pnlChoice')
          .appendField(new Blockly.FieldDropdown([["Interval", "interval"], ["Variable", "variable"]]), "choice")
          .appendField("Time Span");

        var pnlInterval = this.appendDummyInput('pnlInterval')
          .appendField("H:")
          .appendField(new Blockly.FieldNumber(0, 0, 23), "hour")
          .appendField("M:")
          .appendField(new Blockly.FieldNumber(0, 0, 59), "min")
          .appendField("S:")
          .appendField(new Blockly.FieldNumber(0, 0, 59), "sec")
          .appendField("mS:")
          .appendField(new Blockly.FieldNumber(0, 0, 999), "ms");

        var variable_value = this.appendValueInput("variable_value")
          .setCheck("Number");

        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Code.multiColor.flow);
        this.setTooltip(Blockly.Msg.flow_delay);
        this.setHelpUrl("");

        variable_value.setVisible(false);
    },
    onchange: function (ev) {
        if (!this.isInFlyout) {
            if (this.colour_ !== Code.multiColor.flow) {
                this.setColour(Code.multiColor.flow);
            }
            Blockly.Blocks.CheckStartnode(this);
            Blockly.Blocks.hidemutation(ev);
            if (!this.collapsed_) {
                var pnlChoice = this.inputList[1];
                var pnlInterval = this.inputList[2];
                var variable_value = this.inputList[3];

                var choice_value = pnlChoice.fieldRow[0].value_;

                if (!pnlChoice.visible_) {
                    pnlChoice.setVisible(true);
                }

                if (choice_value === 'interval' && !pnlInterval.visible_) {
                    pnlInterval.setVisible(true);
                    variable_value.setVisible(false);

                    var insideVarBlock = variable_value.connection && variable_value.connection.targetBlock();
                    if (insideVarBlock != null) {
                        insideVarBlock.dispose();
                    }

                    pnlChoice.setAlign(true);
                }
                else if (choice_value !== 'interval' && !variable_value.visible_) {
                    pnlInterval.setVisible(false);
                    variable_value.setVisible(true);

                    this.appendShadowBlock(variable_value, 0, 0);

                    pnlChoice.setAlign(true);
                }

                Blockly.Blocks.fn_varAlign([variable_value]);
            }
            else if (ev instanceof Blockly.Events.Create) {
                var variable_value = this.inputList[3];

                Blockly.Blocks.fn_varAlign([variable_value]);
            }
        }
    }
};
//===================================== Define the components of flow_repeat block   ===============================
Blockly.Blocks['flow_repeat'] = {
    init: function () {
        this.appendDummyInput()
          .appendField(new Blockly.FieldImage("assets/images/icons/yellow.png", 15, 15, { alt: "*", flipRtl: "FALSE" }))
          .appendField("Repeat");

        var vartimes = this.appendValueInput("vartimes")
          .setCheck("Number");

        var Panel1 = this.appendDummyInput('Panel1')
          .appendField("times");

        var Panel2 = this.appendDummyInput('Panel2')
          .appendField(" Forever:")
          .appendField(new Blockly.FieldCheckbox("TRUE"), "chkForever");

        var OutputStmt = this.appendStatementInput("OutputStmt")
          .setCheck(null);

        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Code.multiColor.flow);
        this.setTooltip(Blockly.Msg.flow_repeat);
        this.setHelpUrl("");

        vartimes.setVisible(false);
        Panel1.setVisible(false);
        // Panel2.setVisible(false);
        /* if (this.isInFlyout) {
        OutputStmt.setVisible(false);
        } */
    },
    onchange: function (ev) {
        if (!this.isInFlyout) {
            if (this.colour_ !== Code.multiColor.flow) {
                this.setColour(Code.multiColor.flow);
            }
            Blockly.Blocks.CheckStartnode(this);
            Blockly.Blocks.hidemutation(ev);
            if (!this.collapsed_) {
                var vartimes = this.inputList[1];
                var Panel1 = this.inputList[2];
                var Panel2 = this.inputList[3];

                //   var chkForever = Panel2.fieldRow[1].state_;
                var chkForever = Panel2.fieldRow[1].value_;
                var changes = 0;
                if (!Panel2.visible_) {
                    Panel2.setVisible(true);

                    changes++;
                }

                if (chkForever && Panel1.visible_) {
                    vartimes.setVisible(false);
                    Panel1.setVisible(false);

                    var insideVarBlock = vartimes.connection && vartimes.connection.targetBlock();
                    if (insideVarBlock != null) {
                        insideVarBlock.dispose();
                    }

                    changes++;
                }
                else if (!chkForever && !Panel1.visible_) {
                    vartimes.setVisible(true);
                    Panel1.setVisible(true);

                    this.appendShadowBlock(vartimes, 1, 0);

                    changes++;
                }

                if (changes > 0) {
                    Panel1.setAlign(true);
                }

                Blockly.Blocks.fn_varAlign([vartimes]);
            }
            else if (ev instanceof Blockly.Events.Create) {
                var vartimes = this.inputList[1];

                Blockly.Blocks.fn_varAlign([vartimes]);
            }
        }
    }
};
//===================================== Define the components of flow_stop block   ===============================
Blockly.Blocks['flow_stop'] = {
    init: function () {
        this.appendDummyInput()
          .appendField(new Blockly.FieldImage("assets/images/icons/yellow.png", 15, 15, { alt: "*", flipRtl: "FALSE" }))
          .appendField("Stop");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Code.multiColor.flow);
        this.setTooltip(Blockly.Msg.flow_stop);
        this.setHelpUrl("");
    },
    onchange: function (ev) {
        Blockly.Blocks.fn_onchange(this, ev, Code.multiColor.flow, true, true);
    }
};
//===================================== Define the components of waitinput block   ===============================
Blockly.Blocks['waitinput'] = {
    init: function () {
        var currPinArray = Blockly.Blocks.getUnusedpins(this);
        var minvalue = Blockly.Blocks.MinValue < 0 ? 0 : Blockly.Blocks.MinValue;
        var maxvalue = Blockly.Blocks.MaxValue > 1023 ? 1023 : Blockly.Blocks.MaxValue;

        var device_dropDown = [[Blockly.Msg.lightsensor, "lightsensor"], [Blockly.Msg.resistor, "variableresistor"],
          [Blockly.Msg.ultrasonic, "ultrasonoic"], [Blockly.Msg.sound_sensor, "soundsensor"], ["Serial RX", "SerialRX"],
          [Blockly.Msg.bluetoothrx, "BluetoothRx"], [Blockly.Msg.IR, "IR"], ["Edge", "edge"], [Blockly.Msg.button, "button"],
          ["Remote", "remote"], [Blockly.Msg.slide_node, "slidenode"]];

        this.appendDummyInput()
          .appendField(new Blockly.FieldImage("assets/images/icons/yellow.png", 15, 15, { alt: "*", flipRtl: "FALSE" }))
          .appendField("Wait Input");

        var pnlGeneral = this.appendDummyInput('pnlGeneral')
          .appendField(new Blockly.FieldDropdown(device_dropDown), "device");

        var pnlGeneralRX = this.appendDummyInput('pnlGeneralRX')
          .appendField("Pin")
          .appendField(new Blockly.FieldDropdown(currPinArray), "Pin");

        var pnlSensor = this.appendDummyInput('pnlSensor')
          .appendField("Range")
          .appendField(new Blockly.FieldDropdown([["Inside", "Inside"], ["Outside", "Outside"]]), "RangeLimit")
          .appendField("Min")
          .appendField(new Blockly.FieldNumber(minvalue, 0, 1023), "SensorRangeMin")
          .appendField("Max")
          .appendField(new Blockly.FieldNumber(maxvalue, 0, 1023), "SensorRangeMax");

        var pnlEdge = this.appendDummyInput('pnlEdge')
          .appendField(" ")
          .appendField(new Blockly.FieldDropdown([["RISING", "RISING"], ["FALLING", "FALLING"]]), "status");

        var pnlButton = this.appendDummyInput('pnlButton')
          .appendField(" ")
          .appendField(new Blockly.FieldDropdown([["PRESSED", "PRESSED"], ["RELEASED", "RELEASED"]]), "state");

        var pnlRemote = this.appendDummyInput('pnlRemote')
          .appendField(" ")
          .appendField(new Blockly.FieldRemote1("FW"), "remoteButton");

        var pnlRX = this.appendDummyInput('pnlRX')
          .appendField("Baud Rate")
          .appendField(new Blockly.FieldDropdown([["300", "300"], ["600", "600"], ["1200", "1200"], ["2400", "2400"], ["4800", "4800"], ["9600", "9600"], ["14400", "14400"], ["19200", "19200"], ["28800", "28800"], ["38400", "38400"], ["57600", "57600"], ["115200", "115200"]]), "baudrate")
          .appendField(new Blockly.FieldDropdown([["Character", "character"], ["Text", "Text"]]), "choice")
          .appendField(new Blockly.FieldTextInput("A"), "txtchar2");

        var BluetoothRX = this.appendDummyInput('BluetoothRX')
          .appendField("Baud Rate :")
          .appendField("9600", "baudrate")
          .appendField(new Blockly.FieldDropdown([["Character", "Character"], ["Text", "Text"]]), "datatype")
          .appendField(new Blockly.FieldTextInput("A"), "txtchar");

        var SlideNode = this.appendDummyInput('SlideNode')
          .appendField(" ")
          .appendField(new Blockly.FieldSlide("DOWN, DOWN, DOWN"), "toggleSwitch");

        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Code.multiColor.flow);
        this.setTooltip(Blockly.Msg.waitinput);
        this.setHelpUrl("");

        pnlEdge.setVisible(false);
        pnlButton.setVisible(false);
        pnlRemote.setVisible(false);
        pnlRX.setVisible(false);
        BluetoothRX.setVisible(false);
        SlideNode.setVisible(false);
    },
    onchange: function (ev) {
        Blockly.Blocks.RemoveUsedPins(this);
        if (!this.isInFlyout) {
            if (this.colour_ !== Code.multiColor.flow) {
                this.setColour(Code.multiColor.flow);
            }
            Blockly.Blocks.CheckStartnode(this);
            Blockly.Blocks.hidemutation(ev);
            if (!this.collapsed_) {
                var pnlGeneral = this.inputList[1];
                var pnlGeneralRX = this.inputList[2];
                var pnlSensor = this.inputList[3];
                var pnlEdge = this.inputList[4];
                var pnlButton = this.inputList[5];
                var pnlRemote = this.inputList[6];
                var pnlRX = this.inputList[7];
                var BluetoothRX = this.inputList[8];
                var SlideNode = this.inputList[9];

                var device = pnlGeneral.fieldRow[0];

                var device_dropDown = [[Blockly.Msg.lightsensor, "lightsensor"], [Blockly.Msg.resistor, "variableresistor"],
                      [Blockly.Msg.ultrasonic, "ultrasonoic"], [Blockly.Msg.sound_sensor, "soundsensor"], ["Serial RX", "SerialRX"],
                      [Blockly.Msg.bluetoothrx, "BluetoothRx"], [Blockly.Msg.IR, "IR"], ["Edge", "edge"], [Blockly.Msg.button, "button"],
                      ["Remote", "remote"], [Blockly.Msg.slide_node, "slidenode"]];

                device.menuGenerator_ = device_dropDown;

                var changes = 0;
                if (!pnlGeneral.visible_) {
                    pnlGeneral.setVisible(true);

                    changes++;
                }

                device = device.value_;
                if ((device == 'lightsensor' || device == 'variableresistor' ||
                      device == 'IR' || device == 'ultrasonoic' ||
                      device == 'soundsensor') && !pnlSensor.visible_) {
                    pnlGeneralRX.setVisible(true);
                    pnlSensor.setVisible(true);
                    pnlEdge.setVisible(false);
                    pnlButton.setVisible(false);
                    pnlRemote.setVisible(false);
                    pnlRX.setVisible(false);
                    BluetoothRX.setVisible(false);
                    SlideNode.setVisible(false);

                    changes++;
                }
                else if (device == 'edge' && !pnlEdge.visible_) {
                    pnlGeneralRX.setVisible(true);
                    pnlSensor.setVisible(false);
                    pnlEdge.setVisible(true);
                    pnlButton.setVisible(false);
                    pnlRemote.setVisible(false);
                    pnlRX.setVisible(false);
                    BluetoothRX.setVisible(false);
                    SlideNode.setVisible(false);

                    changes++;
                }
                else if (device == 'button' && !pnlButton.visible_) {
                    pnlGeneralRX.setVisible(true);
                    pnlSensor.setVisible(false);
                    pnlEdge.setVisible(false);
                    pnlButton.setVisible(true);
                    pnlRemote.setVisible(false);
                    pnlRX.setVisible(false);
                    BluetoothRX.setVisible(false);
                    SlideNode.setVisible(false);

                    changes++;
                }
                else if (device == 'remote' && !pnlRemote.visible_) {
                    pnlGeneralRX.setVisible(true);
                    pnlSensor.setVisible(false);
                    pnlEdge.setVisible(false);
                    pnlButton.setVisible(false);
                    pnlRemote.setVisible(true);
                    pnlRX.setVisible(false);
                    BluetoothRX.setVisible(false);
                    SlideNode.setVisible(false);

                    changes++;
                }
                else if (device == 'SerialRX' && !pnlRX.visible_) {
                    pnlGeneralRX.setVisible(true);
                    pnlSensor.setVisible(false);
                    pnlEdge.setVisible(false);
                    pnlButton.setVisible(false);
                    pnlRemote.setVisible(false);
                    pnlRX.setVisible(true);
                    BluetoothRX.setVisible(false);
                    SlideNode.setVisible(false);

                    changes++;
                }
                else if (device == 'BluetoothRx' && !BluetoothRX.visible_) {
                    pnlGeneralRX.setVisible(true);
                    pnlSensor.setVisible(false);
                    pnlEdge.setVisible(false);
                    pnlButton.setVisible(false);
                    pnlRemote.setVisible(false);
                    pnlRX.setVisible(false);
                    BluetoothRX.setVisible(true);
                    SlideNode.setVisible(false);

                    changes++;
                }
                else if (device == 'slidenode' && !SlideNode.visible_) {
                    pnlGeneralRX.setVisible(false);
                    pnlSensor.setVisible(false);
                    pnlEdge.setVisible(false);
                    pnlButton.setVisible(false);
                    pnlRemote.setVisible(false);
                    pnlRX.setVisible(false);
                    BluetoothRX.setVisible(false);
                    SlideNode.setVisible(true);

                    changes++;
                }

                if (changes > 0) {
                    pnlGeneral.setAlign(true);
                }
            }
        }
    }
};
// Define blocks for Flow menu - ends