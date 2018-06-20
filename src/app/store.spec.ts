import { Baby } from './entities/baby';
var deepFreeze = require('deep-freeze');
import { rootReducer, INITIAL_STATE } from './store';
import * as types from './actions';
 
describe('rootReducer', () => {
 it('should return the initial state', () => {
   expect(rootReducer(INITIAL_STATE, {})).toEqual({
    babies: [],
    sitters: [],
    users: [],
    loggedInUser: null,
    subject: null
   });
});
 
it('should add a new baby object to array of babies', () => {
    let state = INITIAL_STATE;
    deepFreeze(state);
   
    let newBaby = { id: '501', firstname: 'Roland', postalCode: '2400', picture: 'no picture yet', age: 8, gender: 'MALE' };
 
    let expectedState = {
        babies: [],
        sitters: [],
        users: [],
        loggedInUser: null,
        subject: null
    }
 
    expect(rootReducer(state, {
        type: types.ADD_BABY,
        baby: newBaby
     })).toEqual(expectedState);
  });

  it('should set logged in user & subject', () => {
    let state = INITIAL_STATE;
    deepFreeze(state);

    let mockUser = {
        _id: "TEST_ID",
        email: "TEST_EMAIL",
        password: "TEST_PASSWORD",
        babyorsitterid: "TEST_BSID",
    }

    let mockSubject = {
        test: "TEST_SUBJECT"
    }

    let expectedState = {
        babies: [],
        sitters: [],
        users: [],
        loggedInUser: mockUser,
        subject: mockSubject
    }

    expect(rootReducer(state, {
        type: types.LOGIN,
        payload: {
            user: mockUser,
            subject: mockSubject
        }
    })).toEqual(expectedState);
})
});
