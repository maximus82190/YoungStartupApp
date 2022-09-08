import React, { useState, useEffect } from "react";
import {
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Modal,
} from "@mui/material";

export default function App() {
  const [speakers, setSpeakers] = useState();
  const [modalInfo, setModalInfo] = useState();
  const isMobile = window.innerWidth < 700;
  // const [windowWidth, setwindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    fetch("https://youngstartup.io/api/cwebsite/get_speakers_dyn")
      .then((res) => res.json())
      .then((res) => setSpeakers(res.speakers));
  }, []);

  //useEffect(() => {
  //  console.log(window.innerWidth);
  //}, [window.innerWidth]);

  function handleClose() {
    setModalInfo(undefined);
  }

  function handleOpen(speaker) {
    setModalInfo(speaker);
  }

  return (
    <>
      <ImageList cols={isMobile ? 2 : 5} gap={20}>
        {speakers?.map((speaker) => (
          // add an onClick function that sets
          //the speaker's info as the `modalInfo`
          <ImageListItem
            key={`${speaker.id}`}
            onClick={() => handleOpen(speaker)}
          >
            <img
              src={speaker.speaker_head_shot_to_display}
              alt="nice headshot"
            />
            <ImageListItemBar
              title={`${speaker.firstname} ${speaker.lastname}`}
              subtitle={`${speaker.company}`}
              position="below"
            />
          </ImageListItem>
        ))}
      </ImageList>

      <Modal open={modalInfo} onClose={handleClose}>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            background: "white",
            transform: "translate(-50%, -50%)",
            width: 400,
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
            textAlign: "center",
          }}
        >
          <div>
            <h3>
              {modalInfo?.firstname} {modalInfo?.lastname}
            </h3>
            <h3>{modalInfo?.company}</h3>
            <img src={modalInfo?.speaker_head_shot_to_display} alt=" "></img>
            <h5>{modalInfo?.bio}</h5>
          </div>
        </div>
      </Modal>
    </>
  );
}
