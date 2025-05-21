//getTotal

let title =document.getElementById("title");
let price =document.getElementById("price");
let taxes =document.getElementById("taxes");
let ads =document.getElementById("ads");
let discount =document.getElementById("discount");
let total =document.getElementById("total");
let count =document.getElementById("count");
let category =document.getElementById("category");
let submit =document.getElementById("submit");
let deleteAllButton = document.querySelector(".deleteAllButton");

let mood = "Create"
let tmp;



function getTotal() {
    // if(price.value != ""){
    if(price.value != "" && taxes.value  !="" && ads.value  !="" && discount.value  !=""){
        if(price.value >=0 && taxes.value  >=0 && ads.value  >=0 && discount.value  >=0){
            total.innerHTML = (+price.value + +taxes.value + +ads.value) - +discount.value;
            total.style.backgroundColor = "var(--primaryColor)"
        }else{
            Swal.fire({
                icon:"error",
                title: "Oops",
                text: "You Have Entered A Negative Value",
                footer: "Make Sure All Inputs",
                confirmButtonColor: "#f37979",
            })
        }
    }else{
        total.textContent = String("None")
        if (total.textContent === "None"){
            total.style.backgroundColor = "red"
        }
    }
};
[price,taxes,ads,discount].forEach((input) =>{
    input.addEventListener("input",getTotal)
});


//Create
let dataPro = [];
if(localStorage.Products != null){
    dataPro = JSON.parse(localStorage.Products);
    ShowData()
    deleteAllButton.textContent = "Delete All" +" " + `(${dataPro.length})`

}else{
    let dataPro = [];
}

submit.onclick = function () {
    let newpro = {
        title : title.value,
        price : price.value,
        taxes : taxes.value,
        ads : ads.value,
        discount : discount.value,
        total : total.innerHTML,
        count : count.value,
        category : category.value,
    }

    if(title.value != "" && price.value != "" && category.value != "" && count.value <= 100){
    if(mood === "Create"){
        if(newpro.count > 1){
            for(let i = 0; i< newpro.count; i++){
                dataPro.push(newpro)
            }
        }else{
            dataPro.push(newpro)
        }
        Swal.fire({
            title: "Product Added",
            icon: "success",
            timer: 1300,
            showConfirmButton: false,
            background: "white"
        })
    }else{
        dataPro[tmp] = newpro
        mood = "Create";
        submit.value = "Create";
        count.style.display = "block"
        category.style.width = "45%"

        Swal.fire({
        title: "Product Updated",
        icon: "success",
        timer: 1300,
        showConfirmButton: false,
        background: "white"
        })
    }
        cleareData()

    }

    localStorage.setItem("Products",JSON.stringify(dataPro))

    
    deleteAllButton.style.display = "block";
    deleteAllButton.textContent = "Delete All" +" " + `(${dataPro.length})`

    ShowData()
}




//Claer
function cleareData() {
    title.value = "";
    price.value = "";
    taxes.value = "";
    ads.value = "";
    discount.value = "";
    total.innerHTML = "";
    count.value = "";
    category.value = "";
}


//Show Data
function ShowData() {
    getTotal();
    let table = "";
    for(let i = 0; i<dataPro.length; i++){
        table +=`
            <tr>
                <td>${i}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                <td><button onclick="updateProduct(${i})"  id="update">Update</button></td>
                <td><button onclick="deleteProduct(${i})" id="delete">Delete</button></td>

            </tr>`
    }
    document.querySelector("tbody").innerHTML = table;
}


//delete All
if(dataPro.length <= 0){
    deleteAllButton.style.display = "none";

}else{
        deleteAllButton.style.display = "block";
}
deleteAllButton.onclick = function(){

    var swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
        });
        swalWithBootstrapButtons.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete All!",
            confirmButtonColor: "#f37979",
            cancelButtonText: "No, cancel!",
            reverseButtons: true
        }).then((result) => {
        if (result.isConfirmed) {
            dataPro.splice(0);
            localStorage.clear()
            ShowData()
            deleteAllButton.style.display = "none";

            swalWithBootstrapButtons.fire({
                title: "Deleted!",
                text: "All Data Has been Deleted",
                icon: "success",
                timer: 1300,
                showConfirmButton: false,
            });
        } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
    ) {
    swalWithBootstrapButtons.fire({
        title: "Cancelled",
        text: "The Operation Has been Canceled",
        icon: "error",
        timer: 1300,
        showConfirmButton: false,

    });
    }
})
    // dataPro.splice(0);
    // localStorage.clear()
    // ShowData()
    // deleteAllButton.style.display = "none";

}


//Delete One Pruduct
function deleteProduct(id) {
    dataPro.splice(id,1);
    localStorage.Products = JSON.stringify(dataPro);
    Swal.fire({
        title: "Prodect Deleted",
        icon: "success",
        timer: 1300,
        showConfirmButton: false,
        background: "white"
    })
    ShowData()
    if(dataPro.length <= 0){
    deleteAllButton.style.display = "none";

}else{
        deleteAllButton.style.display = "block";
        deleteAllButton.textContent = "Delete All" +" " + `(${dataPro.length})`


}
    
}


function updateProduct(id) {
    title.value = dataPro[id].title;
    price.value = dataPro[id].price;
    taxes.value = dataPro[id].taxes;
    ads.value = dataPro[id].ads;
    discount.value = dataPro[id].discount;
    total.innerHTML = dataPro[id].total;
    count.style.display = "none"
    category.style.width = "100%"
    category.value = dataPro[id].category;
    submit.value = "Update"
    mood = "Update";
    tmp = id;
    if(total != ""){
    total.style.backgroundColor = "var(--primaryColor)"
    }

}


//Search
let searchMood = 'Title';

function search(id) {
    let search = document.getElementById("search")
    if(id === 'searchTitle'){
        searchMood = 'Title';

    }else{
        searchMood = 'Category';
    }
    search.placeholder = `Sarch By ${searchMood}`

    search.focus();
    search.value = "";
    ShowData();
}


function searchData(value){
    let table = "";
    for(let i = 0 ; i < dataPro.length ; i++){
    if(searchMood === "Title"){
            if(dataPro[i].title.toLowerCase().startsWith(value.toLowerCase())){
                table +=`
                    <tr>
                        <td>${i}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].category}</td>
                        <td><button onclick="updateProduct(${i})"  id="update">Update</button></td>
                        <td><button onclick="deleteProduct(${i})" id="delete">Delete</button></td>  
                    </tr>`
            }
        }
    else{
            if(dataPro[i].category.toLowerCase().startsWith(value.toLowerCase())){
                table +=`
                    <tr>
                        <td>${i}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].category}</td>
                        <td><button onclick="updateProduct(${i})"  id="update">Update</button></td>
                        <td><button onclick="deleteProduct(${i})" id="delete">Delete</button></td>  
                    </tr>`
            
        }
    }}
    document.querySelector("tbody").innerHTML = table;
}


//Cleane
// function cleandata(params) {
    
// }
