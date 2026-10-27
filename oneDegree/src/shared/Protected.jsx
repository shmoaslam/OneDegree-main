import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {  ScaleLoader } from 'react-spinners';

const Protected = (props) => {
  const { Components } = props;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLogin = localStorage.getItem('admin');
    const timer = setTimeout(() => {
      if (!checkLogin) {
        navigate('/');
      }
      setLoading(false);
    }, 1000); 

    return () => clearTimeout(timer);
  }, [navigate]);

  if (loading) {
 
    return <div className='flex justify-center items-center h-[100vh]'><ScaleLoader /></div>;
  }

  return (
    <div>
      <Components />
    </div>
  );
};

export default Protected;
