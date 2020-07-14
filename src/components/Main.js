import React, { Component } from "react";
import { Route } from 'react-router-dom';

import Advertisements from "./Advertisements";
import PopularApps from "./PopularApps";
import TopApps from "./TopApps";
import AppList from './AppList';
import Feedback from './Feedback';
import About from './About';
import Login from './Login';
import ViewFeedback from './ViewFeedback';
import AddData from './AddData';

class Main extends Component {
  state = {
    loading: true,
    appList: [],
    popularAppsData: []
  };

  async componentDidMount(){
    const url = 'http://localhost:8000/api/v1/app/';
    const app_list_url = 'http://localhost:8000/api/v1/app/top-apps-list';
    const response = await fetch(url);
    const list_response = await fetch(app_list_url);
    const appData = await response.json();
    const appListData = await list_response.json();
    this.setState({ popularAppsData: appData.data });
    this.setState({ appList: appListData.data.map(i => i.name) });
    this.setState({ loading: false });
  }

  render() {
    return (
      <main>
        <section className="grid">
          <div className="row">
            <Advertisements />
            <Route exact path="/" render={() => (
                this.state.loading ? <div> Loading... </div> : <PopularApps popularApps={this.state.popularAppsData}/>
            )} />
             <Route exact path="/" render={() => (
               this.state.loading ? <div> Loading... </div> : <TopApps appsList={this.state.appList} /> 
            )} />
            
            <Route exact path="/applist" render={() => <AppList appsList={this.state.appList} />} />
            <Route exact path="/feedback" render={() => <Feedback />} />
            <Route exact path="/about" render={() => <About />} />
            <Route exact path="/login" render={() => <Login />} />
            <Route exact path="/viewfeedback" render={() => <ViewFeedback />} />
            <Route exact path="/adddata" render={() => <AddData />} />
          </div>
        </section>
      </main>
    );
  }
}

export default Main;
