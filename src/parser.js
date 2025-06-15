function parseCSSlite(input) {
    const lines = input.trim().split('\n');
    let css = '';
    let selector = '';
    let insideSelector = false;

    for (let line of lines) {
        if (!line.trim()) continue;

        if (!line.startsWith(' ') && line.endsWith(':')) {
            if (insideSelector) css += '}\n';
            selector = line.trim().slice(0, -1);
            css += `${selector} {\n`;
            insideSelector = true;
        } else if (insideSelector) {
            const propLine = line.trim();
            if (!propLine.includes('=')) continue;
            let [prop, val] = propLine.split('=').map(s => s.trim());

            if (prop === 'size') prop = 'font-size';
            if (prop === 'weight') prop = 'font-weight';
            if (prop === 'bg') prop = 'background-color';

            if (['font-size', 'margin', 'padding', 'top', 'left', 'right', 'bottom'].includes(prop)) {
                if (!val.match(/[a-z%]+$/)) val += 'px';
            }

            css += `  ${prop}: ${val};\n`;
        }
    }
    if (insideSelector) css += '}\n';
    return css;
}

module.exports = { parseCSSlite };
