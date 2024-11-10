import { makeScene2D, Node, Circle } from "@motion-canvas/2d";
import {
  beginSlide,
  cancel,
  createRef,
  easeInOutCubic,
  PlaybackState,
  remap,
  TimingFunction,
  useScene,
  Vector2,
  waitFor,
} from "@motion-canvas/core";

export default makeScene2D(function* (view) {
  const myCircle = createRef<Circle>();

  yield* waitForSlide(1, "slide1");

  view.add(<Circle ref={myCircle} size={50} fill="red" />);

  yield* waitForSlide(1, "slide2");

  yield* stretchMove(myCircle(), 0, 500, 1);
});

function* waitForSlide(duration: number, name: string) {
  if (useScene().playback.state !== PlaybackState.Presenting) {
    yield* waitFor(duration);
  }
  yield* beginSlide(name);
}

function* stretchMove<T extends Node>(
  node: T,
  x: number,
  y: number,
  duration: number,
  timingFunction: TimingFunction = easeInOutCubic
) {
  const direction = new Vector2(x - node.x(), y - node.y()).normalized;
  const goalScale = direction.add(1);

  yield node.scale(
    goalScale,
    duration,
    (t) => 2 * remap(0, 1, 0, 0.5, timingFunction(t))
  );
  yield node.position([x, y], duration, timingFunction);
  yield* waitFor(duration * 0.5);
  yield* node.scale(
    [1, 1],
    duration * 0.5,
    (t) => 2 * (remap(0, 1, 0.5, 1, timingFunction(t)) - 0.5)
  );
}
