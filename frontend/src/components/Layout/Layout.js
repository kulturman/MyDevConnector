import React from 'react';
import Navbar from '../commons/Navbar';
import Footer from '../commons/Footer';

const layout = (props) => {
    return (
        <React.Fragment>
            <Navbar />
            <main>{props.children}</main>
            <Footer />
        </React.Fragment>
    )
}

export default layout;