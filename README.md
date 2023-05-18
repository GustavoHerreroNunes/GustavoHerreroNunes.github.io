# Portfolio

<!--Tecnologias Utilizadas e suas versões-->

> Status: :factory: Development

## Description :clipboard:

<p style="text-align:justify">
Website to introduce myself, show my projects and skills, and promote my work as Web Developer.
</p>

## How do hexagons work :bee:

To create the pattern of hexagons in the “About me” section I mixed the solutions of [Josh Crozier][josh-crozier-solution] (who creates hexagons using pseudo-elements) and [ScottS][scotts-solution] (who creates a honeycomb pattern using nth-child css class). Both solutions use fixed values, so I implemented media queries and used `rem` as the main unit. Below I do a quick walkthrough of how my final solution works.

### Hexagons

To create the hexagons I used one `<div />` with two pseudo-elements, `::before` and `::after`. The pseudo-elements work as triangles to the left and right of the `<div />`, thanks to [css borders effect on elements with zero width][css-triangle].

To create an apperant border, inside each hexagon I placed another one, but with a smaller scale. Then used the section background-color as the hexagon.inner color, while the outer one has a light green background-color.

| Css variable | Description |
| --- | --- |
| `hexagon-width` | Width of hexagon side. |
| `hexagon-border-x` | Height of horizontal triangles from the pseudo-elements that complete the hexagon. |
| `hexagon-border-y` | Height of vertical triangles from the pseudo-elements that define the hexagon edges. |
| `hexagon-height` | Hexagon `<div />` height. |

### Honeycomb pattern

For the honeycomb pattern I used three rows filled with hexagons, and created a zigzag pattern by moving even hexagons to the top, and odd hexagons to the bottom, using the css class `nth-child`.

| Css variable | Description |
| --- | --- |
| `hexagon-margin-x`  | Horizontal distance between each hexagon in a row. |
| `hexrow-margin-top` | Vertical distance between each row. |
| `hexagon-even-top` | Distance of even hexagons from the top of the row. |
| `hexagon-odd-top` | Distance of odd hexagons from the top of the row. |

## Contribute :gift:

If you have any ideas, suggestions, or saw any bug, you can tell me here in [Issues][issues].

<!---Links utilizados no documento-->

[josh-crozier-solution]: https://stackoverflow.com/questions/19418486/hexagon-shape-with-a-border-outline
[scotts-solution]:https://stackoverflow.com/questions/10062887/generate-repeating-hexagonal-pattern-with-css3

[css-triangle]: https://css-tricks.com/snippets/css/css-triangle/

[issues]: https://github.com/GustavoHerreroNunes/portfolio/issues
