export const SET_ICON_OBJECT = "SET_ICON_OBJECT";
export const SET_ICONS_TO_SHOW = "SET_ICONS_TO_SHOW";
export const SET_SEARCH_INPUT_VALUE = "SET_SEARCH_INPUT_VALUE";
export const SET_PREVIOUS_HASH = "SET_PREVIOUS_HASH";
export const SET_ACTIVE_SECTION = "SET_ACTIVE_SECTION";
export const SET_DROPDOWN_PROPERTIES = "SET_DROPDOWN_PROPERTIES";

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

export const setPreviousHash = (setPreviousHash) => (dispatch) => {
  try {
    dispatch({
      type: SET_PREVIOUS_HASH,
      payload: setPreviousHash,
    });
  } catch (error) {
    console.log(`error in ${nameOfPage} > ${this.name}: ${error}`);
  }
};

export const setActiveSection = (setActiveSection) => (dispatch) => {
  try {
    dispatch({
      type: SET_ACTIVE_SECTION,
      payload: setActiveSection,
    });
  } catch (error) {
    console.log(`error in ${nameOfPage} > ${this.name}: ${error}`);
  }
};

export const setDropdownProperties = (setDropdownProperties) => (dispatch) => {
  try {
    dispatch({
      type: SET_DROPDOWN_PROPERTIES,
      payload: setDropdownProperties,
    });
  } catch (error) {
    console.log(`error in ${nameOfPage} > ${this.name}: ${error}`);
  }
};
