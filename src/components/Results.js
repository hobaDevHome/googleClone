import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReactPlayer from 'react-player';

import { useStateContext } from '../context/StateContextProvider';
import { Loading } from './Loading';

export const Results = () => {
  const { results, loading, getResults, searchTerm } = useStateContext();
  const location = useLocation();

  useEffect(() => {
    if (searchTerm !== '') {
      if (location.pathname === '/videos') {
        getResults(`/search?query=${searchTerm} videos`);
      } else if (location.pathname === '/images') {
        getResults(`/imagesearch?query=${searchTerm}`);
      } else {
        getResults(`/search?query=${searchTerm}&num=10`);
      }
    }
  }, [searchTerm, location.pathname]);

  if (loading) return <Loading />;

  switch (location.pathname) {
    case '/search':
      return (
        <div className='sm:px-56 flex flex-wrap justify-between space-y-6'>
          {results?.items?.map((item, index) => (
            <div key={index} className='md:w-2/5 w-full'>
              <a href={item.link} target='_blank' rel='noreferrer'>
                <p className='text-sm'>
                  {item.link.length > 30
                    ? item.link.substring(0, 30)
                    : item.link}
                </p>
                <p className='text-lg hover:underline dark:text-blue-300 text-blue-700  '>
                  {item.title}
                </p>
              </a>
            </div>
          ))}
        </div>
      );
    case '/images':
      return (
        <div className='flex flex-wrap justify-center items-center'>
          {results?.items?.map((item, index) => (
            <a
              href={item.contextLink}
              target='_blank'
              key={index}
              rel='noreferrer'
              className='sm:p-3 p-5'
            >
              <img
                src={item?.thumbnailImageUrl}
                alt={item.title}
                loading='lazy'
              />
              <p className='sm:w-36 w-36 break-words text-sm mt-2'>
                {item.title}
              </p>
            </a>
          ))}
        </div>
      );

    case '/videos':
      return (
        <>
          <div className='flex flex-wrap '>
            {results?.items?.map((video, index) => {
              return (
                <div key={index} className='p-2'>
                  <ReactPlayer
                    config={{
                      youtube: {
                        playerVars: { showinfo: 1 },
                      },
                      facebook: {
                        appId: '12345',
                      },
                    }}
                    url={video.additional_links?.[0].href}
                    controls
                    width='640'
                    height='360'
                  />
                </div>
              );
            })}
          </div>
        </>
      );
    default:
      return 'Error...';
  }
};
