import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {DataHandlerService} from '../../service/data-handler.service';
import {Task} from '../../model/Task';
import {DataSource} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit, AfterViewInit {
  tasks: Task[];

  @ViewChild(MatPaginator, {static: false})
  private paginator: MatPaginator;
  @ViewChild(MatSort, {static: false})
  private sort: MatSort;

  dataSource: MatTableDataSource<Task>;
  displayedColumn: string[] = ['color', 'id', 'title', 'date', 'priority', 'category'];

  constructor(
    private dataHandler: DataHandlerService
  ) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<Task>();

    this.dataHandler.task$.subscribe(task => {
      this.tasks = task;
      this.refreshTable();
    });
  }

  ngAfterViewInit(): void{
    this.addTableObjects();
  }

  toggleCompleted(task: Task): void{
    task.completed = !task.completed;
  }

  getPriorityColor(task: Task): string{
    if (task.completed){
      return 'green';
    } else if (task.priority && !task.completed){
      return task.priority.color;
    } else {
      return 'none';
    }
    // return task.priority && task.priority.color ? task.priority.color : 'none';
  }

  refreshTable(): void{
    this.dataSource.data = this.tasks;

    this.addTableObjects();

    this.dataSource.sortingDataAccessor = (task, colName): string | null | number => {
      switch (colName) {
        case 'title': {
          return task.title;
        }
        case 'date': {
          return task.date ? task.date.getTime() : null;
        }
        case 'priority': {
          return task.priority ? task.priority.id : null;
        }
        case 'category': {
          return task.category ? task.category.title : null;
        }
      }
    };
  }

  addTableObjects(): void{
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
}
