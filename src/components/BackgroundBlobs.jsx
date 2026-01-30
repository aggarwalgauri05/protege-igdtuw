import React from 'react';

const BackgroundBlobs = ({ colors = { teal: '#20B2AA', darkTeal: '#1a9b94', accent: '#15847e' }, opacity = 0.5 }) => {
  return (
    <>
      <div className="background-blobs">
        <div 
          className="blob blob-1"
          style={{ backgroundColor: colors.teal }}
        ></div>
        <div 
          className="blob blob-2"
          style={{ backgroundColor: colors.darkTeal }}
        ></div>
        <div 
          className="blob blob-3"
          style={{ backgroundColor: colors.accent }}
        ></div>
      </div>
      
      <style jsx>{`
        .background-blobs {
          position: absolute;
          width: 100%;
          height: 100%;
          filter: blur(80px);
          opacity: ${opacity};
          z-index: 0;
          overflow: hidden;
          pointer-events: none;
        }

        .blob {
          position: absolute;
          border-radius: 50%;
          animation: blobMorph 10s ease-in-out infinite;
        }

        .blob-1 {
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, currentColor 0%, transparent 70%);
          top: 15%;
          left: 10%;
          animation-delay: 0s;
        }

        .blob-2 {
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, currentColor 0%, transparent 70%);
          bottom: 15%;
          right: 10%;
          animation-delay: -3s;
        }

        .blob-3 {
          width: 450px;
          height: 450px;
          background: radial-gradient(circle, currentColor 0%, transparent 70%);
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation-delay: -6s;
        }

        @keyframes blobMorph {
          0%, 100% {
            transform: scale(1) translate(0, 0);
            border-radius: 50% 50% 50% 50%;
          }
          25% {
            transform: scale(1.1) translate(30px, -30px);
            border-radius: 60% 40% 50% 50%;
          }
          50% {
            transform: scale(0.9) translate(-30px, 30px);
            border-radius: 50% 60% 40% 50%;
          }
          75% {
            transform: scale(1.05) translate(20px, 20px);
            border-radius: 50% 50% 60% 40%;
          }
        }

        /* Tablet Responsive */
        @media (max-width: 768px) {
          .background-blobs {
            filter: blur(70px);
          }

          .blob-1 {
            width: 350px;
            height: 350px;
          }

          .blob-2 {
            width: 280px;
            height: 280px;
          }

          .blob-3 {
            width: 300px;
            height: 300px;
          }
        }

        /* Mobile Responsive */
        @media (max-width: 480px) {
          .background-blobs {
            filter: blur(60px);
          }

          .blob-1 {
            width: 250px;
            height: 250px;
            top: 10%;
            left: 5%;
          }

          .blob-2 {
            width: 200px;
            height: 200px;
            bottom: 10%;
            right: 5%;
          }

          .blob-3 {
            width: 220px;
            height: 220px;
          }
        }

        /* Very Small Screens */
        @media (max-width: 360px) {
          .background-blobs {
            filter: blur(50px);
          }

          .blob-1 {
            width: 180px;
            height: 180px;
          }

          .blob-2 {
            width: 150px;
            height: 150px;
          }

          .blob-3 {
            width: 170px;
            height: 170px;
          }
        }
      `}</style>
    </>
  );
};

export default BackgroundBlobs;