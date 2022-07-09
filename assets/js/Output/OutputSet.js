
//============================================================
//Define the content of each block in outpu set
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
//===========================================================================
// Define blocks for Output menu - begins
//define the content of the bluetoothrx
Blockly.Blocks['bluetoothtx'] = {
    init: function () {
        var currPinArray = Blockly.Blocks.getUnusedpins(this);
        //========================== define the icon of the bluetoothrx output block
       
        this.appendDummyInput()
          .appendField(new Blockly.FieldImage("assets/images/icons/blue.png", 15, 15, { alt: "*", flipRtl: "FALSE" }))
          .appendField("Bluetooth Tx");
        //======================== define the default view of the bluetoothrx output before customization
        
        var varData = this.appendValueInput("varData")
          .appendField("Pin")
          .appendField(new Blockly.FieldDropdown(currPinArray), "Pin")
          .appendField(" ")
          .setCheck("String");

        var secondPanel = this.appendDummyInput('secondPanel')
          .appendField("New Line")
          .appendField(new Blockly.FieldCheckbox("TRUE"), "chkNewline")
          .appendField("Delay 100ms")
          .appendField(new Blockly.FieldCheckbox("TRUE"), "chkDelay");

        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Code.multiColor.output);
        this.setTooltip("");
        this.setHelpUrl("");

        if (!this.isInFlyout) {
            this.appendShadowBlock(varData, "", 0, 0, Blockly.Block.shadowType.TEXT);
        }
        /* else {
        varData.setVisible(false);
        secondPanel.setVisible(false);
        } */
    },
    onchange: function (ev) {
        Blockly.Blocks.fn_onchange_out_serial(this, ev);
    }
};
//==============================================================================
//define the content of the buzzer

