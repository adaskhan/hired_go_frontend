import React, { useEffect, useRef, useState } from "react";
import {MapContainer,Marker,Popup,TileLayer} from "react-leaflet";
import "leaflet/dist/leaflet.css"
import L from 'leaflet';
import { Col, message } from "antd";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../redux/alertSlice";
import { getAllJobs } from "../apis/jobs";

L.Icon.Default.imagePath = "https://unpkg.com/leaflet@1.5.0/dist/images/";

const KaspiIcon=new L.Icon({
  iconUrl: require("../../src/images/kaspi.png"),
  iconSize: [35,35],
});

const JusanIcon=new L.Icon({
  iconUrl: require("../../src/images/jusan.png"),
  iconSize: [35,35],
});

const HalykIcon=new L.Icon({
  iconUrl: require("../../src/images/halyk.png"),
  iconSize: [35,35],
});
const ForteIcon=new L.Icon({
  iconUrl: require("../../src/images/forte.png"),
  iconSize: [35,35],
});

const MapPage = ()=>{
  const[center]=useState({lat:43.2368028265146,lng:  76.94567311237346});
  const zoom_level=13;
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
          <Marker 
              position={[43.241299073684985, 76.93217514121281]} 
              icon={KaspiIcon}>
            <Popup>
              Python Developer
            </Popup>
          </Marker>
          <Marker 
              position={[43.23211445630239, 76.94542521033426]} 
              icon={JusanIcon}>
            <Popup>
              Java Developer
            </Popup>
          </Marker>
          <Marker 
              position={[43.264527563685654, 76.94521263936593]} 
              icon={HalykIcon}>
            <Popup>
              Java Developer
            </Popup>
          </Marker>
          <Marker 
              position={[43.26253833060181, 76.95549919518882]} 
              icon={ForteIcon}>
            <Popup>
              Data Scientist
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