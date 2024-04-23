

// export default UserAdds;
import React from "react";
import "./styles.css";
import { TbManualGearbox } from 'react-icons/tb';
import { BsFillFuelPumpFill } from 'react-icons/bs';
import { PiEngine } from 'react-icons/pi';
import { IoMdCash } from "react-icons/io";
import Detailed from "../Detailed/Detailed";
import { GiPathDistance } from "react-icons/gi";
import EditingAdd from "../EditingAdd/EditingAdd";
import axios from 'axios';
class UserAdds extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            user_id: props.id,
            autos: [],
            detailed: false,
            detailedList: [],
        };
      }

    handle = (event) => {
       console.log(this.state.autos);
    };
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
    handleAutoClick(auto) {
        console.log("Clicked on auto:", auto);
        this.setState({
          detailed: true,
          auto: auto
        });
    }

    async componentDidMount() {
      try {
        console.log(this.state.user_id)
        const response = await fetch(`http://localhost:3000/youradds/${this.state.user_id}`, {
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
                <PiEngine /> {auto.engine.toFixed(1)} {auto.engine_power}
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

      render() {
    
        return (
          <div className="all op">
            <div className="shadow-5">
              {this.state.detailed ? (
                <div>
                  { <EditingAdd add={this.state.auto} /> }
                </div>
              ) : (
                this.state.autos.map((item, index) => (
                  <div key={index}>
                    {/*  */}
                    {this.contentToRender(item)}
                  </div>
                ))
              )}
            </div>
          </div>
        );
      }
}

export default UserAdds;
