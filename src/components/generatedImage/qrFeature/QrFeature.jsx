import React, { useState } from "react";
import QRCode from "react-qr-code";
import { IoIosCloseCircle } from "react-icons/io";
import styles from "./qrFeature.module.css";
import axios from "axios";

export default function QrFeature({ generatedImg }) {
  const [showQrPopup, setShowQrPopup] = useState(false);
  const [qr, setQr] = useState("");

  // handle QR code generation
  const handleSubmitQr = () => {
    console.log("submitting qr");
    setShowQrPopup(true);
    axios
      .post("https://adp24companyday.com/aiphotobooth/upload.php", {
        img: generatedImg.split(",")[1],
      })
      .then(function (response) {
        console.log(response);
        setQr(response.data.url);
        console.log(qr);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <div>
      <button onClick={handleSubmitQr}>QR</button>

      {showQrPopup && (
        <div className={styles.popupQr}>
          <div className={styles.qr}>
            <div
              className={styles.closePopup}
              onClick={() => setShowQrPopup(false)}
            >
              <IoIosCloseCircle />
            </div>
            <h1>Scan this QR to get image</h1>
            <QRCode size={256} value={qr} />
          </div>
        </div>
      )}
    </div>
  );
}
