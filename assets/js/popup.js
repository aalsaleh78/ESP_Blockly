'use strict';
var Code = Code || {};
var CustomDialog = {};

// Variable Functions - begins

// Add a function to the button's click event
Code.bindClick = function (el, func) {
    if (typeof el == 'string') {
        el = document.getElementById(el);
    }

    if (el) {
        el.addEventListener('click', func, true);
        el.addEventListener('touchend', func, true);
    }
    // console.log(el);
};

// Add Click events for all buttons
Code.bindActionFunctions = function () {
    Code.bindClick('button_new', function () {
        Code.newMainProject();
    });
    Code.bindClick('button_load', function () {
        Code.openProject();
    });
    Code.bindClick('button_example', Code.exampleOpen);
    Code.bindClick('button_save', function () {
        Code.saveOperation("SAVE");
    });
    Code.bindClick('button_saveas', function () {
        Code.saveOperation("SAVEAS");
    });
    Code.bindClick('button_print', Code.printProject);
    Code.bindClick('button_undo', Code.blocklyUndo);
    Code.bindClick('button_redo', Code.blocklyRedo);
    Code.bindClick('button_create', function () {
        Code.listVariablePopup("toolbox");
    });
    Code.bindClick('serial_port', Code.checkboard);
    Code.bindClick('button_ide_download', function () {
        Code.saveOperation("DOWNLOAD");
    });
    Code.bindClick('button_ide_compile', function () {
        Code.saveOperation("COMPILE");
    });

    $("#txt_varValue").keyup(Code.variableKeyup);

    $('.choose-game').on('click', function () {
        Code.openGameWindow(this.innerText.toLowerCase());
    });

    //BLE
    Code.bindClick('btnBleSetup', Code.BleSetup);
    Code.bindClick('bleClosebtn', Code.BleClose);

    $("a[name=board_selection]").click(Code.boardSelectionChanged);
    // document.getElementById(Code.selectedBoard).className = "board-select-item";

    //arraydunamic textbox div
    Code.bindClick('customArrayChk', Code.showHideArrayDiv);
    $("#txt_ArrayValue").keyup(Code.setCheckboxStatus);
    Code.bindClick("btn_latest_update", function () {
        $("#sf-update").hide();
        Code.checkUpdate();
    });
    Code.bindClick("remind_update", function () {
        $("#sf-update").hide();
    });
    Code.bindClick("btn-update", function () {
        Code.notifyUpdate();
    });
};
//====================== building the window of variable creation =====================
Code.createVariablePopup = function (callback) {
    $('#create_variable').text(Blockly.Msg.create_variable);
    window.alert("createVariablePopup");
    var oldPopup = $('#modifyVariable-popup');
    var popup = $('#variable-popup');
    var nameLabel = $('#lbl_varName');
    var valueLabel = $('#lbl_varValue');
    var name = $('#txt_varName');
    var value = $('#txt_varValue');
    var create = $('#btn_varCreate');
    var update = $('#btn_varUpdate');

    oldPopup.modal('hide');
    popup.modal('show');
    nameLabel.hide();
    valueLabel.hide();
    nameLabel.text('');
    valueLabel.text('');
    name.val('');
    value.val('');
    create.show();
    update.hide();

    create.unbind("click");
    create.on('click', function () {
        if (!name.val().match(/^[a-z](?:_?[a-z0-9]+)*$/i)) {
            name.focus();
            nameLabel.show();
            valueLabel.hide();
            nameLabel.text('Invalid variable name');
        }
        else if (!value.val().match(/^-?\d+$/)) {
            value.focus();
            nameLabel.hide();
            valueLabel.show();
            valueLabel.text('Invalid value');
        }
        else {
            popup.modal('hide');
            var n = name.val();
            var v = parseInt(value.val());
            nameLabel.hide();
            valueLabel.hide();
            callback(n, v)
        }
    });
};

