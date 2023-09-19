import { INITIAL_TARIF_STATE_TYPE } from '../../utils/types'
import { ADD_TARIF, DELETE_TARIF, EDIT_TARIF, ERROR_TARIF, GET_ALL_TARIFS, LOADING_TARIF } from '../constants'

const initialState: INITIAL_TARIF_STATE_TYPE = {
    tarif: null,
    allTarifs: [],
    loadingTarif: false,
    error: null
}

const tarifReducer = (state = initialState, action: { type: string, payload: any }) => {
    const { type, payload } = action

    switch (type) {
        case LOADING_TARIF:
            return { ...state, loadingTarif: true }

        case ERROR_TARIF:
            return { ...state, error: payload, loadingTarif: false }

        case GET_ALL_TARIFS:
            return { ...state, allTarifs: payload, loadingTarif: false, error: null }

        case ADD_TARIF:
            return { ...state, allTarifs: [payload, ...state.allTarifs], loadingTarif: false, error: null }

        case EDIT_TARIF:
            return {
                ...state,
                allTarifs: state.allTarifs.map(tarif => {
                    if (tarif.id === payload.id) {
                        return payload
                    } else return tarif
                }),
                loadingTarif: false, error: null
            }

        case DELETE_TARIF:
            return {
                ...state,
                allTarifs: state.allTarifs.filter(tarif => tarif.id !== payload.id),
                loadingTarif: false, error: null
            }

        default:
            return state
    }
}

export default tarifReducer