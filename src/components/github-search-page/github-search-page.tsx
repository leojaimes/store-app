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
import { timeout } from '../../utils';
import { Content } from './content';

export function GitHubSearchPage() {
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [isSearchApplied, setIsSearchApplied] = useState<boolean>(false);

  const onSearchClick = async () => {
    setIsSearching(true);
    await timeout(1000);
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
        <Content isSearchApplied={isSearchApplied} />
      </Box>
    </Container>
  );
}
