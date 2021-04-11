import { Component, OnInit } from '@angular/core';
import {DataHandlerService} from '../../service/data-handler.service';
import {Category} from '../../model/Category';
import {Task} from '../../model/Task';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories: Category[];
  activeCategory: Category;

  constructor(
    private dataHandler: DataHandlerService
  ) { }

  ngOnInit(): void {
    this.dataHandler.categories$.subscribe( category => {
      this.categories = category;
    });
  }

  showTaskByCategory(category: Category): void {
    this.activeCategory = category;
    this.dataHandler.getTaskById(category);
  }
}
