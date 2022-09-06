import { useEffect, useState } from "react";
import { getUsers, getUser, getCurrentUser } from "../utils/db";
import { isLogedIn, logInUser, logOutUser, signUpUser } from "../utils/helpers";
import Layout from "./Layout";
import Loader from "./Loader";

function Dashboard() {
  const [activeUser, setActiveUser] = useState(null);
  const [usersList, setUsersList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const activeUser = getCurrentUser();
    setActiveUser(activeUser);
    setTimeout(() => {
      setLoading(false);
    }, 200);
  }, []);

  useEffect(() => {
    if (activeUser && activeUser.role === 1) {
      const users = getUsers().filter((user) => user.role !== 1);
      setUsersList(users);
    }
  }, [activeUser]);

  return (
    <Layout>
      <div className="dashboard">
        {loading ? (
          <Loader />
        ) : (
          <div className="dashboard-container">
            <div className="welcome-container">
              {activeUser && (
                <div className="welcome-content">
                  <p className="welcome-title">
                    Welcome {activeUser.firstname} {activeUser.lastname} !
                  </p>
                </div>
              )}
            </div>
            {activeUser?.role === 1 && (
              <>
                {usersList?.length ? (
                  <div className="users-list">
                    <ul>
                      {usersList.map((user, index) => (
                        <li
                          className="userDetails-block"
                          key={`user-${index + 1}`}
                        >
                          <span className="count">{index + 1}</span>
                          <span className="firstname">{user.firstname}</span>
                          <span className="lastname"> {user.lastname}</span>
                          <span className="email"> {user.email}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <p className="no-users">No users...</p>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}

export default Dashboard;
