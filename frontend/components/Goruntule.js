import React from 'react';

const Goruntule = (props) => {
    const { ad, soyad, email, mesaj } = props.form;

    return(<div id="displayContainer">
        <h1>Gönderilen:</h1>

        { ad && <p data-testid="firstnameDisplay">Ad:{ad}</p> }
        { soyad && <p data-testid="lastnameDisplay">Soyad:{soyad}</p> }
        { email && <p data-testid="emailDisplay">Email:{email}</p> }
        { mesaj && <p data-testid="messageDisplay">Mesaj:{mesaj}</p> }
    </div>);
};

export default Goruntule;