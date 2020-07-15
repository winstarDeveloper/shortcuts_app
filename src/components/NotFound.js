import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="col-3-of-4 notfound">
      <h1 className="notfound__title"> Error 404 </h1>
      <img src="/404.gif" alt="404" className="notfound_img" />
      <h3 className="notfound__brief">The page does not Exist</h3>
      <Link className="notfound__homebtn" to="/">
        Home
      </Link>
    </div>
  );
};

export default NotFound;
