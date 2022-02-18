import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FiCornerDownLeft, FiCheck, FiTrash } from "react-icons/fi";

import { Creators as DeviceActions } from "../../store/ducks/devices";
import './device.css';

class DeviceList extends Component {
  handleSubmit = (e) => {
    e.preventDefault();

    if (!this.input.value) return alert("Type something =)");

    // this.props.addDevice(this.input.value);
    const nameInput = document.getElementById("nameInput").value;
    const priceInput = document.getElementById("priceInput").value;
    this.props.addDevice(nameInput, priceInput);
    document.getElementById("nameInput").value = '';
    document.getElementById("priceInput").value = '';
  };

  render() {
    const { devices, updateDevice, removeDevice } = this.props;

    return (
      <section>
        <h2>DEVICE MANAGEMENT</h2>

        <form onSubmit={this.handleSubmit}>
          <input ref={(el) => (this.input = el)} placeholder='Name' id='nameInput' />
          <input ref={(el) => (this.input = el)} placeholder='Price' id='priceInput' />
          <button type="submit">
            <FiCornerDownLeft />
          </button>
        </form>

        <ul>
          {devices?.map((device) => (
            <li key={device.id}>
              <div id="name">
                <p>Name: </p>
                <input defaultValue={device.name} onChange={(e) => device.name = e.target.value} />
                <p id="priceText">Price: </p>
                <input defaultValue={device.price} onChange={(e) => device.price = e.target.value} />
              </div>

              <div id="actions">
                <button onClick={() => updateDevice(device.id, device.name, device.price)}>
                  {<FiCheck size={18} />}
                </button>
                <button onClick={() => removeDevice(device.id)}>
                  <FiTrash size={18} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  devices: state.devices,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(DeviceActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DeviceList);
