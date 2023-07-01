import './Searchbar.scss';
import Notiflix from 'notiflix';
import { FiSearch } from 'react-icons/fi';
import PropTypes from 'prop-types';

Notiflix.Notify.init({ fontSize: '18px' });

export const Searchbar = ({ search }) => {
  const handleForm = e => {
    e.preventDefault();

    const { value } = e.currentTarget.elements[1];

    value === ''
      ? Notiflix.Notify.info('Sorry, but the search is empty.')
      : search(value.trim().split(' ').join('+'));

    e.currentTarget.reset();
  };
  return (
    <header className="searchbar">
      <form className="form" onSubmit={handleForm}>
        <button type="submit" className="button">
          <FiSearch size={24} />
        </button>

        <input
          className="input"
          name="search"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  search: PropTypes.func.isRequired,
};
