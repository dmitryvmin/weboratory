import React, { useState, useEffect, useRef, FC } from "react";

import classNames from "./styles.module.scss";
import { cn } from "@utils/css/getClassName";

const placeHolder = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkqAcAAIUAgUW0RjgAAAAASUVORK5CYII=";

type LazyImageProps = {
  src: string;
  alt?: string;
  className?: string;
}

export const LazyImage: FC<LazyImageProps> = ({ src, alt, className }) => {

  const [imageSrc, setImageSrc] = useState<string>(placeHolder);

  const imageRef = useRef<HTMLImageElement>(null);

  const onLoad = event => {
    event.target.classList.add("loaded");
  };

  const onError = event => {
    event.target.classList.add("has-error");
  };

  useEffect(() => {
    let observer;
    let didCancel = false;

    if (!imageRef.current || imageSrc === src) {
      return;
    }

    if (IntersectionObserver) {
      observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (
              !didCancel &&
              (entry.intersectionRatio > 0 || entry.isIntersecting)
            ) {
              setImageSrc(src);
              observer.unobserve(imageRef.current);
            }
          });
        },
        {
          threshold: 0.01,
          rootMargin: "75%",
        },
      );
      observer.observe(imageRef.current);
    }
    else {
      // Old browsers fallback
      setImageSrc(src);
    }

    return () => {
      didCancel = true;
      // on component cleanup, we remove the listner
      if (observer && observer.unobserve) {
        observer.unobserve(imageRef.current);
      }
    };
  }, [
    src,
    imageSrc,
    imageRef.current,
  ]);

  return (
    <img
      className={cn(classNames.Image, className)}
      ref={imageRef}
      src={imageSrc}
      alt={alt}
      onLoad={onLoad}
      onError={onError}
    />
  );
};