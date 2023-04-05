import { ethers } from "ethers";

const removeDecimals = (num: string): string => {
  return ethers.utils.formatEther(num).toString();
};

const getEthAmount = (usdAmount: number, priceInUSD: string): string => {
  const removedPriceInUSDDecimals = Number(removeDecimals(priceInUSD));
  const ethAmount = usdAmount / removedPriceInUSDDecimals; // USD

  return ethAmount.toString();
};

export { removeDecimals, getEthAmount };
