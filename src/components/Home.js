import React, { useState } from 'react'
import "../components/styles/Home.css"
import "leaflet/dist/leaflet.css"

import * as Constants from "../components/constants/Constants.js";

import { MapContainer, TileLayer, Marker,Popup } from 'react-leaflet';
import  MarkerClusterGroup  from 'react-leaflet-cluster';


export default function Home() {

  const [currentPostion,setCurrentPostion]=useState(null);
  const[liveLocationButtonClass,setLiveLocationButtonClass] =useState('btn btn-secondary');
  const[isLiveLocationButtonDisabled,setIsLiveLocationButtonDisabled]=useState(false);
  let liveLocationId;

  const successCallback = (position) => {

      setCurrentPostion([position.coords.latitude,position.coords.longitude]);
      console.log(currentPostion+" "+position.coords.accuracy);
    
      setLiveLocationButtonClass('btn btn-primary');
      setIsLiveLocationButtonDisabled(true);
      // if(position.coords.latitude=== 'sometargetllatitude', position.coords.longitude=== 'sometargetlongitude')
      // {
      //   navigator.geolocation.clearWatch(liveLocationId);
      // }
         
     };
  
  const errorCallback = (error) => { 
    alert(`ERROR(${error.code}): ${error.message}`);
  };
  
  const getLiveLocation =() => {
    
      if(navigator.geolocation){
        liveLocationId = navigator.geolocation.watchPosition(successCallback, errorCallback, {enableHighAccuracy: true,timeout: 5000,maximumAge: 0});
      }else{
        alert("Please Allow Location Permission");
        setLiveLocationButtonClass('btn btn-secondary');
        setIsLiveLocationButtonDisabled(false);
      }
    }


  
  return (
    <>
      <h2>Home Page</h2>


      <MapContainer className='mapBox' center={[22.5726,88.3639]} zoom={7} scrollWheelZoom={false}  style={{ height: "100vh",  borderRadius: '2rem'}}>
          <TileLayer   url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" 
              attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          />
        

        <button type='button' className="btn btn-info go-to-top" onClick={ () => {window.scrollTo(0, 0)}}>^</button>
        <button type='button' id="live-location-btn" className={liveLocationButtonClass} disabled={isLiveLocationButtonDisabled} onClick={getLiveLocation}>Live</button>
       
        <MarkerClusterGroup>
             {Constants.markers.map((marker,index)=>{
               return (
                <Marker position={marker.geocode} icon={Constants.locationIcon} key={index}> <Popup>{marker.popUp}</Popup></Marker>
               ); 
              })}
              
        </MarkerClusterGroup>

        {
        currentPostion !=null && <Marker position={currentPostion} icon={Constants.liveLocationIcon}><Popup><h1>You are here</h1></Popup></Marker>
        }
      

      </MapContainer>
    </>
  )
}
