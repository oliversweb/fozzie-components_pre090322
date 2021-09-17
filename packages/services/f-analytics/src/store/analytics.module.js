import {
    UPDATE_PLATFORM_DATA,
    UPDATE_EVENTS,
    CLEAR_EVENTS
} from './mutation-types';
import {
    platformDataDefault,
    userDataDefault,
    pageDataDefault
} from './default-state';

export default {
    namespaced: true,

    state: () => ({
        platformData: { ...platformDataDefault },
        userData: { ...userDataDefault },
        pageData: { ...pageDataDefault },
        events: []
    }),

    actions: {
        updatePlatformData: ({ commit }, platformData) => {
            commit(UPDATE_PLATFORM_DATA, platformData);
        },

        updateEvents: ({ commit }, event) => {
            commit(UPDATE_EVENTS, event);
        },

        clearEvents: ({ commit }) => {
            commit(CLEAR_EVENTS);
        }
    },

    mutations: {
        [UPDATE_PLATFORM_DATA]: (state, platformData) => {
            state.platformData = { ...state.platformData, ...platformData };
        },

        [UPDATE_EVENTS]: (state, event) => {
            state.events = [...state.events, event];
        },

        [CLEAR_EVENTS]: state => {
            state.events = [];
        }
    }
};
