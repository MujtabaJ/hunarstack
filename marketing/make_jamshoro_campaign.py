#!/usr/bin/env python3
"""HunarStack Jamshoro campaign: readable posters, brochures, social posts.

Text is drawn with system fonts so spelling stays correct (AI image tools
garbled the attached references).
"""
from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path("/Users/apple/Downloads/Hunarstack-Complete-Package/marketing/assets")
OUT = ROOT / "campaign"
QR = ROOT / "qr-hunarstack.png"

NAVY = (15, 39, 71, 255)
NAVY_DEEP = (10, 28, 54, 255)
TEAL = (18, 165, 148, 255)
AMBER = (242, 165, 22, 255)
BLUE = (91, 143, 214, 255)
ICE = (238, 243, 250, 255)
WHITE = (255, 255, 255, 255)
MUTE = (90, 106, 132, 255)
INK = (21, 32, 56, 255)
PINK = (252, 240, 247, 255)
MINT = (232, 248, 244, 255)
SOFT = (247, 249, 253, 255)
LINE = (215, 227, 244, 255)

BOLD = "/System/Library/Fonts/Supplemental/Arial Bold.ttf"
REG = "/System/Library/Fonts/Supplemental/Arial.ttf"
AVENIR = "/System/Library/Fonts/Avenir Next.ttc"

PHONE = "0300 3740708"
EMAIL = "gm@hunarstack.com"
SITE = "hunarstack.com"
ADDRESS = "Bungalow No. A-132, Sindh University Society"
CITY = "Jamshoro, Sindh"
HOURS = "Mon–Sat  10:00–18:00"
FEE_KIDS = "Rs 1,000–2,000 / month"
FEE_MAIN = "Rs 2,000–3,000 / month"
FEE_NOTE = "Fees depend on subjects and batch. Confirm at the centre."


def font(path, size, index=0):
    try:
        return ImageFont.truetype(path, size, index=index)
    except OSError:
        return ImageFont.truetype(BOLD if "Bold" in path or index else REG, size)


def F(size, bold=False):
    if bold:
        try:
            return ImageFont.truetype(AVENIR, size, index=1)
        except OSError:
            return ImageFont.truetype(BOLD, size)
    try:
        return ImageFont.truetype(AVENIR, size, index=0)
    except OSError:
        return ImageFont.truetype(REG, size)


def rounded(draw, box, radius, fill=None, outline=None, width=1):
    draw.rounded_rectangle(box, radius=radius, fill=fill, outline=outline, width=width)


def draw_mark(draw, x, y, size):
    s = size / 120.0
    rounded(draw, (x, y, x + size, y + size), int(28 * s), fill=NAVY)
    rounded(draw, (x + 28 * s, y + 24 * s, x + 42 * s, y + 96 * s), int(4 * s), fill=ICE)
    rounded(draw, (x + 78 * s, y + 24 * s, x + 92 * s, y + 96 * s), int(4 * s), fill=ICE)
    rounded(draw, (x + 42 * s, y + 41 * s, x + 78 * s, y + 52 * s), int(2 * s), fill=TEAL)
    rounded(draw, (x + 42 * s, y + 54.5 * s, x + 78 * s, y + 65.5 * s), int(2 * s), fill=AMBER)
    rounded(draw, (x + 42 * s, y + 68 * s, x + 78 * s, y + 79 * s), int(2 * s), fill=BLUE)


def wordmark(draw, x, y, size=44, light=False):
    title = F(size, True)
    ink = ICE if light else INK
    teal = TEAL
    draw.text((x, y), "hunar", font=title, fill=ink)
    tw = draw.textlength("hunar", font=title)
    draw.text((x + tw, y), "stack", font=title, fill=teal)
    return tw + draw.textlength("stack", font=title)


def wrap(draw, text, font_obj, max_w):
    words = text.split()
    lines, cur = [], ""
    for w in words:
        trial = (cur + " " + w).strip()
        if draw.textlength(trial, font=font_obj) <= max_w:
            cur = trial
        else:
            if cur:
                lines.append(cur)
            cur = w
    if cur:
        lines.append(cur)
    return lines


def theme_colors(name):
    if name == "navy":
        return {
            "bg": NAVY,
            "ink": WHITE,
            "mute": (198, 212, 232, 255),
            "accent": AMBER,
            "chip": (28, 56, 92, 255),
            "check": TEAL,
            "bar": AMBER,
        }
    if name == "pink":
        return {
            "bg": PINK,
            "ink": INK,
            "mute": MUTE,
            "accent": (184, 72, 132, 255),
            "chip": WHITE,
            "check": (184, 72, 132, 255),
            "bar": (184, 72, 132, 255),
        }
    if name == "mint":
        return {
            "bg": MINT,
            "ink": INK,
            "mute": MUTE,
            "accent": TEAL,
            "chip": WHITE,
            "check": TEAL,
            "bar": TEAL,
        }
    if name == "amber":
        return {
            "bg": (255, 247, 230, 255),
            "ink": INK,
            "mute": MUTE,
            "accent": (196, 120, 8, 255),
            "chip": WHITE,
            "check": AMBER,
            "bar": AMBER,
        }
    return {
        "bg": WHITE,
        "ink": INK,
        "mute": MUTE,
        "accent": TEAL,
        "chip": ICE,
        "check": TEAL,
        "bar": TEAL,
    }


