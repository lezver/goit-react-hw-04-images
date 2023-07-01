import './ImageGallery.scss';
// import { Component } from 'react';
import { ImageGalleryItem } from 'components';
import { Search } from '../Services/Api';
import { Modal, Loader, Button } from 'components';
import Notiflix from 'notiflix';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

Notiflix.Notify.init({ fontSize: '18px' });

const search = new Search();

export const ImageGallery = ({ searchText }) => {
  const [searchData, setSearchData] = useState([]);
  const [isHidden, setIsHidden] = useState(false);
  const [dataFormModal, setDataFormModal] = useState({});
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setSearchData([]);
    search.resetPage();
    if (searchText) {
      handleSearch(searchText);
      setIsLoading(true);
    }
  }, [searchText]);

  const handleSearch = async searchText => {
    try {
      const searchData = await search.fetchImages(searchText);

      if (searchData.length) {
        const value = searchText.split('+').join(' ');
        Notiflix.Notify.success(
          `Here's what we found on your request: ${value.toUpperCase()}`
        );
        setSearchData([...searchData]);
        setIsLoading(false);
      } else {
        Notiflix.Notify.warning(
          "We're sorry, but we didn't find anything for your search..."
        );
        setIsLoading(false);
      }
    } catch (error) {
      setError(error);
    }
  };

  const handleUpdatePage = async searchText => {
    try {
      setIsLoading(true);
      const searchData = await search.fetchImages(searchText);
      setSearchData(prevState => [...prevState, ...searchData]);
      setIsLoading(false);
    } catch (error) {
      setError(error);
    }
  };

  const hiddenHandler = data => {
    if (data) {
      setIsHidden(true);
      setDataFormModal(data);
    } else {
      setIsHidden(false);
    }
  };

  const loadingMore = value => {
    search.changePage(value);
    handleUpdatePage(searchText);
  };

  return (
    <>
      {error ? (
        Notiflix.Notify.failure('Something is wrong... Try again later.')
      ) : (
        <>
          <ul className="gallery">
            <ImageGalleryItem
              searchData={searchData}
              hiddenHandler={hiddenHandler}
            />
          </ul>
          {isLoading && <Loader />}
          {searchData.length >= 12 && (
            <Button loadingMore={() => loadingMore(1)} />
          )}
          <Modal
            closeModal={hiddenHandler}
            isHidden={isHidden}
            dataFormModal={dataFormModal}
          />
        </>
      )}
    </>
  );
};

ImageGallery.propTypes = {
  searchText: PropTypes.string.isRequired,
};
