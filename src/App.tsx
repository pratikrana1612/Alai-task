import TldrawComponent from "./Components/TldrawComponent";
import styles from "./Components/TldrawComponent.module.css";

export default function App() {
  return (
    <div>
      <h2 className={styles["main_heading"]}>Timeline:</h2>
      <TldrawComponent />
    </div>
  );
}
