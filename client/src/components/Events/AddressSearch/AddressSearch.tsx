import { motion } from "framer-motion";
import MdAdd from "react-ionicons/lib/MdAdd";
import IosClose from "react-ionicons/lib/IosClose";
import { PredictionsDropdown } from "@components/Events/PredictionsDropdown/PredictionsDropdown";
import React from "react";

// Styles
import styles from "./styles.module.scss";

const AddressSearch: any = ({ searchedAddress, handleSearch }) => {
  return (
    <>
      <div className={styles.searchInput}>
        <input
          value={searchedAddress}
          onChange={handleSearch}
        />
      </div>
      <PredictionsDropdown/>
    </>
  );
};

export { AddressSearch };
