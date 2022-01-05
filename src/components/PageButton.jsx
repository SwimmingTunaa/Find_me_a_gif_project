import React from 'react'

class PageButton extends React.Component
{
    constructor(props)
    {
        super(props);
        this.pageNumber = props.pageNumber;
        this.handlePageChange = this.handePageChange.bind(this);
    }

    handePageChange(event)
    {
        this.props.handlePageChange(event, this.pageNumber);
    }

    render()
    {
        return (
            <button className='btn btn-secondary m-1 mb-3'
                onClick={this.handlePageChange}
                type='button'
            >
                {this.pageNumber}
            </button>
        )
    }
}

export default PageButton;