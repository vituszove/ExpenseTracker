import React from "react";
import { CgDarkMode} from "react-icons/cg";

const Header = () => {
    return(
    <header>
        
            <label htmlFor='openMenu' className='hamburger'>
                <span></span>
                <span></span>
                <span></span>
                <input type='checkbox' id='openMenu' />
            </label>
       
        <div className='header-title'>Overview</div>
        
            <CgDarkMode className='darkmode-switch'/>
 
    </header>)
}

export default Header;