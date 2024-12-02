import { Component } from '@angular/core';
import { CreateEmployeeService } from '../create-employee.service';

@Component({
  selector: 'app-all-employees',
  templateUrl: './all-employees.component.html',
  styleUrls: ['./all-employees.component.css']
})
export class AllEmployeesComponent {

  employee:any=[];
  term:string="";
  column:string="";
  order:string="";
  limit:number=0;
  page:number=0;
  constructor(private _allEmployee:CreateEmployeeService){


  

  

  
    this._allEmployee.getEmployees().subscribe(
      (data:any)=>{
        return this.employee=data;
      },
      (err:any)=>{

          console.log("Error")
      }
    )

    }

    filter(){
            this._allEmployee.getFilteredEmployees(this.term).subscribe(
              (data:any)=>{
                this.employee=data;
              },
              (err:any)=>{
                console.log("internal server error");
              }
            )      
    }

    sort(){
      this._allEmployee.getSortedEmployees(this.column,this.order).subscribe(
        (data:any)=>{
          this.employee=data;
        },
        (err:any)=>{
          console.log("internal server error")
        }
      )
    }


    pagination(){
      this._allEmployee.getPagedEmployees(this.limit,this.page).subscribe(
        (data:any)=>{
           this.employee=data;
        },
        (err:any)=>{
          console.log("internal server error")
        }
      )

    }

    delete(id:string){

      this._allEmployee.deleteEmployee(id).subscribe(
        (data:any)=>{
         alert("Deleted Succesfully")
        },
        (err:any)=>{
          alert("internal server error")
        }
      )

    }




  

}

