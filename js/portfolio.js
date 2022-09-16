axios.defaults.headers.common['Authorization'] = 'Bearer' + localStorage.token;
axios.defaults.baseURL = "http://localhost:8000/api";

/*
  // Load the Visualization API and the corechart package.
  google.charts.load('current', {'packages':['corechart']});

  // Set a callback to run when the Google Visualization API is loaded.
  google.charts.setOnLoadCallback(drawChart);

  function drawChart() {

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
                   'width':600,
                   'height':400};

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
    chart.draw(data, options);
  }

  drawChart();
  */


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

getCryptoData();