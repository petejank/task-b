'use strict';

import {shallow} from 'enzyme';
import React from 'react';
import RoomContainerInject from 'inject!components/Room/RoomContainer';
import getStorage from '../../getStorage';

describe('RoomContainer', () => {
  it('set initial state on init', () => {
    const RoomContainer = RoomContainerInject({
      'other/dataApi': {
        getRooms: () => ({then: () => {}})
      }
    }).default;

    const wrapper = shallow(<RoomContainer/>);
    expect(wrapper.state()).to.be.deep.equal({houseData: null});
  });

  it('on {componentWillMount} get rooms data and render them afterwards', () => {
    const getRoomsStub = sinon.stub().returns({
      then: (fn) => fn(getStorage().data)
    });

    const RoomContainer = RoomContainerInject({
      'other/dataApi': {
        getRooms: getRoomsStub
      }
    }).default;

    const wrapper = shallow(<RoomContainer/>);
    expect(getRoomsStub).to.be.calledOnce;

    const storage = getStorage().data;
    const rooms = wrapper.find('.room-container Room');

    expect(rooms.length).to.be.equal(2);
    expect(rooms.at(0).props()).to.be.deep.equal(storage.rooms[0]);
    expect(rooms.at(1).props()).to.be.deep.equal(storage.rooms[1]);
  });
});
