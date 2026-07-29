import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { SaleService } from '../../services/sale.service';
import { Product } from '../../models/product';
import { SaleItem, SaleRequest } from '../../models/sale';

@Component({
  selector: 'app-sale-form',
  templateUrl: './sale-form.component.html',
  styleUrls: ['./sale-form.component.scss']
})
export class SaleFormComponent implements OnInit {
  products: Product[] = [];
  items: SaleItem[] = [];
  loading = false;
  message = '';
  messageType = '';

  constructor(
    private productService: ProductService,
    private saleService: SaleService
  ) { }

  ngOnInit(): void {
    this.loadProducts();
    this.addItem();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (error) => {
        console.error('Error cargando productos', error);
      }
    });
  }

  addItem(): void {
    this.items.push({
      product_id: 0,
      quantity: 1
    });
  }

  removeItem(index: number): void {
    if (this.items.length > 1) {
      this.items.splice(index, 1);
    }
  }

  createSale(): void {
    // Validar que haya al menos un item
    if (this.items.length === 0) {
      this.showMessage('Agrega al menos un producto', 'error');
      return;
    }

    // Validar items
    for (const item of this.items) {
      if (item.product_id === 0) {
        this.showMessage('Selecciona un producto válido', 'error');
        return;
      }
      if (item.quantity <= 0) {
        this.showMessage('La cantidad debe ser mayor que cero', 'error');
        return;
      }
    }

    const saleRequest: SaleRequest = {
      user_id: 1,
      items: this.items
    };

    this.loading = true;
    this.saleService.createSale(saleRequest).subscribe({
      next: (response) => {
        this.showMessage(`Venta creada correctamente. Total: $${response.total}`, 'success');
        this.resetForm();
      },
      error: (error) => {
        console.error('Error creando venta', error);
        const errorMsg = error.error?.message || 'Error al crear la venta';
        this.showMessage(errorMsg, 'error');
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  resetForm(): void {
    this.items = [];
    this.addItem();
  }

  showMessage(msg: string, type: string): void {
    this.message = msg;
    this.messageType = type;
    setTimeout(() => {
      this.message = '';
    }, 3000);
  }

  getProductPrice(productId: number): number {
    const product = this.products.find(p => p.id === productId);
    return product ? product.price : 0;
  }

  getProductStock(productId: number): number {
    const product = this.products.find(p => p.id === productId);
    return product ? product.stock : 0;
  }

  getSubtotal(item: SaleItem): number {
    return this.getProductPrice(item.product_id) * item.quantity;
  }
}