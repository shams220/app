import React from 'react';
import Navbar from '../../navbar';
import Particles from '../../src/pages/landing/lanfing.js/Particles/Particles'

import './admin.css';

const Admin = () => {
  return (
    <div className="admin-page">
      {/* Background layer */}
      {/* <div className="waves-bg">
        <Waves style={{ width: '100%', height: '100%' }} />
      </div> */}

<div className='pBg'>

  <Particles  style={{ width: '100%', height: '100%' }} />
</div>
      {/* Foreground layer */}
      <div className="admin-content">
        <Navbar />
        <h1>Admin</h1>
      </div>
    </div>
  );
};

export default Admin;
