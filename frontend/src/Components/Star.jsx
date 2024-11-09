import React, { useState } from 'react';
import axios from 'axios';
import { Button, Modal } from 'antd';
import { useContext } from 'react';
import { DataContext } from '../context/DataProvider'; // Import DataContext

const Star = ({ clubId }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [starred, setStarred] = useState(false); // State to track the starred status
  
  // Accessing the user email from the DataContext
  const { account } = useContext(DataContext); // Assuming account object contains email
  const userEmail = account ? account.email : ''; // Safely accessing email from account

  // Function to handle the "Star this Club" button click
  const handleStarClick = async () => {
    try {
      // Show overlay or modal with "Star this Club" button
      setIsModalVisible(true);
    } catch (error) {
      console.error("Error showing star modal", error);
    }
  };

  const handleSubmit = async () => {
    try {
      if (!userEmail) {
        console.error("User not logged in!");
        return;
      }

      // Make POST request to backend to star/unstar the club
      const response = await axios.post('http://localhost:8000/star-club', {
        clubId,
        email: userEmail, // Sending the user's email with the request
      });

      if (response.data.success) {
        setStarred(response.data.starred); // Update the UI based on the response
        setIsModalVisible(false); // Close the modal after successful action
      } else {
        console.error('Error starring the club');
      }
    } catch (error) {
      console.error('Error in submitting star/unstar request', error);
    }
  };

  return (
    <div>
      <Button onClick={handleStarClick}>
        {starred ? 'Unstar this Club' : 'Star this Club'}
      </Button>

      {/* Modal for confirming the star action */}
      <Modal
        title={starred ? "Unstar this Club" : "Star this Club"}
        visible={isModalVisible}
        onOk={handleSubmit}
        onCancel={() => setIsModalVisible(false)}
      >
        <p>{starred ? 'Are you sure you want to unstar this club?' : 'Do you want to star this club?'}</p>
      </Modal>
    </div>
  );
};

export default Star;
