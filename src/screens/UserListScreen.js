import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, listUsers } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { USER_DETAILS_RESET } from '../constants/userConstants';
import {Row, Container} from 'react-bootstrap'

export default function UserListScreen(props) {
  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userDelete = useSelector((state) => state.userDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = userDelete;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listUsers());
    dispatch({
      type: USER_DETAILS_RESET,
    });
  }, [dispatch, successDelete]);
  const deleteHandler = (user) => {
    if (window.confirm('Bạn có chắc xóa người dùng này?')) {
      dispatch(deleteUser(user._id));
    }
  };
  return (
    <Container className="section">
        <Row>
            <h1>Danh sách người dùng</h1>
        </Row>
      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
      {successDelete && (
        <MessageBox variant="success">Xóa người dùng thành công</MessageBox>
      )}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table">
            <tr className="center">
              <th>Mã người dùng</th>
              <th>Tên</th>
              <th>Email</th>
              <th>Admin</th>
              <th>Ghi chú</th>
            </tr>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="center">
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.isAdmin ? 
                <i class="fas fa-check" style={{color:'#20a020'}}></i> : 
                <i class="fas fa-times" style={{color:'#a02020'}}></i>}
                </td>
                <td style={{paddingBottom:'2rem'}}>
                  <button
                    type="button"
                    className="update btn-actions"
                    onClick={() => 
                        props.history.push(`/user/${user._id}/edit`)}
                  >
                    Sửa
                  </button>
                  <button
                    type="button"
                    className="delete btn-actions"
                    onClick={() => deleteHandler(user)}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Container>
  );
}