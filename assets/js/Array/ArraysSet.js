//=========================================================
//The definition of the array set and its blocks. it also defines the components of each block (the panel, options, values, etc..)
    //'array_node'
    //'access_elements'
// Define blocks for Arrays menu - begins
//===================================== Define the components of array_node block   ===============================
Blockly.Blocks['array_node'] = {
    init: function () {
        var thisBlock = this;

        this.appendDummyInput()
            .appendField(Blockly.Msg.fill_array);

        var Panel1 = this.appendDummyInput('Panel1')
            .appendField(new Blockly.FieldArray("array_item", function (newOp) {
                thisBlock.getDropDownValues(newOp);
            }), "varitem")
            .appendField("'s Elements ")
            .appendField(new Blockly.FieldDropdown([["0", "0"], ["Variable", "Variable"]]), "Panel2DropDown");

        var varValue1 = this.appendValueInput("varValue1")
            .setCheck("Number");

        var varValue2 = this.appendValueInput("varValue2")
            .appendField("With")
            .setCheck("Number");

        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Code.multiColor.array);
        this.setTooltip(Blockly.Msg.fill_array);

        if (!this.isInFlyout) {
            this.appendShadowBlock(varValue2);
            //appendShadowBlock
        }
        else {
            Panel1.setVisible(false);
            varValue2.setVisible(false);
        }

        varValue1.setVisible(false);
    },
    onchange: function (ev) {
        if (!this.isInFlyout) {
            if (this.colour_ !== Code.multiColor.array) {
                this.setColour(Code.multiColor.array);
            }
            Blockly.Blocks.CheckStartnode(this);
            Blockly.Blocks.hidemutation(ev);
            if (!this.collapsed_) {
                var Panel1 = this.inputList[1];
                var varValue1 = this.inputList[2];
                var varValue2 = this.inputList[3];

                var varitem_value = Panel1.fieldRow[0].value_;
                var Panel2DropDown_value = Panel1.fieldRow[2].value_;

                this.getDropDownValues(varitem_value);

                var insideVarBlock, changes = 0;
                if (!Panel1.visible_) {
                    Panel1.setVisible(true);
                    varValue2.setVisible(true);

                    changes++;
                }

                if (Panel2DropDown_value == 'Variable' && !varValue1.visible_) {
                    varValue1.setVisible(true);

                    this.appendShadowBlock(varValue1);

                    changes++;
                }
                else if (Panel2DropDown_value !== 'Variable' && varValue1.visible_) {
                    varValue1.setVisible(false);

                    insideVarBlock = varValue1.connection && varValue1.connection.targetBlock();
                    if (insideVarBlock != null) {
                        insideVarBlock.dispose();
                    }

                    changes++;
                }

                if (changes > 0) {
                    Panel1.setAlign(true);
                }

                Blockly.Blocks.fn_varAlign([varValue1]);
            }
            else if (ev instanceof Blockly.Events.Create) {
                var varValue1 = this.inputList[2];
                var varValue2 = this.inputList[3];

                Blockly.Blocks.fn_varAlign([varValue1, varValue2]);
            }
        }
    },
    getDropDownValues: function (arrayname) {
        var arrayindex = Blockly.Workspace.prototype.arrayList.indexOf(arrayname);
        var arraySize = Blockly.Workspace.prototype.arraydrpwnvalues[arrayindex];
        var dummyData = [];
        var Panel2DropDown = this.inputList[1].fieldRow[2];
        // console.log(arrayname);
        // console.log(arrayindex);
        // console.log(arraySize);
        // console.log(dummyData);
        // console.log(Panel2DropDown);

        if (arraySize == undefined) {
            Panel2DropDown.menuGenerator_ = [["0", "0"], ["Variable", "Variable"]];
        }
        else {
            var arrayitem = ['Variable', 'Variable'];
            var arrayDrpdwn = [(arrayitem)];
            for (var i = 0; i < arraySize; i++) {
                var t = i.toString();
                dummyData[i] = [t, t];
            }
            // console.log(arrayDrpdwn);
            // console.log(dummyData);
            Panel2DropDown.menuGenerator_ = dummyData.concat(arrayDrpdwn);
            // console.log(Panel2DropDown.menuGenerator_);
        }
    }
};

Blockly.Blocks['access_elements'] = {
    init: function () {
        var thisBlock = this;

        this.appendDummyInput()
            .appendField(Blockly.Msg.array);

        var Panel1 = this.appendDummyInput('Panel1')
            .appendField(new Blockly.FieldArray("array_item", function (newOp) {
                thisBlock.getDropDownValues(newOp);
            }), "varitem")
            .appendField(" Element ")
            .appendField(new Blockly.FieldDropdown([["0", "0"], ["Variable", "Variable"]]), "dropdwn");

        var varValue = this.appendValueInput("varValue")
            .setCheck("Number");

        this.setInputsInline(true);
        this.setPreviousStatement(false, null);
        this.setNextStatement(false, null);
        this.setOutput(true, "Number");
        this.setColour(Code.multiColor.array);
        this.setTooltip(Blockly.Msg.array);

        Panel1.setVisible(false);
        varValue.setVisible(false);
    },
    onchange: function (ev) {
        if (!this.isInFlyout) {
            if (this.colour_ !== Code.multiColor.array) {
                this.setColour(Code.multiColor.array);
            }
            Blockly.Blocks.CheckStartnode(this);
            Blockly.Blocks.hidemutation(ev);
            if (!this.collapsed_) {
                var Panel1 = this.inputList[1];
                var varValue = this.inputList[2];

                var dropdwn_value = Panel1.fieldRow[2].value_;

                var changes = 0;
                if (!Panel1.visible_) {
                    Panel1.setVisible(true);

                    changes++;
                }

                if (dropdwn_value == 'Variable' && !varValue.visible_) {
                    varValue.setVisible(true);

                    this.appendShadowBlock(varValue);

                    changes++;
                }
                else if (dropdwn_value !== 'Variable' && varValue.visible_) {
                    varValue.setVisible(false);
                    var insideVarBlock = varValue.connection && varValue.connection.targetBlock();
                    if (insideVarBlock != null) {
                        insideVarBlock.dispose();
                    }

                    changes++;
                }

                if (changes > 0) {
                    Panel1.setAlign(true);
                }

                Blockly.Blocks.fn_varAlign([varValue]);
            }
            else if (ev instanceof Blockly.Events.Create) {
                var varValue = this.inputList[2];

                Blockly.Blocks.fn_varAlign([varValue]);
            }
        }
    },
    getDropDownValues: function (arrayname) {
        var arrayindex = Code.workspace.arrayList.indexOf(arrayname);
        var arraySize = Code.workspace.arraydrpwnvalues[arrayindex];
        var dummyData = [];
        var dropdwn = this.inputList[1].fieldRow[2];

        if (arraySize == undefined) {
            dropdwn.menuGenerator_ = [["0", "0"], ["Variable", "Variable"]];
        }
        else {
            var arrayitem = ['Variable', 'Variable'];
            var arrayDrpdwn = [(arrayitem)];
            for (var i = 0; i < arraySize; i++) {
                var t = i.toString();
                dummyData[i] = [t, t];
            }
            dropdwn.menuGenerator_ = dummyData.concat(arrayDrpdwn);
        }
    }
};
// Define blocks for Arrays menu - ends