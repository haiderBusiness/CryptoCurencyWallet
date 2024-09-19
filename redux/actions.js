export const SET_ICON_OBJECT = "SET_ICON_OBJECT";
export const SET_ICONS_TO_SHOW = "SET_ICONS_TO_SHOW";
export const SET_SEARCH_INPUT_VALUE = "SET_SEARCH_INPUT_VALUE";
export const SET_MARKET_PLACE_FILTERS = "SET_MARKET_PLACE_FILTERS";
export const SET_TRADES = "SET_TRADES";
export const SET_CURRENCIES_CURRENT_PRICE = "SET_CURRENCIES_CURRENT_PRICE";


const nameOfPage = "actions.js";

export const setIconObject = (setIconObject) => (dispatch) => {
  try {
    dispatch({
      type: SET_ICON_OBJECT,
      payload: setIconObject,
    });
  } catch (error) {
    console.log(`error in ${nameOfPage} > ${this.name}: ${error}`);
  }
};

export const setIconsToShow = (setIconsToShow) => (dispatch) => {
  try {
    dispatch({
      type: SET_ICONS_TO_SHOW,
      payload: setIconsToShow,
    });
  } catch (error) {
    console.log(`error in ${nameOfPage} > ${this.name}: ${error}`);
  }
};

export const setSearchedInputValue = (setSearchedInputValue) => (dispatch) => {
  try {
    dispatch({
      type: SET_SEARCH_INPUT_VALUE,
      payload: setSearchedInputValue,
    });
  } catch (error) {
    console.log(`error in ${nameOfPage} > ${this.name}: ${error}`);
  }
};

export const setMarketPlaceFilters = (setMarketPlaceFilters) => (dispatch) => {
  try {
    dispatch({
      type: SET_MARKET_PLACE_FILTERS,
      payload: setMarketPlaceFilters,
    });
  } catch (error) {
    console.log(`error in ${nameOfPage} > ${this.name}: ${error}`);
  }
};

export const setTrades = (setTrades) => (dispatch) => {
  try {
    dispatch({
      type: SET_TRADES,
      payload: setTrades,
    });
  } catch (error) {
    console.log(`error in ${nameOfPage} > ${this.name}: ${error}`);
  }
};

export const setCurrenciesCurrentPrices = (setCurrenciesCurrentPrices) => (dispatch) => {
  try {
    dispatch({
      type: SET_CURRENCIES_CURRENT_PRICE,
      payload: setCurrenciesCurrentPrices,
    });
  } catch (error) {
    console.log(`error in ${nameOfPage} > ${this.name}: ${error}`);
  }
};
