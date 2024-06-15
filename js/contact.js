let validation = () => {
    let email = document.querySelector("#email"),
        name = document.querySelector("#name"),
        message = document.querySelector("#message")
    if (!email.value || !name.value || !message.value) {
        Swal.fire({
            icon: "error",
            title: "Empty field ",
        });
        return false
    } else {
        if(emailValidation())
        Swal.fire({
            icon: "success",
            title: "Done ",
        });
    }
}

let submit = document.querySelector("#submit")

submit.addEventListener("click", function (e) {
    e.preventDefault()
    validation()
});


let emailValidation = () => {
    let email = document.querySelector("#email").value
    let regx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (regx.test(email)) {
        return true
    } else {
        Swal.fire({
            icon: "error",
            title: "Invalid Email ",
        });
        return false
    }
}