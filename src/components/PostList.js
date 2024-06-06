// src/components/PostList.js
import React, { useState, useEffect } from 'react';
import { fetchPosts } from '../api';
import { Container, TextField, List, ListItem, ListItemText } from '@mui/material';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const getPosts = async () => {
      const data = await fetchPosts();
      setPosts(data);
    };

    getPosts();
  }, []);

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <TextField
        label="Search Posts"
        variant="outlined"
        fullWidth
        margin="normal"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <List>
        {filteredPosts.map(post => (
          <ListItem key={post.id}>
            <ListItemText
              primary={post.title}
              secondary={post.body}
            />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default PostList;
