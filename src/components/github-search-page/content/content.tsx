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
import { RepositoryItem } from '../../../types/github/index';
import { GithubTable } from './GithubTable/GithubTable';

interface ContentProps {
  isSearchApplied: boolean;
  repositoryItems: RepositoryItem[];
  rowsPerPage: number;
  setRowsPerPage: (rows: number) => void;
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
  repositoryItems,
  rowsPerPage,
  setRowsPerPage,
}: ContentProps) {
  console.log(`Content repositoryItems.length: ${repositoryItems.length}`);
  if (isSearchApplied && !!repositoryItems.length) {
    return (
      <>
        <GithubTable repositoryItems={repositoryItems} />
        <TablePagination
          component="div"
          count={1}
          rowsPerPage={rowsPerPage}
          page={0}
          onPageChange={() => {}}
          onRowsPerPageChange={(e) => {
            const newRowsPerPage = e.target.value;
            console.log(`newRowsPerPage ${newRowsPerPage}`);
            setRowsPerPage(Number(newRowsPerPage));
            console.log(`RowsPerPage ${rowsPerPage}`);
          }}
          rowsPerPageOptions={[30, 50, 100]}
        />
      </>
    );
  }

  if (isSearchApplied && !repositoryItems.length) {
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
