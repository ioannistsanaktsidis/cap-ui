import React from 'react';

const schema = {
  type: "object",
  required: ["lat", "lon"],
  properties: {
    lat: {type: "number"},
    lon: {type: "number"}
  }
};

// Define a custom component for handling the root position object
class GeoPosition extends React.Component {
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
      </div>
    );
  }
}

// // Define the custom field component to use for the root object
// const uiSchema = {"ui:field": "geo"};

// // Define the custom field components to register; here our "geo"
// // custom field component
// const fields = {geo: GeoPosition};

// // Render the form with all the properties we just defined passed
// // as props
// render((
//   <Form
//     schema={schema}
//     uiSchema={uiSchema}
//     fields={fields} />
// ), document.getElementById("app"));