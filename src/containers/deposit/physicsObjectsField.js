import React from 'react';

const schema = {
  type: "object",
  required: ["lat", "lon"],
  properties: {
    lat: {type: "number"},
    lon: {type: "number"}
  }
};

let dependenciesObject = {
  "electron": {
    "types": [
      "GsfElectron"
    ]
  },
  "muon": {
    "types": [
      "PFMuon",
      "GlobalMuon",
      "TrackerMuon"
    ]
  },
  "tau": {
    "types": [
      "PFTau"
    ]
  },
  "jet": {
    "types": [
      "AK4PF",
      "AK5PF",
      "AK6PF",
      "AK7PF",
      "AK8PF",
      "AK4Calo",
      "AK5Calo",
      "AK6Calo",
      "AK7Calo",
      "AK8Calo",
      "KT4PF",
      "KT5PF",
      "KT6PF",
      "KT7PF",
      "KT8PF",
      "KT4Calo",
      "KT5Calo",
      "KT6Calo",
      "KT7Calo",
      "KT8Calo"
    ]
  },
  "bjet": {
    "types": {}
  },
  "photon": {
    "types": [
      "Photon",
      "Conversion"
    ]
  },
  "track": {
    "types": []
  },
  "vertex": {
    "types": {}
  },
  "MET": {
    "types": [
      "PFMET",
      "CaloMET"
    ]
  },
  "HT": {
    "types": {}
  }
};


// Define a custom component for handling the root position object
class PhysicsObjectsField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {...props.formData};
  }

  onChange(name) {
    return (event) => {
      this.setState({
        [name]: parseFloat(event.target.value)
      }, () => this.props.onChange(this.state));
    };
  }

  render() {
    const {lat, lon} = this.state;
    return (
      <div>
        <input type="number" value={lat} onChange={this.onChange("lat")} />
        <input type="number" value={lon} onChange={this.onChange("lon")} />
        <input type="number" value={lon} onChange={this.onChange("lon")} />
      </div>
    );
  }
}

export default PhysicsObjectsField;