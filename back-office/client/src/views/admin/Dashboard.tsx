import { Box} from "@mui/material";
import { Token } from "../../utils/Token";
import { AdminDash, UserDash } from "../../components/admin/DashboardComp";

const Dashboard = () => {
  const userProfile = JSON.parse(Token.GetToken("user") as string) || {};

  return (
    <Box sx={{ p: 3 }}>
      {
        userProfile?.role === 'admin' ? (
          <AdminDash/>
        ) : (
          <UserDash/>
        )
      }

    </Box>
  );
};

export default Dashboard;
