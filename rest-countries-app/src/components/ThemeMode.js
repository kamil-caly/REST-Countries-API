import React from 'react';
import { ReactComponent as Moon } from '../icons/moon-solid.svg';

function ThemeMode() {

    if (localStorage) {
        localStorage.setItem("theme", "dark");
    }

    const switchTheme = () => {
        if (localStorage.getItem("theme") === "dark") {
            document.body.classList.replace("dark", "light");
            localStorage.setItem("theme", "light");
        } else {
            document.body.classList.replace("light", "dark");
            localStorage.setItem("theme", "dark");
        }
    }

    return (
        <div>
            <Moon className={'icon'} style={{ margin: "0px 10px 0px 0px" }} onClick={switchTheme} />
        </div>
    );
}

export default ThemeMode;