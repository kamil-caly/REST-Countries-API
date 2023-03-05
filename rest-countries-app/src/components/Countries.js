import React from 'react';
import { useState, useEffect } from 'react';
import ThemeMode from './ThemeMode';
import { ReactComponent as Glass } from '../icons/magnifying-glass-solid.svg';
import CountryFlag from './CountryFlag';
import CountryFlagInfo from './CountryFlagInfo';

function Countries() {

    const [apiCountries, setApiCountries] = useState([]);
    const [name, setName] = useState("");
    const [region, setRegion] = useState("Filter by Region");

    const fetchCountries = async (name = "", region = "Filter by Region") => {

        let regionUrl = 'https://restcountries.com/v3.1';
        let nameUrl = 'https://restcountries.com/v3.1';

        if (name === "" && region === "Filter by Region") {
            regionUrl += '/all';
            nameUrl += '/all';
        } else if (name !== "" && region === "Filter by Region") {
            nameUrl += `/name/${name}`;
            regionUrl += '/all';
        } else if (name === "" && region !== "Filter by Region") {
            regionUrl += `/region/${region}`;
            nameUrl += '/all';
        } else {
            regionUrl += `/region/${region}`;
            nameUrl += `/name/${name}`;
        }

        try {
            const regionResponse = await fetch(regionUrl);
            const regionData = await regionResponse.json();
            const nameResponse = await fetch(nameUrl);
            const nameData = await nameResponse.json();

            const filteredData = regionData.filter(country => {
                return nameData.find(c => c.name.common === country.name.common);
            });

            setApiCountries(filteredData);
        } catch (error) {
            console.error(error);
        }

        console.log(apiCountries);
    };

    useEffect(() => {
        console.log("use Effect run")
        fetchCountries(name, region);
    }, [name, region]);

    const applySearchBox = (value) => {
        setName(value);
    }

    const regionChanged = (value) => {
        setRegion(value);
    }

    const [showCountry, setShowCountry] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState(null);

    const handleCountryClick = (country) => {
        setSelectedCountry(country);
        setShowCountry(true);
    };

    const handleBackClick = () => {
        setRegion("Filter by Region");
        setName("");
        setSelectedCountry(null);
        setShowCountry(false);
    };

    if (showCountry && selectedCountry) {
        return (
            <div>
                <div className='header'>
                    <h1 style={{ fontWeight: 800 }}>Where in the world?</h1>
                    <div className='mode-switch'>
                        <ThemeMode />
                        <h4 style={{ margin: "6px 0px 0 0", fontWeight: 600 }}>Dark Mode</h4>
                    </div>
                </div>
                <CountryFlagInfo
                    country={selectedCountry}
                    onBackClick={handleBackClick}
                />
            </div>
        );
    } else {
        return (
            <div>
                <div className="header">
                    <h1 style={{ fontWeight: 800 }}>Where in the world?</h1>
                    <div className="mode-switch">
                        <ThemeMode />
                        <h4 style={{ margin: "6px 0px 0 0", fontWeight: 600 }}>
                            Dark Mode
                        </h4>
                    </div>
                </div>
                <div className='inputs'>
                    <div className='search'>
                        <span className='d-flex align-items-center justify-content-center glassSpan'>
                            <Glass className="icon glass" />
                        </span>
                        <input type="text" className="searchInput" onChange={(e) => applySearchBox(e.target.value)} placeholder="Search for a country..."></input>
                    </div>
                    <div>
                        <select className='selectInput' onChange={(e) => regionChanged(e.target.value)} defaultValue="Filter by Region">
                            <option value="Filter by Region">Filter by Region</option>
                            <option value="Africa">Africa</option>
                            <option value="America">America</option>
                            <option value="Asia">Asia</option>
                            <option value="Europe">Europe</option>
                            <option value="Oceania">Oceania</option>
                        </select>
                    </div>
                </div>
                <div className='CountriesList'>
                    {apiCountries.map((country) => (
                        <div style={{ width: 320 }} key={country.name.official} onClick={() => { handleCountryClick(country); console.log("click") }}>
                            <CountryFlag
                                key={country.name.official}
                                flagUrl={country.flags.svg}
                                name={country.name.common}
                                population={country.population}
                                region={country.region}
                                capital={country.capital}
                            ></CountryFlag>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default Countries;