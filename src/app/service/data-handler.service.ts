import { Injectable } from '@angular/core';
import {Category} from '../model/Category';
import {TestData} from '../data/TestData';
import {Task} from '../model/Task';
import {BehaviorSubject, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataHandlerService {

  task$ = new BehaviorSubject<Task[]>(TestData.tasks);
  categories$ = new BehaviorSubject<Category[]>(TestData.categories);

  constructor() {
  }

  getCategories(): void{
    this.categories$.next(TestData.categories);
  }

  getTasks(): void{
    this.task$.next(TestData.tasks);
  }

  getTaskById(category: Category): void{
    const tasks = TestData.tasks.filter(task => task.category?.title === category.title);
    this.task$.next(tasks);
  }
}
