import traverse from '@babel/traverse';
import parse from '../parse';

interface NodeType {
  name: string,
  start: {
    line: number,
    column: number,
    index: number
  },
  end: {
    line: number,
    column: number,
    index: number
  }
}


export function getDeleteHTMLNode(code: string, index: any): NodeType | undefined {
  let domNode;

  const ast = parse(code);

  traverse(ast, {
    /**
      * 过滤的时候需要考虑2种情况
      * 
      *  1.索引和标签同一行
      *  2.索引在标签内,需要获取到父节点，才能拿到全部索引
      * 
      *  注意：筛选结果为符合要求的最后一个始终会指向最外层的标签
    */
    // 遍历拿到所有节点，需要获取到父节点，针对于文本内容需要拿到父节点
    JSXText(path) {
      // 拿到父结点
      const variableExpressionPath = path.parentPath;

      function getDomName() {
        return (path.parentPath.node as any).openingElement.name.name;
      }

      // 获取元素所在行
      function getDomLineStart(): number {
        return Number((variableExpressionPath.node as any).loc.start.line);
      }

      function getDomLocStart() {
        return (variableExpressionPath.node as any).openingElement.loc.start;
      }

      function getDomLocEnd() {
        return (variableExpressionPath.node as any).closingElement.loc.end;
      }

      if (variableExpressionPath?.isExpression()) {
        console.log(variableExpressionPath.node);

        // 这样的判断其实没啥用，最外层到最里层其实index都在这个范围内
        if (index === getDomLineStart()) {
          domNode = {
            name: getDomName(),
            start: getDomLocStart(),
            end: getDomLocEnd()
          };
        }
      }
    }
  });
  return domNode;
}


