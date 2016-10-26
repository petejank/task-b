'use strict';

import dataApiInject from 'inject!other/dataApi';
import getStorage from '../getStorage';

describe('dataApi', () => {
  let dataApi, Qstub, QreturnStub, notifyStub, resolveStub, promiseStub, clearIntervalStub, setIntervalStub, storage;

  beforeEach(() => {
    Qstub = sinon.stub().returns(QreturnStub = sinon.stub());
    Qstub.defer = sinon.stub().returns({
      notify: notifyStub = sinon.stub(),
      resolve: resolveStub = sinon.stub(),
      promise: promiseStub = sinon.stub()
    });

    dataApi= dataApiInject({
      './storage': storage = getStorage(),
      'q': Qstub,
      './window': {
        clearInterval: clearIntervalStub = sinon.stub(),
        setInterval: setIntervalStub = sinon.stub().returns(1)
      }
    }).default;
  });

  it('{getRooms} returns clone of storage', () => {
    expect(dataApi.getRooms()).to.be.equal(QreturnStub);
    expect(Qstub.args[0][0]).to.be.deep.equal(storage.data);
    expect(Qstub.args[0][0]).to.not.be.equal(storage.data)
  });

  it('{toggleRoomSwitch} toggles control active state', () => {
    expect(dataApi.toggleRoomSwitch(0, 0)).to.be.equal(QreturnStub);
    expect(storage.data.rooms[0].controls[0].active).to.be.false;
    expect(Qstub).to.be.calledWith(false);

    dataApi.toggleRoomSwitch(0, 0);
    expect(storage.data.rooms[0].controls[0].active).to.be.true;
    expect(Qstub).to.be.calledWith(true);
  });

  it('{setRoomTemperature} decrease temperature by 1 when desired lower than current', () => {
    const current = storage.data.rooms[0].controls[2].current;
    const tempPromise = dataApi.setRoomTemperature(0, 2, 20);
    const intervalFn = setIntervalStub.args[0][0];

    expect(tempPromise).to.be.equal(promiseStub);
    expect(storage.data.rooms[0].controls[2].interval).to.be.equal(1);
    expect(setIntervalStub.args[0][1]).to.be.equal(1000);

    intervalFn();
    expect(notifyStub).to.be.calledWith(current - 1);
  });

  it('{setRoomTemperature} increase temperature by 1 when desired higher than current', () => {
    const current = storage.data.rooms[0].controls[2].current;
    const tempPromise = dataApi.setRoomTemperature(0, 2, 25);
    const intervalFn = setIntervalStub.args[0][0];

    expect(tempPromise).to.be.equal(promiseStub);
    expect(storage.data.rooms[0].controls[2].interval).to.be.equal(1);
    expect(setIntervalStub.args[0][1]).to.be.equal(1000);

    intervalFn();
    expect(notifyStub).to.be.calledWith(current + 1);
  });

  it('{setRoomTemperature} will resolve promise when desired temperature below minimum', () => {
    const tempPromise = dataApi.setRoomTemperature(0, 2, 10);
    const intervalFn = setIntervalStub.args[0][0];

    expect(tempPromise).to.be.equal(promiseStub);
    expect(storage.data.rooms[0].controls[2].interval).to.be.equal(1);
    expect(setIntervalStub.args[0][1]).to.be.equal(1000);

    intervalFn();
    expect(resolveStub).to.be.calledOnce;
    expect(clearIntervalStub).to.be.calledOnce;
    expect(clearIntervalStub).to.be.calledWith(1);
  });

  it('{setRoomTemperature} will resolve promise when desired temperature above maximum', () => {
    const tempPromise = dataApi.setRoomTemperature(0, 2, 26);
    const intervalFn = setIntervalStub.args[0][0];

    expect(tempPromise).to.be.equal(promiseStub);
    expect(storage.data.rooms[0].controls[2].interval).to.be.equal(1);
    expect(setIntervalStub.args[0][1]).to.be.equal(1000);

    intervalFn();
    expect(resolveStub).to.be.calledOnce;
    expect(clearIntervalStub).to.be.calledOnce;
    expect(clearIntervalStub).to.be.calledWith(1);
  });

  it('{setRoomTemperature} will clear interval attached to control if any is present', () => {
    storage.data.rooms[0].controls[2].interval = 555;
    const tempPromise = dataApi.setRoomTemperature(0, 2, 25);
    const intervalFn = setIntervalStub.args[0][0];

    expect(tempPromise).to.be.equal(promiseStub);
    expect(clearIntervalStub).to.be.calledOnce;
    expect(clearIntervalStub).to.be.calledWith(555);
  });
});
