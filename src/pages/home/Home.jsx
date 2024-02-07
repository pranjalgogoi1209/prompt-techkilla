import React from "react";
import styles from "./home.module.css";
import { useState, useRef } from "react";
import axios from "axios";

export default function Home() {
  const showImgRef = useRef();
  const [prompt, setPrompt] = useState("");
  const [generatedImg, setGeneratedImg] = useState();

  generatedImg && console.log(prompt, generatedImg);

  const handleSubmit = e => {
    e.preventDefault();
    showImgRef.current.style.display = "flex";
    setGeneratedImg("");
    console.log("form submitted");

    axios
      .post("https://59df-103-17-110-127.ngrok-free.app/text", {
        data: prompt,
      })
      .then(function (response) {
        console.log(response);
        setGeneratedImg(`data:image/webp;base64,${response.data.image}`);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <div className={styles.Home}>
      <header className={styles.header}>
        <h1>Generate Your Image</h1>
      </header>
      <main className={styles.main}>
        <form className={styles.prompt} onSubmit={handleSubmit}>
          <h2>Enter Your Prompt:</h2>
          <input
            type="text"
            name="prompt"
            placeholder="Enter Prompt"
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
          />
          <button type="submit">Generate</button>
        </form>
        <div className={styles.generatedImgContainer} ref={showImgRef}>
          {generatedImg ? (
            <div className={styles.image}>
              <img src={generatedImg} alt="generated image" />
            </div>
          ) : (
            <div className={styles.loading}>
              <div className={styles.ldsRing}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
