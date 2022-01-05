import React from 'react'

class Catergory extends React.Component
{
    constructor(props)
    {
        super(props);
        this.catergory = props.catergory;
        this.handleCatergory = this.handleCatergory.bind(this);
    }

    handleCatergory(event)
    {
        this.props.handleCatergory(event, this.catergory);
        console.log(this.catergory)
    }

    render()
    {
        return (
            <button
                className='tabs'
                onClick={this.handleCatergory}
                type='button'
            >
                {this.catergory}
            </button>
        )
    }
}

export default Catergory;