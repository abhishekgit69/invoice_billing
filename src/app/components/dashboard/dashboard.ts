import { Component, Inject, OnInit, ChangeDetectorRef } from '@angular/core';
import {DOCUMENT, CommonModule} from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient , HttpHeaders  } from '@angular/common/http';
import { environment } from '../../../environments/environment.example';
import { Router } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import {MatPaginatorModule} from '@angular/material/paginator';

export interface PeriodicElement {
  
  id:any;
  created_at: string;
  status: string;
  amount: number;
  plan: string;
  invoice_url: string;
}

const supabaseUrl = environment.supabaseUrl;
const publishableKey = environment.publishableKey;


const ELEMENT_DATA: PeriodicElement[] = [];


@Component({
  standalone: true,
  imports: [MatTableModule, MatButtonModule, CommonModule, MatIconModule, MatMenuModule, MatDialogModule, MatPaginatorModule],
  selector: 'app-dashboard',
  styleUrl: './dashboard.scss',
  templateUrl: './dashboard.html',
})



export class Dashboard implements OnInit {

  private publishableKey = 'sb_publishable_9INvHXmFzDIBs16JP9HvPA_2a9hpyj3';

 constructor(@Inject(DOCUMENT) 
 private document: Document,
  private http: HttpClient,
  private router: Router,
  private cdr: ChangeDetectorRef
) {}


  ngOnInit(): void {
    this.changeFavicon('favicon1.ico');
    this.loadBillingHistory();
  }
  
  
  displayedColumns: string[] = ['Invoice', 'Status', 'Amount', 'Plan', 'Action'];
  dataSource = ELEMENT_DATA;

    loadBillingHistory(): void {
    const url = `${supabaseUrl}/rest/v1/billing_history?select=*`;
    const headers = new HttpHeaders({
      'apikey': this.publishableKey
    });
    // Adjust this path based on where billing-history.json is located in your assets folder
    this.http.get<PeriodicElement[]>(url, { headers }).subscribe({
      next: (data) => {
        ELEMENT_DATA.length = 0;
        ELEMENT_DATA.push(...data);
        this.dataSource = [...ELEMENT_DATA]; 
        this.cdr.detectChanges(); 
        console.log('Billing history loaded:', data);
      },
      error: (err) => console.error('Error loading JSON data:', err)
    });
  }

  downloadInvoice(invoice: string): void {
  window.open(invoice, '_blank'); 
  }
  opendialog(id: any): void {
    console.log('Dialog opened for ID:', id);
     const userConfirmed = confirm('Payment done by customer?');
     if (userConfirmed) 
     {
    const url = `${environment.supabaseUrl}/rest/v1/billing_history?id=eq.${id}`;    
    const headers = new HttpHeaders({
    'apikey': this.publishableKey
    });
    
    const body = { 
      status: 'Paid',
      // updated_timestamp: new Date().toISOString()
     };

    this.http.patch(url, body, { headers }).subscribe({
      next: (response) => {
        console.log('Database row status updated to Paid successfully:');
        alert('Status updated to Paid successfully!');
        this.loadBillingHistory(); // 🔄 Re-run grid table fetch streams to paint updated data on screen
      },
      error: (err) => {
        console.error('Database configuration PATCH error failed:', err);
        alert('Failed to connect to server backend to update status.');
      }
    });

     }
      else{
        console.log('User canceled the payment confirmation dialog.');
      }
  }

  openUserOptions(): void {
    const urlTree = this.router.createUrlTree(['/generate-invoice']);
    const urlString = this.router.serializeUrl(urlTree);
    window.open(urlString, '_blank');
    console.log('User options button clicked');
  }

  private changeFavicon(iconName: string): void {
    const favicon = this.document.querySelector('link[rel*="icon"]') as HTMLLinkElement;
    
    if (favicon) {
      favicon.href = iconName;
    }
  }
}
