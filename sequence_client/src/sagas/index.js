import { takeLatest } from 'redux-saga/effects';

import { types as sequenceTypes } from '../reducers/sequence';

import {
 handleSequencesFetch,
 handleSequenceCreate,
} from './sequence';

const {
  START_FETCH_SEQUENCES,
  CREATE_SEQUENCE,
} = sequenceTypes;


export function* watcherSaga() {
  try {
  yield takeLatest(START_FETCH_SEQUENCES, handleSequencesFetch);
  yield takeLatest(CREATE_SEQUENCE, handleSequenceCreate);
  } catch (error) {
    console.log(error)
  }
}