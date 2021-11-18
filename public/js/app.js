console.log('Client side js file is loaded!!');


// fetch('https://puzzle.mead.io/puzzle').then((response)=> {
//    response.json().then((data)=>{
//        console.log(data);
//    })
// })

// fetch('http://localhost:4000/weather?address=chandigarh').then((response)=> {
//     response.json().then((data) => {
//         console.log(data);
//     })
// })


const weatherform = document.querySelector('form');
const search = document.querySelector('input');

const message1  = document.querySelector('#location')
const message2  = document.querySelector('#forecast-data')

message1.textContent = '';
message2.textContent = '';

console.log(weatherform)
weatherform.addEventListener('submit', (event)=> {
    event.preventDefault();
   const location =  search.value;
    console.log(location)
    message1.textContent = 'Loading...';
    weather(location);
})


function weather(location) {
  
    fetch(`http://localhost:4000/weather?address=${location}`).then((response)=> {
    response.json().then((data) => {
        if(data.error) {
            message1.textContent = data.error;
        } else {
            console.log(data);
            message1.textContent = data.location;
            message2.textContent = data.forecastData;
        }
    })
})
}
