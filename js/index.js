
let email = document.querySelector("#email"),
    password = document.querySelector("#password"),
    loginbtn = document.getElementById("login"),
    users = JSON.parse(localStorage.getItem("users"))

console.log(users);



loginbtn.addEventListener("click" ,() => {
    login()
})










