import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import PermissionChecker from "../../../../components/PermissionChecker";

const AssignPermission = () => {
  const { state } = useLocation();
  const [rolesPermission, setRolesPermission] = useState("");
  const [permissionId, setPermissionId] = useState();
  // console.log("State",state)
  const tableHeading = ["Role", "Add", "View", "Edit", "Delete"];
  console.log("Permission Id", permissionId);

  const data = JSON.parse(localStorage.getItem("data"));
  const token = "Bearer" + " " + data?.access_token;

  const getRolesPermission = async () => {
    const rolesRequest = await fetch(
      `${process.env.REACT_APP_API_URL}role-permission`,
      {
        headers: {
          Authorization: `${token}`,
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    );
    const rolesResponse = await rolesRequest.json();
    if (rolesResponse) {
      setRolesPermission(rolesResponse?.data?.modules);
    }
  };

  console.log("Permission", rolesPermission);

  useEffect(() => {
    getRolesPermission();
    // getPermissionChecker()
  }, []);

  return (
    <div className="p-4">
      <div className="w-full bg-white m-1 border-t-2 border-gray-800">
        <h2 className="p-2 text-lg">Assign Permission ({state?.display_name})</h2>
        <div className="border-y border-gray-100">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {tableHeading?.map((heading, index) => {
                  return (
                    <th
                      key={index}
                      scope="col"
                      className="lg:px-6 text-center px-3 py-3 text-xs font-bold text-gray-500 uppercase "
                    >
                      {heading}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {rolesPermission &&
                rolesPermission?.map((data) => (
                  <tr className="text-center" key={data?.id}>
                    <td className="lg:px-6 capitalize overflow-hidden px-3 pl-4 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                      {data?.module_name}
                    </td>
                    {data?.permissions &&
                      data?.permissions.map((permission) => (
                        <PermissionChecker
                          key={permission?.id}
                          token={token && token}
                          state={state && state}
                          permission={permission}
                          permissionId={permission && permission?.id}
                        />
                      ))}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AssignPermission;
