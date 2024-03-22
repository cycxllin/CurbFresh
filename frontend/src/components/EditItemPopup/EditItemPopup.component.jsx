import { useState } from 'react';
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function EditItemPopup ( {showEditModal, toggleEditModal, selectedManager, item} ) {
    const [validated, setValidated] = useState(false);
    const [formData, setFormData] = useState({
        _id: item._id,
        restID: item.restID,
        name: item.name,
        description: item.description,
        image: item.image,
        price: item.price,
        soldOut: item.soldOut,
        category: item.category,
      });

    //Change in whatever is inputted
    const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
        ...prevData,
        [name]: value,
    }));
    };

    const handleSubmit = async (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);

        //Send updated menu item to backend
        try{
            const data = {
                user: [selectedManager[0], selectedManager[1]],
                query: formData
            }
            const url = `http://localhost:65500/items/${item._id}`;
            const response = await axios.patch(url, data);
            //console.log("Response:" + response );
            if (response.status === 200) {
                console.log("Success Update!!");
                toggleEditModal();
                alert("Item updated! successfully!");
            } else {
                // Request failed
                console.error("Error updating item:", response.statusText);
                // Show error alert
                alert("Error updating item: " + response.statusText);
            }
        } catch(error) {
            // Network error or other exception occurred
            console.error("Error updating item:", error.message);
            // Show error alert
            alert("Error updating item: " + error.message);
        }
    };

    return (
        <>
            <Modal show={showEditModal} onHide={toggleEditModal}>
            <Modal.Header closeButton>
            <Modal.Title>Edit Menu Item</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form noValidate validated={validated}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Name</Form.Label>
                <Form.Control
                    name='name'
                    required
                    type="text"
                    placeholder="Burger"
                    autoFocus
                    value={formData.name}
                    onChange={handleChange}
                />
                <Form.Control.Feedback type="invalid">Enter name</Form.Control.Feedback>
                </Form.Group>
                <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
                >
                <Form.Label>Description</Form.Label>
                <Form.Control 
                    as="textarea" 
                    rows={3} 
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                />
                <Form.Control.Feedback></Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-4" controlId="exampleForm.ControlInput1">
                <Form.Label>Price</Form.Label>
                <Form.Control
                    name="price"
                    required
                    type="number"
                    placeholder="$0.00"
                    autoFocus
                    value={formData.price}
                    onChange={handleChange}
                />
                <Form.Control.Feedback></Form.Control.Feedback>
                </Form.Group>
                    <Form.Group className="position-relative mb-3">
                    <Form.Label>Item Image</Form.Label>
                    <Form.Control
                    type="file"
                    /*required*/
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    />
                    <Form.Control.Feedback></Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Item Category: </Form.Label>
                    <Form.Control 
                    as="select" 
                    required name="category"
                    value={formData.category}
                    onChange={handleChange}
                    >
                    <option value="Starters">Starters</option>
                    <option value="Specials">Specials</option>
                    <option value="Salads">Salads</option>
                    <option value="Soups">Soups</option>
                    <option value="Handhelds">Handhelds</option>
                    <option value="Mains">Mains</option>
                    <option value="Sides">Sides</option>
                    <option value="Desserts">Desserts</option>
                    <option value="Drinks">Drinks</option>
                    <option value="Other">Other</option>
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">Select a category</Form.Control.Feedback>
                </Form.Group>
                
            </Form>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={toggleEditModal}>
                Cancel
            </Button>
            <Button type="submit" onClick={handleSubmit} >
                Save Changes
            </Button>
            </Modal.Footer>
        </Modal>
        </>
    )
}

export default EditItemPopup;