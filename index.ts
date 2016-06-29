

export type Tname = string;
export type Tattributes = {[s: string]: number|string|boolean};
export type Tchild = any; // `any` just becase TypeScript does not allow circular references.
export type Ttag = [Tname, Tattributes, Tchild[]];


export function formatAttr(attributes) {
    var attr = [];
    for(var prop in attributes) {
        var value = attributes[prop];
        if(typeof value === 'number')   attr.push(`${prop}="${value}"`);
        if(typeof value === 'string')   attr.push(`${prop}="${(value as string).replace(/[\"]/g, '\\"')}"`);
        if(typeof value === 'boolean')  attr.push(`${prop}="${value ? '1' : '0'}"`);
    }
    return attr.join(' ');
}


export function _(name: string, attributes: Tattributes = {}, ...children: string[]): string {
    var attr = formatAttr(attributes);
    var body = children.join('');
    return `<${name}${attr ? ' ' + attr : ''}` + (body ? `>${body}</${name}>` : '/>');
}


export function xml(pojo) {
    var inner = [];
    for(var i = 2; i < pojo.length; i++) {
        var child = pojo[i];
        inner.push(child instanceof Array ? xml.call(null, child) : child);
    }

    var [name, attributes] = pojo;
    var attr = formatAttr(attributes || null);

    var body = inner.join('');
    return `<${name}${attr ? ' ' + attr : ''}` + (body ? `>${body}</${name}>` : '/>');
}

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
