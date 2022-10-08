export default {
  grid: indent(`
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

  basic: indent(`
    svg {
      viewBox: 0 0 10 10;
      stroke: black;
      stroke-width: .1;
      rect {
        x: 8;
        y: 8;
        width: 1;
        height: 1;
        fill: yellow;
        style transform-box: fill-box;
        transform-origin: center;
        transform: rotate(45);
      }
      circle {
        fill: deepskyblue;
        cx: 4;
        cy: 4;
        r: 3
      }
    }
  `),

  snowflake: indent(`
    svg {
      viewBox: -50 -50 100 100;
      stroke-linecap: round;
      stroke: #000;

      path*6 {
        transform: rotate(@calc(@n*60));
        d: M 0 0 0 44
           @M2x3(M 0 @calc(-9*@ny)
                 L @pn(±9) @calc(-10*@ny - 5.8));
      }
    }
  `),

  wavy: indent(`
    svg {
      viewBox: -58 -57 114 114;
      stroke-width: .15;
      stroke: #1B2D37;
      fill: #D5F1FF;
      circle*720 {
        r: @calc(sin(π/@N*@n)*10);
        cx, cy: @Plot(
          r: 40+sin(4t)*5+sin(12t)*5
        );
      }
    }
  `),

  flower: indent(`
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

  star: indent(`
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

  '99 bottles of beer': indent(`
    svg {
      viewBox: 0 0 50 1200;
      overflow: visible;
      foreignObject {
        width, height: 100%;
        font-size: 2;
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

  'window pattern': indent(`
    svg {
      viewBox: -3 -3 206 206;
      fill: none;
      stroke: #1B2D37;
      stroke-width: 3;
      stroke-linecap: square;

      path {
        d: M 100 5
           @p(@p(@p(h-43 v5 h-10 v-5 h-10 v16 h-32 v10 h10 v-26 h-10)
              @flip.@invert.@reverse.@p)
             @flipv.@invert.@p)
           @flip.@p;
      }

      /* frame */
      rect {
        width, height: 200;
      }
    }
  `),

  lines: indent(`
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
      }
    }
  `),
}

function indent(input) {
  let temp = input.replace(/^\n+/g, '');
  let len = temp.length - temp.replace(/^\s+/g, '').length;
  let result = input.split('\n').map(n => (
    n.replace(new RegExp(`^\\s{${len}}`, 'g'), '')
  ));
  return result.join('\n').trim();
}
