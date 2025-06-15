const {
    normalizeProperty,
    appendPxIfNeeded,
    isSelectorLine,
    parsePropertyLine
} = require('./utils');

function parseCSSlite(input) {
    const lines = input.trim().split('\n');
    let css = '';
    let selector = '';
    let insideSelector = false;

    for (let rawLine of lines) {
        const line = rawLine.trim();
        if (!line) continue;

        if (isSelectorLine(rawLine)) {
            if (insideSelector) css += '}\n';
            selector = line.slice(0, -1);
            css += `${selector} {\n`;
            insideSelector = true;
        } else if (insideSelector) {
            const parsed = parsePropertyLine(line);
            if (!parsed) continue;

            let prop = normalizeProperty(parsed.key);
            let val = appendPxIfNeeded(prop, parsed.value);

            css += `  ${prop}: ${val};\n`;
        }
    }

    if (insideSelector) css += '}\n';

    return css;
}

module.exports = { parseCSSlite };
