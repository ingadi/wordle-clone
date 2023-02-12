import { ReactNode } from "react";
import styles from "@components/Notification.module.css";

export default function Notification({ children, revealDelay = 0 }: Props) {
  return (
    <div
      style={{
        animationDelay: `${revealDelay}s`,
      }}
      className={styles.notification}
    >
      {children}
    </div>
  );
}

type Props = {
  children: ReactNode;
  revealDelay?: number;
};
