import { Component, OnInit } from '@angular/core';
import { ToDoListServicesService } from 'src/app/to-do-list-services.service';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.css']
})
export class ToDoListComponent implements OnInit {

  constructor(private service:ToDoListServicesService) { }
  data=[];
  ngOnInit(): void {
    this.service.getListData().subscribe(result=>{
      this.data=result;
      console.log(result);
      console.log(this.data)
    })
  }
  input="";
  id=null;
  addTodo(){
    let obj={"task":this.input};
    if(this.id){
      this.service.editTodo(this.id,obj).subscribe(data=>{
        this.ngOnInit();
        this.input="";
        this.id=null;
        console.log("Updated successfullt");
      })
    }
    else{
      this.service.addTodo(obj).subscribe(() => {
        console.log("Inserted successfully");
        this.input = ""; // Reset the input field
        this.ngOnInit();
      },
      error => {
        console.error("An error occurred:", error);
      })
    }
    
  }
  edit(ele){
    this.input=ele.task;
    this.id=ele.id;
  }
  delete(id){
    this.service.deleteTodo(id).subscribe(()=>{
      this.ngOnInit();
      console.log("deleted")
    },(err)=>{
      this.ngOnInit();
    })
  }
}
