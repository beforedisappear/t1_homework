import { IShortProduct } from ".";

export interface ICart {
  id: number;
  products: IShortProduct[];
  total: number;
  discountedTotal: number;
  userId: number;
  totalProducts: number;
  totalQuantity: number;
}

export interface ICartResponse {
  carts: ICart[];
  total: number;
  skip: number;
  limit: number;
}

export interface ICartRequest {
  id: number;
}
