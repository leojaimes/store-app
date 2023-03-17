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
            {repositoryItems.map((repositoryItem) => (
              <TableRow key={`repository-item-${repositoryItem.id}`}>
                <TableCell>
                  <Avatar
                    alt={repositoryItem.name}
                    src={repositoryItem.owner.avatar_url}
                  />
                  <Link href={repositoryItem.html_url}>
                    {repositoryItem.name}
                  </Link>
                </TableCell>
                <TableCell>{repositoryItem.stargazers_count}</TableCell>
                <TableCell>{repositoryItem.forks}</TableCell>
                <TableCell>{repositoryItem.open_issues}</TableCell>
                <TableCell>{`${new Date(
                  repositoryItem.updated_at
                ).toLocaleDateString()}`}</TableCell>
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
