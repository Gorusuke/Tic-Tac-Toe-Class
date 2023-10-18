
// eslint-disable-next-line react/prop-types
export const Square = ({ children, index, isSelected, updateBoard }) => {
  const className = `square ${isSelected ? 'is-selected' : ''}`
  return (
    <div onClick={() => updateBoard(index)} className={className} >
      {children}
    </div>
  );
}