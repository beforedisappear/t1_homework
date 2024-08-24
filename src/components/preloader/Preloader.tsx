import styles from "./preloader.module.scss";

export function Preloader() {
  return (
    <div className={styles.preloader}>
      <span>Загрузка...</span>
    </div>
  );
}
