import {ADD_USER,EDIT_USER} from './types';
export const addUser=(data)=>{
  return(
    {
        type:ADD_USER,
        data:data
    }
  );
}

// export const editUser=(data)=>{
//   return(
//     {
//         type:EDIT_USER,
//         data:data
//     }
//   );
// }