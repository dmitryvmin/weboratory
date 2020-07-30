import ReactMapboxGl from "react-mapbox-gl";

const Mapbox = ReactMapboxGl({
  accessToken: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN as string,
});

export { Mapbox };
