// Libs
import React, { FC } from "react";
import { AnimatePresence, motion } from "framer-motion";

// Utils
import { cn } from "@utils/css/getClassName";

// Components
import { ZoomIn, ZoomOut } from "@components/UI/Icon";

// Store
import { useMapStore } from "@stores/globalStore/stores/map/useMapStore";

// Types
import { MapMenuProps } from "@components/Controls/MapMenu/types";

// Styles
import classNames from "./styles.module.scss";

/**
 * Controls Map zoom
 */
const MapMenu: FC<MapMenuProps> = () => {

  /**
   * Hooks
   */
  const {
    mapZoomIn,
    mapZoomOut,
    isMapMaxZoom,
    isMapMinZoom,
  } = useMapStore();

  /**
   * Return JSX
   */
  return (
    <div className={classNames.MapMenuContainer}>
      <ZoomOut
        className={cn(
          classNames.zoomnBtn,
          isMapMaxZoom && classNames.zoomnBtnDisabled,
        )}
        fontSize="40px"
        onClick={mapZoomOut}
      />
      <ZoomIn
        className={cn(
          classNames.zoomnBtn,
          isMapMinZoom && classNames.zoomnBtnDisabled,
        )}
        fontSize="40px"
        onClick={mapZoomIn}
      />
    </div>
  );
};

export { MapMenu };
