import styled from 'styled-components';

const NotificationContainer = styled.div`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  padding: 10px 20px;
  background-color: ${(props) =>
    props.type === 'error' ? '#f44336' : '#4CAF50'};
  color: white;
  border-radius: 5px;
  z-index: 9999;
`;

function Notification({ isOpen, message, type }) {
  return (
    <NotificationContainer isOpen={isOpen} type={type}>
      {message}
    </NotificationContainer>
  );
}

export default Notification;
