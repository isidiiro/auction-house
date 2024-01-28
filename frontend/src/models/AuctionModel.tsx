import ProductId from "./ProductIdModel";

export default interface Auction {
    _id: string,
    name: string,
    description: string,
    image: string,
    startTime: string,
    endTime: string,
    products: ProductId[]
}