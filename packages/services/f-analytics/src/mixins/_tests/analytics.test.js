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

describe('Analytics', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('mounted ::', () => {
        let preparePageMock;
        let prepareAnalyticsMock;
        let pushAnalyticsMock;

        beforeEach(() => {
            // Arrange & Act
            const component = {
                render () {},
                mixins: [analyticsMixin]
            };
            preparePageMock = jest.spyOn(component.mixins[0].methods, 'preparePage').mockImplementationOnce(() => true);
            prepareAnalyticsMock = jest.spyOn(component.mixins[0].methods, 'prepareAnalytics').mockImplementationOnce(() => true);
            pushAnalyticsMock = jest.spyOn(component.mixins[0].methods, 'pushAnalytics').mockImplementationOnce(() => true);
            shallowMount(
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
        let component;
        let prepareServersideAnalyticsSpy;
        let registerStoreModuleSpy;
        beforeEach(() => {
            // Arrange
            component = {
                render () {},
                mixins: [analyticsMixin]
            };
            registerStoreModuleSpy = jest.spyOn(component.mixins[0].methods, 'registerStoreModule');
            prepareServersideAnalyticsSpy = jest.spyOn(component.mixins[0].methods, 'prepareServersideAnalytics');
        });

        it('should not set the \'serverside only\' \'plaformData\' properties if clientside', () => {
            // Arrange & Act
            jest.spyOn(component.mixins[0].methods, 'isServerSide').mockReturnValue(false);
            const wrapper = shallowMount(
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
            expect(registerStoreModuleSpy).toHaveBeenCalled();
            expect(prepareServersideAnalyticsSpy).toHaveBeenCalled(); // TODO - Change to lastcalledwith()
            expect(wrapper.vm.platformData.environment).toBe('');
            expect(wrapper.vm.platformData.version).toBe('');
            expect(wrapper.vm.platformData.instancePosition).toBe('');
            expect(wrapper.vm.platformData.jeUserPercentage).toBe(0);
        });

        it('should set the \'serverside only\' \'plaformData\' properties with appropriate defaults if serverside but values not available', () => {
            // Arrange & Act
            jest.spyOn(component.mixins[0].methods, 'isServerSide').mockReturnValue(true);
            const wrapper = shallowMount(
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
            expect(registerStoreModuleSpy).toHaveBeenCalled();
            expect(prepareServersideAnalyticsSpy).toHaveBeenCalled(); // TODO - Change to lastcalledwith()
            expect(wrapper.vm.platformData.environment).toBe('localhost');
            expect(wrapper.vm.platformData.version).toBe('0.0.0.0');
            expect(wrapper.vm.platformData.instancePosition).toBe('N/A');
            expect(wrapper.vm.platformData.jeUserPercentage).toBe(0);
        });

        it('should set the \'serverside only\' \'plaformData\' properties with appropriate values if serverside and available', () => {
            // Arrange & Act
            process.env.justEatEnvironment = 'testing123';
            process.env.FEATURE_VERSION = '4.3.2.1';
            process.env.INSTANCE_POSITION = '099';
            $cookies.get = jest.fn(() => 99);
            jest.spyOn(component.mixins[0].methods, 'isServerSide').mockReturnValue(true);
            const wrapper = shallowMount(
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
            expect(registerStoreModuleSpy).toHaveBeenCalled();
            expect(prepareServersideAnalyticsSpy).toHaveBeenCalled(); // TODO - Change to lastcalledwith()
            expect(wrapper.vm.platformData.environment).toBe('testing123');
            expect(wrapper.vm.platformData.version).toBe('4.3.2.1');
            expect(wrapper.vm.platformData.instancePosition).toBe('099');
            expect(wrapper.vm.platformData.jeUserPercentage).toBe(99);
        });
    });

    describe('methods ::', () => {
        describe('preparePage ::', () => {
            let component;
            let preparePageSpy;

            beforeEach(() => {
                // Arrange
                component = {
                    render () {},
                    mixins: [analyticsMixin]
                };
                preparePageSpy = jest.spyOn(component.mixins[0].methods, 'preparePage');
                jest.spyOn(component.mixins[0].methods, 'prepareAnalytics').mockImplementationOnce(() => true);
                jest.spyOn(component.mixins[0].methods, 'pushAnalytics').mockImplementationOnce(() => true);
                jest.spyOn(component.mixins[0].methods, 'isServerSide').mockReturnValue(false);
                document.head.innerHTML = '';
            });

            it('should append the GTM tag if the dataLayer is not already present', () => {
                // Arrange
                window.dataLayer = undefined;

                // Act
                shallowMount(
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
                expect(preparePageSpy).toHaveBeenCalled();
                expect(document.head.innerHTML).toContain('src="https://www.googletagmanager.com/gtm.js?id=GTM-123456A"');
                expect(document.head.innerHTML).toContain(`function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);`);
                expect(document.head.innerHTML).toContain('(window,document,\'script\',\'dataLayer\',\'GTM-123456A\');');
            });

            it('should not attempt to re-append the GTM tag if the dataLayer is already present', () => {
                // Arrange
                window.dataLayer = 'all ready done the deed';

                // Act
                shallowMount(
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
                expect(preparePageSpy).toHaveBeenCalled();
                expect(document.head.innerHTML).toBe('');
            });
        });

        describe('prepareAnalytics ::', () => {
            let component;
            let prepareAnalyticsSpy;
            let storeUpdatePlatformDataSpy;

            beforeEach(() => {
                component = {
                    render () {},
                    mixins: [analyticsMixin]
                };
                jest.spyOn(component.mixins[0].methods, 'preparePage').mockImplementationOnce(() => true);
                prepareAnalyticsSpy = jest.spyOn(component.mixins[0].methods, 'prepareAnalytics');
                jest.spyOn(component.mixins[0].methods, 'pushAnalytics').mockImplementationOnce(() => true);
                jest.spyOn(component.mixins[0].methods, 'isServerSide').mockReturnValue(false);
                storeUpdatePlatformDataSpy = jest.spyOn(component.mixins[0].methods, 'updatePlatformData');
            });

            // 1 == locale, 2 == branding, 3 == country, 4 == currency, 5 == language
            const cases = [
                ['en-GB', 'justeat', 'uk', 'gbp', 'en'],
                ['en-IE', 'justeat', 'ie', 'eur', 'en'],
                ['it-IT', 'justeat', 'it', 'eur', 'it'],
                ['es-ES', 'justeat', 'es', 'eur', 'es'],
                ['en-AU', 'menulog', 'au', 'aud', 'en'],
                ['en-NZ', 'menulog', 'nz', 'nzd', 'en']
            ];
            describe('should set the \'plaformData\' properties with appropriate values depending on the \'locale\'', () => {
                test.each(cases)(
                    'given %p as the \'locale\' the correct \'plaformData\' is created',
                    (localeArg, brandingExpected, countryExpected, currencyExpected, languageExpected) => {
                        // Expected
                        const expected = {
                            appType: 'web',
                            applicationId: 7,
                            branding: brandingExpected,
                            country: countryExpected,
                            currency: currencyExpected,
                            environment: '',
                            instancePosition: '',
                            jeUserPercentage: 0,
                            language: languageExpected,
                            name: 'test-harness',
                            userAgent: navigator.userAgent,
                            version: ''
                        };

                        // Act
                        shallowMount(
                            component,
                            {
                                propsData: {
                                    ...propsData,
                                    locale: localeArg
                                },
                                store: createStore(),
                                localVue,
                                mocks: {
                                    $cookies
                                }
                            }
                        );

                        // Assert
                        expect(prepareAnalyticsSpy).toHaveBeenCalled();
                        expect(storeUpdatePlatformDataSpy).lastCalledWith(expected);
                    }
                );
            });
        });

        describe('pushAnalytics ::', () => {
            let component;
            let pushAnalyticsSpy;
            let windowsPushSpy;

            beforeEach(() => {
                // Arrange
                component = {
                    render () {},
                    mixins: [analyticsMixin]
                };
                jest.spyOn(component.mixins[0].methods, 'preparePage').mockImplementationOnce(() => true);
                jest.spyOn(component.mixins[0].methods, 'prepareAnalytics').mockImplementationOnce(() => true);
                pushAnalyticsSpy = jest.spyOn(component.mixins[0].methods, 'pushAnalytics');
                jest.spyOn(component.mixins[0].methods, 'isServerSide').mockReturnValue(false);
                windowsPushSpy = jest.fn().mockImplementation(() => true);
                window.dataLayer = {
                    push: windowsPushSpy
                };

                // Act
                shallowMount(
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

            it('should \'push\' the current \'$store.platformData\' data to the dataLayer', () => {
                // Assert
                expect(pushAnalyticsSpy).toHaveBeenCalled();
                expect(windowsPushSpy).toHaveBeenCalled(); // TODO - change to lastcalledwith()
            });
        });
    });
});
