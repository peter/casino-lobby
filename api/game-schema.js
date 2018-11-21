module.exports = {
  'type': 'object',
  'required': [
    'id',
    'status',
    'gameProvider',
    'startType',
    'isFreeplayAllowed',
    'nextOpeningTimeUtc',
    'nextClosingTimeUtc',
    'openingTimeUtc',
    'closingTimeUtc',
    'showIsLeavingJurisdiction',
    'allowedOrientation',
    'tags',
    'gameCollectionIds',
    'gameId',
    'name',
    'width',
    'height',
    'description',
    'themeUrl',
    'thumbnailUrl',
    'helpUrl',
    'trivia',
    'seoName',
    'friendlyName'
  ],
  'properties': {
    'id': {
      'type': 'string',
      'examples': [
        '1_can_2_can_ogs'
      ],
      'pattern': '^(.*)$'
    },
    'status': {
      'type': 'string',
      'examples': [
        'ACTIVE'
      ],
      'pattern': '^(.*)$'
    },
    'gameProvider': {
      'type': 'string',
      'examples': [
        'OGS'
      ],
      'pattern': '^(.*)$'
    },
    'startType': {
      'type': 'string',
      'examples': [
        'IFRAME'
      ],
      'pattern': '^(.*)$'
    },
    'isFreeplayAllowed': {
      'type': 'boolean',
      'examples': [
        true
      ]
    },
    'nextOpeningTimeUtc': {
      'type': 'null',
      'examples': [
        null
      ]
    },
    'nextClosingTimeUtc': {
      'type': 'null',
      'examples': [
        null
      ]
    },
    'openingTimeUtc': {
      'type': 'null',
      'examples': [
        null
      ]
    },
    'closingTimeUtc': {
      'type': 'null',
      'examples': [
        null
      ]
    },
    'showIsLeavingJurisdiction': {
      'type': 'boolean',
      'examples': [
        false
      ]
    },
    'allowedOrientation': {
      'type': 'string',
      'examples': [
        'PORTRAIT'
      ],
      'pattern': '^(.*)$'
    },
    'tags': {
      'type': 'array',
      'items': {
        'type': 'string',
        'examples': [
          'SLOT'
        ],
        'pattern': '^(.*)$'
      }
    },
    'gameCollectionIds': {
      'type': 'array',
      'items': {
        'type': 'string',
        'examples': [
          'slots',
          'allgames',
          'All-Games-A-Z'
        ],
        'pattern': '^(.*)$'
      }
    },
    'gameId': {
      'type': 'string',
      'examples': [
        '1_can_2_can_ogs'
      ],
      'pattern': '^(.*)$'
    },
    'name': {
      'type': 'string',
      'examples': [
        '1 Can 2 Can'
      ],
      'pattern': '^(.*)$'
    },
    'width': {
      'type': 'integer',
      'default': 0,
      'examples': [
        1066
      ]
    },
    'height': {
      'type': 'integer',
      'default': 0,
      'examples': [
        600
      ]
    },
    'description': {
      'type': 'string',
      'examples': [
        'Jag kan, du kan... Tukan! Ta en promenad på den vilda sidan och besök Tukanen och hans vänners värld.  Detta orörda djungelparadis är fylld med färger, roliga frukter, vänliga djur och en Tukan som kommer driva ditt spel vilt med spänning.'
      ],
      'pattern': '^(.*)$'
    },
    'themeUrl': {
      'type': 'string',
      'examples': [
        'https://casino.mrgreen.com/globalassets/games/backgrounds/1can2can_background_theme.jpg'
      ],
      'pattern': '^(.*)$'
    },
    'thumbnailUrl': {
      'type': 'string',
      'examples': [
        'https://casino.mrgreen.com/globalassets/mrgreen/thumbnails-new-2x/1can2can.png'
      ],
      'pattern': '^(.*)$'
    },
    'helpUrl': {
      'type': 'string',
      'examples': [
        ''
      ],
      'pattern': '^(.*)$'
    },
    'trivia': {
      'type': 'array',
    },
    'seoName': {
      'type': 'string',
      'examples': [
        '1-can-2-can'
      ],
      'pattern': '^(.*)$'
    },
    'friendlyName': {
      'type': 'string',
      'examples': [
        '1-can-2-can'
      ],
      'pattern': '^(.*)$'
    }
  },
  'additionalProperties': false
}
