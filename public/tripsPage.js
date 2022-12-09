const form = document.getElementById("trips");

const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const date = formData.get("date");
    const vacation = formData.get("vacation");
    const days = formData.get("days");
    const rating = formData.get("rating");
    const values = { date, vacation, days, rating };
    const response = await fetch('/api/trip', {
        method: 'POST', headers: {
            'Content-Type': 'application/json'
        }, body: JSON.stringify(values)
    })
    const data = await response.json();
    console.log(data);
};

form.addEventListener("submit", onSubmit);


const btn = document.getElementById("showTrip");
const container = document.getElementById('container');
btn.addEventListener('click', showTrips);

async function showTrips() {
    const response = await fetch('/api/trip');
    const data = await response.json();
    console.log(data);
    container.innerHTML = ''
    const table = document.createElement('table');
    for (const trip of data) {  
        const row = table.insertRow();
        const id = row.insertCell(); 
        const date = row.insertCell();
        const vacation = row.insertCell();
        const days = row.insertCell();
        const rating = row.insertCell();
        const update = row.insertCell();
        const deleteTrip = row.insertCell();
        id.innerText = (`${trip.id}`);
        date.innerText = (`${trip.date}`);
        vacation.innerText = (`${trip.vacation}`);
        days.innerText = (`${trip.days}`);
        rating.innerText = (`${trip.rating}`);
        // const btn_update = document.childElement('button'); 
        // update.appendChild(btn_update); 
        // update.innerHTML=('btn_update'); 
        // update.innerHTML = (<button type='submit' name='update'>Update</button>);
        // deleteTrip.innerHTML = (<button type='submit' name='delete'>Delete</button>);

        
        // table.innerText = `ID: ${trip.id} , Date:${trip.date} , Vacation: ${trip.vacation} , Days: ${trip.days}, Rating: ${trip.rating} `     
    }
    container.appendChild(table);
}

showTrips();