import Axios from "axios";
import { useState, useEffect } from "react";
import DashboardLayout from "@layouts/DashboardLayout.jsx";

const UserDashboard = () => {
    const [admin, setAdmin] = useState(null);

    useEffect(() => {
        const fetchAdmin = async () => {
            try {
                const res = await Axios.get("http://localhost:3300/admin");
                setAdmin(res.data.user);
                console.log(res);
            } catch (error) {
                console.log(error);
            }
        };
        fetchAdmin();
    }, []);
    return (
        <div>
            
            <DashboardLayout>
              <section className="flex justify-center gap-6">
                  <div className="relative overflow-x-auto shadow-md ">
                      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                              <tr>
                                  <th scope="col" className="px-6 py-3">
                                      Name
                                  </th>
                                  <th scope="col" className="px-6 py-3">
                                      Email Address
                                  </th>
  
                                  <th scope="col" className="px-6 py-3">
                                      Action
                                  </th>
                              </tr>
                          </thead>
                          <tbody>
                              {admin &&
                                  admin.map((user, index) => (
                                      <tr
                                          key={index}
                                          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                      >
                                          <th
                                              scope="row"
                                              className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                                          >
                                              <img
                                                  className="w-10 h-10 rounded-full"
                                                  // Change the src to the custom avatar
                                                  src={`https://avatar.iran.liara.run/public/${
                                                      user.username === "Carlos"
                                                          ? "14"
                                                          : user.username ===
                                                            "Pila"
                                                          ? "15"
                                                          : user.username ===
                                                            "Akiko"
                                                          ? "56"
                                                          : "12" // Make this random
                                                  }`}
                                                  alt=""
                                              />
  
                                              <div className="ps-3">
                                                  <div className="text-base font-semibold">
                                                      {user.fullname}
                                                  </div>
                                                  <div className="font-normal text-gray-500">
                                                      {user.username}
                                                  </div>
                                              </div>
                                          </th>
                                          <td className="px-6 py-4">
                                              {user.email}
                                          </td>
  
                                          <td className="px-6 py-4">
                                              <a
                                                  href="#"
                                                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                              >
                                                  Edit user
                                              </a>
                                          </td>
                                      </tr>
                                  ))}
                          </tbody>
                      </table>
                  </div>
              </section>
            </DashboardLayout>
        </div>
    );
};
export default UserDashboard;
