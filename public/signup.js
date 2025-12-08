
const signup = async () => {
    
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;
    const fullName = document.querySelector("#full-name").value;


    if(!email || !fullName || !password) {
        alert("Please fill all the fields");
        return;
    }


    await axios.post("http://localhost:3000/sign-up", {
        email: email,
        password: password,
        fullName: fullName
    }
)

alert("You're signed in!")
}
const buttonEl = document.querySelector("button");
buttonEl.addEventListener("click", signup);
