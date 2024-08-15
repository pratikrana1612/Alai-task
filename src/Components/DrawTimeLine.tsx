import { useRef } from "react";
import { createShapeId, useEditor } from "tldraw";
interface DrawTimeLineProps {
  numEvents: number;
  isclicked: boolean;
  clickHandler: () => void;
}
export default function DrawTimeLine({
  numEvents,
  isclicked,
  clickHandler,
}: DrawTimeLineProps) {
  const editor = useEditor();
  const shapes = useRef<any[]>([]);

  const handleGenerate = () => {
    // Clear existing shapes
    console.log(shapes.current);
    editor.deleteShapes(shapes.current);
    shapes.current = [];

    const timelineLength = numEvents * 250;
    const spacing = timelineLength / +numEvents;

    // Create the timeline line (a long thin horizontal rectangle)
    createLine(editor, 50, 250, timelineLength + 250, 0);

    // Create timeline events dynamically based on user input

    for (let i = 1; i <= numEvents; i++) {
      const xPosition = i * spacing;
      if (i % 2 === 0) {
        createTextLabel(editor, `Subheading ${i}`, xPosition, 150, "m", "draw");
        createCircle(editor, xPosition + 70, 250, 5);
        createCircle(editor, xPosition + 70, 250, 3);
        createTextLabel(
          editor,
          `Description ${i}`,
          xPosition + 20,
          175,
          "s",
          "sans"
        );
        createLine(editor, xPosition + 70, 250, 0, -25);
      } else {
        createTextLabel(editor, `Subheading ${i}`, xPosition, 300, "m", "draw");
        createCircle(editor, xPosition + 70, 250, 5);
        createCircle(editor, xPosition + 70, 250, 3);
        createTextLabel(
          editor,
          `Description ${i}`,
          xPosition + 20,
          325,
          "s",
          "sans"
        );
        createLine(editor, xPosition + 70, 250, 0, 25);
      }
      // createLine(editor, xPosition, 100, 50, 0.5);
    }
    clickHandler();
  };

  // Function to create a text label
  const createTextLabel = (
    editor: any,
    text: string,
    x: number,
    y: number,
    size: string,
    font: string
  ) => {
    const shapeId = createShapeId();
    shapes.current.push(shapeId);
    editor.createShape({
      id: shapeId,
      type: "text",
      x: x,
      y: y,
      props: {
        text: text,
        size: size, // Use "small" for a smaller text size
        font: font,
      },
    });
  };

  // Function to create a line using a 'geo' shape (as a thin rectangle)

  const createLine = (
    editor: any,
    x: number,
    y: number,
    width: number,
    height: number
  ) => {
    const shapeId = createShapeId();
    shapes.current.push(shapeId);

    editor.createShape({
      id: shapeId,
      type: "arrow",
      x: x,
      y: y,
      props: {
        start: { x: 0, y: 0 },
        end: { x: width, y: height }, // Define the end point relative to start
        arrowheadStart: "none", // No arrowhead at start
        arrowheadEnd: "none", // No arrowhead at end
        color: "black",
        size: "s",
      },
    });
  };

  const createCircle = (
    editor: any,
    x: number,
    y: number,
    radius: number,
    color: string = "black"
  ) => {
    const shapeId = createShapeId();
    shapes.current.push(shapeId);

    editor.createShape({
      id: shapeId,
      type: "geo",
      x: x - radius, // Adjust x to center the circle
      y: y - radius, // Adjust y to center the circle
      props: {
        geo: "ellipse", // Use ellipse shape to create a circle
        w: radius * 2, // Width of the circle (diameter)
        h: radius * 2, // Height of the circle (diameter)
        color: color, // Color of the circle
      },
    });
  };

  if (isclicked) {
    handleGenerate();
  }
  return <></>;
}
