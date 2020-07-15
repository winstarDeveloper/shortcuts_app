import React from 'react';
import { Link } from 'react-router-dom';

const AppList = (props) => {
    return (
        <div className="col-3-of-4">
            <h3 className="app-list">Applications List</h3>
            <ol className="app-list__ol">
                { props.appsList.map((i) => (
                    <Link className="link" key={i} to={'/app/' + i}>
                    <li className="row__app-list--content">{i}</li>
                 </Link>
                )) }
            </ol>
        </div>
    );
};

export default AppList;