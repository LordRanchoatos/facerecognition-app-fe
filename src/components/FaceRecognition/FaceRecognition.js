import React from 'react';
import './FaceRecognition.css';


const FaceRecognition = ({ imageUrl, boxes, noOfFaces }) => {
  const faceDiv = boxes.map((box) => 
    <div className='bounding-box' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
  )

  return (
    <div className='center ma'>
      <div className='absolute mt2'>
        <img id='inputImage' alt='' src={imageUrl} width='500px' height='auto'/>
        {faceDiv}
      </div>
        <div><h1>{noOfFaces? `${noOfFaces} faces`: null}</h1></div>
    </div>
  );
}

export default FaceRecognition;