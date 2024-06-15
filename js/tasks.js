
let task = document.querySelector("#task"),
    tasks = [],
    description = document.querySelector("#description"),
    theId,
    loader = `<td colspan="4">
        <i class="fa-solid fa-search fa-beat-fade fa-3x p-5" ></i >
                </td > `


document.querySelector('#update').style.display = "none"



document.getElementById("tbody").innerHTML = loader
async function getData() {


    let response = await fetch("https://t-mapi-alihgads-projects.vercel.app/tasks")
    let data = await response.json()
    displayTasks(data.result)
    tasks = data.result
    return
}



function displayTasks(arr) {


    let cartona = ""
    if (arr.length) {
        for (let i = 0; i < arr.length; i++) {
            cartona += `<tr>
                <td>${arr[i].title}</td>
                <td>${arr[i].description} </td>
                <td>${arr[i].status} </td>
                <td>
                <div class="btn btn-success" onclick = "doneing(${arr[i].id})">Done <i class="fa-solid fa-check-square fa-xl"></i></div>
                <div class="btn btn-warning" onclick = "edit(${arr[i].id})">update </i></div>
                <div class="btn btn-danger" onclick = "deleteing(${arr[i].id})">Delete <i class="fa-solid fa-square-xmark fa-xl"></i></div>
                </td>
              </tr>
                `
        }

        document.getElementById("tbody").innerHTML = cartona
    } else {
        document.getElementById("tbody").innerHTML = `<td colspan="4">
        <h5 class='text-danger'> No Tasks Yet </h5>
                </td > `
    }

}








async function addTask() {
    document.getElementById("tbody").innerHTML = loader

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
    clear()




}

async function api(method, body = {}, id = "") {
    fetch(`https://t-mapi-alihgads-projects.vercel.app/tasks/${id}`, {
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
        )
        .catch(err => console.log(err));
    ;
}


function clear() {
    task.value = ""
    description.value = ""
}

document.getElementById("add").addEventListener("click", function () {
    addTask()
    clear()
})
document.getElementById("update").addEventListener("click", function () {
    update()
    document.querySelector('#add').style.display = "block"
    document.querySelector('#update').style.display = "none"
})

async function deleteing(id) {

    document.getElementById("tbody").innerHTML = loader

    console.log(id);
    await fetch(`https://t-mapi-alihgads-projects.vercel.app/tasks/${id}`, {
        method: "DELETE",
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .catch(err => console.log(err));
    ;
    getData()
}


async function doneing(id) {

    document.getElementById("tbody").innerHTML = loader

    await api('PATCH', {}, id)

}


function edit(id) {
    let theTask = tasks.find((task) => task.id = id)
    task.value = theTask.title
    description.value = theTask.description
    document.querySelector('#add').style.display = "none"
    document.querySelector('#update').style.display = "block"
    theId = id
    console.log(theId);
}

async function update() {
    document.getElementById("tbody").innerHTML = loader
    

    let data = {
        title: task.value,
        description: description.value,
    }
    api('PUT', data, theId)
    clear()
}

window.onload = function () {
    getData()
}


window.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        addTask()
    }
})
