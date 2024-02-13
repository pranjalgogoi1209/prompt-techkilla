import React, { useState } from "react";
import axios from "axios";
import { IoMdCloseCircle } from "react-icons/io";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./emailModal.module.css";
import Header from "../../header/Header";

export default function EmailModal({ setIsEmailOpen, generatedImg }) {
  const [userEmail, setUserEmail] = useState();

  // toast options
  const toastOptions = {
    position: "bottom-left",
    autoClose: 4000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  // sendEmail function => send email api call
  const sendEmail = url => {
    axios
      .post("https://adp24companyday.com/aiphotobooth/emailer/index.php", {
        email: userEmail,
        url: url,
      })
      .then(function (response) {
        console.log(response);
        if (response.data.status === "success") {
          toast.success("Your Image is successfully sent", toastOptions);
          setTimeout(() => {
            setIsEmailOpen(false);
          }, 4200);
        } else {
          toast.error("Please enter a valid email address", toastOptions);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // handleSend => upload image to to get url
  const handleSend = () => {
    console.log("clicked on Send Email Button");
    console.log("userEmail =>", userEmail);
    console.log("generatedImage =>", generatedImg);
    // upload image post request
    axios
      .post("https://adp24companyday.com/aiphotobooth/upload.php", {
        img: generatedImg.split(",")[1],
      })
      .then(function (response) {
        console.log(response);
        sendEmail(response.data.url);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className={styles.EmailModal}>
      <div className="container">
        <div
          className="close"
          onClick={() => {
            setIsEmailOpen(false);
          }}
        >
          <IoMdCloseCircle />
        </div>

        {/* header */}
        <Header title={"Share Generated Image"} />

        <main>
          <div className="form">
            <input
              type="mail"
              placeholder="Enter an email..."
              onChange={e => setUserEmail(e.target.value)}
            />
            <button onClick={handleSend}>Send</button>
          </div>
        </main>
      </div>
      <ToastContainer />
    </div>
  );
}