def header(draw, c, light_mark=False, tag="Learn  ·  Build  ·  Earn"):
    draw_mark(draw, 56, 48, 72)
    wordmark(draw, 148, 50, 42, light=light_mark)
    draw.text((148, 104), tag, font=F(22), fill=c["mute"])
    draw.rectangle((0, 0, 16, 1080), fill=c["bar"])


def footer(draw, c, y=980, extra=None):
    small = F(22)
    tiny = F(20)
    line1 = extra or f"{ADDRESS}"
    draw.text((56, y), line1, font=small, fill=c["mute"])
    draw.text((56, y + 34), f"{CITY}   ·   {PHONE}   ·   {EMAIL}", font=tiny, fill=c["mute"])


def tick(draw, x, y, fill):
    r = 15
    draw.ellipse((x, y, x + r * 2, y + r * 2), fill=fill)
    draw.line((x + 8, y + 16, x + 13, y + 22), fill=WHITE, width=3)
    draw.line((x + 13, y + 22, x + 23, y + 10), fill=WHITE, width=3)


def checks(draw, items, x, y, c, max_w=960, size=30, gap=52):
    fnt = F(size)
    for item in items:
        tick(draw, x, y + 6, c["check"])
        lines = wrap(draw, item, fnt, max_w)
        for i, line in enumerate(lines):
            draw.text((x + 48, y + i * 38), line, font=fnt, fill=c["ink"])
        y += gap + max(0, (len(lines) - 1) * 36)
    return y


def save(im, name):
    OUT.mkdir(parents=True, exist_ok=True)
    path = OUT / name
    im.convert("RGB").save(path, "PNG", optimize=True)
    print("wrote", path.name)
    return path


def card(spec):
    w = h = 1080
    c = theme_colors(spec["theme"])
    im = Image.new("RGBA", (w, h), c["bg"])
    draw = ImageDraw.Draw(im)
    light = spec["theme"] == "navy"
    header(draw, c, light_mark=light, tag=spec.get("tag", "Learn  ·  Build  ·  Earn"))

    y = 168
    if spec.get("eyebrow"):
        draw.text((56, y), spec["eyebrow"].upper(), font=F(22, True), fill=c["accent"])
        y += 46

    title_f = F(spec.get("title_size", 58), True)
    for line in spec["title"].split("\n"):
        draw.text((56, y), line, font=title_f, fill=c["ink"])
        y += spec.get("title_lh", 70)
    y += 10

    if spec.get("lead"):
        lf = F(28)
        for line in wrap(draw, spec["lead"], lf, 960):
            draw.text((56, y), line, font=lf, fill=c["mute"])
            y += 38
        y += 16

    if spec.get("bullets"):
        y = checks(draw, spec["bullets"], 56, y + 8, c, max_w=930)

    if spec.get("fee"):
        y += 12
        fw = min(960, 56 + int(draw.textlength(spec["fee"], font=F(26, True)) + 48))
        rounded(draw, (56, y, fw, y + 64), 32, fill=c["chip"])
        draw.text((80, y + 16), spec["fee"], font=F(26, True), fill=c["accent"] if not light else AMBER)
        y += 80

    if spec.get("cta"):
        draw.text((56, min(y + 8, 920)), spec["cta"], font=F(28, True), fill=c["accent"])

    footer(draw, c)
    save(im, spec["id"] + ".png")
    return im


def table_card():
    c = theme_colors("light")
    im = Image.new("RGBA", (1080, 1080), WHITE)
    draw = ImageDraw.Draw(im)
    header(draw, c)
    draw.rectangle((0, 0, 16, 1080), fill=AMBER)
    draw.text((56, 168), "MONTHLY FEES", font=F(22, True), fill=TEAL)
    draw.text((56, 210), "Honest, neighbourhood\nfees", font=F(52, True), fill=INK)

    rows = [
        ("Primary  ·  Class 1–5", FEE_KIDS),
        ("Matric  ·  Class 6–10", FEE_MAIN),
        ("Higher Secondary  ·  11–12", FEE_MAIN),
        ("Computer & digital skills", FEE_MAIN),
        ("Girls section  ·  same fees", "Separate batch"),
    ]
    y = 380
    for i, (left, right) in enumerate(rows):
        bg = ICE if i % 2 == 0 else WHITE
        rounded(draw, (48, y, 1032, y + 78), 16, fill=bg)
        draw.text((72, y + 22), left, font=F(26, True), fill=INK)
        tw = draw.textlength(right, font=F(24, True))
        draw.text((1032 - tw - 28, y + 24), right, font=F(24, True), fill=TEAL)
        y += 84
    draw.text((56, 820), FEE_NOTE, font=F(22), fill=MUTE)
    footer(draw, c)
    save(im, "27_fee_structure.png")
    return im


def contact_card():
    c = theme_colors("navy")
    im = Image.new("RGBA", (1080, 1080), NAVY)
    draw = ImageDraw.Draw(im)
    header(draw, c, light_mark=True)
    draw.text((56, 168), "VISIT THE CENTRE", font=F(22, True), fill=AMBER)
    draw.text((56, 214), "Get in touch", font=F(62, True), fill=WHITE)
    rows = [
        ("WhatsApp / Call", PHONE),
        ("Email", EMAIL),
        ("Website", SITE),
        ("Hours", HOURS),
        ("Address", ADDRESS),
        ("City", CITY),
    ]
    y = 320
    for label, value in rows:
        draw.text((56, y), label, font=F(20), fill=(160, 180, 206, 255))
        draw.text((56, y + 28), value, font=F(30, True), fill=WHITE)
        y += 86
    if QR.exists():
        qr = Image.open(QR).convert("RGBA").resize((200, 200), Image.Resampling.LANCZOS)
        im.paste(qr, (820, 780), qr)
        draw.text((800, 990), "Scan for website", font=F(18), fill=(160, 180, 206, 255))
    save(im, "18_get_in_touch.png")
    return im


