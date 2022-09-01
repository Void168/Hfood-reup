const{
    VOUCHER_LIST_REQUEST,
    VOUCHER_LIST_SUCCESS,
    VOUCHER_LIST_FAIL,
    VOUCHER_DETAILS_REQUEST,
    VOUCHER_DETAILS_SUCCESS,
    VOUCHER_DETAILS_FAIL,
} = require('../constants/voucherConstants');

export const voucherListReducer = (
    state = { loading: true, vouchers: [] },
    action
  ) => {
    switch (action.type) {
      case VOUCHER_LIST_REQUEST:
        return { loading: true };
      case VOUCHER_LIST_SUCCESS:
        return {
          loading: false,
          vouchers: action.payload
        };
      case VOUCHER_LIST_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };

  export const voucherDetailsReducer = (
    state = { voucher:{}, loading: true }, 
    action) => {
    switch (action.type) {
      case VOUCHER_DETAILS_REQUEST:
        return { loading: true };
      case VOUCHER_DETAILS_SUCCESS:
        return { loading: false, voucher: action.payload };
      case VOUCHER_DETAILS_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };