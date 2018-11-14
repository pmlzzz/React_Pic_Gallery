import {createStore} from 'redux';

const initialState={
    inputValue:'pig',
    pictures:[]
};

const reducer=(state=initialState,action)=>{
    console.log('reducer',action);

    switch(action.type){
        case 'INPUT_CHANGE':
            return Object.assign({},state,{ inputValue: action.text })
        case 'PIC_CHANGE':
            return Object.assign({},state,{ pictures: action.pic });
        default:
            return state;
    }

    
}

const store=createStore(reducer);

export default store;
