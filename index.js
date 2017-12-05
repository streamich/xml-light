"use strict";
function formatAttr(attributes) {
    var attr = [];
    for (var prop in attributes) {
        var value = attributes[prop];
        if (typeof value === 'number')
            attr.push(prop + "=\"" + value + "\"");
        if (typeof value === 'string')
            attr.push(prop + "=\"" + value.replace(/[\"]/g, '\\"') + "\"");
        if (typeof value === 'boolean')
            attr.push(prop + "=\"" + (value ? '1' : '0') + "\"");
    }
    return attr.join(' ');
}
exports.formatAttr = formatAttr;
function _(name, attributes) {
    if (attributes === void 0) { attributes = {}; }
    var children = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        children[_i - 2] = arguments[_i];
    }
    var attr = formatAttr(attributes);
    var body = children.join('');
    return ("<" + name + (attr ? ' ' + attr : '')) + (body ? ">" + body + "</" + name + ">" : '/>');
}
exports._ = _;
function xml(pojo, h) {
    if (h === void 0) { h = _; }
    var list = [pojo[0], pojo[1] || null];
    // Add children
    for (var i = 2; i < pojo.length; i++) {
        var child = pojo[i];
        function c(child) {
            if (child instanceof Array) {
                // This flattens an array of children, makes compatible with React.
                if (child[0] instanceof Array)
                    for (var j = 0; j < child.length; j++)
                        c(child[j]);
                else
                    list.push(xml(child, h));
            }
            else
                list.push(child);
        }
        c(child);
    }
    return h.apply(null, list);
}
exports.xml = xml;
