console.clear();

const form = document.getElementById("login");

const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const username = formData.get("username");
    const password = formData.get("password");
    const values = { username, password };
  
    const response = await fetch('/api/sign-in', {
        method: 'POST', headers: {
            'Content-Type': 'application/json; charset=utf-8 '
        }, body: JSON.stringify(values)
    })
    const data = await response.json();
    if(response.ok) {
        const user_id = data.id;
        window.localStorage.setItem("user_id", user_id);
        window.location.pathname = '/trips';
        console.log(data);
    }
    else {
        const p = document.getElementById("error_p");
        p.innerText = "Username or password invalid!" 
    }
};

form.addEventListener("submit", onSubmit);