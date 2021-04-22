import React from 'react';
import './PostItem.css';

const PostItem = ({author, title, body}) => {
    return (
        <>
            <div className="PostAuthor">{author}</div>
            <div className="PostTitle">{title}</div>
            <div className="PostBody">{body}</div>
        </>
    );
};

export default PostItem;