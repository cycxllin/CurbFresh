import React from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


function DeleteItemPopup( { showDelModal, toggleDelModal, selectedManager, item } ) {

    const handleDelete = async () => {
        try{
            const send = {
                _id: item._id,
                restID: item.restID,
                name: item.name,
                description: item.description,
                image: item.image,
                price: item.price,
                soldOut: item.soldOut,
                active: item.active,
                category: item.category,
            }
            const manager = [selectedManager[0], selectedManager[1]];
            //console.log("test: " + [selectedManager[0], selectedManager[1]].length);
            const data = {
                user:  manager,
                query: send,
            }
            const url = `http://localhost:65500/items/${item._id}`;
            const response = await axios.delete(url, {data});
            //console.log("response: " + response);
            if (response.status === 200) {
                console.log("Success Delete!");
                toggleDelModal();
                alert("Item deleted successfully!");
            } else {
                // Request failed
                console.error("Error deleting item:", response.statusText);
                // Show error alert
                alert("Error deleting item: " + response.statusText);
            }
        } catch(error){
            // Network error or other exception occurred
            console.error("Error deleting item:", error.message);
            // Show error alert
            alert("Error deleting item: " + error.message);
            }
    }

    return (
        <>
            <Modal show={showDelModal} onHide={toggleDelModal}>
                <Modal.Header closeButton>
                <Modal.Title className="custom-modal-title">Warning!</Modal.Title>
                </Modal.Header>
                <Modal.Body className="custom-modal-body">Are you sure you want to remove "{item.name}" from the menu? </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={toggleDelModal}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default DeleteItemPopup;