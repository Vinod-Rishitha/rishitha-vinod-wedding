# Rishitha & Vinod Sai: wedding invitation

A one-page invitation site. It is plain HTML, CSS and JavaScript, so nothing needs to be built or installed.

## Changing the wording
All the text is in `content.js`, in English (`en`) and Telugu (`te`). Change both. Any line starting with `TODO` shows as a dashed box on the page and must be filled in before the link is shared.

## Adding photos
Put the photos in `assets/photos/gallery/`, about 1200 px on the long side, and list them under `photos` in `content.js`. The gallery appears once at least one photo is listed.

## Music
The background music is a 25-second clip chosen by the family, saved as `assets/music/wedding-song.mp3`. Its title and source aren't recorded here yet.

It starts softly when a guest taps "Open invitation", loops, and pauses if they switch apps. A small button in the corner turns it on and off. To change the track, replace the file and update `music` in `content.js`. Use only music you're allowed to use.
## Opening the Telugu version directly
Add `?lang=te` to the link:
`https://vinod-rishitha.github.io/rishitha-vinod-wedding/?lang=te`

## Previewing on this Mac
```bash
python3 -m http.server 8765
```
Then open http://127.0.0.1:8765.

## Before sharing
- No `TODO` left in `content.js`
- A fluent speaker has checked the Telugu
- The link preview has been tried by pasting the link into a WhatsApp chat with yourself
