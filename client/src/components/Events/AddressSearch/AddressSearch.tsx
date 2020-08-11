// Lib
import React from "react";

import { PredictionsDropdown } from "@components/Events/PredictionsDropdown/PredictionsDropdown";

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
