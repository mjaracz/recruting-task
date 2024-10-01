import { FC } from "react";
import styles from "./title.module.css";

interface Props {
  label: string;
}

export const Title: FC<Props> = ({ label }) => {
  return <h2 className={styles.title}>{label}</h2>;
};
