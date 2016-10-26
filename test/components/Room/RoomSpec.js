'use strict';

import {shallow} from 'enzyme';
import React from 'react';
import Room from 'components/Room/Room';
import getStorage from '../../getStorage';

import R from 'ramda';

describe('Room', () => {
  it('render room controls', () => {
    const room = getStorage().data.rooms[0];
    const wrapper = shallow(<Room {...room}/>);
    const switches = wrapper.find('.room Switch');


    const compExtraProps = {roomId: room._id};
    expect(switches.length).to.be.equal(2);
    expect(switches.at(0).props()).to.be.deep.equal(
      R.merge(room.controls[0], compExtraProps)
    );

    expect(switches.at(1).props()).to.be.deep.equal(
      R.merge(room.controls[1], compExtraProps)
    );

    const temperature = wrapper.find('.room Temperature');
    expect(temperature.length).to.be.equal(1);
    expect(temperature.at(0).props()).to.be.deep.equal(
      R.merge(room.controls[2], compExtraProps)
    );
  });
});
