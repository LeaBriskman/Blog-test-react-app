import React, { useEffect, useState } from 'react';
import './FeedPage.css';
import PageHeader from '../PageHeader/PageHeader';
import Tab from '../Tab/Tab';
import AlbumWrapper from './Albums/AlbumWrapper/AlbumWrapper';
import AddAlbum from './Albums/AddAlbum/AddAlbum';

const tabs = ['Albums', 'Posts'];

const FeedPage = () => {

    const [active, setActive] = useState(tabs[0]);
    console.log(active);

    // useEffect(() => {
    //     fetch("https://graphqlzero.almansi.me/api", {
    //       "method": "POST",
    //       "headers": { "content-type": "application/json" },
    //       "body": JSON.stringify({
    //         query: `albums(options: $options) {
    //             data {
    //               id
    //               title
    //               user {
    //                 name
    //               }
    //             }
    //             meta {
    //               totalCount
    //             }
    //           }`
    //       })
    //     }).then((resp) => resp.json())
    //       .then(resp => {
    //         console.log(resp)
    //       })
          
    //   }, []);

    return(
        <div className="FeedPage">
            <PageHeader header='Feed'/> 
            <div className="TabsWrapper">
                {tabs.map((tab, i) => {
                    return(
                        <Tab title={`${tab}`} key={i} onClick={() => {setActive(tabs[i])}} active={active}/>                   
                    )
                })}  
            </div> 
            <div className="AlbumsAndPostsWrapper">               
                <AddAlbum />              
            </div>      
        </div>
    );
};

export default FeedPage;