//Imports
axios.defaults.headers.common['Authorization'] = 'Bearer' + localStorage.token
axios.defaults.baseURL = "http://localhost:8000";

//Main Table
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

//SignUP - Register

const btnRegister = document.querySelector("#btnRegister");

btnRegister.addEventListener('click', function(){  
    const userEmail= document.querySelector("#userEmail")
    const userPassword= document.querySelector("#userPassword")
    const userCheckpassword= document.querySelector("#userCheckpassword")

    const newUser = {
        email: userEmail.value,
        password: userPassword.value,
        checkpassword: userCheckpassword.value
    }
    axios({
        method: "post",
        url: "/userauth/register",
        data: newUser
    }).then((response) => {
        cancelIdleCallback(response.data)
    }).catch({message: error.stack})  
  

})
