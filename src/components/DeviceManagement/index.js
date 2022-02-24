import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FiCornerDownLeft, FiCheck, FiTrash } from "react-icons/fi";
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';

import { Creators as DeviceActions } from "../../store/ducks/devices";

import './device.css';

class DeviceList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      devicesResolved: [],
      isLoading: false
    };
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({
      isLoading: true
    })
    if (!this.input.value) return alert("Type something =)");

    // this.props.addDevice(this.input.value);
    const nameInput = document.getElementById("nameInput").value;
    const priceInput = document.getElementById("priceInput").value;
    await this.props.addDevice(nameInput, priceInput);
    this.props.devices.then(result => {
      this.setState({
        devicesResolved: result,
        isLoading: false
      })
    });
    document.getElementById("nameInput").value = '';
    document.getElementById("priceInput").value = '';
  };

  removeDeviceInState = async (deviceId) => {
    this.setState({
      isLoading: true
    })
    await this.props.removeDevice(deviceId);
    this.props.devices.then(result => {
      this.setState({
        devicesResolved: result,
        isLoading: false
      })
    });
  }

  updateDeviceInState = async (deviceId, deviceName, devicePrice) => {
    this.setState({
      isLoading: true
    })
    await this.props.updateDevice(deviceId, deviceName, devicePrice);
    this.props.devices.then(result => {
      this.setState({
        isLoading: false
      })
    });
  }

  async componentDidMount() {
    this.setState({
      isLoading: true
    })
    await this.props.getDevices();
    this.props.devices.then(result => {
      this.setState({
        devicesResolved: result,
        isLoading: false
      })
    });
  }

  render() {
    // const { updateDevice } = this.props;
    return (
      <Fragment>
        <section id="section">
          {this.state.isLoading && <CircularProgress />}
          <h2>DEVICE MANAGEMENT</h2>
          <form onSubmit={this.handleSubmit}>
            <input ref={(el) => (this.input = el)} placeholder='Name' id='nameInput' />
            <input ref={(el) => (this.input = el)} placeholder='Price' id='priceInput' />
            <button type="submit">
              <FiCornerDownLeft />
            </button>
          </form>

          <ul>
            {this.state.devicesResolved?.map((device) => (
              <li key={device.id}>
                <span id="name">
                  <span>Name: </span>
                  <input className="input" defaultValue={device.name} onChange={(e) => device.name = e.target.value} />
                  <span id="priceText">Price: </span>
                  <input className="input" defaultValue={device.price} onChange={(e) => device.price = e.target.value} />
                </span>

                <span id="actions">
                  <button onClick={() => this.updateDeviceInState(device.id, device.name, device.price)}>
                    {<FiCheck size={18} />}
                  </button>
                  <button onClick={() => this.removeDeviceInState(device.id)}>
                    <FiTrash size={18} />
                  </button>
                </span>
              </li>
            ))
            }
          </ul>
          <Button variant="outlined" href="/chart">Price Statistics</Button>
        </section>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  devices: state.devices,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(DeviceActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DeviceList);
