import { useSelector } from "react-redux";
import useLogaut from "../hooks/useLogaut";
import { useColoction } from "../hooks/useColoction";
import { Link } from "react-router-dom";

export default function Home() {
  const { _logout, error, isPeding } = useLogaut();
  const { user } = useSelector((store) => store.user);
  const { data } = useColoction("users");
  const { data: tasks } = useColoction("tasks",'desc');

  return (
    <div className="dashboard">
      {/* Navbar */}
      <nav className="navbar">
        <h2 className="logo">TaskManager</h2>
        <div className="nav-right">
          <span className="welcome">Hello, {user.displayName}</span>
          <img className="avatar" src={user.photoURL} alt="" />
          {error && <div className="error">{error}</div>}
          <button onClick={_logout} disabled={isPeding} className="logout-btn">
            {isPeding ? "Loading..." : "Logout"}
          </button>
        </div>
      </nav>

      {/* Main content */}
      <div className="main">
        {/* Users list */}
        <div className="card users-card">
          <h3>Users</h3>
          {data &&
            data.map((u) => (
              <div key={u.uid} className="user">
                <img className="user-avatar" src={u.photoURL} alt="" />
                <span className="user-name">{u.displayName}</span>
                {u.online ? (
                  <span className="status online">● Online</span>
                ) : (
                  <span className="status offline">● Offline</span>
                )}
              </div>
            ))}
        </div>

        {/* Tasks list */}
        <div className="card tasks-card">
          <div className="tasks-header">
            <h3>Tasks</h3>
            <Link to="/Create" className="create-btn">
              + Create Task
            </Link>
          </div>
          <ul className="tasks-list">
            {tasks &&
              tasks.map((task) => (
                <li key={task.uid} className="task">
                  <Link to={`/task/${task.uid}`} className="task-link">
                    <h4>{task.title}</h4>
                    <div className="task-users">
                      {task.attachedUsers?.map((user, i) => (
                        <img
                          key={user.value || i}
                          className="task-user-avatar"
                          src={user.photoURL}
                          alt={user.label}
                        />
                      ))}
                    </div>
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
