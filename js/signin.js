//axios.defaults.headers.common['Authorization'] = 'Bearer' + localStorage.token;
axios.defaults.baseURL = "http://localhost:8000/api";


const btnLogin = document.getElementById("btnLogin");
btnLogin.addEventListener('click', userLogin);

function userLogin(){

    const userEmail = document.getElementById("emailLogin").value
    const userPassworld = document.getElementById("passwordLogin").value

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
        const data = response.data
        console.log(data)  
        const id = data.user._id
        console.log(id)
        console.log(typeof(id))
        localStorage.token = data.token
        localStorage.id = id
         
               

    }).catch((error) => {console.log(error)});
    
}

/*
function userLogin(){
    const emailLogin = document.getElementById("emailLogin")
    const passwordLogin = document.getElementById("passwordLogin")
    console.log(emailLogin.value)
    console.log(passwordLogin.value)
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
        //{handleResult(res)}
        console.log(".then")
        let data = response.data;
        console.log(JSON.stringify(data))
        console.log(typeof(response))
        console.log(response)
        console.log(data)

        const id = JSON.stringify(response.data.user._id)
        const token = response.data.token

        console.log(id)
        console.log(token)       


    }).catch({message: error.stack})

}
**/
