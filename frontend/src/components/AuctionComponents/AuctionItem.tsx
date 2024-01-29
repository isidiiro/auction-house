import AuctionModel from "../../models/AuctionModel";
import constants from "../../constants";
import "./AuctionComponents.css";

export default function AuctionItem({ auction }: { auction: AuctionModel }) {
  return (
    <div className="auction-tile">
      <img
        src={auction.image ? auction.image : constants.defaultMissingImage}
        alt="the auction type"
        className="auction-image"
      />
      <div className="auction-data">
        <h2>{auction.name}</h2>
        <h6>
          {auction.startTime} - {auction.endTime}
        </h6>
        <p>{auction.description}</p>
      </div>
    </div>
  );
}
