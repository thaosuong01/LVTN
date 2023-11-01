import {
  faFacebook,
  faInstagram,
  faLinkedin,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { faBookmark, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const Footer = () => {
  return (
    <>
      <div className="border-solid border-[4px] border-t border-primary w-full px-4"></div>
      <div className="bg-second h-16 flex justify-between items-center px-4">
        <div className="flex gap-4">
          <div className="flex gap-2 items-center">
            <FontAwesomeIcon icon={faBookmark} className="text-second" />
            <span className="text-sm text-primary">
              https://helpdesk.ctu.edu.vn
            </span>
          </div>
          <div className="flex gap-2 items-center">
            <FontAwesomeIcon icon={faEnvelope} className="text-second" />
            <span className="text-sm text-primary">helpdesk@ctu.edu.vn</span>
          </div>
        </div>
        <div className="flex gap-2">
          <span>
            <FontAwesomeIcon
              icon={faFacebook}
              className="bg-[#555] text-[#262f37] p-1"
            />
          </span>
          <span>
            <FontAwesomeIcon
              icon={faInstagram}
              className="bg-[#555] text-[#262f37] p-1"
            />
          </span>
          <span>
            <FontAwesomeIcon
              icon={faYoutube}
              className="bg-[#555] text-[#262f37] p-1"
            />
          </span>
          <span>
            <FontAwesomeIcon
              icon={faLinkedin}
              className="bg-[#555] text-[#262f37] p-1"
            />
          </span>
        </div>
      </div>
    </>
  );
};

export default Footer;
