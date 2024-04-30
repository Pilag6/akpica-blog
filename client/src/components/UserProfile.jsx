import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";

// Icons
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";

const UserProfile = () => {
  const { id } = useParams();

  const [admin, setAdmin] = useState(null);
  const [newEmail, setNewEmail] = useState("");
  const [newFullname, setNewFullname] = useState("");

//   password
  const [newPassword, setNewPassword] = useState("");
  const [visibleNew, setVisibleNew] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [visibleConfirm, setVisibleConfirm] = useState(false);

  const handleShowNewPassword = () => {
    setVisibleNew(!visibleNew);
  };

  const handleShowConfirmPassword = () => {
    setVisibleConfirm(!visibleConfirm);
  };

  // console.log(admin);

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const res = await Axios.get(`http://localhost:3300/admin/edit/${id}`);
        console.log(res.data.user);
        setAdmin(res.data.user);
        // console.log(res);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAdmin();
  }, [id]);

//   change picture
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    try {
      await Axios.patch(`http://localhost:3300/admin/edit/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // After successful update, fetch the updated admin data
      const res = await Axios.get(`http://localhost:3300/admin/edit/${id}`);
      setAdmin(res.data.user);
    //   window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

//   handle save changes
const handleSaveChanges = async (e) => {
    e.preventDefault();
    const email = admin.email;
    const fullname = admin.fullname;
   const password = admin.password
   if (newPassword !== confirmPassword) {
    alert("Password does not match");
    return;
    }
    try {
        await Axios.patch(`http://localhost:3300/admin/edit/${id}`, {
            email,
            fullname,
            password
            // password: newPassword,
            // confirmPassword: confirmPassword
        });
        const res = await Axios.get(`http://localhost:3300/admin/edit/${id}`);
        setAdmin({ ...admin, email: res.data.user.email, fullname: res.data.user.fullname });
        console.log("res.....", res.data.user);
        setNewEmail(email);
        setNewFullname(fullname);
        setNewPassword(password);
        // window.location.reload();
    } catch (error) {
        console.log(error);
    }  };

  return (
    <>
      <div className="flex flex-col items-start pt-8 pl-20">
        <h1 className="text-3xl font-semibold mb-8 text-center">
          {admin && admin.fullname}
        </h1>

        {admin && (
          <div className="flex flex-col">
            <div className="flex flex-col ">
              <img
                className="w-40 h-40 rounded-full mb-8"
                src={`http://localhost:3300/photo/${admin.username}`}
                alt=""
              />
              <form
                onSubmit={handleSubmit}
                className="flex flex-col"
                encType="multipart/form-data"
              >
                <input
                  type="file"
                  name="userpicture"
                  placeholder="Update Picture"
                />
                <button
                  type="submit"
                  className="my-7 py-2 text-xl font-semibold text-akpica-white outline-none outline-white transition-all hover:bg-akpica-pastel hover:text-zinc-800 hover:outline-2"
                >
                  Update Picture
                </button>
              </form>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <label className="w-1/4">Username:</label>
                <input
                  className="flex-1 bg-transparent text-akpica-white outline-none border-2 pl-2 py-1 opacity-40"
                  readOnly
                  type="text"
                  value={admin.username}
                />
              </div>

              <div className="flex items-center gap-4">
                <label className="w-1/4">Email:</label>
                <input
                  className="flex-1 bg-transparent text-akpica-white outline-none border-[1px] pl-2 py-1"
                  type="text"
                  value={admin.email}
                  onChange={(e) => {
                    setAdmin({ ...admin, email: e.target.value });
                  }}
                />
              </div>

              <div className="flex items-center gap-4">
                <label className="w-1/4">Full Name:</label>
                <input
                  className="flex-1 bg-transparent text-akpica-white outline-none border-[1px] pl-2 py-1"
                  type="text"
                  value={admin.fullname}
                  onChange={(e) => {
                    setAdmin({ ...admin, fullname: e.target.value });
                  }}
                />
              </div>

              <h1 className="mb-2 flex w-full items-center gap-3 border-b-2 border-cyan-50/45 p-4 text-akpica-white text-xl">Change Password</h1>

              <div className="flex items-center gap-4">
                <label className="w-1/2">New Password:</label>
                <input
                  className="bg-transparent text-akpica-white outline-none border-[1px] pl-2 py-1"
                  type={visibleNew ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                  }}
                />
                <div className="p-2" onClick={handleShowNewPassword}>
                  {visibleNew ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                </div>
              </div>

              <div className="flex items-center gap-4">
                <label className="w-1/2">Confirm New Password:</label>
                <input
                  className="bg-transparent text-akpica-white outline-none border-[1px] pl-2 py-1"
                  type={visibleConfirm ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                  }}
                />
                <div className="p-2" onClick={handleShowConfirmPassword}>
                  {visibleConfirm ? (
                    <AiOutlineEye />
                  ) : (
                    <AiOutlineEyeInvisible />
                  )}
                </div>
              </div>

              <button className="my-7 w-full py-2 text-xl font-semibold text-akpica-white outline-none outline-white transition-all hover:bg-akpica-pastel hover:text-zinc-800 hover:outline-2"
              onClick={handleSaveChanges}>
                Save Changes
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default UserProfile;
