const signin = async () => {
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
        const response = await axios.post("http://localhost:3000/api/v1/user/sign-in", {
        email,
        password
    })
    localStorage.setItem("authentication", response.data.authentication);
    
    alert("you are logged in!")
    
    if(response.data) {
        window.location.href = "api/v1/user/todox"
    }
    }

    catch(error) {
        const errorDiv = document.createElement("div");
        const greyDiv = document.querySelector(".grey");
        errorDiv.setAttribute("id", "error");
        errorDiv.style.color = "red";
        greyDiv.innerHTML = "";
        
        
        errorDiv.innerHTML = "You haven't signed up yet<a href='http://localhost:3000/api/v1/user/sign-up' id='create-account-link' style='padding-left: 5px;' >Create Account</a>"
        greyDiv.appendChild(errorDiv);


    }
    

}

const buttonEl = document.querySelector("button");
buttonEl.addEventListener("click", signin);

const forgotLink = () => {
    const createContainer = document.querySelector(".create-container");
    createContainer.classList.add("shrinkContainer");

    createContainer.addEventListener("transitionend", () => {
        
    const span = document.querySelector("span");
    const para = document.createElement("p");

    span.innerHTML = "Reset your Password";
    document.querySelector(".password-container").remove();
    document.querySelector("#checkbox").remove();
    document.querySelector("#checkbox-label").remove();
    
    para.innerHTML = "Enter the email address associated with your account and we'll send you a link to reset your password.";
    
    
    const signupContainer = document.querySelector(".signup-container");
    const emailContainer = document.querySelector(".email-container")
    emailContainer.style.marginTop = "12px";
    signupContainer.insertBefore(para, emailContainer);
    
    para.setAttribute("id", "para");
    
    
    //button code
    const continueButton = document.querySelector("button");
    continueButton.innerHTML = "Continue";
    
    //Return to sign in link
    
    const returnLink = document.createElement("a");
    returnLink.innerHTML = "Return to sign in";
    returnLink.setAttribute("id", "returnLink");
    returnLink.setAttribute("href", "http://localhost:3000/api/v1/user/sign-in");
    signupContainer.appendChild(returnLink);

    }, {once : true});
    
}
const forgotPassword = document.querySelector("#forgot-password-link");

forgotPassword.addEventListener("click", forgotLink);
