import {
  SET_ICON_OBJECT,
  SET_ICONS_TO_SHOW,
  SET_SEARCH_INPUT_VALUE,
  SET_PREVIOUS_HASH,
  SET_ACTIVE_SECTION,
  SET_CURRENCIES_CURRENT_PRICE,
} from "./actions";

const initialState = {
  iconObject: null,
  iconsToShow: null,
  searchInputValue: null,
  previousHash: null,
  activeSection: null,
  currenciesCurrentPrices: null,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_ICON_OBJECT:
      return {
        ...state,
        iconObject: action.payload,
      };
    case SET_ICONS_TO_SHOW:
      return {
        ...state,
        iconsToShow: action.payload,
      };
    case SET_SEARCH_INPUT_VALUE:
      return {
        ...state,
        searchInputValue: action.payload,
      };
    case SET_PREVIOUS_HASH:
      return {
        ...state,
        previousHash: action.payload,
      };
    case SET_ACTIVE_SECTION:
      return {
        ...state,
        activeSection: action.payload,
      };
    case SET_CURRENCIES_CURRENT_PRICE:
      return {
        ...state,
        currenciesCurrentPrices: action.payload,
      };
  }

  return state;
}

export default reducer;
