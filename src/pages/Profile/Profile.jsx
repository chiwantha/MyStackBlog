import { useContext } from "react";
import StackButton from "../../components/StackButton";
import { AuthContext } from "../../context/authContext";

const Profile = () => {
  const { userlogout, currentUser } = useContext(AuthContext);
  return (
    <div className="my-3 space-y-6" style={{ flex: 4 }}>
      <div className="text-white">Profile</div>
      <div className="text-3xl text-white">{currentUser.name}</div>
      <div
        className=""
        onClick={() => {
          userlogout();
        }}
      >
        <StackButton label={"Logout"} />
      </div>
    </div>
  );
};

export default Profile;
