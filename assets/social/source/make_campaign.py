#!/usr/bin/env python3
"""HunarStack 50-image campaign — two separate visual systems."""
from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = Path("/Users/apple/Downloads/Hunarstack-Complete-Package/assets/social")
IMG = ROOT / "images"
FONTS = ROOT / "source"
POSTS_A = ROOT / "posts" / "professional"
POSTS_B = ROOT / "posts" / "students"
BAN_A = ROOT / "banners" / "professional"
BAN_B = ROOT / "banners" / "students"
STOR_A = ROOT / "stories" / "professional"
STOR_B = ROOT / "stories" / "students"

NAVY = (15, 39, 71, 255)
NAVY_DEEP = (8, 22, 42, 255)
TEAL = (18, 165, 148, 255)
AMBER = (242, 165, 22, 255)
BLUE = (91, 143, 214, 255)
ICE = (238, 243, 250, 255)
WHITE = (255, 255, 255, 255)
MUTE_A = (186, 204, 226, 255)

CREAM = (255, 248, 239, 255)
WARM = (255, 236, 214, 255)
INK = (36, 28, 22, 255)
ROSE = (196, 92, 92, 255)
SKY = (74, 144, 196, 255)
LEAF = (46, 139, 110, 255)
MUTE_B = (110, 92, 78, 255)

CONTACT = "hunarstack.com   ·   0300 3740708"
CITY = "Jamshoro, Sindh"
BRAND = "HUNARSTACK TECH ACADEMY"


def font(name, size):
    path = FONTS / name
    return ImageFont.truetype(str(path), size)


def FA(size, weight="Bold"):
    return font(f"Inter-{weight}.ttf", size)


def FB(size, weight="Bold"):
    return font(f"Poppins-{weight}.ttf", size)


def wrap(draw, text, fnt, max_w):
    words = text.replace("\n", " \n ").split()
    lines, cur = [], ""
    for w in words:
        if w == "\n":
            if cur:
                lines.append(cur)
            cur = ""
            continue
        trial = (cur + " " + w).strip()
        if draw.textlength(trial, font=fnt) <= max_w:
            cur = trial
        else:
            if cur:
                lines.append(cur)
            cur = w
    if cur:
        lines.append(cur)
    return lines


