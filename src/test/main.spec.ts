import { test, expect } from 'vitest';
import { getDomNode } from '../main';

test.only('JSXText', () => {
  const code =
    `<div>
    <ul>
      <li></li>
    </ul>
  </div>`;

  const index = 3;

  const domNode = getDomNode(code, index);

  console.log('------------------');

  console.log(domNode);


  expect(domNode).toEqual({
    name: 'ul',
    start: {
      column: 4,
      index: 10,
      line: 2,
    },
    end: {
      column: 9,
      index: 43,
      line: 4,
    }
  });

});