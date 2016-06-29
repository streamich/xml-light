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
function xml(pojo) {
    var inner = [];
    for (var i = 2; i < pojo.length; i++) {
        var child = pojo[i];
        inner.push(child instanceof Array ? xml.call(null, child) : child);
    }
    var name = pojo[0], attributes = pojo[1];
    var attr = formatAttr(attributes || null);
    var body = inner.join('');
    return ("<" + name + (attr ? ' ' + attr : '')) + (body ? ">" + body + "</" + name + ">" : '/>');
}
exports.xml = xml;
// var html =
//     _('div', {'class': 'wrapper'},
//         _('div', {'class': 'avatar'},
//             _('img', {src: '...'}),
//             _('span', {},
//                 'Hello there'
//             ),
//             _('br')
//         )
//     );
// console.log(html);
//
// var pojo =
//     ['div', {'class': 'wrapper'},
//         ['div', {'class': 'avatar'},
//             ['img', {src: '...'}],
//             ['span', null,
//                 'Hello there'
//             ],
//             ['br'],
//         ],
//     ];
// console.log(xml(pojo));
