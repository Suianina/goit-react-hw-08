import styles from './Loader.module.css';

const Loader = () => {
  return (
    <div className={styles.loader}>
      <p className={styles.text}>loading...</p>
    </div>
  );
}

export default Loader;