import { fromJS } from 'immutable'

export const START_FETCH_SEQUENCES = 'START_FETCH_SEQUENCES'
export const startFetchSequences = () => ({
  type: START_FETCH_SEQUENCES,
  payload: { },
})

export const SEQUENCES_SUCCESS = 'SEQUENCES_SUCCESS'
export const sequencesSuccess = (response) => ({
  type: SEQUENCES_SUCCESS,
  payload: { response },
})

export const CREATE_SEQUENCE = 'CREATE_SEQUENCE'
export const createSequence = data => ({
  type: CREATE_SEQUENCE,
  payload: { data },
})

export const CREATE_SEQUENCE_SUCCESS = 'CREATE_SEQUENCE_SUCCESS'
export const createSequenceSuccess = data => ({
  type: CREATE_SEQUENCE_SUCCESS,
  payload: { data },
})

export const SEQUENCES_ERROR = 'SEQUENCES_ERROR'
export const sequencesError = (response, id) => ({
  type: SEQUENCES_ERROR,
  payload: { response, id },
})

export const types = {
  START_FETCH_SEQUENCES,
  SEQUENCES_SUCCESS,
  CREATE_SEQUENCE,
  SEQUENCES_ERROR,
  CREATE_SEQUENCE_SUCCESS,
}

export const actions = {
  startFetchSequences,
  sequencesSuccess,
  sequencesError,
  createSequence,
  createSequenceSuccess
}

export const INITIAL_STATE = fromJS({
  sequences: [],
  error: {},
  loaded: false,
})

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.START_FETCH_SEQUENCES:
        return {
          loaded: false,
          state,
        }
    case types.SEQUENCES_SUCCESS:
      return {
        ...state,
        loaded: true,
        sequences: action.payload.response,
      }
    case types.SEQUENCES_ERROR:
      return {
        ...state,
        loaded: false,
        error: action.payload,
      }
    case types.CREATE_SEQUENCE:
      return {
        ...state,
        loaded: false,
      }
   case types.CREATE_SEQUENCE_SUCCESS:
      return {
        ...state,
        loaded: true,
      }
    default:
      return state
  }
}

export const getSequencesLoaded = state => state.sequence.loaded

export const getSequencesError = state => state.sequence.error

export const getSequences = state => state.sequence.sequences

export default reducer