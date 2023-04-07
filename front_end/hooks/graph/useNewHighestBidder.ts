import { useQuery, gql } from "@apollo/client";

const GET_NEW_HIGHEST_BIDDER = gql`
  {
    newHighestBidders(first: 3, orderBy: blockTimestamp, orderDirection: desc) {
      bidder
      amount
      previousBidder
      transactionHash
      blockTimestamp
    }
  }
`;

const useNewHighestBidder = () => {
  return useQuery(GET_NEW_HIGHEST_BIDDER);
};

export { useNewHighestBidder };
