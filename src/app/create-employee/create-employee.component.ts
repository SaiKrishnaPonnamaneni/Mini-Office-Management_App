import { Component } from '@angular/core';
import { CreateEmployeeService } from '../create-employee.service';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent {

  
  

  public employeeForm:FormGroup=new FormGroup(
    {
      name: new FormControl(),
      company: new FormControl(),
      role: new FormControl(),
      package: new FormControl(),
      email: new FormControl(),
      dob: new FormControl(),
      address: new FormGroup({
        addressLine: new FormControl(),
        city: new FormControl(),
        state: new FormControl(),
        pincode: new FormControl(),

      }),
      hikes:new FormArray([]),
      workMode:new FormControl(),
    }
  )

get hikesFormArray(){
  return this.employeeForm.get("hikes") as FormArray;
}

addHike(){
  this.hikesFormArray.push(
    new FormGroup({

      year: new FormControl(),
      percentage: new FormControl(),


    })
  )
  
}
deleteHike(i:number){
  this.hikesFormArray.removeAt(i);
}

constructor(private _employeeService:CreateEmployeeService){

  this.employeeForm.get('workMode')?.valueChanges.subscribe((data: string) => {
    if (data === 'remote') {
      this.employeeForm.addControl('wifibill', new FormControl());
      this.employeeForm.removeControl('travelfee');
    } else if (data === 'wfo') {
      this.employeeForm.addControl('travelfee', new FormControl());
      this.employeeForm.removeControl('wifibill');
    }
    }
  )
}



submit(){
  console.log(this.employeeForm)

  this._employeeService.addEmployee(this.employeeForm.value).subscribe(

    (data:any)=>{
      alert("Created Succesfully")
    },
    (err:any)=>{
      alert("Creation Failed")
    }
  )
}

}
