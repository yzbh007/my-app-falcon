import React, { useEffect } from 'react';
import { Outlet } from 'react-router';
import is from 'is_js';

const App = () => {
  const HTMLClassList = document.getElementsByTagName('html')[0].classList;

  useEffect(() => {
    if (is.windows()) {
      HTMLClassList.add('windows');
    }
    if (is.chrome()) {
      HTMLClassList.add('chrome');
    }
    if (is.firefox()) {
      HTMLClassList.add('firefox');
    }
    if (is.safari()) {
      HTMLClassList.add('safari');
    }
  }, [HTMLClassList]);

  return (
    <>
      <Outlet />
    </>
  );
}

export default App;
