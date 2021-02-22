import Trak from '@justeat/f-trak';
import checkoutAnalytics from '../analytics.mixin';

import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import { VueI18n } from '@justeat/f-globalisation';

import {
    defaultState, defaultActions, i18n, createStore, $logger
} from '../../components/_tests/helpers/setup';

const localVue = createLocalVue();

localVue.use(VueI18n);
localVue.use(Vuex);

const eventData = {
    action: 'start',
    isLoggedIn: true,
    error: ['postcodeNotCovered'],
    autofill: ['address.line1'],
    changes: ['address.line1']
};

describe('checkout analytics', () => {
    let wrapper;
    let trackEventSpy;

    beforeEach(() => {
        trackEventSpy = jest.spyOn(Trak, 'event').mockImplementation();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('trackFormAction :: ', () => {
        beforeEach(() => {
            wrapper = shallowMount(checkoutAnalytics, {
                render () {},
                i18n,
                store: createStore({
                    ...defaultState,
                    isLoggedIn: true,
                    error: ['postcodeNotCovered'],
                    autofill: ['address.line1'],
                    changes: ['address.line1']
                }),
                localVue
            });
        })

        it('should call `event` method of `f-trak`', () => {
            // Arrange
            const expectedEvent = {
                event: 'Form',
                custom: {
                    form: {
                        name: 'checkout',
                        action: eventData.action,
                        error: eventData.error,
                        autofill: [eventData.autofill],
                        changes: [eventData.changes]
                    }
                }
            };

            // Act
            wrapper.vm.trackFormAction('start', 'postcodeNotCovered');

            // Assert
            expect(trackEventSpy).toHaveBeenCalledWith(expectedEvent);
        });

        it.each([
            ['checkout', true],
            ['checkout_guest', false]
        ])('should set `name` to %s if isLoggedIn is %s', (expectedName, isLoggedInState) => {
            // Arrange
            wrapper = shallowMount(checkoutAnalytics, {
                render () {},
                i18n,
                store: createStore({
                    ...defaultState,
                    isLoggedIn: isLoggedInState,
                }),
                localVue
            });

            const expectedEvent = {
                event: 'Form',
                custom: {
                    form: {
                        name: expectedName,
                        action: eventData.action,
                        error: undefined,
                        autofill: [],
                        changes: []
                    }
                }
            };

            // Act
            wrapper.vm.trackFormAction('start');

            // Assert
            expect(trackEventSpy).toHaveBeenCalledWith(expectedEvent);
        });
    });

    describe('trackFormLoad :: ', () => {
        let trackFormActionSpy;

        beforeEach(() => {
            trackFormActionSpy = jest.spyOn(checkoutAnalytics.methods, 'trackFormAction').mockImplementation();

            wrapper = shallowMount(checkoutAnalytics, {
                render () {},
                i18n,
                store: createStore(),
                localVue
            });
        });

        afterEach(() => {
            jest.clearAllMocks();
        });

        it('should call `event` method of `f-trak`', () => {
            // Arrange
            const expectedEvent = {
                custom: {
                    checkout: {
                        step: 1
                    },
                    basket: {
                        id: defaultState.basket.id,
                        total: defaultState.basket.total
                    },
                    restaurant: {
                        id: defaultState.restaurantId
                    },
                    pageData: {
                        name: 'Checkout 1 Guest',
                        group: 'Checkout'
                    }
                }
            };

            // Act
            wrapper.vm.trackFormLoad();

            // Assert
            expect(trackEventSpy).toHaveBeenCalledWith(expectedEvent);
        });

        it.each([
            ['Checkout 1 Overview', true],
            ['Checkout 1 Guest', false]
        ])('should set `pageData.name` to %s if isLoggedIn is %s', (expectedName, isLoggedInState) => {
            // Arrange
            const expectedEvent = {
                custom: {
                    checkout: {
                        step: 1
                    },
                    basket: {
                        id: defaultState.basket.id,
                        total: defaultState.basket.total
                    },
                    restaurant: {
                        id: defaultState.restaurantId
                    },
                    pageData: {
                        name: expectedName,
                        group: 'Checkout'
                    }
                }
            };

            // Act
            wrapper = shallowMount(checkoutAnalytics, {
                render () {},
                i18n,
                store: createStore({
                    ...defaultState,
                    isLoggedIn: isLoggedInState
                }),
                localVue
            });

            wrapper.vm.trackFormLoad();

            // Assert
            expect(trackEventSpy).toHaveBeenCalledWith(expectedEvent);
        });

        it('should call `trackFormAction` with `start` action', () => {
            // Act
            wrapper.vm.trackFormLoad();

            // Assert
            expect(trackFormActionSpy).toHaveBeenCalledWith('start');
        });
    });
});
