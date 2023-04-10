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
import { RepositoryItem } from '../../../../types/github/index';

const tableHeaders = [
  'Repository',
  'Stars',
  'Forks',
  'Open Issues',
  'Updated at',
];
interface Props {
  repositoryItems: RepositoryItem[];
}
export function GithubTable({ repositoryItems }: Props) {
  return (
    <TableContainer sx={{ maxHeight: 440 }}>
      <Table stickyHeader>
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
  );
}
