import {ADD_CAR, EDIT_CAR, DELETE_CAR} from './types'

export const addCar=(car)=>(
  {
    type:ADD_CAR,
    car:car
  }
);

export const editCar=(car)=>(
  {
    type:EDIT_CAR,
    car:car
  }
);

export const deleteCar=(car)=>(
  {
    type:DELETE_CAR,
    car:car
  }
);
