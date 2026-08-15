const nameRegex = /^[A-Za-z ]{3,30}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const students =[];

class Student{
    constructor(name,email,course='Not Selected'){
        this.name = name;
        this.email = email;
        this.course = course;
    }
}

const getSkills = () => {
    const checked = document.querySelectorAll('input[name="skills"]:checked');
    return [...checked].map(skill => skill.value);
}

const saveStudent = (student) => {
    return new Promise((resolve) => {
        setTimeout(()=>{
            resolve("Student Saved successfully!")
        },1000)
    })
}

document.getElementById("form").addEventListener('submit',async(event)=>{
        event.preventDefault();
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const age= document.getElementById('age').value;
        const course = document.getElementById('course').value;
        const gender = document.querySelector('input[name="gender"]:checked')?.value;
        const skills = getSkills();

        if(!nameRegex.test(name)){
            alert("Invalid Name");
            return;
        }
        if(!emailRegex.test(email)){
            alert("Invalid Email");
            return;
        }
         if(!age){
            alert("Invalid age");
            return;
        }
         if(!gender){
            alert("Select gender");
            return;
        }
        if(skills.length === 0){
            alert("Select atleast one skill");
            return;
        }
        if(!course){
            alert("Select course");
            return;
        }

        const student = new Student(name,email,course);
        student.age = age;
        student.gender = gender;
        student.skills = skills;

        const updateStudent = {
            ...student,
            status: "Registered"
        };

        students.push(updateStudent);

        const showMessage = (message) => {
            document.getElementById("message").textContent = message;
        }

        const message = await saveStudent(updateStudent);

        showMessage(message);

        displayStudents();

        event.target.reset();
})
const displayStudents = () => {
    const output = document.getElementById('output');
     output.innerHTML = '';
    students.forEach(student => {
        const {name,email,course,gender,skills,status} = student;

        output.innerHTML += `
        <div>
            <h3>${name}</h3>
            <p>Email: ${email}</p>
            <p>Gender: ${gender}</p>
            <p>Course: ${course}</p>
            <p>Skills: ${skills.join(', ')}</p>
            <p>Status: ${status}</p>
        </div>
        <hr>`
    })
}