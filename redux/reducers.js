import {
  SET_ICON_OBJECT,
  SET_ICONS_TO_SHOW,
  SET_SEARCH_INPUT_VALUE,
  SET_MARKET_PLACE_FILTERS,
  SET_TRADES,
  SET_CURRENCIES_CURRENT_PRICE,
} from "./actions";

const initialState = {
  iconObject: null,
  iconsToShow: null,
  searchInputValue: null,
  trades: {"test": "test"},
  activeSection: null,
  currenciesCurrentPrices: null,
  marketPlaceFilters: null,
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
    case SET_MARKET_PLACE_FILTERS:
      return {
        ...state,
        marketPlaceFilters: action.payload,
      };
    case SET_TRADES:
      return {
        ...state,
        trades: action.payload,
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
