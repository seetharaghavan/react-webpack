import { SIDEBAR_TOGGLE } from "../types";

const sidebarState = {
    sidebarOpen: true
}

const sideBarReducer = (state=sidebarState, action) => {
    switch (action.type) {
        case SIDEBAR_TOGGLE: return { ...state, sidebarOpen: action.payload }
        default: return state
    }
}

export default sideBarReducer; 