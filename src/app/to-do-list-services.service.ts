import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ToDoListServicesService {

  constructor(private _http: HttpClient) { }

  getListData(): Observable<any> {
    return this._http.get("http://localhost:3011/").pipe(
      catchError((error: any) => {
        console.error('An error occurred:', error);
        return throwError(error);
      })
    );
  }

  addTodo(data){
    return this._http.post("http://localhost:3011/addTodo",data);
  }

  deleteTodo(id){
    return this._http.delete(`http://localhost:3011/deleteTodo/${id}`);
  }

  editTodo(id,data){
    return this._http.put(`http://localhost:3011/updateTodo/${id}`,data);
  }
}
