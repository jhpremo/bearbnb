import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import DeleteSpotForm from './DeleteSpotForm.jsx';

function DeleteSpotFormModal() {
    const [showModal, setShowModal] = useState(false);
    return (
        <>
            <button onClick={() => setShowModal(true)}>Delete</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <DeleteSpotForm setShowModal={setShowModal} />
                </Modal>
            )}
        </>
    );
}

export default DeleteSpotFormModal
