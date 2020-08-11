// Libs
import React, { CSSProperties, FC } from "react";

// Utils

// Components

// Store

// Constants
import { EventDots } from "@components/Calendar/EventDots/EventDots";

// Styles
import classNames from "./styles.module.scss";

// Types
import { MyComponentProps } from "./types";

/**
 *
 */
const Second: FC<MyComponentProps> = ({
  date,
  content,
  timeScale,
}) => {

  /**
   * =============== Hooks ===============
   */

  /**
   * Component hooks
   */

  /**
   * Utils
   */

  /**
   * Effects
   */

  /**
   * Render fns
   */
  const renderSeconds = () => {
    return Object.keys(content).map((minute, idx) => {
      const second = content[minute];
      // const event = content[minute];
      return (
        <EventDots
          key={`second-${idx}`}
          // event={event}
          date={{
            ...date,
            second,
          }}
        />
      );
    });
  };


  /**
   * =============== JSX ===============
   */

  return (
    <>
      {renderSeconds()}
    </>
  );

};

Second.displayName = "Second";

export { Second };
