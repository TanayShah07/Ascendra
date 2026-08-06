import "./EditGoalsModal.css";
import { useState } from "react";

const EditGoalsModal = ({
    user,
    onClose,
    onSave
}) => {

    const [form, setForm] = useState({

        dream_company: user.dream_company || "",

        target_role: user.target_role || "",

        preferred_domain: user.preferred_domain || ""

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

                <h2>

                    Edit Placement Goals

                </h2>

                <input

                    name="dream_company"

                    placeholder="Dream Company"

                    value={form.dream_company}

                    onChange={handleChange}

                />

                <input

                    name="target_role"

                    placeholder="Target Role"

                    value={form.target_role}

                    onChange={handleChange}

                />

                <input

                    name="preferred_domain"

                    placeholder="Preferred Domain"

                    value={form.preferred_domain}

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

export default EditGoalsModal;