  //=============================================================
// define the common onChange functions of the blocks
  //==========================================================
// Common onChange Functions 
//=================================== 
Blockly.Blocks.fn_onchange_var_incdec = function (block, event) {
    if (!block.isInFlyout) {
        if (block.colour_ !== Code.multiColor.variable) {
            block.setColour(Code.multiColor.variable);
        }
        Blockly.Blocks.CheckStartnode(block);
        Blockly.Blocks.hidemutation(event);
        if (!block.collapsed_) {
            var varValue = block.inputList[1];

            if (!varValue.visible_) {
                varValue.setVisible(true);

                varValue.setAlign(true);
            }
        }
        else if (event instanceof Blockly.Events.Create) {
            var varValue = block.inputList[1];

            Blockly.Blocks.fn_varAlign([varValue]);
        }
    }
};
//========================== onchange functions of advance input and its menu generator ==========================
Blockly.Blocks.fn_onchange_adv_input = function (block, event) {
    if (!block.isInFlyout) {
        if (block.colour_ !== Code.multiColor.advanced) {
            block.setColour(Code.multiColor.advanced);
        }
        Blockly.Blocks.CheckStartnode(block);
        Blockly.Blocks.hidemutation(event);
        if (!block.collapsed_) {
            var Pin = block.inputList[0].fieldRow[1];

            if (Blockly.Blocks.ConnectedBoard === "ESP324") {
                Pin.menuGenerator_ = [["A0", "A0"], ["A1", "A1"], ["A2", "A2"], ["A3", "A3"]];
                if (Pin.value_.replace("A", "") > 3) {
                    Pin.setValue("A3");
                }
            }
            else {
                Pin.menuGenerator_ = [["A0", "A0"], ["A1", "A1"], ["A2", "A2"], ["A3", "A3"], ["A4", "A4"], ["A5", "A5"], ["A6", "A6"], ["A7", "A7"]];
            }
        }
    }
};
//===================== onchange function of bluetooth block ================================
Blockly.Blocks.fn_onchange_adv_bluetooth = function (block, event) {
    if (!block.isInFlyout) {
        if (block.colour_ !== Code.multiColor.bluetooth) {
            block.setColour(Code.multiColor.bluetooth);
        }
        Blockly.Blocks.CheckStartnode(block);
        Blockly.Blocks.hidemutation(event);
        if (!block.collapsed_) {
            var Panel = block.inputList[0];
            var Panel1 = block.inputList[1];

            if (!Panel1.visible_) {
                Panel.setVisible(false);
                Panel1.setVisible(true);

                Panel1.setAlign(true);
            }
        }
    }
};
