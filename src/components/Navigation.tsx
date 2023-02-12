import { ReactNode } from "react";
import styles from "@components/Navigation.module.css";

export default function Navigation({ children }: Props) {
  return (
    <div className={styles.navigation}>
      <div className={styles.logo}>{children}</div>
    </div>
  );
}

type Props = {
  children: ReactNode;
};