def location_card():
    c = theme_colors("light")
    im = Image.new("RGBA", (1080, 1080), ICE)
    draw = ImageDraw.Draw(im)
    header(draw, c)
    draw.text((56, 168), "JAMSHORO CENTRE", font=F(22, True), fill=TEAL)
    draw.text((56, 214), "Visit our\nbungalow classroom", font=F(54, True), fill=INK)
    y = 390
    for line in [
        "Bungalow No. A-132",
        "Sindh University Society",
        "Jamshoro, Sindh",
        "",
        "Near University of Sindh,",
        "Mehran University and LUMHS.",
        "",
        "Walk in  ·  Mon–Sat  10:00–18:00",
    ]:
        draw.text((56, y), line, font=F(32 if line else 16, True), fill=INK if line else MUTE)
        y += 46 if line else 20
    footer(draw, c, extra=f"{PHONE}   ·   {EMAIL}")
    save(im, "26_visit_centre.png")
    return im


POSTS = [
    {
        "id": "01_future_starts_here",
        "theme": "navy",
        "eyebrow": "HunarStack  ·  Jamshoro",
        "title": "Your future\nstarts here",
        "bullets": [
            "Academic coaching from Class 1 to 12",
            "Computer, AI, design and freelance skills",
            "Small batches and a free demo class",
            "Neighbourhood fees you can actually pay",
        ],
        "cta": "Skills today. A stronger tomorrow.",
    },
    {
        "id": "02_about_institute",
        "theme": "light",
        "eyebrow": "A neighbourhood academy",
        "title": "Learning and\nskill development",
        "lead": "A bungalow classroom in Sindh University Society for school students and beginners who want digital skills.",
        "bullets": [
            "Sindh Board coaching after school",
            "Practical computer and freelance tracks",
            "Weekly tests and parent updates",
        ],
    },
    {
        "id": "03_ai_coding_freelance",
        "theme": "navy",
        "eyebrow": "Digital skills",
        "title": "AI, coding and\nfreelancing",
        "lead": "Learn in-demand skills, build real projects, then learn how platforms work.",
        "bullets": [
            "Web, mobile, AI and data",
            "Graphic design and video editing",
            "Freelance path — no promised clients",
        ],
        "fee": f"Skills  ·  {FEE_MAIN}",
    },
    {
        "id": "04_girls_education",
        "theme": "pink",
        "tag": "Safe  ·  Focused  ·  Welcoming",
        "eyebrow": "Girls section",
        "title": "A brighter future\nfor girls",
        "bullets": [
            "Separate batch and lady teacher",
            "School subjects plus computer skills",
            "Personal attention in a small group",
            "Same honest monthly fees",
        ],
        "fee": f"Children  {FEE_KIDS}   ·   Senior  {FEE_MAIN}",
    },
    {
        "id": "05_our_courses",
        "theme": "light",
        "eyebrow": "Skills for today",
        "title": "Our digital\ncourses",
        "bullets": [
            "Web development  ·  HTML, CSS, JavaScript, React",
            "Mobile apps  ·  Flutter for iOS and Android",
            "AI and data  ·  Python and practical tools",
            "Graphic design  ·  Canva, Photoshop, Illustrator",
            "Video editing  ·  Premiere Pro and YouTube",
            "Freelancing  ·  profiles, proposals, delivery",
        ],
        "title_size": 52,
        "title_lh": 62,
    },
    {
        "id": "06_why_choose_us",
        "theme": "mint",
        "eyebrow": "Why HunarStack",
        "title": "Why families\nchoose us",
        "bullets": [
            "Experienced, qualified teachers",
            "Practical, hands-on classes",
            "Small batches — personal attention",
            "Modern computer lab at the bungalow",
            "Career guidance without fake income claims",
        ],
    },
    {
        "id": "07_primary_classes",
        "theme": "light",
        "eyebrow": "Class 1 – 5",
        "title": "Primary\nclasses",
        "lead": "Play, learn and grow with strong basics.",
        "bullets": [
            "English, Mathematics and Urdu",
            "General knowledge and moral education",
            "Computer basics and activity learning",
        ],
        "fee": f"Children  ·  {FEE_KIDS}",
    },
    {
        "id": "08_matric_classes",
        "theme": "navy",
        "eyebrow": "Class 6 – 10",
        "title": "Matric\nclasses",
        "lead": "Build knowledge and exam confidence.",
        "bullets": [
            "English, Mathematics, Science",
            "Computer, Pakistan Studies, Islamiat",
            "Weekly tests and homework support",
        ],
        "fee": f"Monthly  ·  {FEE_MAIN}",
    },
    {
        "id": "09_higher_secondary",
        "theme": "light",
        "eyebrow": "Class 11 – 12",
        "title": "Higher\nsecondary",
        "lead": "Your career starts with the right subjects.",
        "bullets": [
            "Pre-Medical and Pre-Engineering",
            "ICS, Computer Science and Humanities",
            "Concept classes plus exam preparation",
        ],
        "fee": f"Monthly  ·  {FEE_MAIN}",
    },
    {
        "id": "10_future_ready",
        "theme": "navy",
        "eyebrow": "School + skills",
        "title": "Future-ready\nstudents",
        "bullets": [
            "Quality coaching for a digital world",
            "Expert teachers and modern facilities",
            "Learn today. Lead tomorrow.",
        ],
        "cta": "Academic + computer tracks in one centre",
    },
    {
        "id": "11_free_demo",
        "theme": "amber",
        "eyebrow": "Try a class",
        "title": "Free demo\nclass",
        "bullets": [
            "Meet the teacher and see the room",
            "Sit in one academic or skills session",
            "No pressure and no fake promises",
        ],
        "cta": f"WhatsApp {PHONE} to book",
    },
    {
        "id": "12_why_freelancing",
        "theme": "light",
        "eyebrow": "An honest path",
        "title": "Why learn\nfreelancing?",
        "lead": "We teach the skill, the portfolio and how platforms work. We do not promise clients or income.",
        "bullets": [
            "Flexible hours after you have a skill",
            "Global platforms — Upwork, Fiverr and more",
            "You still find the work and deliver it",
        ],
    },
    {
        "id": "13_join_family",
        "theme": "mint",
        "eyebrow": "A supportive room",
        "title": "Join the\nHunarStack family",
        "bullets": [
            "Friendly classroom in the society",
            "Career guidance for students and parents",
            "Boys and girls batches, including a girls section",
        ],
        "cta": "Together we grow.",
    },
    {
        "id": "14_student_path",
        "theme": "navy",
        "eyebrow": "The path",
        "title": "Learn. Build.\nThen apply.",
        "lead": "HunarStack does not invent success stories. We show a path you walk yourself.",
        "bullets": [
            "Learn a subject or a digital skill",
            "Build homework, projects and a portfolio",
            "Earn only if the market and your work allow it",
        ],
    },
    {
        "id": "15_admission_open",
        "theme": "amber",
        "eyebrow": "Limited seats",
        "title": "Admission\nopen",
        "bullets": [
            "New batches for school and skills",
            "Walk in at Bungalow A-132",
            "Or WhatsApp to reserve a seat",
        ],
        "fee": f"Kids {FEE_KIDS}   ·   Senior {FEE_MAIN}",
        "cta": "Enrol now — start this month",
    },
    {
        "id": "16_smart_learning",
        "theme": "light",
        "eyebrow": "The classroom",
        "title": "Smart learning.\nSimple facilities.",
        "bullets": [
            "Computer lab and high-speed internet",
            "Comfortable rooms and small groups",
            "Safe, society location for families",
        ],
    },
    {
        "id": "17_quote",
        "theme": "navy",
        "eyebrow": "A reminder",
        "title": "The best time\nto start was\nyesterday.",
        "lead": "The next best time is a class this week in Jamshoro.",
        "cta": "Learn  ·  Build  ·  Earn",
        "title_size": 54,
        "title_lh": 66,
    },
    {
        "id": "19_special_enrollment",
        "theme": "mint",
        "eyebrow": "This month",
        "title": "Enrol early.\nPay a fair fee.",
        "bullets": [
            "Children: Rs 1,000 to 2,000 a month",
            "Matric, Inter and skills: Rs 2,000 to 3,000",
            "Free demo class before you decide",
        ],
        "cta": "No surprise packages. Confirm in person.",
    },
    {
        "id": "20_more_skills",
        "theme": "navy",
        "eyebrow": "Grow",
        "title": "More skills.\nMore options.",
        "lead": "A brighter future is built with practice — not with guaranteed dollar income.",
        "bullets": [
            "School support after class hours",
            "Digital skills for college and work",
            "Guidance for platforms and portfolios",
        ],
    },
    {
        "id": "21_web_development",
        "theme": "light",
        "eyebrow": "Skill track",
        "title": "Web\ndevelopment",
        "bullets": [
            "HTML, CSS, JavaScript and React",
            "Build real websites you can show",
            "Then learn how to offer the work",
        ],
        "fee": FEE_MAIN,
    },
    {
        "id": "22_mobile_apps",
        "theme": "navy",
        "eyebrow": "Skill track",
        "title": "Mobile app\ndevelopment",
        "bullets": [
            "Flutter for iOS and Android",
            "Build one complete app for a portfolio",
            "No promised Play Store income",
        ],
        "fee": FEE_MAIN,
    },
    {
        "id": "23_graphic_design",
        "theme": "pink",
        "eyebrow": "Skill track",
        "title": "Graphic\ndesign",
        "bullets": [
            "Canva, Photoshop and Illustrator",
            "Social posts, logos and print layouts",
            "A folder of work you can show",
        ],
        "fee": FEE_MAIN,
    },
    {
        "id": "24_video_editing",
        "theme": "navy",
        "eyebrow": "Skill track",
        "title": "Video editing\nand content",
        "bullets": [
            "Premiere Pro and YouTube basics",
            "Cut, caption and export clean videos",
            "Useful for school, business and freelance",
        ],
        "fee": FEE_MAIN,
    },
    {
        "id": "25_kids_computer",
        "theme": "mint",
        "eyebrow": "Class 1 – 8",
        "title": "Computer\nfor children",
        "bullets": [
            "Typing, Office, internet safety",
            "Fun projects instead of only theory",
            "Prepares kids for ICS and digital work",
        ],
        "fee": f"Children  ·  {FEE_KIDS}",
    },
    {
        "id": "28_whatsapp_hours",
        "theme": "light",
        "eyebrow": "Talk to us",
        "title": "WhatsApp is\nthe fastest way",
        "bullets": [
            f"Message Ghulam Mujtaba on {PHONE}",
            f"Email {EMAIL}",
            f"{HOURS} at the bungalow",
        ],
        "cta": "Ask about a seat, a demo or fees",
    },
]


