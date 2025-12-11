import type { PositionType } from "../initilizedReducer"
import type { RootState } from "../store"

type getinitialazedAppType = (state:RootState) => boolean
type getCurrentPositionType = (state:RootState) => PositionType 

export const getinitialazedApp:getinitialazedAppType = (state:RootState) => {
    return state.initilized.initialazed 
}

export const getCurrentPosition:getCurrentPositionType = (state:RootState) => {
    return state.initilized.currentLocation
}

export const getCurrentHour = (state:RootState) => {
    return state.initilized.currentHour
}

export const getPossitionError = (state:RootState) => {
    return state.initilized.positionErrors
}
