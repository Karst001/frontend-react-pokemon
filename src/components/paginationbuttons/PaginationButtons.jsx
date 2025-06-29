import React from "react";
import './PaginationButtons.css';

function PaginationButtons({ onPrev, onNext, disablePrev, disableNext }) {
    return (
        //reusable component for the two navigation buttons
        <div>
            <button onClick={onPrev} disabled={disablePrev}>
                Vorige
            </button>
            <button onClick={onNext} disabled={disableNext}>
                Volgende
            </button>
        </div>
    );
}

export default PaginationButtons;