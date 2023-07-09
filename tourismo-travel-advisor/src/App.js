import React, { useEffect, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Header from "./Components/Header/Header";
import Lists from "./Components/Lists/Lists";
import Map from "./Components/Map/Map";
import { fetchRestuarants, fetchWeatherData } from "./Components/api";

const App = () => {
  const [rest, setRest] = useState([]);
  const [coords, setCoords] = useState({ lat: 51.5074, lng: 0.1278 });
  const [bonds, setBounds] = useState({
    sw: { lat: 0, lng: 0 },
    ne: { lat: 0, lng: 0 },
  });
  const [childClicked, setChildClicked] = useState(null);
  const [weatherState, setWeatherState] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState("hotels");
  const [rating, setRating] = useState(0);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoords({ lat: latitude, lng: longitude });
      }
    );
  }, []);
  useEffect(() => {
    const filteredarr = rest && rest.filter((place) => place.rating > rating);
    setFilteredPlaces(filteredarr);
  }, [rating]);
  useEffect(() => {
    // setCoords(coords)
    setIsLoading(true);
    const fetchapi = async () => {
      const weatherData = await fetchWeatherData(coords);
      setWeatherState(weatherData);
      const data = await fetchRestuarants(bonds, type);
      console.log(weatherData);
      setFilteredPlaces([]);
      setRest(
        data && data?.filter((place) => place.name && place.num_reviews > 0)
      );
      setIsLoading(false);
    };
    fetchapi();
  }, [type, bonds]);
  return (
    <>
      <CssBaseline />
      <Header setCoords={setCoords} />
      <Grid container spacing={3} style={{ width: "100%" }}>
        <Grid item xs={12} md={4}>
          <Lists
            type={type}
            setType={setType}
            rating={rating}
            setRating={setRating}
            isLoading={isLoading}
            childClicked={childClicked}
            rest={
              filteredPlaces && filteredPlaces.length ? filteredPlaces : rest
            }
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map
            weatherState={weatherState}
            setChildClicked={setChildClicked}
            places={
              filteredPlaces && filteredPlaces.length ? filteredPlaces : rest
            }
            coords={coords}
            setCoords={setCoords}
            setBounds={setBounds}
          />
        </Grid>
      </Grid>
    </>
  );
};
export default App;
