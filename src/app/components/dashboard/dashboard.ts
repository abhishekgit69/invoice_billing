import { Component, Inject, OnInit, ChangeDetectorRef } from '@angular/core';
import {DOCUMENT, CommonModule} from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient , HttpHeaders  } from '@angular/common/http';
import { environment } from '../../../environments/environment'; 

export interface PeriodicElement {
  
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
  imports: [MatTableModule, MatButtonModule, CommonModule ],
  selector: 'app-dashboard',
  styleUrl: './dashboard.scss',
  templateUrl: './dashboard.html',
})



export class Dashboard implements OnInit {

  private publishableKey = 'sb_publishable_9INvHXmFzDIBs16JP9HvPA_2a9hpyj3';

 constructor(@Inject(DOCUMENT) 
 private document: Document,
  private http: HttpClient,
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
        // this.dataSource = data;
        // console.log('Billing history data loaded:', this.dataSource);
        ELEMENT_DATA.push(...data);
        // console.log('Billing history data loaded:', data);
        this.dataSource = [...ELEMENT_DATA]; 
        this.cdr.detectChanges(); 
      },
      error: (err) => console.error('Error loading JSON data:', err)
    });
  }

  downloadInvoice(invoice: string): void {
    // Implement the logic to download the invoice based on the provided invoice parameter
  // console.log(`Downloading invoice: ${invoice}`);
  window.open(invoice, '_blank'); 

  }

  private changeFavicon(iconName: string): void {
    const favicon = this.document.querySelector('link[rel*="icon"]') as HTMLLinkElement;
    
    if (favicon) {
      favicon.href = iconName;
    }
  }
}

