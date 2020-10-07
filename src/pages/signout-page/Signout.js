import firebase from 'firebase/app';
import 'firebase/auth'


export const signout = () => {
    return firebase.auth().signOut()
    .then(() => {
        console.log('Signed Out')
    })
    .catch(e=>{
        console.log('Sign Out Error', e)
    })
} 
