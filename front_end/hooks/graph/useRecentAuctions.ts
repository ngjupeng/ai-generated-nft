import { useQuery, gql } from "@apollo/client";

const GET_RECENT_AUCTIONS = gql`
  {
    auctionEnds(orderBy: blockTimestamp, orderDirection: desc, first: 3) {
      winner
      amounBid
      transactionHash
      tokenId
      blockTimestamp
    }
  }
`;

const useRecentAuctions = () => {
  return useQuery(GET_RECENT_AUCTIONS);
};

export { useRecentAuctions };
