import { useState } from "react";
import axios from "axios";
import apiKeys from "../apikeys";

const useCurrentLocationApi = (lat, lon) => {
  const [locationdata, setLocationdata] = useState();

  async function apicall() {
    const response = await axios.get(
      `${apiKeys.base}weather?lat=${lat}&lon=${lon}&units=metric&APPID=${apiKeys.key}`
    );
    const data = response.data;
    setLocationdata({
        city: data.name,
        country: data.sys.country,
        temperature: Math.round(data.main.temp), 
    });
  }

  apicall()

  return locationdata;

};

export default useCurrentLocationApi;
