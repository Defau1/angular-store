export interface Products {
  id: number,
  title: string,
  price: number,
  image?: string,
  configure: ProductsConfig;
  quantity: number;
}

export interface  ProductsConfig {
  manufacturer: string,
  device_type: string,
  puff_type: string,
  maximum_power: string,
  battery_capacity: string,
  tank_capacity: string,
  description: string,
  features: string
}
