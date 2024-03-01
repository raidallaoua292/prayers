
import { useState} from 'react'
import axios from 'axios';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
export default function LoctionSearch({handelChange}: {handelChange: (dispName: string, apiName:string, countryCode:string) => void}) {

    type City = {
        name: string;
        country: string;
        countryCode: string;
    }

    const [cities, setCities] = useState<City[]>([]);

    
    const handelSearch = (searach: string ) => {
        console.log(searach);
        const options = {
            method: 'GET',
            url: 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities',
            params: {
                namePrefix: searach,
                limit: '3'
            },
            headers: {
                'X-RapidAPI-Key': '8f96f2c190msh60843ec7ebdc393p13f41cjsn4844a32f003b',
                'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
            }
        };
        axios.request(options).then(function (response) {
            console.log(response.data.data);
            setCities(response.data.data);
        }).catch(function (error) { 
            console.error(error);
        });
}
    
    const handleOnSelect = (item: City) => {
        const API_key = '000737b049ec9a67257b168307cce694';
        console.log(item);
        axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${item.name}&limit=5&appid=${API_key}`)
        .then((res) => {
            const arCity:string = res.data[0].local_names.ar;
            if (arCity === undefined) {
                handelChange(res.data[0].name, item.name, item.countryCode);
                return;
            }
            handelChange(arCity, item.name, item.countryCode);
        })
    };
    
    const formatResult = (item: City) => {
        return item.name + ', ' + item.countryCode;
    };

    
    // Aoutocomplete
    return (
        <div className="flex justify-center items-center w-full mb-5">
            <ReactSearchAutocomplete<City> 
                items={cities}
                onSearch={handelSearch}
                onSelect={handleOnSelect}
                formatResult={formatResult}
                
                autoFocus
                placeholder="Search for a city"
                className='w-full'
            />
        </div>
    )
}
