let URL= 'https://api.wheretheiss.at/v1/satellites/25544'

let issLat=document.querySelector('#iss-lat')
let issLong= document.querySelector('#iss-long')
let TimeissLocation=document.querySelector('#Time')
let update= 10000
let issMarker

let IssIcon= L.icon({
    iconUrl:'iss_icon.png',
    iconSize:[50,50],
    iconAnchor:[25,25]
})
let map= L.map('iss-map').setView([0,0],1)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copywrite">OpenStreetMap</a>',
}).addTo(map)

iss()
//setInterval(iss,update) //10 seconds


function iss() {
    fetch(URL).then((res) => {
        return res.json()
    }).then((issData) => {
        console.log(issData)
        let lat = issData.latitude
        let long = issData.longitude
        issLat.innerHTML = lat
        issLong.innerHTML = long

        if(!issMarker){
            issMarker=L.marker([lat,long],{icon:IssIcon}).addTo(map) //creating the marker
        }else{
            issMarker.setLatLng([lat,long]) //If Already exists move to new place
        }

        //Updating the time and date to the most current
        let now=Date()
        TimeissLocation.innerHTML=`This data was fetched at ${now}`


    }).catch((err) => {
        console.log('ERROR', err)
    })
        .finally(()=>{

            setTimeout(iss,update)
        })
}