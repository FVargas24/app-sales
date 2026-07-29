import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sale, SaleRequest, SaleResponse } from '../models/sale';

@Injectable({
  providedIn: 'root'
})
export class SaleService {
  private apiUrl = 'http://localhost:8000/api'; // Ajusta si usas proxy

  constructor(private http: HttpClient) { }

  createSale(sale: SaleRequest): Observable<SaleResponse> {
    return this.http.post<SaleResponse>(`${this.apiUrl}/sales`, sale);
  }

  // Método para listar ventas
  getSales(): Observable<Sale[]> {
    return this.http.get<Sale[]>(`${this.apiUrl}/sales`);
  }

  // Método para eliminar venta
  deleteSale(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/sales/${id}`);
  }
}