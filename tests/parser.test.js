const { parseCSSlite } = require('../src/parser');

test('parses basic CSSlite', () => {
    const input = `
    h1:
      color = red
      size = 20
  `;
    const output = parseCSSlite(input);
    expect(output).toContain('h1 {');
    expect(output).toContain('color: red;');
    expect(output).toContain('font-size: 20px;');
});

test('ignores invalid lines', () => {
    const input = `
    p:
      invalid line
      color = blue
  `;
    const output = parseCSSlite(input);
    expect(output).toContain('p {');
    expect(output).toContain('color: blue;');
    expect(!output.includes('invalid')).toBe(true);
});
