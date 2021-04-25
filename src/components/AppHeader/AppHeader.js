import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './AppHeader.css';

const AppHeader = () => {
  const [userName, setUserName] = useState('');

  useEffect((userName) => {
    fetch("https://graphqlzero.almansi.me/api", {
      "method": "POST",
      "headers": { "content-type": "application/json" },
      "body": JSON.stringify({
        query: `{
            user(id: 1) {
                id
                name
            }
          }`
      })
    }).then((resp) => resp.json())
      .then(resp => {
        setUserName(resp.data.user.name.match(/\b\w/g).join(''));
      })
      return userName;
  }, []);

  return(
    <div className="Header">
      <div className="AvatarWrapper">
        <div className="Avatar">{userName}</div>
        {/* Dropdown routing menu opened by hover */}
        <div className="Dropdown">       
          <Link to="/"><div className="Link">Feed page</div></Link>                
          <Link to="/faq"><div className="Link">FAQ page</div></Link>
          <Link to="/profile"><div className="Link">UserPage</div></Link>       
        </div>
      </div>
    </div>
  );
};

export default AppHeader;