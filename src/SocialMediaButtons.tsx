import React, { FC } from "react";
import "./SocialMediaButtons.css";

export const SocialMediaButtons: FC<{ isFooter?: boolean }> = ({
  isFooter,
}) => {
  return (
    <div className="socials">
      <a className="button" href="//opensea.io/">
        Open Sea
      </a>
      <a className="button" href="//twitter.com">
        Twitter
      </a>
      <a className="button" href="//discord.com">
        Discord
      </a>
    </div>
  );
};
