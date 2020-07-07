import React from 'react';

const AppList = (props) => {
    return (
        <div class="col-3-of-4">
            <h3 class="app-list">Applications List</h3>
            <ol class="app-list__ol">
                { props.appsList.map((i) => (
                    <li class="app-list__li">{i}</li>
                )) }
            </ol>
        </div>
    );
};

export default AppList;