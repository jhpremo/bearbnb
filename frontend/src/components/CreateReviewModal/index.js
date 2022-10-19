import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import CreateReviewForm from './CreateReviewForm';

function CreateReviewFormModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button onClick={() => setShowModal(true)}>Post Review</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <CreateReviewForm setShowModal={setShowModal} />
                </Modal>
            )}
        </>
    );
}

export default CreateReviewFormModal;
