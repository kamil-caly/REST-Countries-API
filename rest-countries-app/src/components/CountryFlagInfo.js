import React from "react";
import { ReactComponent as ArrowLeft } from '../icons/arrow-left-solid.svg';

function CountryFlagInfo(props) {

    const { country, onBackClick } = props;
    console.log(country);

    return (
        <div>
            <div className="goBack d-flex justify-content-center align-items-center" onClick={onBackClick}>
                <ArrowLeft className="icon" style={{ margin: 0 }} />
                <span>Back</span>
            </div>
            <div className="mainInfo">
                <img className="maxFlag" src={country.flags.svg} alt={`Flag of ${country.name.common}`} />
                <div className="detailsInfo">
                    <div className="countryName infoTitle">{country.name.common}</div>
                    <div className="upDetailsInfo">
                        <div className="upLeftDetailsInfo">
                            <div className="infoTitle">Native Name: <div className="infoValue">{Object.values(country.name.nativeName)[0].common}</div></div>
                            <div className="infoTitle">Population: <div className="infoValue">{country.population.toLocaleString('en-US', { minimumFractionDigits: 0 })}</div></div>
                            <div className="infoTitle">Region: <div className="infoValue">{country.region}</div></div>
                            <div className="infoTitle">Sub Region: <div className="infoValue">{country.subregion}</div></div>
                            <div className="infoTitle">Capital: <div className="infoValue">{country.capital[0]}</div></div>
                        </div>
                        <div className="upRightDetailsInfo">
                            <div className="infoTitle">Top Level Domain: <div className="infoValue">{country.tld[0]}</div></div>
                            <div className="infoTitle">Currencies: <div className="infoValue">{Object.values(country.currencies)[0].name}</div></div>
                            <div className="infoTitle">Languages:
                                {Object.keys(country.languages).length > 1 ? (
                                    <div className="infoValue">
                                        {Object.values(country.languages).map((language, index) => (
                                            <div className="infoValue" key={language + "Key"}> {language}{index < Object.values(country.languages).length - 1 ? ", " : ""}</div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="infoValue"> {Object.values(country.languages)[0]}</div>
                                )}
                            </div>
                        </div>
                    </div>
                    {country.borders ?
                        <div className="downDetailsInfo">
                            <div className="infoTitle borderInfo">Border Countires:
                                {country.borders.map((border) => (
                                    <div className="countryBorder" key={border}>{border}</div>
                                ))}
                            </div>
                        </div>
                        : <div></div>}
                </div>
            </div>
        </div>
    );
}

export default CountryFlagInfo;