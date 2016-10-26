'use strict';

// Server data storage
export default {
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
      },
      {
        _id: 2,
        name: 'Bathroom',
        controls: [
          {
            _id: 0,
            type: 'switch',
            group: 'opened',
            name: 'door',
            active: false
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
            current: 20,
            max: 30,
            min: 15
          }
        ]
      },
      {
        _id: 3,
        name: 'Fun room',
        controls: [
          {
            _id: 0,
            type: 'switch',
            group: 'opened',
            name: 'drink bar',
            active: true
          },
          {
            _id: 1,
            type: 'switch',
            group: 'enabled',
            name: 'party lights',
            active: true
          },
          {
            _id: 2,
            type: 'temperature',
            name: 'temperature',
            current: 20,
            max: 25,
            min: 15
          }
        ]
      },
      {
        _id: 4,
        name: 'Cellar',
        controls: [
          {
            _id: 0,
            type: 'switch',
            group: 'opened',
            name: 'trap door',
            active: true
          },
          {
            _id: 1,
            type: 'switch',
            group: 'enabled',
            name: 'lights',
            active: false
          },
          {
            _id: 2,
            type: 'temperature',
            name: 'temperature',
            current: 18,
            max: 20,
            min: 10
          }
        ]
      },
      {
        _id: 5,
        name: 'Kitchen',
        controls: [
          {
            _id: 0,
            type: 'switch',
            group: 'opened',
            name: 'courtains',
            active: false
          },
          {
            _id: 1,
            type: 'switch',
            group: 'enabled',
            name: 'lights',
            active: false
          },
          {
            _id: 2,
            type: 'temperature',
            name: 'temperature',
            current: 25,
            max: 30,
            min: 10
          }
        ]
      }
    ]
  }
};
