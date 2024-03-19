import React, { useEffect, useState } from "react";
import axios from "axios";

import CoverCrop from "../assets/img/cover-crop.jpg";
import AppIcon from "../assets/img/app_icon.jpg";
import OtherAppIcon from "../assets/img/other_app_icon.jpg";
import "../css/landing.css";

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
    const response = await axios.get(
      `${
        import.meta.env.VITE_API
      }/api/users/1de77550-d6f0-11ee-abc6-5c60baeb08ab`
    );
    setUser(response.data);
  } catch (error) {
    console.error("Get user failed:", error);
  }
};

const AppSection = ({ section }) => (
  <div className="col-12 col-sm-6 col-md-4 col-lg-3 image-container btn p-3">
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
    <div className="container-fluid p-0">
      <div style={{ backgroundColor: "#1d2947" }}>
        <div className="image-container">
          <img src={CoverCrop} style={{ width: "100%" }} alt="" />
          <div className="centered">
            <div className="d-flex justify-content-center">
              <div
                className="text-wrap text-center"
                style={{ width: "100%", maxWidth: "25rem" }}
              >
                <div
                  style={{
                    padding: "1rem",
                  }}
                >
                  <h1 className="px-3 user-name">WELCOME TO myFSS</h1>
                </div>
              </div>
            </div>
          </div>
        </div>

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
