const axios = require("axios").default;
const URL ='https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary';
export const fetchRestuarants= async({ne,sw},type)=>{
    try{
        const res =  await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,{
            method: 'GET',
            url: `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,
            params: {
              bl_latitude: sw.lat,
              tr_latitude: ne.lat,
              bl_longitude: sw.lng,
              tr_longitude: ne.lng,
            },
            headers: {
              'X-RapidAPI-Key': '120e1bff2emsh01dc849c4a46affp1b9aadjsnc8fc769e1839',
              'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
            }
        });
        return res.data.data;
    }
    catch(err)
    {
        console.log(err)
    }
}
export const fetchWeatherData = async({lat,lng})=>{
  try{
    if(lat && lng ){
      const {data} =  await axios.get(`https://community-open-weather-map.p.rapidapi.com/find`,{
          method: 'GET',
          url: `https://community-open-weather-map.p.rapidapi.com/find`,
          params: {
            lon: lng,
            lat: lat,
          },
          headers: {
            'x-rapidapi-key': 'KJwZZIJSFimshuivMSVGaiYzkRomp15f2vKjsnK4bKzuUzVLzA',
            'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com'
          }
      });
      return data;
    }
  }
  catch(err)
  {
      console.log(err)
  }
}