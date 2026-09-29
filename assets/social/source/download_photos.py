#!/usr/bin/env python3
"""Download licensed Unsplash + Pexels photos for the HunarStack campaign."""
from __future__ import annotations

import json
import ssl
import urllib.request
from pathlib import Path

ROOT = Path("/Users/apple/Downloads/Hunarstack-Complete-Package/assets/social/images")
CTX = ssl.create_default_context()

# folder, filename, url, source, page, notes
PHOTOS = [
    # professional / campus / collab
    ("professional", "team-laptops.jpg", "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80", "Unsplash", "https://unsplash.com/photos/photo-1522071820081-009f0129c71c", "Team around a laptop"),
    ("professional", "collab-table.jpg", "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80", "Unsplash", "https://unsplash.com/photos/photo-1522202176988-66273c2fd55f", "Students collaborating"),
    ("professional", "workshop.jpg", "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1600&q=80", "Unsplash", "https://unsplash.com/photos/photo-1531482615713-2afd69097998", "Workshop"),
    ("professional", "standup.jpg", "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1600&q=80", "Unsplash", "https://unsplash.com/photos/photo-1519389950473-47ba0277781c", "Team with laptops"),
    ("professional", "office-team.jpg", "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1600&q=80", "Unsplash", "https://unsplash.com/photos/photo-1551434678-e076c223a692", "Product team"),
    ("professional", "cowork.jpg", "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1600&q=80", "Unsplash", "https://unsplash.com/photos/photo-1517245386807-bb43f82c33c4", "Coworking"),
    ("professional", "meeting.jpg", "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1600&q=80", "Unsplash", "https://unsplash.com/photos/photo-1552664730-d307ca884978", "Workshop table"),
    ("professional", "desk-work.jpg", "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=80", "Unsplash", "https://unsplash.com/photos/photo-1454165804606-c3d57bc86b40", "Laptop and notes"),
    ("professional", "window-laptop.jpg", "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=1600&q=80", "Unsplash", "https://unsplash.com/photos/photo-1486312338219-ce68d2c6f44d", "Person at laptop"),
    ("professional", "pexels-team.jpg", "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1600", "Pexels", "https://www.pexels.com/photo/3184291/", "Team meeting"),
    ("professional", "pexels-collab.jpg", "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1600", "Pexels", "https://www.pexels.com/photo/3184360/", "Women collaborating"),
    ("professional", "pexels-office.jpg", "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=1600", "Pexels", "https://www.pexels.com/photo/3184338/", "Office laptops"),
    # girls / women in tech
    ("girls", "woman-presenting.jpg", "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1600&q=80", "Unsplash", "https://unsplash.com/photos/photo-1573496359142-b8d87734a5a2", "Woman presenting"),
    ("girls", "woman-tech.jpg", "https://images.unsplash.com/photo-1573164574572-cb89e39749b4?auto=format&fit=crop&w=1600&q=80", "Unsplash", "https://unsplash.com/photos/photo-1573164574572-cb89e39749b4", "Woman with laptop"),
    ("girls", "woman-instructor.jpg", "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&w=1600&q=80", "Unsplash", "https://unsplash.com/photos/photo-1580894732444-8ecded7900cd", "Woman teaching"),
    ("girls", "woman-speak.jpg", "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1600&q=80", "Unsplash", "https://unsplash.com/photos/photo-1551836022-d5d88e9218df", "Woman speaking"),
    ("girls", "woman-glasses.jpg", "https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&w=1600", "Pexels", "https://www.pexels.com/photo/1181396/", "Woman with glasses laptop"),
    ("girls", "woman-desk.jpg", "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=1600", "Pexels", "https://www.pexels.com/photo/1181686/", "Woman at desk"),
    ("girls", "woman-smile-laptop.jpg", "https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=1600", "Pexels", "https://www.pexels.com/photo/3756679/", "Woman smiling with laptop"),
    ("girls", "women-row.jpg", "https://images.pexels.com/photos/1181533/pexels-photo-1181533.jpeg?auto=compress&cs=tinysrgb&w=1600", "Pexels", "https://www.pexels.com/photo/1181533/", "Women working"),
    ("girls", "student-girl.jpg", "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?auto=format&fit=crop&w=1600&q=80", "Unsplash", "https://unsplash.com/photos/photo-1544717297-fa95b6ee9643", "Young woman student"),
    ("girls", "south-asian-student.jpg", "https://images.unsplash.com/photo-1627556704290-2b1d4082f1aa?auto=format&fit=crop&w=1600&q=80", "Unsplash", "https://unsplash.com/photos/photo-1627556704290-2b1d4082f1aa", "South Asian student"),
    # coding
    ("coding", "code-screen.jpg", "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1600&q=80", "Unsplash", "https://unsplash.com/photos/photo-1461749280684-dccba630e2f6", "Code on monitor"),
    ("coding", "laptop-code.jpg", "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1600&q=80", "Unsplash", "https://unsplash.com/photos/photo-1517694712202-14dd9538aa97", "Laptop with code"),
    ("coding", "dev-desk.jpg", "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1600&q=80", "Unsplash", "https://unsplash.com/photos/photo-1498050108023-c5249f4df085", "Developer desk"),
    ("coding", "pexels-code.jpg", "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=1600", "Pexels", "https://www.pexels.com/photo/1181675/", "Coding close-up"),
    ("coding", "dark-code.jpg", "https://images.pexels.com/photos/5473955/pexels-photo-5473955.jpeg?auto=compress&cs=tinysrgb&w=1600", "Pexels", "https://www.pexels.com/photo/5473955/", "Dark coding setup"),
    ("coding", "dev-focus.jpg", "https://images.pexels.com/photos/7988079/pexels-photo-7988079.jpeg?auto=compress&cs=tinysrgb&w=1600", "Pexels", "https://www.pexels.com/photo/7988079/", "Developer focused"),
    # ai
    ("ai", "ai-abstract.jpg", "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1600&q=80", "Unsplash", "https://unsplash.com/photos/photo-1677442136019-21780ecad995", "AI / neural visual"),
    ("ai", "dashboard.jpg", "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80", "Unsplash", "https://unsplash.com/photos/photo-1551288049-bebda4e38f71", "Data dashboard"),
    ("ai", "pexels-ai.jpg", "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1600", "Pexels", "https://www.pexels.com/photo/8386440/", "AI / robot hand"),
    ("ai", "circuit.jpg", "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1600", "Pexels", "https://www.pexels.com/photo/3861969/", "Tech glow"),
    # freelancing
    ("freelancing", "video-call.jpg", "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1600&q=80", "Unsplash", "https://unsplash.com/photos/photo-1600880292203-757bb62b4baf", "Team video call"),
    ("freelancing", "remote-desk.jpg", "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=80", "Unsplash", "https://unsplash.com/photos/photo-1516321318423-f06f85e504b3", "Online learning"),
    ("freelancing", "cafe-work.jpg", "https://images.pexels.com/photos/2102416/pexels-photo-2102416.jpeg?auto=compress&cs=tinysrgb&w=1600", "Pexels", "https://www.pexels.com/photo/2102416/", "Remote cafe work"),
    ("freelancing", "home-office.jpg", "https://images.pexels.com/photos/4065876/pexels-photo-4065876.jpeg?auto=compress&cs=tinysrgb&w=1600", "Pexels", "https://www.pexels.com/photo/4065876/", "Home office laptop"),
    ("freelancing", "team-call.jpg", "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?auto=format&fit=crop&w=1600&q=80", "Unsplash", "https://unsplash.com/photos/photo-1600880292089-90a7e086ee0c", "Small team"),
    # campus / college / matric
    ("campus", "campus-walk.jpg", "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1600&q=80", "Unsplash", "https://unsplash.com/photos/photo-1523240795612-9a054b0db644", "Campus students"),
    ("campus", "graduation.jpg", "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1600&q=80", "Unsplash", "https://unsplash.com/photos/photo-1523050854058-8df90110c9f1", "Graduation"),
    ("campus", "uni-steps.jpg", "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1600&q=80", "Unsplash", "https://unsplash.com/photos/photo-1541339907198-e08756dedf3f", "University building"),
    ("college", "lecture.jpg", "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1600&q=80", "Unsplash", "https://unsplash.com/photos/photo-1524178232363-1fb2b075b655", "Lecture hall"),
    ("college", "study-notes.jpg", "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1600&q=80", "Unsplash", "https://unsplash.com/photos/photo-1434030216411-0b793f4b4173", "Student writing"),
    ("college", "grads.jpg", "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=1600&q=80", "Unsplash", "https://unsplash.com/photos/photo-1523580494863-6f3031224c94", "Graduation group"),
    ("matric", "teen-study.jpg", "https://images.pexels.com/photos/4144923/pexels-photo-4144923.jpeg?auto=compress&cs=tinysrgb&w=1600", "Pexels", "https://www.pexels.com/photo/4144923/", "Teen studying"),
    ("matric", "teens-laptops.jpg", "https://images.pexels.com/photos/7742822/pexels-photo-7742822.jpeg?auto=compress&cs=tinysrgb&w=1600", "Pexels", "https://www.pexels.com/photo/7742822/", "Teens with teacher and laptops"),
    ("matric", "teen-books.jpg", "https://images.pexels.com/photos/4144222/pexels-photo-4144222.jpeg?auto=compress&cs=tinysrgb&w=1600", "Pexels", "https://www.pexels.com/photo/4144222/", "Student with books"),
    # school / children / classroom
    ("school", "classroom-kids.jpg", "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1600&q=80", "Unsplash", "https://unsplash.com/photos/photo-1509062522246-3755977927d7", "Teacher with children"),
    ("school", "kids-class.jpg", "https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=1600&q=80", "Unsplash", "https://unsplash.com/photos/photo-1588072432836-e10032774350", "Classroom of children"),
    ("school", "primary-class.jpg", "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1600&q=80", "Unsplash", "https://unsplash.com/photos/photo-1503676260728-1c00da094a0b", "Primary classroom"),
    ("school", "raising-hands.jpg", "https://images.unsplash.com/photo-1427503421767-2d0d758d7c1e?auto=format&fit=crop&w=1600&q=80", "Unsplash", "https://unsplash.com/photos/photo-1427503421767-2d0d758d7c1e", "Children raising hands"),
    ("school", "empty-class.jpg", "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1600&q=80", "Unsplash", "https://unsplash.com/photos/photo-1580582932707-520aed937b7b", "Bright classroom"),
    ("school", "pexels-class.jpg", "https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=1600", "Pexels", "https://www.pexels.com/photo/5212345/", "Classroom"),
    ("school", "pexels-class2.jpg", "https://images.pexels.com/photos/5212320/pexels-photo-5212320.jpeg?auto=compress&cs=tinysrgb&w=1600", "Pexels", "https://www.pexels.com/photo/5212320/", "Students in class"),
    ("children", "kids-laptop.jpg", "https://images.pexels.com/photos/4145354/pexels-photo-4145354.jpeg?auto=compress&cs=tinysrgb&w=1600", "Pexels", "https://www.pexels.com/photo/4145354/", "Children with laptop"),
    ("children", "boys-laptop.jpg", "https://images.pexels.com/photos/11025022/pexels-photo-11025022.jpeg?auto=compress&cs=tinysrgb&w=1600", "Pexels", "https://www.pexels.com/photo/11025022/", "Two boys using a laptop"),
    ("children", "kids-learn.jpg", "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?auto=format&fit=crop&w=1600&q=80", "Unsplash", "https://unsplash.com/photos/photo-1606092195730-5d7b9af1efc5", "Children learning"),
    ("children", "kids-books.jpg", "https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=1600&q=80", "Unsplash", "https://unsplash.com/photos/photo-1503676382389-4809596d5290", "Children with books"),
    ("children", "smiling-kids.jpg", "https://images.unsplash.com/photo-1472162072942-cd5647c91571?auto=format&fit=crop&w=1600&q=80", "Unsplash", "https://unsplash.com/photos/photo-1472162072942-cd5647c91571", "Smiling children"),
    ("children", "outside-kids.jpg", "https://images.unsplash.com/photo-1460518451285-97b2c955d274?auto=format&fit=crop&w=1600&q=80", "Unsplash", "https://unsplash.com/photos/photo-1460518451285-97b2c955d274", "Children outdoors"),
    ("children", "girl-books.jpg", "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1600&q=80", "Unsplash", "https://unsplash.com/photos/photo-1544717305-2782549b5136", "Girl with books"),
    ("classroom", "lab-desks.jpg", "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1600&q=80", "Unsplash", "https://unsplash.com/photos/photo-1577896851231-70ef18881754", "School computer/classroom"),
    ("classroom", "books-stack.jpg", "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1600&q=80", "Unsplash", "https://unsplash.com/photos/photo-1497633762265-9d179a990aa6", "Stack of books"),
    ("classroom", "library.jpg", "https://images.unsplash.com/photo-14565130808-af2872946792?auto=format&fit=crop&w=1600&q=80", "Unsplash", "https://unsplash.com/photos/photo-14565130808-af2872946792", "Student in library"),
    ("classroom", "online-class.jpg", "https://images.pexels.com/photos/5905700/pexels-photo-5905700.jpeg?auto=compress&cs=tinysrgb&w=1600", "Pexels", "https://www.pexels.com/photo/5905700/", "Online class"),
    # parents
    ("parents", "parent-child.jpg", "https://images.unsplash.com/photo-1476703993599-0789a5c529c7?auto=format&fit=crop&w=1600&q=80", "Unsplash", "https://unsplash.com/photos/photo-1476703993599-0789a5c529c7", "Parent and child"),
    ("parents", "family-walk.jpg", "https://images.unsplash.com/photo-1511629091441-ee4614ea885f?auto=format&fit=crop&w=1600&q=80", "Unsplash", "https://unsplash.com/photos/photo-1511629091441-ee4614ea885f", "Adult with child"),
    ("parents", "family-park.jpg", "https://images.unsplash.com/photo-1475724017904-b712052c192a?auto=format&fit=crop&w=1600&q=80", "Unsplash", "https://unsplash.com/photos/photo-1475724017904-b712052c192a", "Family outdoors"),
]


