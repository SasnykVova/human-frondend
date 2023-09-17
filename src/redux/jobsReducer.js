const NEW_POST = 'NEW-POST';

const initialState = {
    userData: [],
    newPostText: '',
}

export default function jobsReducer(state = initialState, action) {
    switch(action.type) {
        case NEW_POST:{
            return {...state, newPostText: action.text}
        }
        default: {
            return state
        }     
    }
}

export const newPostTextAC = (text) => ({type: NEW_POST ,text});