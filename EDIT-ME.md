# Where to edit your content

All text lives in `src/data/`. You do not need to touch the components.

| File | What it controls |
|---|---|
| profile.json | Name, title, tagline, bio, email, links, the 4 KPI counters |
| pipeline.json | The clickable architecture diagram (steps, details, tools) |
| projects.json | Project cards and case-study popups |
| skills.json | Radar chart levels (1-5) and skill tags |
| experience.json | Jobs, education, certifications |

Search for `EDIT` to find every placeholder.

Files to add to `public/`:
- resume.pdf - the Resume buttons download this
- headshot.jpg - then set "headshot": "/headshot.jpg" in profile.json
- og-image.png (1200x630) - preview image when shared on LinkedIn
- Project screenshots - e.g. public/projects/cdc.png, then set "image": "/projects/cdc.png"
