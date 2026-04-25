# LIGHTBOX-NOTES.md

## 1. The DOM

The DOM references are located at the top of `lightbox.js`:

- Line 6: `const lb       = document.querySelector('.lightbox');`
- Line 7: `const lbImg    = lb.querySelector('.lightbox__img');`
- Line 8: `const lbCap    = lb.querySelector('.lightbox__caption');`
- Line 9: `const thumbs   = document.querySelectorAll('.gallery__thumb');`

Lines 6, 7, and 8 each return one element. `document.querySelector('.lightbox')` returns the first matching lightbox element. Then `lb.querySelector('.lightbox__img')` and `lb.querySelector('.lightbox__caption')` each find one nested element inside the lightbox.

Line 9 returns a collection because `document.querySelectorAll('.gallery__thumb')` finds all of the thumbnail images on the page.

The code uses `lb.querySelector(...)` for the nested lightbox image and caption because those elements belong inside the lightbox. This keeps the search scoped to the lightbox instead of searching the entire document. That makes the code safer if the page ever has another image or caption with a similar class somewhere else.

## 2. Event Listeners

There are three `addEventListener` calls in `lightbox.js`.

First, lines 47-49 attach click listeners to every thumbnail:

- Line 47: `thumbs.forEach((thumb, i) => {`
- Line 48: `thumb.addEventListener('click', () => openLightbox(i));`

Element: each thumbnail image  
Event type: `click`  
Handler: opens the lightbox using that thumbnail's index

Second, lines 51-53 attach a click listener to the lightbox backdrop:

- Line 51: `lb.addEventListener('click', (e) => {`
- Line 52: `if (e.target === lb) closeLightbox();`

Element: the lightbox container  
Event type: `click`  
Handler: closes the lightbox if the user clicked the backdrop itself

Third, lines 55-57 attach a keyboard listener to the document:

- Line 55: `document.addEventListener('keydown', (e) => {`
- Line 56: `if (e.key === 'Escape' && state.isOpen) closeLightbox();`

Element: the whole document  
Event type: `keydown`  
Handler: closes the lightbox when Escape is pressed and the lightbox is open

The backdrop click listener uses a small form of event delegation because it checks `e.target`. The listener is on the whole lightbox container, but the code only closes the lightbox if the actual clicked target is the backdrop itself.

## 3. State and the Render Pattern

The state object is defined on lines 12-21:

- Line 12: `const state = {`
- Line 13: `isOpen: false,`
- Line 14: `index: 0,`
- Line 15: `images: [`

The fields are:

- `isOpen`: remembers whether the lightbox is open or closed
- `index`: remembers which image is currently selected
- `images`: stores the image paths and captions

When a user clicks a thumbnail, the click listener on line 48 runs:

- Line 48: `thumb.addEventListener('click', () => openLightbox(i));`

That calls `openLightbox(i)`, which is defined on lines 24-28:

- Line 25: `state.isOpen = true;`
- Line 26: `state.index = i;`
- Line 27: `render();`

The first field that changes is `state.isOpen`, which becomes `true`. Then `state.index` changes to the clicked thumbnail's index. After that, `render()` runs.

The DOM then reflects the selected image and caption. Inside `render()`, line 38 gets the selected image data:

- Line 38: `const { src, caption } = state.images[state.index];`

Then line 39 updates the lightbox image source, line 40 updates the caption, and line 41 adds the `open` class:

- Line 39: `lbImg.setAttribute('src', src);`
- Line 40: `lbCap.textContent = caption;`
- Line 41: `lb.classList.add('open');`

The mutators are `openLightbox(i)` on lines 24-28 and `closeLightbox()` on lines 30-33. They both update state and then call `render()`.

`render()` itself is defined on lines 36-45. It gets called from `openLightbox(i)` on line 27 and `closeLightbox()` on line 32.

If state changed but `render()` was not called, the visible page would not update correctly. For example, `state.isOpen` could become `true`, but the lightbox would not appear because the `open` class would not be added to the lightbox element.

## 4. Security

The two XSS-safe DOM update lines in `render()` are:

- Line 39: `lbImg.setAttribute('src', src);`
- Line 40: `lbCap.textContent = caption;`

Line 40 is especially important because `textContent` treats the caption as literal text. If this used `innerHTML` instead, an attacker could put HTML or JavaScript into a caption and the browser might parse and run it.

For example, if a malicious caption included a script or an image tag with an event handler, `innerHTML` could allow that code to execute in the user's browser. The attack class is XSS, which stands for Cross-Site Scripting.

## 5. Patterns

I see four of the five lecture patterns in `lightbox.js`.

### State + render

The state object is defined on lines 12-21:

- Line 12: `const state = {`

The render function is defined on lines 36-45:

- Line 36: `function render() {`

The mutators update state and call render:

- Line 25: `state.isOpen = true;`
- Line 26: `state.index = i;`
- Line 27: `render();`
- Line 31: `state.isOpen = false;`
- Line 32: `render();`

### Event listener

The event listener pattern appears on lines 48, 51, and 55:

- Line 48: `thumb.addEventListener('click', () => openLightbox(i));`
- Line 51: `lb.addEventListener('click', (e) => {`
- Line 55: `document.addEventListener('keydown', (e) => {`

### Delegation

The clearest delegation-style pattern is the lightbox click handler:

- Line 51: `lb.addEventListener('click', (e) => {`
- Line 52: `if (e.target === lb) closeLightbox();`

The listener is on the lightbox container, and it uses `e.target` to decide whether the click was on the backdrop.

### Module scope

The DOM references, state object, mutators, render function, and listeners all live in the same JavaScript file instead of being placed on the global HTML. Examples include:

- Line 6: `const lb       = document.querySelector('.lightbox');`
- Line 12: `const state = {`
- Line 24: `function openLightbox(i) {`
- Line 36: `function render() {`

### Debounce/throttle

I do not see debounce or throttle in this file. There is no code that delays a function call or limits how often a function can run.