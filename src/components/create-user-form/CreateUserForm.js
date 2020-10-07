import React, { useState, Component } from 'react'
import { useForm } from 'react-hook-form'
import { auth, db } from "../../firebase"
import { useQueryCache } from "react-query"
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom'


// THIS IS HOW IT IS WRITTEN INSIDE OF ../../firebase
// const auth = firebase.auth()
// const db = firebase.firestore()


//TODO make a user form compononent
export function CreateUserForm(props) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirm] = useState("")
    const [message, setMessage] = useState("")
    const { reset } = useForm()
    const [isLoading, setLoading] = useState(false)

    //TODO: delete this before submission or when necessary 
    // React Query Sync Data Example 
    const cache = useQueryCache()
    //                                   This is the key of the Query (made inside of LoginForm.js)
    let testingData = cache.getQueryData("TestingData")
    console.log("Console.log from 'CreateUserForm.js:", testingData)
    //
    const handleCreateUser = async (event) => {
        let newUser
        setLoading(true)
        event.preventDefault()
        if (password !== confirmPassword) {
            setMessage("Passwords do not match")
            return
        }
        setMessage("")
        try {
            newUser = await auth.createUserWithEmailAndPassword(email, password)
            setMessage("User has been created")
            reset()

        } catch (error) {
            setMessage(error.message)

        }

        if (newUser) {
            props.history.push(`/profile/${newUser.uid}`)
        } else {
            setLoading(false)
        }
        // console.log(data)

    }

    const formClassName = `ui form ${isLoading ? 'loading' : ''}`
    

    return (
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2' color='teal' textAlign='center'>
            Sign Up
        </Header>
        <Form size='large' className={formClassName} onSubmit={handleCreateUser}>
            <Segment stacked>
            <Form.Input fluid 
                icon='email' 
                iconPosition='left' 
                onChange={(event) => setEmail(event.target.value)} 
                placeholder='E-mail address' 
            />
            <Form.Input
                fluid
                icon='lock'
                iconPosition='left'
                onChange={(event) => setPassword(event.target.value)}
                placeholder='Password'
                type='password'
            />
            <Form.Input
                fluid
                icon='lock'
                iconPosition='left'
                onChange={(event) => setConfirm(event.target.value)}
                placeholder='Password'
                type='password'
            />
            <div className="field actions">
            <Button color='teal' fluid size='large' type='submit'>
                Signup
            </Button>
            Already registered?
            <Link to="/login"> Login</Link>
            </div>
            </Segment>
        </Form>
        </Grid.Column>
    </Grid>
    )
}     
       
       
    //    <form onSubmit={handleCreateUser}>
    //         <h3>Sign Up</h3>

    //         <div className="form-group">
    //             <label>Email address</label>
    //             <input type="email" onChange={(event) => setEmail(event.target.value)} className="form-control" placeholder="Enter email" />
    //         </div>

    //         <div className="form-group">
    //             <label>Password</label>
    //             <input type="password" onChange={(event) => setPassword(event.target.value)} className="form-control" placeholder="Enter password" />
    //         </div>

    //         <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
    //         <p className="sign-in text-right">
    //             Already registered <a href="#">sign in?</a>
    //         </p>
    //     </form>
    //     );
    // }   

      
      
        // <div>
        //     Create User Here
        //     <form onSubmit={handleCreateUser}>
        //         <input type="text" onChange={(event) => setEmail(event.target.value)} placeholder="email" />
        //         <input type="password" onChange={(event) => setPassword(event.target.value)} placeholder="password" />
        //         <input type="password" onChange={(event) => setConfirm(event.target.value)} placeholder="Confirm Password" />
        //         <button type="submit">Create User</button>
        //     </form>
        //     <div>{message}</div>
        // </div>
    

