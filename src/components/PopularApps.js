import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const PopularApps = (props) => {
    return (
        <div className="col-2-of-4 popular-apps">
            {
              props.popularApps.map((i) => (
                <Link className="link" key={i.name} to={'/' + i.name}>
                <div className="popular-apps-box">
                  <h4>{i.name}</h4>
                  <p>{i.description}</p>
                </div>
                </Link>
              ))
            } 
        </div>
    );
};

PopularApps.propTypes = {
  popularApps: PropTypes.array.isRequired
}

export default PopularApps;