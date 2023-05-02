import React, { useState } from 'react'
import "../components/styles/Home.css"
import "leaflet/dist/leaflet.css"

import * as Constants from "../components/constants/Constants.js";

import { MapContainer, TileLayer, Marker,Popup } from 'react-leaflet';
import  MarkerClusterGroup  from 'react-leaflet-cluster';


export default function Home() {

  const [currentPostion,setCurrentPostion]=useState([22.5726,88.3639]);
  const [zoomLevel,setZoomLevel]=useState(7);

  const successCallback = (position) => {
      console.log(position);
      setCurrentPostion([position.coords.latitude,position.coords.longitude]);
      setZoomLevel(13);
      window.alert(currentPostion+" "+position.coords.accuracy);
     };
  
  const errorCallback = (error) => {  console.log(error); };
  
  const getLocation =() => {
      navigator.geolocation.getCurrentPosition(successCallback, errorCallback );
    }


  const markers=[
        { 
          geocode: [23.6889, 86.9661],
          popUp: "popUp 1"
        },
        { 
          geocode: [23.6234,87.1143],
          popUp: "popUp 2"
        },
        { 
          geocode: [23.5204, 87.3119],
          popUp: "popUp 3"
        }   
      ]

  
  
  return (
    <>
      <h2>Home Page</h2>


      <MapContainer className='mapBox' center={currentPostion} zoom={zoomLevel} scrollWheelZoom={false}  style={{ height: "100vh" }}>
          <TileLayer   url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" 
              attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
               />
        

        <button type='button' className="btn go-to-top" onClick={ () => {window.scrollTo(0, 0)}}>top^</button>
        <button type='button' className="btn go-to-bottom" onClick={ () => {window.scrollTo(0, document.body.scrollHeight)}}>bottom</button>
        <button type='button'className="btn btn-primary live-location"  onClick={getLocation}>Live</button>
       
        <MarkerClusterGroup>
             {markers.map((marker,index)=>{
               return (
                <Marker position={marker.geocode} icon={Constants.locationIcon} key={index}> <Popup>{marker.popUp}</Popup></Marker>
               ); 
              })}
              
        </MarkerClusterGroup>

         <Marker position={currentPostion} icon={Constants.liveLocationIcon}><Popup>You are here</Popup></Marker>
       

      </MapContainer>
    </>
  )
}
