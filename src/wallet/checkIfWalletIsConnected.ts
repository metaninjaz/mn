import { Account } from "./Account";

export const checkIfWalletIsConnected = async ({
  setCurrentAccount,
}: {
  setCurrentAccount: (acc: Account) => void;
}): Promise<boolean> => {
  const { ethereum } = window;

  if (!ethereum) {
    console.error("Ethereum object doesn't exist!");
    return false;
  }

  /*
   * Check if we're authorized to access the user's wallet
   */
  const accounts = await ethereum.request<Account[]>({
    method: "eth_accounts",
  });

  /*
   * User can have multiple authorized accounts, we grab the first one if its there!
   */
  if (accounts && accounts.length > 0) {
    setCurrentAccount(accounts[0] as Account);
    return true;
  } else {
    return false;
  }
};
