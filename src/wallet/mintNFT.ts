import { addOrReplaceNotification } from "../Notifications/addOrReplaceNotification";
import { NotificationType } from "../Notifications/Notifications";
import { NotificationsSetter } from "../Notifications/NotificationsSetter";
import { generateUUID } from "../utils/generateUUID";
import { Account } from "./Account";
import { askContractToMintNFT } from "./askContractToMintNFT";
import { connectWallet } from "./connectWallet";
import { getContractThroughEthereumProvider } from "./getContractThroughEthereumProvider";
import { getRandomIDNotMintedNFT } from "./getRandomIDNotMintedNFT";

const isNonNegativeInteger = (str: string) => {
  return /^([1-9]\d*|0)$/.test(str);
};

export const mintNFT = async ({
  currentAccount,
  setCurrentAccount,
  tokenID,
  setNotifications,
}: {
  currentAccount: Account;
  setCurrentAccount: (acc: Account) => void;
  tokenID: string;
  setNotifications: NotificationsSetter;
}): Promise<boolean> => {
  let acc: Account | undefined = currentAccount;

  const notificationID: string = generateUUID();

  if (!acc) {
    acc = await connectWallet({ setCurrentAccount });
    if (!acc) {
      addOrReplaceNotification({
        newNotification: { type: NotificationType.Error, id: notificationID },
        setNotifications,
      });
      return false;
    }
  }

  addOrReplaceNotification({
    newNotification: { type: NotificationType.MintPending, id: notificationID },
    setNotifications,
  });

  const connectedContract = await getContractThroughEthereumProvider();
  if (!connectedContract) {
    addOrReplaceNotification({
      newNotification: { type: NotificationType.Error, id: notificationID },
      setNotifications,
    });
    return false;
  }

  let nonEmptyTokenID: number;
  if (tokenID === "") {
    const result = await getRandomIDNotMintedNFT();
    if (result === null) {
      addOrReplaceNotification({
        newNotification: { type: NotificationType.Error, id: notificationID },
        setNotifications,
      });
      return false;
    }
    nonEmptyTokenID = result;
  } else {
    tokenID = tokenID.trim();
    if (!isNonNegativeInteger(tokenID)) {
      console.error("only non-negative integers are allowed");
      addOrReplaceNotification({
        newNotification: { type: NotificationType.Error, id: notificationID },
        setNotifications,
      });
      return false;
    }

    nonEmptyTokenID = parseInt(tokenID);
  }

  return askContractToMintNFT({
    tokenID: nonEmptyTokenID,
    setNotifications,
    notificationID,
  });
};
