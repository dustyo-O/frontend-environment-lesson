import { helloWorld } from './hello-world';

test('hello, world', () => {
  expect(helloWorld('world')).toBe('Hello, world');
});
