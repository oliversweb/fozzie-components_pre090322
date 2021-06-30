import AnalyticsModule from '../analyticsModule';

const { actions, mutations } = AnalyticsModule;

const {
    updatePlatformData
} = actions;

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

const newState = {
    platformData: {
        environment: 'test-environment',
        name: 'test-name',
        appType: 'test-appType',
        applicationId: 9,
        userAgent: 'test-userAgent',
        branding: 'test-branding',
        country: 'zu',
        language: 'ze',
        jeUserPercentage: 88,
        currency: 'zud',
        version: '9.8.7.6',
        instancePosition: '999'
    }
};

let state = AnalyticsModule.state();

describe('AnalyticsModule', () => {
    it('should create default state when initialised.', () => {
        // Assert
        expect(state).toEqual(defaultState);
    });

    describe('mutations ::', () => {
        beforeEach(() => {
            // Arrange
            state = defaultState;
        });

        describe(`${updatePlatformData} ::`, () => {
            it('should update state with `platformData`', () => {
                // Act
                mutations.updatePlatformData(state, newState);

                // Assert
                expect(state).toMatchSnapshot();
            });
        });
    });

    describe('actions ::', () => {
        describe(`${updatePlatformData} ::`, () => {
            it('should call the `updatePlatformData` mutation', () => {
                // Arrange
                const commit = jest.fn();

                // Act
                updatePlatformData({ commit }, newState);

                // Assert
                expect(commit).toHaveBeenCalledWith('updatePlatformData', newState);
            });
        });
    });
});
