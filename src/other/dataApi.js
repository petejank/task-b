'use strict';

import storage from './storage';
import Q from 'q';
import R from 'ramda';
import window from './window';

const TEMP_NOTIFY_INTERVAL = 1000;

// Some server-like magic
export default {
  getRooms() {
    return Q(R.clone(storage.data));
  },
  toggleRoomSwitch(roomId, controlId) {
    const control = getControl(roomId, controlId, storage.data.rooms);
    return Q(control.active = !control.active);
  },
  setRoomTemperature(roomId, controlId, desiredTemp) {
    const control = getControl(roomId, controlId, storage.data.rooms);
    const deferred = Q.defer();

    // Simulation of delayed temperature increase on back-end side in real-world
    control.interval && window.clearInterval(control.interval);

    control.interval = window.setInterval(() => {
      if (control.current != desiredTemp && desiredTemp >= control.min && desiredTemp <= control.max) {
        deferred.notify(control.current = desiredTemp < control.current ? --control.current : ++control.current);
      } else {
        deferred.resolve();
        window.clearInterval(control.interval);
      }
    }, TEMP_NOTIFY_INTERVAL);

    return deferred.promise;
  }
};

function getControl(roomId, controlId, rooms) {
   return R.find(R.propEq('_id', controlId), R.find(R.propEq('_id', roomId), rooms).controls);
}
