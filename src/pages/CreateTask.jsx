import FormInput from "../components/FormInput";
import ForimTextArea from "../components/ForimTextArea";
import { useColoction } from "../hooks/useColoction";
import Select from "react-select";
import { useEffect, useState } from "react";
import { addDoc, collection,serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/config";
import { useNavigate } from "react-router-dom";

export default function CreateTask() {
  const navigete = useNavigate();
  const { data } = useColoction("users");
  const [userOptions, setUserOptions] = useState([]);
  const [attachedUsers, setAttachedUsers] = useState([]);

  useEffect(() => {
    if (data) {
      const users = data.map((user) => ({
        value: user.uid,
        label: user.displayName,
        photoURL: user.photoURL,
      }));
      setUserOptions(users);
    }
  }, [data]);

  const handelSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const title = formData.get("title");
    const description = formData.get("description");
    const dueTo = formData.get("dueTo");

    const tasks = {
      title,
      description,
      dueTo,
      attachedUsers,
      comments: [],
        timestamp: serverTimestamp(),

    };

    await addDoc(collection(db, "tasks"), {
      ...tasks,
    }).then(() => {
      alert("Qoshildi");
      navigete("/");
    });
  };

  return (
    <div className="create-container">
      <div className="create-card">
        <h2 className="form-title"> Create New Task</h2>
        <form onSubmit={handelSubmit} method="post" className="task-form">
          {/* Title */}
          <FormInput label="Title" name="title" type="text" />
          <br />

          {/* Description */}
          <ForimTextArea label="Description" name="description" />
          <br />

          {/* Due Date */}
          <FormInput label="Due To" name="dueTo" type="date" />
          <br />

          {/* Users select */}
          <div className="form-group">
            <label>Assign Users</label>
            <Select
              isMulti
              options={userOptions}
              value={attachedUsers}
              onChange={(selected) => setAttachedUsers(selected || [])}
              placeholder="Userlarni tanlang ..."
              className="basic-multi-select"
              classNamePrefix="select"
              getOptionValue={(opt) => opt.value}
              getOptionLabel={(opt) => opt.label}
              formatOptionLabel={(opt) => (
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  {opt.photoURL && (
                    <img
                      src={opt.photoURL}
                      alt={opt.label}
                      width={24}
                      height={24}
                      style={{ borderRadius: "50%" }}
                    />
                  )}
                  {opt.label}
                </div>
              )}
            />
          </div>

          <br />
          <button type="submit" className="create-btn">
            Create Task
          </button>
        </form>
      </div>
    </div>
  );
}
