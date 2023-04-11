import React, { useEffect, useCallback, useState, useRef } from 'react';
import {
  Button,
  TextField,
  Typography,
  Container,
  Grid,
  Box,
  TablePagination,
  Snackbar,
  Alert,
} from '@mui/material';
import axios from 'axios';

import { Content } from './content';
import { getRepositories } from '../../services/githubServices';
import { RepositoryItem } from '../../types/github/index';

import { GithubTable } from './content/GithubTable/GithubTable';
import {
  BAD_REQUEST_STATUS,
  ERROR_SERVER_STATUS,
} from '../../consts/httpStatus';

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

  const [isOpen, setIsOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState('');

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
        if (error.response.status === BAD_REQUEST_STATUS) {
          //
          const data = error.response.data as { message: string };
          setIsOpen(true);
          setSnackMessage(data.message);
          return;
        }

        if (error.response.status === ERROR_SERVER_STATUS) {
          const data = error.response.data as { message: string };

          setIsOpen(true);
          setSnackMessage(data.message);
          return;
        }
      }
    } finally {
      setIsSearchApplied(true);
      setIsSearching(false);
    }
  }, [rowsPerPage, currentPage]);

  const handleClickSearch = () => {
    setCurrentPage(0);
    onSearchClick();
  };

  useEffect(() => {
    console.log(`antes de entrar al if  didMount.current ${didMount.current}`);
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
            onClick={handleClickSearch}
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
              setCurrentPage(0);
              console.log(`RowsPerPage ${rowsPerPage}`);
            }}
            rowsPerPageOptions={[30, 50, 100]}
          />
        </Content>
      </Box>

      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={isOpen}
        autoHideDuration={3000}
        onClose={() => {
          setSnackMessage('');
          setIsOpen(false);
        }}
        message={snackMessage}
      />
    </Container>
  );
}
