// Libs
import React, { FC, useEffect, useRef, MouseEvent } from "react";
import { motion, Variants } from "framer-motion";
import MdAdd from "react-ionicons/lib/MdAdd";
import invariant from "invariant";

// Styles
import styles from "./styles.module.scss";

// Components
import { TPredictionsDropdown } from "@components/Events/PredictionsDropdown/types";
import { useAddressPredictions } from "@components/Events/hooks/useAddressPredictions";

// Store
import { useMap } from "@stores/MapStore";
import { useEvents } from "@stores/EventStore";

// Utils
import { geocodeQuery } from "@components/Events/utils/geocodeQuery";

// Constants
import { SEARCH_MIN } from "@stores/EventStore/constants";

// Animation variants
const container: Variants = {
  shown: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
  hidden: {},
};

const box: Variants = {
  shown: {
    opacity: 1,
    y: 0,
  },
  hidden: {
    opacity: 0,
    y: 50,
  },
};

/**
 * Address predictions dropdown
 */
const PredictionsDropdown: FC<TPredictionsDropdown> = () => {

  /**
   * Hooks
   */
  const {
    setEvent,
    setIsSearchOpen,
    searchedAddress,
    closeSearch,
  } = useEvents();

  const {
    setMapCenterCoords,
    easeTo,
  } = useMap();

  const predictionsRef = useRef<HTMLDivElement>(null);

  const predictions = useAddressPredictions(searchedAddress);

  /**
   * Effects
   */
  useEffect(() => {

    const firstPrediction = predictions[0];
    // const firstEl = predictionsRef?.current?.firstChild as HTMLDivElement;

    if (
      // !firstEl ||
      !firstPrediction ||
      !searchedAddress ||
      searchedAddress?.length < SEARCH_MIN
    ) {
      return;
    }

    setEvent({
      address: firstPrediction,
      // animateFromNode: firstEl,
    });

  }, [
    predictions,
    predictionsRef,
  ]);

  /**
   * Handlers
   */
  const handlePrediction = async (
    ev: MouseEvent<HTMLDivElement>,
    address: string,
  ) => {

    // Persist event
    ev.persist();

    // Set Active Event
    setEvent({
      address,
      // animateFromNode: ev.target,
    }, true);

    // Close the search
    // closeSearch();

    // Open Event
    // setEvent({
    //   address,
    //   markerNode: ev.target,
    // });

    // // Get address lngLat
    // const coordinates = await geocodeQuery(address);
    // invariant(coordinates, `Couldn't retrieve coordinates for ${address}`)
    //
    // // Create Event Modal
    // setEvent({
    //   animateFromNode: ev.target,
    //   address,
    // });
    //
    // // Set Marker
    // setMarkerByAddress(address, coordinates);
    //
    // // Open Modal
    // // setIsEventOpen(false);
    //
    // // Center map on the marker
    // setMapCenterCoords(coordinates!);
  };

  /**
   * Return JSX
   */
  return (
    <div className={styles.predictionsContainer}>
      <motion.div
        ref={predictionsRef}
        className="container"
        variants={container}
        animate="shown"
        initial="hidden"
      >
        {predictions.map((value, idx: number) => (
          <motion.div
            key={`${value}-${idx}`}
            className={styles.predictionItem}
            variants={box}
            animate="shown"
            initial="hidden"
            onClick={(ev) => handlePrediction(ev, value)}
          >
            {value}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export { PredictionsDropdown };
