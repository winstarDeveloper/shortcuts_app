import React from 'react';
import ad from './../ads/youtube-thumbnail-FB.jpg';

const Advertisements = () => {
    return (
        <div className="col-1-of-4 colad">
            <p className="row__ads">Advertisements</p>
            <div className="ads__box--1">
                <img src={ad} alt="ad" />
            </div>
            <div className="ads__box--2">
                <img src={ad} alt="ad" />
            </div>
            <div className="ads__box--3">
                <img src={ad} alt="ad" />
            </div>
        </div>
    );
};

export default Advertisements;