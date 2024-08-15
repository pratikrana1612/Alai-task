import { useRef, useState } from "react";
import { Tldraw } from "tldraw";
import "tldraw/tldraw.css";
import DrawTimeLine from "./DrawTimeLine";
import styles from "./TldrawComponent.module.css";
export default function TldrawTimeline() {
  // const [numEvents, setNumEvents] = useState(0); // State to store the number of events
  const Inputref = useRef<HTMLInputElement>(null);
  const [isclicked, ChangeClicked] = useState(false);
  function clickHandler() {
    ChangeClicked((prev) => !prev);
  }

  return (
    <div>
      <div className={`${styles["form__group"]} ${styles["field"]}`}>
        <div className={`${styles["input_label"]}`}>
          <input
            type="number"
            className={styles["form__field"]}
            placeholder="Name"
            name="name"
            ref={Inputref}
            id="name"
            required
          />
          <label htmlFor="name" className={styles["form__label"]}>
            Enter Events
          </label>
          <button onClick={clickHandler} style={{ margin: "2rem 1rem" }}>
            TimeLine
          </button>
        </div>
      </div>

      <div
        style={{
          position: "fixed",
          width: "95vw",
          height: "70vh",
        }}
      >
        <Tldraw
          hideUi={true}
          onMount={() => {
            // Store editor instance for later use
            // window.editor = editor;
          }}
        >
          <DrawTimeLine
            isclicked={isclicked}
            numEvents={isclicked ? Number(Inputref?.current?.value) : 0}
            clickHandler={clickHandler}
          ></DrawTimeLine>
        </Tldraw>
      </div>
    </div>
  );
}
