
axios.defaults.headers.common['Authorization'] = 'Bearer' + localStorage.token;
axios.defaults.baseURL = "http://localhost:8000";

//Main Table
const urlUSD = "/getcryptos/usd";
const urlFilteredBTC = "/getcryptos/btcfilter";

function getCoinUSD(){
    axios({
        method: "get",
        url: "/getcryptos/usd"        
    }).then(response => {
        let data = response.data;
        createMainTable(data);
    }).catch({message: error.stack});
}

/** 
let getfilteredBtc = () => {
        axios.get(urlFilteredBTC)
        .then(response => {
            callback(const data = response.data);           
            createMainTable(data)      
        }).catch(error => console.log(error))
        
} 
*/

function createCel(tag, text){

    if( tag == "IMG"){
        var img = document.createElement("IMG");
        console.log("Checking IMG  " + text)
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
    
    /**console.log(data)
    console.log(typeof(data))    
    console.log(data.toString([0]))
    */

    for (let body = 0; body < data.length; body++){
        let bodyRow = document.createElement("tr");
        console.log("In the body")
        
        console.log(data)
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


//getfilteredBtc();
getCoinUSD();