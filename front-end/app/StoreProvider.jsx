'use client'
import { useRef } from 'react'
import { Provider } from 'react-redux'

import { makeStore } from '../service/store'


export default function StoreProvider({ children }) {
    return <Provider store={makeStore}>{children}</Provider>
}