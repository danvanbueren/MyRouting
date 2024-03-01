import React, { useEffect, useState } from "react";
import axios from "axios";

import CoverCrop from "./assets/img/cover-crop.jpg";
import AppIcon from "./assets/img/app_icon.jpg";
import OtherAppIcon from "./assets/img/other_app_icon.jpg";
import "./css/landing.css";

const API_URL = `http://localhost:3000/api/users/1de77550-d6f0-11ee-abc6-5c60baeb08ab`;

const appSections = [
  {
    title: "LEARN MORE ABOUT...",
    description: "Self-service access to knowledge articles",
    url: "",
    image: OtherAppIcon,
  },
  {
    title: "CHATTER",
    description: "Social network for your Airmen & Guardian groups",
    url: "",
    image: OtherAppIcon,
  },
  {
    title: "myFITNESS",
    description: "Fit to win. Fit to fight.",
    url: "",
    image: OtherAppIcon,
  },
  {
    title: "myEVAL",
    description: "Evaluation System",
    url: "",
    image: OtherAppIcon,
  },
  {
    title: "myEVAL Admin",
    description: "Evaluation System Admin Panel",
    url: "",
    image: OtherAppIcon,
  },
  {
    title: "myROUTING",
    description: "Routing System",
    url: "/dashboard",
    image: AppIcon,
  },
  {
    title: "myROUTING Admin",
    description: "Routing System",
    url: "/admin",
    image: AppIcon,
  },

  {
    title: "mySERVICES",
    description: "Combat Support, Community Services",
    url: "",
    image: OtherAppIcon,
  },
  {
    title: "myEDUCATION",
    description: "Submit ARC GI Bill & TA Requests, IMA Training",
    url: "",
    image: OtherAppIcon,
  },
  {
    title: "etc...",
    description: "",
    url: "",
    image: OtherAppIcon,
  },
  {
    title: "etc...",
    description: "",
    url: "",
    image: OtherAppIcon,
  },
  {
    title: "etc...",
    description: "",
    url: "",
    image: OtherAppIcon,
  },
  {
    title: "etc...",
    description: "",
    url: "",
    image: OtherAppIcon,
  },
  {
    title: "etc...",
    description: "",
    url: "",
    image: OtherAppIcon,
  },
  {
    title: "etc...",
    description: "",
    url: "",
    image: OtherAppIcon,
  },
  {
    title: "etc...",
    description: "",
    url: "",
    image: OtherAppIcon,
  },
  {
    title: "etc...",
    description: "",
    url: "",
    image: OtherAppIcon,
  },
  {
    title: "etc...",
    description: "",
    url: "",
    image: OtherAppIcon,
  },
];

const fetchUser = async (setUser) => {
  try {
    const response = await axios.get(API_URL);
    setUser(response.data);
  } catch (error) {
    console.error("Get user failed:", error);
  }
};

const AppSection = ({ section }) => (
  <div className="col-2 image-container btn p-3">
    <a href={section.url} style={{ textDecoration: "none" }}>
      <img
        src={section.image}
        style={{ opacity: 0.5, width: "100%", height: "13rem" }}
        className="border"
        alt=""
      />
      <div className="centered">
        <h5 className="mb-0 text-white">{section.title}</h5>
        <p className="text-white">{section.description}</p>
      </div>
    </a>
  </div>
);

const MainPageContent = () => {
  const [user, setUser] = useState({ firstName: "", lastName: "", rank: "" });

  useEffect(() => {
    fetchUser(setUser);
  }, []);

  return (
    <div className="container-fluid px-3">
      <div style={{ backgroundColor: "#1d2947" }}>
        <div className="image-container">
          <img src={CoverCrop} style={{ width: "100%" }} alt="" />
          <div className="centered">
            <div className="d-flex justify-content-center">
              <div className="text-wrap text-center" style={{ width: "25rem" }}>
                <h1 style={{ color: "white", padding: "9rem 0 9rem 0" }}>
                  WELCOME TO myFSS, {user.rank} {user.firstName} {user.lastName}
                </h1>
              </div>
            </div>
          </div>
        </div>

        <h2 className="px-4 pt-4 text-white m-0">AVAILABLE NOW</h2>

        <div className="row p-4">
          {appSections.map((section, index) => (
            <AppSection key={index} section={section} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainPageContent;
