import React from 'react';
import { CaretUpFill } from 'react-bootstrap-icons';

const ScrollToTopButton = () => {
    const handleClick = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <button className="scroll-to-top-button" onClick={handleClick}>
            <CaretUpFill size={32} />
        </button>
    );
};

export default ScrollToTopButton;