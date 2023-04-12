import { useQuery, gql } from "@apollo/client";

const GET_ACTIVE_ITEMS = gql`
  {
    activeItems(
      where: { buyer: "0x0000000000000000000000000000000000000000" }
    ) {
      id
      seller
      tokenId
      nftAddress
      votes
      price
      buyer
    }
  }
`;

const useActiveItems = () => {
  return useQuery(GET_ACTIVE_ITEMS);
};

export { useActiveItems };