Blockly.Blocks['buzzer'] = {
    init: function () {
        var currPinArray = Blockly.Blocks.getUnusedpins(this);
        var dropdown_types = [["Sing", "Sing"], ["Frequency", "Frequency"]];
        var thisBlock = this;
        var options = [["Melody 1", "0"], ["Melody 2", "1"], ["Melody 3", "2"], ["Melody 4", "3"],
          ["Melody 5", "4"], ["Melody 6", "5"], ["Surprise", "6"], ["OhOoh", "7"], ["OhOoh2", "8"],
          ["Cuddly", "9"], ["Sleeping", "10"], ["Happy", "11"], ["SuperHappy", "12"], ["Happy_short", "13"],
          ["Sad", "14"], ["Confused", "15"], ["Melody 7", "16"], ["Melody 8", "17"], ["Melody 9", "18"],
          ["Mario 1", "19"], ["Mario 2", "20"]];
        var frequencyList = [["Do", "2093"], ["Re", "2349"], ["Me", "2637"],
          ["Fa", "3793"], ["So", "3136"], ["La", "3520"], ["Ti", "3951"],
          ["Custom", "1000"]];
        //============================= define the icon of the buzzer output block
        
        var mutebutton = new Blockly.FieldImage("assets/images/icons/blue.png", 15, 15, "*", function (newOp) {
            var pinPanel = thisBlock.inputList[1];

            var muteValue = pinPanel.fieldRow[0];
            var mute = pinPanel.fieldRow[1];

            if (muteValue.text_ == "mute") {
                newOp = "assets/images/icons/blue.png";
                muteValue.setValue("sound");
            }
            else {
                newOp = "assets/images/icons/blue.png";
                muteValue.setValue("mute");
            }
            mute.setValue(newOp);
        });
        // ========================define the default view of the buzzer output before customization
               this.appendDummyInput()
          .appendField(new Blockly.FieldImage("assets/images/icons/blue.png", 15, 15, { alt: "*", flipRtl: "FALSE" }))
          .appendField("Buzzer");

        var pinPanel = this.appendDummyInput('pinPanel')
        // .appendField(new Blockly.FieldTextInput("sound"), "muteValue")
          .appendField(mutebutton, 'mute')
          .appendField("Pin")
          .appendField(new Blockly.FieldDropdown(currPinArray), "Pin");

        var typePanel = this.appendDummyInput('typePanel')
          .appendField(" ")
          .appendField(new Blockly.FieldDropdown(dropdown_types), "SelectionDrpDwn");

        var freqListPanel = this.appendDummyInput('freqListPanel')
          .appendField(" ")
          .appendField(new Blockly.FieldDropdown(frequencyList), "frequency");

        var singPanel = this.appendDummyInput('singPanel')
          .appendField(" ")
          .appendField(new Blockly.FieldDropdown(options, function (newOp) {
          }), "Sing");

        var varFrequency = this.appendValueInput("varFrequency")
          .appendField(" ")
          .setCheck("Number");

        var varDuration = this.appendValueInput("varDuration")
          .appendField(" Duration")
          .setCheck("Number");

        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Code.multiColor.output);
        this.setTooltip("");
        this.setHelpUrl("");

        // pinPanel.setVisible(false);
        // typePanel.setVisible(false);
        freqListPanel.setVisible(false);
        // singPanel.setVisible(false);
        varFrequency.setVisible(false);
        varDuration.setVisible(false);
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
                var pinPanel = this.inputList[1];
                var typePanel = this.inputList[2];
                var freqListPanel = this.inputList[3];
                var singPanel = this.inputList[4];
                var varFrequency = this.inputList[5];
                var varDuration = this.inputList[6];

                var muteValue = pinPanel.fieldRow[0];
                var mute = pinPanel.fieldRow[1];
                var SelectionDrpDwn = typePanel.fieldRow[1];

                var insideVarBlock, changes = 0;
                if (!pinPanel.visible_) {
                    pinPanel.setVisible(true);
                    muteValue.setVisible(false);

                    changes++;
                }

                SelectionDrpDwn.menuGenerator_ = [["Sing", "Sing"], ["Frequency", "Frequency"]];
                if (SelectionDrpDwn.value_ === "Melody") {
                    SelectionDrpDwn.setValue("Sing");
                }

                //   muteValue = muteValue.text_;
                muteValue = "sound";
                if (muteValue === "mute") {
                    if (mute.src_ !== "assets/images/icons/mute.png") {
                        mute.setValue("assets/images/icons/mute.png");
                    }
                    if (typePanel.visible_) {
                        typePanel.setVisible(false);
                        freqListPanel.setVisible(false);
                        singPanel.setVisible(false);
                        varFrequency.setVisible(false);
                        varDuration.setVisible(false);

                        insideVarBlock = varFrequency.connection && varFrequency.connection.targetBlock();
                        if (insideVarBlock != null) {
                            insideVarBlock.dispose();
                        }

                        insideVarBlock = varDuration.connection && varDuration.connection.targetBlock();
                        if (insideVarBlock != null) {
                            insideVarBlock.dispose();
                        }

                        changes++;
                    }
                }
                else if (muteValue === "sound") {
                    if (!typePanel.visible_) {
                        mute.setValue("assets/images/icons/sound.png");
                        typePanel.setVisible(true);

                        changes++;
                    }

                    if (SelectionDrpDwn.value_ === 'Frequency') {
                        if (!freqListPanel.visible_) {
                            freqListPanel.setVisible(true);
                            singPanel.setVisible(false);
                            varDuration.setVisible(true);

                            this.appendShadowBlock(varDuration, 1000, 1, 9999);

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
                    else if ((SelectionDrpDwn.value_ === 'Sing' || SelectionDrpDwn.value_ == 'Melody') && !singPanel.visible_) {
                        freqListPanel.setVisible(false);
                        singPanel.setVisible(true);
                        varFrequency.setVisible(false);
                        varDuration.setVisible(false);

                        insideVarBlock = varFrequency.connection && varFrequency.connection.targetBlock();
                        if (insideVarBlock != null) {
                            insideVarBlock.dispose();
                        }

                        insideVarBlock = varDuration.connection && varDuration.connection.targetBlock();
                        if (insideVarBlock != null) {
                            insideVarBlock.dispose();
                        }

                        changes++;
                    }
                }

                if (changes > 0) {
                    pinPanel.setAlign(true);
                }

                Blockly.Blocks.fn_varAlign([varFrequency, varDuration]);
            }
            else if (ev instanceof Blockly.Events.Create) {
                var varFrequency = this.inputList[5];
                var varDuration = this.inputList[6];

                Blockly.Blocks.fn_varAlign([varFrequency, varDuration]);
            }
        }
    }
};
//=========================================================================
//define the content of the lcd

