import { useRef, useState } from "react";

function App() {

  let [details , setDetails] = useState();
   let [cityDisplay , setDisplayCity] = useState();
    let city = useRef();

    const handleSearch = (e) =>{
        // e.preventDefault();
      
        const cityName = city.current.value;
        // console.log(cityName);
        setDisplayCity(cityName)
        //console.log(city);
        const url = `https://ai-weather-by-meteosource.p.rapidapi.com/find_places?text=${city.current.value}&language=en`;
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '0fd96ffa96msh1d364c5a5a788adp1becd3jsnbecec84b7ceb',
                'X-RapidAPI-Host': 'ai-weather-by-meteosource.p.rapidapi.com'
            }
        };
        fetch(url, options)
        .then((res) => { return res.json()})
        .then( (data) =>{
            setDetails(data);
            // console.log(data);  
           // console.log(data.lat);
            data.filter((v,i) => {   
                if( i === 0)
                {
                    //  return console.log(v.place_id); 
                    //return console.log(v.lat);
                }
            })  
        

        // wheather forecast endpoint
        const url = `https://ai-weather-by-meteosource.p.rapidapi.com/current?lat=${data[0].lat}&lon=${data[0].lon}&timezone=auto&language=en&units=auto`;
        const options= {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '0fd96ffa96msh1d364c5a5a788adp1becd3jsnbecec84b7ceb',
            'X-RapidAPI-Host': 'ai-weather-by-meteosource.p.rapidapi.com'
                    }
                };
        fetch(url, options)
        .then( (res) =>{ return res.json()})
        .then((d) =>{ 
            console.log(d);
           setDetails(d.current)
        })
    })
    }
  return (
    <section className="app">
        <div className="search">
            <input type="text" placeholder="enter location" ref={city}/>
            <button onClick={()=>handleSearch()}> Check </button>
        </div>
       {       details != null &&
            <div className="container">
            <div className="top">
                <div className="location">
                <p>{cityDisplay}</p>
                </div>
                <div className="temp">
                <h1> {details.temperature} °cel </h1>
                </div>
                <div className="description">
                <p> {details.summary} </p>
                </div>
            </div>
            <div className="bottom">
                <div className="feels">
                    <p className='bold'>  {details.feels_like} °F </p>
                    <p>Feels Like</p>
                </div>
                <div className="humidity">
                    <p className='bold'> {details.humidity} % </p>
                    <p>Humidity</p>
                </div>
                <div className="wind">
                    <p className='bold'> {details.wind_speed} mph </p>
                    <p>Wind Speed</p>
                </div>
            </div>
        </div>
        
       }
        
            {/* <div className="box">
                <input type="text" placeholder="Enter city name" ref={city} />
                <button onClick={()=>handleSearch()}> Check </button>

                    <div className="wheather-report">
                    <span class="material-symbols-outlined">
                        partly_cloudy_day
                        </span>
                        <h1> {cityDisplay}</h1>
                    
                {  details != null &&
                    <div className="details">   

                        <h3> {details.temperature} °cel </h3>
                        <p> humidity:{details.humidity} ,pressure: {details.pressure}</p>
                        
                        
                    </div>
                    
                }
                 </div>
            </div> */}
       </section>
  );
}

export default App;


