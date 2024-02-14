import React from "react";
import { useState, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import styles from "./generatedImagePage.module.css";
import Header from "../../components/header/Header";
import EmailFeature from "../../components/generatedImage/emailFeature/EmailFeature";
import DownloadFeature from "../../components/generatedImage/downloadFeature/DownloadFeature";
import PrintFeature from "../../components/generatedImage/printFeature/PrintFeature";
import QrFeature from "../../components/generatedImage/qrFeature/QrFeature";
import { MdModeEditOutline } from "react-icons/md";
import { FaWandMagicSparkles } from "react-icons/fa6";

export default function GeneratedImagePage({ capturedImage }) {
  const printRef = useRef();
  const exportRef = useRef();
  const showImgRef = useRef();
  const [prompt, setPrompt] = useState("");
  const [generatedImg, setGeneratedImg] = useState();
  const [printImage, setPrintImage] = useState();

  generatedImg && console.log("generated Image =>", generatedImg);

  capturedImage && console.log("captured Image =>", capturedImage);

  prompt && console.log("prompt =>", prompt);

  // toast options
  const toastOptions = {
    position: "bottom-left",
    autoClose: 4000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log("form submitted");
    setPrintImage("");
    if (prompt === "") {
      toast.error("Please enter a prompt to generate image", toastOptions);
    } else {
      showImgRef.current.style.display = "flex";
      setGeneratedImg("");
      axios
        .post("https://76ec-103-17-110-127.ngrok-free.app/img2img", {
          data: prompt,
          image: capturedImage.split(",")[1],
          // image: capturedImage,
        })
        .then(function (response) {
          console.log(response);
          setGeneratedImg(`data:image/webp;base64,${response.data.result}`);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  return (
    <div className={styles.GeneratedImagePage}>
      <Header title={"Generate an Image From Text Prompt"} />
      <main className={styles.main}>
        <div className={styles.promptContainer}>
          {/* form */}
          <form className={styles.prompt} onSubmit={handleSubmit}>
            <div className={styles.inputBox}>
              <input
                type="text"
                name="prompt"
                placeholder="Describe Your Vision"
                value={prompt}
                onChange={e => setPrompt(e.target.value)}
              />
              <MdModeEditOutline />
            </div>
            <button type="submit">
              <FaWandMagicSparkles />
              Generate
            </button>
          </form>

          {/* prompt example */}
          <div className={styles.promptExample}>
            <h2>Prompt Examples:</h2>
            <ol>
              <li onClick={e => setPrompt(e.target.innerText)}>
                Generate a realistic, diverse image of a young adult male with a
                casual, modern style
              </li>
              <li onClick={e => setPrompt(e.target.innerText)}>
                Create an image of a confident and professional adult female
                with a casual appearance
              </li>
              <li onClick={e => setPrompt(e.target.innerText)}>
                Generate an artistic and unique portrayal of a teenage male with
                a sporty and energetic vibe
              </li>
              <li onClick={e => setPrompt(e.target.innerText)}>
                Craft a visually appealing image of a mature female with a
                relaxed and sophisticated demeanor
              </li>
              <li onClick={e => setPrompt(e.target.innerText)}>
                Generate an image of a young couple, showcasing a natural and
                joyful interaction between a male and female in a casual setting
              </li>
            </ol>
          </div>

          {/* share features */}
          <div className={styles.btns}>
            {/* download feature */}
            <DownloadFeature exportRef={exportRef} />

            {/* email feature */}
            <EmailFeature generatedImg={generatedImg} />

            {/* print feature */}
            <PrintFeature
              setPrintImage={setPrintImage}
              printRef={printRef}
              generatedImg={generatedImg}
            />

            {/* qr feature */}
            <QrFeature generatedImg={generatedImg} />
          </div>
        </div>
        <div className={styles.resultContainer}>
          <div className={styles.generatedImgContainer} ref={showImgRef}>
            {printImage ? (
              <div className={styles.image} ref={exportRef}>
                <img
                  src={printImage}
                  alt="generated image"
                  ref={printRef}
                  id="printableArea"
                />
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
        </div>
      </main>
      <ToastContainer />
    </div>
  );
}
