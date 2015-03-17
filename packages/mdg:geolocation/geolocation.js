// is location refreshing currently on?
var watchingPosition = false;

// current location variable and dependency
var location = new ReactiveVar(null);

// current location variable and dependency
var isReady = new ReactiveVar(false);

// error variable and dependency
var error = new ReactiveVar(null);

// options for watchPosition
var options = {
  enableHighAccuracy: true,
  maximumAge: 0
};

var onError = function (newError) {
  error.set(newError);
  isReady.set(true);
};

var onPosition = function (newLocation) {
  location.set(newLocation);
  error.set(null);
  isReady.set(true);
};

var startWatchingPosition = function () {
  if (! watchingPosition && navigator.geolocation) {
    isReady.set(false);
    navigator.geolocation.watchPosition(onPosition, onError, options);
    watchingPosition = true;
  }
};

// exports

/**
 * @summary The namespace for all geolocation functions.
 * @namespace
 */
Geolocation = {
  /**
   * @summary Get the current geolocation error
   * @return {PositionError} The
   * [position error](https://developer.mozilla.org/en-US/docs/Web/API/PositionError)
   * that is currently preventing position updates.
   */
  error: function () {
    startWatchingPosition();
    return error.get();
  },

  /**
   * @summary Get the current location
   * @return {Position | null} The
   * [position](https://developer.mozilla.org/en-US/docs/Web/API/Position)
   * that is reported by the device, or null if no position is available.
   */
  currentLocation: function () {
    startWatchingPosition();
    return location.get();
  },
  // simple version of location; just lat and lng
  
  /**
   * @summary Get the current latitude and longitude
   * @return {Object | null} An object with `lat` and `lng` properties,
   * or null if no position is available.
   */
  latLng: function () {
    var loc = Geolocation.currentLocation();

    if (loc) {
      return {
        lat: loc.coords.latitude,
        lng: loc.coords.longitude
      };
    }

    return null;
  },
  
  isReady: function() {
    return isReady.get();
  }
  
};
