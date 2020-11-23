import {ADD_USER} from '../actions/types'

const intialState={
  userList:[]
}

const userReducer=(state=intialState,action)=>{
  console.log(action.type)
  console.log(action.data)
  switch(action.type){
    case ADD_USER:
      return{
        ...state,userList:action.data
      }
    default:
      return state;
  }

}
export default userReducer;