def story(spec, name):
    w, h = 1080, 1920
    c = theme_colors(spec["theme"])
    im = Image.new("RGBA", (w, h), c["bg"])
    draw = ImageDraw.Draw(im)
    light = spec["theme"] == "navy"
    draw.rectangle((0, 0, 16, h), fill=c["bar"])
    draw_mark(draw, 56, 72, 80)
    wordmark(draw, 156, 80, 46, light=light)
    draw.text((156, 140), "Jamshoro  ·  Sindh", font=F(24), fill=c["mute"])

    y = 280
    if spec.get("eyebrow"):
        draw.text((56, y), spec["eyebrow"].upper(), font=F(24, True), fill=c["accent"])
        y += 56
    tf = F(64, True)
    for line in spec["title"].split("\n"):
        draw.text((56, y), line, font=tf, fill=c["ink"])
        y += 78
    y += 24
    if spec.get("lead"):
        lf = F(32)
        for line in wrap(draw, spec["lead"], lf, 960):
            draw.text((56, y), line, font=lf, fill=c["mute"])
            y += 44
        y += 20
    if spec.get("bullets"):
        y = checks(draw, spec["bullets"], 56, y, c, max_w=920, size=32, gap=70)
    if spec.get("fee"):
        y += 20
        rounded(draw, (56, y, 1024, y + 80), 40, fill=c["chip"])
        draw.text((84, y + 22), spec["fee"], font=F(28, True), fill=c["accent"] if not light else AMBER)
    draw.text((56, 1760), ADDRESS, font=F(24), fill=c["mute"])
    draw.text((56, 1804), f"{PHONE}  ·  {EMAIL}", font=F(24), fill=c["mute"])
    draw.text((56, 1848), CITY, font=F(24), fill=c["mute"])
    save(im, name)
    return im


