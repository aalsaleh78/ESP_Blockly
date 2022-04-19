//================================================================
// the start code to convert blockly to C code =====================================
// Customize Blockly code to 'C' - begin
// Start code - begins
Blockly.ESP32.esp32start = function (block) {
    var taskname = block.getFieldValue('taskname').trim().replace(/ /g, "_");
    var priority = block.getFieldValue('priority');
    var outputstmt = Blockly.ESP32.statementToCode(block, 'OutputStmt');

    if (taskname !== "" && Blockly.Blocks.isMultitask && Blockly.Blocks.ConnectedBoard !== "ESPX") {
        var subSetup = "";
        var subLoop = outputstmt;
        var delayCodes = subLoop.match(/delay\(.*\)/g) || [];

        var vDelayCodes = [];
        delayCodes.forEach(function (item) {
            vDelayCodes.push(item.replace(/delay\(/g, "vTaskDelay(").replace(/\)/g, "/portTICK_PERIOD_MS)"));
        });

        delayCodes.forEach(function (item, index) {
            subLoop = subLoop.replace(item, vDelayCodes[index]);
        });

        subLoop = subLoop.split('\n');
        subLoop = subLoop.filter(function (el) {
            return el != "";
        });
        subLoop = subLoop.join('\n\t\t');

        var method = '' +
            '\nvoid ' + taskname + '(void *pvParameters){' +
            '\n\t(void) pvParameters;' +
            '\n\t' + subSetup +
            '\n\twhile(1){' +
            '\n\t\t' + subLoop +
            '\n\t}' +
            '\n}';

        Blockly.ESP32.addFunction('multitask_method_' + taskname, method);
        Blockly.ESP32.addSetup('multitak_setup_' + taskname, 'xTaskCreate(' + taskname + ', "' + taskname + '", 128, NULL, ' + priority + ', NULL);');
        return "";
    }
    else {
        return outputstmt;
    }
};
// Start code - ends
// Customize Blockly code to 'C' - ends