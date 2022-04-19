
//============================================================
//Define the content of each block in input set
 //'bluetoothrx'
    //'button'
    //'remote'
    //'IR'
    //'lightsensor'
    //'resistor'
    //'serialrx'
    //'temperature'
    //'touch_Pade'
    //'ultrasonic'
    //'custominput'
    //===========================================================================
// Define blocks for Input menu
Blockly.Blocks['esp32start'] = {
    init: function () {
      var priorityList = [["Normal", "4"], ["Above Normal", "3"], ["Below Normal", "5"], ["Critical", "1"], ["High", "2"], ["Low", "6"]];
  
      this.appendDummyInput('main')
          .appendField(new Blockly.FieldImage("assets/images/blocks/play.png", 80, 20));
  
      var Panel1 = this.appendDummyInput('Panel1')
          .appendField(Blockly.Msg.multitask, "blockname")
          .appendField("Name")
          .appendField(new Blockly.FieldTextInput("Default"), "taskname")
          .appendField("Priority")
          .appendField(new Blockly.FieldDropdown(priorityList), "priority");
  
      // this.appendStatementInput("OutputStmt")
      //     .setCheck(null);
  
      this.setInputsInline(true);
      this.setMovable(true);
      this.setDeletable(false);
      this.setColour("#f00");
      this.setTooltip('ESP32 Start');
      Panel1.setVisible(false);
  
        this.setNextStatement(true);
        this.setOutput(false);
    },
    onchange: function (ev) {
        if (this.colour_ !== Code.multiColor.input) {
            this.setColour("#f00");
        }
        var main = this.inputList[0];
        var Panel1 = this.inputList[1];
        if (Blockly.Blocks.isMultitask) {
            if (!Panel1.visible_) {
                main.setVisible(false);
                Panel1.setVisible(true);
  
                Panel1.setAlign(true);
                this.setMovable(true);
            }
        }
        else if (!main.visible_) {
            main.setVisible(true);
            Panel1.setVisible(false);
  
            Panel1.setAlign(true);
            this.setMovable(false);
        }
    }
  };
  //===============================================================
  //define the content of the bluetoothrx
  // Define blocks for Input menu - begins
  Blockly.Blocks['bluetoothrx'] = {
    init: function() {
      var currPinArray = Blockly.Blocks.getUnusedpins(this);
      // define the icon of the bluetoothrx input block
      this.appendDummyInput()
          .appendField(new Blockly.FieldImage("assets/images/icons/red.png", 15, 15, { alt: "*", flipRtl: "FALSE" }))
          .appendField("Bluetooth Rx");
  // define the default view of the bluetoothrx input at before customization
      var Panel1 = this.appendDummyInput('Panel1')
          .appendField("Pin")
          .appendField(new Blockly.FieldDropdown(currPinArray), "Pin")
          .appendField(new Blockly.FieldDropdown([["Character", "Character"], ["Text", "Text"]]), "datatype")
          .appendField(new Blockly.FieldTextInput("A"), "txtchar");
  
      var OutputStmt = this.appendStatementInput("OutputStmt")
          .setCheck(null);
  // define the mutators of the bluetoothrx input block
      this.setMutator(new Blockly.Mutator(["lightelseif", "controls_if_else"]));
  
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(Code.multiColor.input);
   this.setTooltip("");
   this.setHelpUrl("");
    },
    onchange: function (ev) {
      Blockly.Blocks.fn_onchange(this, ev, Code.multiColor.input);
    },
    mutationToDom: function () {
        return Blockly.Blocks.fn_mutationToDom(this);
    },
    domToMutation: function (xmlElement) {
        Blockly.Blocks.fn_domToMutation(xmlElement, this);
    },
    decompose: function (a) {
        return Blockly.Blocks.fn_decompose(a, this);
    },
    compose: function (a) {
        Blockly.Blocks.fn_compose(a, this);
    },
    saveConnections: function (a) {
      console.log('save connections');
      console.log(a);
  
        Blockly.Blocks.fn_saveconnections(a, this);
    },
    updateShape_: function () {
        Blockly.Blocks.fn_updateshape(this);
    },
  };
  //=================================================================================
  //define the content of the button

  Blockly.Blocks['button'] = {
  
    init: function() {
    //window.alert("button");
      var currPinArray = Blockly.Blocks.getUnusedpins(this);
  
      this.appendDummyInput()
      //============================ define the icon of the button input block
          .appendField(new Blockly.FieldImage("assets/images/icons/red.png", 15, 15, { alt: "*", flipRtl: "FALSE" }))
          .appendField("Button");
   //================================= define the default view of the button input at before customization
      var Panel1 = this.appendDummyInput('Panel1')
          .appendField("Pin")
          .appendField(new Blockly.FieldDropdown(currPinArray), "Pin")
          .appendField(new Blockly.FieldDropdown([["PRESSED", "PRESSED"], ["RELEASED", "RELEASED"]]), "state");
  
      var OutputStmt = this.appendStatementInput("OutputStmt")
          .setCheck(null);
//================================ define the mutators of the button input block
      this.setMutator(new Blockly.Mutator(["andblock", "orblock", "lightelseif", "controls_if_else"]));
  //window.alert("button");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(Code.multiColor.input);
   this.setTooltip("");
   this.setHelpUrl("");
    },
    onchange: function (ev) {
      Blockly.Blocks.fn_onchange(this, ev, Code.multiColor.input);
    },
    mutationToDom: function () {
      return Blockly.Blocks.fn_mutationToDom(this);
    },
      domToMutation: function (xmlElement) {
          Blockly.Blocks.fn_domToMutation(xmlElement, this);
      },
      decompose: function (a) {
          return Blockly.Blocks.fn_decompose(a, this);
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
  //==========================================================================
  //define the content of the remote
  Blockly.Blocks['remote'] = {
    init: function() {
    //window.alert("remote");
      var currPinArray = Blockly.Blocks.getUnusedpins(this);
  //================================= define the icon of the remote input block
      this.appendDummyInput()
          .appendField(new Blockly.FieldImage("assets/images/icons/red.png", 15, 15, { alt: "*", flipRtl: "FALSE" }))
          .appendField("IR Remote");
    //=================================== define the default view of the remote input at before customization

      var Panel1 = this.appendDummyInput('Panel1')
          .appendField("Pin")
          .appendField(new Blockly.FieldDropdown(currPinArray), "Pin")
          .appendField("Select IR Control")
          .appendField(new Blockly.FieldDropdown([["BW","BW"], ["F","F"], ["B","B"], ["L","L"], ["R","R"], ["F1","F1"], ["F2","F2"], ["F3","F3"], ["F4","F4"], ["F5","F5"], ["F6","F6"]]), "remoteButton");
  
      var OutputStmt = this.appendStatementInput("OutputStmt")
          .setCheck(null);
  
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(Code.multiColor.input);
      this.setTooltip("");
      this.setHelpUrl("");
  
      if (this.isInFlyout) {
          OutputStmt.setVisible(false);
      }
    },
    onchange: function (ev) {
      Blockly.Blocks.fn_onchange(this, ev, Code.multiColor.input);
    }
  };
  //================================================================================
  //define the content of the IR
  Blockly.Blocks['IR'] = {
    init: function() {
      var currPinArray = Blockly.Blocks.getUnusedpins(this);
      var minvalue = Blockly.Blocks.MinValue < 0 ? 0 : Blockly.Blocks.MinValue;
      var maxvalue = Blockly.Blocks.MaxValue > 1023 ? 1023 : Blockly.Blocks.MaxValue;
  
      this.appendDummyInput()
      //========================= define the icon of the IR input block
          .appendField(new Blockly.FieldImage("assets/images/icons/red.png", 15, 15, { alt: "*", flipRtl: "FALSE" }))
          .appendField("IR Sensor");
  //======================== define the default view of the IR input at before customization

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
  //================================ define the mutators of the IR input block
      this.setMutator(new Blockly.Mutator(["andblock", "orblock", "lightelseif", "controls_if_else"]));
  
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(Code.multiColor.input);
      this.setTooltip("");
      this.setHelpUrl("");
  
      if (this.isInFlyout) {
          OutputStmt.setVisible(false);
      }
      this.elseCount_ = this.elseifCount_ = this.andCount_ = this.orCount_ = 0;
    },
      onchange: function (ev) {
          Blockly.Blocks.fn_onchange(this, ev, Code.multiColor.input);
      },
      mutationToDom: function () {
          return Blockly.Blocks.fn_mutationToDom(this);
      },
      domToMutation: function (xmlElement) {
          Blockly.Blocks.fn_domToMutation(xmlElement, this);
      },
      decompose: function (a) {
          return Blockly.Blocks.fn_decompose(a, this);
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
  //==========================================================
  //define the content of the lightsensor

  Blockly.Blocks['lightsensor'] = {
    init: function() {
      var currPinArray = Blockly.Blocks.getUnusedpins(this);
      var minvalue = Blockly.Blocks.MinValue < 0 ? 0 : Blockly.Blocks.MinValue;
      var maxvalue = Blockly.Blocks.MaxValue > 1023 ? 1023 : Blockly.Blocks.MaxValue;
  //================================ define the icon of the lightsensor input block
      this.appendDummyInput()
          .appendField(new Blockly.FieldImage("assets/images/icons/red.png", 15, 15, { alt: "*", flipRtl: "FALSE" }))
          .appendField("Light Sensor");

//===================================== define the default view of the lightsensor input at before customization

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
  //=================================== define the mutators of the lightsensor input block
      this.setMutator(new Blockly.Mutator(["andblock", "orblock", "lightelseif", "controls_if_else"]));
  
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(Code.multiColor.input);
      this.setTooltip("");
      this.setHelpUrl("");
  
      if (this.isInFlyout) {
          OutputStmt.setVisible(false);
      }
      this.elseCount_ = this.elseifCount_ = this.andCount_ = this.orCount_ = 0;
    },
      onchange: function (ev) {
          Blockly.Blocks.fn_onchange(this, ev, Code.multiColor.input);
      },
      mutationToDom: function () {
          return Blockly.Blocks.fn_mutationToDom(this);
      },
      domToMutation: function (xmlElement) {
          Blockly.Blocks.fn_domToMutation(xmlElement, this);
      },
      decompose: function (a) {
          return Blockly.Blocks.fn_decompose(a, this);
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
  //define the content of the resistor

  Blockly.Blocks['resistor'] = {
  
    init: function() {//window.alert("resistor");
      var currPinArray = Blockly.Blocks.getUnusedpins(this);
      var minvalue = Blockly.Blocks.MinValue < 0 ? 0 : Blockly.Blocks.MinValue;
      var maxvalue = Blockly.Blocks.MaxValue > 1023 ? 1023 : Blockly.Blocks.MaxValue;
  //================================== define the icon of the resistor input block

      this.appendDummyInput()
          .appendField(new Blockly.FieldImage("assets/images/icons/red.png", 15, 15, { alt: "*", flipRtl: "FALSE" }))
          .appendField("Potentiometer");
  // ============================define the default view of the resistor input at before customization

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
  // =================================define the mutators of the resistor input block
      this.setMutator(new Blockly.Mutator(["andblock", "orblock", "lightelseif", "controls_if_else"]));
  
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(Code.multiColor.input);
      this.setTooltip("");
      this.setHelpUrl("");
  
      if (this.isInFlyout) {
          OutputStmt.setVisible(false);
      }
      this.elseCount_ = this.elseifCount_ = this.andCount_ = this.orCount_ = 0;
    },
      onchange: function (ev) {
          Blockly.Blocks.fn_onchange(this, ev, Code.multiColor.input);
      },
      mutationToDom: function () {
          return Blockly.Blocks.fn_mutationToDom(this);
      },
      domToMutation: function (xmlElement) {
          Blockly.Blocks.fn_domToMutation(xmlElement, this);
      },
      decompose: function (a) {
          return Blockly.Blocks.fn_decompose(a, this);
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
  //===================================================================================
  //define the content of the serialrx

  Blockly.Blocks['serialrx'] = {
    init: function() {
    //window.alert("serialx");
      var currPinArray = Blockly.Blocks.getUnusedpins(this);
  //================================ define the icon of the serialrx input block
      this.appendDummyInput()
          .appendField(new Blockly.FieldImage("assets/images/icons/red.png", 15, 15, { alt: "*", flipRtl: "FALSE" }))
          .appendField("Serial Rx");
  //=================================== define the default view of the serialrx input at before customization

      var Panel1 = this.appendDummyInput('Panel1')
          .appendField("Pin")
          .appendField(new Blockly.FieldDropdown(currPinArray), "Pin")
          .appendField("Baud Rate")
          .appendField(new Blockly.FieldDropdown([["300", "300"], ["600", "600"], ["1200", "1200"], ["2400", "2400"], ["4800", "4800"], ["9600", "9600"], ["14400", "14400"], ["19200", "19200"], ["28800", "28800"], ["38400", "38400"], ["57600", "57600"], ["115200", "115200"]]), "baudrate")
          .appendField(new Blockly.FieldDropdown([["Character", "character"], ["Text", "Text"]]), "choice")
          .appendField(new Blockly.FieldTextInput("A"), "txtchar");
  
      var OutputStmt = this.appendStatementInput("OutputStmt")
          .setCheck(null);
  //================================= define the mutators of the serialrx input block
      this.setMutator(new Blockly.Mutator(["lightelseif", "controls_if_else"]));
  
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(Code.multiColor.input);
      this.setTooltip("");
      this.setHelpUrl("");
      
      if (this.isInFlyout) {
          OutputStmt.setVisible(false);
      }
      Panel1.fieldRow[3].setValue("115200", "baudrate");
      this.elseCount_ = this.elseifCount_ = this.andCount_ = this.orCount_ = 0;
    },
    onchange: function (ev) {
        Blockly.Blocks.fn_onchange(this, ev, Code.multiColor.input);
    },
    mutationToDom: function () {
        return Blockly.Blocks.fn_mutationToDom(this);
    },
    domToMutation: function (xmlElement) {
        Blockly.Blocks.fn_domToMutation(xmlElement, this);
    },
    decompose: function (a) {
        return Blockly.Blocks.fn_decompose(a, this);
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
  //============================================================================
  //define the content of the temperature
  Blockly.Blocks['temperature'] = {
    init: function() {
      var currPinArray = Blockly.Blocks.getUnusedpins(this);
      var minvalue = (Blockly.Blocks.MinValue < 0 || Blockly.Blocks.MinValue > 100) ? 0 : Blockly.Blocks.MinValue;
      var maxvalue = (Blockly.Blocks.MaxValue < 0) || (Blockly.Blocks.MaxValue > 100) ? 100 : Blockly.Blocks.MaxValue;
  //=================================== define the icon of the bluetoothrx input block
      this.appendDummyInput()
          .appendField(new Blockly.FieldImage("assets/images/icons/red.png", 15, 15, { alt: "*", flipRtl: "FALSE" }))
          .appendField("Temperature");
  //========================= define the default view of the temperature input at before customization
      var Panel1 = this.appendDummyInput('Panel1')
          .appendField("Pin")
          .appendField(new Blockly.FieldDropdown(currPinArray), "Pin")
          .appendField("Range")
          .appendField(new Blockly.FieldDropdown([["Inside", "Inside"], ["Outside", "Outside"]]), "RangeLimit")
          .appendField("Min")
          .appendField(new Blockly.FieldNumber(minvalue, 0, 100), "SensorRangeMin")
          .appendField("Max")
          .appendField(new Blockly.FieldNumber(maxvalue, 0, 100), "SensorRangeMax");
  
      var OutputStmt = this.appendStatementInput("OutputStmt")
          .setCheck(null);
  //================================ define the mutators of the temperature input block
      this.setMutator(new Blockly.Mutator(["andblock", "orblock", "lightelseif", "controls_if_else"]));
  
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(Code.multiColor.input);
      this.setTooltip("");
      this.setHelpUrl("");
  
      if (this.isInFlyout) {
          OutputStmt.setVisible(false);
      }
      this.elseCount_ = this.elseifCount_ = this.andCount_ = this.orCount_ = 0;
    },
    onchange: function (ev) {
        Blockly.Blocks.fn_onchange(this, ev, Code.multiColor.input);
    },
    mutationToDom: function () {
        return Blockly.Blocks.fn_mutationToDom(this);
    },
    domToMutation: function (xmlElement) {
        Blockly.Blocks.fn_domToMutation(xmlElement, this);
    },
    decompose: function (a) {
        return Blockly.Blocks.fn_decompose(a, this);
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
  //=========================================================================
  //define the content of the touch_pad
  Blockly.Blocks['touch_pad'] = {
    init: function() {
      var currPinArray = Blockly.Blocks.getUnusedpins(this);
      var touchDropDown = [["T0", "0"], ["T1", "1"], ["T2", "2"], ["T3", "3"], ["T4", "4"], ["T5", "5"], ["T6", "6"], ["T7", "7"], ["T8", "8"], ["T9", "9"], ["T10", "10"], ["T11", "11"]];
  //========================================= define the icon of the touch_pad input block

      this.appendDummyInput()
          .appendField(new Blockly.FieldImage("assets/images/icons/red.png", 15, 15, { alt: "*", flipRtl: "FALSE" }))
          .appendField("Touchpad");
          //=================================== define the default view of the touch_pad input at before customization
      var Panel1 = this.appendDummyInput("Panel1")
          .appendField("Pin")
          .appendField(new Blockly.FieldDropdown(currPinArray), "Pin")
          .appendField(new Blockly.FieldDropdown([["Type1", "Type1"], ["Type2", "Type2"]]), "touchType")
          .appendField("Select Pin");
  
      var Panel2 = this.appendDummyInput("Panel2")
          .appendField(new Blockly.FieldDropdown(touchDropDown), "touchPin");
  
      // var Panel3 = this.appendDummyInput("Panel3")
      //     .appendField(new Blockly.FieldTouch("0"), "touchButton");
  
      var OutputStmt = this.appendStatementInput("OutputStmt")
          .setCheck(null);
  //======================================== define the mutators of the touch_pad input block
      this.setMutator(new Blockly.Mutator(["andblock", "orblock", "lightelseif", "controls_if_else"]));
  
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(Code.multiColor.input);
      this.setTooltip("");
      this.setHelpUrl("");
      
      if (this.isInFlyout) {
          OutputStmt.setVisible(false);
      }
      this.elseCount_ = this.elseifCount_ = this.andCount_ = this.orCount_ = 0;
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
                var Panel1 = this.inputList[1];
                var Panel2 = this.inputList[2];
                var Panel3 = this.inputList[3];
  
                var touchType_value = Panel1.fieldRow[2].value_;
  
                var changes = 0;
                if (!Panel1.visible_) {
                    Panel1.setVisible(true);
  
                    changes++;
                }
  
                var arrangeFields = function () {
                    if (touchType_value === 'Type1' && !Panel2.visible_) {
                        Panel2.setVisible(true);
                        Panel3.setVisible(false);
  
                        changes++;
                    }
                    else if (touchType_value !== 'Type1' && !Panel3.visible_) {
                        Panel2.setVisible(false);
                        Panel3.setVisible(true);
  
                        changes++;
                    }
                };
                arrangeFields();
  
                for (var i = 1; i <= this.andCount_; i++) {
                    Panel1 = this.getInput('Panel1AND' + i);
                    Panel2 = this.getInput('Panel2AND' + i);
                    Panel3 = this.getInput('Panel3AND' + i);
  
                    touchType_value = Panel1.fieldRow[2].value_;
  
                    arrangeFields();
                }
  
                for (var i = 1; i <= this.orCount_; i++) {
                    Panel1 = this.getInput('Panel1OR' + i);
                    Panel2 = this.getInput('Panel2OR' + i);
                    Panel3 = this.getInput('Panel3OR' + i);
  
                    touchType_value = Panel1.fieldRow[2].value_;
  
                    arrangeFields();
                }
  
                for (var i = 1; i <= this.elseifCount_; i++) {
                    Panel1 = this.getInput('Panel1ELSEIF' + i);
                    Panel2 = this.getInput('Panel2ELSEIF' + i);
                    Panel3 = this.getInput('Panel3ELSEIF' + i);
  
                    touchType_value = Panel1.fieldRow[2].value_;
  
                    arrangeFields();
                }
  
                if (changes > 0) {
                    Panel1.setAlign(Blockly.ALIGN_LEFT);
                }
            }
        }
    },
    mutationToDom: function () {
        return Blockly.Blocks.fn_mutationToDom(this);
    },
    domToMutation: function (xmlElement) {
        Blockly.Blocks.fn_domToMutation(xmlElement, this);
    },
    decompose: function (a) {
        return Blockly.Blocks.fn_decompose(a, this);
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
  //================================================================================
  //define the content of the ultrasonic
    Blockly.Blocks['ultrasonic'] = {
    init: function() {
      var currPinArray = Blockly.Blocks.getUnusedpins(this);
      var minvalue = (Blockly.Blocks.MinValue < 0 || Blockly.Blocks.MinValue > 249) ? 0 : Blockly.Blocks.MinValue;
      var maxvalue = (Blockly.Blocks.MaxValue < 0 || Blockly.Blocks.MaxValue > 250) ? 250 : Blockly.Blocks.MaxValue;
  //================================ define the icon of the ultrasonic input block

      this.appendDummyInput()
          .appendField(new Blockly.FieldImage("assets/images/icons/red.png", 15, 15, { alt: "*", flipRtl: "FALSE" }))
          .appendField("Ultrasonic");
          // ========================================define the default view of the ultrasonic input at before customization
      var Panel1 = this.appendDummyInput('Panel1')
          .appendField("Pin")
          .appendField(new Blockly.FieldDropdown(currPinArray), "Pin")
          .appendField("Range")
          .appendField(new Blockly.FieldDropdown([["Inside", "Inside"], ["Outside", "Outside"]]), "RangeLimit")
          .appendField("Min")
          .appendField(new Blockly.FieldNumber(minvalue, minvalue, maxvalue), "SensorRangeMin")
          .appendField("Max")
          .appendField(new Blockly.FieldNumber(maxvalue, minvalue, maxvalue), "SensorRangeMax");
  
      var OutputStmt = this.appendStatementInput("OutputStmt")
          .setCheck(null);
  //===================================== define the mutators of the ultrasonic input block
      this.setMutator(new Blockly.Mutator(["andblock", "orblock", "lightelseif", "controls_if_else"]));
      
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(Code.multiColor.input);
      this.setTooltip("");
      this.setHelpUrl("");
  
      if (this.isInFlyout) {
          OutputStmt.setVisible(false);
      }
      this.elseCount_ = this.elseifCount_ = this.andCount_ = this.orCount_ = 0;
      },
      onchange: function (ev) {
          Blockly.Blocks.fn_onchange(this, ev, Code.multiColor.input);
      },
      mutationToDom: function () {
          return Blockly.Blocks.fn_mutationToDom(this);
      },
      domToMutation: function (xmlElement) {
          Blockly.Blocks.fn_domToMutation(xmlElement, this);
      },
      decompose: function (a) {
          return Blockly.Blocks.fn_decompose(a, this);
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
  //========================================================================
  //define the content of the custominput

Blockly.Blocks['custominput'] = {
    init: function () {
        var currPinArray = Blockly.Blocks.getUnusedpins(this);
        var minvalue = Blockly.Blocks.MinValue < 0 ? 0 : Blockly.Blocks.MinValue;
        var maxvalue = Blockly.Blocks.MaxValue > 1023 ? 1023 : Blockly.Blocks.MaxValue;
        //================================== define the icon of the custominput block

        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("assets/images/icons/red.png", 15, 15, { alt: "*", flipRtl: "FALSE" }))
            .appendField("Custom Input");
            //======================= define the default view of the custominput at before customization

        var Panel1 = this.appendDummyInput('Panel1')
            .appendField("Device Name:")
            .appendField(new Blockly.FieldTextInput("CustomInput"), "name")
            .appendField("Pin")
            .appendField(new Blockly.FieldDropdown(currPinArray), "Pin")
            .appendField(new Blockly.FieldDropdown([["SIGNAL", "SIGNAL"], ["EDGE", "EDGE"]]), "choice")
            .appendField(" ");

        var Panel2 = this.appendDummyInput('Panel2')
            .appendField(new Blockly.FieldDropdown([["Inside", "Inside"], ["Outside", "Outside"]]), "RangeLimit")
            .appendField(new Blockly.FieldNumber(minvalue, 0, 1023), "SensorRangeMin")
            .appendField(new Blockly.FieldNumber(maxvalue, 0, 1023), "SensorRangeMax")
            .appendField(new Blockly.FieldCheckbox("TRUE"), "chkDelay");

        var Panel3 = this.appendDummyInput('Panel3')
            .appendField(new Blockly.FieldDropdown([["RISING", "RISING"], ["FALLING", "FALLING"]]), "status");

        var OutputStmt = this.appendStatementInput("OutputStmt")
            .setCheck(null);
            // =================================define the mutators of the custominput block
        this.setMutator(new Blockly.Mutator(["andblock", "orblock", "lightelseif", "controls_if_else"]));

        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Code.multiColor.input);
        this.setTooltip("Custom Input");

        Panel3.setVisible(false);
        this.elseCount_ = this.elseifCount_ = this.andCount_ = this.orCount_ = 0;
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
                var Panel1 = this.inputList[1];
                var Panel2 = this.inputList[2];
                var Panel3 = this.inputList[3];

                var choice_value = Panel1.fieldRow[4].value_;

                var changes = 0;
                if (!Panel1.visible_) {
                    Panel1.setVisible(true);

                    changes++;
                }

                var arrangeFields = function () {
                    if (choice_value === 'SIGNAL' && !Panel2.visible_) {
                        Panel2.setVisible(true);
                        Panel3.setVisible(false);

                        changes++;
                    }
                    else if (choice_value !== 'SIGNAL' && !Panel3.visible_) {
                        Panel2.setVisible(false);
                        Panel3.setVisible(true);

                        changes++;
                    }
                };
                arrangeFields();

                for (var i = 1; i <= this.andCount_; i++) {
                    Panel1 = this.getInput('Panel1AND' + i);
                    Panel2 = this.getInput('Panel2AND' + i);
                    Panel3 = this.getInput('Panel3AND' + i);

                    choice_value = Panel1.fieldRow[2].value_;

                    arrangeFields();
                }

                for (var i = 1; i <= this.orCount_; i++) {
                    Panel1 = this.getInput('Panel1OR' + i);
                    Panel2 = this.getInput('Panel2OR' + i);
                    Panel3 = this.getInput('Panel3OR' + i);

                    choice_value = Panel1.fieldRow[2].value_;

                    arrangeFields();
                }

                for (var i = 1; i <= this.elseifCount_; i++) {
                    Panel1 = this.getInput('Panel1ELSEIF' + i);
                    Panel2 = this.getInput('Panel2ELSEIF' + i);
                    Panel3 = this.getInput('Panel3ELSEIF' + i);

                    choice_value = Panel1.fieldRow[2].value_;

                    arrangeFields();
                }

                if (changes > 0) {
                    Panel1.setAlign(Blockly.ALIGN_LEFT);
                }
            }
        }
    },
    mutationToDom: function () {
        return Blockly.Blocks.fn_mutationToDom(this);
    },
    domToMutation: function (xmlElement) {
        Blockly.Blocks.fn_domToMutation(xmlElement, this);
    },
    decompose: function (a) {
        return Blockly.Blocks.fn_decompose(a, this);
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
// Define blocks for Input menu - ends
  
 