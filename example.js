var xml = require('./index');
var _ = xml._;


var html =
    _('div', {'class': 'wrapper'},
        _('div', {'class': 'avatar'},
            _('img', {src: '...'}),
            'Text',
            _('span', {},
                'Hello there'
            ),
            _('br')
        )
    );
console.log(html);


var pojo =
    ['div', {'class': 'wrapper'},
        ['div', {'class': 'avatar'},
            ['img', {src: '...'}],
            'Text',
            ['span', null,
                'Hello there'
            ],
            ['br'],
        ],
    ];
console.log(xml.xml(pojo));


React = {
    createElement: function() {
        return (arguments);
    }
};
console.log(xml.xml(pojo, React.createElement.bind(React)));
console.log(xml.xml(pojo, _));
