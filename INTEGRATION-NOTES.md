# INTEGRATION-NOTES.md

## Where did you put the lightbox trigger(s), and why does that placement make sense for your page?

I put the lightbox triggers directly on the personal photo gallery images that were already part of my landing page. This placement makes sense because the gallery was already the visual section of my page, so making those images clickable adds interactivity without changing the main purpose or structure of the page.

## What content did you choose, and what does it represent?

I chose my own personal photos from the original landing page: a photo of my wife and I, a photo of me holding my son, a photo with one of our dogs, and a travel photo from the Italian Coast. These images represent important parts of my life and make the portfolio feel personal instead of using generic starter images.

## How did you reconcile class names?

I kept my existing `.gallery` and `.photo` structure from the original page, then added the starter class `gallery__thumb` to each image. This let my page keep its original layout while still giving `lightbox.js` the selector it expects: `.gallery__thumb`.

I also added the starter lightbox container with the classes `.lightbox`, `.lightbox__img`, and `.lightbox__caption` because those are the class names the JavaScript uses to find and update the overlay.

## What CSS conflicts did you have to resolve, and how?

The main possible conflict was that my existing page already had a `.gallery` class. I kept that class because it controlled the layout of my original image grid, and I added the lightbox-specific classes only where the JavaScript needed them.

I linked both `style.css` and `css/lightbox.css` in `index.html`. My existing `style.css` controls the regular page layout, while `css/lightbox.css` controls the overlay. This keeps the regular page styling and the lightbox styling separated.