import React, { useEffect, useState } from 'react'
import axios from "axios";
import apiKeys from "../../apikeys";
import styles from "./CurrentLocation.module.css"
import Clock from "react-live-clock"; 
import useDateBuilder from '../../Hooks/useDateBuilder';


const CurrentLocation = () => {
    const [locationdata, setLocationdata] = useState();
    let currentdate = new Date()
    const formateddate = useDateBuilder(currentdate)

    async function apicall(lat,lon) {
        const response = await axios.get(
          `${apiKeys.base}weather?lat=${lat}&lon=${lon}&units=metric&APPID=${apiKeys.key}`
        );
        const data = await response.data;
        setLocationdata({
            city: data.name,
            country: data.sys.country,
            temperature: Math.round(data.main.temp), 
        });
      }
    

    function getCurrentPosition (){
        return new Promise((resolve , reject) => {
            navigator.geolocation.getCurrentPosition(
                pos => resolve(pos),
                err => reject(err),
            )
        })
    }

    useEffect(()=>{
        if (navigator.geolocation) {
            getCurrentPosition().then((data)=>apicall(
                data.coords.latitude, 
                 data.coords.longitude
            ))
        }
        else{
            console.log("location is not present")
        }
    } , [])
       

  return (
    <div className={styles.container}>
        <h1 className={styles.city} >{locationdata?.city}</h1>
        <h1 className={styles.country} >{locationdata?.country}</h1>
        <h3 className={styles.time} >
        <Clock format={'HH:mm:ss'} ticking={true} timezone={'US/Pacific'} />
        </h3>
        <p className={styles.day} >{formateddate}</p>
        <h1 className={styles.temp} >{locationdata?.temperature}°<span className={styles.celcius} >C</span></h1>
    </div>
  )
}

export default CurrentLocation