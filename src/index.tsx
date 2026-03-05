import VisibilityTracker from './NativeVisibilityTracker';
export { default as VisibilityView } from './components/VisibilityView';
export function multiply(a: number, b: number): number {
  return VisibilityTracker.multiply(a, b);
}
