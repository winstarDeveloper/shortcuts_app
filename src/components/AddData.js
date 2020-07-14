import React, { Component } from 'react';

export default class AddData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 'success',
      message: '',
      reqSuccess: false,
      appName: '',
      description: '',
      action: '',
      shortcut: '',
      shortcutArr: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(event) {
    event.preventDefault();
    console.log('in here:22', this.state.status);
    const data = {
      name: this.state.appName,
      description: this.state.description,
      shortcuts: this.state.shortcutArr,
    };

    if (this.state.appName === '') {
      await this.setState({
        status: 'fail',
        message: 'App must have a Name',
      });
      console.log('in here:32', this.state.status);
    } else if (this.state.description === '') {
      await this.setState({
        status: 'fail',
        message: 'App must have a description',
      });
      console.log('in here:38');
    } else if (this.state.description.length < 20) {
      await this.setState({
        status: 'fail',
        message: 'App must have a description atleast 20 characters long',
      });
      console.log('in here:44');
    } else if (this.state.shortcutArr.length === 0) {
      await this.setState({
        status: 'fail',
        message: 'App must have atleast one shortcut',
      });
      console.log('in here:50');
    } else{
      await this.setState({
        status: 'success'
      });
    }

    if (this.state.status !== 'fail') {
      console.log('in here:55', this.state.status);
      const response = await fetch('http://localhost:8000/api/v1/app/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const res = await response.json();
      this.setState({ status: res.status, message: res.message });
      console.log(res.message);

      if (res.status === 'success') {
        document.getElementById('appName').value = '';
        document.getElementById('descriptionTextArea').value = '';
        document.getElementById('actionInput').value = '';
        document.getElementById('shortcutInput').value = '';

        this.setState({
          message: '',
          reqSuccess: false,
          appName: '',
          description: '',
          action: '',
          shortcut: '',
          shortcutArr: [],
        });

        this.setState({ reqSuccess: true });
      }
    }
  }

  handleNameChange = (event) => {
    this.setState({ appName: event.target.value });
  };

  handleDescriptionChange = (event) => {
    this.setState({ description: event.target.value });
  };

  handleActionChange = (event) => {
    this.setState({ action: event.target.value });
  };

  handleShortcutChange = (event) => {
    this.setState({ shortcut: event.target.value });
  };

  handleAddShortcut = (e) => {
    e.preventDefault();
    const sc = {
      action: this.state.action,
      shortcut: this.state.shortcut.split('+'),
    };
    this.setState({ shortcutArr: [...this.state.shortcutArr, sc] });
    this.setState({ action: '', shortcut: '' });
    document.getElementById('actionInput').value = '';
    document.getElementById('shortcutInput').value = '';
    // this.forceUpdate();
  };

  handleAddAnotherApp = (e) => {
    e.preventDefault();
    this.setState({ reqSuccess: false });
  };

  render() {
    return (
      <div className="col-3-of-4 addData">
        {this.state.status !== 'success' ? (
          <div className="alert alert-danger" role="alert">
            {this.state.message}
          </div>
        ) : null}
        {!this.state.reqSuccess ? (
          <form className="text-center p-5" onSubmit={this.handleSubmit}>
            <p className="h4 mb-4 addData__title">Add Application Shortcuts</p>

            <input
              type="text"
              id="appName"
              className="form-control mb-4"
              placeholder="Enter App Name"
              value={this.state.appName}
              onChange={this.handleNameChange}
            />

            <div className="form-group">
              <textarea
                className="form-control rounded-0"
                id="descriptionTextArea"
                rows="3"
                placeholder="App Description"
                value={this.state.description}
                onChange={this.handleDescriptionChange}
              ></textarea>
            </div>

            <label className="addData__label">Shortcuts</label>
            <input
              type="text"
              id="actionInput"
              className="form-control mb-4"
              placeholder="Action"
              value={this.state.action}
              onChange={this.handleActionChange}
            />
            <input
              type="text"
              id="shortcutInput"
              className="form-control mb-4"
              placeholder="Ex: Ctrl+Alt+C"
              value={this.state.shortcut}
              onChange={this.handleShortcutChange}
            />

            <button
              className="btn btn-outline-info"
              onClick={this.handleAddShortcut}
            >
              Add Shortcut
            </button>
            {'\t'}
            <button className="btn btn-info btn-done" type="submit">
              Done
            </button>

            {this.state.shortcutArr.length
              ? this.state.shortcutArr.map((i, index) => {
                  return (
                    <div key={index} className="addData__shortcut">
                      <h5>{i.action}</h5>
                      <p>{i.shortcut.join('+')}</p>
                    </div>
                  );
                })
              : null}
          </form>
        ) : (
          <div>
            <div className="alert alert-success" role="alert">
              App Data added successfully !
            </div>
            <button
              className="btn btn-info btn-add"
              onClick={this.handleAddAnotherApp}
            >
              Add another App
            </button>
          </div>
        )}
      </div>
    );
  }
}
