import React from "react";
import "./styles.css";
import axios from 'axios';

class AddingAdd extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
        phots: [],
        user_id: props.id,
        validFile: true,
        file: null,
        gearbox: 'manualna',
        mark: '',
        model: '',
        price: 0,
        engine: 1.0,
        engine_power: 0,
        wheel_drive: 'przedni',
        fuel: 'benzyna',
        production_year: 2023,
        milage : 0,
    };
  }

  addToPhotos = (e) => {
    this.setState({phots: [...this.state.phots, e.target.files[0]]});
  }

  handleFileChange = (e) => {
    this.setState({file: e.target.files[0]});   
  };

  handleUpload = async () => {
    const { file } = this.state; 
    if (!file) {
        console.error('Nie wybrano pliku do przesłania.');
        return;
    }
    if(this.state.user_id===0) return;
    
    const { user_id,  mark, model, price, engine, engine_power, gearbox, fuel, wheel_drive, production_year, milage } = this.state;
    if(mark.length===0 || model.length===0 || price===0 || engine===0 || engine_power===0){
        console.error('Nie wypełniono wszystkich pól.');
        alert('Nie wypełniono wszystkich pól.');
        return;
    }   
    if(price<0||production_year<1900||production_year>2024||milage<0||engine<0||engine_power<0){
      alert("Nieprawidłowe dane liczbowe");
      return;
    } 
    if (!this.state.file.type.startsWith('image/')) {
        console.error('Nieprawidłowy format pliku. Dozwolone są tylko pliki obrazów.');
        alert('Nieprawidłowy format pliku. Dozwolone są tylko pliki obrazów.');
        this.setState({ validFile: false });
        return;
    }

    let updatedFilename=[];
    for(let photo of this.state.phots){
      const formData = new FormData();
      formData.append('image', photo);
      try {
          const responseFromServer = await axios.post('http://localhost:3000/uploadimage', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          updatedFilename.push(responseFromServer.data);
          console.log('Plik został pomyślnie przesłany!');
        } catch (error) {
          console.error('Błąd podczas przesyłania pliku', error);
        }
      
    }
    
    const formData = new FormData();
    
    formData.append('image', file);
    let changedFilename="";
    try {
        const responseFromServer = await axios.post('http://localhost:3000/uploadimage', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log('Plik został pomyślnie przesłany!');
        changedFilename=responseFromServer.data;

      } catch (error) {
        console.error('Błąd podczas przesyłania pliku', error);
      }
    
    fetch('http://localhost:3000/addcar/', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            user_id:user_id,
            mark: mark,
            model: model,
            production_year: production_year,
            price: price,
            face_photo_url: "uploads/"+changedFilename,
            engine: engine,
            engine_power: engine_power,
            gearbox: gearbox, 
            fuel: fuel,
            wheel_drive: wheel_drive,
            milage: milage,
            photos: updatedFilename
        })
    }).then(response => response.json())
    this.handleChangeRouteToRegister("browser");
  };

  printMessage = () => {
    console.log(this.state.phots);
  };
  handleGearboxChange = (event) => {
    this.setState({
      gearbox: event.target.value,
    });
  };
  handleFuelChange = (event) => {
    this.setState({
      fuel: event.target.value,
    });
  }
  handleProductionYearChange = (event) => {
    this.setState({
        production_year: event.target.value,
    });
  }
  handleWheelDriveChange = (event) => {    
    this.setState({
        wheel_drive: event.target.value,
    });
  }
  handleMarkChange = (event) => {
    this.setState({ mark: event.target.value });
  };
  handleModelChange = (event) => {
    this.setState({ model: event.target.value });
  };
  handlePriceChange = (event) => {
    this.setState({ price: event.target.value });
  };
  handleEngineChange = (event) => {
    this.setState({ engine: event.target.value });
  };
  handleEnginePowerChange = (event) => {    
    this.setState({ engine_power: event.target.value });
  }
  handleMilageChange = (event) => {
    this.setState({ milage: event.target.value });
  };
  handleChangeRouteToRegister = (newValue) => {
    this.props.changeRoute(newValue);
  };

  render() {
    return (
        <div style={{ padding: '10px' }}>
            <div>
                <p className="fontsize"><b>Dodaj zdjęcie na okładkę</b></p>
                <input type="file" accept=".jpg, .jpeg, .png" className={`pad  ${this.state.validFile?"":"red"}`}  onChange={this.handleFileChange} />
                <br />
                <p className="fontsize"><b>Dodaj zdjęcia</b></p>
                <input type="file" accept=".jpg, .jpeg, .png" className={`pad  ${this.state.validFile?"":"red"}`}  onChange={this.addToPhotos} />
                <br />
                <div className="pv2"> 
                    <p className="fontsize"><b>Marka</b></p>
                    <input className="b ph3 pv1  lh-copy dib hover-bg-black hover-white" 
                        type="text"
                        value={this.state.someText}
                        onChange={this.handleMarkChange}
                        placeholder="Wprowadź markę"
                        />
                </div>
                
                <div className="pv2"> 
                    <p className="fontsize"><b>Model</b></p>
                    <input className="b ph3 pv1  lh-copy dib hover-bg-black hover-white" 
                        type="text"
                        value={this.state.someText}
                        onChange={this.handleModelChange}
                        placeholder="Wprowadź model"
                        />
                </div>
                <div className="pv2"> 
                    <p className="fontsize"><b>Rok produkcji</b></p>
                    <select className="b ph3 pv2  lh-copy dib hover-bg-black hover-white" 
                        value={this.state.production_year} onChange={this.handleProductionYearChange}>
                        {Array.from({ length: 34 }, (_, index) => (
                            <option key={index} value={1990 + index}>
                            {1990 + index}
                            </option>
                        ))}
                    </select><br />
                </div>
                <div className="pv2"> 
                    <p className="fontsize"><b>Cena</b></p>
                    <input className="b ph3 pv1 lh-copy dib hover-bg-black hover-white" 
                        type="number"
                        value={this.state.someText}
                        onChange={this.handlePriceChange}
                        placeholder="Wprowadź cenę"
                        />
                </div>
                <div className="pv2"> 
                    <p className="fontsize"><b>Pojemność silnika</b></p>
                    <input className="b ph3 pv1  lh-copy dib hover-bg-black hover-white" 
                        type="number"
                        value={this.state.someText}
                        onChange={this.handleEngineChange}
                        placeholder="Wprowadź pojemność"
                        />
                </div>
                <div className="pv2"> 
                    <p className="fontsize"><b>Moc silnika</b></p>
                    <input className="b ph3 pv1  lh-copy dib hover-bg-black hover-white" 
                        type="number"
                        value={this.state.someText}
                        onChange={this.handleEnginePowerChange}
                        placeholder="Wprowadź moc"
                        />
                </div>
                
                <div className="pv2"> 
                    <p className="fontsize"><b>Skrzynia biegów</b></p>
                    <select className="b ph3 pv2  lh-copy dib hover-bg-black hover-white" 
                        value={this.state.gearbox} onChange={this.handleGearboxChange}>
                        <option value="manualna">manualna</option>
                        <option value="automatyczna">automatyczna</option>
                    </select><br />
                </div>
                <div className="pv2"> 
                    <p className="fontsize"><b>Paliwo</b></p>
                    <select className="b ph3 pv2  lh-copy dib hover-bg-black hover-white" 
                        value={this.state.fuel} onChange={this.handleFuelChange}>
                        <option value="benzyna">benzyna</option>
                        <option value="diesel">diesel</option>
                    </select><br />
                </div>
                <div className="pv2"> 
                    <p className="fontsize"><b>Napęd</b></p>
                    <select className="b ph3 pv2 lh-copy dib hover-bg-black hover-white" 
                        value={this.state.wheel_drive} onChange={this.handleWheelDriveChange}>
                        <option value="przedni">przedni</option>
                        <option value="tylni">tylni</option>
                        <option value="4x4">4x4</option>
                    </select><br />
                </div>
                <div className="pv2"> 
                    <p className="fontsize"><b>Przebieg</b></p>
                    <input className="b ph3 pv1  lh-copy dib hover-bg-black hover-white" 
                        type="number"
                        value={this.state.someText}
                        onChange={this.handleMilageChange}
                        placeholder="Wprowadź przebieg"
                        />
                </div>
                <div className="pv2"> 
                  <p className="b ph5 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" onClick={this.handleUpload}>Udostępnij ogłoszenie</p>
                </div>
                
                
            </div>
            
        </div>

    );
  }
}

export default AddingAdd;
