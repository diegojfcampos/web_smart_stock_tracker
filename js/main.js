
axios.defaults.headers.common['Authorization'] = 'Bearer' + localStorage.token;
axios.defaults.baseURL = "http://localhost:8000";

//Main Table
const urlUSD = "/getcryptos/usd";
const urlFilteredBTC = "/getcryptos/btcfilter";

function getCryptos(){
    axios.get(urlApiCoinGeck)
        .then(response => {
            const data = response.data;
            console.log(typeof(data));

            console
            
            console.log(data);
            console.log(data[0].id);

           JSON.stringify(data);
            
        })
        .catch(error => console.log(error))
}

function getFilteredBtc(){
    axios.get(urlFilteredBTC)
    .then(response =>{
        const filteredBTC = response.data;
        JSON.stringify(filteredBTC)
        return filteredBTC;

    })
    .catch(error => console.log(error))
}
getFilteredBtc();

//Creating Table

let currencyTable = document.getElementById("currencyTable");

function addElement(element){
    return document.createElement(element)
}

let thead = addElement("thead");
let tbody = addElement("tbody");
currencyTable.appendChild(thead);
currencyTable.appendChild(tbody);

let headList = [" Rank ", " Coin ", " Price ", " 24 Change ", " Market Cap ", " Volume"];
let rowHead = addElement("tr");

for(var head = 0; head <= headList.length; head++){
    let th = addElement("th");
    th.textContent = headList[head];
    rowHead.appendChild(th);
}
thead.appendChild(rowHead);

let currencyData = getFilteredBtc();
console.log(JSON.stringify(currencyData));
console.log(typeof(currencyData));

for (let body = 0; body <= currencyData.length; row++){
    bodyRow = addElement("tr")
    
    for(let cel = 0; cel <= currencyData[body]; cel++){
        bodyCel = addElement("td")
        contentCel = currencyData[row][cel];
        bodyRow.appendChild(bodyCel, contentCel);        
    }
    tbody.appendChild(bodyRow);
}

