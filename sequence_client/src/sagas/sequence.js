import { call, put } from 'redux-saga/effects'
import { sequencesSuccess, createSequenceSuccess } from '../reducers/sequence'
import Api from '../Api'

function fetchSequences(payload) {
  return Api.request({
    method: 'get',
    url: '/sequence/',
    headers: {
      'Content-Type': 'application/json'
    },
    data: {}
  })
}

function createSequence(payload) {
  return Api.request({
    method: 'post',
    url: '/sequence/',
    headers: {
      'Content-Type': 'application/json'
    },
    data: payload
  })
}


export function* handleSequencesFetch(action) {
  const response = yield call(fetchSequences, action.payload);
  try {
    yield put(sequencesSuccess(response.data))
  } catch (e) {
    return null;
  }
}

export function* handleSequenceCreate(action) {
  try { 
    yield call(createSequence, action.payload.data);
    yield call(createSequenceSuccess, action.payload.data);
  } catch (error) {
    console.log(action.payload)
    console.log(error.message)
  }
}

export const sagas = {
  handleSequencesFetch,
  handleSequenceCreate,
}