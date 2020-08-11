// Libs
import React, { FC} from "react";

// Utils

// Components

// Store

// Constants

// Styles
import classNames from "./styles.module.scss";

// Types
import { MyComponentProps } from "./types";
import { useCalendar } from "@stores/CalendarStore";

const Blob = () => {

}

/**
 *
 */
const Blobs:FC<MyComponentProps> = () => {

  /**
   * =============== Hooks ===============
   */

  /**
   * Context hooks
   */
  const {
    intervalData,
  } = useCalendar();

  /**
   * Component hooks
   */

  /**
   * Variables
   */

  /**
   * Utils
   */

  /**
   * Effects
   */

  /**
   * =============== JSX ===============
   */

  /**
   * Render Component
   */
  return (
    <div></div>
  );
};

export { Blobs };
