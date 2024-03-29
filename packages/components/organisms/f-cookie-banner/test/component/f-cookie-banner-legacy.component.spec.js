import forEach from 'mocha-each';

const CookieBanner = require('../../test-utils/component-objects/f-cookie-banner-legacy.component');

let cookieBanner;

describe('Legacy - f-cookie-banner component tests', () => {
    beforeEach(() => {
        // Arrange
        cookieBanner = new CookieBanner();
        cookieBanner.withQuery('args', 'locale:en-AU');

        // Act
        cookieBanner.load();
    });

    it('should display the f-cookie-banner component', () => {
        // Assert
        expect(cookieBanner.isCookieBannerComponentDisplayed()).toBe(true);
    });

    it('should set "je-cookie_banner" cookie when dismissed.', () => {
        // Act
        cookieBanner.close();

        // Assert
        const [bannerCookie] = browser.getCookies().filter(cookie => cookie.name === 'je-banner_cookie');
        expect(bannerCookie.value).toBe('130315');
        expect(cookieBanner.isCookieBannerComponentDisplayed()).toBe(false);
    });

    forEach([
        ['en-AU', 'au/info/privacy-policy#cookies_policy'],
        ['en-NZ', 'nz/info/privacy-policy#cookies_policy']
    ])
    .it('should go to the correct cookie policy page for "%s" - "%s"', (tenant, expectedCookiePolicyUrl) => {
        // Arrange
        cookieBanner = new CookieBanner();
        cookieBanner.withQuery('args', `locale:${tenant}`);

        // Act
        cookieBanner.load();
        cookieBanner.clickCookiePolicyLink();

        // Assert
        expect(browser.getUrl()).toContain(expectedCookiePolicyUrl);
    });
});
