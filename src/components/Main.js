import React from "react";

import Advertisements from "./Advertisements";
import PopularApps from "./PopularApps";
import TopApps from "./TopApps";

function Main() {
  return (
    <main>
      <section class="grid">
        <div class="row">
          <Advertisements />
          <PopularApps />
          <TopApps />
        </div>
      </section>
    </main>
  );
}

export default Main;
