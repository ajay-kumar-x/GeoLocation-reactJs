import {Icon} from 'leaflet';

const locationIcon =new Icon({
    iconUrl: require("../../images/location-icon.png"),
    iconSize: [38,38]
  });
  const liveLocationIcon =new Icon({
    iconUrl: require("../../images/user.png"),
    iconSize: [38,38]
  });


 
  const markers=[
    { 
      geocode: [23.6889, 86.9661],
      popUp: "Hello from Asansol"
    },
    { 
      geocode: [23.6234,87.1143],
      popUp: "Hello from Raniganj"
    },
    { 
      geocode: [23.5204, 87.3119],
      popUp: "Hello from Durgapur"
    }   
  ]


export {locationIcon,liveLocationIcon,markers};

















const getAccurateCurrentPosition =  ( options) =>{
  var lastCheckedPosition,
      locationEventCount = 0,
      watchID,
      timerID;

  options = options || {};

  var checkLocation = function (position) {
      lastCheckedPosition = position;
      locationEventCount = locationEventCount + 1;
      // We ignore the first event unless it's the only one received because some devices seem to send a cached
      // location even when maxaimumAge is set to zero
      if ((position.coords.accuracy <= options.desiredAccuracy) && (locationEventCount > 1)) {
          clearTimeout(timerID);
          navigator.geolocation.clearWatch(watchID);
          foundPosition(position);
      } else {
          geoprogress(position);
      }
  };

  var stopTrying = function () {
      navigator.geolocation.clearWatch(watchID);
      foundPosition(lastCheckedPosition);
  };

  var onError = function (error) {
      clearTimeout(timerID);
      navigator.geolocation.clearWatch(watchID);
      geolocationError(error);
  };

  var foundPosition = function (position) {
      geolocationSuccess(position);
  };

  if (!options.maxWait)            options.maxWait = 10000; // Default 10 seconds
  if (!options.desiredAccuracy)    options.desiredAccuracy = 20; // Default 20 meters
  if (!options.timeout)            options.timeout = options.maxWait; // Default to maxWait

  options.maximumAge = 0; // Force current locations only
  options.enableHighAccuracy = true; // Force high accuracy (otherwise, why are you using this function?)

  watchID = navigator.geolocation.watchPosition(checkLocation, onError, options);
  timerID = setTimeout(stopTrying, options.maxWait); // Set a timeout that will abandon the location loop
};

//The following code should go in your controller

  function geolocationSuccess(position) {
    window.alert(position.coords.latitude);
    window.alert(position.coords.longitude);
  }

  function geolocationError(error) {
      window.alert('code: '    + error.code    + '\n' +
            'message: ' + error.message + '\n');
  }
  function geoprogress(posiriton){
    console.log("processing");
  }



  export {getAccurateCurrentPosition};