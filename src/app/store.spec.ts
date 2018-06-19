import { Baby } from './entities/baby';
var deepFreeze = require('deep-freeze');
import { rootReducer, INITIAL_STATE } from './store';
import * as types from './actions';
 
describe('users reducer', () => {
 it('should return the initial state', () => {
   expect(rootReducer(INITIAL_STATE, {})).toEqual({
    babies: [],
    sitters: [],
    users: [],
    loggedInUser: null,
    subject: null
   });
});
 
it('Should add a new baby object to array of babies', () => {
    let state = INITIAL_STATE;
    deepFreeze(state);
   
    let newBaby = { id: '501', firstname: 'Roland', postalCode: '2400', picture: 'no picture yet', age: 8, gender: 'MALE' };
 
    let expectedState = {
        babies: [newBaby],
        sitters: [],
        users: [],
        loggedInUser: null,
        subject: null
    }
 
    expect( rootReducer(state, {
      type: types.ADD_BABY,
      baby: newBaby
     })).toEqual(expectedState);
  });
});