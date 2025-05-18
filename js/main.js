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


let a = document.createElement("div")
a.className = "saeed"
console.log(a)


if(total.innerHTML === ""){
    total.style.backgroundColor = "red"
}
function getTotal() {
    // if(price.value != ""){
    if(price.value != "" && taxes.value  !="" && ads.value  !="" && discount.value  !=""){
        if(price.value >=0 && taxes.value  >=0 && ads.value  >=0 && discount.value  >=0){
            total.innerHTML = (+price.value + +taxes.value + +ads.value) - +discount.value;
            total.style.backgroundColor = "var(--primaryColor)"
        }else{
            Swal.fire({
                icon:"Erroe",
                title: "Oops",
                text: "You Have Entered A Negative Value",
                footer: "Make Sure All Inputs"
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
    dataPro.push(newpro)
    localStorage.setItem("Products",JSON.stringify(dataPro))
    cleareData()
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


function ShowData() {
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
                <td><button id="update">Update</button></td>
                <td><button onclick="deleteProduct(${i})" id="delete">Delete</button></td>

            </tr>`
    }
    document.querySelector("tbody").innerHTML = table

    if(dataPro.length > 0){
        let deleteAll =document.querySelector(".deleteAllBox").appendChild(document.createElement("button"))
        deleteAll.className = "deleteAll"
        deleteAll.textContent = "Delete All Data"
    }
}




function deleteProduct(id) {
    dataPro.splice(id,1);
    localStorage.Products = JSON.stringify(dataPro);
    ShowData()
    
}

// function count(params) {
    
// }
// function update(params) {
    
// }
// function search(params) {
    
// }
// function cleandata(params) {
    
// }