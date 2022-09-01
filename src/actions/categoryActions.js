import axios from 'axios';

import{
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
  CATEGORY_LIST_FAIL,
  CATEGORY_DETAILS_REQUEST,
  CATEGORY_DETAILS_SUCCESS,
  CATEGORY_DETAILS_FAIL,
} from '../constants/categoryConstants'

export const listCategories = () => async (dispatch) => {
    dispatch({
      type: CATEGORY_LIST_REQUEST,
    });
    try {
      const { data } = await axios.get(`/api/categories`);
      dispatch(
          { type: CATEGORY_LIST_SUCCESS, payload: data }
        );
    } catch (error) {
      dispatch(
          { type: CATEGORY_LIST_FAIL, payload: error.message }
        );
    }
  };

  export const detailsCategory = (categoryId) => async (dispatch) => {
    dispatch({ type: CATEGORY_DETAILS_REQUEST, payload: categoryId });
    try {
      const { data } = await axios.get(`/api/categories/${categoryId}`);
      dispatch({ type: CATEGORY_DETAILS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: CATEGORY_DETAILS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };