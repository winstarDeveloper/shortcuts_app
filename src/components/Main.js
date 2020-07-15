import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { LoopCircleLoading } from 'react-loadingg';

import Advertisements from './Advertisements';
import PopularApps from './PopularApps';
import TopApps from './TopApps';
import AppList from './AppList';
import Feedback from './Feedback';
import About from './About';
import Login from './Login';
import ViewFeedback from './ViewFeedback';
import AddData from './AddData';
import ViewAppShortcuts from './ViewAppShortcuts';
import NotFound from './NotFound';

import * as URL from './../utils/api_urls';

class Main extends Component {
  state = {
    loading: true,
    message: '',
    appList: [],
    popularAppsData: [],
  };

  async componentDidMount() {
    try {
      const app_list_url = URL.TopAppsListURL;
      const list_response = await fetch(app_list_url);
      const appListData = await list_response.json();
      this.setState({ appList: appListData.data.map((i) => i.name) });
      this.setState({ loading: false });
    } catch (err) {
      this.setState({ loading: true, message: err.message });
    }
  }

  render() {
    return (
      <main>
        <section className="grid">
          <div className="row">
          
            <Route path="/:all" render={() => <Advertisements />} />
          
            <Switch>
              <Route
                exact
                path="/"
                render={() =>
                  this.state.loading ? (
                    <div className="col-3-of-4">
                      {' '}
                      <LoopCircleLoading />{' '}
                      {this.state.message ? (
                        <div className="alert alert-danger" role="alert">
                          {this.state.message +
                            ' : Check Connection and Reload the page'}
                        </div>
                      ) : null}
                    </div>
                  ) : (
                    <div>
                      <Advertisements />
                      <PopularApps />
                      <TopApps appsList={this.state.appList} />
                    </div>
                  )
                }
              />

              {/*<Route
              exact
              path="/"
              render={() =>
                this.state.loading ? null : (
                  <TopApps appsList={this.state.appList} />
                )
              }
            />*/}
              <Route
                exact
                path="/applist"
                render={() => <AppList appsList={this.state.appList} />}
              />
              <Route exact path="/feedback" render={() => <Feedback />} />
              <Route exact path="/about" render={() => <About />} />
              <Route exact path="/login" render={() => <Login />} />
              <Route
                exact
                path="/viewfeedback"
                render={() => <ViewFeedback />}
              />
              <Route exact path="/adddata" render={() => <AddData />} />

              <Route
                exact
                path="/app/:appName"
                render={(props) => (
                  <ViewAppShortcuts name={props.match.params.appName} />
                )}
              />

              <Route render={() => <NotFound />} />
            </Switch>
          </div>
        </section>
      </main>
    );
  }
}

export default Main;
