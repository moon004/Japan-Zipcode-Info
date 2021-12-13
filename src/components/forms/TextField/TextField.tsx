import React, { CSSProperties } from "react";
import styles from "./TextField.module.css";
import { InputHook } from "src/components/forms/hooks/input";

export interface TextField {
  placeholder: string;
  type: string;
  style?: CSSProperties;
  min?: number;
  inputHook: InputHook;
}

const TextField = (p: TextField) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "+" || e.key === "-" || e.key === ".") {
      e.preventDefault();
    }
  };
  return (
    <input
      type={p.type}
      min={p.min || 0}
      onKeyDown={handleKeyDown}
      placeholder={p.placeholder}
      className={styles.input}
      style={p.style}
      {...p.inputHook.bind}
    />
  );
};

export default TextField;
