import './input.css'

export const Input = ({ search, handleChange }) => {
    return (
        <input 
          className='searchbar'
          onChange={handleChange}
          value={search}
          type='search'
        />
    )
}