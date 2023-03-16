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
} from '@mui/material';

interface ContentProps {
  isSearchApplied: boolean;
}
export function Content({ isSearchApplied }: ContentProps) {
  return isSearchApplied ? (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Repository</TableCell>
            <TableCell>stars</TableCell>
            <TableCell>forks</TableCell>
            <TableCell>open issues</TableCell>
            <TableCell>updated at</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>
              <Avatar alt="test" src="/logo192.png" />
              <Link href="http://localhost:3000/test">test</Link>
            </TableCell>
            <TableCell>10</TableCell>
            <TableCell>5</TableCell>
            <TableCell>2</TableCell>
            <TableCell>2020-01-01</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
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
