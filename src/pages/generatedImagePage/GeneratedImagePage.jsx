import React from "react";
import { useState, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
// import { IoIosCloseCircle } from "react-icons/io";
import styles from "./generatedImagePage.module.css";
import Header from "../../components/header/Header";
import exportAsImage from "../../utils/exportAsImage";
import EmailFeature from "../../components/generatedImage/email/EmailFeature";

export default function GeneratedImagePage({ capturedImage }) {
  const exportRef = useRef();
  const showImgRef = useRef();
  const [prompt, setPrompt] = useState("");
  const [generatedImg, setGeneratedImg] = useState();

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
          <form className={styles.prompt} onSubmit={handleSubmit}>
            <input
              type="text"
              name="prompt"
              placeholder="Enter Prompt"
              value={prompt}
              onChange={e => setPrompt(e.target.value)}
            />
            <button type="submit">Generate</button>
          </form>
          <div className={styles.btns}>
            {/* download feature */}
            <button>Download</button>

            {/* email feature */}
            <EmailFeature generatedImg={generatedImg} />

            {/* print feature */}
            <button>Print</button>

            {/* qr feature */}
            <button
              onClick={() =>
                exportAsImage(exportRef.current, "generated-image")
              }
            >
              QR
            </button>
          </div>
        </div>
        <div className={styles.resultContainer}>
          <div className={styles.generatedImgContainer} ref={showImgRef}>
            {generatedImg ? (
              <div className={styles.image}>
                <img src={generatedImg} alt="generated image" ref={exportRef} />
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
