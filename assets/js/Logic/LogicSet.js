//=========================================================
//The definition of the logic set and its blocks. it also defines the components of each block (the IF, ELSE, ELSE IF, etc..)
//'controls_if'
//'logic_compare'
//'logic_operation'
//'logic_negate'
//'logic_boolean'
//'logic_null'
//'logic_ternary'
//=====================================================================
// Define blocks for Logic menu - begins
//===================================== Define the components of controls_if block, which condition is applied by the user   ===============================
Blockly.Blocks.controls_if = {
    init: function () {
        var IF0 = this.appendValueInput("IF0")
            .setCheck("Boolean")
            .appendField(Blockly.Msg.CONTROLS_IF_MSG_IF);

        this.appendStatementInput("DO0")
            .appendField(Blockly.Msg.CONTROLS_IF_MSG_THEN);

        this.setMutator(new Blockly.Mutator(["controls_if_elseif", "controls_if_else"]));

        this.setPreviousStatement(!0);
        this.setNextStatement(!0);
        this.setColour(Code.multiColor.logic);
        var a = this;
        this.setTooltip(function () {
            if (a.elseifCount_ || a.elseCount_) {
                if (!a.elseifCount_ &&
                    a.elseCount_) return Blockly.Msg.CONTROLS_IF_TOOLTIP_2;
                if (a.elseifCount_ && !a.elseCount_) return Blockly.Msg.CONTROLS_IF_TOOLTIP_3;
                if (a.elseifCount_ && a.elseCount_) return Blockly.Msg.CONTROLS_IF_TOOLTIP_4
            } else return Blockly.Msg.CONTROLS_IF_TOOLTIP_1;
            return ""
        });

        this.elseCount_ = this.elseifCount_ = this.andCount_ = this.orCount_ = 0;

        this.appendShadowBlock(IF0, "", 0, 0, Blockly.Block.shadowType.BOOL);
    },
    onchange: function (ev) {
        Blockly.Blocks.fn_onchange(this, ev, Code.multiColor.logic, true, true);
    },
    mutationToDom: function () {
        return Blockly.Blocks.fn_mutationToDom(this);
    },
    domToMutation: function (xmlElement) {
        Blockly.Blocks.fn_domToMutation(xmlElement, this);
    },
    decompose: function (a) {
        var b = a.newBlock("controls_if_if");
        b.initSvg();

        for (var c = b.nextConnection, e = 1; e <= this.elseifCount_; e++) {
            var d = a.newBlock("controls_if_elseif");
            d.initSvg();
            c.connect(d.previousConnection);
            c = d.nextConnection;
        }
        this.elseCount_ && (a = a.newBlock("controls_if_else"), a.initSvg(), c.connect(a.previousConnection));
        return b;
    },
    compose: function (a) {
        var b = a.nextConnection.targetBlock();
        this.elseCount_ = this.elseifCount_ = 0;
        a = [null];
        for (var c = [null], e = null; b; ) {
            switch (b.type) {
                case "controls_if_elseif":
                    this.elseifCount_++;
                    a.push(b.valueConnection_);
                    c.push(b.statementConnection_);
                    break;
                case "controls_if_else":
                    this.elseCount_++;
                    e = b.statementConnection_;
                    break;
                default:
                    throw "Unknown block type.";
            }
            b = b.nextConnection && b.nextConnection.targetBlock()
        }
        this.updateShape_();
        for (b = 1; b <= this.elseifCount_; b++) Blockly.Mutator.reconnect(a[b], this,
            "IF" + b), Blockly.Mutator.reconnect(c[b], this, "DO" + b);
        Blockly.Mutator.reconnect(e, this, "ELSE")
    },
    saveConnections: function (a) {
        a = a.nextConnection.targetBlock();
        for (var b = 1; a; ) {
            switch (a.type) {
                case "controls_if_elseif":
                    var c = this.getInput("IF" + b),
                        e = this.getInput("DO" + b);
                    a.valueConnection_ = c && c.connection.targetConnection;
                    a.statementConnection_ = e && e.connection.targetConnection;
                    b++;
                    break;
                case "controls_if_else":
                    e = this.getInput("ELSE");
                    a.statementConnection_ = e && e.connection.targetConnection;
                    break;
                default:
                    throw "Unknown block type.";
            }
            a = a.nextConnection && a.nextConnection.targetBlock()
        }
    },
    updateShape_: function () {
        this.getInput("ELSE") && this.removeInput("ELSE");
        for (var a = 1; this.getInput("IF" + a); ) {
            this.removeInput("IF" + a), this.removeInput("DO" + a), a++;
        }
        for (a = 1; a <= this.elseifCount_; a++) {
            var IfElseif = this.appendValueInput("IF" + a)
                .setCheck("Boolean")
                .appendField(Blockly.Msg.CONTROLS_IF_MSG_ELSEIF);

            this.appendStatementInput("DO" + a)
                .appendField(Blockly.Msg.CONTROLS_IF_MSG_THEN);

            this.appendShadowBlock(IfElseif, "", 0, 0, Blockly.Block.shadowType.BOOL);
        }
        this.elseCount_ && this.appendStatementInput("ELSE").appendField(Blockly.Msg.CONTROLS_IF_MSG_ELSE)
    }
};
//===================================== Define the components of logic_compare block, equal, not equal, less than greater than, etc   ===============================
Blockly.Blocks.logic_compare = {
    init: function () {
        var a = [
                ["=", "EQ"],
                ["\u2260", "NEQ"],
                ["\u200f<\u200f", "LT"],
                ["\u200f\u2264\u200f", "LTE"],
                ["\u200f>\u200f", "GT"],
                ["\u200f\u2265\u200f", "GTE"]
            ],
            b = [
                ["=", "EQ"],
                ["\u2260", "NEQ"],
                ["<", "LT"],
                ["\u2264", "LTE"],
                [">", "GT"],
                ["\u2265", "GTE"]
            ],
            a = this.RTL ? a : b;

        var A = this.appendValueInput("A");

        var B = this.appendValueInput("B")
            .appendField(new Blockly.FieldDropdown(a), "OP");

        this.setHelpUrl(Blockly.Msg.LOGIC_COMPARE_HELPURL);
        this.setColour(Code.multiColor.logic);
        this.setOutput(true, "Boolean");
        this.setInputsInline(!0);
        var c = this;
        this.setTooltip(function () {
            var a = c.getFieldValue("OP");
            return {
                EQ: Blockly.Msg.LOGIC_COMPARE_TOOLTIP_EQ,
                NEQ: Blockly.Msg.LOGIC_COMPARE_TOOLTIP_NEQ,
                LT: Blockly.Msg.LOGIC_COMPARE_TOOLTIP_LT,
                LTE: Blockly.Msg.LOGIC_COMPARE_TOOLTIP_LTE,
                GT: Blockly.Msg.LOGIC_COMPARE_TOOLTIP_GT,
                GTE: Blockly.Msg.LOGIC_COMPARE_TOOLTIP_GTE
            }[a]
        });

        this.appendShadowBlock(A);
        this.appendShadowBlock(B);
    },
    onchange: function (ev) {
        Blockly.Blocks.fn_onchange(this, ev, Code.multiColor.logic, true, true);
    }
};
//===================================== Define the components of logic_operation block, OR, AND operations   ===============================
Blockly.Blocks.logic_operation = {
    init: function () {
        var a = [
            [Blockly.Msg.LOGIC_OPERATION_AND, "AND"],
            [Blockly.Msg.LOGIC_OPERATION_OR, "OR"]
        ];

        var A = this.appendValueInput("A")
            .setCheck("Boolean");

        var B = this.appendValueInput("B")
            .setCheck("Boolean")
            .appendField(new Blockly.FieldDropdown(a), "OP");

        this.setInputsInline(!0);
        this.setHelpUrl(Blockly.Msg.LOGIC_OPERATION_HELPURL);
        this.setColour(Code.multiColor.logic);
        this.setOutput(true, "Boolean");

        var b = this;
        this.setTooltip(function () {
            var a = b.getFieldValue("OP");
            return {
                AND: Blockly.Msg.LOGIC_OPERATION_TOOLTIP_AND,
                OR: Blockly.Msg.LOGIC_OPERATION_TOOLTIP_OR
            }[a]
        })

        this.appendShadowBlock(A, "", 0, 0, Blockly.Block.shadowType.BOOL);
        this.appendShadowBlock(B, "", 0, 0, Blockly.Block.shadowType.BOOL);
    },
    onchange: function (ev) {
        Blockly.Blocks.fn_onchange(this, ev, Code.multiColor.logic, true, true);
    }
};
//===================================== Define the components of logic_negate block, in case of gate negation  ===============================
Blockly.Blocks.logic_negate = {
    init: function () {
        this.jsonInit({
            message0: Blockly.Msg.LOGIC_NEGATE_TITLE,
            args0: [{
                type: "input_value",
                name: "BOOL",
                check: "Boolean"
            }],
            output: "Boolean",
            colour: Code.multiColor.logic,
            tooltip: Blockly.Msg.LOGIC_NEGATE_TOOLTIP,
            helpUrl: Blockly.Msg.LOGIC_NEGATE_HELPURL
        })
    },
    onchange: function (ev) {
        Blockly.Blocks.fn_onchange(this, ev, Code.multiColor.logic, true, true);
    }
};
//===================================== Define the components of logic_boolean block, in case of true or false value  ===============================
Blockly.Blocks.logic_boolean = {
    init: function () {
        this.appendDummyInput("Panel1")
            .appendField(new Blockly.FieldDropdown([[Blockly.Msg.LOGIC_BOOLEAN_TRUE, "TRUE"], [Blockly.Msg.LOGIC_BOOLEAN_FALSE, "FALSE"]]), "BOOL");

        this.setInputsInline(true);
        this.setOutput(true, "Boolean");
        this.setColour(Code.multiColor.logic);
        this.setTooltip(Blockly.Msg.LOGIC_BOOLEAN_TOOLTIP);
        this.setHelpUrl(Blockly.Msg.LOGIC_BOOLEAN_HELPURL);
    },
    onchange: function (ev) {
        Blockly.Blocks.fn_onchange(this, ev, Code.multiColor.logic, true, true);
    }
};
//===================================== Define the components of logic_null block, in case of null value   ===============================
Blockly.Blocks.logic_null = {
    init: function () {
        this.appendDummyInput("Panel1")
            .appendField(Blockly.Msg.LOGIC_NULL);

        this.setInputsInline(true);
        this.setOutput(true, null);
        this.setColour(Code.multiColor.logic);
        this.setTooltip(Blockly.Msg.LOGIC_NULL_TOOLTIP);
        this.setHelpUrl(Blockly.Msg.LOGIC_NULL_HELPURL);

    },
    onchange: function (ev) {
        Blockly.Blocks.fn_onchange(this, ev, Code.multiColor.logic, true, true);
    }
};
//===================================== Define the components of logic_ternary block, IF, THEN and ELSE   ===============================
Blockly.Blocks.logic_ternary = {
    init: function () {
        var IF = this.appendValueInput("IF")
            .setCheck("Boolean")
            .appendField(Blockly.Msg.LOGIC_TERNARY_CONDITION);

        var THEN = this.appendValueInput("THEN")
            .appendField(Blockly.Msg.LOGIC_TERNARY_IF_TRUE);

        var ELSE = this.appendValueInput("ELSE")
            .appendField(Blockly.Msg.LOGIC_TERNARY_IF_FALSE);

        this.setHelpUrl(Blockly.Msg.LOGIC_TERNARY_HELPURL);
        this.setColour(Code.multiColor.logic);
        this.setOutput(true, null);
        this.setTooltip(Blockly.Msg.LOGIC_TERNARY_TOOLTIP);
        this.prevParentConnection_ = null;
    },
    onchange: function (ev) {
        Blockly.Blocks.fn_onchange(this, ev, Code.multiColor.logic, true, true);
    }
};
// Define blocks for Logic menu - ends