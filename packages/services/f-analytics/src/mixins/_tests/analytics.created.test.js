import Vuex from 'vuex';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import VueRouter from 'vue-router';
import {
    defaultState,
    createStore,
    $cookies
} from '@/tests/helpers/setup';
import analyticsMixin from '../analytics.mixin.vue';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueRouter);

const defaultStore = createStore();

describe('Analytics', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('created ::', () => {
        let component;
        let prepareServersideAnalyticsSpy;
        let pushPlatformDataSpy;
        let storeUpdatePageDataSpy;

        beforeEach(() => {
            // Arrange
            component = {
                render () {},
                mixins: [analyticsMixin],
                store: defaultStore
            };
            component.mixins[0].mounted = jest.fn(() => true);
            pushPlatformDataSpy = jest.spyOn(component.mixins[0].methods, 'pushPlatformData').mockImplementationOnce(() => true);
            storeUpdatePageDataSpy = jest.spyOn(component.mixins[0].methods, 'pushPageData').mockImplementationOnce(() => true);
            prepareServersideAnalyticsSpy = jest.spyOn(component.mixins[0].methods, 'prepareServersideAnalytics');
        });

        it('should not attempt set the serverside only platformData properties if clientside', () => {
            // Mocks
            component.mixins[0].computed.isServerSide = jest.fn(() => false);

            // Act
            shallowMount(
                component,
                {
                    localVue,
                    mocks: {
                        $cookies
                    }
                }
            );

            // Assert
            expect(prepareServersideAnalyticsSpy).toHaveBeenCalled();
            expect(pushPlatformDataSpy).not.toHaveBeenCalled();
        });

        it('should set the serverside only platformData properties with appropriate defaults if serverside but values not available', () => {
            // Arrange
            const expected = defaultState;
            expected.platformData.environment = 'localhost';
            expected.platformData.version = '0.0.0.0';
            expected.platformData.instancePosition = 'N/A';
            expected.platformData.jeUserPercentage = null;
            expected.pageData.httpStatusCode = 0;

            // Mocks
            component.mixins[0].computed.isServerSide = jest.fn(() => true);

            // Act
            shallowMount(
                component,
                {
                    localVue,
                    mocks: {
                        $cookies
                    }
                }
            );

            // Assert
            expect(prepareServersideAnalyticsSpy).toHaveBeenCalled();
            expect(pushPlatformDataSpy).lastCalledWith(expected.platformData);
            expect(storeUpdatePageDataSpy).lastCalledWith(expected.pageData);
        });

        it('should set the serverside only platformData properties with appropriate values if serverside and available', () => {
            // Arrange
            process.env.justEatEnvironment = 'testing123';
            process.env.FEATURE_VERSION = '4.3.2.1';
            process.env.INSTANCE_POSITION = '099';
            const expected = defaultState;
            expected.platformData.environment = process.env.justEatEnvironment;
            expected.platformData.version = process.env.FEATURE_VERSION;
            expected.platformData.instancePosition = process.env.INSTANCE_POSITION;
            expected.platformData.jeUserPercentage = 99;

            // Mocks
            $cookies.get = jest.fn(() => 99);
            component.mixins[0].computed.isServerSide = jest.fn(() => true);

            // Act
            shallowMount(
                component,
                {
                    localVue,
                    mocks: {
                        $cookies
                    }
                }
            );

            // Assert
            expect(prepareServersideAnalyticsSpy).toHaveBeenCalled();
            expect(pushPlatformDataSpy).lastCalledWith(expected.platformData);
        });
    });
});
