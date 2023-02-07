axios.defaults.headers.common['Authorization'] = 'Bearer' + localStorage.token;
axios.defaults.baseURL = "https://api-smart-stock-tracker.vercel.app/api";


function totalInvested(){
  let id = localStorage.getItem("id"); 

  axios({
      method: "post",
      url: "/wallet/totalinvested",    
      data: {id}
  }).then(response =>{
    let data = response.data;
    console.log("Total invested" + data)
    addTotalInvested(data);
    return data
  }).catch((error) => { console.log(error) });

}
totalInvested();

function addTotalInvested(totalInvested){
  var divTotalInvested = document.getElementById("totalInvested");
  var totalText = document.createTextNode(totalInvested);
  divTotalInvested.setAttribute("class", "walletSummary");
  divTotalInvested.appendChild(totalText);
}
//Calculating total taxes paied
function totalTax(){
  let id = localStorage.getItem("id"); 

  axios({
      method: "post",
      url: "/wallet/totaltax",    
      data: {id}
  }).then(response =>{
    let data = response.data;    
    //Callinf function to add inf into portfolio.html
    addTotalTax(data);
    return data;
  }).catch((error) => { console.log(error) });

}
totalTax();

function addTotalTax(totalTax){
  var divTotal = document.getElementById("totalTaxes");
  var totalText = document.createTextNode(totalTax);
  divTotal.setAttribute("class", "walletSummary");
  divTotal.appendChild(totalText);
}



/*

Creating Wallet Table to display wallet

*/

//Getting wallet's data from api_smart_stock_tracker

function getWallet() {

  let id = localStorage.getItem("id");
  
  axios({
      method: "post",
      url: "http://localhost:8000/api/wallet/getwallet",
      data: {id} 
  }).then(response => {
      let data = response.data;
      console.log(data)
      console.log("test")
      createWalletTable(data);
  }).catch((error) => { console.log(error) });
}

//Creating Wallet Table

function createWalletTable(data){

  document.getElementById("walletTable").innerHTML = "";
  let walletTable = document.getElementById("walletTable")
  let thead = document.createElement("thead");
  let tbody = document.createElement("tbody");
  let headList = [" Currency ", " Coin ", " Price ", "Amount", " Tax ", " Date "];
  let rowHead = document.createElement("tr");

  for (var head = 0; head <= headList.length; head++) {
    let th = document.createElement("th");
    th.textContent = headList[head];
    rowHead.appendChild(th);
  }

  thead.appendChild(rowHead);
  walletTable.appendChild(thead);

  for (let body = 0; body < data.length; body++) {
    let bodyRow = document.createElement("tr");
    let bodyCurrency = createCel("td", data[body].currency);
    let bodyName = createCel("td", data[body].name);
    let bodyValue = createCel("td", data[body].value);
    let bodyAmount = createCel("td", data[body].amount);
    let bodyTax = createCel("td", data[body].tax);
    let bodyDate = createCel("td", data[body].date);
 
    bodyRow.appendChild(bodyCurrency);
    bodyRow.appendChild(bodyName);
    bodyRow.appendChild(bodyValue);
    bodyRow.appendChild(bodyAmount);
    bodyRow.appendChild(bodyTax);
    bodyRow.appendChild(bodyDate);

    tbody.appendChild(bodyRow);
  }
  walletTable.appendChild(tbody);
}

getWallet() 

//Function to  create tables cells and turning clearer the code.
function createCel(tag, text) {

  let cel = document.createElement(tag);
  cel.textContent = text;
  return cel;  
}

/*

Creating Line Chart to display Wallter's graph data

*/

function getData() {

  let id = localStorage.getItem("id");
  axios({
      method: "post",
      url: "http://localhost:8000/api/wallet/getwallet",
      data: {id}
  }).then(response => {
      let data = response.data;
      var newdata = []
      console.log("Testing new data")
      console.log(newdata)
      
      for (var i = 0; i < data.length; i++) {                
        newdata.push(data[i].amount)
        
               
      }
      
     
      createLineChart(newdata)

      
  }).catch((error) => { console.log(error) });
}

