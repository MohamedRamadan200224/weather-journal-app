// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear(); //current date
const key = "7c8bad69cb989e73b79437343ce21dc9"; //apikey
let temp; //temperature
let feelings; //content

//variables assigned with paragraph elements which the data will be shown in

let da = document.createElement("p");
let t = document.createElement("p");
let c = document.createElement("p");

//appending these varaibles to the divs of data so that they appear in the page

document.getElementById("date").appendChild(da);
document.getElementById("temp").appendChild(t);
document.getElementById("content").appendChild(c);
//event listener to the click and then it makes async function
document.getElementById("generate").addEventListener('click', async () => {
    let zip = document.getElementById("zip").value; //zipcode of usa
    feelings = document.getElementById("feelings").value; //content value
if (!zip && !feelings) {
    alert("Please enter the zipcode and your feeling");
}
    else if (!zip) {
        alert("Please enter the zipcode");
    }//alert to the user if he didn't enter the zipcode
    else if (!feelings) {
        alert("Please enter your feelings");
    }//alert to the user if he didn't enter the feeling
else{
    const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zip},&appid=${key}&units=metric`; //url used to get data from openweathermap.com

    const urlres = await fetch(url); //constant used to fetch the url data
    const resdata = await urlres.json(); //constant to convert the previous constant to json
    temp = resdata.main.temp; //temperature value
    temp = Math.trunc(temp); //deleting temperature decimals

    //sending data in the body of post method by fetch to the server side

    const postreq = await fetch('/tempdata', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                tempvalue: temp,
                datevalue: newDate,
                contentvalue: feelings
            })
        }).then(() => {
            return getweather();
        })
        .then((fulldata) => {
            updateUI(fulldata);
        }).catch(error=>console.log(error))
    }

})

//async function to get the weather data back from the object in server side

async function getweather(params) {
    const getdata = await fetch('/tempinfo');
    const fulldata = await getdata.json();
    return fulldata;
}

//entering the object data to the innerhtml of the paragraphs

function updateUI(fulldata) {
    const superscript="o";
    da.innerHTML = `Date: ${fulldata.datevalue}`;
    t.innerHTML = `Temperature: ${fulldata.tempvalue}${superscript.sup()} C`;
    c.innerHTML = `Content: ${fulldata.contentvalue}`;
}