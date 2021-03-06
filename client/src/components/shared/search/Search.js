import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { InputGroup, InputGroupAddon, InputGroupText, FormInput } from "shards-react";
import { search } from '../../../services/search';

const Search = (props) => {
    const [params, setParams] = useState('');

    const onChange = (e) => {
        setParams(e.target.value);
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        let data = null;

        // If search params are not empty
        // Search for location
        if (params !== '') {
            data = await search(params);
        }

        if (data && data.data) {

            if (data.data.length === 1) {
                props.history.push('/location/' + data.data[0].id);
            }
            else {
                props.history.push({pathname: '/', locations: data.data});
            }
        }
    }

    return (
        <form onSubmit={onSubmit}>
            <InputGroup size="sm" seamless>
                    <InputGroupAddon type="prepend">
                        <InputGroupText><FontAwesomeIcon icon={faSearch} /></InputGroupText>
                    </InputGroupAddon>
                    <FormInput className="border-0" placeholder="Search..." value={params} onChange={onChange}/>
            </InputGroup>
        </form>
    )
}

export default withRouter (Search);