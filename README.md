# BrightFuture Institute - Landing Page

A modern, professional, fully responsive landing page for an educational institute built with pure HTML5, CSS3, and Vanilla JavaScript.

## Features

- Sticky navigation with mobile hamburger menu
- Hero section with call-to-action buttons
- About section with mission, vision, and approach
- 6 program/course cards with responsive grid layout
- "Why Choose Us" feature section
- Animated statistics counter
- Testimonial slider with auto-play
- Contact form with validation
- AI Chat widget connected to n8n webhook
- Smooth scrolling and scroll-reveal animations
- Fully responsive on all screen sizes
- Accessibility features (ARIA labels, semantic HTML, focus states)

## Tech Stack

- HTML5
- CSS3 (CSS Custom Properties)
- Vanilla JavaScript (ES6+)
- Google Fonts (Inter)
- Font Awesome 6 (icons via CDN)

No build tools, frameworks, or package managers required.

## Project Structure

```
institute-landing-page/
│
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── assets/
│   ├── images/
│   └── icons/
└── README.md
```

## Getting Started

Simply open `index.html` in any modern browser. No server or build step required.

```
open index.html
```

## AI Chat Widget Integration

The AI chat widget is connected to an n8n webhook. To modify the endpoint:

1. Open `js/script.js`
2. Find the `AI_AGENT_API` variable
3. Replace the URL with your n8n webhook endpoint

```javascript
var AI_AGENT_API = 'https://your-n8n-instance.com/webhook/your-id/chat';
```

## Customization

### Colors

Edit CSS variables in `css/style.css`:

```css
:root {
    --primary: #1a365d;
    --primary-light: #2c5282;
    --accent: #3182ce;
    --accent-hover: #2b6cb0;
    /* ... */
}
```

### Content

All text content is directly in `index.html`. Edit the HTML to update:
- Institute name and branding
- Course descriptions
- Testimonials
- Contact information
- Footer links

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is provided as-is for educational and commercial use.
