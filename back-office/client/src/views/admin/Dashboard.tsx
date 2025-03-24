import { Box, Grid, Card, CardContent, Typography, TextField, IconButton, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { Search, Visibility, ThumbUp, Comment, CheckCircle } from "@mui/icons-material";

const Dashboard = () => {
  const stats = [
    { label: "Article Views", value: "60.5k", icon: <Visibility fontSize="large" color="primary" /> },
    { label: "Likes", value: "150", icon: <ThumbUp fontSize="large" color="secondary" /> },
    { label: "Comments", value: "320", icon: <Comment fontSize="large" color="success" /> },
    { label: "Published", value: "70", icon: <CheckCircle fontSize="large" color="action" /> },
  ];

  const articles = [
    { title: "Article 73", views: "2.9k", comments: "210", status: "Published" },
    { title: "Article 72", views: "1.5k", comments: "360", status: "Published" },
  ];

  return (
    <Box sx={{ p: 3 }}>
      {/* Search Bar */}
      <Box display="flex" alignItems="center" justifyContent="flex-end" mb={3}>
        <TextField
          variant="outlined"
          placeholder="Search"
          size="small"
          sx={{ width: 250, mr: 1 }}
        />
        <IconButton color="primary">
          <Search />
        </IconButton>
      </Box>

      {/* Stat Cards */}
      <Grid container spacing={2}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ display: "flex", alignItems: "center", p: 2, boxShadow: 3 }}>
              <Box sx={{ mr: 2 }}>{stat.icon}</Box>
              <CardContent>
                <Typography variant="h6">{stat.value}</Typography>
                <Typography variant="subtitle2" color="textSecondary">
                  {stat.label}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Recent Articles */}
      <Box mt={4}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6">Recent Articles</Typography>
          <Button variant="contained" color="primary">View All</Button>
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Article</strong></TableCell>
                <TableCell><strong>Views</strong></TableCell>
                <TableCell><strong>Comments</strong></TableCell>
                <TableCell><strong>Status</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {articles.map((article, index) => (
                <TableRow key={index}>
                  <TableCell>{article.title}</TableCell>
                  <TableCell>{article.views}</TableCell>
                  <TableCell>{article.comments}</TableCell>
                  <TableCell>
                    <Typography color="success.main" fontWeight="bold">
                      {article.status}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default Dashboard;
