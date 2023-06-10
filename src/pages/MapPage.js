import React, { useEffect, useRef, useState } from "react";
import {MapContainer,Marker,Popup,TileLayer} from "react-leaflet";
import "leaflet/dist/leaflet.css"
import L from 'leaflet';
import { Col, message } from "antd";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../redux/alertSlice";
import { getAllJobs } from "../apis/jobs";

L.Icon.Default.imagePath = "https://unpkg.com/leaflet@1.5.0/dist/images/";

const MapPage = ()=>{
  const[center]=useState({lat:43.222087105720895,lng: 76.85351669184728});
  const zoom_level=10;
  const mapRef=useRef();

  return(
    <>
    <div className="row">
      <div className="col text-center">
        <div className="col">
          <MapContainer center={center} zoom={zoom_level} ref={mapRef} style={{height:'80vh'}}>
          <TileLayer 
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={center}>
            <Popup>
              Python Developer
            </Popup>
          </Marker>
          </MapContainer>
        </div>
      </div>
    </div>
    </>
  );
}
export default MapPage;