Code.createchangeInitialVariablePopup = function (a, b, call) {
    $('#lblheading').text('Change Initial Variable');

    var popup = $('#changeInitialVariable-popup');
    var Variabletxt = $('#txt_changeInitialVariable');
    var createvalueVariableButton = $('#btn_changeInitialVariableCreate');

    popup.modal('show');
    Variabletxt.val(b);

    createvalueVariableButton.unbind("click");
    createvalueVariableButton.on('click', function () {
        popup.modal('hide');
        var aa = Variabletxt.val();
        Variabletxt.text("");
        call(aa);
    });
};

Code.createRenameVariablePopup = function (a, b) {//callback
    $('#lblheadingRename').text('Rename Variable');
    window.alert("rename popup");
    //window.alert(callback);
    var popup = $('#RenameVariable-popup');
    var txtval = $('#txt_RenameVariable');
    var txtprevval = $('#lbl_prev_variable_name');
    var errorLabel = $('#lbl_RenameVariable');
    var createvalueVariableButton = $('#btn_RenameVariable');

    popup.modal('show');
    txtval.val(b);
    txtprevval.val(b);
    errorLabel.hide();

    createvalueVariableButton.unbind("click");
    createvalueVariableButton.on('click', function () {
        var new_name = txtval.val();
        var prev_name = txtprevval.val();
        if (!new_name.match(/^[a-zA-Z][a-zA-Z0-9_;]+$/)) {
            errorLabel.show();
            errorLabel.text('Invalid variable name');
            $("#txt_RenameVariable").val("item");
        }
        else {
            popup.modal('hide');
            txtprevval.text('');
            errorLabel.hide();
            //window.alert("old" + prev_name);
            //window.alert("new_name" + new_name);
            //callback(prev_name, new_name);
            //prev_name = new_name;
            //Blockly.Workspace.prototype.renameVariable(prev_name, new_name);
            //Blockly.Workspace.prototype.variableList
            window.alert("Last");
            //Blockly.Workspace.prototype.renameVariable(prev_name, new_name);
            Code.listVariablePopup('toolbox');
            //code.showModifyVariablePopup(prev_name);
            // Blockly.Workspace.prototype.deleteVariable(prev_name);
            //Blockly.variableDeleteFunction(prev_name);
        }
    });
};

Code.showModifyVariablePopup = function (a) {
    $('#create_variable').text(Blockly.Msg.modify_variable);
    window.alert("showModifyVariablePopup");
    var variableindex = Blockly.Workspace.prototype.variableList.indexOf(a);
    var variablevalue = Blockly.Workspace.prototype.variableValueList[variableindex];
    window.alert("showModifyVariablePopup var==" + a);
    var oldPopup = $('#modifyVariable-popup');
    var popup = $('#variable-popup');
    var nameLabel = $('#lbl_varName');
    var valueLabel = $('#lbl_varValue');
    var name = $('#txt_varName');
    var value = $('#txt_varValue');
    var create = $('#btn_varCreate');
    var update = $('#btn_varUpdate');

    oldPopup.modal('hide');
    popup.modal('show');
    nameLabel.hide();
    valueLabel.hide();
    nameLabel.text('');
    valueLabel.text('');
    name.val(a);
    value.val(variablevalue);
    create.hide();
    update.show();

    update.unbind("click");
    update.on('click', function () {
        if (!name.val().match(/^[a-z](?:_?[a-z0-9]+)*$/i)) {
            name.focus();
            nameLabel.show();
            valueLabel.hide();
            nameLabel.text('Invalid variable name');
        }
        else if (!value.val().match(/^-?\d+$/)) {
            value.focus();
            nameLabel.hide();
            valueLabel.show();
            valueLabel.text('Invalid value');
        }
        else {

            popup.modal('hide');
            var n = name.val();
            var v = parseInt(value.val());
            window.alert("showModifyVariablePopup else==" + n);
            nameLabel.hide();
            valueLabel.hide();
            Blockly.Workspace.prototype.variableValueList[variableindex] = v;
            Blockly.Workspace.prototype.variableList[variableindex] = n;
        }
        Code.renderContent(false);
        Code.listVariablePopup('toolbox');
        toCode('ESP32');
    });
};