Blockly.Blocks['lcd'] = {
    init: function () {
        var currPinArray = Blockly.Blocks.getUnusedpins(this);
        // define the icon of the lcd output block
        
        this.appendDummyInput()
          .appendField(new Blockly.FieldImage("assets/images/icons/blue.png", 15, 15, { alt: "*", flipRtl: "FALSE" }))
          .appendField("LCD");
        // define the default view of the lcd output before customization
        
        var varData = this.appendValueInput("varData")
          .appendField("Pin")
          .appendField(new Blockly.FieldDropdown(currPinArray), "Pin")
          .appendField("Send: ")
          .setCheck("String");

        var secondPanel = this.appendDummyInput('secondPanel')
          .appendField("Row")
          .appendField(new Blockly.FieldNumber(0, 0, 1), "row")
          .appendField("Column")
          .appendField(new Blockly.FieldNumber(0, 0, 15), "coloumn");

        if (!Blockly.isMobile) {
            secondPanel.appendField("Delay")
              .appendField(new Blockly.FieldNumber(200, 50, 5000), "delay");
        }

        secondPanel.appendField("Clear")
          .appendField(new Blockly.FieldCheckbox("TRUE"), "chkClear")
          .appendField("Auto Scroll")
          .appendField(new Blockly.FieldCheckbox("FALSE"), "chkScroll");

        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Code.multiColor.output);
        this.setTooltip("");
        this.setHelpUrl("");

        if (!this.isInFlyout) {
            this.appendShadowBlock(varData, "", 0, 0, Blockly.Block.shadowType.TEXT);
        }
        /* else {
        varData.setVisible(false);
        secondPanel.setVisible(false);
        } */
    },
    onchange: function (ev) {
        Blockly.Blocks.fn_onchange_out_serial(this, ev);
    }
};
//==========================================================================
//define the content of the led

Blockly.Blocks['led'] = {
    init: function () {
        var currPinArray = Blockly.Blocks.getUnusedpins(this);
        //================ define the icon of the led output block
       
        this.appendDummyInput()
          .appendField(new Blockly.FieldImage("assets/images/icons/blue.png", 15, 15, { alt: "*", flipRtl: "FALSE" }))
          .appendField("LED");
        // define the default view of the led output before customization
       
        var Panel1 = this.appendDummyInput('Panel1')
          .appendField("Pin")
          .appendField(new Blockly.FieldDropdown(currPinArray), "Pin")
          .appendField(new Blockly.FieldDropdown([["ON", "HIGH"], ["OFF", "LOW"]]), "status");

        this.setMutator(new Blockly.Mutator(["multi_stmt"]));

        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Code.multiColor.output);
        this.setTooltip("");
        this.setHelpUrl("");

        this.outputCount_ = 0;
    },
    onchange: function (ev) {
        Blockly.Blocks.fn_onchange(this, ev, Code.multiColor.output);
    },
    mutationToDom: function () {
        return Blockly.Blocks.fno_mutationToDom(this);
    },
    domToMutation: function (xmlElement) {
        Blockly.Blocks.fno_domToMutation(xmlElement, this);
    },
    decompose: function (a) {
        return Blockly.Blocks.fno_decompose(a, this);
    },
    compose: function (a) {
        Blockly.Blocks.fn_compose(a, this);
    },
    saveConnections: function (a) {
        Blockly.Blocks.fn_saveconnections(a, this);
    },
    updateShape_: function () {
        Blockly.Blocks.fn_updateshape(this);
    }
};
//======================================================================
//define the content of the motor

Blockly.Blocks['motor'] = {
    init: function () {
        this.appendDummyInput()
        // define the icon of the motor output block
       
          .appendField(new Blockly.FieldImage("assets/images/icons/blue.png", 15, 15, { alt: "*", flipRtl: "FALSE" }))
          .appendField("Motor");
        // define the default view of the motor output before customization
      
        var panelLeft = this.appendDummyInput('panelLeft')
          .appendField("Left")
          .appendField(new Blockly.FieldCheckbox("FALSE"), "chkLeft");

        var varLeft = this.appendValueInput("varLeft")
          .appendField(" ")
          .setCheck("Number");

        var panelRight = this.appendDummyInput('panelRight')
          .appendField("Right")
          .appendField(new Blockly.FieldCheckbox("FALSE"), "chkRight");

        var varRight = this.appendValueInput("varRight")
          .appendField(" ")
          .setCheck("Number");

        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Code.multiColor.output);
        this.setTooltip("");
        this.setHelpUrl("");

        // panelLeft.setVisible(false);
        varLeft.setVisible(false);
        // panelRight.setVisible(false);
        varRight.setVisible(false);
    },
    onchange: function (ev) {
        if (!this.isInFlyout) {
            if (this.colour_ !== Code.multiColor.output) {
                this.setColour(Code.multiColor.output);
            }
            Blockly.Blocks.CheckStartnode(this);
            Blockly.Blocks.hidemutation(ev);
            if (!this.collapsed_) {
                var panelLeft = this.inputList[1];
                var varLeft = this.inputList[2];
                var panelRight = this.inputList[3];
                var varRight = this.inputList[4];

                var chkLeft = panelLeft.fieldRow[1].value_;
                var chkRight = panelRight.fieldRow[1].value_;

                var insideVarBlock, changes = 0;
                if (!panelLeft.visible_) {
                    panelLeft.setVisible(true);
                    panelRight.setVisible(true);

                    changes++;
                }

                if (chkLeft && !varLeft.visible_) {
                    varLeft.setVisible(true);

                    this.appendShadowBlock(varLeft, 0, -10, 10);

                    changes++;
                }
                else if (!chkLeft && varLeft.visible_) {
                    varLeft.setVisible(false);

                    insideVarBlock = varLeft.connection && varLeft.connection.targetBlock();
                    if (insideVarBlock != null) {
                        insideVarBlock.dispose();
                    }

                    changes++;
                }

                if (chkRight && !varRight.visible_) {
                    varRight.setVisible(true);

                    this.appendShadowBlock(varRight, 0, -10, 10);

                    changes++;
                }
                else if (!chkRight && varRight.visible_) {
                    varRight.setVisible(false);

                    insideVarBlock = varRight.connection && varRight.connection.targetBlock();
                    if (insideVarBlock != null) {
                        insideVarBlock.dispose();
                    }

                    changes++;
                }

                if (changes > 0) {
                    panelLeft.setAlign(true);
                }

                Blockly.Blocks.fn_varAlign([varLeft, varRight]);
            }
            else if (ev instanceof Blockly.Events.Create) {
                var varLeft = this.inputList[2];
                var varRight = this.inputList[4];

                Blockly.Blocks.fn_varAlign([varLeft, varRight]);
            }
        }
    }
};
//=================================================================================
//define the content of the mp3_player

