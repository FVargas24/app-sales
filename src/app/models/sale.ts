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

export interface SaleDetail {
  product: string;
  quantity: number;
  subtotal: number;
}

export interface Sale {
  id: number;
  total: number;
  created_at: string;
  details: SaleDetail[];
}