import React from 'react';

export default function Info(props) {
  return (
    <div className="info">
      <i className="fas fa-info-circle" data-toggle="collapse" data-target="#information"></i>
      <div className="collapse info-text" id="information">
        <h5 className="m-0 p-3">PPAL helps plan workout routines; sign-in to get started!</h5>
      </div>
    </div>
  );
}
