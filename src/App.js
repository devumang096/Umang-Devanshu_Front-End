import React, { useState, useEffect, memo } from 'react';
import PropTypes from 'prop-types';
//style
const listItemStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '10px',
  backgroundColor: 'red',
  border: '1px solid black',
  borderRadius: '5px',
  marginBottom: '5px',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease-in-out',
};
//css style
const selectedStyles = {
  backgroundColor: 'green',
  color: 'white',
};

const textStyles = {
  margin: 0,
};

// Single List Item
const SingleListItem = memo(({ index, isSelected, onClickHandler, text }) => (
  <li
    style={{
      ...listItemStyles,
      ...(isSelected ? selectedStyles : null),
    }}
    onClick={() => onClickHandler(index)}//modified
  >
    <p style={textStyles}>{text}</p>
    {isSelected && <span>&#10003;</span>}
  </li>
));

SingleListItem.propTypes = {
  index: PropTypes.number.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onClickHandler: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

// List Component
const List = memo(({ items }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  useEffect(() => {
    setSelectedIndex(null);
  }, [items]);

  const handleClick = (index) => {
    setSelectedIndex(index);
  };

  return (
    <ul style={{ textAlign: 'left', listStyle: 'none', padding: 0 }}>
      {items.map(({ text }, index) => (
        <SingleListItem
          key={index}
          onClickHandler={() => handleClick(index)}
          text={text}
          index={index}
          isSelected={selectedIndex === index}
        />
      ))}
    </ul>
  );
});

List.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
    })
  ),
};

List.defaultProps = {
  items: [
    { text: 'My fullname is Umang Dvenashu,I am pre-final year undergrad student who loves to explore new technologies and looking for opportunities where mystrategic work and knowledge could be best subjected. I am patient and determined which helped me to build my problem solving skills and being a good human' },
    { text: 'Skills: C++,HTML,ReactJS,AngularJS,Git,GitHub,VCS,NodeJS,Express,DSA,DBMS,OS' },
    { text: `Achievements: University Cultural Event- Winner of University mega Cultural Fest ONE INDIA Event(Team
    Participation and Runner Up of University Youth Festival SPECTRA Event(Team Participation).`},
    { text: `Experience: Technical Coordinator at DotQuestionmark where i have
    worked as a Technical Coordinator in this community to explore and learn
    different tech stacks.Learnt basic linux commands,some insights of data
    prediction models and devops `},
    { text: 'Contact Details: mailto: devumang096@gmail.com' },
  ],
};

export default List;
