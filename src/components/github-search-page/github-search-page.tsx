import React, { useEffect, useCallback, useState, useRef } from 'react';
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

import { GithubTable } from './content/GithubTable/GithubTable';

const ROWS_PER_PAGE_DEFAULT = 30;
const INITIAL_CURRENT_PAGE = 0;
const INITIAL_TOTAL_COUNT = 0;

export function GitHubSearchPage() {
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [isSearchApplied, setIsSearchApplied] = useState<boolean>(false);
  const [repositoryItems, setRepositoryItems] = useState<RepositoryItem[]>([]);

  const [rowsPerPage, setRowsPerPage] = useState<number>(ROWS_PER_PAGE_DEFAULT);
  const didMount = useRef(false);
  const searchByInput = useRef<HTMLInputElement>(null);

  const [currentPage, setCurrentPage] = useState(INITIAL_CURRENT_PAGE);
  const [totalCount, setTotalCount] = useState(INITIAL_TOTAL_COUNT);

  const onSearchClick = useCallback(async () => {
    setIsSearching(true);
    try {
      const res = await getRepositories({
        q: searchByInput.current?.value,
        page: currentPage,
        per_page: rowsPerPage,
      });
      console.log(
        `res.data.items.length ${JSON.stringify(res.data.items.length)}`
      );
      setTotalCount(res.data.total_count);
      setRepositoryItems(res.data.items);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        ///
      }
    }

    setIsSearchApplied(true);
    setIsSearching(false);
  }, [rowsPerPage, currentPage]);

  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true;
      return;
    }
    onSearchClick();
  }, [onSearchClick]);

  const handleOnPageChange = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    page: number
  ) => {
    setCurrentPage(page);
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
          <TextField
            fullWidth
            id="filterBy"
            label="filter by"
            name="fiter by"
            inputRef={searchByInput}
          />
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
          hasResults={repositoryItems.length > 0}
        >
          <GithubTable repositoryItems={repositoryItems} />
          <TablePagination
            component="div"
            count={totalCount}
            rowsPerPage={rowsPerPage}
            page={currentPage}
            onPageChange={handleOnPageChange}
            onRowsPerPageChange={(e) => {
              const newRowsPerPage = e.target.value;
              console.log(`newRowsPerPage ${newRowsPerPage}`);
              setRowsPerPage(Number(newRowsPerPage));
              console.log(`RowsPerPage ${rowsPerPage}`);
            }}
            rowsPerPageOptions={[30, 50, 100]}
          />
        </Content>
      </Box>
    </Container>
  );
}
