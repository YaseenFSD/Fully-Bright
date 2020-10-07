import React, { useState, Component } from 'react'
import { auth } from "../../firebase"
import { useQueryCache } from "react-query"
import { CreateUserForm } from '../create-user-form/CreateUserForm'
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'


// TODO Create Login form component
export function LoginForm() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")
    
    //TODO Delete this before submission or when nessecary
    const cache = useQueryCache()
    //                  Query key     data
    cache.setQueryData("TestingData", "This is made inside of 'LoginForm.js'")
    //

    const handleSignIn = async (event) => {
        event.preventDefault()
        try {
            const userData = await auth.signInWithEmailAndPassword(email, password)
            setMessage("Signed in successful")
            console.log(userData)

        } catch (error) {
            setMessage(error.message)
            return
        }

    }

    return (
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='teal' textAlign='center'>
                Log-in to your account
            </Header>
            <Form size='large' onSubmit={handleSignIn}>
                <Segment stacked>
                <Form.Input fluid icon='user' iconPosition='left' onChange={(event) => setEmail(event.target.value)} placeholder='E-mail address' />
                <Form.Input
                    fluid
                    icon='lock'
                    iconPosition='left'
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder='Password'
                    type='password'
                />

                <Button color='teal' fluid size='large'>
                    Login
                </Button>
                </Segment>
            </Form>
            <Message>
                New to us? <a href='#'>Sign Up</a>
            </Message>
            </Grid.Column>
        </Grid>
    )
}



    //     <form onSubmit={handleSignIn}>
    //             <h3>Sign In</h3>

    //             <div className="form-group">
    //                 <label>Email address</label>
    //                 <input type="email" onChange={(event) => setEmail(event.target.value)} className="form-control" placeholder="Enter email" />
    //             </div>

    //             <div className="form-group">
    //                 <label>Password</label>
    //                 <input type="password" onChange={(event) => setPassword(event.target.value)} className="form-control" placeholder="Enter password" />
    //             </div>

    //             <div className="form-group">
    //                 <div className="custom-control custom-checkbox">
    //                     <input type="checkbox" className="custom-control-input" id="customCheck1" />
    //                     <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
    //                 </div>
    //             </div>

    //             <button type="submit" className="btn btn-primary btn-block">Submit</button>
    //             {!!LoginForm &&
    //                 <p className="need-account text-right">
    //                 Need <a href="/CreateUserPage">account?</a>
    //             </p>}
    //         </form>
    //     );
    // }





//         <div>
//             Login here
//             <form onSubmit={handleSignIn}>
//                 <input type="text" onChange={(event) => setEmail(event.target.value)} placeholder="Email" />
//                 <input type="password" onChange={(event) => setPassword(event.target.value)} placeholder="Password" />
//                 <button type="submit">Sign In</button>
//             </form>
//             <div>{message}</div>
//         </div>
//     )
// }
