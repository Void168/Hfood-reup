import axios from 'axios';

import{
  VOUCHER_LIST_REQUEST,
  VOUCHER_LIST_SUCCESS,
  VOUCHER_LIST_FAIL,
  VOUCHER_DETAILS_REQUEST,
  VOUCHER_DETAILS_SUCCESS,
  VOUCHER_DETAILS_FAIL,
} from '../constants/voucherConstants'

export const listVouchers = () => async (dispatch) => {
    dispatch({
      type: VOUCHER_LIST_REQUEST,
    });
    try {
      const { data } = await axios.get(`/api/vouchers`);
      dispatch(
          { type: VOUCHER_LIST_SUCCESS, payload: data }
        );
    } catch (error) {
      dispatch(
          { type: VOUCHER_LIST_FAIL, payload: error.message }
        );
    }
  };

  export const detailsVouchers = (voucherId) => async (dispatch) => {
    dispatch({ type: VOUCHER_DETAILS_REQUEST, payload: voucherId });
    try {
      const { data } = await axios.get(`/api/vouchers/${voucherId}`);
      dispatch({ type: VOUCHER_DETAILS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: VOUCHER_DETAILS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };