
const stdentForm=
document.getElementById("student-form");
const nameInput=
document.getElementById("name");
const ageInput=
document.getElementById("age");
const departmentInput=
document.getElementById("department");

const studentsContainer=
document.getElementById("students");

const searchInput=
document.getElementById("search")

const totalStudents=
document.getElementById("total-students");
const cseStudents=
document.getElementById("cse-students");
const seStudents=
document.getElementById("se-students");

const submitButton=
document.getElementById("submit-button")


const cancelButton=
document.getElementById("cancel-button")

let students=[];
let editingIndex=null;




function displayStudents(studentList=students){
    studentsContainer.innerHTML="";
    studentList.forEach(function(student){
       
         const studentCard=
         document.createElement("div");
         studentCard.classList.add("student-card")
         studentCard.innerHTML=`
         <h3>${student.Name}</h3>
         <p>Age:${student.Age}</p>
         <p>Department:${student.Department}</p>
         <div class="student-actions">
         <button class="edit-button">Edit</button>
         <button class="delete-button">Delete</button></div>`;
         const deleteButton=
         studentCard.querySelector(".delete-button");
         const editButton=
         studentCard.querySelector(".edit-button")
         
         
         
         
         
         deleteButton.addEventListener("click",function(){
             const index=
        students.findIndex(function(item){
            return item===student;
        })
            students.splice(index,1);
            saveStudent()
             displayStudents();
             updateStudents()
             
             
           
         })
         editButton.addEventListener("click",function(){
            editingIndex=
            students.findIndex(function(item){
                return item===student;
            });
            nameInput.value=
            student.Name;
            ageInput.value=
            student.Age;
            departmentInput.value=
            student.Department;

            submitButton.textContent="Update Student";
            cancelButton.hidden=false

           
         })


         studentsContainer.appendChild(studentCard);
        
    });

}
 searchInput.addEventListener("input",function(){
            const searchText=searchInput.value.toLowerCase();
            const filteredStudents=students.filter(function(student){
                return student.Name.toLowerCase().includes(searchText)
            });
            displayStudents(filteredStudents);
            updateStudents()

         })

let cseCount=0
stdentForm.addEventListener("submit",function(event){
    event.preventDefault();
    const name=nameInput.value
    const age=Number(ageInput.value)
    const department=departmentInput.value;
   const student={
    Name:name,
    Age:age,
    Department:department
   }
   if(student.Age<0){
    alert("Invalid Age!")
   }
  else if(student.Name==="" || student.Age==="" || student.Department==="" ){
    alert("You must enter your name!")
   }
   else if(editingIndex===null){
    students.push(student)
   }
   else{
    students[editingIndex]=student;
    editingIndex=null;
    submitButton.textContent=
    "Add Student";
   }
   saveStudent()
   displayStudents()
   updateStudents()
  stdentForm.reset()
 
 
  
})
function updateStudents(){
    totalStudents.textContent=students.length;
    cseStudents.textContent=students.filter(function(student){
       return student.Department==="Computer Science & Engineering"
    }).length;
    seStudents.textContent=students.filter(function(student){
       return student.Department==="Software Engineering"
    }).length;

}

function saveStudent(){
    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );
}

function loadStudent(){
    const savedStudents=
    localStorage.getItem("students");
    if(savedStudents){
        students=
        JSON.parse(savedStudents)
    }
}
loadStudent()
displayStudents()
updateStudents()

cancelButton.addEventListener("click",function(){
    editingIndex=null;
    stdentForm.reset();

    submitButton.textContent="Add Student";
    cancelButton.hidden=true
});

 