Blockly.Blocks['mp3_player'] = {
    init: function () {
        var currPinArray = Blockly.Blocks.getUnusedpins(this);
        var dropdown_types = [["Play/Pause", "Play"], ["Stop", "Stop"], ["Play Next", "PlayNext"], ["Play Previous", "PlayPrevious"]
          , ["Play Track Number", "PlayTrackNumber"], ["Set volume", "Setvolume"]];
        //==================== define the icon of the mp3_player output block
       
        this.appendDummyInput()
          .appendField(new Blockly.FieldImage("assets/images/icons/blue.png", 15, 15, { alt: "*", flipRtl: "FALSE" }))
          .appendField("MP3 Player");
        // define the default view of the mp3_player output before customization
       
        var pinPanel = this.appendDummyInput('pinPanel')
          .appendField("Pin")
          .appendField(new Blockly.FieldDropdown(currPinArray), "Pin")
          .appendField(new Blockly.FieldDropdown(dropdown_types), "SelectionDrpDwn");

        var TRACK_NUMBERPanel = this.appendDummyInput('TRACK_NUMBERPanel')
          .appendField(" ")
          .appendField(new Blockly.FieldNumber(1, 1, 1000), "TRACK_NUMBER");

        var VOLUMEPanel = this.appendDummyInput('VOLUMEPanel')
          .appendField(" ")
          .appendField(new Blockly.FieldNumber(1, 1, 1000), "VOLUME")
          .appendField(" %");

        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Code.multiColor.output);
        this.setTooltip("");
        this.setHelpUrl("");

        // pinPanel.setVisible(false);
        TRACK_NUMBERPanel.setVisible(false);
        VOLUMEPanel.setVisible(false);
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
                var pinPanel = this.inputList[1];
                var TRACK_NUMBERPanel = this.inputList[2];
                var VOLUMEPanel = this.inputList[3];

                var SelectionDrpDwn_value = pinPanel.fieldRow[2].value_;

                var changes = 0;
                if (!pinPanel.visible_) {
                    pinPanel.setVisible(true);

                    changes++;
                }

                if (SelectionDrpDwn_value == "PlayTrackNumber" && !TRACK_NUMBERPanel.visible_) {
                    TRACK_NUMBERPanel.setVisible(true);
                    VOLUMEPanel.setVisible(false);

                    changes++;
                }
                else if (SelectionDrpDwn_value == "Setvolume" && !VOLUMEPanel.visible_) {
                    TRACK_NUMBERPanel.setVisible(false);
                    VOLUMEPanel.setVisible(true);

                    changes++;
                }
                else if (SelectionDrpDwn_value !== "PlayTrackNumber" && SelectionDrpDwn_value !== "Setvolume" && (VOLUMEPanel.visible_ || TRACK_NUMBERPanel.visible_)) {
                    TRACK_NUMBERPanel.setVisible(false);
                    VOLUMEPanel.setVisible(false);

                    changes++;
                }

                if (changes > 0) {
                    pinPanel.setAlign(true);
                }
            }
        }
    }
};
//=====================================================================

//define the content of the relay