Code.listVariablePopup = function (type) {
    var popup = $('#modifyVariable-popup');
    popup.modal('show');
    window.alert("popup");
    var dynamicDiv = document.getElementById("modifyvarDynamicdiv");
    dynamicDiv.innerHTML = "";
    for (var i = 0; i < Blockly.Workspace.prototype.variableList.length; i++) {
        dynamicDiv.innerHTML = dynamicDiv.innerHTML + " <div class=\"row\">" +
            "<div class=\"col-xs-5 variableModifyLabel\"><label>" + Blockly.Workspace.prototype.variableList[i] + "</label></div>" +
            "<div class=\"col-xs-3 no-padding\"> " +
            "<button class=\"btn btn-blue btn-block\" id=\"btn_EditModyvariableButton\" " +
            "onclick=\"Code.showModifyVariablePopup($(this).parent().parent().find('.variableModifyLabel').text())\">Edit\n" +
            "</button></div>" +
            "<div class=\"col-xs-4\">" +
            "<button class=\"btn btn-blue btn-block\" id=\"btn_deleteModifyVariableButton\" " +
            "onclick=\"Blockly.variableDeleteFunction($(this).parent().parent().find('.variableModifyLabel').text())\">Delete\n" +
            "</button></div>" +
            "</div>"
    }
};

Code.createtextPopup = function (callback) {
    $('#lblheadingText').text(Blockly.Msg.texts);
    window.alert("callback");
    var oldPopup = $('#modifyText-popup');
    var popup = $('#text-popup');
    var nameLabel = $('#lbl_TextName');
    var valueLabel = $('#lbl_TextValue');
    var name = $('#txt_TextName');
    var value = $('#txt_TextValue');
    var create = $('#btn_TextCreate');
    var update = $('#btn_TextUpdate');

    oldPopup.modal('hide');
    popup.modal('show');
    nameLabel.hide();
    valueLabel.hide();
    nameLabel.text('');
    valueLabel.text('');
    name.val('');
    value.val('');
    create.show();
    update.hide();

    create.unbind("click");
    create.on('click', function () {
        if (!name.val().match(/^[a-z](?:_?[a-z0-9]+)*$/i)) {
            name.focus();
            nameLabel.show();
            valueLabel.hide();
            nameLabel.text('Invalid variable name');
        }
        else {
            popup.modal('hide');
            var n = name.val();
            var v = value.val();
            nameLabel.hide();
            valueLabel.hide();
            callback(n, v)
        }
    });
};

Code.showModifyTextPopup = function (a) {
    $('#lblheadingText').text(Blockly.Msg.Modify_texts);

    var variableindex = Blockly.Workspace.prototype.textList.indexOf(a);
    var variablevalue = Blockly.Workspace.prototype.textValueList[variableindex];

    var oldPopup = $('#modifyText-popup');
    var popup = $('#text-popup');
    var nameLabel = $('#lbl_TextName');
    var valueLabel = $('#lbl_TextValue');
    var name = $('#txt_TextName');
    var value = $('#txt_TextValue');
    var create = $('#btn_TextCreate');
    var update = $('#btn_TextUpdate');

    oldPopup.modal('hide');
    popup.modal('show');
    nameLabel.hide();
    valueLabel.hide();
    nameLabel.text('');
    valueLabel.text('');
    name.val(a);
    value.val(variablevalue);
    create.hide();
    update.show();

    update.unbind("click");
    update.on('click', function () {
        if (!name.val().match(/^[a-z](?:_?[a-z0-9]+)*$/i)) {
            name.focus();
            nameLabel.show();
            valueLabel.hide();
            nameLabel.text('Invalid variable name');
        }
        else {
            popup.modal('hide');
            var n = name.val();
            var v = value.val();
            nameLabel.hide();
            valueLabel.hide();
            Blockly.Workspace.prototype.textValueList[variableindex] = v;
            Blockly.Workspace.prototype.textList[variableindex] = n;
        }
        Code.renderContent(false);
        Code.listTextPopup();
        toCode('ESP32'); 
    });
};

