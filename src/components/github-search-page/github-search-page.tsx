import React from 'react';
import { Button, TextField, Typography, Container, Grid } from '@mui/material';

export function GitHubSearchPage() {
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
          <Button fullWidth color="primary" variant="contained">
            Search
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

// yarn test github-search-page.test.tsx
