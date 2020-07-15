import React from 'react';
import * as URL from './../utils/api_urls';

class Popup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isOpen: false,
    };
    this.clearpopup = this.clearpopup.bind(this);
  }

  componentDidMount() {
    this.setState({
      items: this.props.items,
      isOpen: this.props.isOpen,
    });
  }

  componentWillReceiveProps(props) {
    this.setState({
      items: props.items,
      isOpen: props.isOpen,
    });
  }

  clearpopup() {
    this.setState({ isOpen: false, items: [] });
    document.getElementById('inputlg').value = '';
  }

  render() {
    if (!this.state.isOpen) return null;
    return (
      <div className="popup">
        <div className="container">
          <div className="content">
            {this.state.items &&
              this.state.items.map((item, idx) => {
                return (
                  <a className="link" key={idx} href={`${URL.ClientURL}/app/${item}`}>
                    <div onClick={this.clearpopup} className="item">
                      {item}
                    </div>
                  </a>
                );
              })}
            {!this.state.items.length && (
              <div className="warning" onClick={this.clearpopup}>Nothing Found!</div>
            )}
          </div>
          <div className="footer">Type Keyword to search for App</div>
        </div>
      </div>
    );
  }
}

export default Popup;
