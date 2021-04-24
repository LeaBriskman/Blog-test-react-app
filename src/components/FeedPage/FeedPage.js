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
import PhotoModal from './Albums/Modals/PhotoModal/PhotoModal';
import PostStub from './Posts/PostStub/PostStub';
import AlbumStub from './Albums/AlbumStub/AlbumStub';
import LoadingSpinner from './LoadingSpinner/LoadingSpinner';

const FeedPage = () => {
    const [activeTabId, setActive] = useState('albums');
    //states for rendering albums and loading additional items
    const [albumsData, setAlbumsData] = useState([]);
    const [firstAlbumsLoading, setFirstAlbumsLoading] = useState(true);
    const [paginationAlbumsLoading, setPaginationAlbumsLoading] = useState(false);
    const [albumLoadsAmount, setAlbumLoadsAmount] = useState(0);
    //states for rendering posts and loading additional items
    const [postsData, setPostsData] = useState([]);
    const [firstPostsLoading, setFirstPostsLoading] = useState(true);
    const [paginationPostsLoading, setPaginationPostsLoading] = useState(false);
    const [postLoadsAmount, setPostLoadsAmount] = useState(0);
    //modals states
    const [isDeleteModalOpened, setDeleteModal] = useState(false);
    const [isAddModalOpened, setAddModal] = useState(false);
    const [isPhotoModalOpened, setPhotoModal] = useState(false);
    //state for deleting album
    const [itemToDelete, setItemToDelete] = useState('');
    //state for showing photos
    const [albumToShow, setAlbumToShow] = useState('');

    //getting posts and albums data from server
    useEffect(() => {
        fetch("https://graphqlzero.almansi.me/api", {
          "method": "POST",
          "headers": { "content-type": "application/json" },
          "body": JSON.stringify({
            query:  `query (
                        $options: PageQueryOptions
                    ) {
                        albums(options: $options) {
                            data {
                                id
                                title
                                user {
                                    name
                                }
                                photos {
                                    data {
                                        thumbnailUrl
                                    }
                                }
                            }
                        }
                    }`, variables: {
                            "options": {
                                "paginate": {
                                    "page": 1,
                                    "limit": 20
                                }
                            }
                        }
                    })
                }).then((resp) => resp.json())
                    .then(resp => {
                        console.log(resp)
                        setAlbumsData(resp.data.albums.data);
                        setFirstAlbumsLoading(false);
                    })                  
        return albumsData, firstAlbumsLoading;
    }, []);

    useEffect(() => {
        fetch("https://graphqlzero.almansi.me/api", {
          "method": "POST",
          "headers": { "content-type": "application/json" },
          "body": JSON.stringify({
            query:  `query (
                        $options: PageQueryOptions
                    ) {
                        posts(options: $options) {
                            data {
                                id
                                title
                                user {
                                    name
                                }
                                body
                            }
                        }
                    }`, variables: {
                            "options": {
                                "paginate": {
                                    "page": 1,
                                    "limit": 20
                                }
                            }
                        }
                    })
                }).then((resp) => resp.json())
                    .then(resp => {
                        setPostsData(resp.data.posts.data);
                        setFirstPostsLoading(false)
                    })                   
        return postsData, firstPostsLoading;
    }, []);
 
    //rendering and toggling tabs for showing albums/posts
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
                <Tab 
                    title={tabs[tabId]} 
                    key={index} 
                    onClick={() => toggleTab(tabId)} 
                    active={activeTabId === tabId ? true : false} 
                    counter={tabId === 'albums' ? albumsData.length : postsData.length} 
                />
            );
        });
    };

    //methods for rendering albums and posts containers
    const renderAlbums = () => {
        const mappedAlbums = albumsData.map((mappedItem, id) => {
            return (
                <AlbumWrapper key={`AlbumWrapper${id}`}>
                    <AlbumItem 
                        key={id}
                        title={mappedItem.title} 
                        author={mappedItem.user.name} 
                        image={mappedItem.photos.data[0].thumbnailUrl}
                        onClickDelete={() => manageDeleteAlbumModal(id)}
                        onClickOpenModal={managePhotoModal}
                    />
                </AlbumWrapper>
            )
        });

        const albumsPreloader = () => {
            let albumsPreloaderArr = []
            for (let i=0; i<2; i++) {
                albumsPreloaderArr.push(
                    <AlbumWrapper key={`AlbumPreloaderWrapper${i}`}>
                        <AlbumStub key={`AlbumStub${i}`} />
                    </AlbumWrapper>       
                );
            };
            return albumsPreloaderArr;
        };

        return (
            <>
                <AddAlbum onClick={manageAddAlbumModal} />           
                {firstAlbumsLoading ? albumsPreloader() : mappedAlbums}
                {paginationAlbumsLoading ? <LoadingSpinner /> : ''}           
            </>
        );
    };

    const renderPosts = () => {
        const mappedPosts = [...postsData].map((mappedItem, id) => {
            return (
                <PostWrapper key={`PostWrapper${id}`}>
                    <PostItem key={`PostItem${id}`} title={mappedItem.title} author={mappedItem.user.name} body={mappedItem.body}/>
                </PostWrapper>
            )
        });

        const postsPreloader = () => {
            let postsPreloaderArr = []
            for (let i=0; i<3; i++) {
                postsPreloaderArr.push(
                    <PostWrapper key={`PostPreloaderWrapper${i}`}>
                        <PostStub key={`PostStub${i}`} />
                    </PostWrapper>       
                );
            };
            return postsPreloaderArr;
        };
        
        return (
            <>
                {firstPostsLoading ? postsPreloader() : mappedPosts}
                {paginationPostsLoading ? <LoadingSpinner /> : ''}           
            </>
        );
    };

    //loading additional 20 items when scrolling to the page bottom
    const handleScroll = () => {
        const scrollHeight = Math.max(
            document.body.scrollHeight, document.documentElement.scrollHeight,
            document.body.offsetHeight, document.documentElement.offsetHeight,
            document.body.clientHeight, document.documentElement.clientHeight
          );
        
          if (scrollHeight - window.pageYOffset < document.documentElement.clientHeight + 80) {
            if (activeTabId === 'albums') {
                if (paginationAlbumsLoading === false && albumLoadsAmount < 1) {
                    //show spinner and start request                    
                    setPaginationAlbumsLoading(true);
                    //check if there is need for loading additional items
                    setAlbumLoadsAmount(albumLoadsAmount + 1);
                    fetch("https://graphqlzero.almansi.me/api", {
                        "method": "POST",
                        "headers": { "content-type": "application/json" },
                        "body": JSON.stringify({
                            query:  `query (
                                      $options: PageQueryOptions
                                  ) {
                                      albums(options: $options) {
                                          data {
                                              id
                                              title
                                              user {
                                                  name
                                              }
                                              photos {
                                                  data {
                                                      thumbnailUrl
                                                  }
                                              }
                                          }
                                      }
                                  }`, variables: {
                                          "options": {
                                              "paginate": {
                                                  "page": 2,
                                                  "limit": 20
                                              }
                                          }
                                      }
                                  })
                              })
                            .then((resp) => resp.json())
                            .then(resp => {
                                setAlbumsData([...albumsData, ...resp.data.albums.data]);
                                setPaginationAlbumsLoading(false);
                                return albumsData, paginationAlbumsLoading;
                            })               
                        }
            }

            else {
                if (paginationPostsLoading === false && postLoadsAmount < 1) {
                    //show spinner and start request                    
                    setPaginationPostsLoading(true);
                    //check if there is need for loading additional items
                    setPostLoadsAmount(albumLoadsAmount + 1);
                    fetch("https://graphqlzero.almansi.me/api", {
                        "method": "POST",
                        "headers": { "content-type": "application/json" },
                        "body": JSON.stringify({
                            query:  `query (
                                        $options: PageQueryOptions
                                    ) {
                                        posts(options: $options) {
                                            data {
                                                id
                                                title
                                                user {
                                                    name
                                                }
                                                body
                                            }
                                        }
                                    }`, variables: {
                                            "options": {
                                                "paginate": {
                                                    "page": 2,
                                                    "limit": 20
                                                }
                                            }
                                        }
                                  })
                              })
                            .then((resp) => resp.json())
                            .then(resp => {
                                setPostsData([...postsData, ...resp.data.posts.data]);
                                setPaginationPostsLoading(false);
                                return postsData, paginationPostsLoading;
                            })               
                        }
            };
        };
    };

    window.onscroll = handleScroll;

    //close and open modal windows
    const manageDeleteAlbumModal = i => {
        setDeleteModal(!isDeleteModalOpened);
        setItemToDelete(i);
    };
  
    const manageAddAlbumModal = () => {
        setAddModal(!isAddModalOpened);
    };
      
    const managePhotoModal = i => {
        setPhotoModal(!isPhotoModalOpened);
        console.log(albumsData[i].data.photos.data);
    }

    //manipulations with albums
    const deleteAlbumHandler = i => {
        fetch("https://graphqlzero.almansi.me/api", {
            "method": "POST",
            "headers": { "content-type": "application/json" },
            "body": JSON.stringify({
              query:  `mutation (
                            $id: ID!
                        ) {
                            deleteAlbum (id: $id)
                        }`, variables: {
                                "id": i
                          }
                      })
                  })
        albumsData.splice(i, 1)
        setAlbumsData(albumsData);
        setDeleteModal(false);
    };

    const addAlbumHandler = (title, description) => {
        fetch("https://graphqlzero.almansi.me/api", {
            "method": "POST",
            "headers": { "content-type": "application/json" },
            "body": JSON.stringify({
              query:  `mutation (
                            $input: CreateAlbumInput!
                        ) {
                            createAlbum(input: $input) {
                                id
                                title
                                user {
                                    name
                                }
                            }
                        }`, variables: {
                            "input": {
                                "title": title, 
                                "userId": 1
                              }
                          }
                      })
                  })

        const newAlbum = {
            user: {
                name: title
            },
            title: description,
            photos: {
                data: [
                    {thumbnailUrl: ''}]
            }
        }
        albumsData.unshift(newAlbum)
        setAlbumsData(albumsData);
        manageAddAlbumModal(false);
    }

    const showPhotosHandler = i => {
        console.log(i)
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
                <ModalWrapper isOpened={isDeleteModalOpened} closeModal={() => manageDeleteAlbumModal(itemToDelete)}><DeleteModal deleteAlbum={deleteAlbumHandler}/></ModalWrapper>
                <ModalWrapper isOpened={isAddModalOpened} closeModal={manageAddAlbumModal}><AddModal addAlbum={addAlbumHandler}/></ModalWrapper> 
                <ModalWrapper isOpened={isPhotoModalOpened} closeModal={() => managePhotoModal(albumToShow)}><PhotoModal /></ModalWrapper>    
        </div>
    );
};

export default FeedPage;