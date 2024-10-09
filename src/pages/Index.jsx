import React from "react";
import UserTable from "../components/UserTable";

const Index = () => {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">User Data Table</h1>
      <UserTable />
    </div>
  );
};

export default Index;