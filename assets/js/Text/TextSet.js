//=========================================================
//The definition of the Text set and its blocks. it also defines the components of each text block (the input, append, length, etc..), how the component appear to the user
//'text_input'
//'assign_text'
//'append_text'
//'substring_text'
//'length_of'
//'text_indexOfItem'
//'text_to_variable'
//'text_variable'
//'variable_to_text'
//=====================================================================
// Define blocks for Text menu - begins
//===================================== Define the components of text_input block   ===============================
Blockly.Blocks['text_input'] = {
    init: function () {
        this.appendDummyInput('Panel1')
            .appendField('"', (!0))
            .appendField(new Blockly.FieldTextInput(""), "TEXT")
            .appendField('"', (!1));

        var a = this;
        this.setOutput(true, "String");
        this.setInputsInline(true);
        this.setPreviousStatement(false, null);
        this.setNextStatement(false, null);
        this.setColour(Code.multiColor.text);
        this.setHelpUrl(Blockly.Msg.TEXT_TEXT_HELPURL);
        this.setTooltip(function () {
            var b = a.getParent();
            return b && b.getInputsInline() && b.tooltip || Blockly.Msg.TEXT_TEXT_TOOLTIP
        });
    },
    onchange: function (ev) {
        Blockly.Blocks.fn_onchange(this, ev, Code.multiColor.text, true, true);
    }
};
//===================================== Define the components of assign_text block   ===============================
Blockly.Blocks['assign_text'] = {
    init: function () {
        var TEXT = this.appendValueInput("TEXT")
            .setCheck("String")
            .appendField("Set")
            .appendField(new Blockly.FieldVariable("text"), "VAR")
            .appendField("To");

        this.setPreviousStatement(!0);
        this.setNextStatement(!0);
        this.setHelpUrl(Blockly.Msg.TEXT_APPEND_HELPURL);
        this.setColour(Code.multiColor.text);
        var a = this;
        this.setTooltip(function () {
            return Blockly.Msg.TEXT_APPEND_TOOLTIP.replace("%1", a.getFieldValue("VAR"))
        });

        this.appendShadowBlock(TEXT, "", 0, 0, Blockly.Block.shadowType.TEXT);
    },
    onchange: function (ev) {
        Blockly.Blocks.fn_onchange(this, ev, Code.multiColor.text, true, true);
    }
};
//===================================== Define the components of append_text block   ===============================
Blockly.Blocks['append_text'] = {
    init: function () {
        var TEXT = this.appendValueInput("TEXT")
            .setCheck("String")
            .appendField("Append")
            .appendField(new Blockly.FieldVariable("text"), "VAR")
            .appendField("With");

        this.setPreviousStatement(!0);
        this.setNextStatement(!0);
        this.setHelpUrl(Blockly.Msg.TEXT_APPEND_HELPURL);
        this.setColour(Code.multiColor.text);
        var a = this;
        this.setTooltip(function () {
            return Blockly.Msg.TEXT_APPEND_TOOLTIP.replace("%1", a.getFieldValue("VAR"))
        });

        this.appendShadowBlock(TEXT, "", 0, 0, Blockly.Block.shadowType.TEXT);
    },
    onchange: function (ev) {
        Blockly.Blocks.fn_onchange(this, ev, Code.multiColor.text, true, true);
    }
};
//===================================== Define the components of substring_text block   ===============================
Blockly.Blocks['substring_text'] = {
    init: function () {
        this.appendDummyInput("TEXT")
            .appendField("in text")
            .appendField(new Blockly.FieldVariable("text"), "VAR")
            .appendField("get substring from");

        var Fromblock = this.appendValueInput("Fromblock")
            .setCheck("Number");

        this.appendDummyInput("To")
            .appendField("to");

        var Toblock = this.appendValueInput("Toblock")
            .setCheck("Number");

        this.setInputsInline(true);
        this.setPreviousStatement(false, null);
        this.setNextStatement(false, null);
        this.setOutput(true, "String");
        this.setHelpUrl(Blockly.Msg.TEXT_APPEND_HELPURL);
        this.setColour(Code.multiColor.text);
        var a = this;
        this.setTooltip(function () {
            return Blockly.Msg.TEXT_APPEND_TOOLTIP.replace("%1", a.getFieldValue("VAR"))
        });

        this.appendShadowBlock(Fromblock);
        this.appendShadowBlock(Toblock);
    },
    onchange: function (ev) {
        Blockly.Blocks.fn_onchange(this, ev, Code.multiColor.text, true, true);
    }
};
//===================================== Define the components of length_of block   ===============================
Blockly.Blocks['length_of'] = {
    init: function () {
        this.appendDummyInput("panel1")
            .appendField("length of")
            .appendField(new Blockly.FieldVariable("text"), "VAR");

        this.setInputsInline(true);
        this.setOutput(true, "Number");
        this.setHelpUrl(Blockly.Msg.TEXT_APPEND_HELPURL);
        this.setColour(Code.multiColor.text);
        var a = this;
        this.setTooltip(function () {
            return Blockly.Msg.TEXT_APPEND_TOOLTIP.replace("%1", a.getFieldValue("VAR"))
        })
    },
    onchange: function (ev) {
        Blockly.Blocks.fn_onchange(this, ev, Code.multiColor.text, true, true);
    }
};
//===================================== Define the components of text_indexOfItem block   ===============================
Blockly.Blocks['text_indexOfItem'] = {
    init: function () {
        this.appendDummyInput("VALUE")
            .appendField('index of')
            .appendField(new Blockly.FieldTextInput(""), "TEXT")
            .appendField("in")
            .appendField(new Blockly.FieldVariable("text"), "VAR");

        this.setInputsInline(!0);
        this.setOutput(true, "Number");
        this.setColour(Code.multiColor.text);
        this.setHelpUrl(Blockly.Msg.TEXT_INDEXOF_HELPURL);
        var b = this;
        this.setTooltip(function () {
            return Blockly.Msg.TEXT_INDEXOF_TOOLTIP.replace("%1", b.workspace.options.oneBasedIndex ? "0" : "-1")
        })
    },
    onchange: function (ev) {
        Blockly.Blocks.fn_onchange(this, ev, Code.multiColor.text, true, true);
    }
};
//===================================== Define the components of text_to_variable block   ===============================
Blockly.Blocks['text_to_variable'] = {
    init: function () {
        this.appendDummyInput("VALUE")
            .appendField('value of')
            .appendField(new Blockly.FieldVariable("text"), "VAR");

        this.setInputsInline(!0);
        this.setColour(Code.multiColor.text);
        this.setOutput(true, "Number");
    },
    onchange: function (ev) {
        Blockly.Blocks.fn_onchange(this, ev, Code.multiColor.text, true, true);
    }
};
//===================================== Define the components of variable_to_text block   ===============================
Blockly.Blocks['variable_to_text'] = {
    init: function () {
        this.appendDummyInput("VALUE")
            .appendField('text of')
            .appendField(new Blockly.FieldVariable("var0"), "varName");

        this.setInputsInline(!0);
        this.setColour(Code.multiColor.text);
        this.setOutput(true, "String");
    },
    onchange: function (ev) {
        Blockly.Blocks.fn_onchange(this, ev, Code.multiColor.text, true, true);
    }
};
//===================================== Define the components of text_variable block   ===============================
Blockly.Blocks['text_variable'] = {
    init: function () {
        this.appendDummyInput("VALUE")
            .appendField(new Blockly.FieldVariable("text"), "VAR");

        this.setInputsInline(!0);
        this.setColour(Code.multiColor.text);
        this.setOutput(true, "String");
    },
    onchange: function (ev) {
        Blockly.Blocks.fn_onchange(this, ev, Code.multiColor.text, true, true);
    }
};
// Define blocks for Text menu - ends
