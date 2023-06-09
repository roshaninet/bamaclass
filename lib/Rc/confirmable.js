import React from 'react'

const confirmable = (Component) => (class extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      show: true,
    }

    this.proceed = this.proceed.bind(this);
    this.dismiss = this.dismiss.bind(this);
    this.cancel = this.cancel.bind(this);
  }
  dismiss() {
    this.setState({
      show: false,
    }, () => {
      this.props.dispose();
    });
  }
  cancel(value) {
    this.setState({
      show: false,
    }, () => {
      this.props.reject(value);
    });
  }
  proceed(value) {
    this.setState({
      show: false,
    }, () => {
      this.props.resolve(value);
    });
  }
  render() {
    return <Component proceed={this.proceed} cancel={this.cancel} dismiss={this.dismiss} show={this.state.show} {...this.props}/>
  }
})

export default confirmable;
