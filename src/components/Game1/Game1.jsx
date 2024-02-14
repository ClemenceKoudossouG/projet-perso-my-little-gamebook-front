import './Game1.scss';

function Game1() {
  return (
    <div
      className="image-container"
      style={{ backgroundImage: `url(${imageURL})`, position: 'relative' }}
    >
      <img
        src="/path/to/overlay-image.png"
        alt="Overlay"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 1,
        }}
      />

      <p
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          color: 'white',
          zIndex: 2,
        }}
      >
        Votre texte ici
      </p>

      <div
        style={{
          position: 'absolute',
          bottom: '20px',
          right: '20px',
          zIndex: 2,
        }}
      >
        <button style={{ marginRight: '10px' }}>Action 1</button>
        <button>Action 2</button>
      </div>
    </div>
  );
}

export default Game1;
