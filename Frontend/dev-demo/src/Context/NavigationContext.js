import { createContext } from 'react';

export const PAGES = {
    HOME_PAGE: 1,
    SHOP_ALL_PAGE: 2,
    ADD_NEW_PAGE: 3
}

export const NavigationContext = createContext();

export const NAVIGATION_CONTEXT_DEFAULT_STATE = {
    currentPage: PAGES.HOME_PAGE,
    openModal: function() {}
}