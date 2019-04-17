import React, { useState } from 'react';
import { connect } from 'react-redux';
import { FormInput, Button} from "shards-react";
import { logIn } from '../../../services/auth';
import { saveState } from '../../../localStorage';

const LogIn = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();

        const token = await logIn(username, password);

        if (token && token.data) {
            saveState(token.data);
            props.logIn(token.data);
        }
    }

    const changeUsername = (e) => {
        setUsername(e.target.value);
    }

    const changePassword = (e) => {
        setPassword(e.target.value);
    }

    return (
        <form onSubmit={onSubmit}>
            <FormInput placeholder="Username" value={username} onChange={changeUsername} />
            <FormInput placeholder="Password" type="password" value={password} onChange={changePassword} />
            <Button type="submit">Log In</Button>
        </form>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        logIn: (token) => {dispatch({
            type: "LOG_IN", 
            token,
        })}
    }
}
 
export default connect (null, mapDispatchToProps) (LogIn);