Blockly.Blocks['relay'] = {
    init: function () {
        var currPinArray = Blockly.Blocks.getUnusedpins(this);
        //============ define the icon of the relay output block
        
        this.appendDummyInput()
          .appendField(new Blockly.FieldImage("assets/images/icons/blue.png", 15, 15, { alt: "*", flipRtl: "FALSE" }))
          .appendField("Relay");
        //========= define the default view of the relay output before customization
        
        var Panel1 = this.appendDummyInput('Panel1')
          .appendField("Flip")
          .appendField(new Blockly.FieldCheckbox("FALSE"), "chkFlip")
          .appendField("Pin")
          .appendField(new Blockly.FieldDropdown(currPinArray), "Pin")
          .appendField(new Blockly.FieldDropdown([["ON", "HIGH"], ["OFF", "LOW"]]), "status");

        this.setMutator(new Blockly.Mutator(["multi_stmt"]));

        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Code.multiColor.output);
        this.setTooltip("");
        this.setHelpUrl("");
        this.outputCount_ = 0;
    },
    onchange: function (ev) {
        Blockly.Blocks.fn_onchange(this, ev, Code.multiColor.output);
    },
    mutationToDom: function () {
        return Blockly.Blocks.fno_mutationToDom(this);
    },
    domToMutation: function (xmlElement) {
        Blockly.Blocks.fno_domToMutation(xmlElement, this);
    },
    decompose: function (a) {
        return Blockly.Blocks.fno_decompose(a, this);
    },
    compose: function (a) {
        Blockly.Blocks.fn_compose(a, this);
    },
    saveConnections: function (a) {
        Blockly.Blocks.fn_saveconnections(a, this);
    },
    updateShape_: function () {
        Blockly.Blocks.fn_updateshape(this);
    }
};
//=======================================================================
//define the content of the rgbstrip


