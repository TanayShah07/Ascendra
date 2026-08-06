import "./EditProfileModal.css";
import { useState } from "react";

const EditProfileModal = ({
    user,
    onClose,
    onSave
}) => {

    const [form, setForm] = useState({

        full_name: user.full_name || "",

        college: user.college || "",

        branch: user.branch || "",

        graduation_year: user.graduation_year || "",

        bio: user.bio || ""

    });

    const handleChange = (e) => {

        setForm({

            ...form,

            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = () => {

        onSave(form);

    };

    return (

        <div className="modal-overlay">

            <div className="profile-modal">

                <h2>Edit Personal Information</h2>

                <input
                    name="full_name"
                    placeholder="Full Name"
                    value={form.full_name}
                    onChange={handleChange}
                />

                <input
                    name="college"
                    placeholder="College"
                    value={form.college}
                    onChange={handleChange}
                />

                <input
                    name="branch"
                    placeholder="Branch"
                    value={form.branch}
                    onChange={handleChange}
                />

                <input
                    name="graduation_year"
                    placeholder="Graduation Year"
                    value={form.graduation_year}
                    onChange={handleChange}
                />

                <textarea
                    name="bio"
                    placeholder="Bio"
                    rows={4}
                    value={form.bio}
                    onChange={handleChange}
                />

                <div className="modal-buttons">

                    <button
                        className="cancel-btn"
                        onClick={onClose}
                    >
                        Cancel
                    </button>

                    <button
                        className="save-btn"
                        onClick={handleSubmit}
                    >
                        Save
                    </button>

                </div>

            </div>

        </div>

    );

};

export default EditProfileModal;