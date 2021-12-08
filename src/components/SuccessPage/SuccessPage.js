import useAuth from "hooks/useAuth";
import React from "react";

const SuccessPage = () => {
  const { user } = useAuth();
  return (
    <div className="my-3" style={{ zIndex: 1000 }}>
      <h1 className="display-3 text-light">
        {user.email && "Registration is successfull"}
      </h1>
    </div>
  );
};

export default SuccessPage;
