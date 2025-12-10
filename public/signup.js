
const signup = async () => {
    
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;
    const fullName = document.querySelector("#full-name").value;


    if(!email || !fullName || !password) {
        alert("Please fill all the fields");
        return;
    }

    try {
        const response = await axios.post("http://localhost:3000/api/v1/user/sign-up", {
        email: email,
        password: password,
        fullName: fullName
    })

        alert("You're signed in!")
        if(response.data) {
            window.location.href = "api/v1/user/sign-in";
        }
    }
    catch {
        console.log("Status Code(500): Something went wrong")
    }

    
}
const buttonEl = document.querySelector("button");
buttonEl.addEventListener("click", signup);
