import {
  Approval as ApprovalEvent,
  ApprovalForAll as ApprovalForAllEvent,
  GrantedPermission as GrantedPermissionEvent,
  MintedNewLimitedNFT as MintedNewLimitedNFTEvent,
  MintedNewNFT as MintedNewNFTEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  Transfer as TransferEvent,
  WithdrawFund as WithdrawFundEvent,
} from "../generated/AINFT/AINFT";
import { MintedNewLimitedNFT, MintedNewNFT } from "../generated/schema";

export function handleMintedNewLimitedNFT(
  event: MintedNewLimitedNFTEvent
): void {
  let entity = new MintedNewLimitedNFT(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.user = event.params.user;
  entity.tokenId = event.params.tokenId;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleMintedNewNFT(event: MintedNewNFTEvent): void {
  let entity = new MintedNewNFT(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.user = event.params.user;
  entity.tokenId = event.params.tokenId;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}
