import Alert from "./src/Alert/Alert.js";
import LocalStorage from "./src/LocalStorage/LocalStorage.js";
import Validation from "./src/Validation/Validation.js";

//linking dom
const studentForm = document.querySelector('#studentForm');
const mass = document.querySelector('.alertSMS');
const displayData = document.querySelector('#displayData');
const viewDataDisplay = document.querySelector('#viewDataDisplay');
const update = document.querySelector('#update');
const alertSMSUpdate = document.querySelector('.alertSMSUpdate');

//form submit
studentForm.onsubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const data = Object.fromEntries(form.entries());
    
    if(!data.name || !data.email || !data.photo){
        mass.innerHTML = Alert.warning('All Field Are Required..!')
    }else if(!Validation.emailCheck(data.email)){
        mass.innerHTML = Alert.danger('Invalid Email Address..!')
    }else {
        LocalStorage.save("student",{...data,id : Date.now()});
        e.target.reset();
        display();
    }
   
}

const display = () => {
    let list = ``;
    const getLsData = LocalStorage.get("student");
    if(getLsData){
        getLsData.forEach((item,index) => {
            list += `<tr >
            <td scope="row">${index+1}</td>
            <td><img src="${item.photo}" alt=""></td>
            <td>${item.name}</td>
            <td>${item.email}</td>
            <td>
                <button data-bs-toggle="modal" data-bs-target="#view" view-data="${item.id}" class="btn btn-info">
                    <i class="fa fa-eye" aria-hidden="true"></i>
                </button>
                <button data-bs-toggle="modal" data-bs-target="#edit" edit-data="${item.id}" class="btn btn-primary">
                    <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                </button>
                <button delete-data="${item.id}" class="btn btn-danger">
                    <i class="fa fa-trash" aria-hidden="true"></i>
                </button>
            </td>
          </tr>`;
        });
    }

    displayData.innerHTML = list;
}

display();

displayData.onclick = (e) => {
   const view = e.target.getAttribute("view-data");
   const edit = e.target.getAttribute("edit-data");
   const deleteData = e.target.getAttribute("delete-data");

   if(view){
     const lsData = LocalStorage.get('student');
     const viewData = lsData.find(item => item.id == view);
        
        const viewStudent = `<img src="${viewData.photo}" alt="">
        <h2>${viewData.name}</h2>
        <p>${viewData.email}</p>`;

        viewDataDisplay.innerHTML = viewStudent;
   }
   if(edit){
     const lsData = LocalStorage.get('student');
     const editData = lsData.find(item => item.id == edit);
     update.innerHTML = `
                <div class="form-group mb-3">
                <label for="name">Name</label>
                <input value="${editData.name}" name="name" type="text" class="form-control" id="name">
                <input value="${editData.id}" name="id" type="hidden">
                </div>
                <div class="form-group mb-3">
                    <label for="email">Email address</label>
                    <input value="${editData.email}" name="email" type="text" class="form-control" id="email">
                </div>
                <div class="form-group">
                    <label for="photo">Student Photo</label>
                    <input value="${editData.photo}" name="photo" type="text" class="form-control" id="photo">
                </div>
                <br>
                <button type="submit" class="btn btn-primary">Submit</button>
            `;
   }
   if(deleteData){
      if(confirm("Are you sure for Delete This Item..!")){
        const lsData = LocalStorage.get('student');
        const deleteItem = lsData.filter(item => item.id != deleteData);
        LocalStorage.update("student",deleteItem);
        display();
      }
     
   }

}

update.onsubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const {name,email,photo,id} = Object.fromEntries(form.entries());
    
    if(!name || !email || !photo){
        alertSMSUpdate.innerHTML = Alert.warning('All Field Are Required..!')
    }else if(!Validation.emailCheck(email)){
        alertSMSUpdate.innerHTML = Alert.danger('Invalid Email Address..!')
    }else {
        const lsData = LocalStorage.get('student');
        const findItem = lsData.findIndex(item => item.id == id);
        lsData[findItem] = {name,email,photo,id}
        LocalStorage.update("student",lsData);
        display();
        alertSMSUpdate.innerHTML = Alert.success('Update Success..!')
    }
}
