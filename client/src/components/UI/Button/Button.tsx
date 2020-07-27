// Libs
import React, { FC, SyntheticEvent, useState } from "react";

// Styles
import styles from "./styles.module.scss";

// Types
import { TButton } from "@components/UI/Button/types";

const Button: FC<TButton> = ({
  children,
  onClick,
  color = "primary",
  disabled = false,
  confirm = false,
  className,
}) => {

  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);

  function handleOnClick(ev: SyntheticEvent<HTMLDivElement>) {
    if (confirm && !isConfirmed) {
      setIsConfirmed(true);
      return;
    }

    onClick(ev);
  }

  return (
    <div
      className={[
        disabled && styles.disabled,
        styles.container,
        styles[color],
        className && className,
      ].join(" ")}
      onClick={handleOnClick}
    >
      {(confirm && isConfirmed) &&
      <span onClick={() => setIsConfirmed(false)}>
        Cancel
      </span>}
      {children}
    </div>
  );
};

export { Button };
