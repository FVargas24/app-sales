export interface SaleItem {
  product_id: number;
  quantity: number;
}

export interface SaleRequest {
  user_id: number;
  items: SaleItem[];
}

export interface SaleResponse {
  message: string;
  sale_id: number;
  total: number;
}