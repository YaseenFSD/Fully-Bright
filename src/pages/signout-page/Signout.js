import firebase from 'firebase/app';
import {auth} from '../../firebase'


export const signout = () => {
    return auth.signOut()
} 
