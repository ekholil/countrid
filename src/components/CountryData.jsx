import {
  Box,
  Button,
  Container,
  Grid,
  Modal,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import styles from "../style.module.css";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
function CountryData() {
  const [countryName, setCountryName] = useState("");
  const [loading, setLoading] = useState(false);
  const [countryData, setCountryData] = useState({});
  const [weatherData, setWeatherData] = useState({});
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleInput = (e) => setCountryName(e.target.value);
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    fetch(`https://restcountries.com/v3.1/name/${countryName}`)
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        console.log(data[0])
        setCountryData(data[0]);

      });
  };
  const handleWeather = () => {
    handleOpen();
    fetch(
      `https://api.weatherbit.io/v2.0/current?city=${countryData?.capital[0]}&key=e5c5bfa39f3e4c22bfeab8e553450c3d`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data[0]);
        setWeatherData(data.data[0])
      
      });
  };

  return (
    <Container>
      <Box
        sx={{
          width: 500,
          maxWidth: "100%",
          marginTop: "30px",
        }}
      >
        <form onSubmit={handleSubmit}>
          <TextField
            onChange={handleInput}
            fullWidth
            label="Enter Country Name"
            id="fullWidth"
          />
          <Button
            sx={{ marginTop: "10px" }}
            type="submit"
            variant="contained"
            disabled={!countryName}
          >
            Submit
          </Button>
        </form>
      </Box>
      {countryData?.name?.common && (
        <div>
          {loading ? (
            <div className={styles.skeleton}>
              <Skeleton variant="h1" />
              <Skeleton variant="text" />
              <Skeleton variant="h1" />
              <Skeleton variant="text" />
              <Skeleton variant="h1" />
            </div>
          ) : (
            <div className={styles.card}>
              <div>
                <span>Details of {countryData?.name?.common}</span>
                <h4>Capital : {countryData?.capital[0]}</h4>
                <h4>Population: {countryData?.population}</h4>
                <h4>
                  Latlng : {countryData?.latlng[0]}, {countryData?.latlng[1]}
                </h4>
                <Button
                  onClick={handleWeather}
                  variant="contained"
                >
                  Capital Weather
                </Button>
              </div>

              <div>
                <span className={styles.span}>Flag</span> <br />
                <img src={countryData?.flags?.png} alt="flagImg" />
              </div>
            </div>
          )}
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Weather info of {weatherData?.city_name}, {countryData?.name?.common}
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={8}>
                  
                <h1
                
              >
                {weatherData?.temp}°c
              </h1>

              <Typography
                id="modal-modal-description"
                varient="h3"
                sx={{ mt: 2 }}
              >
                Wind Speed : {weatherData?.wind_spd}
              </Typography>
              <Typography
                id="modal-modal-description"
                varient="h3"
                sx={{ mt: 2 }}
              >
                Cloudes : {weatherData?.clouds}
              </Typography> 
                  </Grid>
                <Grid item xs={4}>
                 <img src={`https://www.weatherbit.io/static/img/icons/${weatherData?.weather?.icon}.png`} alt="" />
                  
                  </Grid>
              </Grid>

             
            </Box>
          </Modal>
        </div>
      )}
    </Container>
  );
}

export default CountryData;
