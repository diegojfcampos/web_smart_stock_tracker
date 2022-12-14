axios.defaults.headers.common['Authorization'] = 'Bearer' + localStorage.token;
axios.defaults.baseURL = "http://localhost:8000/api";


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

//Function to  create tables cells and turning clearer the code.
function createCel(tag, text) {

  let cel = document.createElement(tag);
  cel.textContent = text;
  return cel;  
}

getWallet() 

/*

Creating Line Chart to display Wallter's graph data

*/

var ctx = document.getElementById("lineChart")
var lineChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [{
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});


/*

Creating Modal to insert stocks

*/

let btnModal = document.getElementById("btnShowModal")
btnModal.addEventListener("click", showModal);

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
    currency: document.getElementById("stockCurrency").value,
    name: document.getElementById("chooseStock").value,
    value: document.getElementById("stockPrice").value.trim(),
    amount: document.getElementById("stockAmount").value.trim(),
    tax: document.getElementById("stockTax").value.trim(),
    date: document.getElementById("stockDate").value.trim()
  }

  let id = localStorage.getItem("id");
  axios({
    method: "post",
    url: `/wallet/${id}/buy`,
    data: objStock
  }).then(response => {
    console.log('Success! Stock added')
    cleanFields;
    location.href = "portfolio.html";
  }).catch((error) => {
    console.log('Failed')
  })

}

getCryptoData();

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
