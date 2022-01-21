import React, { useEffect, useState } from "react";
import { Footer } from "./Footer/Footer";
import { Main } from "./Main/Main";
import { Notification, Notifications } from "./Notifications/Notifications";
import { Roadmap } from "./Roadmap/Roadmap";
import { Showcase } from "./Showcase/Showcase";
import "./styles/App.css";
import { SectionMetaNinjaz } from "./SectionMetaNinjaz/SectionMetaNinjaz";
import { preloadImages } from "./utils/preloadImages";
import { Account } from "./wallet/Account";
import { checkIfWalletIsConnected } from "./wallet/checkIfWalletIsConnected";
import { mintNFT } from "./wallet/mintNFT";
import { SocialMediaButtons } from "./SocialMediaButtons";

function App() {
  const [currentAccount, setCurrentAccount] = useState<Account>("");
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    checkIfWalletIsConnected({ setCurrentAccount });
    // preloadImages(
    //   ...[...Array(rowImgCount * showcaseRowsCount).keys()].map(
    //     (n) => `/sp/${n}.png`
    //   )
    // );
  }, []);

  return (
    <>
      <div className="app">
        <SocialMediaButtons />
        <Main
          mintNFT={({ tokenID }: { tokenID: string }) =>
            mintNFT({
              currentAccount,
              setCurrentAccount,
              tokenID,
              setNotifications,
            })
          }
        />
        <SectionMetaNinjaz />
        <Roadmap />
        <Showcase />
      </div>
      <Footer />
      <Notifications
        notifications={notifications}
        setNotifications={setNotifications}
      />
    </>
  );
}

export default App;