def cover(path, w, h, focus="center"):
    im = Image.open(path).convert("RGB")
    scale = max(w / im.width, h / im.height)
    nw, nh = int(im.width * scale) + 1, int(im.height * scale) + 1
    im = im.resize((nw, nh), Image.Resampling.LANCZOS)
    fx = {"left": 0, "right": nw - w, "center": (nw - w) // 2}.get(focus, (nw - w) // 2)
    fy = {"top": 0, "bottom": nh - h, "center": (nh - h) // 2}.get(focus, (nh - h) // 2)
    if focus == "face":
        fy = max(0, int((nh - h) * 0.22))
        fx = (nw - w) // 2
    return im.crop((fx, fy, fx + w, fy + h))


def photo(rel, w, h, focus="center"):
    p = IMG / rel
    if not p.exists():
        # fallback navy
        return Image.new("RGB", (w, h), NAVY[:3])
    return cover(p, w, h, focus)


def rounded(im, radius):
    im = im.convert("RGBA")
    mask = Image.new("L", im.size, 0)
    d = ImageDraw.Draw(mask)
    d.rounded_rectangle((0, 0, im.size[0], im.size[1]), radius=radius, fill=255)
    out = Image.new("RGBA", im.size, (0, 0, 0, 0))
    out.paste(im, (0, 0), mask)
    return out


def mark(draw, x, y, size):
    s = size / 120.0
    draw.rounded_rectangle((x, y, x + size, y + size), int(28 * s), fill=NAVY)
    draw.rounded_rectangle((x + 28 * s, y + 24 * s, x + 42 * s, y + 96 * s), int(4 * s), fill=ICE)
    draw.rounded_rectangle((x + 78 * s, y + 24 * s, x + 92 * s, y + 96 * s), int(4 * s), fill=ICE)
    draw.rounded_rectangle((x + 42 * s, y + 41 * s, x + 78 * s, y + 52 * s), int(2 * s), fill=TEAL)
    draw.rounded_rectangle((x + 42 * s, y + 54.5 * s, x + 78 * s, y + 65.5 * s), int(2 * s), fill=AMBER)
    draw.rounded_rectangle((x + 42 * s, y + 68 * s, x + 78 * s, y + 79 * s), int(2 * s), fill=BLUE)


def wordmark(draw, x, y, size, light=True, family="A"):
    f = FA(size, "Bold") if family == "A" else FB(size, "Bold")
    ink = ICE if light else INK
    draw.text((x, y), "hunar", font=f, fill=ink)
    tw = draw.textlength("hunar", font=f)
    draw.text((x + tw, y), "stack", font=f, fill=TEAL)
    return tw + draw.textlength("stack", font=f)


def fade(im, kind="bottom", strength=0.78):
    w, h = im.size
    overlay = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    d = ImageDraw.Draw(overlay)
    if kind == "bottom":
        for y in range(h):
            t = max(0.0, min(1.0, (y - h * 0.38) / (h * 0.62)))
            a = int(255 * strength * (t ** 1.35))
            d.line([(0, y), (w, y)], fill=(8, 22, 42, a))
    elif kind == "left":
        for x in range(w):
            t = max(0.0, min(1.0, 1 - (x - w * 0.18) / (w * 0.55)))
            a = int(255 * strength * (t ** 1.1))
            d.line([(x, 0), (x, h)], fill=(8, 22, 42, a))
    elif kind == "warm":
        for y in range(h):
            t = max(0.0, min(1.0, (y - h * 0.42) / (h * 0.58)))
            a = int(255 * 0.88 * (t ** 1.2))
            d.line([(0, y), (w, y)], fill=(48, 28, 16, a))
    base = im.convert("RGBA")
    return Image.alpha_composite(base, overlay)


def glow_bar(draw, x, y, w, h=8):
    draw.rounded_rectangle((x, y, x + w, y + h), 4, fill=TEAL)
    draw.rounded_rectangle((x + w * 0.45, y, x + w, y + h), 4, fill=AMBER)


def save(im, path):
    path.parent.mkdir(parents=True, exist_ok=True)
    im.convert("RGB").save(path, "PNG")
    print("wrote", path.relative_to(ROOT))


def pill(draw, x, y, text, fnt, fill, ink, pad=18):
    tw = draw.textlength(text, font=fnt)
    box = (x, y, x + tw + pad * 2, y + fnt.size + 22)
    draw.rounded_rectangle(box, 999, fill=fill)
    draw.text((x + pad, y + 8), text, font=fnt, fill=ink)
    return box[2]


# ---------- Concept A layouts ----------

def a_type(draw, spec, x, y, max_w, scale=1.0, light=True):
    ink = WHITE if light else ICE
    mute = MUTE_A
    kicker_f = FA(int(20 * scale), "SemiBold")
    head_f = FA(int(spec.get("head_size", 54) * scale), "ExtraBold")
    sub_f = FA(int(24 * scale), "Regular")
    price_f = FA(int(26 * scale), "Bold")
    cta_f = FA(int(20 * scale), "Bold")
    draw.text((x, y), spec.get("kicker", BRAND), font=kicker_f, fill=AMBER)
    y += int(36 * scale)
    for line in spec["headline"].split("\n"):
        draw.text((x, y), line, font=head_f, fill=ink)
        y += int(spec.get("head_lh", 62) * scale)
    y += int(10 * scale)
    if spec.get("support"):
        for line in wrap(draw, spec["support"], sub_f, max_w):
            draw.text((x, y), line, font=sub_f, fill=mute)
            y += int(34 * scale)
        y += int(8 * scale)
    if spec.get("secondary"):
        for line in wrap(draw, spec["secondary"], FA(int(20 * scale), "SemiBold"), max_w):
            draw.text((x, y), line, font=FA(int(20 * scale), "SemiBold"), fill=TEAL)
            y += int(30 * scale)
        y += int(6 * scale)
    if spec.get("price"):
        y += int(8 * scale)
        pill(draw, x, y, spec["price"], price_f, AMBER, NAVY)
        y += int(58 * scale)
    if spec.get("cta"):
        pill(draw, x, y, spec["cta"], cta_f, TEAL, WHITE)
        y += int(50 * scale)
    return y


def render_A(spec, w, h):
    layout = spec["layout"]
    ratio = w / h
    if ratio > 1.35:
        layout = "split_right"
    elif h / w > 1.55 and layout in ("glass_card", "glow_center"):
        layout = "top_photo"

    if layout == "overlay_bottom":
        im = fade(photo(spec["photo"], w, h, spec.get("focus", "face")), "bottom", 0.86)
        draw = ImageDraw.Draw(im)
        mark(draw, 40, 36, int(min(w, h) * 0.074))
        wordmark(draw, 40 + int(min(w, h) * 0.09), 48, int(34 * (w / 1080)), True, "A")
        y = int(h * 0.48) if h / w > 1.3 else int(h * 0.52)
        a_type(draw, spec, 44, y, w - 100, scale=min(1.05, w / 1080), light=True)
        draw.text((44, h - 52), CONTACT, font=FA(20, "Regular"), fill=MUTE_A)
        return im

    if layout == "overlay_left":
        im = fade(photo(spec["photo"], w, h, spec.get("focus", "right")), "left", 0.9)
        draw = ImageDraw.Draw(im)
        mark(draw, 40, 36, 72)
        wordmark(draw, 128, 50, 32, True, "A")
        a_type(draw, spec, 44, int(h * 0.22), int(w * 0.52), scale=0.95)
        draw.text((44, h - 52), CONTACT, font=FA(20), fill=MUTE_A)
        return im

    if layout == "split_right":
        im = Image.new("RGBA", (w, h), NAVY)
        pw = int(w * 0.48)
        ph = photo(spec["photo"], pw, h, spec.get("focus", "center"))
        im.paste(ph, (w - pw, 0))
        for x in range(40):
            a = int(180 * (1 - x / 40))
            ImageDraw.Draw(im).line([(w - pw - 8 + x, 0), (w - pw - 8 + x, h)], fill=(8, 22, 42, a))
        draw = ImageDraw.Draw(im)
        draw.rectangle((0, 0, 12, h), fill=AMBER)
        mark(draw, 36, 32, 68)
        wordmark(draw, 118, 46, 30, True, "A")
        a_type(draw, spec, 36, int(h * 0.20), int(w * 0.46) - 40, scale=0.86 if h < 700 else 0.95)
        draw.text((36, h - 48), CONTACT, font=FA(18), fill=MUTE_A)
        return im

    if layout == "top_photo":
        ph = int(h * 0.48)
        im = Image.new("RGBA", (w, h), NAVY_DEEP)
        im.paste(photo(spec["photo"], w, ph, spec.get("focus", "face")), (0, 0))
        draw = ImageDraw.Draw(im)
        for y in range(80):
            a = int(200 * (y / 80))
            draw.line([(0, ph - 80 + y), (w, ph - 80 + y)], fill=(8, 22, 42, a))
        mark(draw, 40, ph + 24, 64)
        wordmark(draw, 118, ph + 36, 30, True, "A")
        a_type(draw, spec, 40, ph + 110, w - 80, scale=0.92)
        draw.text((40, h - 48), CONTACT, font=FA(20), fill=MUTE_A)
        return im

    if layout == "glass_card":
        im = fade(photo(spec["photo"], w, h, spec.get("focus", "center")), "bottom", 0.45)
        card = Image.new("RGBA", (w, h), (0, 0, 0, 0))
        d = ImageDraw.Draw(card)
        m = 36
        top = int(h * 0.42)
        d.rounded_rectangle((m, top, w - m, h - 36), 28, fill=(10, 24, 44, 210))
        im = Image.alpha_composite(im.convert("RGBA"), card)
        draw = ImageDraw.Draw(im)
        mark(draw, 56, top + 24, 64)
        wordmark(draw, 136, top + 36, 30, True, "A")
        a_type(draw, spec, 56, top + 108, w - 120, scale=0.9)
        return im

    if layout == "glow_center":
        im = Image.new("RGBA", (w, h), NAVY_DEEP)
        draw = ImageDraw.Draw(im)
        # glow discs
        draw.ellipse((w // 2 - 280, 40, w // 2 + 280, 520), fill=(18, 165, 148, 36))
        draw.ellipse((w // 2 - 180, 80, w // 2 + 180, 440), fill=(242, 165, 22, 24))
        draw = ImageDraw.Draw(im)
        mark(draw, 40, 36, 68)
        wordmark(draw, 124, 50, 32, True, "A")
        pw = int(min(w, h) * 0.42)
        p = rounded(photo(spec["photo"], pw, pw, spec.get("focus", "face")), pw // 2)
        im.paste(p, ((w - pw) // 2, int(h * 0.16)), p)
        draw = ImageDraw.Draw(im)
        a_type(draw, spec, 48, int(h * 0.58), w - 96, scale=0.9)
        draw.text((48, h - 48), CONTACT, font=FA(20), fill=MUTE_A)
        return im

    # default
    return render_A({**spec, "layout": "overlay_bottom"}, w, h)


# ---------- Concept B layouts ----------

def b_type(draw, spec, x, y, max_w, scale=1.0):
    kicker_f = FB(int(18 * scale), "SemiBold")
    head_f = FB(int(spec.get("head_size", 48) * scale), "ExtraBold")
    sub_f = FB(int(22 * scale), "Regular")
    price_f = FB(int(24 * scale), "Bold")
    cta_f = FB(int(18 * scale), "Bold")
    draw.text((x, y), spec.get("kicker", "HUNARSTACK  ·  STUDENTS"), font=kicker_f, fill=ROSE)
    y += int(34 * scale)
    for line in spec["headline"].split("\n"):
        draw.text((x, y), line, font=head_f, fill=INK)
        y += int(spec.get("head_lh", 56) * scale)
    y += int(8 * scale)
    if spec.get("support"):
        for line in wrap(draw, spec["support"], sub_f, max_w):
            draw.text((x, y), line, font=sub_f, fill=MUTE_B)
            y += int(32 * scale)
        y += int(6 * scale)
    if spec.get("secondary"):
        for line in wrap(draw, spec["secondary"], FB(int(18 * scale), "SemiBold"), max_w):
            draw.text((x, y), line, font=FB(int(18 * scale), "SemiBold"), fill=LEAF)
            y += int(28 * scale)
        y += 4
    if spec.get("price"):
        y += 6
        pill(draw, x, y, spec["price"], price_f, WARM, INK)
        y += int(54 * scale)
    if spec.get("cta"):
        pill(draw, x, y, spec["cta"], cta_f, ROSE, WHITE)
        y += int(48 * scale)
    return y


def render_B(spec, w, h):
    layout = spec["layout"]
    ratio = w / h
    if ratio > 1.35:
        layout = "split_photo"
    elif h / w > 1.55 and layout in ("sunshine", "polaroid"):
        layout = "cream_stack"

    if layout == "cream_stack":
        im = Image.new("RGBA", (w, h), CREAM)
        draw = ImageDraw.Draw(im)
        draw.rectangle((0, 0, 14, h), fill=ROSE)
        mark(draw, 36, 28, 64)
        wordmark(draw, 114, 40, 30, False, "B")
        ph = int(h * 0.40)
        p = rounded(photo(spec["photo"], w - 72, ph, spec.get("focus", "face")), 28)
        im.paste(p, (36, 112), p)
        draw = ImageDraw.Draw(im)
        b_type(draw, spec, 40, 112 + ph + 28, w - 90, scale=min(1.0, w / 1080))
        draw.text((40, h - 48), f"{CONTACT}   ·   {CITY}", font=FB(16, "Regular"), fill=MUTE_B)
        return im

    if layout == "warm_overlay":
        im = fade(photo(spec["photo"], w, h, spec.get("focus", "face")), "warm", 0.82)
        draw = ImageDraw.Draw(im)
        mark(draw, 36, 32, 64)
        wordmark(draw, 114, 44, 30, True, "B")
        y = int(h * 0.50)
        # lighten type on dark warm fade
        kicker_f = FB(18, "SemiBold")
        head_f = FB(spec.get("head_size", 48), "ExtraBold")
        draw.text((40, y), spec.get("kicker", "HUNARSTACK  ·  STUDENTS"), font=kicker_f, fill=AMBER)
        y += 36
        for line in spec["headline"].split("\n"):
            draw.text((40, y), line, font=head_f, fill=WHITE)
            y += spec.get("head_lh", 56)
        y += 8
        if spec.get("support"):
            for line in wrap(draw, spec["support"], FB(22, "Regular"), w - 90):
                draw.text((40, y), line, font=FB(22, "Regular"), fill=(255, 230, 210, 255))
                y += 32
        if spec.get("secondary"):
            y += 6
            for line in wrap(draw, spec["secondary"], FB(18, "SemiBold"), w - 90):
                draw.text((40, y), line, font=FB(18, "SemiBold"), fill=(255, 210, 160, 255))
                y += 28
        if spec.get("price"):
            y += 10
            pill(draw, 40, y, spec["price"], FB(24, "Bold"), AMBER, INK)
            y += 56
        if spec.get("cta"):
            pill(draw, 40, y, spec["cta"], FB(18, "Bold"), WHITE, ROSE)
        draw.text((40, h - 48), CONTACT, font=FB(16), fill=(255, 230, 210, 255))
        return im

    if layout == "split_photo":
        im = Image.new("RGBA", (w, h), CREAM)
        pw = int(w * 0.46)
        im.paste(photo(spec["photo"], pw, h, spec.get("focus", "face")), (0, 0))
        draw = ImageDraw.Draw(im)
        draw.rectangle((pw, 0, pw + 10, h), fill=AMBER)
        mark(draw, pw + 28, 28, 60)
        wordmark(draw, pw + 100, 40, 26, False, "B")
        b_type(draw, spec, pw + 28, int(h * 0.18), w - pw - 56, scale=0.82 if h < 700 else 0.9)
        draw.text((pw + 28, h - 44), CONTACT, font=FB(15), fill=MUTE_B)
        return im

    if layout == "polaroid":
        im = Image.new("RGBA", (w, h), WARM)
        draw = ImageDraw.Draw(im)
        mark(draw, 36, 28, 60)
        wordmark(draw, 110, 40, 28, False, "B")
        frame = 28
        pw, ph = w - 80, int(h * 0.38)
        p = photo(spec["photo"], pw, ph, spec.get("focus", "face"))
        card = Image.new("RGBA", (pw + frame * 2, ph + frame + 36), WHITE)
        card.paste(p, (frame, frame))
        im.paste(card, (40, 110))
        draw = ImageDraw.Draw(im)
        b_type(draw, spec, 40, 110 + ph + frame + 52, w - 80, scale=0.92)
        draw.text((40, h - 48), f"{CONTACT}   ·   {CITY}", font=FB(16), fill=MUTE_B)
        return im

    if layout == "sunshine":
        im = Image.new("RGBA", (w, h), CREAM)
        draw = ImageDraw.Draw(im)
        draw.ellipse((-180, -200, 420, 380), fill=WARM)
        draw.ellipse((w - 280, h - 240, w + 80, h + 80), fill=(255, 228, 200, 255))
        mark(draw, 36, 32, 64)
        wordmark(draw, 114, 44, 30, False, "B")
        pw = int(min(w, h) * 0.40)
        p = rounded(photo(spec["photo"], pw, pw, spec.get("focus", "face")), 28)
        im.paste(p, (w - pw - 40, 120), p)
        draw = ImageDraw.Draw(im)
        b_type(draw, spec, 40, int(h * 0.42), int(w * 0.62), scale=0.95)
        draw.text((40, h - 48), f"{CONTACT}   ·   {CITY}", font=FB(16), fill=MUTE_B)
        return im

    if layout == "two_up":
        im = Image.new("RGBA", (w, h), CREAM)
        draw = ImageDraw.Draw(im)
        mark(draw, 36, 28, 60)
        wordmark(draw, 110, 40, 28, False, "B")
        extras = spec.get("photo2") or spec["photo"]
        a = rounded(photo(spec["photo"], int(w * 0.44), int(h * 0.28), "face"), 22)
        b = rounded(photo(extras, int(w * 0.44), int(h * 0.28), "center"), 22)
        im.paste(a, (36, 110), a)
        im.paste(b, (w - int(w * 0.44) - 36, 110), b)
        draw = ImageDraw.Draw(im)
        b_type(draw, spec, 40, int(h * 0.44), w - 80, scale=0.95)
        draw.text((40, h - 48), f"{CONTACT}   ·   {CITY}", font=FB(16), fill=MUTE_B)
        return im

    return render_B({**spec, "layout": "cream_stack"}, w, h)


A_POSTS = [
    dict(id="A01", slug="build-your-digital-future", layout="overlay_bottom", photo="professional/collab-table.jpg", focus="face",
         headline="BUILD YOUR\nDIGITAL FUTURE", support="Programming  ·  AI  ·  Digital Skills  ·  Freelancing",
         price="Courses from PKR 2,000–3,000", cta="Start Learning", head_size=56),
    dict(id="A02", slug="learn-build-grow", layout="split_right", photo="professional/standup.jpg",
         headline="LEARN.\nBUILD.\nGROW.", support="Learn practical skills and turn knowledge into opportunities.",
         price="PKR 2,000–3,000", head_size=58, head_lh=64),
    dict(id="A03", slug="learn-to-code", layout="overlay_left", photo="coding/dev-focus.jpg", focus="left",
         headline="LEARN TO\nCODE", support="Start your programming journey with practical learning.",
         price="From PKR 2,000–3,000", cta="Explore Courses"),
    dict(id="A04", slug="first-website", layout="top_photo", photo="coding/dev-desk.jpg",
         headline="BUILD YOUR\nFIRST WEBSITE", support="Learn how ideas become real websites and digital projects.",
         price="PKR 2,000–3,000"),
    dict(id="A05", slug="learn-ai", layout="glass_card", photo="ai/circuit.jpg",
         headline="LEARN AI.\nCREATE MORE.", support="Discover modern AI tools and learn how technology can help you work smarter.",
         price="PKR 2,000–3,000"),
    dict(id="A06", slug="curious-freelancing", layout="overlay_bottom", photo="freelancing/cafe-work.jpg", focus="face",
         headline="CURIOUS ABOUT\nFREELANCING?", support="Learn how freelancing works, build your skills and understand how to approach online opportunities.",
         price="PKR 2,000–3,000", head_size=46, head_lh=54),
    dict(id="A07", slug="online-work", layout="split_right", photo="freelancing/home-office.jpg",
         headline="LEARN HOW\nONLINE WORK\nWORKS", support="Skills first. Practice next. Opportunities follow.",
         head_size=48, head_lh=56),
    dict(id="A08", slug="dont-just-learn", layout="overlay_left", photo="coding/laptop-code.jpg",
         headline="DON'T JUST\nLEARN. BUILD.", support="Create projects that can become part of your portfolio.",
         cta="See the path"),
    dict(id="A09", slug="new-doors", layout="glow_center", photo="professional/window-laptop.jpg", focus="face",
         headline="YOUR SKILLS CAN\nOPEN NEW DOORS", support="Build practical digital skills for the modern economy.",
         head_size=42, head_lh=50),
    dict(id="A10", slug="student-today", layout="top_photo", photo="campus/campus-walk.jpg", focus="face",
         headline="STUDENT TODAY.\nSKILLED TOMORROW.", support="Start building useful digital skills while you study.",
         price="From PKR 2,000–3,000", head_size=42, head_lh=52),
    dict(id="A11", slug="her-future", layout="overlay_bottom", photo="girls/south-asian-student.jpg", focus="face",
         headline="HER FUTURE.\nHER SKILLS.", support="Helping girls explore technology, AI, creativity and digital skills.",
         secondary="Dedicated classes & female instructor available for girls.",
         price="PKR 2,000–3,000", head_size=50),
    dict(id="A12", slug="work-from-anywhere", layout="glass_card", photo="girls/woman-smile-laptop.jpg", focus="face",
         headline="LEARN. CREATE.\nWORK FROM\nANYWHERE.", support="Build digital skills and discover how online freelancing works.",
         secondary="Dedicated classes & female instructor available for girls.",
         head_size=42, head_lh=50),
    dict(id="A13", slug="code-plus-ai", layout="overlay_left", photo="ai/pexels-ai.jpg",
         headline="CODE + AI =\nNEW POSSIBILITIES", support="Explore modern technology through practical learning.",
         price="PKR 2,000–3,000", head_size=44, head_lh=54),
    dict(id="A14", slug="creativity-skill", layout="split_right", photo="girls/woman-presenting.jpg", focus="face",
         headline="TURN CREATIVITY\nINTO A SKILL", support="Learn digital design and creative tools.",
         price="From PKR 2,000–3,000"),
    dict(id="A15", slug="digital-products", layout="top_photo", photo="professional/desk-work.jpg",
         headline="BUILD DIGITAL\nPRODUCTS", support="Learn how technology ideas become real applications and projects.",
         price="PKR 2,000–3,000"),
    dict(id="A16", slug="less-theory", layout="overlay_bottom", photo="professional/workshop.jpg", focus="center",
         headline="LESS THEORY.\nMORE PRACTICE.", support="Learn by doing, experimenting and building.",
         cta="Start a project"),
    dict(id="A17", slug="confident-tech", layout="glow_center", photo="professional/pexels-office.jpg", focus="face",
         headline="BECOME CONFIDENT\nWITH TECHNOLOGY", support="Build practical computer and digital skills for today's world.",
         price="PKR 2,000–3,000", head_size=40, head_lh=48),
    dict(id="A18", slug="start-with-a-skill", layout="glass_card", photo="freelancing/video-call.jpg",
         headline="START WITH\nA SKILL", support="Skills  →  Practice  →  Portfolio  →  Freelancing",
         price="PKR 2,000–3,000"),
    dict(id="A19", slug="degree-plus-skills", layout="split_right", photo="college/lecture.jpg",
         headline="YOUR DEGREE +\nPRACTICAL SKILLS", support="Give your education an additional digital advantage.",
         price="From PKR 2,000–3,000", head_size=42, head_lh=52),
    dict(id="A20", slug="graduated", layout="overlay_bottom", photo="college/grads.jpg", focus="face",
         headline="GRADUATED?\nNOW BUILD\nYOUR SKILLS.", support="Explore practical technology and digital career skills.",
         price="PKR 2,000–3,000", head_size=46, head_lh=54),
    dict(id="A21", slug="invest-in-a-skill", layout="top_photo", photo="professional/meeting.jpg",
         headline="INVEST IN A SKILL,\nNOT JUST A\nCERTIFICATE", support="Learn practical skills that can help you navigate the digital world.",
         head_size=40, head_lh=48),
    dict(id="A22", slug="one-skill", layout="overlay_left", photo="coding/code-screen.jpg",
         headline="ONE SKILL CAN\nCHANGE YOUR\nDIRECTION", support="Start small. Learn consistently. Build something.",
         cta="Begin this month", head_size=44, head_lh=52),
    dict(id="A23", slug="not-out-of-reach", layout="glow_center", photo="professional/cowork.jpg",
         headline="PROFESSIONAL SKILLS\nSHOULDN'T FEEL\nOUT OF REACH", support="Practical digital learning.",
         price="PKR 2,000–3,000", cta="Explore HunarStack", head_size=36, head_lh=44),
    dict(id="A24", slug="admissions-pro", layout="overlay_bottom", photo="professional/team-laptops.jpg", focus="face",
         headline="ADMISSIONS\nOPEN", support="Programming  ·  AI  ·  Digital Skills  ·  Freelancing",
         price="PKR 2,000–3,000", cta="Contact HunarStack", head_size=62, head_lh=70),
    dict(id="A25", slug="digital-journey", layout="overlay_left", photo="professional/pexels-collab.jpg", focus="face",
         headline="YOUR DIGITAL\nJOURNEY STARTS\nHERE", support="Learn  ·  Build  ·  Practice  ·  Grow",
         price="Courses from PKR 2,000–3,000", cta="Start Learning", head_size=44, head_lh=52),
]

B_POSTS = [
    dict(id="B01", slug="welcome", layout="warm_overlay", photo="children/smiling-kids.jpg", focus="face",
         headline="WELCOME TO\nHUNARSTACK", support="A place where students learn, explore and grow.",
         price="Student Courses: PKR 1,000–2,000", cta="Visit the centre", head_size=50),
    dict(id="B02", slug="start-early", layout="cream_stack", photo="children/indian-kids-class.jpg", focus="face",
         headline="START LEARNING\nEARLY", support="Build confidence with computers and modern technology.",
         price="PKR 1,000–2,000"),
    dict(id="B03", slug="matric", layout="split_photo", photo="matric/teens-laptops.jpg", focus="face",
         headline="MATRIC STUDENTS —\nYOUR FUTURE\nSTARTS NOW", support="Build practical skills alongside your studies.",
         price="PKR 1,000–2,000", head_size=36, head_lh=44),
    dict(id="B04", slug="college", layout="warm_overlay", photo="college/study-notes.jpg",
         headline="COLLEGE +\nDIGITAL SKILLS", support="Prepare yourself for a changing digital world.",
         price="PKR 1,000–2,000"),
    dict(id="B05", slug="more-than-books", layout="polaroid", photo="classroom/books-stack.jpg",
         headline="MORE THAN\nBOOKS", support="Give children exposure to computers, creativity and technology."),
    dict(id="B06", slug="computers-confidence", layout="cream_stack", photo="children/kids-laptop.jpg", focus="face",
         headline="LEARN COMPUTERS\nWITH CONFIDENCE", support="Begin with the basics and grow step by step.",
         price="PKR 1,000–2,000", head_size=40, head_lh=50),
    dict(id="B07", slug="digital-generation", layout="warm_overlay", photo="children/boys-laptop.jpg", focus="face",
         headline="TODAY'S STUDENTS.\nTOMORROW'S DIGITAL\nGENERATION.", support="Smiling learners, guided practice, real computers.",
         head_size=38, head_lh=46),
    dict(id="B08", slug="dear-parents", layout="sunshine", photo="parents/parent-child.jpg", focus="face",
         headline="DEAR PARENTS,\nPREPARE THEM\nFOR TOMORROW", support="Education + practical technology skills.",
         price="PKR 1,000–2,000", head_size=38, head_lh=46),
    dict(id="B09", slug="let-her-learn", layout="warm_overlay", photo="girls/indian-women-class.jpg", focus="face",
         headline="LET HER LEARN.\nLET HER GROW.", support="A supportive environment for girls to learn modern skills.",
         secondary="Dedicated classes & female instructor available for girls.",
         price="PKR 1,000–2,000"),
    dict(id="B10", slug="confident-girls", layout="cream_stack", photo="girls/woman-smile-laptop.jpg", focus="face",
         headline="CONFIDENT GIRLS.\nDIGITAL SKILLS.", support="Brighter possibilities — with a female instructor available.",
         secondary="Dedicated classes & female instructor available for girls.",
         head_size=38, head_lh=48),
    dict(id="B11", slug="school-bag-laptop", layout="polaroid", photo="children/kids-learn.jpg", focus="face",
         headline="FROM SCHOOL BAG\nTO LAPTOP", support="Give your child's learning journey a modern direction."),
    dict(id="B12", slug="books-technology", layout="two_up", photo="classroom/books-stack.jpg", photo2="children/kids-laptop.jpg",
         headline="BOOKS TEACH.\nTECHNOLOGY\nEXPANDS.", support="Combine education with practical digital exposure.",
         head_size=42),
    dict(id="B13", slug="learn-confidence", layout="sunshine", photo="children/outside-kids.jpg", focus="face",
         headline="LEARN WITH\nCONFIDENCE", support="A friendly environment where students can discover new skills."),
    dict(id="B14", slug="digital-age-class", layout="cream_stack", photo="school/empty-class.jpg",
         headline="A CLASSROOM FOR\nTHE DIGITAL AGE", support="Learn. Ask. Practice. Create."),
    dict(id="B15", slug="first-step-tech", layout="warm_overlay", photo="classroom/lab-desks.jpg",
         headline="YOUR CHILD'S FIRST\nSTEP INTO\nTECHNOLOGY", support="A bright room, a first login, a teacher nearby.",
         head_size=40, head_lh=48),
    dict(id="B16", slug="students-can-code", layout="split_photo", photo="matric/teen-study.jpg", focus="face",
         headline="YES, STUDENTS\nCAN LEARN\nTO CODE", support="Introduce programming through practical and age-appropriate learning.",
         price="PKR 1,000–2,000", head_size=38, head_lh=46),
    dict(id="B17", slug="creativity-grow", layout="polaroid", photo="children/girl-books.jpg", focus="face",
         headline="LET THEIR\nCREATIVITY GROW", support="Explore digital creativity, design and technology."),
    dict(id="B18", slug="next-gen-ai", layout="cream_stack", photo="classroom/online-class.jpg",
         headline="THE NEXT GENERATION\nSHOULD UNDERSTAND AI", support="Introduce students to modern AI tools in a responsible learning environment.",
         head_size=34, head_lh=44),
    dict(id="B19", slug="after-school", layout="warm_overlay", photo="school/classroom-kids.jpg", focus="face",
         headline="AFTER SCHOOL.\nBEFORE THE FUTURE.", support="Use your time to learn something useful.",
         price="PKR 1,000–2,000"),
    dict(id="B20", slug="student-friendly-fee", layout="sunshine", photo="school/pexels-class.jpg",
         headline="QUALITY LEARNING AT\nA STUDENT-FRIENDLY FEE", support="Primary  ·  Matric  ·  College",
         price="PKR 1,000–2,000", cta="Ask about a seat", head_size=34, head_lh=44),
    dict(id="B21", slug="small-step", layout="split_photo", photo="parents/family-walk.jpg", focus="face",
         headline="A SMALL STEP TODAY\nCAN BUILD CONFIDENCE\nFOR TOMORROW", support="Walk in with your child. Meet the teacher. Try a class.",
         head_size=32, head_lh=42),
    dict(id="B22", slug="every-expert", layout="polaroid", photo="school/primary-class.jpg", focus="face",
         headline="EVERY EXPERT WAS\nONCE A BEGINNER", support="Start learning. Keep practicing."),
    dict(id="B23", slug="digital-future-kids", layout="two_up", photo="children/kids-books.jpg", photo2="school/kids-class.jpg",
         headline="PREPARE THEM FOR\nA DIGITAL FUTURE", support="Computers  ·  Technology  ·  Creativity  ·  Digital Skills",
         head_size=38, head_lh=48),
    dict(id="B24", slug="admissions-students", layout="warm_overlay", photo="school/pexels-class2.jpg", focus="face",
         headline="ADMISSIONS\nOPEN", support="Primary  ·  Matric  ·  College Students",
         price="PKR 1,000–2,000", cta="Contact HunarStack", head_size=58, head_lh=66),
    dict(id="B25", slug="their-future", layout="cream_stack", photo="children/smiling-kids.jpg", focus="face",
         headline="THEIR FUTURE STARTS\nWITH LEARNING", support="Learn  ·  Explore  ·  Create  ·  Grow",
         price="Student Courses from PKR 1,000–2,000", cta="Welcome in", head_size=38, head_lh=48),
]

A_BANNERS = [
    dict(id="BA1", slug="learn-digital-skills", layout="split_right", photo="coding/dev-focus.jpg",
         headline="LEARN DIGITAL\nSKILLS", support="Programming  ·  AI  ·  Freelancing  ·  Technology",
         price="PKR 2,000–3,000", head_size=42, head_lh=48),
    dict(id="BA2", slug="build-future", layout="overlay_left", photo="professional/collab-table.jpg",
         headline="BUILD YOUR\nDIGITAL FUTURE", support="Learn  →  Practice  →  Build  →  Grow", head_size=40, head_lh=46),
    dict(id="BA3", slug="freelance-journey", layout="split_right", photo="freelancing/cafe-work.jpg",
         headline="START YOUR\nFREELANCING JOURNEY", support="Learn skills before chasing opportunities.",
         price="PKR 2,000–3,000", head_size=34, head_lh=42),
    dict(id="BA4", slug="learn-ai-tech", layout="overlay_left", photo="ai/circuit.jpg",
         headline="LEARN AI. LEARN\nTECHNOLOGY. BUILD\nYOUR FUTURE.", support="Practical tools. Honest guidance.", head_size=34, head_lh=40),
    dict(id="BA5", slug="programming-digital", layout="split_right", photo="coding/laptop-code.jpg",
         headline="PROGRAMMING &\nDIGITAL SKILLS", support="Professional learning from PKR 2,000–3,000",
         price="PKR 2,000–3,000", head_size=38, head_lh=44),
    dict(id="BA6", slug="uni-young-pro", layout="overlay_left", photo="campus/campus-walk.jpg",
         headline="FOR UNIVERSITY\nSTUDENTS & YOUNG\nPROFESSIONALS", support="Build skills beyond the classroom.", head_size=32, head_lh=40),
    dict(id="BA7", slug="empowering-girls", layout="split_right", photo="girls/woman-glasses.jpg",
         headline="EMPOWERING GIRLS\nWITH DIGITAL SKILLS", support="Dedicated classes & female instructor available.",
         price="PKR 2,000–3,000", head_size=34, head_lh=42),
    dict(id="BA8", slug="admissions-pro-banner", layout="overlay_left", photo="professional/team-laptops.jpg",
         headline="ADMISSIONS OPEN", support="Programming  ·  AI  ·  Freelancing  ·  Digital Skills",
         price="PKR 2,000–3,000", cta="Contact HunarStack", head_size=44, head_lh=50),
]

B_BANNERS = [
    dict(id="BB1", slug="welcome-banner", layout="split_photo", photo="children/smiling-kids.jpg",
         headline="WELCOME TO\nHUNARSTACK", support="Learning for the next generation.",
         price="Student Courses: PKR 1,000–2,000", head_size=36, head_lh=42),
    dict(id="BB2", slug="pmc", layout="split_photo", photo="school/pexels-class.jpg",
         headline="PRIMARY  ·  MATRIC\n·  COLLEGE", support="Practical learning for students.",
         price="PKR 1,000–2,000", head_size=34, head_lh=42),
    dict(id="BB3", slug="digital-advantage", layout="split_photo", photo="children/kids-laptop.jpg",
         headline="GIVE YOUR CHILD A\nDIGITAL ADVANTAGE", support="Computers  ·  Technology  ·  Creativity", head_size=32, head_lh=40),
    dict(id="BB4", slug="bag-to-skills", layout="split_photo", photo="children/kids-learn.jpg",
         headline="FROM SCHOOL BAG\nTO DIGITAL SKILLS", support="A modern direction after the last bell.", head_size=34, head_lh=42),
    dict(id="BB5", slug="brighter-future", layout="split_photo", photo="children/outside-kids.jpg",
         headline="A BRIGHTER FUTURE\nSTARTS WITH LEARNING", support="Warm rooms. Real practice. Honest fees.", head_size=30, head_lh=38),
    dict(id="BB6", slug="friendly-fees", layout="split_photo", photo="school/classroom-kids.jpg",
         headline="STUDENT-FRIENDLY\nFEES", support="Primary  ·  Matric  ·  College",
         price="PKR 1,000–2,000", head_size=40, head_lh=46),
    dict(id="BB7", slug="girls-learn-grow", layout="split_photo", photo="girls/south-asian-student.jpg",
         headline="EMPOWERING GIRLS\nTO LEARN & GROW", support="Dedicated classes & female instructor available.",
         price="PKR 1,000–2,000", head_size=32, head_lh=40),
    dict(id="BB8", slug="admissions-students-banner", layout="split_photo", photo="school/pexels-class2.jpg",
         headline="ADMISSIONS OPEN", support="Primary  ·  Matric  ·  College",
         price="PKR 1,000–2,000", cta="Contact HunarStack", head_size=42, head_lh=48),
]


def emit(spec, concept):
    name = f"{spec['id']}_{spec['slug']}.png"
    render = render_A if concept == "A" else render_B
    square_dir = (POSTS_A if concept == "A" else POSTS_B) / "square"
    port_dir = (POSTS_A if concept == "A" else POSTS_B) / "portrait"
    story_dir = STOR_A if concept == "A" else STOR_B
    save(render(spec, 1080, 1080), square_dir / name)
    save(render(spec, 1080, 1350), port_dir / name)
    save(render(spec, 1080, 1920), story_dir / name)


def emit_banner(spec, concept):
    render = render_A if concept == "A" else render_B
    dest = (BAN_A if concept == "A" else BAN_B) / f"{spec['id']}_{spec['slug']}.png"
    save(render(spec, 1200, 628), dest)


def sheet(paths, cols, dest, pad=18):
    ims = [Image.open(p).convert("RGB") for p in paths]
    iw, ih = 320, int(320 * ims[0].height / ims[0].width)
    thumbs = [im.resize((iw, ih), Image.Resampling.LANCZOS) for im in ims]
    rows = (len(thumbs) + cols - 1) // cols
    W = cols * iw + (cols + 1) * pad
    H = rows * ih + (rows + 1) * pad
    sheet_im = Image.new("RGB", (W, H), (247, 249, 253))
    for i, im in enumerate(thumbs):
        r, c = divmod(i, cols)
        sheet_im.paste(im, (pad + c * (iw + pad), pad + r * (ih + pad)))
    dest.parent.mkdir(parents=True, exist_ok=True)
    sheet_im.save(dest, "PNG", optimize=True)
    print("wrote", dest.relative_to(ROOT))


def main():
    for d in (POSTS_A / "square", POSTS_A / "portrait", POSTS_B / "square", POSTS_B / "portrait", BAN_A, BAN_B, STOR_A, STOR_B, ROOT / "previews"):
        d.mkdir(parents=True, exist_ok=True)
    for spec in A_POSTS:
        emit(spec, "A")
    for spec in B_POSTS:
        emit(spec, "B")
    for spec in A_BANNERS:
        emit_banner(spec, "A")
    for spec in B_BANNERS:
        emit_banner(spec, "B")
    a_sq = sorted((POSTS_A / "square").glob("A*.png"))
    b_sq = sorted((POSTS_B / "square").glob("B*.png"))
    sheet(a_sq, 5, ROOT / "previews" / "concept-a-25.png")
    sheet(b_sq, 5, ROOT / "previews" / "concept-b-25.png")
    sheet(sorted(BAN_A.glob("*.png")), 2, ROOT / "previews" / "banners-a.png")
    sheet(sorted(BAN_B.glob("*.png")), 2, ROOT / "previews" / "banners-b.png")
    print("done")


if __name__ == "__main__":
    main()