def fetch(url: str, dest: Path) -> bool:
    dest.parent.mkdir(parents=True, exist_ok=True)
    req = urllib.request.Request(url, headers={"User-Agent": "HunarStackCampaign/1.0"})
    try:
        with urllib.request.urlopen(req, context=CTX, timeout=40) as r:
            data = r.read()
        if len(data) < 8000:
            print("too small", dest.name, len(data))
            return False
        dest.write_bytes(data)
        print("ok", dest.relative_to(ROOT), len(data))
        return True
    except Exception as e:
        print("fail", dest.name, e)
        return False


def main():
    meta = []
    for folder, name, url, source, page, notes in PHOTOS:
        dest = ROOT / folder / name
        ok = fetch(url, dest)
        meta.append({
            "filename": f"{folder}/{name}",
            "source": source,
            "original_url": page,
            "download_url": url,
            "creator": f"See {source} photo page",
            "license": "Unsplash License" if source == "Unsplash" else "Pexels License",
            "license_url": "https://unsplash.com/license" if source == "Unsplash" else "https://www.pexels.com/license/",
            "notes": notes,
            "downloaded": ok,
        })
    (ROOT.parent / "image-sources.json").write_text(json.dumps(meta, indent=2))
    print("done", sum(1 for m in meta if m["downloaded"]), "/", len(meta))


if __name__ == "__main__":
    main()
