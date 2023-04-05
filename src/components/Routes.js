import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { Results } from './Results';

export const RoutesPage = () => (
  <div className='p-4'>
    <Routes>
      <Route path='/search' element={<Results />} />

      <Route path='/images' element={<Results />} />

      <Route path='/videos' element={<Results />} />
    </Routes>
  </div>
);
