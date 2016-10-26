'use strict';

export default function getStorage() {
  return {
    'data': {
      houseName: 'Residence',
      rooms: [
        {
          _id: 0,
          name: 'Living room',
          controls: [
            {
              _id: 0,
              type: 'switch',
              group: 'opened',
              name: 'courtains',
              active: true
            },
            {
              _id: 1,
              type: 'switch',
              group: 'enabled',
              name: 'lights',
              active: true
            },
            {
              _id: 2,
              type: 'temperature',
              name: 'temperature',
              current: 22,
              max: 25,
              min: 15
            }
          ]
        },
        {
          _id: 1,
          name: 'Basement',
          controls: [
            {
              _id: 0,
              type: 'switch',
              group: 'opened',
              name: 'hidden cellar',
              active: false
            },
            {
              _id: 1,
              type: 'switch',
              group: 'enabled',
              name: 'red lights',
              active: false
            },
            {
              _id: 2,
              type: 'temperature',
              name: 'temperature',
              current: 12,
              max: 20,
              min: 10
            }
          ]
        }
      ]
    }
  };
};
