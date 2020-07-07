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
    appList: [
      "Windows 10",
      "MS Office",
      "Kaspersky Security",
      "VS Code",
      "Google Chrome",
      "Stremio",
      "Notepad",
    ],
    popularAppsData: [
      {
        appName: "Windows 10",
        description: "Windows 10 is a very popular operating system",
        shortcutsData: [
          {
            action: "Select all content",
            shortcut: ["Ctrl", "A"],
          },
          {
            action: "Copy selected items to clipboard.",
            shortcut: ["Ctrl", "C"],
          },
          {
            action: "Cut selected items to clipboard.",
            shortcut: ["Ctrl", "X"],
          },
          {
            action: "Paste content from clipboard.",
            shortcut: ["Ctrl", "V"],
          },
          {
            action: "Undo an action, including undelete files (limited).",
            shortcut: ["Ctrl", "Z"],
          },
        ],
      },
      {
        appName: "Kaspersky Security",
        description:
          "Kaspersky Internet Security is an internet security suite developed by Kaspersky Lab compatible with Microsoft Windows and Mac OS X. KIS offers protection from malware, as well as email spam, phishing and hacking attempts, and data leaks. Kaspersky Lab Diagnostics results are distributed to relevant developers through MIT",
        shortcutsData: [
          {
            action: "Open on-screen keyboard",
            shortcut: ["Ctrl", "Alt", "Shift", "P"],
          },
          {
            action: "Switch to English language",
            shortcut: ["Shift", "F12"],
          },
          {
            action: "Switch back to previous language",
            shortcut: ["Shift", "F5"],
          },
          {
            action: "Switch keyboard layout",
            shortcut: ["Ctrl", "Left-Click"],
          },
          {
            action: "Delete selected data",
            shortcut: ["Del"],
          },
        ],
      },
      {
        appName: "VS Code",
        description: "Visual Studio Code Editor",
        shortcutsData: [
          {
            action: "Delete Line",
            shortcut: ["Ctrl", "Shift", "K"],
          },
          {
            action: "Insert Line Below",
            shortcut: ["Ctrl", "Enter"],
          },
          {
            action: "Insert Line Above",
            shortcut: ["Ctrl", "Shift", "Enter"],
          },
          {
            action: "Move Line Down",
            shortcut: ["Alt", "Down"],
          },
          {
            action: "Move Line Up",
            shortcut: ["Alt", "Up"],
          },
        ],
      },
    ],
  };

  render() {
    return (
      <main>
        <section class="grid">
          <div class="row">
            <Advertisements />
            <Route exact path="/" render={() => (
                <PopularApps popularApps={this.state.popularAppsData} />
            )} />
             <Route exact path="/" render={() => (
                <TopApps appsList={this.state.appList} /> 
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
