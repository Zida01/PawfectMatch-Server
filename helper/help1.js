import React, { useState } from 'react';
import axios from 'axios';

const YourComponent = () => {
    const [country, setCountry] = useState('');
    const [state, setState] = useState('');
    const [userCity, setUserCity] = useState('');

    const generateQueryParams = () => {
        const queryParams = [];

        if (country) {
            queryParams.push(`country=${country}`);
        }

        if (state) {
            queryParams.push(`state=${state}`);
        }

        if (userCity) {
            queryParams.push(`city=${userCity}`);
        }

        return queryParams.join('&');
    };

    const fetchData = async () => {
        try {
            const apiUrl = `http://127.0.0.1:5000/api/v1/volunteer?${generateQueryParams()}`;

            const response = await axios.get(apiUrl);
            console.log(response.data);
        } catch (error) {
            console.error(error.response.data);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchData();
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Country:
                <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} />
            </label>
            <br />
            <label>
                State:
                <input type="text" value={state} onChange={(e) => setState(e.target.value)} />
            </label>
            <br />
            <label>
                City:
                <input type="text" value={userCity} onChange={(e) => setUserCity(e.target.value)} />
            </label>
            <br />
            <button type="submit">Submit</button>
        </form>
    );
};

export default YourComponent;