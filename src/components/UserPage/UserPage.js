import React, { useEffect, useState } from 'react';
import './UserPage.css';
import Input from './Input/Input';

const UserPage = () => {
    const [userData, setUserData] = useState('');
    const [photo, setPhoto] = useState('');

    useEffect((userData, photo) => {
        fetch("https://graphqlzero.almansi.me/api", {
        "method": "POST",
        "headers": { "content-type": "application/json" },
        "body": JSON.stringify({
            query: `{
                user(id: 1) {
                    id
                    name
                    username
                    email
                    address {
                        city
                    }
                    phone
                    website
                    company {
                        name
                    }
                },
                photo (id: 1) {
                    url
                }
            }`
        })
        }).then((resp) => resp.json())
        .then(resp => {
            let processedData = {...resp.data.user, address: resp.data.user.address.city, company: resp.data.user.company.name};
            setUserData(processedData);
            setPhoto(resp.data.photo.url);
        })
        return userData, photo
    }, []);

    const { username, name, email, address, phone, website, company } = userData;
    //label index is equal to its value index, values from server
    const labels = ['Profile name', 'Company Name',  'Phone', 'Description', 'Email', 'Web site', 'Address'];
    const values = [`@${username}`, company, phone, name, email, website, address];

    const style = {
        backgroundImage: `url(${photo})`
      };

    return(
        <div className="UserPage">
            <div className="UserAvatarWrapper" style={style}></div>
            <div className="InputsWrapper">
                {labels.map((label, i) => {
                    return (
                        <Input label={label} value={values[i]} i={i} key={i}/>
                    );
                })}
            </div>
        </div>
    );
};

export default UserPage;