def brochure_academic():
    w, h = 4000, 1500
    im = Image.new("RGBA", (w, h), WHITE)
    draw = ImageDraw.Draw(im)
    # cover
    draw.rectangle((0, 0, 1000, h), fill=NAVY)
    draw.rectangle((0, 0, 16, h), fill=AMBER)
    draw_mark(draw, 48, 48, 88)
    wordmark(draw, 156, 58, 44, light=True)
    draw.text((48, 170), "Learn today.\nBuild tomorrow.", font=F(52, True), fill=WHITE)
    draw.text((48, 320), "A neighbourhood learning and\nskill centre in Jamshoro.", font=F(28), fill=(198, 212, 232, 255))
    y = 440
    for t in ["Academic excellence", "Skilled teachers", "Computer lab", "Fair monthly fees"]:
        draw.ellipse((48, y + 6, 72, y + 30), fill=TEAL)
        draw.text((86, y), t, font=F(26), fill=WHITE)
        y += 48
    draw.text((48, 1280), ADDRESS, font=F(22), fill=(198, 212, 232, 255))
    draw.text((48, 1320), CITY, font=F(22), fill=(198, 212, 232, 255))
    draw.text((48, 1364), f"{PHONE}  ·  {EMAIL}", font=F(22, True), fill=AMBER)
    draw.text((48, 1410), SITE, font=F(24, True), fill=TEAL)

    # about
    x = 1040
    draw.text((x, 48), "About HunarStack", font=F(36, True), fill=INK)
    about = (
        "HunarStack is a coaching and skills centre in Sindh University Society. "
        "We help school students with Sindh Board subjects and teach practical digital skills. "
        "We do not promise jobs, clients or income."
    )
    y = 110
    for line in wrap(draw, about, F(24), 880):
        draw.text((x, y), line, font=F(24), fill=MUTE)
        y += 34
    draw.text((x, y + 16), "Why families come", font=F(30, True), fill=INK)
    y += 64
    for t in [
        "Quality coaching from Class 1 to 12",
        "Practical computer and freelance tracks",
        "Small batches and weekly tests",
        "Separate girls section available",
        "Honest fees — confirm at the centre",
    ]:
        draw.ellipse((x, y + 6, x + 22, y + 28), fill=TEAL)
        draw.text((x + 34, y), t, font=F(24), fill=INK)
        y += 48

    # courses
    x = 2020
    draw.text((x, 48), "Our courses", font=F(36, True), fill=INK)
    blocks = [
        ("Primary  ·  Class 1–5", "English, Maths, Urdu, GK, computer basics", FEE_KIDS),
        ("Matric  ·  Class 6–10", "English, Maths, Science, Computer, PST, Islamiat", FEE_MAIN),
        ("Higher Secondary  ·  11–12", "Pre-Medical, Pre-Engineering, ICS, Humanities", FEE_MAIN),
        ("Digital skills", "Web, mobile, AI, design, video, freelancing path", FEE_MAIN),
    ]
    y = 110
    for title, body, fee in blocks:
        rounded(draw, (x, y, x + 900, y + 200), 18, fill=ICE)
        draw.text((x + 24, y + 20), title, font=F(26, True), fill=INK)
        for i, line in enumerate(wrap(draw, body, F(22), 850)):
            draw.text((x + 24, y + 64 + i * 30), line, font=F(22), fill=MUTE)
        draw.text((x + 24, y + 150), fee, font=F(22, True), fill=TEAL)
        y += 220

    # fees + contact
    x = 3020
    draw.rectangle((2980, 0, w, h), fill=ICE)
    draw.text((x, 48), "Fee structure", font=F(36, True), fill=INK)
    draw.text((x, 100), "Monthly fee (PKR)", font=F(22), fill=MUTE)
    rows = [
        ("Primary (1–5)", "1,000–2,000"),
        ("Matric (6–10)", "2,000–3,000"),
        ("Higher Secondary", "2,000–3,000"),
        ("Digital skills", "2,000–3,000"),
    ]
    y = 150
    draw.rectangle((x, y, x + 880, y + 52), fill=NAVY)
    draw.text((x + 16, y + 12), "Program", font=F(22, True), fill=WHITE)
    draw.text((x + 560, y + 12), "Fee / month", font=F(22, True), fill=WHITE)
    y += 52
    for i, (a, b) in enumerate(rows):
        bg = WHITE if i % 2 == 0 else (230, 238, 248, 255)
        draw.rectangle((x, y, x + 880, y + 56), fill=bg)
        draw.text((x + 16, y + 14), a, font=F(22), fill=INK)
        draw.text((x + 560, y + 14), b, font=F(22, True), fill=TEAL)
        y += 56
    draw.text((x, y + 16), FEE_NOTE, font=F(20), fill=MUTE)

    draw.rectangle((x, 720, x + 880, 1120), fill=NAVY)
    draw.text((x + 28, 748), "Get in touch", font=F(30, True), fill=WHITE)
    draw.text((x + 28, 806), PHONE, font=F(28, True), fill=AMBER)
    draw.text((x + 28, 850), EMAIL, font=F(24), fill=ICE)
    draw.text((x + 28, 894), ADDRESS, font=F(22), fill=(198, 212, 232, 255))
    draw.text((x + 28, 932), CITY, font=F(22), fill=(198, 212, 232, 255))
    draw.text((x + 28, 976), HOURS, font=F(22), fill=ICE)
    draw.text((x + 28, 1040), "Ghulam Mujtaba  ·  Founder", font=F(22, True), fill=TEAL)
    if QR.exists():
        qr = Image.open(QR).convert("RGBA").resize((220, 220), Image.Resampling.LANCZOS)
        im.paste(qr, (x + 620, 860), qr)

    draw_mark(draw, x, 1220, 72)
    wordmark(draw, x + 92, 1234, 36)
    draw.text((x, 1320), "Follow  ·  hunarstack  ·  hunarstack.com", font=F(22), fill=MUTE)
    save(im, "brochure_academic.png")
    return im


