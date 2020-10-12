// import React from 'react'
// import PropTypes from 'prop-types'
// import { compose } from 'redux'
// import { useSelector } from 'react-redux'
// import { useFirebase, isLoaded } from 'react-redux-firebase'

// export default function UpdateProfilePage() {
//   const firebase = useFirebase()
//   const profile = useSelector(state => state.firebase.profile)

//   function updateUserProfile() {
//     return firebase.updateProfile({ role: 'admin' })
//   }

//   return (
//     <div>
//       <h2>Update User Profile</h2>
//       <span>
//         Click the button to update profile to include role parameter
//       </span>
//       <button onClick={updateUserProfile}>
//         Add Role To User
//       </button>
//       <div>
//         {
//           isLoaded(profile)
//             ? JSON.stringify(profile, null, 2)
//             : 'Loading...'
//         }
//       </div>
//     </div>
//   )
// }