import ListUser from "../components/list-user/ListUser";
import ListUserProvider from "../contexts/providers/ListUserProvider";

const NewListUserPage = (props) => {
  return (
    <ListUserProvider>
      <ListUser />
    </ListUserProvider>
  );
};

export default NewListUserPage;
