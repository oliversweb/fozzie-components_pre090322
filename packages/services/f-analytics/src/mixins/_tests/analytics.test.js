import Vuex from 'vuex';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import analyticsMixin from '../analytics.mixin.vue';

const localVue = createLocalVue();

localVue.use(Vuex);

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
        updatePlatformData: {
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
let wrapper;
let component;

describe('Analytics', () => {
    let preparePageMock;
    let prepareAnalyticsMock;
    let pushAnalyticsMock;

    beforeEach(() => {
        // Arrange
        component = {
            render () {},
            mixins: [analyticsMixin]
        };

        preparePageMock = jest.spyOn(component.mixins[0].methods, 'preparePage').mockImplementation();
        prepareAnalyticsMock = jest.spyOn(component.mixins[0].methods, 'prepareAnalytics').mockImplementation();
        pushAnalyticsMock = jest.spyOn(component.mixins[0].methods, 'pushAnalytics').mockImplementation();

        wrapper = shallowMount(
            component,
            {
                propsData,
                store: createStore(),
                localVue,
                mocks: {
                    $cookies
                }
            }
        );
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    xit('should be defined', () => {
        expect(wrapper.exists()).toBe(true);
    });

    describe('mounted ::', () => {
        xit('should make a call to `preparePage`', () => {
            // Assert
            expect(preparePageMock).toHaveBeenCalled();
        });

        xit('should make a call to `prepareAnalytics`', () => {
            // Assert
            expect(prepareAnalyticsMock).toHaveBeenCalled();
        });

        xit('should make a call to `pushAnalytics`', () => {
            // Assert
            expect(pushAnalyticsMock).toHaveBeenCalled();
        });
    });
});

describe('created ::', () => {
    beforeEach(() => {
        // Arrange
        component = {
            render () {},
            mixins: [analyticsMixin]
        };

        jest.spyOn(component.mixins[0].methods, 'preparePage').mockImplementation();
        jest.spyOn(component.mixins[0].methods, 'prepareAnalytics').mockImplementation();
        jest.spyOn(component.mixins[0].methods, 'pushAnalytics').mockImplementation();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should not set the \'serverside only\' plaformData properties if clientside', () => {
        // Arrange & Act
        jest.spyOn(component.mixins[0].methods, 'isServerSide').mockReturnValue(false);
        wrapper = shallowMount(
            component,
            {
                propsData,
                store: createStore(),
                localVue,
                mocks: {
                    $cookies
                }
            }
        );

        // Assert
        expect(wrapper.vm.platformData.environment).toBe('');
        expect(wrapper.vm.platformData.version).toBe('');
        expect(wrapper.vm.platformData.instancePosition).toBe('');
        expect(wrapper.vm.platformData.jeUserPercentage).toBe(0);
    });

    it('should set the \'serverside only\' plaformData properties with appropriate defaults if serverside but values not available', () => {
        // Arrange & Act
        jest.spyOn(component.mixins[0].methods, 'isServerSide').mockReturnValue(true);
        wrapper = shallowMount(
            component,
            {
                propsData,
                store: createStore(),
                localVue,
                mocks: {
                    $cookies
                }
            }
        );

        // Assert
        expect(wrapper.vm.platformData.environment).toBe('localhost');
        expect(wrapper.vm.platformData.version).toBe('0.0.0.0');
        expect(wrapper.vm.platformData.instancePosition).toBe('N/A');
        expect(wrapper.vm.platformData.jeUserPercentage).toBe(0);
    });

    it('should set the \'serverside only\' plaformData properties with appropriate values if serverside and available', () => {
        // Arrange & Act
        process.env.justEatEnvironment = 'testing123';
        process.env.FEATURE_VERSION = '4.3.2.1';
        process.env.INSTANCE_POSITION = '099';
        $cookies.get = jest.fn(() => 99);
        jest.spyOn(component.mixins[0].methods, 'isServerSide').mockReturnValue(true);
        wrapper = shallowMount(
            component,
            {
                propsData,
                store: createStore(),
                localVue,
                mocks: {
                    $cookies
                }
            }
        );

        // Assert
        expect(wrapper.vm.platformData.environment).toBe('testing123');
        expect(wrapper.vm.platformData.version).toBe('4.3.2.1');
        expect(wrapper.vm.platformData.instancePosition).toBe('099');
        expect(wrapper.vm.platformData.jeUserPercentage).toBe(99);
    });
});
