import firebase from 'firebase/app';
import 'firebase/auth'


export const signout = () => {
    return firebase.auth().signOut();
}
