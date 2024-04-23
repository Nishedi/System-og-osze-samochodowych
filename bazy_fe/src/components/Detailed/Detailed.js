import React from "react";
import axios from 'axios';
import { TbManualGearbox } from 'react-icons/tb';
import { BsFillFuelPumpFill } from 'react-icons/bs';
import { PiEngine } from 'react-icons/pi';
import { IoMdCash } from "react-icons/io";
import { MdEmojiPeople } from "react-icons/md";
import { GiModernCity } from "react-icons/gi";
import { FaCalendar } from "react-icons/fa";
import { GiPathDistance } from "react-icons/gi";
import { IoPhonePortraitOutline } from "react-icons/io5";
import "./styles.css";
class Detailed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      add: this.props.add,
      urls: [],
      parsedDate : new Date(this.props.add.joined)
    };
    const options = { year: 'numeric', month: 'long' };
    const formattedDate = this.state.parsedDate.toLocaleString('default', options);
    console.log(formattedDate);
  }

  async componentDidMount() {
    try {
      const response = await fetch('http://localhost:3000/detailedPhoto/', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: this.props.add.id
        })
      });
      const data = await response.json();
      const urls = await Promise.all(data.map(async (item) => {
        return await this.fetchFile(item.url);
      }));

      this.setState({
        urls: urls
      });
    } catch (error) {
      console.error('Error:', error);
    }
  }

  async fetchFile(item) {
    try {
      const response = await axios.get(`http://localhost:3000/files/${item}`, {
        responseType: 'blob',
      });
      const fileBlob = new Blob([response.data], { type: response.headers['content-type'] });
      const url = URL.createObjectURL(fileBlob);
      return url;
    } catch (error) {
      console.error('Error fetching file:', error);
    }
  }

  render() {
    const { add, urls } = this.state;

    return (
      <div>
        <h2>Szczegóły ogłoszenia</h2>
        <p><strong>{add.mark}   {add.model}</strong></p>
        <p><FaCalendar /> {add.production_year}</p>
        <p><IoMdCash /> {add.price} zł</p>
        <p><PiEngine /> {add.engine.toFixed(1)}   {add.engine_power} km</p>
        <p><TbManualGearbox /> {add.gearbox}  {add.wheel_drive}</p>
        <p><BsFillFuelPumpFill /> {add.fuel}</p>
        <p><GiPathDistance /> {add.milage} km</p>
        <p><MdEmojiPeople />  {add.name}</p>
        <p><GiModernCity /> {add.miasto}</p>
        <p><IoPhonePortraitOutline />  {add.phone_number}</p>
        <p>Użytkownik od {`${this.state.parsedDate.toLocaleDateString()} `}</p>
        {urls.map((url, index) => (
          <img key={index} src={url} className="nest" alt="" />

        ))}
      </div>
    );
  }
}

export default Detailed;
