The front-end application world is an ocean of infinite possibilities about how you want to build your application. You can make your users interact with your application in so many ways!

But some recognizable patterns are used in most of the applications. And drag and drop functionality is one of them. This knowledge can help us to make our application more user-friendly and easy to use.

Some of the common use-cases of drag0and-drop functionality are:

- Reordering items in a list
- Creating a file dropper
- Creating something like a Trello board
- Move items between lists

So you must have the proper knowledge of how to build a drag-and-drop functionality in your application.

Today we will learn exactly that. We will build a drag-and-drop functionality in our application using React Beautiful DnD.

## Why React Beautiful DnD?

There are many drag-and-drop libraries available in the market. But the reason why I chose React Beautiful DnD is because of its simplicity and ease of use.

It is a very lightweight library and is straightforward to implement in your application. It is also very customizable, and you can customize it according to your needs.

There are some other options that you can check out as well.

- [react-dnd](https://github.com/react-dnd/react-dnd) : Really popular. But it is a bit complex to use.
- [@dnd-kit/core](https://www.npmjs.com/package/@dnd-kit/core): It is a very lightweight library. But it is not as customizable as React Beautiful DnD.

## What is React Beautiful DnD?

React Beautiful DnD is a library that provides the tools to build drag-and-drop functionality in your application. It is a powerful library that provides you with many features and flexibility.

## What are we going to build?

We will build a simple drag-and-drop functionality in our application. We will have a list of items, and we will be able to drag and drop them to reorder them.

## Prerequisites

- Basic knowledge of React

And that's it! Let's get started.

## Getting Started

First, create a boilerplate ReactJS application.

```bash
npx create-react-app drag-n-drop-demo
```

Then install the dependencies.

```bash
npm install react-beautiful-dnd
```

# 1. Create a simple task list

Let's first get a simple list of tasks as our starting point.

```jsx
const initialTasks = [
  {
    id: 1,
    title: "Task 1",
  },
  {
    id: 2,
    title: "Task 2",
  },
  {
    id: 3,
    title: "Task 3",
  },
];
```

# 2. Create the context

The first step to using drag and drop functionality is to declare a particular area on the screen as droppable.

The way we do this is by creating a context. We will use this context to wrap the area on the screen where we want the drag-and-drop functionality.

```jsx
<DragDropContext onDragEnd={onDragEnd}>
  All drag-and-drop functionality happens inside this context
</DragDropContext>
```

You will notice a special function called `onDragEnd` passed into the context. We will use this function to update the state of our application.

For now, use the following code.

```jsx
const onDragEnd = (result) => {
  console.log(result);
};
```

Basically, this function will be called after a user finishes a drag-and-drop operation.

# 3. Create the droppable area

Let's create a component that will be used to wrap the area on the screen that we want to make droppable.

```jsx
<Droppable droppableId="tasks">
  {(provided) => (
    <div ref={provided.innerRef} {...provided.droppableProps}>
      { Your draggable items go here }
      {provided. placeholder} // This is a placeholder that will be used to show the space where the item will be dropped
    </div>
  )}
</Droppable>
```

The `droppableId` is a unique identifier for the droppable area. This is used to identify the area when the drag-and-drop operation is completed.

The `provided` object contains two properties.

The `innerRef` refers to the DOM element that wraps the droppable area. The `droppableProps` is a set of props that will be applied to the DOM element.

# 4. Create the draggable items

Now let's go over the task items individually and make them draggable.

```jsx
{
  tasks.map((task, index) => (
    <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div>{task.title}</div>
        </div>
      )}
    </Draggable>
  ));
}
```

The `Draggable` component takes in two props. The `draggableId` is a unique identifier for the draggable item, and the `index` is the position of the item in the list.

The `provided` object contains three properties. The `draggableProps` is a set of props that will be applied to the DOM element. The `dragHandleProps` is a set of props that will be applied to the DOM element that will be used to drag the item. The `innerRef` is a reference to the DOM element that will be used to wrap the draggable item.

Now you should have a working drag-and-drop functionality.
But you will notice that after updating the position, the items will return to their original position.

Let's solve that issue!

# 5. Update the state

The above issue occurs because the application's state is not updated when the drag-and-drop operation is completed.

Let's update the application's state when the drag-and-drop operation is completed.

```jsx
const onDragEnd = (result) => {
  if (!result.destination) return;

  const items = Array.from(tasks);
  const [reorderedItem] = items.splice(result.source.index, 1);
  items.splice(result.destination.index, 0, reorderedItem);

  setTasks(items);
};
```

The `result` object contains the `source` and `destination` properties. The `source` property includes the `index` and `droppableId` of the dragged item.

The `destination` property contains the `index` and `droppableId` of the dropped item.

# 6. Complete code

```jsx
import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const initialTasks = [
  {
    id: 1,
    title: "Task 1",
  },
  {
    id: 2,
    title: "Task 2",
  },
  {
    id: 3,
    title: "Task 3",
  },
];

function App() {
  const [tasks, setTasks] = useState(initialTasks);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(tasks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setTasks(items);
  };

  return (
    <div className="App">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="tasks">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {tasks.map((task, index) => (
                <Draggable
                  key={task.id}
                  draggableId={task.id.toString()}
                  index={index}
                >
                  {(provided) => (
                    <div
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                    >
                      <div>{task.title}</div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default App;
```

# Common issues

## 1. The draggable item is not moving

Sometimes you will notice that the items are not moving. If you open up the console, you will see some errors like the following.

`Unable to find draggable with id: 1`

This is a known issue and usually happens due to the use of `React.StrictMode` on your index.js file.

To fix this issue, you have to remove the `React.StrictMode`

So, Instead of this

```jsx
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
```

Use this

```jsx
ReactDOM.render(<App />, document.getElementById("root"));
```

This should solve the issue.

## 2. The draggable item is not moving smoothly

If you notice that the draggable item is not moving smoothly, you can try to add the following CSS to your application.

```css
.react-beautiful-dnd-draggable {
  transition: transform 0.2s;
}
```

## 2. The draggable item is not moving to the correct position

This is usually caused by the draggable item not having a height. You can fix this by adding a height to the draggable object.

## Github Repo:

## References

- [react-beautiful-dnd](https://github.com/atlassian/react-beautiful-dnd)
- [react-beautiful-dnd - Playground](https://react-beautiful-dnd.netlify.app/?path=/story/single-vertical-list--basic)