Code.listTextPopup = function () {
    var popup = $('#modifyText-popup');
    popup.modal('show');

    var dynamicDiv = document.getElementById("modifytextDynamicdiv");
    dynamicDiv.innerHTML = "";
    for (var i = 0; i < Blockly.Workspace.prototype.textList.length; i++) {
        dynamicDiv.innerHTML = dynamicDiv.innerHTML + "<div class=\"row\">" +
            "<div class=\"col-xs-5 variableModifyLabel\"><label>" + Blockly.Workspace.prototype.textList[i] + "</label></div>" +
            "<div class=\"col-xs-3\">" +
            "<button class=\"btn btn-blue btn-block\" id=\"btn_EditModytextButton\" " +
            "onclick=\"Code.showModifyTextPopup($(this).parent().parent().find('.variableModifyLabel').text())\" >Edit\n" +
            "</button></div>" +
            "<div class=\"col-xs-4\">" +
            "<button class=\"btn btn-blue btn-block\" id=\"btn_deleteModifyTextButton\" " +
            "onclick=\"Blockly.textDeleteFunction ($(this).parent().parent().find('.variableModifyLabel').text())\">Delete\n" +
            "</button></div>" +
            "</div>"
    }
};

Code.createArrayPopup = function (callbackcall) {
    $('#lblheadingArray').text('Create An Array');

    var popup = $('#array-popup');
    var nameLabel = $('#lbl_ArrayName');
    var valueLabel = $('#lbl_ArrayValue');
    var name = $('#txt_ArrayName');
    var value = $('#txt_ArrayValue');
    var create = $('#btn_ArrayCreate');
    var update = $('#btn_ArrayUpdate');
    var arrayCheck = $('#customArrayChk');
    var arrayValuesDiv = $("#dynamicDiv");

    popup.modal('show');
    nameLabel.hide();
    valueLabel.hide();
    nameLabel.text('');
    valueLabel.text('');
    name.val('');
    value.val('');
    create.show();
    update.hide();
    arrayValuesDiv.hide();
    arrayCheck.prop('checked', false);
    arrayCheck.prop('disabled', true);
    arrayValuesDiv.empty();

    create.unbind("click");
    create.on('click', function () {
        if (!name.val().match(/^[a-z](?:_?[a-z0-9]+)*$/i)) {
            name.focus();
            nameLabel.show();
            valueLabel.hide();
            nameLabel.text('Invalid variable name');
        }
        else if (!value.val().match(/^-?\d+$/)) {
            value.focus();
            nameLabel.hide();
            valueLabel.show();
            valueLabel.text('Invalid value');
        }
        else {
            popup.modal('hide');

            var arraycontentval = "";
            var arraycontent = "";
            if (!arrayCheck.prop('disabled')) {
                for (var i = 0; i < value.val(); i++) {
                    arraycontentval = $('#dynamictext' + i).val();
                    if (arraycontentval) {
                        arraycontent += arraycontentval + ",";
                    }
                }
            }
            arraycontent = arraycontent.replace(/,\s*$/, "");

            var na = name.val();
            var va = parseInt(value.val());
            nameLabel.hide();
            valueLabel.hide();
            callbackcall(na, arraycontent, va)
        }
    });
};

Code.createRenameArrayPopup = function (a, b, callback) {
    console.log('llll')
    var popup = $('#RenameArray-popup');
    popup.modal('show');

    var heading = $('#lblheadingArrayRename');
    heading.text('Rename Array');

    var txtval = $('#txt_RenameArray');
    txtval.val(b);

    var txtprevval = $('#lbl_prev_Array_name');
    txtprevval.val(b);

    var createvalueVariableButton = $('#btn_RenameArray');
    createvalueVariableButton.unbind("click");
    createvalueVariableButton.on('click', function () {
        var new_name = txtval.val();
        var prev_name = txtprevval.val();
        callback(prev_name, new_name);
        popup.modal('hide');
        txtprevval.text('');
    });
};

