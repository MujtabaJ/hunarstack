# HunarStack social campaign — two audiences

HUNARSTACK TECH ACADEMY  
**Learn. Build. Create. Grow.**

Two completely separate visual systems. Do not mix them in the same post, ad set, or WhatsApp blast.

| | Concept A — Professional | Concept B — Students |
|---|---|---|
| Audience | University, graduates, young professionals, freelancing beginners | Primary, matric, college, parents |
| Feeling | Navy, glow, career, technology | Cream, warm, family, school |
| Font | Inter | Poppins |
| Fee line | **PKR 2,000–3,000** (range, not a single price) | **PKR 1,000–2,000** (range, not a single price) |
| Never say | Guaranteed income, $500/month, become rich | Mix in the professional fee |

Live site: [hunarstack.com](https://www.hunarstack.com/)  
Centre: Bungalow No. A-132, Sindh University Society, Jamshoro, Sindh  
WhatsApp: 0300 3740708 · Email: gm@hunarstack.com

No real HunarStack building photograph was available, so classroom and campus photos are licensed stock. They are not labelled as the Jamshoro bungalow.

---

## Brand

- Navy `#0F2747` · Teal `#12A594` · Amber `#F2A516` · Blue `#5B8FD6` · Ice `#EEF3FA`
- Concept B extras: cream `#FFF8EF`, rose `#C45C5C`
- Logo mark: `marketing/assets/logo-mark.svg` (drawn into every post)
- Fonts in `source/`: Inter (A), Poppins (B)

---

## Folders

```
assets/social/
  posts/professional/square/     25 × 1080×1080
  posts/professional/portrait/   25 × 1080×1350
  posts/students/square/         25 × 1080×1080
  posts/students/portrait/       25 × 1080×1350
  stories/professional/          25 × 1080×1920
  stories/students/              25 × 1080×1920
  banners/professional/          8 × 1200×628
  banners/students/              8 × 1200×628
  images/                        licensed photos by subject
  source/make_campaign.py        regenerate
  previews/                      contact sheets + this gallery
```

Open `previews/index.html` in a browser.

---

## Posting order (first 14 days)

**Feed — alternate days, never the same audience twice in a row if you run both pages. Better: two Facebook/IG albums or two highlight series.**

Concept A (professional page / evening slots):  
A01 → A24 → A03 → A05 → A06 → A11 → A16 → A18 → A23 → A25

Concept B (parents / after-school):  
B01 → B24 → B02 → B08 → B09 → B20 → B15 → B19 → B21 → B25

Stories: same IDs from `stories/`. WhatsApp status: B stories in the morning, A stories after 6pm.

Ads: A24 or A23 to Jamshoro + Hyderabad, ages 18–34. B24 or B20 to the same cities, ages 25–50 (parents). Different ad sets. Different fees.

---

## How to replace a photograph

1. Drop a new jpg into `images/<folder>/`.
2. Edit the `photo=` field on that post in `source/make_campaign.py`.
3. Run `python3 source/make_campaign.py` (or emit one id).
4. Add a row to `image-sources.md`.

## How to edit text

Edit the dict for that post (`headline`, `support`, `price`, `cta`). Keep professional fees off student posts. Re-run the script. Do not stretch a square into a story — the script recomposes each size.

## How to export

Files are already PNG. Upload the square to Instagram/Facebook feed, portrait to FB recommended 4:5, stories to IG/WhatsApp, banners to LinkedIn/Facebook link posts (1200×628).

---

## 50 post list

### Concept A

| ID | Headline | Layout |
|---|---|---|
| A01 | BUILD YOUR DIGITAL FUTURE | overlay |
| A02 | LEARN. BUILD. GROW. | split |
| A03 | LEARN TO CODE | overlay left |
| A04 | BUILD YOUR FIRST WEBSITE | top photo |
| A05 | LEARN AI. CREATE MORE. | glass |
| A06 | CURIOUS ABOUT FREELANCING? | overlay |
| A07 | LEARN HOW ONLINE WORK WORKS | split |
| A08 | DON'T JUST LEARN. BUILD. | overlay left |
| A09 | YOUR SKILLS CAN OPEN NEW DOORS | glow |
| A10 | STUDENT TODAY. SKILLED TOMORROW. | top photo |
| A11 | HER FUTURE. HER SKILLS. | overlay |
| A12 | LEARN. CREATE. WORK FROM ANYWHERE. | glass |
| A13 | CODE + AI = NEW POSSIBILITIES | overlay left |
| A14 | TURN CREATIVITY INTO A SKILL | split |
| A15 | BUILD DIGITAL PRODUCTS | top photo |
| A16 | LESS THEORY. MORE PRACTICE. | overlay |
| A17 | BECOME CONFIDENT WITH TECHNOLOGY | glow |
| A18 | START WITH A SKILL | glass |
| A19 | YOUR DEGREE + PRACTICAL SKILLS | split |
| A20 | GRADUATED? NOW BUILD YOUR SKILLS. | overlay |
| A21 | INVEST IN A SKILL, NOT JUST A CERTIFICATE | top photo |
| A22 | ONE SKILL CAN CHANGE YOUR DIRECTION | overlay left |
| A23 | PROFESSIONAL SKILLS SHOULDN'T FEEL OUT OF REACH | glow |
| A24 | ADMISSIONS OPEN | overlay |
| A25 | YOUR DIGITAL JOURNEY STARTS HERE | overlay left |

### Concept B

| ID | Headline | Layout |
|---|---|---|
| B01 | WELCOME TO HUNARSTACK | warm overlay |
| B02 | START LEARNING EARLY | cream stack |
| B03 | MATRIC STUDENTS — YOUR FUTURE STARTS NOW | split |
| B04 | COLLEGE + DIGITAL SKILLS | warm overlay |
| B05 | MORE THAN BOOKS | polaroid |
| B06 | LEARN COMPUTERS WITH CONFIDENCE | cream stack |
| B07 | TODAY'S STUDENTS. TOMORROW'S DIGITAL GENERATION. | warm overlay |
| B08 | DEAR PARENTS, PREPARE THEM FOR TOMORROW | sunshine |
| B09 | LET HER LEARN. LET HER GROW. | warm overlay |
| B10 | CONFIDENT GIRLS. DIGITAL SKILLS. | cream stack |
| B11 | FROM SCHOOL BAG TO LAPTOP | polaroid |
| B12 | BOOKS TEACH. TECHNOLOGY EXPANDS. | two-up |
| B13 | LEARN WITH CONFIDENCE | sunshine |
| B14 | A CLASSROOM FOR THE DIGITAL AGE | cream stack |
| B15 | YOUR CHILD'S FIRST STEP INTO TECHNOLOGY | warm overlay |
| B16 | YES, STUDENTS CAN LEARN TO CODE | split |
| B17 | LET THEIR CREATIVITY GROW | polaroid |
| B18 | THE NEXT GENERATION SHOULD UNDERSTAND AI | cream stack |
| B19 | AFTER SCHOOL. BEFORE THE FUTURE. | warm overlay |
| B20 | QUALITY LEARNING AT A STUDENT-FRIENDLY FEE | sunshine |
| B21 | A SMALL STEP TODAY CAN BUILD CONFIDENCE | split |
| B22 | EVERY EXPERT WAS ONCE A BEGINNER | polaroid |
| B23 | PREPARE THEM FOR A DIGITAL FUTURE | two-up |
| B24 | ADMISSIONS OPEN | warm overlay |
| B25 | THEIR FUTURE STARTS WITH LEARNING | cream stack |

Banners BA1–BA8 and BB1–BB8 match the brief in `source/make_campaign.py`.
