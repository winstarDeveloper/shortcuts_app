import React from 'react';
import ad from './../ads/youtube-thumbnail-FB.jpg';

const Advertisements = () => {
    return (
        <div class="col-1-of-4 colad">
            <p class="row__ads">Advertisements</p>
            <div class="ads__box--1">
                <img src={ad} alt="ad" />
            </div>
            <div class="ads__box--2">
                <img src={ad} alt="ad" />
            </div>
            <div class="ads__box--3">
                <img src={ad} alt="ad" />
            </div>
        </div>
    );
};

export default Advertisements;