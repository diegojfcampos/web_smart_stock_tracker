axios.defaults.headers.common['Authorization'] = 'Bearer' + localStorage.token;
axios.defaults.baseURL = "http://localhost:8000/api";


let btnModal = document.getElementById("btnShowModal")
btnModal.addEventListener("click", showModal);

function showModal(){
  let elementModal = document.getElementById("modal-conteiner");
  elementModal.classList.add("show-modal");
} 

let btnClose = document.getElementById("close");
btnClose.addEventListener("click", closeModal);

function closeModal(){
  let elementClose = document.getElementById("modal-conteiner")
  elementClose.classList.remove("show-modal");
}

google.charts.load('current', {'packages':['line']});
google.charts.setOnLoadCallback(drawLineChart);

function drawLineChart() {

var data = new google.visualization.DataTable();
data.addColumn('number', 'Day');
data.addColumn('number', 'Guardians of the Galaxy');
data.addColumn('number', 'The Avengers');
data.addColumn('number', 'Transformers: Age of Extinction');

data.addRows([
  [1,  37.8, 80.8, 41.8],
  [2,  30.9, 69.5, 32.4],
  [3,  25.4,   57, 25.7],
  [4,  11.7, 18.8, 10.5],
  [5,  11.9, 17.6, 10.4],
  [6,   8.8, 13.6,  7.7],
  [7,   7.6, 12.3,  9.6],
  [8,  12.3, 29.2, 10.6],
  [9,  16.9, 42.9, 14.8],
  [10, 12.8, 30.9, 11.6],
  [11,  5.3,  7.9,  4.7],
  [12,  6.6,  8.4,  5.2],
  [13,  4.8,  6.3,  3.6],
  [14,  4.2,  6.2,  3.4]
]);

var options = {
  chart: {
    title: '',
    subtitle: ''
  }
};

var chart = new google.charts.Line(document.getElementById('lineChart'));

chart.draw(data, google.charts.Line.convertOptions(options));
}


function getCryptoData(){
  axios({
    method: "get",
    url: "/getcryptos/btc"
  }).then(response =>{
    let data = response.data
    creatCoinMenu(data)
    
  }).catch((error) => {console.log(error)})
}

function creatCoinMenu(data){
  
  let coinOptions = document.getElementById("chooseStock");
  
  for(let user = 0; user < data.length; user++){
    console.log(data[user].name)
    let option = document.createElement("option");
    option.value = data[user].name
    option.textContent = data[user].name
    coinOptions.append(option)
  }
  
}

const insert = document.getElementById("stockinsert");
insert.addEventListener("click", stockInsert);

function stockInsert(){
  const objStock = {
      currency: document.getElementById("stockCurrency").value,
      name: document.getElementById("chooseStock").value,
      value: document.getElementById("stockPrice").value.trim(),
      amount:  document.getElementById("stockAmount").value.trim(),
      tax: document.getElementById("stockTax").value.trim(),
      date: document.getElementById("stockDate").value.trim()
  }

  let id = localStorage.getItem("id");
  axios({
    method: "post",
    url: `/wallet/${id}/buy`,
    data: objStock
  }).then(response =>{
    console.log('Success! Stock added')
    cleanFields;
    location.href = "portfolio.html";
  }).catch((error)=>{
    console.log('Failed')
  }) 

}

getCryptoData();

const date = Date.now();
document.getElementById("stockDate").value = date;


  // Load the Visualization API and the corechart package.
  google.charts.load('current', {'packages':['corechart']});

  // Set a callback to run when the Google Visualization API is loaded.
  google.charts.setOnLoadCallback(drawPiechart);

  function drawPiechart() {

    // Create the data table.
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Topping');
    data.addColumn('number', 'Slices');
    data.addRows([
      ['Bitcoin', 3],
      ['Etherium', 1],
      ['ADA Cardano', 1],
      ['Others', 1],
    ]);

    // Set chart options
    var options = {'title':'Wallet',
                   'width':900,
                   'height':400};

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.PieChart(document.getElementById('piechart'));
    chart.draw(data, options);
  }

  drawPiechart();

  let logout = document.getElementById(portfolioLogout)

  logout.addEventListener("change", doLogout);

  function doLogout (){
    localStorage.token = "";
    localStorage.id = "";
    location.href = "index.html";
  }

  function cleanFields(){
    document.getElementById("stockCurrency").setValue("");
    document.getElementById("chooseStock").setValue("");
    document.getElementById("stockPrice").setValue("");
    document.getElementById("stockAmount").setValue("");
    document.getElementById("stockTax").setValue("");
    document.getElementById("stockDate").setValue("");
  }
 