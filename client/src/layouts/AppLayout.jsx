import React from "react";
import { Outlet } from "react-router-dom";
function AppLayout() {
  return (
    <div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default AppLayout;
