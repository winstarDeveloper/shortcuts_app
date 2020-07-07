import React, { Component } from "react";

export default class AddData extends Component {
  render() {
    return (
      <div class="col-3-of-4 addData">
        <form class="text-center p-5" action="#!">
          <p class="h4 mb-4 addData__title">Add Application Shortcuts</p>

          <input
            type="text"
            id="defaultContactFormName"
            class="form-control mb-4"
            placeholder="Enter App Name"
          />

          <div class="form-group">
            <textarea
              class="form-control rounded-0"
              id="exampleFormControlTextarea2"
              rows="3"
              placeholder="App Description"
            ></textarea>
          </div>

          <label class="addData__label">Shortcuts</label>
          <input
            type="text"
            id="defaultContactFormName"
            class="form-control mb-4"
            placeholder="Action"
          />
          <select class="browser-default custom-select mb-4">
            <option value="" disabled>
              Choose option
            </option>
            <option value="1" selected>
              Shortcut
            </option>
            <option value="2">Report a bug</option>
            <option value="3">Feature request</option>
            <option value="4">Feature request</option>
          </select>

          <button class="btn btn-outline-info" type="submit">
            Add new Shortcut
          </button>
          {"\t"}
          <button class="btn btn-info" type="submit">
            Done
          </button>
        </form>
      </div>
    );
  }
}
