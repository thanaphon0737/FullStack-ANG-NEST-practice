import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { errorContext } from 'rxjs/internal/util/errorContext';
import { Customer } from './models/customer.model';
import { CustomerService } from './services/customer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, HttpClientModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  customers: Customer[] = [];

  constructor(private customerService: CustomerService) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.customerService.getCustomers().subscribe({
      next: (data) => {
        this.customers = data;
      },
      error: (err) => console.error('Failed to load Customers', err)
    });
  }

  onReveal(customer: Customer) {
    if (!customer.has_secret) return;
    
    customer.isLoadingSecret = true;

    this.customerService.revealSecret(customer.id).subscribe({
      next: (res) => {
        customer.revealed_id = res.national_id;
        customer.isLoadingSecret = false;

        customer.last_accessed_at = new Date().toISOString();

      },
      error: (err) => {
        alert('Error accessing confidential data!');
        customer.isLoadingSecret = false;
      }
    })
  }
}