function createLineChart(data){
  var ctx = document.getElementById("lineChart")
  
  var lineChart = new Chart(ctx, {
  
    type: 'line',
    data: {
      labels: ['Jan', 'Fev', 'Mar', 'Apr', 'Jun', 'Jul', 'Ago','Sep','Oct','Nov','Dec'],
      datasets: [{
        label: 'Wallet Datas',
        data: data,
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      },
      responsive: true,
      
    }
  });
}
getData()





/*

Creating Modal to insert stocks

*/

let btnModaInsert = document.getElementById("btnShowModalInsert")
btnModaInsert.addEventListener("click", showModal);

let btnModaInsert1 = document.getElementById("btnShowModalInsert1")
btnModaInsert1.addEventListener("click", showModal);

let btnShowModalInsertStack = document.getElementById("btnShowModalInsertStack")
btnShowModalInsertStack.addEventListener("click", showModal);


function showModal() {
  let elementModal = document.getElementById("modal-conteiner");
  elementModal.classList.add("show-modal");
}

let btnClose = document.getElementById("close");
btnClose.addEventListener("click", closeModal);

function closeModal() {
  let elementClose = document.getElementById("modal-conteiner")
  elementClose.classList.remove("show-modal");
}

function getCryptoData() {
  axios({
    method: "get",
    url: "/getcryptos/btc"
  }).then(response => {
    let data = response.data
    creatCoinMenu(data)

  }).catch((error) => { console.log(error) })
}

function creatCoinMenu(data) {

  let coinOptions = document.getElementById("chooseStock");

  for (let user = 0; user < data.length; user++) {
    let option = document.createElement("option");
    option.value = data[user].name
    option.textContent = data[user].name
    coinOptions.append(option)
  }

}

const insert = document.getElementById("stockinsert");
insert.addEventListener("click", stockInsert);

function stockInsert() {
  
  const objStock = {
    id: localStorage.getItem("id"),
    currency: document.getElementById("stockCurrency").value,
    name: document.getElementById("chooseStock").value,
    value: document.getElementById("stockPrice").value.trim(),
    amount: document.getElementById("stockAmount").value.trim(),
    tax: document.getElementById("stockTax").value.trim(),
    date: document.getElementById("stockDate").value.trim()
  }

  axios({
    method: "post",
    url: `/wallet/buy`,
    data: objStock
  }).then(response => {
      console.log('Success! Stock added')
      closeModal();
      cleanFields;
      location.href = "portfolio.html";
  }).catch((error) => {
      console.log('Failed')
  })

}

getCryptoData();


/*

Creating Modal to insert STACK

*/
/*
const insertStack = document.getElementById("stackinsert");
insert.addEventListener("click", stackInsert);

function stockInsert() {
  
  const objStack = {
    id: localStorage.getItem("id"),
    currency: document.getElementById("stackCurrency").value,
    name: document.getElementById("stackoption").value,    
    quantitie: document.getElementById("stackQuantitie").value.trim(),
    totalDays: document.getElementById("stacktotalDays").value.trim(),
    rate: document.getElementById("stackRate").value.trim(),    
    rescueDate: document.getElementById("dateRescue").value.trim(),
   
  }

  axios({
    method: "post",
    url: `/wallet/insert`,
    data: objStack
  }).then(response => {
      console.log('Success! Stack added')
      closeModal();
      cleanFields;
      location.href = "portfolio.html";
  }).catch((error) => {
      console.log('Failed')
  })

}


*/


/*

Creating logout a clear fiedls funcntions

*/

let logout = document.getElementById(portfolioLogout)

logout.addEventListener("click", doLogout);

function doLogout() {
  localStorage.token = "";
  localStorage.id = "";
  location.href = "index.html";
}

function cleanFields() {
  document.getElementById("stockCurrency").setValue("");
  document.getElementById("chooseStock").setValue("");
  document.getElementById("stockPrice").setValue("");
  document.getElementById("stockAmount").setValue("");
  document.getElementById("stockTax").setValue("");
  document.getElementById("stockDate").setValue("");
  closeModal();
}
