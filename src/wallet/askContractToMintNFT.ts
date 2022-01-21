import { ethers } from "ethers";
import { addOrReplaceNotification } from "../Notifications/addOrReplaceNotification";
import { NotificationType } from "../Notifications/Notifications";
import { NotificationsSetter } from "../Notifications/NotificationsSetter";
import { getContractThroughEthereumProvider } from "./getContractThroughEthereumProvider";
import { getExplorerHref } from "./getExplorerHref";

export const askContractToMintNFT = async ({
  tokenID,
  notificationID,
  setNotifications,
}: {
  tokenID: number;
  notificationID: string;
  setNotifications: NotificationsSetter;
}): Promise<boolean> => {
  const connectedContract = await getContractThroughEthereumProvider();
  if (connectedContract === null) {
    addOrReplaceNotification({
      newNotification: { type: NotificationType.Error, id: notificationID },
      setNotifications,
    });
    return false;
  }

  try {
    const overrides = {
      value: ethers.utils.parseEther("0.02"), // ether in this case MUST be a string
    };

    //  Going to pop wallet now to pay gas...
    const nftTxn = await connectedContract.mint(tokenID, overrides);

    const explorerHref = getExplorerHref({ transactionHash: nftTxn.hash });
    if (!explorerHref) {
      setNotifications([{ type: NotificationType.Error, id: notificationID }]);
      return false;
    }

    addOrReplaceNotification({
      newNotification: {
        type: NotificationType.MintPending,
        id: notificationID,
        explorerHref,
      },
      setNotifications,
    });

    // Mining... please wait.
    await nftTxn.wait();

    addOrReplaceNotification({
      newNotification: {
        type: NotificationType.MintSuccessful,
        id: notificationID,
        explorerHref,
      },
      setNotifications,
    });
    return true;
  } catch (error) {
    addOrReplaceNotification({
      newNotification: { type: NotificationType.Error, id: notificationID },
      setNotifications,
    });
    console.error(error);
  }

  return false;
};
