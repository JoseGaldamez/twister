import { useContext } from 'react';
import { AuthContext } from '../utils/context';

const useAuth = () => useContext(AuthContext);

export default useAuth;
