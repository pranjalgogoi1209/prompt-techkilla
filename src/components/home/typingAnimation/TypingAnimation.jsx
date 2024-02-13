import React from "react";
import styles from "./typingAnimation.module.css";
import { TypeAnimation } from "react-type-animation";
import { typingData } from "./../../../data/home/typingAnimation";
import { Link } from "react-router-dom";

export default function TypingAnimation() {
  return (
    <div className={styles.TypingAnimation}>
      <div className={styles.typingContainer}>
        <div className={styles.typing}>
          <TypeAnimation
            sequence={typingData}
            wrapper="span"
            cursor={true}
            repeat={Infinity}
          />
        </div>
        <div className={styles.btnContainer}>
          <Link to={"/capture-image"}>
            <button>
              <span>
                <img src="#" alt="star" />
              </span>
              Start
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
