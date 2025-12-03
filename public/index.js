const email = document.querySelector("#email").value;
const password = document.querySelector("#password").value;
const fullName = document.querySelector("#full-name").value;
const button = document.querySelector("button");

button.addEventListener("click", signup);

const signup = async () => {
    await axios.post("http://localhost:3000/sign-up", {
        email,
        password,
        fullName
    }
    )

    alert("You're signed in!")
}
