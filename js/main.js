const urlUSD = "http://localhost:8000/getcryptos/usd";
const urlFilteredBTC = "http://localhost:8000/getcryptos/btcfilter";

function getCryptos(){
    axios.get(urlApiCoinGeck)
        .then(response => {
            const data = response.data;
            console.log(typeof(data));

            console
            
            console.log(data);
            console.log(data[0].id);

            currencyTable.textContent = JSON.stringify(data);
            
        })
        .catch(error => console.log(error))
}

function getFilteredBtc(){
    axios.get(urlFilteredBTC)
    .then(response =>{
        const filteredBTC = response.data;
        currencyTable.textContent = JSON.stringify(filteredBTC);

    })
    .catch(error => console.log(error))
}
getFilteredBtc();