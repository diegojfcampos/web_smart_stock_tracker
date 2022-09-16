axios.defaults.headers.common['Authorization'] = 'Bearer' + localStorage.token;
axios.defaults.baseURL = "http://localhost:8000/api";


const btnRegister = document.getElementById("btnRegister");

btnRegister.addEventListener("click", userRegister)


function userRegister(){
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
        callback(console.log(response.data))
    }).catch({message: error.stack})  
}

/** 
function signup(){   
    axios.post(signupRoute, newUser)
    .then(response => {
                alert(JSON.stringify(response.data))
    }).catch(error => console.log(error))
    
}
*/
