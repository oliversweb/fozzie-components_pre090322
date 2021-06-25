import Vuex from 'vuex';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import Analytics from '../Analytics.vue';

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

const propsData = {
    gtmIdd: 'GTM-123456A',
    name: 'test-harness',
    locale: 'en-GB'
};
let wrapper;

describe('Analytics', () => {
    let preparePageMock;
    let prepareAnalyticsMock;
    let pushAnalyticsMock;

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should be defined', () => {
        // Arrange
        preparePageMock = jest.spyOn(Analytics.methods, 'preparePage').mockImplementation();
        prepareAnalyticsMock = jest.spyOn(Analytics.methods, 'prepareAnalytics').mockImplementation();
        pushAnalyticsMock = jest.spyOn(Analytics.methods, 'pushAnalytics').mockImplementation();

        // Act
        wrapper = shallowMount(
            Analytics,
            {
                propsData,
                store: createStore(),
                localVue
            }
        );

        expect(wrapper.exists()).toBe(true);
    });

    describe('mounted ::', () => {
        beforeEach(() => {
            // Arrange
            preparePageMock = jest.spyOn(Analytics.methods, 'preparePage').mockImplementation();
            prepareAnalyticsMock = jest.spyOn(Analytics.methods, 'prepareAnalytics').mockImplementation();
            pushAnalyticsMock = jest.spyOn(Analytics.methods, 'pushAnalytics').mockImplementation();

            // Act
            wrapper = shallowMount(
                Analytics,
                {
                    propsData,
                    store: createStore(),
                    localVue
                }
            );
        });

        it('should make a call to `preparePage`', () => {
            // Assert
            expect(preparePageMock).toHaveBeenCalled();
        });

        it('should make a call to `prepareAnalytics`', () => {
            // Assert
            expect(prepareAnalyticsMock).toHaveBeenCalled();
        });

        it('should make a call to `pushAnalytics`', () => {
            // Assert
            expect(pushAnalyticsMock).toHaveBeenCalled();
        });
    });

    describe('created ::', () => {
        it('should not set the \'serverside only\' `data.plaformData` properties if clientside', () => {
            // Arrange
            preparePageMock = jest.spyOn(Analytics.methods, 'preparePage').mockImplementation();
            prepareAnalyticsMock = jest.spyOn(Analytics.methods, 'prepareAnalytics').mockImplementation();
            pushAnalyticsMock = jest.spyOn(Analytics.methods, 'pushAnalytics').mockImplementation();
            jest.spyOn(Analytics.methods, 'isServerSide').mockImplementation(() => false);

            // Act
            wrapper = shallowMount(
                Analytics,
                {
                    propsData,
                    store: createStore(),
                    localVue
                }
            );

            // Assert
            expect(wrapper.vm.platformData.environment).toBe('');
            expect(wrapper.vm.platformData.version).toBe('');
            expect(wrapper.vm.platformData.instancePosition).toBe('');
            expect(wrapper.vm.platformData.jeUserPercentage).toBe(0);
        });


        // it('should set the \'serverside only\' `data.plaformData` properties to \'N/A\' if not available', () => {
        //     // Arrange
        //     process.server = true;
        //     // jest.spyOn(wrapper.vm, '$cookies').mockImplementation(() => {

        //     // });

        //     // Assert
        //     expect(wrapper.vm.platformData.environment).toBe('N/A');
        //     expect(wrapper.vm.platformData.version).toBe('N/A');
        //     expect(wrapper.vm.platformData.instancePosition).toBe('N/A');
        //     expect(wrapper.vm.platformData.jeUserPercentage).toBe(0);
        // });
    });
});

describe('Analytics', () => {

});
