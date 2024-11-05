export default {
  grid: read(`
    svg {
      viewBox: .5 .5 10 10;
      stroke: #1B2D37;
      stroke-width: .04;

      circle*10x10 {
        fill: @p(yellow, blueviolet, deeppink);
        cx, cy: @nx, @ny;
        r: @r(.05, .48);
        style animation: scale @r(2s) reverse;
      }

      style {
        @keyframes scale {
          to { r: 0 }
        }
      }
    }
  `),

  basic: read(`
    svg {
      viewBox: 0 0 10 10;
      stroke: #000;
      stroke-width: .1;
      circle {
        fill: deepskyblue;
        cx: 4;
        cy: 4;
        r: 3
      }
      rect {
        width: 1;
        height: 1;
        fill: yellow;
        transform: translate(8.5 7.8) rotate(45);
      }
      rect {
        width: 10;
        height: 10;
        fill: none;
      }
    }
  `),

  snowflake: read(`
    svg {
      viewBox: -50 -50 100 100;
      stroke-linecap: round;
      stroke: #000;

      path*6 {
        transform: rotate(@n(*60));
        d: M 0 0 0 44
           @M2x3(M 0 @ny(* -9)
                 L @pn(±9) $(-10*@ny - 5.8));
      }
    }
  `),

  wavy: read(`
    svg {
      viewBox: -58 -57 114 114;
      stroke-width: .15;
      stroke: #1B2D37;
      fill: #D5F1FF;
      circle*720 {
        r: $(sin(π/@N*@n)*10);
        cx, cy: @Plot(
          r: 40+sin(4t)*5+sin(12t)*5
        );
      }
    }
  `),

  flower: read(`
    svg {
      viewBox: 0 0 10 10.1;
      stroke: #000;
      stroke-width: .1;
      stroke-dasharray: 100;
      stroke-linecap: round;

      path*3 {
        style animation: move @r(2s, 4s) reverse;
        fill: none;
        d: @pn(M 5 10 Q 5 5 8 1,
               M 5 10 Q 4 5 2 4,
               M 5 10 Q 6 6 8 4);
      }
      circle*3 {
        style animation: scale @r(1s, 2s) reverse;
        fill: @pn(yellow, blueviolet, deeppink);
        cx, cy: @pn(8 1, 2 4, 8 4);
        r: @r(.2, .5);
      }

      style {
        @keyframes move {
          to { stroke-dashoffset: 100 }
        }
        @keyframes scale {
          to { r: 0 }
        }
      }
    }
  `),

  star: read(`
    svg {
      viewBox: -50 -50 100 100;
      polygon {
        stroke: #000;
        points: @m10.@Plot(
          r: seq(20, 40);
          rotate: 18;
        );
        fill: defs linearGradient {
          gradientTransform: rotate(30);
          stop { offset: 50%; stop-color: deeppink }
          stop { offset: 100%; stop-color: yellow }
        }
      }
    }
  `),

  '99 bottles of beer': read(`
    svg {
      viewBox: 0 0 16 $(99*5);
      overflow: visible;
      style max-height: inherit;
      foreignObject {
        width, height: 100%;
        font-size: 1;
        style line-height: 1;
        p*99-1 {
          content: \`
            @n bottles of beer on the wall, <br />
            @n bottles of beer. <br />
            Take one down and pass it around, <br />
            @n(-1) bottles of beer on the wall.
          \`;
        }
      }
    }
  `),

  'window pattern': read(`
    svg {
      viewBox: 0 0 200 200 padding 20;
      fill: none;
      stroke: #1B2D37;
      stroke-width: 3;
      stroke-linecap: square;

      path {
        d:
          M 0 0 h 200 v 200 h -200 z
          M 100 5
           @p(@p(@p(h-43 v5 h-10 v-5 h-10 v16 h-32 v10 h10 v-26 h-10)
              @flip.invert.reverse.p)
             @flipv.invert.p)
           @flip.p;
      }
    }
  `),

  lines: read(`
    svg {
      viewBox: 0 0 100 100;

      /* background */
      rect {
        fill: #0ce5f2;
        width, height: 100%;
      }

      g {
        fill: none;

        /* lines */
        path*200 {
          stroke: @p(#ff4ea5, yellow, @m5(#fff));
          stroke-width: @r.5;
          stroke-dasharray: @r(5, 60) @r5;
          d: M 50 120
             Q @Plot(r: 20; move: 20 80)
               @Plot(r: 125; move: 80 60);
        }

        filter: defs filter {
          feTurbulence {
            type: fractalNoise;
            baseFrequency: .03;
            seed: @r1000;
          }
          feDisplacementMap {
            in: SourceGraphic;
            scale: 20;
          }
        }

        /* fix for Safari */
        mask: defs mask {
          rect {
            width, height: 100%;
            fill: #fff;
          }
        }
      }
    }
  `),

  'hyperbolic circles': read(`
    svg {
      viewBox: -5 -5 10 10;
      g {
        stroke: #1B2D37;
        stroke-width: .04;

        circle {
          r: 5;
          fill: #f9f8eb;
        }
        circle*4 {
          r: 5;
          cx, cy: @Plot(r: 7.07; rotate: 45);
          fill: #76b39d;
        }
        circle*8 {
          cx, cy: @Plot(r: 5.5; rotate: $(45/2));
          r: $(5/2.39);
          fill: #05004e;
        }
        circle*16 {
          r: 1.01;
          cx, cy: @Plot(r: 5.2; rotate: $(45/4));
          fill: #fd5f00;
        }
        circle*32 {
          r: $(5/9.6);
          cx, cy: @Plot(r: 5.2; rotate: $(45/8));
          fill: #f9f8eb;
        }
        circle*64 {
          r: $(5/21);
          cx, cy: @Plot(r: 5.08; rotate: $(45/16));
          fill: #76b39d;
        }

        /* masking and border */
        mask: defs mask { circle { r: 5; fill: #fff }}
        circle { r: 4.98; fill: none}
      }
    }
  `),

  'patterns': read(`
    svg {
      viewBox: 0 0 1 1;
      defs mask#circle {
        circle {
          r: 4.9;
          fill: #fff;
        }
      }
      rect*2 {
        x, y: @pn(0, .049);
        width, height: @pn(1, .9);
        fill: defs pattern {
          width, height: @pn(.1, .1114);
          viewBox: -5 -5 10 10;
          g {
            circle*4 {
              r: 4.9;
              cx, cy: @Plot(r: 7.07; rotate: 45);
              fill: #11A8E3;
            }
            circle {
              r: 1.2;
              fill: @pn(#D01C3B, #E0D31C);
            }
            mask: url(#circle);
          }
        }
      }
    }
  `),

  '10 PRINT': read(`
    svg {
      viewBox: 0 0 16 16 padding .2;
      stroke: #1B2D37;
      stroke-width: .4;
      stroke-linecap: round;

      line*16x16 {
        draw: @r(1s);
        x1, y1, x2, y2: @p(
          @nx(-1) @ny(-1) @nx @ny,
          @nx @ny(-1) @nx(-1) @ny,
          @nx @ny(-1) @nx @ny
        );
      }
    }
  `),

  'weave': read(`
    svg {
      viewBox: 0 0 1 1;
      preserveAspectRatio: xMidYMid slice;
      rect {
        width, height: 100%;
        fill: defs pattern {
          viewBox: 0 0 14 14;
          patternTransform: rotate(45);
          width, height: 12%;
          path {
            fill: none;
            stroke-linecap: square;
            stroke: #1b2d37;
            stroke-width: 1;
            draw: 3s;
            d: M 4 5
               @p(@p(h -1 v -2 h 3 v 4 h -5 v -6 h 6)
                  @flipv.reverse.p)
               M 4 9 @flipv.p
          }
        }
      }
    }
  `),

  'polyline': read(`
    svg {
      viewBox: -50 -50 100 100;
      stroke: #1B2D37;
      fill: none;

      polyline {
        draw: 1s;
        points: @m61.@Plot(
          turn: 20.1;
          r: t;;
        );
      }

      rect {
        stroke-width: 2;
        width, height: 98;
        x, y: -49;
      }
    }
  `),

  'blob circles': read(`
    svg {
      --color: #f5f0e1, #ff6e40;
      --color2: #1e3d59, #ffc13b, #ffcce7;

      viewBox: 0 0 1 1;
      preserveAspectRatio: xMidYMid slice;

      rect {
        width, height: 100%;
        fill: defs pattern {
          viewBox: 0 0 8 8;
          patternTransform: rotate(-45);
          width, height: 25%;
          rect*4 {
            fill: @pn(--color);
            x, y: 0 @pn(0, 2, 6, 4);
            width, height: 8 2;
          }
          circle*4 {
            r: 1.25;
            cx, cy: @pn(2 2, 6 2, 6 6, 2 6);
            fill: @pnr(--color);
            stroke-width: 1.5;
            stroke: defs radialgradient {
              stop {offset: .99; stop-color: @pnr(--color2) }
              stop {offset: 0; stop-color: @pn(--color) }
            }
          }
        }
      }
    }
  `),

  'codepen logo': read(`
    svg {
      viewBox: -5 -5 10 11.5;

      fill: none;
      stroke: #000;
      stroke-width: .6;
      stroke-linejoin: round;

      --a: @m4.Plot(r: 2; scale: @sqrt2 1);
      --b: @m4.Plot(r: 2; scale: @sqrt2 1; move: 0 2);

      path {
        d: M @p((--a)) z
           M @p((--b)) z
           @M4(M @pn(--a) @pn(--b))
      }
    }
  `),

  'fibonacci spiral': read(`
    svg {
      viewBox: -50 -50 100 100;
      circle*300 {
        fill: hsl($(120-90*@sin.n), 80%, 50%);
        r: @sqrt(@n/60);
        cx: $(@n*.618^4 * cos(2π*@n*.618));
        cy: $(@n*.618^4 * sin(2π*@n*.618));
      }
    }
  `),

  'planet': read(`
    svg {
      --color-a: pink;
      --color-b: #322EA2;

      viewBox: -5 -5 10 10;
      g {
        mask: defs mask {
          circle {
            r: 3;
            fill: #fff;
          }
        }
        circle {
          r: 3;
          fill: @p(--color-a);
        }
        g {
          filter: defs filter {
            feTurbulence {
              type: fractalNoise;
              baseFrequency: 100;
            }
            feDisplacementMap {
              in: SourceGraphic;
              scale: 3;
            }
          }
          circle {
            cx, cy: 4;
            r: 6;
            fill: @p(--color-b);
            filter: defs filter {
              feGaussianBlur {
                stdDeviation: .7;
              }
            }
          }
        }
      }

      g {
        transform: rotate(-20);
        circle*50 {
          r: @r(.1);
          fill: @p(--color-a, --color-b);
          cx, cy: @Plot(
            turn: .774;
            scale: 3 1.3;
            rotate: 227;
            move: 0 .6;
            r: 1.5;
          )
        }
      }

      g {
        mask: defs mask {
          circle {
            r: .85;
            cx, cy:2;
            fill: #fff;
          }
        }
        circle {
          r: 8;
          fill: @p(--color-b);
        }
        g {
          filter: defs filter {
            feTurbulence {
              type: fractalNoise;
              baseFrequency: 100;
            }
            feDisplacementMap {
              in: SourceGraphic;
              scale: 1;
            }
          }
          circle {
            cx, cy: 1;
            r: 1.5;
            fill: @p(--color-a);
            filter: defs filter {
              feGaussianBlur {
                stdDeviation: .2;
              }
            }
          }
        }
      }
    }
  `),

  'zigzag': read(`
    svg {
      viewBox: 0 0 10 10 p 2;
      path {
        stroke: #000;
        stroke-linecap: round;
        stroke-linejoin: round;
        stroke-width: .4;
        fill: none;
        draw: 3s;
        d: M 0 0
             @M10.pn(0 @n @n 0, @n 0 0 @n)
             @M10.pn(@n @N @N @n, @N @n @n @N);
      }
    }
  `),

  'arc shape': read(`
    svg {
      viewBox: -50 -50 100 100 p 40;
      fill: none;

      --color: blue;

      --a: π/180 * -80 - π/2;
      --b: π/180 * -45 - π/2;
      --arc: $(50 * cos(a)) $(50 * sin(a))
             A 50 50 0 0 1
             $(50 * cos(b)) $(50 * sin(b));

      circle {
        r: 50;
        stroke-width: .5;
        stroke: @p(--color);
      }

      g {
        stroke-width: 6;
        stroke-linecap: round;
        stroke-linejoin: round;
        path {
          stroke: color-mix(in srgb, @p(--color) 40%, #fff);
          fill: color-mix(in srgb, @p(--color) 40%, #fff);
          d: M 0 0 @p(--arc) z
        }
        path {
          stroke: @p(--color);
          d: M @p(--arc);
        }
      }
    }
  `),

  'loop': read(`
    svg {
      viewBox: 0 0 24 24 p 4;
      stroke-linecap: square;
      stroke: blue;
      fill: none;
      path*0-3 {
        d: @M0-3(
          M @p.$(12 - 6/4*@n) 12 @p 6
          A @p.$(6 - 6/4*@n) @p 0 1 0 6 @lp3
        );
        transform:
          translate(@pn(0 0, 24 0, 24 24, 0 24))
          rotate(@n(*90));
      }
    }
  `),

  'openai logo': read(`
    svg {
      viewBox: -50 -50 100 100 p 20;
      stroke-linecap: round;
      stroke: blue;
      fill: none;

      --x: 14 * cos(π/6) * -1;
      --y: 14 * sin(π/6);

      g*6 {
        transform: rotate(@n(*60));
        path {
          stroke-width: 4.2;
          d: M $(x - 1) $y $(x - 1) $(-3.4y)
        }
        path {
          stroke-width: 6;
          d: M $x $(-3.4y) $(-x) $(-5.4y)
             A 22 22 0 0 1 $(-3.1x) $(-1.4y);
        }
      }
    }
  `),

  'drawing ring': read(`
    svg {
      viewBox: -50 -50 100 100;
      path {
        stroke: #1B2D37;
        fill: none;
        d: M 0 0 T 0 @m120.n(*@pn(@m4(.2), @m4(-.2)));
        draw: 10s;
      }
    }
  `),

  'icons': read(`
    /* Icons from https://fonts.google.com/knowledge */

    svg {
      viewBox: 0 0 120 20 p 1;

      stroke: #000;
      stroke-width: .5;
      fill: none;

      /* outlines */
      rect*5 {
        width, height: 20;
        x, y: @n(*25, -25) 0;
        stroke-dasharray: 1 1;
        stroke: red;
        stroke-width: .2;
      }

      use {
        href: defs g {
          path {
            d: M 12 20 A 6 6 0 1 1 12 0 z
               M 18 16 A 6 6 0 0 1 18 4 z
          }
        }
      }

      use {
        href: defs g {
          transform: translate(25, 0);
          circle*2x2 {
            r, cx, cy: 5 @nx(*10, -5) @ny(*10, -5)
          }
        }
      }

      use {
        href: defs g {
          transform: translate(50, 0);
          stroke-miterlimit: 1;
          path {
             d: M 0 0 0 10 0 20 10 20
                  0 10 0 0 20 20 10 20;
          }
        }
      }

      use {
        href: defs g {
          transform: translate(75, 0);
          line {
            x1, y1, x2, y2: 10 0 10 20;
          }
          circle*2 {
            cx, cy: 10 10;
            r: @n(*5);
          }
        }
      }

      use {
        href: defs g {
          transform: translate(100, 0);
          path {
            d: M 0 20 A 20 20 0 0 1 20 0 L 20 20 z
               M 8.5 20 A 11.5 11.5 0 0 1 20 8.5
          }
        }
      }
    }
  `),
}

function read(input) {
  let temp = input.replace(/^\n+/g, '');
  let len = temp.length - temp.replace(/^\s+/g, '').length;
  let result = input.split('\n').map(n => (
    n.replace(new RegExp(`^\\s{${len}}`, 'g'), '')
  ));
  return result.join('\n').trim();
}
