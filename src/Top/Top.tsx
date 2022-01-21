import "./Top.css";
import React, { useRef } from "react";
import { SocialMediaButtons } from "../SocialMediaButtons";
import { useCopyableLogo } from "../useCopyableLogo";

export const Top = () => {
  const headerRef = useRef<HTMLElement>(null);
  useCopyableLogo({ containerRef: headerRef });

  return (
    <>
      <div className="top-social">
        <SocialMediaButtons />
      </div>
    </>
  );
};