Code.showModifyArrayPopup = function (a) {
    var arrayindex = Blockly.Workspace.prototype.arrayList.indexOf(a);
    var arraySize = Blockly.Workspace.prototype.arraydrpwnvalues[arrayindex];
    if (arraySize == undefined) {
        arraySize = 0;
    }
    var arrayElments = Blockly.Workspace.prototype.arrayValueList[arrayindex];

    var name = $('#txt_ArrayName');
    var value = $('#txt_ArrayValue');
    var Heading = $('#lblheadingArray');

    Heading.text('Modify An Array');
    name.val(a);
    value.val(arraySize);

    document.getElementById("customArrayChk").disabled = false;
    $('#customArrayChk').prop('checked', true);
    var oldPopup = $('#modifyArray-popup');
    oldPopup.modal('hide');
    Code.ShowArrayValueDiv(arrayElments);
    var popup = $('#array-popup');
    popup.modal('show');

    var nameArray = $('#txt_ArrayName');
    var valueArray = $('#txt_ArrayValue');
    var nameLabelArray = $('#lbl_ArrayName');
    var valueLabelArray = $('#lbl_ArrayValue');
    nameLabelArray.text('');
    valueLabelArray.text('');

    var createvalueLabelArray = $('#btn_ArrayUpdate');
    createvalueLabelArray.unbind("click");
    createvalueLabelArray.on('click', function () {
        if (!nameArray.val().match(/^[a-z](?:_?[a-z0-9]+)*$/i)) {
            nameArray.focus();
            nameLabelArray.text('Not a valid Array name');
        }
        else if (!valueArray.val().match(/^-?\d+$/)) {
            nameLabelArray.text('');
            valueArray.focus();
            valueLabelArray.text('Not a valid value');
        }
        else {
            var arraycontentval = "";
            var arraycontent = "";
            if (document.getElementById("customArrayChk").disabled == false) {
                for (var i = 0; i < valueArray.val(); i++) {
                    var j = i;
                    arraycontentval = $('#dynamictext' + j).val();
                    if (arraycontentval == "") {
                        arraycontent += "";
                    }
                    else if (arraycontentval == null) {
                        arraycontent += "";
                    }
                    else {
                        arraycontent += arraycontentval + ",";
                    }
                }
            }
            arraycontent = arraycontent.replace(/,\s*$/, "");

            var na = nameArray.val();
            var va = parseInt(valueArray.val());
            nameArray.val('');
            valueArray.val('');
            nameLabelArray.text('');
            valueLabelArray.text('');
            document.getElementById("customArrayChk").disabled = true;
            document.getElementById("dynamicDiv").innerHTML = "";
            $("#dynamicDiv").hide();
            $('#customArrayChk').prop('checked', false);
            var arraydrp = [];
            arraydrp += [na, va];
            Blockly.Workspace.prototype.arraydrpwnvalues[arrayindex] = va;
            Blockly.Workspace.prototype.arrayValueList[arrayindex] = arraycontent;
            Blockly.Workspace.prototype.arrayList[arrayindex] = na;
            toCode('ESP32');
        }
        Code.renderContent(false);
        Code.createmodifyArrayPopup(Blockly.Workspace.prototype.arrayList, Blockly.Workspace.prototype.arrayValueList, Blockly.Workspace.prototype.arraydrpwnvalues)
        popup.modal('hide');
        oldPopup.modal('show');
    });
};

Code.createmodifyArrayPopup = function (a, b, c) {
    document.getElementById("btn_ArrayCreate").style.display = "none";
    document.getElementById("btn_ArrayUpdate").style.display = "block";
    Code.genDivs(a, b, c);
    var popup = $('#modifyArray-popup');
    popup.modal('show');
};

Code.genDivs = function (arrayList, arrayValueList, arraydrpwnvalues) {
    var dynamicDiv = document.getElementById("modifyarrayDynamicdiv");
    dynamicDiv.innerHTML = "";
    for (var i = 0; arrayList && i < arrayList.length; i++) {
        dynamicDiv.innerHTML = dynamicDiv.innerHTML + " <div class=\"row\">" +
            "<div class=\"col-xs-5 arrayModifyLabel\"><label>" + arrayList[i] + "</label></div>" +
            "<div class=\"col-xs-3 no-padding\"> " +
            "<button class=\"btn btn-blue btn-block\" id=\"btn_EditModyArrayButton\" " +
            "onclick=\"Code.showModifyArrayPopup($(this).parent().parent().find('.arrayModifyLabel').text())\" >Edit\n" +
            "</button></div>" +
            "<div class=\"col-xs-4\">  " +
            "<button class=\"btn btn-blue btn-block\" id=\"btn_deleteModifyArrayButton\" " +
            "onclick=\"Blockly.arrayDeleteFunction ($(this).parent().parent().find('.arrayModifyLabel').text())\">Delete\n" +
            "</button></div>" +
            "</div>";
    }
};

