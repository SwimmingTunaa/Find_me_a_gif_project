import React, {useEffect, useState} from 'react'
import axios from 'axios'
import logo from '../images/Title.png'
import Loader from "./Loader"
import PageButton from './PageButton'
import GifContainer from './GifContainer'

const Giphy = () =>
{
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    const amountToLoad = 500;
    const amountPerPage = 30;

    const [pageButtons, setPageButtons] = useState([]);


    useEffect(() =>
    {
        loadContent()
        
    }, [currentPage])
    
    const renderGifs = () =>
    {        
        if (isLoading)
            return <Loader/>
        return data.map(el =>
        {
            return (
                <div key={el.id} className='gif' style={{height: parseInt(el.images.fixed_height.height), overflow : 'hidden'}} >
                    <GifContainer
                        height={200}
                        width={parseInt(el.images.fixed_height.width)}
                        src={el.images.fixed_height.url}
                    />
                </div>
            )
        })
    }   

    const renderPageButtons = () =>
    {
        return pageButtons.map(el => {
            return el;
        })  
    }

    const renderError = () =>
    {
        if (isError)
        {
            return (
                <div className='alert alert-danger alert-dismissable fade show' role="alert">Unable to load GIFS, please try again in a few minutes</div>
            )
        }
    }

    const handleSearchChange = (event) =>
    {
        setSearch(event.target.value)
    }

    const handlePageChange =  async (event, pageNumber) =>
    {
        event.preventDefault();
        setCurrentPage(pageNumber);
    }

    const loadContent = async () =>
    {
        setIsError(false);
        let offset = (currentPage - 1) * amountPerPage;
        try {
            const res = await axios(`https://api.giphy.com/v1/gifs/${search ==='' ? 'trending' : 'search'}`, {
                params: {
                    api_key: 'EmPqtd0g2WTqVbTLLb3BgMUkwq9IJU7b',
                    limit: amountPerPage,
                    q: search !== '' ? search : '',
                    offset: offset
                }
            })
            setData(res.data.data)
            console.log(res.data.data)
        } catch (error) {
            setIsError(true);
            setTimeout(() => setIsError(false), 3000)
        }

        setIsLoading(false); 

        let pb = [];
        for (let i = 0; i < amountToLoad / amountPerPage; i++)
        {
            pb.push(<PageButton key={i} pageNumber={i + 1} handlePageChange={handlePageChange} />)
        }
        setPageButtons(pb);
    }

    const handleSubmit = async event =>
    {
        event.preventDefault();
        loadContent()
    }

    return (
        <div className="m-2 ">
            {renderError()}
            <div className='container  m-5 justify-content-center mx-auto main'>
                <img className='logo d-flex mx-auto pt-5' src={logo} alt="" />
    
                {/*form*/}
                    <form className="mx-auto form-inline justify-content-center d-flex mt-5 mb-2">
                    <input value={search} onChange={handleSearchChange} type="text" placeholder='Search' id='searchInput' className='form-control search' />
                    
                    <button onClick={handleSubmit} type='submit' className='btn color-pink mx-2'>Find</button>
                </form>        
                  {/*Trending*/}
                <div className='mx-auto justify-content-center d-flex '>
                    <button className='tabs' onClick={handleSubmit}>Trending</button>
                </div>
            </div>

          
                
            {/*Page Buttons*/}
            <div className='mx-auto container justify-content-center d-flex'>{ renderPageButtons()}</div>
            {/*Gifs*/}
            <div className="container gifs d-flex">{renderGifs()}</div>
    </div>)
}

export default Giphy