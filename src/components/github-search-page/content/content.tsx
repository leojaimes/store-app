import {
  Typography,
  Box,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Avatar,
  Link,
  TablePagination,
} from '@mui/material';
import React from 'react';
import { RepositoryItem } from '../../../types/github/index';
import { GithubTable } from './GithubTable/GithubTable';

interface ContentProps {
  isSearchApplied: boolean;
  children: React.ReactNode;
  hasResults: boolean;
  // repositoryItems: RepositoryItem[];
  // rowsPerPage: number;
  // setRowsPerPage: (rows: number) => void;
}

interface TableStatusMessageBoxProps {
  children: React.ReactNode;
}
export function TableStatusMessageBox({
  children,
}: TableStatusMessageBoxProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 400,
      }}
    >
      {children}
    </Box>
  );
}

export function Content({
  isSearchApplied,
  children,
  hasResults = false,
}: ContentProps) {
  console.log(`Content repositoryItems.length: `);
  if (isSearchApplied && hasResults) {
    return <div>{children}</div>;
  }

  if (isSearchApplied && !hasResults) {
    return (
      <TableStatusMessageBox>
        <Typography>Your search has no results</Typography>
      </TableStatusMessageBox>
    );
  }

  return (
    <TableStatusMessageBox>
      <Typography>
        Please provide a search option and click in the search button
      </Typography>
    </TableStatusMessageBox>
  );
}
