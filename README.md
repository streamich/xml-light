# xml-light

Simple functions to generate XML/HTML in JavaScript.

Super compact package at less than 40 lines of code.

## Virtual Hypertext

Use the Virtual Hypertext `_` method.

    _(tag: string, attributes: {}, ...children: string[]): string;
    
Example:

```js
var xml = require('xml-light');
var _ = xml._;

var html =
    _('div', {'class': 'wrapper'},
        _('div', {'class': 'avatar'},
            _('img', {src: '...'}),
            _('span', {},
                'Hello there'
            ),
            _('br')
        )
    );
console.log(html);
//<div class="wrapper"><div class="avatar"><img src="..."/><span>Hello there</span><br/></div></div>
```

## POJO

Create XML from a plain JavaScript Array object, where first element is the name
of XML tag, the second is an object of attributes and the rest of the elements of 
the array are its children nodes.

    type VNode = [tag: string, attributes: {}, ...children: VNode[]];
    xml(root: VNode, h = _);

Example:

```js
var xml = require('xml-light').xml;

var pojo =
    ['div', {'class': 'wrapper'},
        ['div', {'class': 'avatar'},
            ['img', {src: '...'}],
            ['span', null,
                'Hello there'
            ],
            ['br'],
        ],
    ];
console.log(xml(pojo));
// <div class="wrapper"><div class="avatar"><img src="..."/><span>Hello there</span><br/></div></div>
```

## React

The second argument to the `xml` function is a virtual hypertext generator function, you can provide
`React.createElement.bind(React)` to it to generate React virtual DOM.

Generate React Virtual DOM representations from POJO lists instead of using `React.createElement` or `.jsx`
files and compiling them to `.js`. 

```js
var xml = require('xml-light').xml;
var react_dom = xml(
    ['div', {className: 'test'},
        ['span', null,
            'Hello world!'
        ]
    ], React.createElement.bind(React)
);
```

This is equivalent to:

```js
var react_dom = React.createElement('div', {className: 'test'},
    React.createElement('span', null, 'Hello world!'));
```
