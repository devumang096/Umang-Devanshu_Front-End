
# Steeleye Assignment
 
### 1.Explain what the simple List component does.

The simple `List` component is a basic React component that displays a list of items on a webpage. It takes an array of items as a prop and renders a list item for each element in the array.

Here's an example of how to use the `SimpleList component` in a simple app.js code.

```javascript
import React from 'react';
import SimpleList from './SimpleList';

function App() {
  const items = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
    { id: 3, name: 'Item 3' },
  ];

  return (
    <div>
      <h1>My List</h1>
      <SimpleList items={items} />
    </div>
  );
}

export default App;
```

### 2.What problems / warnings are there with code?

- In the `SingleListItem` component, the onClick event handler is passed the result of onClickHandler(index) instead of a function. This means that the `onClick event` will be immediately triggered when the component is rendered. To fix this, change 
```
onClick={onClickHandler(index)} to onClick={() => onClickHandler(index)}.
```

- The key `prop`, which React requires when rendering a list of elements, has been removed from the `SingleListItem` component. This will result in a warning and could impact the rendering's performance and accuracy.

- The items prop's default value in the `WrappedListComponent` component is set to `null`, which is inconsistent with the anticipated structure of the items prop. Change the elements' default value to an `empty array[]`.

- In the `WrappedListComponent` component, the items `prop` is declared as an array of objects with a `text property`, but the array `prop type` is used instead of `arrayOf`. To fix this, change `PropTypes.array` to `PropTypes.arrayOf`.

- In the `WrappedListComponent` component, the state hook `useState` is called with `no initial value`. This means that the initial value of `selectedIndex` will be `undefined`, which can cause unexpected behavior. To fix this, add an initial value to useState like so: 
```
const [selectedIndex, setSelectedIndex] = useState(null);
```
- The `WrappedListComponent` component does not handle the case when the items `prop` is `null` or `undefined`. This will cause an `error` when trying to `map over the items array`.


### 3.Please fix, optimize, and/or modify the component as much as you think is necessary.

- It should have a default value since index is not a necessary prop for the WrappedSingleListItem component:

```
WrappedSingleListItem.defaultProps = {
  index: 0,
};
```

- Instead of using the index itself, onClickHandler in WrappedSingleListItem should be called with a function that returns the index:

```
onClick={onClickHandler(() => index)}
```
- The default value for the items parameter in the WrappedListComponent should be an empty array, not null:

```
WrappedListComponent.defaultProps = {
  items: [],
};

```

- The onClickHandler function in the WrappedListComponent should be declared outside the render method so that it isn't repeated each time the component is rendered:

```javascript
const handleClick = index => {
  setSelectedIndex(index);
};

return (
  <ul style={{ textAlign: 'left' }}>
    {items.map((item, index) => (
      <SingleListItem
        onClickHandler={() => handleClick(index)}
        text={item.text}
        index={index}
        isSelected={selectedIndex === index}
        key={index} // add key prop to avoid warning
      />
    ))}
  </ul>
);

```
- The memo function should be called on the function returning the component in WrappedSingleListItem, not on the component itself.

```
const SingleListItem = memo((props) => <WrappedSingleListItem {...props} />);

```

## Modified code
```javascript
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
    onClick={() => onClickHandler(index)} 
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
```
# Check the Project 
GitHub Repo Link -https://github.com/devumang096/UmangDevanshu_Front-End
---
---

## <a href="https://devumang096.github.io/Umang-Devanshu_Front-End/" target="_blank">Live Website</a>

