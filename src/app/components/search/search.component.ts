import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  doSearch(input: HTMLInputElement) { // 'search/:keyword .   {path: 'search/:keyword', component: ProductListComponent},
      this.router.navigateByUrl(`/search/${input}`);
  }

}