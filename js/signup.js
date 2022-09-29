axios.defaults.headers.common['Authorization'] = 'Bearer' + localStorage.token;
axios.defaults.baseURL = "http://localhost:8000/api";


const btnRegister = document.getElementById("btnRegister");

btnRegister.addEventListener("click", userRegister)


function userRegister(){
    const userEmail= document.querySelector("#userEmail")
    const userPassword= document.querySelector("#userPassword")
    const userCheckpassword= document.querySelector("#userCheckpassword")

    const newUser = {
        email: userEmail.value.trim(),
        password: userPassword.value.trim(),
        checkpassword: userCheckpassword.value
    }
    axios({
        method: "post",
        url: "/userauth/register",
        data: newUser
    }).then((response) => {
        console.log(response.data)
    }).catch((error) => {console.log(error)});
}

let cancelBtn = document.getElementById("cancelSignup");
cancelBtn.addEventListener("click", refreshPage)

function refreshPage(){
    location.href = "signup.html"
}