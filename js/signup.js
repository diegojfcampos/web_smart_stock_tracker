const signupRoute = "http://localhost:8000/userauth/register";
axios.defaults.headers.common['Autorization'] = 'Bearer' + localStorage.token

function signup(){   
    axios.post(signupRoute, newUser)
    .then(response => {
                alert(JSON.stringify(response.data))
    }).catch(error => console.log(error))
    
}