Blockly.Blocks['rgbstrip'] = {
    init: function () {
        var currPinArray = Blockly.Blocks.getUnusedpins(this);
        var dropdown_types = [["Color Wipe", "color_wipe"], ["Rainbow", "rainbow"], ["Individual Colors", "individual_colors"]];
        //=============== define the icon of the rgbstrip output block

        this.appendDummyInput()
          .appendField(new Blockly.FieldImage("assets/images/icons/blue.png", 15, 15, { alt: "*", flipRtl: "FALSE" }))
          .appendField("RGB Strip");
        //============ define the default view of the rgbstrip output before customization

        var pinPanel = this.appendDummyInput('pinPanel')
          .appendField("Pin")
          .appendField(new Blockly.FieldDropdown(currPinArray), "Pin");

        var typePanel = this.appendDummyInput('typePanel')
          .appendField(" ")
          .appendField(new Blockly.FieldDropdown(dropdown_types), "color_choice");

        var numPanel = this.appendDummyInput('numPanel')
          .appendField(" Number of LED's")
          .appendField(new Blockly.FieldNumber(10, 1, 10), "NumberofLeds");

        var numPanelpro = this.appendDummyInput('numPanelpro')
          .appendField(" Number of LED's")
          .appendField(new Blockly.FieldNumber(4, 1, 4), "NumberofLedspro");

        var cColorPanel = this.appendDummyInput('cColorPanel')
          .appendField(" Color")
          .appendField(new Blockly.FieldColour("#FFFFFF"), "picker1");

        var delayPanel = this.appendDummyInput('delayPanel')
          .appendField(Blockly.Msg.flow_delay)
          .appendField(new Blockly.FieldNumber(100, 0, 1000), "Delay");

        var rDelayPanel = this.appendDummyInput('rDelayPanel')
          .appendField(Blockly.Msg.flow_delay)
          .appendField(new Blockly.FieldNumber(25, 0, 1000), "Rainbow_Delay");

        var iColorPanel = this.appendDummyInput('iColorPanel')
          .appendField(" Colors:")
          .appendField(new Blockly.FieldColour("#FFFFFF"), "picker2")
          .appendField(new Blockly.FieldColour("#FFFFFF"), "picker3")
          .appendField(new Blockly.FieldColour("#FFFFFF"), "picker4")
          .appendField(new Blockly.FieldColour("#FFFFFF"), "picker5")
          .appendField(new Blockly.FieldColour("#FFFFFF"), "picker6")
          .appendField(new Blockly.FieldColour("#FFFFFF"), "picker7")
          .appendField(new Blockly.FieldColour("#FFFFFF"), "picker8")
          .appendField(new Blockly.FieldColour("#FFFFFF"), "picker9")
          .appendField(new Blockly.FieldColour("#FFFFFF"), "picker10")
          .appendField(new Blockly.FieldColour("#FFFFFF"), "picker11");

        var BouncePanel = this.appendDummyInput('BouncePanel')
          .appendField(" ")
          .appendField(new Blockly.FieldDropdown([["FORWARD", "FORWARD"], ["BACKWARD", "BACKWARD"]]), "Bounce");

        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Code.multiColor.output);
        this.setTooltip("");
        this.setHelpUrl("");

        // pinPanel.setVisible(false);
        // typePanel.setVisible(false);
        numPanel.setVisible(false);
        // numPanelpro.setVisible(false);
        // cColorPanel.setVisible(false);
        // delayPanel.setVisible(false);
        rDelayPanel.setVisible(false);
        iColorPanel.setVisible(false);
        BouncePanel.setVisible(false);
        this.outputCount_ = 0;
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
                var pinPanel = this.inputList[1];
                var typePanel = this.inputList[2];
                var numPanel = this.inputList[3];
                var numPanelpro = this.inputList[4];
                var cColorPanel = this.inputList[5];
                var delayPanel = this.inputList[6];
                var rDelayPanel = this.inputList[7];
                var iColorPanel = this.inputList[8];
                var BouncePanel = this.inputList[9];

                var Pin_value = pinPanel.fieldRow[1].value_;
                var color_choice = typePanel.fieldRow[1];
                var NumberofLeds = numPanel.fieldRow[1];
                var NumberofLedspro = numPanelpro.fieldRow[1];

                var changes = 0;
                if (!pinPanel.visible_) {
                    pinPanel.setVisible(true);
                    typePanel.setVisible(true);

                    changes++;
                }

                color_choice.menuGenerator_ = [["Color Wipe", "color_wipe"], ["Rainbow", "rainbow"], ["Individual Colors", "individual_colors"]]; //, ["Gradient", "gradient"]];
                if (color_choice.value_ === "Bounce") {
                    color_choice.setValue("color_wipe");
                }

                if (Blockly.Blocks.ConnectedBoard == "FFC_ESP32" && Pin_value == '11' && !numPanelpro.visible_) {
                    numPanel.setVisible(false);
                    numPanelpro.setVisible(true);

                    changes++;
                }
                else if (!numPanel.visible_) {
                    numPanel.setVisible(true);
                    numPanelpro.setVisible(false);

                    changes++;
                }
                if (color_choice.value_ == "color_wipe" && !cColorPanel.visible_) {
                    cColorPanel.setVisible(true);
                    delayPanel.setVisible(true);
                    rDelayPanel.setVisible(false);
                    iColorPanel.setVisible(false);
                    BouncePanel.setVisible(false);
                    NumberofLeds.max_ = Infinity;

                    changes++;
                }
                else if (color_choice.value_ == "rainbow" && !rDelayPanel.visible_) {
                    cColorPanel.setVisible(false);
                    delayPanel.setVisible(false);
                    rDelayPanel.setVisible(true);
                    iColorPanel.setVisible(false);
                    BouncePanel.setVisible(false);
                    NumberofLeds.max_ = Infinity;

                    changes++;
                }
                else if (color_choice.value_ == "individual_colors") {
                    if (!iColorPanel.visible_) {
                        changes++;
                    }

                    cColorPanel.setVisible(false);
                    delayPanel.setVisible(false);
                    rDelayPanel.setVisible(false);
                    iColorPanel.setVisible(true);
                    BouncePanel.setVisible(false);
                    NumberofLeds.max_ = 10;

                    var number_led = parseInt(NumberofLeds.value_); //text
                    //window.alert(number_led);
                    if (Blockly.Blocks.ConnectedBoard == "FFC_ESP32") {  // && Pin_value == '11'
                        //   number_led = parseInt(NumberofLedspro.text_);
                       // window.alert("FFC_ESP32--Here");
                        number_led = parseInt(NumberofLedspro.value_);
                        //window.alert(number_led);
                    }
                    else {
                        if (number_led > 10) {
                            NumberofLeds.setValue(10);
                            number_led = 10;
                        }
                    }
                    //=================================update here 16-5-22======================
                    for (var i = 2; i <= 11; i++) {
                        var pickerLed = iColorPanel.fieldRow[i - 1];
                        number_led = parseInt(NumberofLeds.value_);
                        //window.alert(number_led);
                        if (i <= number_led + 1) {
                            if (!pickerLed.visible_) {
                                changes++;
                                pickerLed.setVisible(true);
                            }
                        }
                        else {
                            if (pickerLed.visible_) {
                                changes++;
                                pickerLed.setVisible(false);
                            }
                        }
                    }
                }
                else if (color_choice.value_ == "Bounce" && !BouncePanel.visible_) {
                    cColorPanel.setVisible(true);
                    delayPanel.setVisible(true);
                    rDelayPanel.setVisible(false);
                    iColorPanel.setVisible(false);
                    BouncePanel.setVisible(true);

                    changes++;

                }

                if (changes > 0) {
                    pinPanel.setAlign(true);
                }
            }
        }
    }
};
//=========================================================
//define the content of the servo_device

