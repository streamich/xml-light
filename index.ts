

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



// export function xml(pojo) {
//     var inner = [];
//     for(var i = 2; i < pojo.length; i++) {
//         var child = pojo[i];
//         inner.push(child instanceof Array ? xml.call(null, child) : child);
//     }
//
//     var [name, attributes] = pojo;
//     var attr = formatAttr(attributes || null);
//
//     var body = inner.join('');
//     return `<${name}${attr ? ' ' + attr : ''}` + (body ? `>${body}</${name}>` : '/>');
// }

declare var React: any;
export function xml(pojo, h = _) {
    var list = [pojo[0], pojo[1] || null];
    // Add children
    for(var i = 2; i < pojo.length; i++) {
        var child = pojo[i];
        list.push(typeof child === 'object' ? xml(child, h) : child);
    }
    return h.apply(null, list);
}
