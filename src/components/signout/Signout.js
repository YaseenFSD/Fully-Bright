import 'firebase/auth'
import { auth } from "../../firebase"


export const signout = () => {
    return auth.signOut();
}
