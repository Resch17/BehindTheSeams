import React, { useState } from 'react';

export const Slideshow = ({ images, containerWidth }) => {
    const [counter, setCounter] = useState(0);

    const handleIncrement = () => {
        if (counter + 1 > images.length - 1) {
            setCounter(0);
        } else {
            setCounter(counter + 1);
        }
    };

    const handleDecrement = () => {
        if (counter - 1 < 0) {
            setCounter(images.length - 1);
        } else {
            setCounter(counter - 1);
        }
    };

    const progressStyle = (index) => {
        let style = {
            borderBottom: '2px solid var(--light-color1)',
            margin: '5px 2px',
            width: '40px',
        };
        if (index === counter) {
            style.borderBottom = '2px solid var(--dark-color1)';
        }
        return style;
    };

    return (
        <div className="slideshow">
            <div
                className="slideshow__image-container"
                style={{
                    position: 'relative',
                }}
            >
                <img
                    src={images[counter].url}
                    style={{
                        maxHeight: `${containerWidth + containerWidth * 0.33}`,
                        objectFit: 'scale-down',
                        width: `${containerWidth}px`,
                    }}
                    alt="slideshow"
                />
                <div
                    className="slideshow__controls"
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        position: 'absolute',
                        top: '40%',
                        width: '100%',
                    }}
                >
                    <i
                        className="fas fa-chevron-left fa-2x"
                        onClick={handleDecrement}
                        style={{
                            color: 'var(--dark-color2)',
                            cursor: 'pointer',
                            textShadow: '0 0 5px var(--light-color1)',
                        }}
                    ></i>
                    <i
                        className="fas fa-chevron-right fa-2x"
                        onClick={handleIncrement}
                        style={{
                            color: 'var(--dark-color2)',
                            cursor: 'pointer',
                            textShadow: '0 0 5px var(--light-color1)',
                        }}
                    ></i>
                </div>
            </div>
            <div
                className="slideshow__progress"
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    marginBottom: '6px',
                }}
            >
                {images.map((im, index) => {
                    return (
                        <div
                            key={index}
                            className="slideshow__progress-bar"
                            style={progressStyle(index)}
                        ></div>
                    );
                })}
            </div>
        </div>
    );
};