def brochure_skills():
    w, h = 3600, 1600
    im = Image.new("RGBA", (w, h), WHITE)
    draw = ImageDraw.Draw(im)
    draw.rectangle((0, 0, 1200, h), fill=NAVY)
    draw.rectangle((0, 0, 16, h), fill=AMBER)
    draw_mark(draw, 48, 48, 88)
    wordmark(draw, 156, 58, 44, light=True)
    draw.text((48, 170), "AI, coding and\nfreelancing", font=F(56, True), fill=WHITE)
    draw.text((48, 330), "A practical institute in Jamshoro.\nLearn skills. Build projects.\nWe do not promise clients or income.", font=F(28), fill=(198, 212, 232, 255))
    y = 500
    for t in ["Practical learning", "Expert guidance", "Live projects", "Online-earning skills — taught honestly", "Flexible timings"]:
        draw.ellipse((48, y + 8, 72, y + 32), fill=TEAL)
        draw.text((86, y), t, font=F(26), fill=WHITE)
        y += 52
    draw.text((48, 1400), f"{ADDRESS}\n{CITY}\n{PHONE}  ·  {EMAIL}", font=F(24), fill=ICE)

    # courses
    x = 1260
    draw.text((x, 48), "Our courses", font=F(40, True), fill=INK)
    draw.text((x, 104), "Skill today. Freedom tomorrow — if you practise.", font=F(24), fill=MUTE)
    courses = [
        ("Web development", "HTML, CSS, JavaScript, React  ·  2–3 months"),
        ("Mobile app development", "Flutter for iOS and Android  ·  3 months"),
        ("AI and data", "Python, tools and small AI projects  ·  3 months"),
        ("Graphic design", "Canva, Photoshop, Illustrator  ·  2 months"),
        ("Video and content", "Premiere Pro and YouTube basics  ·  2 months"),
        ("Freelancing path", "Profiles, proposals, delivery  ·  1 month"),
    ]
    y = 170
    for title, body in courses:
        rounded(draw, (x, y, x + 1080, y + 120), 16, fill=ICE)
        draw.ellipse((x + 24, y + 44, x + 52, y + 72), fill=TEAL)
        draw.text((x + 72, y + 22), title, font=F(28, True), fill=INK)
        draw.text((x + 72, y + 64), body, font=F(22), fill=MUTE)
        y += 136

    # why + fees
    x = 2460
    draw.text((x, 48), "Why HunarStack?", font=F(36, True), fill=INK)
    for i, t in enumerate([
        "Experienced instructors",
        "Practical approach — you build",
        "Small batches, not a crowded hall",
        "Support after class on WhatsApp",
        "No fake dollar-income promises",
    ]):
        draw.text((x, 120 + i * 44), "▸  " + t, font=F(24), fill=INK)

    draw.rectangle((x, 380, x + 1060, 860), fill=NAVY)
    draw.text((x + 28, 404), "Course fees  ·  monthly", font=F(28, True), fill=WHITE)
    fees = [
        ("All digital skill tracks", "2,000–3,000"),
        ("Children computer class", "1,000–2,000"),
        ("Demo class", "Free"),
    ]
    yy = 470
    for a, b in fees:
        draw.text((x + 28, yy), a, font=F(24), fill=ICE)
        draw.text((x + 720, yy), b, font=F(24, True), fill=AMBER)
        yy += 50
    draw.text((x + 28, 640), "Who can join", font=F(24, True), fill=TEAL)
    draw.text((x + 28, 684), "Students, job seekers, housewives\nand anyone ready to practise.\nLimited seats. Enrol this month.", font=F(22), fill=ICE)

    draw.text((x, 900), "Get in touch", font=F(32, True), fill=INK)
    draw.text((x, 960), PHONE, font=F(30, True), fill=TEAL)
    draw.text((x, 1010), EMAIL, font=F(26), fill=INK)
    draw.text((x, 1060), ADDRESS, font=F(22), fill=MUTE)
    draw.text((x, 1100), CITY, font=F(22), fill=MUTE)
    if QR.exists():
        qr = Image.open(QR).convert("RGBA").resize((220, 220), Image.Resampling.LANCZOS)
        im.paste(qr, (x + 800, 980), qr)
    draw_mark(draw, x, 1280, 72)
    wordmark(draw, x + 92, 1294, 36)
    draw.text((x, 1380), "Follow @hunarstack   ·   hunarstack.com", font=F(22), fill=MUTE)
    save(im, "brochure_skills.png")
    return im


