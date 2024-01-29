import { useEffect, useState } from "react";
import constants from "../../constants";
import axios from "axios";
import AuctionModel from "../../models/AuctionModel";
import AuctionItem from "./AuctionItem";
import "./AuctionComponents.css"

export default function AuctionItems() {
  const [auctionsList, setAuctionsList] = useState<AuctionModel[]>([]);

  const getAuctionsData = async () => {
    try {
      axios.defaults.baseURL = constants.baseURL;
      const response = await axios.get("/api/auctions");
      console.log(response.data);
      setAuctionsList(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAuctionsData();
  }, []);

  return (
    <div className="auctions-container">
      {auctionsList.length
        ? auctionsList.map((auction, index) => (
            <AuctionItem key={index} auction={auction} />
          ))
        : "No Auctions Found"}
    </div>
  );
}
