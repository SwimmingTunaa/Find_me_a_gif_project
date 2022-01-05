import React from 'react'

const GifContainer = props =>
{
    const [isLoaded, setIsLoaded] = React.useState(false);
    const aspectRatio = (props.height / props.width) * 100;
    const random = Math.random();
    const colorOne = '#c90dff'
    const colorTwo = '#ff8f17'

    return (
        <React.Fragment>
             <img
                onLoad={() =>
                {
                    setIsLoaded(true);
                }}
                style={{
                    opacity: isLoaded ? 1 : 0,
                    borderRadius: "10px",   
                    position: 'absolute'
                }}
                src={props.src} alt=""
            />
            <div
                className='gif-container d-flex-top'
                style={{
                    background: random >= 0.5 ? colorOne : colorTwo,
                    width: props.width,
                    height: props.height,
                    visibility: isLoaded ? 'hidden' : 'visible'
                }}>
            </div>            
      </React.Fragment>
    )
}

export default GifContainer;