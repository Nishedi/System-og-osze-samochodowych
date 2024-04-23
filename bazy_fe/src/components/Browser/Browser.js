import React from "react";
import "./styles.css";
import { TbManualGearbox } from 'react-icons/tb';
import { BsFillFuelPumpFill } from 'react-icons/bs';
import { PiEngine } from 'react-icons/pi';
import { IoMdCash } from "react-icons/io";
import Detailed from "../Detailed/Detailed";
import { GiPathDistance } from "react-icons/gi";
import axios from 'axios';

class Browser extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      autos : [],
      detailedList: [],
      photos_urls: [],
      detailed: false,
      auto: {},
      email: '',
      password: '',
      success: false,
      naped: '-',
      moc_max: 10000,
      fuel: '-',
      moc_min: 0,
      gearbox: '-',
      cena_max: 1000000,
      cena_min: 0,
      engine_capacity_min: 0,
      engine_capacity_max: 8.5,
      min_year: 1900,
      max_year: 2030,
    };
  }


  fetchImage = (imageName) => {
    return new Promise((resolve, reject) => {
      fetch(`/api/${imageName}`)
        .then((response) => response.blob())
        .then((blob) => {
          const objectURL = URL.createObjectURL(blob);
          resolve(objectURL);
        })
        .catch((error) => reject(error));
    });
  };
  
  async fetchFile(item) {
    try {
      const response = await axios.get(`http://localhost:3000/files/${item.face_photo_url}`, {
        responseType: 'blob',
      });
      const fileBlob = new Blob([response.data], { type: response.headers['content-type'] });
      const url = URL.createObjectURL(fileBlob);
      return {auto: item, url: url};
    } catch (error) {
      console.error('Error fetching file:', error);
    }
  }

  async componentDidMount() {
    try {
      const response = await fetch('http://localhost:3000/browser/', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({})
      });
  
      const autosData = await response.json();
  
      this.setState({
        autos: autosData
      });
  
      const detailedList = [];
  
      for (const item of autosData) {
        const detailedData = await this.fetchFile(item);
        detailedList.push(detailedData);
      }
  
      this.setState({
        detailedList: detailedList
      });
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  

  contentToRender(auto) {   
    const matchingDetail = this.state.detailedList.find(detail => detail && detail.auto === auto);
    return (
      <div
        className="shadow-5 grow"
        style={{ display: 'flex', alignItems: 'center', padding: '20px' }}
        onClick={() => this.handleAutoClick(auto)}>
          <div>
            {
            matchingDetail && matchingDetail.url && (
              <div>
                <img src={matchingDetail.url} style={{ maxHeight: '200px', maxWidth: '300px' }} alt="Zdjęcie auta" />
              </div>
            )}
          </div>
        <div className="left">
          <p style={{ fontSize: "24px" }}>
            <div className="red left">
              <strong>
                {auto.mark} {auto.model}
              </strong>
            </div>
            <div className="left">
              <PiEngine /> {auto.engine.toFixed(1)} {auto.engine_power} km
            </div>
            <div className="left">
              <IoMdCash /> {auto.price} zł
            </div>
            <div className="left">
              <TbManualGearbox /> {auto.gearbox} {auto.wheel_drive}
            </div>
            <div className="left">
              <BsFillFuelPumpFill /> {auto.fuel}
            </div>
            <div className="left">
              <GiPathDistance /> {auto.milage} km
            </div>
          </p>
        </div>
      </div>
    );
  }
  
  
  handleAutoClick(auto) {
    // console.log("Clicked on auto:", auto);
    if(!this.props.isSignedIn){
      alert("Musisz być zalogowany, aby móc oglądać szczegóły ogłoszenia");
      return;
    }
    this.setState({
      detailed: true,
      auto: auto
    });
  }

  handleWheelDriveChange = (event) => {   
    this.setState({
      naped: event.target.value,
    });
  }

  handleFuelChange = (event) => {
    this.setState({
      fuel: event.target.value,
    });
  }

  handleMaxPowerChange = (event) => {
    if(event.target.value < 10){
      this.setState({
        moc_max: 10,
      });
      return;
    }
    this.setState({
      moc_max: event.target.value,
    });
  }

  handleMinPowerChange = (event) => {
    this.setState({
      moc_min: event.target.value,
    });
  }

  handleMaxPriceChange = (event) => {
    this.setState({
      cena_max: event.target.value,
    });
  }

  handleMinPriceChange = (event) => {
    this.setState({
      cena_min: event.target.value,
    });
  }

  handlegearboxChange = (event) => {
    this.setState({
      gearbox: event.target.value,
    });
  }

  handleEngineCapacityMinChange = (event) => { 
    this.setState({
      engine_capacity_min: event.target.value,
    });
  }

  handleEngineCapacityMaxChange = (event) => {
    this.setState({
      engine_capacity_max: event.target.value,
    });
  }

  handleMaxYearChange = (event) => {
    this.setState({
      max_year: event.target.value,
    });
  }
  hanldeMinYearChange = (event) => {
    this.setState({
      min_year: event.target.value,
    });
  }
  

  

  

  render() {
    
    return (
      <div className="all op topmargin">
        <div className="shadow-5">
          {!this.state.detailed && (
            <div>
              <div className="container">
                <div className="drive-selection">
                  <p>Rodzaj napędu:</p>
                  <select 
                    className="b ph3 pv2 lh-copy dib hover-bg-black hover-white" 
                    value={this.state.wheel_drive} 
                    onChange={this.handleWheelDriveChange}
                  >
                    <option value="-">-</option>
                    <option value="przedni">przedni</option>
                    <option value="tylni">tylni</option>
                    <option value="4x4">4x4</option>
                  </select>
                </div>
                <div className="drive-selection">
                  <p>Rodzaj paliwa:</p>
                  <select 
                    className="b ph3 pv2 lh-copy dib hover-bg-black hover-white" 
                    value={this.state.wheel_drive} 
                    onChange={this.handleFuelChange}
                  >
                    <option value="-">-</option>
                    <option value="benzyna">benzyna</option>
                    <option value="diesel">diesel</option>
                  </select>
                </div>
                <div className="engine-input">
                  <p>Moc minimalna:</p>
                  <input 
                    className="b ph1 pv1 lh-copy dib hover-bg-black hover-white" 
                    type="number"
                    value={this.state.moc_min}
                    onChange={this.handleMinPowerChange}
                    placeholder={this.state.moc_min+" km"}
                  />
                </div>
                <div className="engine-input">
                  <p>Moc maksymalna:</p>
                  <input 
                    className="b ph1 pv1 lh-copy dib hover-bg-black hover-white" 
                    type="number"
                    value={this.state.moc_max}
                    onChange={this.handleMaxPowerChange}
                    placeholder={this.state.moc_max+" km"}
                  />
                </div>
                <div className="engine-input">
                  <p>Cena minimalna:</p>
                  <input 
                    className="b ph1 pv1 lh-copy dib hover-bg-black hover-white" 
                    type="number"
                    value={this.state.cena_min}
                    onChange={this.handleMinPriceChange}
                    placeholder={this.state.cena_min+" zł"}
                  />
                </div>
                <div className="engine-input">
                  <p>Cena maksymalna:</p>
                  <input 
                    className="b ph1 pv1 lh-copy dib hover-bg-black hover-white" 
                    type="number"
                    value={this.state.cena_max}
                    onChange={this.handleMaxPriceChange}
                    placeholder={this.state.cena_max+" zł"}
                  />
                </div>
              </div>
              <div className="container">
                <div className="drive-selection">
                  <p>Skrzynia biegów:</p>
                  <select 
                    className="b ph3 pv2 lh-copy dib hover-bg-black hover-white" 
                    value={this.state.wheel_drive} 
                    onChange={this.handlegearboxChange}
                  >
                    <option value="-">-</option>
                    <option value="manualna">manualna</option>
                    <option value="automatyczna">automatyczna</option>
                  </select>
                </div>
                <div className="engine-input">
                  <p>Pojemność minimalna:</p>
                  <input 
                    className="b ph1 pv1 lh-copy dib hover-bg-black hover-white" 
                    type="number"
                    value={this.state.engine_capacity_min}
                    onChange={this.handleEngineCapacityMinChange}
                    placeholder={this.state.cena_min+" zł"}
                  />
                </div>
                <div className="engine-input">
                  <p>Pojemność maksymalna:</p>
                  <input 
                    className="b ph1 pv1 lh-copy dib hover-bg-black hover-white" 
                    type="number"
                    value={this.state.engine_capacity_max}
                    onChange={this.handleEngineCapacityMaxChange}
                    placeholder={this.state.cena_max+" zł"}
                  />
                </div>
                <div className="engine-input">
                  <p>Rok produkcji od:</p>
                  <input 
                    className="b ph1 pv1 lh-copy dib hover-bg-black hover-white" 
                    type="number"
                    value={this.state.min_year}
                    onChange={this.hanldeMinYearChange}
                    placeholder={this.state.cena_min+" zł"}
                  />
                </div>
                <div className="engine-input">
                  <p>Rok produkcji do:</p>
                  <input 
                    className="b ph1 pv1 lh-copy dib hover-bg-black hover-white" 
                    type="number"
                    value={this.state.max_year}
                    onChange={this.handleMaxYearChange}
                    placeholder={this.state.cena_max+" zł"}
                  />
                </div>

              </div>
            </div>
            
          )}
          {this.state.detailed ? (
            <div>
              { <Detailed add={this.state.auto} /> }
            </div>
          ) : (
              this.state.autos.map((item, index) => (
                <div key={index}>
                  {/* {this.state.naped === '-' || item.wheel_drive === this.state.naped ? this.contentToRender(item) : null} */}
                  {(
                    (this.state.naped === '-' || item.wheel_drive === this.state.naped) &&
                    (item.engine_power >= this.state.moc_min && item.engine_power <= this.state.moc_max) &&
                    (item.price >= this.state.cena_min && item.price <= this.state.cena_max) &&
                    (this.state.fuel === '-' || this.state.fuel === item.fuel) &&
                    (this.state.gearbox === '-' || this.state.gearbox === item.gearbox) &&
                    (item.engine >= this.state.engine_capacity_min && item.engine <= this.state.engine_capacity_max) &&
                    (item.production_year >= this.state.min_year && item.production_year <= this.state.max_year)
                  ) ? ( <div key={index}>
                    {this.contentToRender(item)}
                    
                  </div>) : null}

                </div>
              ))
          )}
        </div>
      </div>
    );
  }
}

export default Browser;