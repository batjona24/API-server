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


const btn = document.getElementById("showTrip");
btn.addEventListener('click', showTrips);

async function showTrips() {
    const user_id = Number(window.localStorage.getItem("user_id"));
    const response = await fetch(`/api/trips/${user_id}`);
    const data = await response.json();
    console.log(data);
   
    const table = document.getElementById('table');
    for (const trip of data) {  
        const tr = document.createElement('tr');
        table.appendChild(tr);
        for(const element in trip){
            const td = document.createElement('td');
            td.innerText = trip[element];
            tr.appendChild(td);
        }
        const updateTrip = document.createElement('td');
        const deleteTrip = document.createElement('td');
        tr.appendChild(updateTrip);
        tr.appendChild(deleteTrip);
        const btn_update = document.createElement('button');
        const btn_delete = document.createElement('button');
        btn_update.innerText = 'UPDATE';
        btn_delete.innerText = 'DELETE';
        updateTrip.appendChild(btn_update);
        deleteTrip.appendChild(btn_delete);
        btn_update.addEventListener();
        btn_delete.addEventListener('click', async (event) => {
            await fetch(`/api/trips/${trip.id}`, {
                method: 'DELETE'
            })
        });
    }
}

showTrips();

const logout = document.getElementById('logout');
logout.addEventListener('click', (event) => {
    window.localStorage.clear();
    window.location.pathname = '/log-in';
});