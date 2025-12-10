//Clicks the button if pressed enter while typing input
const authentication = localStorage.getItem("authentication");
const inputTodo = document.querySelector("#todo");
const btn = document.querySelector("button");
const createContainer = document.querySelector(".create-container");
const span = document.querySelector("span");
const signupContainer = document.querySelector(".signup-container");
const grey = document.querySelector(".grey");
const emailContainer = document.querySelector(".email-container")
const glassContainer = document.createElement("input");
glassContainer.setAttribute("type", "text");
const container = document.querySelector(".container");

const enter = document.createElement("img");
enter.setAttribute("src", "enter-svgrepo-com.png");
enter.setAttribute("alt", "Enter");
enter.setAttribute("id", "enter-png");


inputTodo.addEventListener("keydown", (event) => {
    if(event.key === "Enter") {
        btn.click();       
    }
})
const addRequest = async(titleText) => {
    const response = await axios.post("http://localhost:3000/api/v1/todo/add-todo", {
        title: titleText
    }, {
        headers: {
            authentication
        }
    })
    console.log("Before");
    console.log(response.data);
    console.log("After");
    
    return response.data;
}




const addTodo = async () => {
    const glassContainer1 = document.createElement("div");
    const pTodo = document.createElement("p");
    createContainer.classList.add("shrinkContainer");
    createContainer.innerHTML = "";
    
    
    
    
    createContainer.addEventListener("transitionend", async () => {
        createContainer.appendChild(glassContainer);
        createContainer.style.backgroundColor = "rgba(0, 0, 0, 0)";
        createContainer.style.boxShadow = "none";
        createContainer.style.left = "610px";
        
        glassContainer.classList.add("glassInput");
        glassContainer.classList.add("shrinkWidth");
        glassContainer.setAttribute("placeholder", "Add Todo")
        
        
        glassContainer1.classList.add("glassBox");
        
        const serverData = await addRequest(inputTodo.value);
        if(serverData) {
            pTodo.textContent = serverData.response.title;
            createContainer.appendChild(glassContainer1);
            glassContainer1.appendChild(pTodo);
            
            createContainer.insertBefore(enter, glassContainer1);
            glassContainer.focus();

        }
        else {
            console.log("failed to get the server");
        }
        
        
        
    }, {once : true})    
};


const newAddTodo = async () => {
    const pTodo = document.createElement("p");
    const glassContainer1 = document.createElement("div");
    glassContainer1.classList.add("glassBox");
    

    const serverData = await addRequest(glassContainer.value);
    if(serverData) {
        pTodo.textContent = serverData.response.title;
        createContainer.appendChild(glassContainer1);
        glassContainer1.appendChild(pTodo);
        glassContainer.value = "";
    }
    else {
        console.log("server crashed because you can't fetch the data from the database");
    }
    
    
    
    
}


glassContainer.addEventListener("keydown", (event) => {
    if(event.key === "Enter") {
        newAddTodo();
    }
})

btn.addEventListener("click", addTodo);
