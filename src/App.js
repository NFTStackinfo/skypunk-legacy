import React, { useEffect, useState, useRef } from "react";
import "./App.scss";
import ConnectButton from "./components/ConnectButton";
const App = () => {

  return (
      <div className='app'>
          <header className='header'>
              <div className="container">
                      <a href="#" className="logo"><img src="logo.png" alt="skypunk legacy"/></a>
              </div>
          </header>
          <main>
              <div className="container">
                  <div className="content">
                      <h1>MINT NOW</h1>
                      <p className='pink-text'>SKYPUNK LEGACY NFT COLLECTOIN</p>
                      <p className='text'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In lobortis mauris vel iaculis convallis. Proin sed magna orci. </p>
                      <ConnectButton/>
                  </div>
              </div>
          </main>

          <footer className='footer'>
              <div className="container">
                  <div className="content">
                      <div className='left'>
                          <a href="#" className='logo'><img src="logo.png" alt="skypunk legacy"/></a>
                          <p className="copyright">© Copyright {new Date().getFullYear()} Neon Skies, all rights reserved.</p>
                      </div>
                      <ul className="social">
                        <li>
                            <a href="#" target="_blank" rel='noreferrer'><img src="assets/icons/twitter.svg" alt="twitter"/></a>
                        </li>
                        <li>
                            <a href="#" target="_blank" rel='noreferrer'><img src="assets/icons/youtube.svg" alt="youtube"/></a>
                        </li>
                        <li>
                            <a href="#" target="_blank" rel='noreferrer'><img src="assets/icons/medium.svg" alt="medium"/></a>
                        </li>
                        <li>
                            <a href="#" target="_blank" rel='noreferrer'><img src="assets/icons/discord.svg" alt="discord"/></a>
                        </li>
                      </ul>

                  </div>
              </div>
          </footer>
      </div>
  );
}

export default App;





