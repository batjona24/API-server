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
            'Content-Type': 'application/json'
        }, body: JSON.stringify(values)
    })
    const data = await response.json();
    console.log(data);
};

form.addEventListener("submit", onSubmit);