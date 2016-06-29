# xml-light

Simple functions to generate XML/HTML in JavaScript.

Usage:

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

Or:

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

