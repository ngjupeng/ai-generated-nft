import { useQuery, gql } from "@apollo/client";

const GET_ACTIVE_ITEMS = gql`
  {
    activeItems {
      id
      seller
      tokenId
      nftAddress
      votes
      price
    }
  }
`;

const useActiveItems = () => {
  return useQuery(GET_ACTIVE_ITEMS);
};

export { useActiveItems };
