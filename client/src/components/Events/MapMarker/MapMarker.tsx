// Libs
import React from "react";
import { Marker } from "react-mapbox-gl";
import { motion } from "framer-motion";

// Styles
import styles from "../styles.module.scss";

// <motion.div
//   whileHover={{ scale: 1.1 }}
//   whileTap={{ scale: 0.95 }}
// >

const MapMarker = ({ coords, address, handleMarker }) => {
  return (
    <Marker
      coordinates={coords}
      anchor="bottom"
    >
      <>
        <div className={styles.poi} onClick={handleMarker(address)}/>
        <div className={styles.pulse}/>
      </>
    </Marker>
  );
};

export { MapMarker };