Blockly.Blocks['servo_device'] = {
    init: function () {
        var currPinArray = Blockly.Blocks.getUnusedpins(this);
        //=============== define the icon of the servo_device output block
        
        this.appendDummyInput()
          .appendField(new Blockly.FieldImage("assets/images/icons/blue.png", 15, 15, { alt: "*", flipRtl: "FALSE" }))
          .appendField("Servo");
        //============ define the default view of the servo_device output before customization
        
        var varAngle = this.appendValueInput("varAngle")
          .appendField("Pin")
          .appendField(new Blockly.FieldDropdown(currPinArray), "Pin")
          .appendField(" ")
          .setCheck("Number");

        this.setMutator(new Blockly.Mutator(["multi_stmt"]));

        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Code.multiColor.output);
        this.setTooltip("");
        this.setHelpUrl("");

        this.appendShadowBlock(varAngle, 90, 0, 0, Blockly.Block.shadowType.ANGLE);
        this.outputCount_ = 0;
    },
    onchange: function (ev) {
        Blockly.Blocks.fn_onchange(this, ev, Code.multiColor.output);
        if (this.collapsed_ && ev instanceof Blockly.Events.Create) {
            var varAngle = this.inputList[1];
            Blockly.Blocks.fn_varAlign([varAngle]);
        }
    },
    mutationToDom: function () {
        return Blockly.Blocks.fno_mutationToDom(this);
    },
    domToMutation: function (xmlElement) {
        Blockly.Blocks.fno_domToMutation(xmlElement, this);
    },
    decompose: function (a) {
        return Blockly.Blocks.fno_decompose(a, this);
    },
    compose: function (a) {
        Blockly.Blocks.fn_compose(a, this);
    },
    saveConnections: function (a) {
        Blockly.Blocks.fn_saveconnections(a, this);
    },
    updateShape_: function () {
        Blockly.Blocks.fn_updateshape(this);
    }
};
//=====================================================================
//define the content of the steppermotor

Blockly.Blocks['steppermotor'] = {
    init: function () {
        var currPinArray = Blockly.Blocks.getUnusedpins(this);
        //============= define the icon of the steppermotor output block
        
        this.appendDummyInput()
          .appendField(new Blockly.FieldImage("assets/images/icons/blue.png", 15, 15, { alt: "*", flipRtl: "FALSE" }))
          .appendField("Stepper Motor");
        //================ define the default view of the steppermotor output before customization
        
        var Panel1 = this.appendDummyInput('Panel1')
          .appendField("Step Pin")
          .appendField(new Blockly.FieldDropdown(currPinArray), "Pin")
          .appendField("Direction Pin ")
          .appendField(new Blockly.FieldDropdown(currPinArray), "DirectionPin")
          .appendField("Rotate")
          .appendField(new Blockly.FieldNumber(0, 0), "Rotate")
          .appendField(" Revolutions and")
          .appendField(new Blockly.FieldNumber(360, 0), "Revolutions")
          .appendField("degrees")
          .appendField(new Blockly.FieldDropdown([["clockwise", "1"], ["anticlockwise", "0"]]), "degrees")
          .appendField("in")
          .appendField(new Blockly.FieldNumber(60, 1, 300), "RPM")
          .appendField("RPM");

        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Code.multiColor.output);
        this.setTooltip("");
        this.setHelpUrl("");
    },
    onchange: function (ev) {
        Blockly.Blocks.fn_onchange(this, ev, Code.multiColor.output);
    }
};
//===========================================================================
//define the content of the customoutput

