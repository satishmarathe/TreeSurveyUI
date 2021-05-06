import React from "react";

function Header(){
    return(
        <nav>
            <a href="/">Home</a> | <a href="/surveys">Surveys</a> | {" "}<a href="/about">About </a>  
        </nav>
    )
}
export default Header;