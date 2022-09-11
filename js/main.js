
axios.defaults.headers.common['Authorization'] = 'Bearer' + localStorage.token;
axios.defaults.baseURL = "http://localhost:8000";

//Main Table
const urlUSD = "/getcryptos/usd";
const urlFilteredBTC = "/getcryptos/btcfilter";


let getfilteredBtc = () => {
        axios.get(urlFilteredBTC)
        .then(response => {
            const data = response.data;           
            createMainTable(data)      
        }).catch(error => console.log(error))
        
} 

function createCel(tag, text){
    let cel = document.createElement(tag);
    cel.textContent = text;
    return cel; 
}

//Creating Table
function createMainTable(data){

    let currencyTable = document.getElementById("currencyTable");
    let thead = document.createElement("thead");
    let tbody = document.createElement("tbody");
 
    let headList = [" Rank ", " Coin ", " Price ", " 24 Change ", " Market Cap ", " Volume"];
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

    for (let body = 0; body <= data.length; body++){
        let bodyRow = document.createElement("tr");
        console.log("In the body")
        for(let cel = 0; cel < data.length; cel++){
            let bodyCel = createCel("td", data[body][cel]);        
           
            bodyRow.appendChild(bodyCel);        
        }
        tbody.appendChild(bodyRow);
    }    
    currencyTable.appendChild(tbody);
}


getfilteredBtc();