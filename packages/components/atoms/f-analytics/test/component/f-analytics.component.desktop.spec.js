const AnalyticsComponent = require('../../test-utils/component-objects/f-analytics.component');

const analyticsComponent = new AnalyticsComponent();

describe('f-analytics component tests', () => {
    beforeEach(() => {
        analyticsComponent.open();
        analyticsComponent.waitForComponent();
    });

    it('should be present in the markup', () => {
        // Assert
        expect(analyticsComponent.isComponentPresent()).toBe(true);
    });
});