Blockly.Blocks['customoutput'] = {
    init: function () {
        var currPinArray = Blockly.Blocks.getUnusedpins(this);
        var dropdown_types = [["Digital", "Digital"], ["Analog", "Analog"]];
        //============= define the icon of the customoutput block
        
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("assets/images/icons/blue.png", 15, 15, { alt: "*", flipRtl: "FALSE" }))
            .appendField("Custom Output");
        //============= define the default view of the customoutput before customization
       
        var Panel1 = this.appendDummyInput('Panel1')
            .appendField("Name:")
            .appendField(new Blockly.FieldTextInput("CustomOutput"), "name")
            .appendField(new Blockly.FieldDropdown(dropdown_types), "Type");

        var PanelDigital = this.appendDummyInput('PanelDigital')
            .appendField(" Pin")
            .appendField(new Blockly.FieldDropdown(currPinArray), "Pin")
            .appendField(new Blockly.FieldDropdown([["Value", "Value"], ["Variable", "Variable"]]), "digital_type")
            .appendField(" ");

        var valueDigital = this.appendDummyInput('valueDigital')
            .appendField(new Blockly.FieldDropdown([["HIGH", "HIGH"], ["LOW", "LOW"]]), "digital_value");

        var varDigital = this.appendValueInput("varDigital")
            .setCheck("Number");

        var varAnalog = this.appendValueInput("varAnalog")
            .appendField("Pin")
            .appendField(new Blockly.FieldDropdown(Blockly.Blocks.OutputPinArray_AW), "PinAnalog")
            .appendField(" ")
            .setCheck("Number");

        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Code.multiColor.output);
        this.setTooltip("Custom Output");

        varDigital.setVisible(false);
        varAnalog.setVisible(false);
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
                var PanelDigital = this.inputList[2];
                var valueDigital = this.inputList[3];
                var varDigital = this.inputList[4];
                var varAnalog = this.inputList[5];

                var Type = Panel1.fieldRow[2];
                var PinAnalog = varAnalog.fieldRow[1];
                var digital_type = PanelDigital.fieldRow[2];

                var insideVarBlock, changes = 0;
                if (!Panel1.visible_) {
                    Panel1.setVisible(true);

                    changes++;
                }

                if (Blockly.Blocks.ConnectedBoard === "ESP324" && Blockly.isMobile) {
                    Type.menuGenerator_ = [["Digital", "Digital"]];
                    if (Type.value_ === "Analog") {
                        Type.setValue("Digital")
                    }
                }
                else {
                    Type.menuGenerator_ = [["Digital", "Digital"], ["Analog", "Analog"]];
                }

                PinAnalog.menuGenerator_ = Blockly.Blocks.OutputPinArray_AW;

                if (Type.value_ == "Digital") {
                    if (!PanelDigital.visible_) {
                        PanelDigital.setVisible(true);
                        varAnalog.setVisible(false);

                        insideVarBlock = varAnalog.connection && varAnalog.connection.targetBlock();
                        if (insideVarBlock != null) {
                            insideVarBlock.dispose();
                        }

                        changes++;
                    }

                    if (digital_type.value_ === "Value" && !valueDigital.visible_) {
                        valueDigital.setVisible(true);
                        varDigital.setVisible(false);

                        insideVarBlock = varDigital.connection && varDigital.connection.targetBlock();
                        if (insideVarBlock != null) {
                            insideVarBlock.dispose();
                        }

                        changes++;
                    }
                    else if (digital_type.value_ !== "Value" && !varDigital.visible_) {
                        valueDigital.setVisible(false);
                        varDigital.setVisible(true);

                        this.appendShadowBlock(varDigital, 0, 0, 255);

                        changes++;
                    }
                }
                else {
                    if (Blockly.Blocks.ConnectedBoard === "ESP324" && PinAnalog.value_ !== "8") {
                        PinAnalog.setValue("8");
                    }
                    else if (PinAnalog.value_ === "8") {
                        PinAnalog.setValue(Blockly.Blocks.OutputPinArray_AW[0][1]);
                    }
                    else if (Blockly.Blocks.ConnectedBoard === "FFC_ESP32" && PinAnalog.value_ > 5) {
                        PinAnalog.setValue(Blockly.Blocks.OutputPinArray_AW[0][1]);
                    }
                    else if (Blockly.Blocks.ConnectedBoard === "ESP328" && PinAnalog.value_ < 2) {
                        PinAnalog.setValue(Blockly.Blocks.OutputPinArray_AW[0][1]);
                    }

                    if (!varAnalog.visible_) {
                        PanelDigital.setVisible(false);
                        valueDigital.setVisible(false);
                        varDigital.setVisible(false);
                        varAnalog.setVisible(true);

                        insideVarBlock = varDigital.connection && varDigital.connection.targetBlock();
                        if (insideVarBlock != null) {
                            insideVarBlock.dispose();
                        }

                        this.appendShadowBlock(varAnalog, 0, 0, 255);

                        changes++
                    }
                }

                if (changes > 0) {
                    Panel1.setAlign(true);
                }

                Blockly.Blocks.fn_varAlign([varDigital, varAnalog]);
            }
            else if (ev instanceof Blockly.Events.Create) {
                var varDigital = this.inputList[4];
                var varAnalog = this.inputList[5];

                Blockly.Blocks.fn_varAlign([varDigital, varAnalog]);
            }
        }
    }
};
// Define blocks for Output menu - ends

 