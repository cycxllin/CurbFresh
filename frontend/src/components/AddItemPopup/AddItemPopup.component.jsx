import { useState } from 'react';
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function AddItemPopup( { showAddModal, toggleAddModal, selectedManager }) {
    const [validated, setValidated] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        image: '',
        category: '',
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

        
      //Add restID to formData
      formData.restID = selectedManager[1];
      console.log(formData);
    
      //Send new menu item to backend
      try{
          const data = {
              user: [selectedManager[0], selectedManager[1]],
              query: formData
          }
          const response = await axios.post("http://localhost:65500/items", data);
          //console.log("Response:" + response );
          if (response.status === 200) {
              console.log("Success Add!");
              toggleAddModal();
              alert("Item added successfully!");
          } else {
              // Request failed
              console.error("Error adding item:", response.statusText);
              // Show error alert
              alert("Error adding item: " + response.statusText);
          }
      } catch(error) {
        if (error.response.status === 409) {
          const responseMsg = error.response.data;
          const existItem = responseMsg.data;
          //console.log(existItem);
          console.error(`Cannot add existing item: "${existItem.name}", exists as ID: ${existItem._id}`);
          alert(`Item: "${existItem.name}" already exists as item ID: ${existItem._id}`);
        }else {
          // Network error or other exception occurred
          console.error("Error adding item:", error.message);
          // Show error alert
          alert("Error adding item: " + error.message);
        }
      }
    };
    


  return (
    <>
      <Modal show={showAddModal} onHide={toggleAddModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Menu Item</Modal.Title>
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
          <Button variant="secondary" onClick={toggleAddModal}>
            Close
          </Button>
          <Button type="submit" onClick={handleSubmit} >
            Add Item
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddItemPopup;