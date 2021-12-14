import React from 'react';
import {useSelector} from "react-redux";
import UserMenu from "./Menu/UserMenu/UserMenu";
import Anonymous from "./Menu/Anonymous/Anonymous";

const AppToolbar = () => {
  const user = useSelector(state => state.users.user);

  return (
    <>
      {user  ? <UserMenu user={user}/> : <Anonymous/> }
    </>
  );
};

export default AppToolbar;