import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import SilhouettePunksProd from "../abi/prod/SilhouettePunks.json";
import SilhouettePunksTest from "../abi/test/SilhouettePunks.json";

export const getApiConnectedContract = () => {
  const { REACT_APP_ENV, REACT_APP_API_URL, REACT_APP_CONTRACT_ADDRESS } =
    process.env;

  let abi: any;
  if (REACT_APP_ENV === "test") {
    abi = SilhouettePunksTest.abi;
  } else if (REACT_APP_ENV === "prod") {
    abi = SilhouettePunksProd.abi;
  } else {
    console.error("incorrect REACT_APP_ENV value", { REACT_APP_ENV });
    return null;
  }

  const web3 = createAlchemyWeb3(REACT_APP_API_URL as string);

  const contract = new web3.eth.Contract(
    abi,
    REACT_APP_CONTRACT_ADDRESS as string
  );
  return contract;
};
