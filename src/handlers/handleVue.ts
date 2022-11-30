import { parse as parseVue, compileTemplate, compileScript } from "@vue/compiler-sfc";
import { getDeleteHTMLNode } from "./handleJs";
import parse from '../parse';
export function getDeleteHTMLNodeVue(code: string, index: number) {

  const { descriptor } = parseVue(code);


  // console.log(descriptor);

  // if (!descriptor.template) {
  //   return null;
  // }
  const sfcNode = descriptor.template;
  // const sfcNode = descriptor.scriptSetup
  // ? descriptor.scriptSetup.loc
  // : descriptor.script!.loc;

  const res = compileTemplate({
    id: "delete-function",
    filename: 'va.vue',
    source: descriptor.template!.content,
  });

  console.log(res);

  // const functionNode = getDeleteHTMLNode(
  //   String(index - loc.start.offset),
  //   loc.source
  // );

  // if (!functionNode) {
  //   // not found node by index
  //   return;
  // }

  // return {
  //   name: functionNode.name,
  //   start: {
  //     line: sfcNode.start.line + (functionNode.start.line - 1),
  //     column: functionNode.start.column,
  //   },
  //   end: {
  //     line: sfcNode.start.line + (functionNode.end.line - 1),
  //     column: functionNode.end.column,
  //   },
  // };
}
