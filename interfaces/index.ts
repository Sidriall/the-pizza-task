type TPrice = {
  [key: string]: number;
};

export interface IPizza {
  id: number;
  name: string;
  description: string;
  price: TPrice;
}

export interface IStatePizza extends IPizza {
  quantity: number;
  totalPrice: number;
}

export interface IState {
  items: IStatePizza[];
  deliveryCost: number;
  totalQuantity: number;
  total: number;
  currency: string;
}

export interface IOrderProps extends IState {
  isHistory: boolean;
}
