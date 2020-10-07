import React, { useState, Component } from 'react'
import { useForm } from 'react-hook-form'
import { auth } from "../../firebase"
import { useQueryCache } from "react-query"
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'
import { Link, useHistory } from 'react-router-dom'


// TODO Create Login form component
export function LoginForm(props) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")
    const { reset } = useForm()
    const [isLoading, setLoading] = useState(false)
    const history = useHistory()
    
    //TODO Delete this before submission or when nessecary
    const cache = useQueryCache()
    //                  Query key     data
    cache.setQueryData("TestingData", "This is made inside of 'LoginForm.js'")
    //

    const handleSignIn = async (event) => {
        event.preventDefault()
        let user
        setLoading(true)
        
        try {
            const userData = await auth.signInWithEmailAndPassword(email, password)
            setMessage("Signed in successful")
            console.log(userData)
            const user = userData.user
            await user.updateProfile({ displayName: `${email}`})
            history.push('/profile')
            return user
           
            //return userData.user
        } catch (error) {
            setMessage(error.message)
            return
        }
        finally {
            setLoading(false)
        }
        if (user) {
            props.history.push("/profile")
        } else {
            setLoading(false)
        }

    }

    const formClassName = `ui form ${isLoading ? 'loading' : ''}`

    return (
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='teal' textAlign='center'>
                Log-in to your account
            </Header>
            <Form size='large' className={formClassName} onSubmit={handleSignIn}>
                <Segment stacked>
                <Form.Input fluid 
                    icon='user' 
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
                <div className="field actions">
                <Button color='teal' fluid size='large' type='submit'>
                    Login
                </Button>
                <div>{message}</div>
                New to us?
                <Link to="/signup"> Signup</Link>
                </div>
                </Segment>
            </Form>
            </Grid.Column>
        </Grid>
    )
}
