import React, { useEffect, useState } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import { getTweetsFollowersApi } from '../../api/tweet';
import ListTweets from '../../components/ListTweets/ListTweets';
import BasicLayout from '../../layout/BasicLayout';
import './Home.scss';




const Home = props => {

    const {setreFreshCheckLogin} = props;

    const [tweets, setTweets] = useState(null);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);



    useEffect(() => {
        
        getTweetsFollowersApi(page).then(resp => {

            if (page === 1) {

                if (resp == null) {
                    setTweets([]);
                } else {
                    setTweets( formatModel(resp) );
                }

                setLoading(false);

            } else {

                if ( resp == null ) {
                    setLoading(0);
                } else {
                    const temporalTweets = formatModel(resp);
                    setTweets(  [...tweets, ...temporalTweets ] );
                    setLoading(false);
                }

            }
        }).catch(err => {
            //console.log(err);
        });
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);



    const moreData = () => {
        setLoading(true);
        setPage(page + 1);
    }



    const changeRefreshing = () =>{
        //setrefreshing( !refreshing );
    }

    return (
        <BasicLayout className="home" changeRefreshing={changeRefreshing} setreFreshCheckLogin={setreFreshCheckLogin} >
            <div className='home__title'>
                <h2>Inicio</h2>
            </div>

            
            {  tweets == null ? <div style={{textAlign:"center"}}> <Spinner as="span" animation='grow' role="status" aria-hidden="true" /> </div> : tweets && <ListTweets tweets={tweets} />  }
            
            {
                !loading ? (
                    loading !== 0 ? <Button className='load-more' onClick={moreData}>Cargar más..</Button> : <p style={{textAlign:"center", padding:"20px"}}>No se encontraron mas twists.</p>
                ) : (
                    <Spinner as="span" animation='grow' role="status" aria-hidden="true"  />
                )
            }
            
            
        </BasicLayout>
    );
}

export default Home;


const formatModel = tweets => {
    const tweetsTemp = [];

    tweets.forEach( tweet => {
        tweetsTemp.push({
            _id: tweet.Tweet._id,
            userId: tweet.userRelationId,
            message: tweet.Tweet.message,
            date: tweet.Tweet.date
        });
    } );

    return tweetsTemp;

}