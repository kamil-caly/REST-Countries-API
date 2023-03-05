import React from "react";

function CountryFlag(props) {

    const { flagUrl, name, population, region, capital } = props;

    return (
        <div>
            <div className="countryCard">
                <img className="minFlag" src={flagUrl} alt={`Flag of ${name}`} />
                <div className="countryInfo">
                    <h4 style={{ fontWeight: 800 }}>{name}</h4>
                    <div className="d-flex">
                        <div style={{ fontWeight: 600 }}>Population: </div>
                        <div className="ms-1">{population.toLocaleString('en-US', { minimumFractionDigits: 0 })}</div>
                    </div>
                    <div className="d-flex">
                        <div style={{ fontWeight: 600 }}>Region: </div>
                        <div className="ms-1">{region}</div>
                    </div>
                    <div className="d-flex">
                        <div style={{ fontWeight: 600 }}>Capital: </div>
                        <div className="ms-1">{capital}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CountryFlag;