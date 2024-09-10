import React, { useState, useRef, useEffect } from 'react';
import Webcam from 'react-webcam';
import { Camera } from 'lucide-react';

const initialImages = [
  { id: 1, url: '/placeholder.svg?height=600&width=400', user: 'Alice', timestamp: new Date().toISOString() },
  { id: 2, url: '/placeholder.svg?height=600&width=400', user: 'Bob', timestamp: new Date().toISOString() },
  { id: 3, url: '/placeholder.svg?height=600&width=400', user: 'Charlie', timestamp: new Date().toISOString() },
];

export default function InstantCameraSharingApp() {
  const [images, setImages] = useState(initialImages);
  const [stream, setStream] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    startCamera();
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (error) {
      console.error('Không thể truy cập camera:', error);
    }
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      const video = videoRef.current;

      canvasRef.current.width = video.videoWidth;
      canvasRef.current.height = video.videoHeight;

      context.drawImage(video, 0, 0, canvasRef.current.width, canvasRef.current.height);

      const imageUrl = canvasRef.current.toDataURL('image/jpeg');

      setImages(prevImages => [
        ...prevImages,
        {
          id: prevImages.length + 1,
          url: imageUrl,
          user: 'Me',
          timestamp: new Date().toISOString()
        }
      ]);
    }
  };

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
  };

  return (
    <div className="container mx-auto bg-gray-100 h-full flex flex-col items-center justify-center">
      <div className="space-y-4 overflow-y-auto flex flex-col items-center">
        <Webcam
          audio={false}
          height={720}
          ref={videoRef}
          screenshotFormat="image/jpeg"
          width={1280}
          videoConstraints={videoConstraints}
        />
        <button onClick={captureImage} className="bg-pink-500 text-white px-4 py-2 rounded-lg flex items-center">
          <Camera className="mr-2 h-5 w-5" /> Chụp Ảnh
        </button>
        <canvas ref={canvasRef} style={{ display: 'none' }} width="640" height="480" />
        {images.map(image => (
          <div key={image.id} className="bg-white p-4 rounded-lg shadow-md border border-pink-200 max-w-2/3">
            <img src={image.url} alt={`Uploaded by ${image.user}`} className="w-full object-cover rounded-lg mb-4 cursor-pointer" />
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-pink-300 rounded-full flex items-center justify-center text-white font-bold">
                  {image.user[0]}
                </div>
                <span className="font-semibold text-pink-500">{image.user}</span>
              </div>
              <time className="text-sm text-gray-500">{new Date(image.timestamp).toLocaleString()}</time>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
