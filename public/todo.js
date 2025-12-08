//Clicks the button if pressed enter while typing input

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
const pTodo = document.createElement("p");
const enter = document.createElement("img");
enter.setAttribute("src", "enter-svgrepo-com.png");
enter.setAttribute("alt", "Enter");
enter.setAttribute("id", "enter-png");


inputTodo.addEventListener("keydown", (event) => {
    if(event.key === "Enter") {
         btn.click();       
    }
})

const addTodo = () => {
    console.log("button pressed");
    createContainer.classList.add("shrinkContainer");
    createContainer.innerHTML = "";
    const glassContainer1 = document.createElement("div");
    
    
    
    createContainer.addEventListener("transitionend", () => {
        createContainer.appendChild(glassContainer);
        createContainer.style.backgroundColor = "rgba(0, 0, 0, 0)";
        createContainer.style.boxShadow = "none";
        createContainer.style.left = "610px";
        
        glassContainer.classList.add("glassInput");
        glassContainer.classList.add("shrinkWidth");
        glassContainer.setAttribute("placeholder", "Add Todo")
        
        
        glassContainer1.classList.add("glassBox");
        createContainer.appendChild(glassContainer1);
        
        glassContainer1.appendChild(pTodo);
        pTodo.textContent = inputTodo.value;
        
        createContainer.insertBefore(enter, glassContainer1);
        glassContainer.focus();
        
        
        
    }, {once : true})    
};


const newAddTodo = () => {
    const glassContainer1 = document.createElement("div");
    glassContainer1.classList.add("glassBox");
    createContainer.appendChild(glassContainer1);
    glassContainer1.appendChild(pTodo);

    pTodo.textContent = glassContainer.value;
    glassContainer.value = "";
    
    
    
    
}


glassContainer.addEventListener("keydown", (event) => {
    if(event.key === "Enter") {
        newAddTodo();
    }
})

btn.addEventListener("click", addTodo);