def poster_a4():
    w, h = 1240, 1754
    im = Image.new("RGBA", (w, h), WHITE)
    draw = ImageDraw.Draw(im)
    draw.rectangle((0, 0, w, 420), fill=NAVY)
    draw.rectangle((0, 0, 16, h), fill=AMBER)
    draw_mark(draw, 48, 40, 88)
    wordmark(draw, 156, 52, 44, light=True)
    draw.text((48, 160), "Coaching + digital skills\nin Jamshoro", font=F(48, True), fill=WHITE)
    draw.text((48, 300), "Bungalow No. A-132, Sindh University Society", font=F(26), fill=(198, 212, 232, 255))
    draw.text((48, 344), f"{PHONE}  ·  {EMAIL}  ·  {SITE}", font=F(24, True), fill=AMBER)

    y = 460
    draw.text((48, y), "Two paths. One centre.", font=F(34, True), fill=INK)
    y = 520
    cols = [
        ("School coaching", ["Primary 1–5  ·  Rs 1,000–2,000", "Matric 6–10  ·  Rs 2,000–3,000", "Inter 11–12  ·  Rs 2,000–3,000", "Girls section available"]),
        ("Digital skills", ["Web, mobile, AI, design, video", "Freelancing path — honest", "Kids computer  ·  Rs 1,000–2,000", "Skills tracks  ·  Rs 2,000–3,000"]),
    ]
    for i, (title, items) in enumerate(cols):
        x = 48 + i * 590
        rounded(draw, (x, y, x + 560, y + 420), 20, fill=ICE)
        draw.text((x + 24, y + 24), title, font=F(28, True), fill=NAVY)
        yy = y + 80
        for item in items:
            draw.ellipse((x + 24, yy + 8, x + 46, yy + 30), fill=TEAL)
            for j, line in enumerate(wrap(draw, item, F(22), 480)):
                draw.text((x + 58, yy + j * 28), line, font=F(22), fill=INK)
            yy += 70

    y = 980
    draw.text((48, y), "How a Sindh coaching centre works here", font=F(28, True), fill=INK)
    y = 1036
    for t in [
        "After-school batches for Sindh Board subjects, plus weekend slots.",
        "Small groups, weekly tests, and a message to parents when needed.",
        "Computer lab for Office, coding, design and a freelance kit.",
        "Free demo. Fees confirmed at the bungalow — no surprise packages.",
    ]:
        for line in wrap(draw, "•  " + t, F(24), 1140):
            draw.text((48, y), line, font=F(24), fill=MUTE)
            y += 34
        y += 8

    draw.rectangle((0, 1560, w, h), fill=NAVY)
    draw.text((48, 1590), "Walk in  ·  Mon–Sat 10:00–18:00  ·  Ghulam Mujtaba", font=F(26, True), fill=WHITE)
    draw.text((48, 1640), f"{PHONE}   ·   {EMAIL}   ·   {SITE}", font=F(24), fill=AMBER)
    draw.text((48, 1688), "We do not promise clients, jobs or income.", font=F(22), fill=(198, 212, 232, 255))
    save(im, "poster_centre_a4.png")
    return im


def facebook_cover_jamshoro():
    w, h = 1640, 624
    im = Image.new("RGBA", (w, h), NAVY)
    draw = ImageDraw.Draw(im)
    draw.rectangle((0, 0, 14, h), fill=AMBER)
    draw_mark(draw, 48, 40, 84)
    title = F(56, True)
    draw.text((152, 52), "hunar", font=title, fill=ICE)
    tw = draw.textlength("hunar", font=title)
    draw.text((152 + tw, 52), "stack", font=title, fill=TEAL)
    draw.text((48, 160), "Learn today. Build tomorrow.", font=F(44, True), fill=WHITE)
    draw.text((48, 224), "Coaching + digital skills in Jamshoro", font=F(28), fill=(198, 212, 232, 255))
    x = 48
    y = 290
    for lab in ["LEARN", "BUILD", "FREELANCE", "EARN", "GROW"]:
        tw = draw.textlength(lab, font=F(18, True))
        box = (x, y, x + tw + 28, y + 38)
        rounded(draw, box, 19, outline=ICE, width=2)
        draw.text((x + 14, y + 8), lab, font=F(18, True), fill=ICE)
        x = box[2] + 10
    draw.text((48, 360), SITE, font=F(32, True), fill=AMBER)
    draw.text((48, 420), "Primary Rs 1,000–2,000   ·   Matric / Inter / Skills Rs 2,000–3,000", font=F(24), fill=ICE)
    draw.text((456, 534), f"A-132 Sindh University Society, Jamshoro   ·   {PHONE}   ·   {EMAIL}", font=F(22), fill=ICE)
    out = ROOT / "facebook-cover.png"
    im.convert("RGB").save(out, "PNG", optimize=True)
    print("wrote", out.name)
    return im


