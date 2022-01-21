import "./Footer.css";
import React, { useRef } from "react";
import { SocialMediaButtons } from "../SocialMediaButtons";
import { useCopyableLogo } from "../useCopyableLogo";

export const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  useCopyableLogo({ containerRef: footerRef });

  return (
    <>
      <footer ref={footerRef}>
        <img className="footer-img" src="/META NINJAZheader2.png" />
        <div className="footer-content">
          <div className="footer-social">
            <SocialMediaButtons isFooter />
          </div>
        </div>
      </footer>
    </>
  );
};
