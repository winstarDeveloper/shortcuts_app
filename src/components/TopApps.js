import React from "react";
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const TopApps = (props) => {
  return (
    <div className="col-1-of-4">
      <div className="row__top-apps-list">
        <p>Top Apps List</p>
        <ul className="row__app-list">
          {props.appsList.map((i) => (
            <Link className="link" key={i} to={'/app/' + i}>
               <li className="row__app-list--content">{i}</li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};

TopApps.propTypes = {
  appsList: PropTypes.array.isRequired
}

export default TopApps;
