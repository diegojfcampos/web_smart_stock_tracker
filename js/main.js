
axios.defaults.headers.common['Authorization'] = 'Bearer' + localStorage.token;
axios.defaults.baseURL = "http://localhost:8000";

//Main Table

let select = document.getElementById("currencyChoice")
getCurrency(select.options[select.selectedIndex].value)

select.addEventListener('change', function(){
    let choice = select.options[select.selectedIndex].value;
    getCurrency(choice)
})

function getCurrency(userChoice){
    const urlUSD = "/getcryptos/usd";
    const urlEUR = "/getcryptos/eur";
    const urlBTC = "/getcryptos/btc";

    console.log(userChoice);
    
    if(userChoice === "USD"){
        getCoinCurrency(urlUSD)
    }else if(userChoice === "EUR"){
        getCoinCurrency(urlEUR)
    }else if(userChoice === "BTC"){
        getCoinCurrency(urlBTC)
    }   
}

function getCoinCurrency(URL){
    axios({
        method: "get",
        url: URL,       
    }).then(response => {
        let data = response.data;
        createMainTable(data);
    }).catch((error) => {console.log(error)});
}

function createCel(tag, text){

    if( tag == "img"){
        var img = document.createElement("IMG");        
        img.src = text;
        img.style.width = "30px";
        img.style.height = "30px";
        return img
    }else{
        let cel = document.createElement(tag);
        cel.textContent = text;
        return cel;
    } 
}

//Creating Table
function createMainTable(data){

    let currencyTable = document.getElementById("currencyTable");
    let thead = document.createElement("thead");
    let tbody = document.createElement("tbody");
 
    let headList = [" Rank ", " " ," Coin ", " Price ", " 24 Change ", " Market Cap ", " Volume"];
    let rowHead = document.createElement("tr");

    for(var head = 0; head <= headList.length; head++){
        let th = document.createElement("th");
        th.textContent = headList[head];
        rowHead.appendChild(th);
    }
    thead.appendChild(rowHead);
    currencyTable.appendChild(thead);    

    for (let body = 0; body < data.length; body++){
        let bodyRow = document.createElement("tr");
        let bodyRank = createCel("td", data[body].market_cap_rank);
        let bodyImg = createCel("img", data[body].image); 
        let bodyName = createCel("td", data[body].name); 
        let bodyPrice = createCel("td", data[body].current_price);   
        let bodyChange = createCel("td", data[body].market_cap_change_24h);   
        let bodyCap = createCel("td", data[body].market_cap);   
        let bodyVolume = createCel("td", data[body].total_volume);                         
           
        bodyRow.appendChild(bodyRank);
        bodyRow.appendChild(bodyImg);
        bodyRow.appendChild(bodyName);    
        bodyRow.appendChild(bodyName);    
        bodyRow.appendChild(bodyPrice);    
        bodyRow.appendChild(bodyChange);    
        bodyRow.appendChild(bodyCap);
        bodyRow.appendChild(bodyVolume);             
    
        tbody.appendChild(bodyRow);
    }    
    currencyTable.appendChild(tbody);
}