def tile(images, cols, name, pad=28, bg=ICE):
    if not images:
        return None
    iw, ih = images[0].size
    rows = (len(images) + cols - 1) // cols
    W = cols * iw + (cols + 1) * pad
    H = rows * ih + (rows + 1) * pad
    sheet = Image.new("RGB", (W, H), bg[:3])
    for i, im in enumerate(images):
        r, c = divmod(i, cols)
        x = pad + c * (iw + pad)
        y = pad + r * (ih + pad)
        sheet.paste(im.convert("RGB"), (x, y))
    path = OUT / name
    sheet.save(path, "PNG", optimize=True)
    print("wrote", path.name, sheet.size)
    return sheet


def stack_sheets(top, bottom_images, name, cols):
    pad = 36
    tw, th = top.size
    bw, bh = bottom_images[0].size
    rows = (len(bottom_images) + cols - 1) // cols
    W = max(tw, cols * bw + (cols + 1) * pad) + pad
    # scale top to width
    scale = (W - pad * 2) / tw
    top_r = top.resize((int(tw * scale), int(th * scale)), Image.Resampling.LANCZOS)
    H = pad + top_r.size[1] + pad + rows * bh + (rows + 1) * pad
    sheet = Image.new("RGB", (W, H), (247, 249, 253))
    sheet.paste(top_r.convert("RGB"), (pad, pad))
    y0 = pad + top_r.size[1] + pad
    gap = (W - pad * 2 - cols * bw) // max(1, cols - 1) if cols > 1 else 0
    for i, im in enumerate(bottom_images):
        r, c = divmod(i, cols)
        x = pad + c * (bw + gap)
        y = y0 + r * (bh + pad)
        sheet.paste(im.convert("RGB"), (x, y))
    path = OUT / name
    sheet.save(path, "PNG", optimize=True)
    print("wrote", path.name, sheet.size)
    return sheet


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    squares = []
    for spec in POSTS:
        squares.append(card(spec))
    squares.insert(17, contact_card())  # 18
    # contact already saved as 18; keep order for grid: first 20 content posts
    fee = table_card()
    loc = location_card()

    stories = [
        story(POSTS[3], "story_04_girls.png"),
        story(POSTS[6], "story_07_primary.png"),
        story(POSTS[7], "story_08_matric.png"),
        story(POSTS[8], "story_09_inter.png"),
        story(POSTS[9], "story_10_future.png"),
    ]

    bro_a = brochure_academic()
    bro_s = brochure_skills()
    poster_a4()
    facebook_cover_jamshoro()

    # 20-post grid like the attached sheet (use first 20 content cards)
    first20 = [Image.open(OUT / f"{p['id']}.png") for p in POSTS[:20]]
    # POSTS has 25 items; first 18 content + we need 20. Use first 20 of generated squares by filename
    names20 = [
        "01_future_starts_here",
        "02_about_institute",
        "03_ai_coding_freelance",
        "04_girls_education",
        "05_our_courses",
        "06_why_choose_us",
        "07_primary_classes",
        "08_matric_classes",
        "09_higher_secondary",
        "10_future_ready",
        "11_free_demo",
        "12_why_freelancing",
        "13_join_family",
        "14_student_path",
        "15_admission_open",
        "16_smart_learning",
        "17_quote",
        "18_get_in_touch",
        "19_special_enrollment",
        "20_more_skills",
    ]
    imgs20 = [Image.open(OUT / f"{n}.png") for n in names20]
    tile(imgs20, 5, "sheet_social_20.png", pad=24)

    extras = [
        Image.open(OUT / "21_web_development.png"),
        Image.open(OUT / "22_mobile_apps.png"),
        Image.open(OUT / "23_graphic_design.png"),
        Image.open(OUT / "24_video_editing.png"),
        Image.open(OUT / "25_kids_computer.png"),
        Image.open(OUT / "26_visit_centre.png"),
        Image.open(OUT / "27_fee_structure.png"),
        Image.open(OUT / "28_whatsapp_hours.png"),
    ]
    tile(extras, 4, "sheet_social_extra.png", pad=24)
    tile(stories, 5, "sheet_stories.png", pad=20)

    stack_sheets(bro_a, stories, "sheet_academic_pack.png", 5)
    skill_bottom = [
        Image.open(OUT / "03_ai_coding_freelance.png"),
        Image.open(OUT / "12_why_freelancing.png"),
        Image.open(OUT / "14_student_path.png"),
        Image.open(OUT / "26_visit_centre.png"),
    ]
    stack_sheets(bro_s, skill_bottom, "sheet_skills_pack.png", 4)
    print("done", len(list(OUT.glob("*.png"))), "files in", OUT)


if __name__ == "__main__":
    main()