Code.showHideArrayDiv = function () {
    if ($('#lblheadingArray').text() == 'Create An Array') {
        var value = $('#txt_ArrayValue');
        var arrayCheck = $('#customArrayChk');
        var arrayValuesDiv = $("#dynamicDiv");

        var txtarryValue = value.val();
        arrayValuesDiv.empty();
        if (arrayCheck.is(':checked')) {
            arrayValuesDiv.show();
            if (txtarryValue != "") {
                for (var i = 0; i < txtarryValue; i++) {
                    arrayValuesDiv.html(arrayValuesDiv.html() + "<td style='padding: 2px'>" +
                        "<label style=\"text-align: center; width: 100%\">" + i + "</label>" +
                        "<input type=\"number\" style=\"width:60px;\"  id='dynamictext" + i + "'>" +
                        "</td>&nbsp&nbsp");
                }
            }
        }
        else {
            arrayValuesDiv.hide();
        }
    }
    else {
        var name = $('#txt_ArrayName');
        var arrayindex = Blockly.Workspace.prototype.arrayList.indexOf(name.val());
        var arrayElments = Blockly.Workspace.prototype.arrayValueList[arrayindex];
        Code.ShowArrayValueDiv(arrayElments);
    }
};

Code.ShowArrayValueDiv = function (arrayElments) {
    var strarrayElments = arrayElments;
    var temp = new Array();
    if (strarrayElments == undefined) {
        strarrayElments = '0';
    }

    if (strarrayElments.indexOf(',') > -1) {
        temp = strarrayElments.split(",");
    }
    else {

        temp = strarrayElments;
    }

    var dynamicDiv = document.getElementById("dynamicDiv");
    var txtarryValue = document.getElementById("txt_ArrayValue").value;
    document.getElementById("dynamicDiv").innerHTML = "";
    if ($("#customArrayChk").is(':checked')) {
        document.getElementById("dynamicDiv").style.height = "70px";
        $("#dynamicDiv").show();
        if (txtarryValue != "") {
            for (var i = 0; i < txtarryValue; i++) {
                var j = i;
                if (strarrayElments.indexOf(',') > -1) {
                    dynamicDiv.innerHTML = dynamicDiv.innerHTML + "<td><label class=\"text-info\" style=\"color:#7d7d7d; font-size:17px;padding-left: 11px;\" id='dynamiclbl\"+  i++ +\"'>" + i + "</label>" +
                        "  <input class=\"form-control\" type=\"number\" style=\"width:65px;\" value=\"" + temp[j] + "\"  id='dynamictext" + j + "'></td>&nbsp&nbsp";
                }
                else {
                    dynamicDiv.innerHTML = dynamicDiv.innerHTML + "<td><label class=\"text-info\" style=\"color:#7d7d7d; font-size:17px;padding-left: 11px;\" id='dynamiclbl\"+  i++ +\"'>" + i + "</label>" +
                        "  <input class=\"form-control\" type=\"number\" style=\"width:65px;\" value=\"" + temp + "\"  id='dynamictext" + j + "'></td>&nbsp&nbsp";

                }
            }
        }
    }
    else {
        $("#dynamicDiv").hide();
    }
};

Code.setCheckboxStatus = function () {
    var value = $("#txt_ArrayValue");
    var arrayCheck = $('#customArrayChk');
    var arrayValuesDiv = $("#dynamicDiv");

    arrayValuesDiv.hide();
    arrayCheck.prop('disabled', false);
    arrayCheck.prop('checked', false);

    if (value.val() == "") {
        arrayCheck.prop('disabled', true);
    }
};

Code.bindActionFunctions();
// Variable Functions - ends
