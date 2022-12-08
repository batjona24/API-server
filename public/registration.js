console.clear();

const form = document.getElementById("registration");

const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const date = formData.get("date");
    const destination = formData.get("destination");
    const days = formData.get("number");
    const rating = formData.get('rating');
    const values = { date, destination, days, rating };
    const response = await fetch('/api/sign-up', {
        method: 'POST', headers: {
            'Content-Type': 'application/json'
        }, body: JSON.stringify(values)
    })
    const data = await response.json();
    console.log(data);
};

form.addEventListener("submit", onSubmit);