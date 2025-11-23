import React, { useEffect, useState } from "react";
import UserForm from "./UserForm";
import "./App.css";
import { getDatabase, ref, onValue } from "firebase/database";
import { initializeApp } from "firebase/app";
import Lottie from "lottie-react";

import meditationAnimation from "./animations/meditation.json";
import yogaaAnimation from "./animations/yogaa.json";
import walkAnimation from "./animations/walk.json";
import balancedLifeAnimation from "./animations/balancedLife.json";
import wateringPlantsAnimation from "./animations/wateringPlants.json";

const firebaseConfig = {
  apiKey: "AIzaSyD2DWz6SkyC5tq9tdH20tTYkv-95KdCi2k",
  authDomain: "stress-detection-nd-management.firebaseapp.com",
  databaseURL: "https://stress-detection-nd-management-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "stress-detection-nd-management",
  storageBucket: "stress-detection-nd-management.appspot.com",
  messagingSenderId: "885095610449",
  appId: "1:885095610449:web:8fc02cd933e367d2d72070",
  measurementId: "G-6EN993EM3H"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const yogaLinks = [
  "https://www.youtube.com/watch?v=O-6f5wQXSu8",
  "https://www.youtube.com/watch?v=v7AYKMP6rOE",
  "https://www.youtube.com/watch?v=4pLUleLdwY4",
  "https://www.youtube.com/watch?v=kFhG-ZzLNN4"
];

const meditationLinks = [
  "https://www.youtube.com/watch?v=inpok4MKVLM",
  "https://www.youtube.com/watch?v=MIr3RsUWrdo",
  "https://www.youtube.com/watch?v=64QzBuhsyuk",
  "https://www.youtube.com/watch?v=ZToicYcHIOU"
];

const musicLinks = [
  "https://www.youtube.com/watch?v=1ZYbU82GVz4",
  "https://www.youtube.com/watch?v=2OEL4P1Rz04",
  "https://www.youtube.com/watch?v=hHW1oY26kxQ",
  "https://www.youtube.com/watch?v=1Zy9gPz2rSg"
];

function App() {
  const [userData, setUserData] = useState(null);
  const [gsr, setGSR] = useState(null);
  const [emotion, setEmotion] = useState("Loading...");
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    const gsrRef = ref(database, "gsr");
    const emotionRef = ref(database, "emotion");
  
    onValue(gsrRef, (snapshot) => {
      const value = snapshot.val();
      setGSR(value !== null ? Number(value) : null);
    });
  
    onValue(emotionRef, (snapshot) => {
      const data = snapshot.val();
      setEmotion(data || "normal");
    });
  }, []);
  
  if (showWelcome) {
    return (
      <div className="welcome-screen">
        <h1 className="title">Serene Support</h1>
        <p className="tagline">Helping You Stay Calm, Focused & Balanced 🌿</p>
        <Lottie animationData={meditationAnimation} style={{ height: 300 }} />
        <p className="instruction">Please wear your stress detection device to begin ✨</p>
        <button className="start-button" onClick={() => setShowWelcome(false)}>Get Started</button>
      </div>
    );
  }

  if (!userData) return <UserForm onSubmit={(data) => setUserData(data)} />;

  return (
    <div className="App">
      <h1>Hi, {userData.name}!</h1>
      <p><strong>Age:</strong> {userData.age}</p>
      <p><strong>GSR Value:</strong> {gsr}</p>
      <p><strong>Facial Emotion:</strong> {emotion}</p>

      {(gsr > 1800 || emotion === "stress") ? (
        <div>
          <h2>You seem stressed — Try these calming activities 🌿</h2>
          <div className="lottie-grid">
            <div>
              <Lottie animationData={yogaaAnimation} style={{ height: 150 }} />
              <h3>Yoga</h3>
              <ul>
                {yogaLinks.map((link, idx) => <li key={idx}><a href={link} target="_blank">Yoga {idx + 1}</a></li>)}
              </ul>
            </div>

            <div>
              <Lottie animationData={meditationAnimation} style={{ height: 150 }} />
              <h3>Meditation</h3>
              <ul>
                {meditationLinks.map((link, idx) => <li key={idx}><a href={link} target="_blank">Meditation {idx + 1}</a></li>)}
              </ul>
            </div>

            <div>
              <Lottie animationData={walkAnimation} style={{ height: 150 }} />
              <h3>Music</h3>
              <ul>
                {musicLinks.map((link, idx) => <li key={idx}><a href={link} target="_blank">Music {idx + 1}</a></li>)}
              </ul>
            </div>

            <div>
              <Lottie animationData={wateringPlantsAnimation} style={{ height: 150 }} />
              <h3>Nature & Friends</h3>
              <p>Spend time with nature 🌱</p>
              <p>Talk to friends 👭</p>
              <p>Play with pets 🐕</p>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <h2>You're doing great! 🌈</h2>
          <Lottie animationData={balancedLifeAnimation} style={{ height: 250 }} />
          <p>Keep up the balanced lifestyle! 😊</p>
        </div>
      )}
    </div>
  );
}

export default App;
