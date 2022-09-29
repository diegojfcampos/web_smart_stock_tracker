//axios.defaults.headers.common['Authorization'] = 'Bearer' + localStorage.token;
axios.defaults.baseURL = "http://localhost:8000/api";


const btnLogin = document.getElementById("btnLogin");
btnLogin.addEventListener('click', userLogin);

function userLogin(){

    const userEmail = document.getElementById("emailLogin").value.trim();
    const userPassworld = document.getElementById("passwordLogin").value.trim();

    const user = {
        email: userEmail,
        password: userPassworld
    }   

    axios({
        method: "post",
        url: "/userauth/login",
        data: user
    }).then((response) =>{     
        //{handleResult(res)}
        const data = response.data;    
        const id = data.user._id;
        localStorage.token = data.token;
        localStorage.id = id;
        location.href = "portfolio.html";
                      

    }).catch((error) => {console.log(error)});
    
}

let cancelBtn = document.getElementById("cancelSginin");
cancelBtn.addEventListener("click", refreshPage)

function refreshPage(){
    location.href = "signin.html"
}