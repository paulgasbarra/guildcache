import React from "react";

const HeroSection = () => {
  return (
    <div className="p-20 flex flex-row justify-around">
      <div className="left-section w-2/5 h-96">
        <div className="welcome-text text-center">Welcome to</div>
        <div className="title"></div>
        <div className="teaser">
          Unleash Your Potential with our Specialized Curriculum in Computer
          Programming for Building Automation Controls.
        </div>
        <div className="calls-to-action">
          <div className="cta-button">Become a Student</div>
          <div className="cta-button">Explore our Curriculum</div>
        </div>
      </div>
      <div className="w-2/5 h-96 bg-slate-200">
        <img className="bg-slate-200" src="" alt="" />
      </div>
    </div>
  );
};

export default HeroSection;
