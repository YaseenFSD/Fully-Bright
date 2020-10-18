import firebase from 'firebase/app';
import {auth} from '../../firebase'


export const signout = () => {
    return auth.signOut()
    .then(() => {
        console.log('Signed Out')
        
    })
    .catch(e=>{
        console.log('Sign Out Error', e)
    })
} 
