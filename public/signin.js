async function signin () {
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;

    if(!email) {
        alert("Please fill up your email")
        return;
    }
    if(!password) {
        alert("Please fill up you password")
        return;
    }

    try {
        const response = await axios.post("http://localhost:3000/sign-in", {
        email,
        password
    })
    localStorage.setItem("token", response.data.token);

    alert("you are signed on!")
    }

    catch(error) {
        const errorDiv = document.createElement("div");
        const greyDiv = document.querySelector(".grey");
        errorDiv.setAttribute("id", "error");
        greyDiv.innerHTML = "";
        
        errorDiv.innerHTML = "You have not signed up.<a href='http://localhost:3000/sign-up' id='create-account-link'> Create Account</a>"
        greyDiv.appendChild(errorDiv);


    }
    

}

const buttonEl = document.querySelector("button");
buttonEl.addEventListener("click", signin);