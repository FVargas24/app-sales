import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SaleRequest, SaleResponse } from '../models/sale';

@Injectable({
  providedIn: 'root'
})
export class SaleService {
  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }

  createSale(sale: SaleRequest): Observable<SaleResponse> {
    return this.http.post<SaleResponse>(`${this.apiUrl}/sales`, sale);
  }
}