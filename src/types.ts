export type Role = 'ADMIN' | 'EMPLEADO';
export type Location = 'Local A' | 'Local B';

export interface User {
  id: string;
  name: string;
  role: Role;
  username: string;
  password?: string;
}

export type FormatType = 'Cucurucho' | '1/4 KG' | '1/2 KG' | '1 KG';

export interface Format {
  id: string;
  name: FormatType;
  price: number;
  maxFlavors: number;
}

export interface Flavor {
  id: string;
  name: string;
  stockPercentage: number;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  stock: number;
}

export interface CartItem {
  id: string;
  product?: Product;
  format?: Format;
  flavors?: string[];
  quantity: number;
  price: number;
}

export interface Sale {
  id: string;
  items: CartItem[];
  total: number;
  timestamp: string;
  user: string;
  location: Location;
}
