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

interface ContentProps {
  isSearchApplied: boolean;
  repositoryItems: RepositoryItem[];
}
const tableHeaders = [
  'Repository',
  'Stars',
  'Forks',
  'Open Issues',
  'Updated at',
];
export function Content({ isSearchApplied, repositoryItems }: ContentProps) {
  return isSearchApplied ? (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {tableHeaders.map((name, index) => (
                <TableCell key={`${name}-${index + 1}`}>{name}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {repositoryItems.map((repositoryItem, index) => (
              <TableRow key={`repository-item-${repositoryItem.id}`}>
                <TableCell>
                  <Avatar alt="test" src="/logo192.png" />
                  <Link href="http://localhost:3000/test">
                    {repositoryItem.name}
                  </Link>
                </TableCell>
                <TableCell>10</TableCell>
                <TableCell>5</TableCell>
                <TableCell>2</TableCell>
                <TableCell>2020-01-01</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={1}
        rowsPerPage={30}
        page={0}
        onPageChange={() => {}}
        rowsPerPageOptions={[30, 50, 100]}
      />
    </>
  ) : (
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
  );
}
