import React, { useState } from 'react'
import "../components/styles/Home.css"
import "leaflet/dist/leaflet.css"

import * as Constants from "../components/constants/Constants.js";

import { MapContainer, TileLayer, Marker,Popup } from 'react-leaflet';
import  MarkerClusterGroup  from 'react-leaflet-cluster';


export default function Home() {

  const [currentPostion,setCurrentPostion]=useState(null);

  const successCallback = (position) => {
      console.log(position);
      setCurrentPostion([position.coords.latitude,position.coords.longitude]);
      window.alert(currentPostion+" "+position.coords.accuracy);
     };
  
  const errorCallback = (error) => { 
    alert(`ERROR(${error.code}): ${error.message}`);
  };
  
  const getLocation =() => {
    
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(successCallback, errorCallback, {enableHighAccuracy: true,timeout: 5000,maximumAge: 0});
    }else{
      alert("hi");
    } 
    }


  
  return (
    <>
      <h2>Home Page</h2>


      <MapContainer className='mapBox' center={[22.5726,88.3639]} zoom={7} scrollWheelZoom={false}  style={{ height: "100vh",  borderRadius: '2rem'}}>
          <TileLayer   url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" 
              attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          />
        

        <button type='button' className="btn go-to-top" onClick={ () => {window.scrollTo(0, 0)}}>top^</button>
        <button type='button' className="btn go-to-bottom" onClick={ () => {window.scrollTo(0, document.body.scrollHeight)}}>bottom</button>
        <button type='button'className="btn btn-primary live-location"  onClick={getLocation}>Live</button>
       
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
