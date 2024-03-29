import asyncUserDetails from '../__mocks__/api.account.details.json';

const desktopWidth = 1200;
const mobileWidth = 375;

const defaultPropsData = {
    copy: {
        accountLogin: {
            text: 'Log in',
            url: '/account/login',
            gtm: 'click_login'
        },
        accountLogout: {
            text: 'Log out',
            url: '/account/logout',
            gtm: 'click_logout'
        },
        navLinks: {
            orderHistory: {
                text: 'Your orders',
                url: '/order-history',
                gtm: 'click_account_your_orders'
            },
            savedCards: {
                text: 'Your saved cards',
                url: '/account/saved-cards',
                gtm: 'click_account_saved_cards'
            }
        },
        userMenu: {
            buttonLabel: () => "James's account"
        },
        openMenuText: 'Open menu',
        deliveryEnquiry: {
            text: 'Deliver with Just Eat',
            url: '/info/delivering-with-just-eat'
        },
        help: {
            text: 'Help',
            url: '/help',
            gtm: 'click_help'
        },
        offers: {
            text: 'For you',
            url: '/offers'
        },
        countrySelector: {
            selectYourCountryText: 'Select your country',
            currentCountryKey: 'gb',
            changeCurrentCountry: 'You are on the UK website, click here to change',
            goBackToMainMenu: 'Go back to main menu'
        }
    },
    showDeliveryEnquiry: false,
    isOrderCountSupported: true,
    showOffersLink: false,
    showHelpLink: false,
    userInfoProp: false,
    headerBackgroundTheme: 'white',
    showCountrySelector: false
};

const defaultData = {
    userInfo: {
        isAuthenticated: false,
        friendlyName: 'James Fisher',
        email: 'j.fisher@fakemail.com'
    },
    navIsOpen: false,
    localOrderCountExpires: false
};

const mockGet = jest.fn(url => {
    if (url === '/api/account/details') {
        return Promise.resolve({ data: asyncUserDetails });
    } else if (url === '/analytics/ordercount') {
        return Promise.resolve({
            Count: 1,
            UserId: '6342d07e'
            // Properties below are overwritten in tests, but for completeness of an example API response…
            // Created: '2020-05-07T15:24:19.7875501Z'
            // Expires: '2020-05-07T17:24:19.7875501Z'
        });
    }
    return false;
});

export {
    defaultData,
    defaultPropsData,
    mockGet,
    mobileWidth,
    desktopWidth
};
