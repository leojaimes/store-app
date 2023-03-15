import React, { useState } from 'react';
import {
  Button,
  TextField,
  Typography,
  Container,
  Grid,
  Box,
} from '@mui/material';
import { timeout } from '../../utils';

export function GitHubSearchPage() {
  const [isSearching, setIsSearching] = useState<boolean>(false);

  const onSearchClick = async () => {
    setIsSearching(true);

    await timeout(1000);
    setIsSearching(false);
  };
  return (
    <Container>
      <Typography variant="h3" component="h1">
        Github Repositories List
      </Typography>
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
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: 400,
        }}
      >
        <Typography>
          Please provide a search option and click in the search button
        </Typography>
      </Box>
    </Container>
  );
}

// yarn test github-search-page.test.tsx
