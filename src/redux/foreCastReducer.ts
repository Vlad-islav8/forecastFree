import { createSlice, } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit"
import type { AppDispatchType } from "./store";
import { geocodingAPI, getCurrentForecastAPI } from "../api/api";
import errorBg from '../img/errorBg.jpeg'
import type { DateTime } from "../utils/UNIXConverter";
import UNIXConverter from "../utils/UNIXConverter";
import type { PositionType } from "./initilizedReducer";
import currentBg from "../utils/currentBg";


export interface ForecastType {
    currentForecast: number | null,
    description: string | null
    WindSpeed: string | null
    AtmosphericPressure: string | null
    Humidity: string | null
    AverageVisibility: string | null
    CloudCover: string | null

}

interface foreCastReducerState {
    foreCast: ForecastType
    geoCodingErrors: string
    DT: DateTime
    currentCity: string | null,
    foreCastIconUrl: string,
    foreCastIconId: string
    bgUrl: string
}

const initialState: foreCastReducerState = {
    foreCast: {
        currentForecast: null,
        description: null,
        WindSpeed: null,
        AtmosphericPressure: null,
        Humidity: null,
        AverageVisibility: null,
        CloudCover: null,
    },
    DT: {
        time: {
            hour: 0,
            minute: 0,
            seconds: 0
        },
        date: {
            year: 0,
            month: 0,
            day: 0
        }
    },
    geoCodingErrors: '',
    currentCity: null,
    foreCastIconUrl: "https://openweathermap.org/img/wn/",
    foreCastIconId: '',
    bgUrl: errorBg
}

const foreCastReducer = createSlice({
    name: 'foreCastReducer',
    initialState,
    reducers: {
        setCity(state: foreCastReducerState, action: PayloadAction<string>) {
            state.currentCity = action.payload
        },
        setForecast(state: foreCastReducerState, action: PayloadAction<ForecastType>) {
            state.foreCast = action.payload
        },
        setForecastIconId(state: foreCastReducerState, action: PayloadAction<string>) {
            state.foreCastIconId = action.payload
        },
        setDateTime(state:foreCastReducerState, action: PayloadAction<number>) {
            const DT:DateTime = UNIXConverter(action.payload)
            state.DT = DT
        },
        setForecastError(state: foreCastReducerState, action: PayloadAction<string>) {
            state.geoCodingErrors = action.payload
        },
        setBgUrl(state: foreCastReducerState, action:PayloadAction<number>) {
            const date = UNIXConverter(action.payload)
            const bg = currentBg(date.time.hour)
            if(bg === '') {
                state.bgUrl = errorBg
            } else {
                state.bgUrl = bg
            }

        }
    }
})

export const { setCity, setForecast, setForecastIconId, setDateTime, setForecastError, setBgUrl } = foreCastReducer.actions

export default foreCastReducer.reducer

export const setCurrentCityCreator = (currentCity:string) => {
    return async (dispatch: AppDispatchType) => {
        const locationCity: any = await geocodingAPI.getCoordinatesCity(currentCity)
        if (locationCity[0].lat) {
            dispatch(setCity(currentCity))
            const cityPosition: PositionType = { lat: locationCity[0].lat, lan: locationCity[0].lon }
            dispatch(setCurrentForecastCreator(cityPosition))
            dispatch(setForecastError(''))
            dispatch(setDateTime(locationCity.dt))
        } else {
            dispatch(setForecastError('Город не найден, проверьте правильность написания имени города '))
        }
    }
}

export const setCurrentForecastCreator = (position:PositionType) => {
    return async (dispatch: AppDispatchType) => {
        const { lat, lan } = position
        if (lat && lan) {
            const forecast = await getCurrentForecastAPI.getForecast(lat, lan)
            const Setforecast: ForecastType = {
                currentForecast: forecast.main.temp,
                description: forecast.weather[0].description,
                WindSpeed: forecast.wind.speed,
                AtmosphericPressure: forecast.main.pressure,
                Humidity: forecast.main.humidity,
                AverageVisibility: forecast.visibility,
                CloudCover: forecast.clouds.all,
            }
            if (forecast) {
                dispatch(setForecast(Setforecast))
                dispatch(setDateTime(forecast.dt))
                dispatch(setBgUrl(forecast.dt))
                dispatch(setCity(forecast.name))
                dispatch(setForecastIconId(forecast.weather[0].icon))
            }
        }
    }
}