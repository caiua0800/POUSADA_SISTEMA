import { auth } from '../../../database/firebaseConfig'; // Importe o objeto de autenticação do Firebase

export const login = (email, password) => async (dispatch) => {
  try {
    const userCredential = await auth.signInWithEmailAndPassword(email, password);
    dispatch(loginSuccess(userCredential.user)); // Dispara a ação de sucesso do login
    localStorage.setItem('user', JSON.stringify(userCredential.user)); // Salva o usuário no localStorage
  } catch (error) {
    dispatch(loginFailure(error.message)); // Dispara a ação de falha do login
  }
};

const loginSuccess = (user) => ({
  type: 'LOGIN_SUCCESS',
  payload: user,
});

const loginFailure = (error) => ({
  type: 'LOGIN_FAILURE',
  payload: error,
});
