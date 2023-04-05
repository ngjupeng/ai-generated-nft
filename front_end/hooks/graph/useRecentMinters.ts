import { useQuery, gql } from "@apollo/client";

const GET_RECENT_MINTERS = gql`
  {
    mintedNewNFTs(orderBy: blockTimestamp, orderDirection: desc, first: 3) {
      user
      blockTimestamp
      transactionHash
    }
  }
`;

const useRecentMinters = () => {
  return useQuery(GET_RECENT_MINTERS);
};

export { useRecentMinters };
