console.clear();

const form = document.getElementById("registration");

const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const username = formData.get("username");
    const password = formData.get("password");
    const values = { username, password };
    const response = await fetch('/api/sign-up', {
        method: 'POST', headers: {
            'Content-Type': 'application/json; charset=utf-8 '
        }, body: JSON.stringify(values)
    })
    const data = await response.json();
    if(data){
        window.alert("Account created");
        window.location.pathname = '/log-in';
        console.log(data);
    }
    else{
        const p = document.createElement("p");
        p.innerText="Username or password invalid";
    }
   
};

form.addEventListener("submit", onSubmit);