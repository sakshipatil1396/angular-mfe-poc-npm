import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
}

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="products-wrapper">
      <div class="mfe-banner">
        🛍️ <strong>Products MFE</strong> — running on port 4202, loaded remotely into the Shell
      </div>

      <div class="toolbar">
        <h2>Product Catalog</h2>
        <div class="toolbar-right">
          <input
            [(ngModel)]="searchTerm"
            (ngModelChange)="applyFilter()"
            placeholder="🔍 Search products..."
            class="search-input"
          />
          <button class="btn-primary" (click)="addProduct()">+ Add Product</button>
        </div>
      </div>

      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Product Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            @for (p of filteredProducts; track p.id) {
              <tr>
                <td class="id-col">#{{ p.id }}</td>
                <td><strong>{{ p.name }}</strong></td>
                <td><span class="chip">{{ p.category }}</span></td>
                <td class="price">\${{ p.price | number:'1.2-2' }}</td>
                <td>{{ p.stock }}</td>
                <td>
                  <span class="status-badge" [class]="getStatusClass(p.status)">
                    {{ p.status }}
                  </span>
                </td>
                <td class="actions">
                  <button class="btn-icon" (click)="editProduct(p)" title="Edit">✏️</button>
                  <button class="btn-icon btn-danger" (click)="deleteProduct(p.id)" title="Delete">🗑️</button>
                </td>
              </tr>
            }
            @empty {
              <tr><td colspan="7" class="empty">No products found.</td></tr>
            }
          </tbody>
        </table>
      </div>

      <div class="table-footer">
        Showing {{ filteredProducts.length }} of {{ products.length }} products
      </div>
    </div>
  `,
  styles: [`
    .products-wrapper { max-width: 1000px; margin: 0 auto; }
    .mfe-banner {
      background: linear-gradient(90deg, #064e3b, #065f46);
      color: #6ee7b7; padding: 10px 18px; border-radius: 8px;
      margin-bottom: 20px; font-size: 13px;
    }
    .toolbar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
    .toolbar h2 { margin: 0; color: #1a1a2e; }
    .toolbar-right { display: flex; gap: 10px; align-items: center; }
    .search-input {
      padding: 8px 14px; border: 1px solid #ddd; border-radius: 20px;
      font-size: 14px; width: 220px; outline: none;
    }
    .search-input:focus { border-color: #3b82f6; }
    .btn-primary {
      background: #1a1a2e; color: #fff; border: none;
      padding: 8px 18px; border-radius: 20px; cursor: pointer; font-size: 14px;
    }
    .btn-primary:hover { background: #e94560; }
    .table-container { background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,.07); }
    table { width: 100%; border-collapse: collapse; }
    thead { background: #1a1a2e; color: #fff; }
    th { padding: 12px 16px; text-align: left; font-size: 13px; font-weight: 600; }
    td { padding: 12px 16px; border-bottom: 1px solid #f0f0f0; font-size: 14px; }
    tr:last-child td { border-bottom: none; }
    tr:hover td { background: #f9f9f9; }
    .id-col { color: #aaa; font-size: 13px; }
    .chip {
      background: #e0e7ff; color: #3730a3;
      padding: 2px 10px; border-radius: 12px; font-size: 12px; font-weight: 500;
    }
    .price { font-weight: 600; color: #1a1a2e; }
    .status-badge { padding: 3px 10px; border-radius: 12px; font-size: 12px; font-weight: 600; }
    .in-stock  { background: #dcfce7; color: #16a34a; }
    .low-stock { background: #fef3c7; color: #d97706; }
    .out-of-stock { background: #fee2e2; color: #dc2626; }
    .actions { display: flex; gap: 6px; }
    .btn-icon { background: none; border: 1px solid #e5e7eb; border-radius: 6px; padding: 4px 8px; cursor: pointer; font-size: 14px; }
    .btn-icon:hover { background: #f3f4f6; }
    .btn-danger { border-color: #fca5a5; }
    .btn-danger:hover { background: #fee2e2; }
    .empty { text-align: center; color: #aaa; padding: 32px; font-style: italic; }
    .table-footer { text-align: right; padding: 10px 4px; font-size: 13px; color: #888; }
  `],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [
    { id: 1, name: 'Angular Pro Subscription',  category: 'Software',   price: 99.99,  stock: 999, status: 'In Stock' },
    { id: 2, name: 'Mechanical Keyboard MX',     category: 'Hardware',   price: 149.95, stock: 42,  status: 'In Stock' },
    { id: 3, name: '4K Monitor UltraWide',       category: 'Hardware',   price: 599.00, stock: 7,   status: 'Low Stock' },
    { id: 4, name: 'TypeScript Handbook (PDF)',   category: 'Books',      price: 29.99,  stock: 999, status: 'In Stock' },
    { id: 5, name: 'Wireless Mouse Ergonomic',   category: 'Hardware',   price: 59.95,  stock: 0,   status: 'Out of Stock' },
    { id: 6, name: 'Docker Desktop License',     category: 'Software',   price: 21.00,  stock: 999, status: 'In Stock' },
    { id: 7, name: 'USB-C Hub 7-in-1',           category: 'Accessories',price: 39.99,  stock: 15,  status: 'Low Stock' },
    { id: 8, name: 'WebStorm IDE Annual',        category: 'Software',   price: 69.99,  stock: 999, status: 'In Stock' },
  ];

  filteredProducts: Product[] = [];
  searchTerm = '';

  ngOnInit(): void {
    this.filteredProducts = [...this.products];
    console.log('[mfe-products] ProductListComponent loaded via Module Federation ✅');
  }

  applyFilter(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredProducts = this.products.filter(
      (p) =>
        p.name.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term)
    );
  }

  getStatusClass(status: string): string {
    return status.toLowerCase().replace(/ /g, '-');
  }

  addProduct(): void {
    alert('Add product dialog — integrate your form/modal here!');
  }

  editProduct(p: Product): void {
    alert(`Edit: ${p.name}`);
  }

  deleteProduct(id: number): void {
    if (confirm('Delete this product?')) {
      this.products = this.products.filter((p) => p.id !== id);
      this.applyFilter();
    }
  }
}

