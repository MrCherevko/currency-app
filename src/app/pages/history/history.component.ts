import { Component, OnInit } from '@angular/core';
import { HistoryService } from 'src/app/services/history.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit {
  currencyHistory = this.historyService.getHistory();
  displayedColumns = ['amount', 'base', 'date'];

  constructor(private historyService: HistoryService) {}

  ngOnInit(): void {
    
  }
}
