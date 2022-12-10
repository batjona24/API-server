const form = document.getElementById("trips");

const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const user_id = Number(window.localStorage.getItem("user_id"));
    const date = formData.get("date");
    const vacation = formData.get("vacation");
    const days = formData.get("days");
    const rating = formData.get("rating");
    const values = { date, vacation, days, rating, user_id};
    const response = await fetch(`/api/trips/${user_id}`, {
        method: 'POST', headers: {
            'Content-Type': 'application/json'
        }, body: JSON.stringify(values)
    })
    const data = await response.json();
    console.log(data);
};

form.addEventListener("submit", onSubmit);