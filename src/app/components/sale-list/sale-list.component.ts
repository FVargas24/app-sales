import { Component, OnInit } from '@angular/core';
import { SaleService } from '../../services/sale.service';
import { Sale } from '../../models/sale';

@Component({
  selector: 'app-sale-list',
  templateUrl: './sale-list.component.html',
  styleUrls: ['./sale-list.component.scss']
})
export class SaleListComponent implements OnInit {
  sales: Sale[] = [];
  loading = true;
  message = '';

  constructor(private saleService: SaleService) { }

  ngOnInit(): void {
    this.loadSales();
  }

  loadSales(): void {
    this.loading = true;
    this.saleService.getSales().subscribe({
      next: (data) => {
        this.sales = data;
      },
      error: (error) => {
        console.error('Error cargando ventas', error);
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  deleteSale(id: number): void {
    if (confirm('¿Estás seguro de eliminar esta venta?')) {
      this.saleService.deleteSale(id).subscribe({
        next: (response) => {
          this.message = response.message || 'Venta eliminada correctamente';
          this.loadSales(); 
          setTimeout(() => this.message = '', 3000);
        },
        error: (error) => {
          console.error('Error eliminando venta', error);
          alert(error.error?.message || 'Error al eliminar la venta');
        }
      });
    }
  }
}