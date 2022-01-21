import "./Roadmap.css";
import { FC } from "react";

const ProgressBar: FC = ({ children }) => {
  return <div className="progress-bar">{children}</div>;
};

export const Roadmap: FC = () => {
  return (
    <>
      <h2 className="roadmap">Roadmap</h2>
      <div className="roadmap-item">
        <ProgressBar>1.18.2022</ProgressBar>
        <span>888 Genesis Collection Mint </span>
        <span className="in-progress">In Progress</span>
        <br />
      </div>
      <div className="roadmap-item-subtext">
        Genesis Ninjaz will have whitelist priority for full collection mint and
        will recieve 33% of all in-game tokens earned
      </div>
      <div className="roadmap-item">
        <ProgressBar>2.01.2022</ProgressBar>
        <span>8000 METANINJAZ Raid the Metaverse </span>
        <span className="not-progress">In Progress</span>
      </div>
      <div className="roadmap-item-subtext">
        Full collection launch will allow Meta Ninjaz Holders to have access to
        game alpha to start collecting $RUN token, and community governance for
        decisions around community rewards, token allocation, and merchandise.
      </div>
      <div className="roadmap-item">
        <ProgressBar>2.14.2022</ProgressBar>
        <span>Community Tokenomics Vote </span>
        <span className="not-progress">In Progress</span>
      </div>
      <div className="roadmap-item-subtext">
        Community votes on Tokenmoics proposal for in-game token earnings. The
        community will be allowed to pitch their own models if they disagree
        with the model proposed by Meta Ninjaz Team
      </div>
      <div className="roadmap-item">
        <ProgressBar>Q2 2022</ProgressBar>
        <span>Game Alpha Launches </span>
        <span className="not-progress">In Progress</span>
      </div>
      <div className="roadmap-item-subtext">
        Side scroller Meta Ninjaz game launches with leaderboard. $RUN tokens
        are rewarded to top 50 players with the most distance covered weekly.
        Genesis holders earn 33% of all tokens earned.
      </div>
      <div className="roadmap-item">
        <ProgressBar>Q2 2022</ProgressBar>
        <span>Events, Merch, Game Development </span>
        <span className="not-progress">In Progress</span>
      </div>
      <div className="roadmap-item-subtext">
        $RUN utility enables community to vote on a variety of proposals for
        further community development. In-game rewards including merch,
        powerups, new skins are purchasable with $RUN token. V2 of Meta Ninjaz
        launches
      </div>
    </>
  );
};
