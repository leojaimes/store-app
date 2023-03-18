import React, { useState } from 'react';
import {
  Button,
  TextField,
  Typography,
  Container,
  Grid,
  Box,
  TablePagination,
} from '@mui/material';
import axios from 'axios';

import { Content } from './content';
import { getRepositories } from '../../services/githubServices';
import { RepositoryItem } from '../../types/github/index';

export function GitHubSearchPage() {
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [isSearchApplied, setIsSearchApplied] = useState<boolean>(false);
  const [repositoryItems, setRepositoryItems] = useState<RepositoryItem[]>([]);
  const onSearchClick = async () => {
    setIsSearching(true);
    try {
      const res = await getRepositories({
        q: 'react+language:phyton',
        page: 1,
        per_page: 10,
      });
      setRepositoryItems(res.data.items);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        ///
      }
    }

    setIsSearchApplied(true);
    setIsSearching(false);
  };

  return (
    <Container>
      <Box my={4}>
        <Typography variant="h3" component="h1">
          Github Repositories List
        </Typography>
      </Box>

      <Grid container spacing={2} justifyContent="space-between">
        <Grid item xs={12} md={9}>
          <TextField fullWidth id="filterBy" label="filter by" />
        </Grid>
        <Grid item xs={12} md={3}>
          <Button
            onClick={onSearchClick}
            disabled={isSearching}
            fullWidth
            color="primary"
            variant="contained"
          >
            Search
          </Button>
        </Grid>
      </Grid>
      <Box my={4}>
        {' '}
        <Content
          isSearchApplied={isSearchApplied}
          repositoryItems={repositoryItems}
        />
      </Box>
    </Container>
  );
}
