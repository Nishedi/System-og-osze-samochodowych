import React from "react";
import "./styles.css";
import axios from 'axios';

class EditingAdd extends React.Component {
  constructor(props) {
    super(props);
    console.log(props.add)
    this.state = {
        
        deleted: false,
        user_id: props.id,
        auto_id: props.add.id,
        validFile: true,
        file: null,
        gearbox: props.add.gearbox,
        mark: props.add.mark,
        model: props.add.model,
        price: props.add.price,
        engine: props.add.engine,
        engine_power: props.add.engine_power,
        wheel_drive: props.add.wheel_drive,
        fuel: props.add.fuel,
        production_year: props.add.production_year,
        face_photo_url: props.add.face_photo_url,
        milage: props.add.milage,
    };
    console.log(this.state.face_photo_url);
  }

  handleFileChange = (e) => {
    this.setState({file: e.target.files[0]});   
  };


handleDelete = () => {
    console.log(this.state.auto_id);  
    fetch('http://localhost:3000/deletecar/', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            car_id:this.state.auto_id,
        })
    }).then(response => response.json())
    .then(data=>{
        console.log(data);
        if(data==="deleted")
            this.setState({deleted: true});
    })
};

  handleUpload = async () => {
    const { file } = this.state; 
    const { user_id, auto_id,  mark, model, price, engine, engine_power, gearbox, fuel, wheel_drive, production_year } = this.state;
    if(mark.length===0 || model.length===0 || price===0 || engine===0 || engine_power===0){
        console.error('Nie wypełniono wszystkich pól.');
        alert('Nie wypełniono wszystkich pól.');
        return;
    }    
    const formData = new FormData();
    formData.append('image', file);
    let changedFilename="";
    if(file){
        if (!this.state.file.type.startsWith('image/')) {
            console.error('Nieprawidłowy format pliku. Dozwolone są tylko pliki obrazów.');
            alert('Nieprawidłowy format pliku. Dozwolone są tylko pliki obrazów.');
            this.setState({ validFile: false });
            return;
        }
        try {
            const responseFromServer = await axios.post('http://localhost:3000/uploadimage', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            });
            console.log('Plik został pomyślnie przesłany!');
            changedFilename=responseFromServer.data;
            changedFilename="uploads/"+changedFilename;
        } catch (error) {
            console.error('Błąd podczas przesyłania pliku', error);
        }
    }
    if(!file){
        changedFilename=this.state.face_photo_url;
    }
    
    fetch('http://localhost:3000/editcar/', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            car_id:auto_id,
            mark: mark,
            model: model,
            production_year: production_year,
            price: price,
            face_photo_url: changedFilename,
            engine: engine,
            engine_power: engine_power,
            gearbox: gearbox, 
            fuel: fuel,
            wheel_drive: wheel_drive
        })
    }).then(response => response.json())
      
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
  };

  handleMilageChange = (event) => {
    this.setState({ milage: event.target.value });
  };
  

  render() {
    return (
        <div>
            {
            this.state.deleted? <h1 className="centerh1">Ogłoszenie usunięte</h1> :
                <div style={{ padding: '10px' }}>
                <div>
                    <p>{this.state.user_id}</p>
                    <p className="fontsize"><b>Dodaj zdjęcie na okładkę</b></p>
                    <input type="file" accept=".jpg, .jpeg, .png" className={`pad  ${this.state.validFile?"":"red"}`}  onChange={this.handleFileChange} />
                    <br />
                    <div className="pv2"> 
                        <p className="fontsize"><b>Marka</b></p>
                        <input className="b ph3 pv1  lh-copy dib hover-bg-black hover-white" 
                            type="text"
                            value={this.state.someText}
                            onChange={this.handleMarkChange}
                            placeholder={this.state.mark}
                            />
                    </div>
                    <div className="pv2"> 
                        <p className="fontsize"><b>Model</b></p>
                        <input className="b ph3 pv1  lh-copy dib hover-bg-black hover-white" 
                            type="text"
                            value={this.state.someText}
                            onChange={this.handleModelChange}
                            placeholder={this.state.model}
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
                            placeholder={this.state.price}
                            />
                    </div>
                    <div className="pv2"> 
                        <p className="fontsize"><b>Pojemność silnika</b></p>
                        <input className="b ph3 pv1  lh-copy dib hover-bg-black hover-white" 
                            type="number"
                            value={this.state.someText}
                            onChange={this.handleEngineChange}
                            placeholder={this.state.engine}
                            />
                    </div>
                    <div className="pv2"> 
                        <p className="fontsize"><b>Moc silnika</b></p>
                        <input className="b ph3 pv1  lh-copy dib hover-bg-black hover-white" 
                            type="number"
                            value={this.state.someText}
                            onChange={this.handleEnginePowerChange}
                            placeholder={this.state.engine_power}
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
                            placeholder={this.state.milage}
                            />
                    </div>
                    <div className="pv2"> 
                        <br/>
                        <button className="somespace b ph5 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" onClick={this.handleDelete} >Usuń ogłoszenie</button>
                        <button className="somespace b ph5 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" onClick={this.handleUpload}>Aktualizuj ogłoszenie</button>
                    </div>  
                </div> 
            </div>
            }
        </div>
    );
  }
}

export default EditingAdd;
