import { randomInteger } from "@/utils/functions";
import { ReactElement } from "react";

export type TSvgData = {
  path: string;
  length: number;
};

export function GetSVGPaths(param: SVGSVGElement): TSvgData[] {
  const result: TSvgData[] = [];
  if (param) {
    result.length = 0;
    let svg_data: TSvgData = { path: "", length: 0 };

    const svg_Object = (param as unknown as ReactElement).props.children;
    //console.log(svg_Object);
    Object.keys(svg_Object).forEach((item) => {
      if (item) {
        svg_data = { path: "", length: 0 };
        let tmp_path = svg_Object[item].props.d;

        if (tmp_path) {
          svg_data.path = tmp_path;
          svg_data.length = tmp_path.length * randomInteger(2, 3);
          result.push(svg_data);
        }
      }
    });
  }
  return result;
}
