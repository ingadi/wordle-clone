import { HTMLAttributes, ReactNode } from "react";
import styles from "@components/Row.module.css";

export default function Row({ children, hasError }: Props) {
  return (
    <div className={`${styles.row} ${hasError ? styles.shake : ""}`}>
      {children}
    </div>
  );
}

type Props = {
  children: ReactNode;
  hasError?: boolean;
};
