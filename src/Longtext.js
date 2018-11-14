import React from 'react';
import {connect} from 'react-redux';


function Longtext(props){
    return(
        <div>
            <p>{props.inputValue}</p>
        </div>
    );
}

export default connect(mapStateToProps,mapDispatchToProps)(Longtext);