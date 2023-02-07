axios.defaults.headers.common['Authorization'] = 'Bearer' + localStorage.token;
axios.defaults.baseURL = "https://api-smart-stock-tracker.vercel.app/api";


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
        const data = response.data;
        const id = data.user._id;
        
        localStorage.token = data.token;
        localStorage.id = id;
        location.href = "portfolio.html";
        console.log(response.data)
        location.href = "portfolio.html";
   
    }).catch((error) => {
        document.getElementById("loginStatus").innerHTML = "Email or password invalid!";
        document.getElementById("userCheckpassword").value = "";
        console.log(error)});
}

let cancelBtn = document.getElementById("cancelSignup");
cancelBtn.addEventListener("click", refreshPage)

function refreshPage(){
    location.href = "signup.html"
}