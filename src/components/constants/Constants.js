import {Icon} from 'leaflet';

const locationIcon =new Icon({
    iconUrl: require("../../images/location-icon.png"),
    iconSize: [38,38]
  });
  const liveLocationIcon =new Icon({
    iconUrl: require("../../images/user.png"),
    iconSize: [38,38]
  });
  


export {locationIcon,liveLocationIcon};
