#!/usr/bin/env python3
"""Render Facebook profile + cover PNGs with readable type."""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageFilter

ROOT = Path("/Users/apple/Downloads/Hunarstack-Complete-Package/marketing/assets")
NAVY = (15, 39, 71, 255)
NAVY_DEEP = (10, 28, 54, 255)
ICE = (238, 243, 250, 255)
TEAL = (18, 165, 148, 255)
AMBER = (242, 165, 22, 255)
BLUE = (91, 143, 214, 255)
WHITE = (255, 255, 255, 255)
MUTE = (198, 212, 232, 255)

BOLD = "/System/Library/Fonts/Supplemental/Arial Bold.ttf"
REG = "/System/Library/Fonts/Supplemental/Arial.ttf"
AVENIR = "/System/Library/Fonts/Avenir Next.ttc"


def font(path, size, index=0):
    try:
        return ImageFont.truetype(path, size, index=index)
    except OSError:
        return ImageFont.truetype(BOLD if "Bold" in path or index else REG, size)


def rounded_rect(draw, box, radius, fill):
    draw.rounded_rectangle(box, radius=radius, fill=fill)


def draw_mark(draw, x, y, size):
    """Draw the HunarStack H mark into a square of `size` at (x, y)."""
    s = size / 120.0
    rounded_rect(draw, (x, y, x + size, y + size), int(28 * s), NAVY)
    rounded_rect(draw, (x + 28 * s, y + 24 * s, x + 42 * s, y + 96 * s), int(4 * s), ICE)
    rounded_rect(draw, (x + 78 * s, y + 24 * s, x + 92 * s, y + 96 * s), int(4 * s), ICE)
    rounded_rect(draw, (x + 42 * s, y + 41 * s, x + 78 * s, y + 52 * s), int(2 * s), TEAL)
    rounded_rect(draw, (x + 42 * s, y + 54.5 * s, x + 78 * s, y + 65.5 * s), int(2 * s), AMBER)
    rounded_rect(draw, (x + 42 * s, y + 68 * s, x + 78 * s, y + 79 * s), int(2 * s), BLUE)


def profile():
    """1024 square, full-bleed navy, large mark — survives Facebook circle crop."""
    n = 1024
    im = Image.new("RGBA", (n, n), NAVY)
    draw = ImageDraw.Draw(im)
    mark = 760
    draw_mark(draw, (n - mark) / 2, (n - mark) / 2, mark)
    out = ROOT / "facebook-profile.png"
    im.convert("RGB").save(out, "PNG", optimize=True)
    im.convert("RGB").resize((320, 320), Image.Resampling.LANCZOS).save(
        ROOT / "facebook-profile-320.png", "PNG", optimize=True
    )
    print("wrote", out)


def cover():
    """Facebook cover 1640×624. Text stays in the desktop + mobile safe zone.
    Bottom-left reserved for the overlapping profile photo.
    """
    w, h = 1640, 624
    im = Image.new("RGBA", (w, h), NAVY)
    photo_path = ROOT / "cover-classroom.png"
    if photo_path.exists():
        photo = Image.open(photo_path).convert("RGBA")
        # fill height, crop to right side
        scale = h / photo.height
        pw = int(photo.width * scale)
        photo = photo.resize((pw, h), Image.Resampling.LANCZOS)
        # place so faces sit on the right half
        im.paste(photo, (w - pw + 80, 0))
    draw = ImageDraw.Draw(im)
    # left navy panel + soft fade into photo
    for x in range(0, 1100):
        t = max(0.0, min(1.0, (x - 520) / 520))
        alpha = int(255 * (1 - t * t))
        draw.line([(x, 0), (x, h)], fill=(15, 39, 71, alpha))
    # amber accent bar
    draw.rectangle((0, 0, 14, h), fill=AMBER)

    title = font(AVENIR, 72, index=1)  # Heavy/Bold-ish
    title2 = font(AVENIR, 72, index=1)
    sub = font(AVENIR, 28, index=0)
    small = font(AVENIR, 24, index=0)
    pill = font(AVENIR, 18, index=1)

    left = 56
    # skip bottom-left 380×200 where Facebook sits the profile picture
    y = 48
    draw_mark(draw, left, y, 92)
    draw.text((left + 112, y + 18), "hunar", font=title, fill=ICE)
    tw = draw.textlength("hunar", font=title)
    draw.text((left + 112 + tw, y + 18), "stack", font=title2, fill=TEAL)

    y = 168
    headline = font(AVENIR, 52, index=1)
    draw.text((left, y), "Learn skills. Build your future.", font=headline, fill=WHITE)

    y = 240
    lead = font(REG, 26)
    draw.text((left, y), "A practical academy in Lahore. We do not promise", font=lead, fill=MUTE)
    draw.text((left, y + 34), "clients or income. We show you the path.", font=lead, fill=MUTE)

    y = 328
    labels = ["LEARN", "BUILD", "FREELANCE", "EARN", "GROW"]
    x = left
    for lab in labels:
        tw = draw.textlength(lab, font=pill)
        box = (x, y, x + tw + 28, y + 36)
        draw.rounded_rectangle(box, radius=18, outline=ICE, width=2)
        draw.text((x + 14, y + 8), lab, font=pill, fill=ICE)
        x = box[2] + 10

    y = 418
    site = font(AVENIR, 36, index=1)
    draw.text((left, y), "hunarstack.com", font=site, fill=AMBER)
    contact = font(AVENIR, 26, index=0)
    draw.text((left + 400, 534), "Ghulam Mujtaba   ·   gm@hunarstack.com   ·   0300 3740708", font=contact, fill=ICE)

    out = ROOT / "facebook-cover.png"
    im.convert("RGB").save(out, "PNG", optimize=True)
    print("wrote", out, im.size)


if __name__ == "__main__":
    ROOT.mkdir(parents=True, exist_ok=True)
    profile()
    cover()
