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
    autoRefresh(2000);
};

form.addEventListener("submit", onSubmit);


// const btn = document.getElementById("showTrip");
// btn.addEventListener('click', showTrips);

async function showTrips() {
    const user_id = Number(window.localStorage.getItem("user_id"));
    const response = await fetch(`/api/trips/${user_id}`);
    const data = await response.json();
    console.log(data);
   
    const table = document.getElementById('table');
    for (const trip of data) {  
        const tr = document.createElement('tr');
        table.appendChild(tr);
        // const trip_id = trip.id;
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
        btn_update.setAttribute(`id`, `${trip.id}`);
        btn_delete.setAttribute(`id`, `${trip.id}`);
        btn_update.setAttribute(`class`, `buttons`);
        btn_delete.setAttribute(`class`, `buttons`);
        
        btn_update.addEventListener('click', async (event) => {
            const update_id = btn_update.id; 
            window.localStorage.setItem("trip_id", update_id);
            window.location.pathname = '/update';
            
        });
        btn_delete.addEventListener('click', async (event) => {
            await fetch(`/api/trips/${trip.id}`, {
                method: 'DELETE'
            })
            window.alert("Trip deleted!");
            autoRefresh(1000);
        });  
    }   
}

async function autoRefresh( t ) {
    setTimeout("location.reload(true);", t);
}

showTrips();

const logout = document.getElementById('logout');
logout.addEventListener('click', (event) => {
    window.localStorage.clear();
    window.location.pathname = '/log-in';
});