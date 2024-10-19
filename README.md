[![SenangWebs](https://raw.githubusercontent.com/a-hakim/senangwebs-modals/refs/heads/main/src/sw_banner.webp)](https://use.senangwebs.com)
Learn more at [SenangWebs.com](https://use.senangwebs.com)

# SenangWebs Modals (SWM)

SenangWebs Modals (SWM) is a lightweight JavaScript library that enables easy creation and customization of modal dialogs using HTML data attributes or JavaScript. With minimal setup, you can add engaging modals to your web pages, enhancing user interaction and experience.

## Features

- Easy to integrate with existing projects
- Two methods of modal creation: HTML attributes and JavaScript API
- Customizable modal positioning: center, top, bottom, left, right, and corners
- Adjustable background color and opacity
- Customizable blur effect for the overlay
- Custom z-index support
- Smooth open and close animations
- Flexible content support with custom titles and footers
- Responsive and works on all modern browsers

## Examples
[Link to examples page - replace with actual link when available]

## Installation

### Using npm

```bash
npm install senangwebs-modals
```

### Using a CDN

You can include SenangWebs Modals directly in your HTML file using unpkg:

```html
<link rel="stylesheet" href="https://unpkg.com/senangwebs-modals@latest/dist/swm.css">
<script src="https://unpkg.com/senangwebs-modals@latest/dist/swm.js"></script>
```

## Usage

### 1. HTML Attribute-based Modals

Add data attributes to the HTML elements to create modals:

```html
<div data-swm id="myModal">
  <button 
    data-swm-btn 
    data-swm-title="Custom Modal" 
    data-swm-position="center"
    data-swm-bg-color="#3498db"
    data-swm-bg-opacity="0.7"
    data-swm-bg-blur="3"
    data-swm-z-index="9999"
    data-swm-footer="Custom Footer"
  >
    Open Modal
  </button>
  <div data-swm-body>
    <p>This is the content of the modal.</p>
  </div>
</div>
```

### 2. JavaScript API

Create modals programmatically using the JavaScript API:

```javascript
SWM.createModal({
  title: 'Programmatic Modal',
  content: '<p>This modal was created using JavaScript!</p>',
  footer: 'Custom Footer',
  position: 'center',
  bgColor: '#3498db',
  bgOpacity: '0.7',
  bgBlur: '3',
  zIndex: '9999'
});
```

### 3. Opening Existing Modals

Open a modal defined with HTML attributes using JavaScript:

```javascript
SWM.openModal('#myModal');
```

## Configuration Options

You can configure modals using the following options:

| Option | HTML Attribute | JavaScript Property | Description |
|--------|----------------|---------------------|-------------|
| Title | `data-swm-title` | `title` | Sets the title of the modal |
| Position | `data-swm-position` | `position` | Sets the position of the modal |
| Background Color | `data-swm-bg-color` | `bgColor` | Sets the background color of the modal overlay |
| Background Opacity | `data-swm-bg-opacity` | `bgOpacity` | Sets the opacity of the modal overlay (0 to 1) |
| Background Blur | `data-swm-bg-blur` | `bgBlur` | Sets the blur effect for the background (in pixels) |
| Z-Index | `data-swm-z-index` | `zIndex` | Sets the z-index of the modal overlay |
| Footer | `data-swm-footer` | `footer` | Adds a custom footer to the modal |

## Supported Positions

- Center: `center`
- Top: `top`, `top left`, `top right`
- Bottom: `bottom`, `bottom left`, `bottom right`
- Left: `left`
- Right: `right`

## Browser Support

SenangWebs Modals works on all modern browsers, including:

- Chrome
- Firefox
- Safari
- Edge
- Opera

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Acknowledgments

- Inspired by various modal libraries in the web development community
- Thanks to all contributors who have helped to improve this library

## Support

If you encounter any issues or have questions, please file an issue on the GitHub repository.

Happy modal creation!