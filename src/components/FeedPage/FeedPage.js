import React, { useEffect, useState } from 'react';
import './FeedPage.css';
import PageHeader from '../PageHeader/PageHeader';
import Tab from '../Tab/Tab';
import AddAlbum from './Albums/AddAlbum/AddAlbum';
import AlbumWrapper from './Albums/AlbumWrapper/AlbumWrapper';
import AlbumItem from './Albums/AlbumItem/AlbumItem';
import PostWrapper from './Posts/PostWrapper/PostWrapper';
import PostItem from './Posts/PostItem/PostItem';
import ModalWrapper from './Albums/Modals/ModalWrapper/ModalWrapper';
import DeleteModal from './Albums/Modals/DeleteModal/DeleteModal';
import AddModal from './Albums/Modals/AddModal/AddModal';

const FeedPage = () => {
    const [activeTabId, setActive] = useState('albums');
    const [isDeleteModalOpened, setDeleteModal] = useState(false);
    const [isAddModalOpened, setAddModal] = useState(false);

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
    
    const serverData = {
        albums: [{title: 'Title', author: 'Me'}, {title: 'Yours', author: 'You'}, {title: 'Yours', author: 'You'}, {title: 'Yours', author: 'You'}],
        posts: [{title: 'Title', author: 'Me', body: 'Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo inventore veritatis et quasi archit veritatis et quasi arc...'}, {title: 'Title', author: 'Me', body: 'Lorem ipsum'}, {title: 'Title', author: 'Me', body: 'Lorem ipsum'}]
    };

    const tabs = {
        albums: 'Albums',
        posts: 'Posts'
    };

    const toggleTab = currentTabId => {
        setActive(currentTabId);
    };

    const renderTabs = () => {
        return Object.keys(tabs).map((tabId, index) => {
            return(
                <Tab title={tabs[tabId]} key={index} onClick={() => toggleTab(tabId)} active={activeTabId === tabId ? true : false} />
            );
        });
    };

    // useEffect(() => {
    //     //make loaders
    // }, [activeTabId])

    const renderAlbums = () => {
        const mappedAlbumsData = serverData['albums'];
        const mappedAlbums = [...mappedAlbumsData].map((mappedItem, id) => {
            return (
                <AlbumWrapper>
                    <AlbumItem title={mappedItem.title} author={mappedItem.author} onClick={() => manageDeleteAlbumModal()} />
                </AlbumWrapper>
            )
        });
        return (
            <>
                <AddAlbum onClick={manageAddAlbumModal} />
                {mappedAlbums}               
            </>
        )
    }

    const renderPosts = () => {
        const mappedPostsData = serverData['posts'];
        return [...mappedPostsData].map((mappedItem, id) => {
            return (
                <PostWrapper>
                    <PostItem title={mappedItem.title} author={mappedItem.author} body={mappedItem.body}/>
                </PostWrapper>
            )
        });
    };

    const manageDeleteAlbumModal = () => {
        setDeleteModal(!isDeleteModalOpened);
    };

    const deleteAlbum = i => {
        //delete album
    };

    const manageAddAlbumModal = () => {
        setAddModal(!isAddModalOpened);
    };

    const addAlbum = () => {
        //add album
    }

    return(
        <div className="FeedPage">
            <PageHeader header='Feed'/> 
            <div className="TabsWrapper">
                {renderTabs()}  
            </div> 
            <div className="AlbumsAndPostsWrapper">               
                {activeTabId === 'albums' ? renderAlbums() : renderPosts()}              
            </div> 
            <div onClick={e => {if (e.target === document.querySelector('.Modal')) manageDeleteAlbumModal()}}>
                <ModalWrapper isOpened={isDeleteModalOpened} closeModal={manageDeleteAlbumModal} deleteAlbum={deleteAlbum()}><DeleteModal deleteAlbum={deleteAlbum}/></ModalWrapper>
                <ModalWrapper isOpened={isAddModalOpened} closeModal={manageAddAlbumModal}><AddModal addAlbum={addAlbum}/></ModalWrapper>     
            </div>
        </div>
    );
};

export default FeedPage;