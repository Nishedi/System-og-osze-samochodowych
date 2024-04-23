import React, { useState } from "react";
import "./styles.css";

const Navigation = ({ changeRoute, route, isSignedIn, changeSignedIn }) => {
  const [showAddButton, setShowAddButton] = useState(true);

  const handleAddClick = () => {
    setShowAddButton(false);
    changeRoute("addingAdd");
  };

  const handleSignOutClick = () => {
    changeRoute("signin");
    changeSignedIn(false);
  };

  const handleBackClick = () => {
    setShowAddButton(true);
    changeRoute("browser");
  };

  const handleYourAddsClick = () => { 
    changeRoute("yourAdds");
  };

  return (
    <div>
      <nav className="nav-container">
        <div className="nav-content">
          <p className="fl w-90"></p>
          {showAddButton ? (
            isSignedIn ? (
              <>
              <p
                onClick={handleAddClick}
                className="f3 underline calisto measure-narrow fl w-10 br-pill grow dim center"
              >
                Dodaj ogłoszenie
              </p>
              {route === "yourAdds" ? (
                <p
                onClick={handleBackClick}
                className="f3 underline calisto measure-narrow fl w-10 br-pill grow dim"
                >
                  Ogłoszenia
                </p>
              
              ) : 
              (<p
                onClick={handleYourAddsClick}
                className="f3 underline calisto measure-narrow fl w-10 br-pill grow dim center"
              >
                Twoje Ogłoszenia
              </p>)}
                
              
            </>
            ) : route === "detailed" ? 
                ( <p
                  onClick={handleBackClick}
                  className="f3 underline calisto measure-narrow fl w-10 br-pill grow dim"
                  >
                    Ogłoszenia
                  </p>):
                  null

            
          ) : (
            <p
              onClick={handleBackClick}
              className="f3 underline calisto measure-narrow fl w-10 br-pill grow dim"
            >
              Ogłoszenia
            </p>
          )}
          <p
            onClick={handleSignOutClick}
            className="f3 underline calisto measure-narrow fl w-10 br-pill grow dim"
          >
            {isSignedIn ? "Wyloguj" : "Zaloguj"}
          </p>
        </div>
      </nav>
    </div>
  );
  
};

export default Navigation;
