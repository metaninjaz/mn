import { PastEventOptions } from "web3-eth-contract";
import { getApiConnectedContract } from "./getApiConnectedContract";

const TOKENS_COUNT = 10000;

const getRandomNumber = (maxIncluded: number) => {
  return Math.floor(Math.random() * (maxIncluded + 1));
};

export const getRandomIDNotMintedNFT = async (): Promise<number | null> => {
  const apiContract = await getApiConnectedContract();
  if (apiContract === null) {
    return null;
  }

  const tokensLeft = new Set<number>([...Array(TOKENS_COUNT).keys()]);

  apiContract
    .getPastEvents("Transfer", {
      filter: {
        _from: "0x0000000000000000000000000000000000000000",
      },
      fromBlock: 0,
    } as PastEventOptions)
    .then((events) => {
      for (const event of events) {
        tokensLeft.delete(event.returnValues.tokenId);
      }
    });

  if (tokensLeft.size === 0) {
    console.error("no tokens left");
    return null;
  }

  const setIdx = getRandomNumber(tokensLeft.size - 1);

  return [...tokensLeft][setIdx];
};
