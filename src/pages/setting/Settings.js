
import { useAuth } from '../../hooks';
import { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import {
  Post,
  Loader,
  CreatePost,
  Sidebar,
  Rightbar,
  Chat,
} from '../../components';
import './setting.css';
const Settings = () => {
  const auth = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(auth.user?.name ? auth.user.name : '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [savingForm, setSavingForm] = useState(false);

  const clearForm = () => {
    setPassword('');
    setConfirmPassword('');
  };

  const updateProfile = async () => {
    setSavingForm(true);

    let error = false;
    if (!name || !password || !confirmPassword) {
      console.log('Please fill all the fields ');
      error = true;
    }

    if (password !== confirmPassword) {
      console.log('password and confirmPassword not matched');
      error = true;
    }

    if (error) {
      return setSavingForm(false);
    }

    const response = await auth.updateUser(
      auth.user._id,
      name,
      password,
      confirmPassword
    );

    // console.log('settings response', response);

    if (response.success) {
      setEditMode(false);
      clearForm();
      console.log('user updated successfully');
    } else {
      console.log('not updated ');
    }

    setSavingForm(false);
  };

  return (
    <>
      <Navbar />
      <div className="homeContainer">
        <div className="leftPart">
          <div className="setting">
            <div className="imgContainer">
              <img
                src="https://cdn-icons-png.flaticon.com/512/7669/7669149.png"
                alt=""
              />
            </div>

            <div className="field">
              <div className="label">Email</div>
              <div className="labelValue">{auth.user?.email}</div>
            </div>

            <div className="field">
              {!editMode && (
                <>
                  <div className="label">Name</div>
                  <div className="labelValue">{auth.user?.name}</div>
                </>
              )}
            </div>

            {editMode && (
              <>
                <div className="field">
                  <div className="label">Name</div>
                  <input
                    className="texting"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <div className="label">Password</div>
                  <input
                    className="texting"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className="field">
                  <div className="label">Confirm Password</div>
                  <input
                    className="texting"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </>
            )}

            <div className="btnGrp">
              {editMode ? (
                <>
                  <button
                    className="saveBtn"
                    onClick={updateProfile}
                    disabled={savingForm}
                  >
                    {savingForm ? 'Saving profile...' : 'Save profile'}
                  </button>
                  <button
                    className="goBack"
                    onClick={() => setEditMode(false)}
                  >
                    Go back
                  </button>
                </>
              ) : (
                <button
                className="editBtn"
                  onClick={() => setEditMode(true)}
                >
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="rightPart">
          <Rightbar />
        </div>
      </div>
    </>
  );
};

export { Settings };
