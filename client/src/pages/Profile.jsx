import Login from '@components/Common/Login';
import Signup from '@components/Common/Signup';
import React, { useState } from 'react';

const Profile = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md">
      

        {isLogin ? <Login setIsLogin={setIsLogin}/> : <Signup setIsLogin={setIsLogin} />}
      </div>
    
    </div>
  );
};

export default Profile;
