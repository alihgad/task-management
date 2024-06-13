
let task = document.querySelector("#task"),
    description = document.querySelector("#description"),
    done = document.getElementById("done")




async function getData() {
    let response = await fetch("http://localhost:3000/tasks")
    let data = await response.json()
    displayTasks(data.result)
    return
}



function displayTasks(arr) {


    let cartona = ""
    for (let i = 0; i < arr.length; i++) {
        cartona += `<tr>
            <td>${arr[i].title}</td>
            <td>${arr[i].description} </td>
            <td>${arr[i].status} </td>
            <td><div class="btn btn-success" onclick = "deleteing(${arr[i].id})">Done <i class="fa-solid fa-check-square fa-xl"></i></div></td>
          </tr>
            `
    }

    document.getElementById("tbody").innerHTML = cartona

}








async function addTask() {
    if (!task.value) {
        Swal.fire({
            icon: "error",
            title: "Empty Task",
        });
        return 0;
    }

    if (!description.value) {
        Swal.fire({
            icon: "error",
            title: "Empty Description",
        });
        return 0;
    }

    let data = {
        title: task.value,
        description: description.value,
    }

    api('POST', data)



}

async function api(method, body={},id="") {
    fetch(`http://localhost:3000/tasks/${id}`, {
        method,
        body: JSON.stringify(body),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((json) => {
            console.log(json)
            getData()
        }
        ).catch(err => console.log(err));
    ;
}


function clear() {
    task.value = ""
    description.value = ""
}

document.getElementById("add").addEventListener("click", function () {
    addTask()
    getData()
    clear()
})

async function deleteing(id) {

    
    console.log(id);
    await fetch(`http://localhost:3000/tasks/${id}`, {
        method : "DELETE",
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .catch(err => console.log(err));
    ;
    getData()
}

window.onload = function () {
    getData()
}
