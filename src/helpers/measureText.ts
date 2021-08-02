let canvas: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D;

export const measureText = (text: string, font = '12px Poppins') => {
  if (!canvas || !ctx) {
    canvas = document.createElement('canvas') as HTMLCanvasElement;
    ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
  }

  ctx.font = font;
  const value = ctx.measureText(text);
  return value.width;
};
