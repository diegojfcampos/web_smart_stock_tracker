axios.defaults.headers.common['Authorization'] = 'Bearer' + localStorage.token;
axios.defaults.baseURL = "http://localhost:8000/api";

const btnLogin = document.getElementById("btnLogin");

btnLogin.addEventListener('click', userLogin);  

console.log("Debug")

function userLogin(){
    const emailLogin = document.getElementById("emailLogin")
    const passwordLogin = document.getElementById("passwordLogin")
    
    const userLogin = {
        email: emailLogin.value,
        password: passwordLogin.value,    
    }   
    console.log("Debug2")
    axios({
        method: "post",
        url: "/userauth/login",
        data: userLogin
    }).then((response) =>{
        callback(response.data)
    }).catch({message: error.stack})
}