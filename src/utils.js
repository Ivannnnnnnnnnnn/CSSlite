// Normalize property names from CSSlite to real CSS
function normalizeProperty(prop) {
    const map = {
        size: 'font-size',
        weight: 'font-weight',
        bg: 'background-color'
    };
    return map[prop] || prop;
}

function appendPxIfNeeded(prop, val) {
    const needsPx = [
        'font-size',
        'margin',
        'padding',
        'top',
        'left',
        'right',
        'bottom',
        'width',
        'height'
    ];

    if (needsPx.includes(prop) && !/[a-z%]+$/i.test(val)) {
        return val + 'px';
    }
    return val;
}

function isSelectorLine(line) {
    return line.trim().endsWith(':') && !line.startsWith(' ');
}

function parsePropertyLine(line) {
    if (!line.includes('=')) return null;
    const [key, value] = line.split('=').map(s => s.trim());
    return { key, value };
}

module.exports = {
    normalizeProperty,
    appendPxIfNeeded,
    isSelectorLine,
    parsePropertyLine
};
