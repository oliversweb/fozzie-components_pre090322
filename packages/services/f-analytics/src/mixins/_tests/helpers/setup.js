import Vuex from 'vuex';

const defaultState = {
    platformData: {
        environment: '',
        name: '',
        appType: '',
        applicationId: 0,
        userAgent: '',
        branding: '',
        country: '',
        language: '',
        jeUserPercentage: 0,
        currency: '',
        version: '',
        instancePosition: ''
    }
};

const defaultActions = {
    updatePlatformData: jest.fn()
};

const createStore = (
    state = defaultState,
    actions = defaultActions
) => new Vuex.Store({
    modules: {
        fAnalyticsModule: {
            namespaced: true,
            state,
            actions
        },
        hasModule: jest.fn(() => true)
    }
});

const $cookies = {
    get: jest.fn()
};

const propsData = {
    gtmSettings: { id: 'GTM-123456A' },
    featureName: 'test-harness',
    locale: 'en-GB'
};

export {
    propsData,
    defaultState,
    defaultActions,
    createStore,
    $cookies
};

