// Libs
import React, { FC, useRef } from "react";

// Utils
import { useWindowSize } from "@utils/hooks/useWindowSize";

// Styles
import styles from "@components/Calendar/styles.module.scss";

// Constants
import { SLIDER_MARGIN } from "@components/Calendar/constants";

/**
 * Slide
 */
const Slide: FC<any> = ({
  idx,
  cb,
  timeScale,
}) => {

  /**
   * Hooks
   */
  const slideRef = useRef<HTMLDivElement>(null);

  const { windowWidth, windowHeight } = useWindowSize();

  // const [inView, entry] = useIntersectionObserver(slideRef, {
  //   threshold: 0,
  // });

  const slideWidth = windowWidth - (SLIDER_MARGIN * 2);

  /**
   * Effects
   */
  // useEffect(() => {
  //   cb(idx);
  // }, [inView]);

  /**
   * Return JSX
   */
  return (
    <div
      ref={slideRef}
      style={{
        width: `${slideWidth}px`,
        left: `${idx * slideWidth}px`,
        // backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
      }}
      className={[
        styles.slide,
        styles[`timeScale-${timeScale}`],
      ].join(" ")}
    >
      {`Slide-${idx}`}
    </div>
  );
};

export { Slide };
