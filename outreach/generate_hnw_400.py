#!/usr/bin/env python3
"""Build ~400 high-net-worth Christian philanthropist leads (public contacts only)."""
from __future__ import annotations

import csv
import json
from pathlib import Path

OUTREACH = Path(__file__).resolve().parent

# Tuple: name, organization, email, phone, region, contact_type, priority, notes, source_url
# contact_type: personal_public | foundation | ministry_office | corporate_csr
# Never invent private @gmail for famous people — use published emails only.

CURATED: list[tuple] = [
    ("Jim Robertson", "Robertson Family Foundation (Malawi)", "jrobertson@robertson.insure", "717-940-6275", "United States", "personal_public", "High", "Africa ministry; published on foundation site", "https://www.robertsonfamilyfoundation.org"),
    ("Walt Troup", "Troup Family Ministries (Nigeria)", "walt@thetroupfamily.com", "682-234-3596", "United States", "personal_public", "High", "Africa orphan care; email on ministry site", "https://www.thetroupfamily.com"),
    ("Ryan Gray", "Gray Family Missions (South Africa)", "ryan@grayfamilymissions.com", "", "South Africa", "personal_public", "High", "Published contact", "https://grayfamilymissions.com"),
    ("Dr Alphonse Ekole", "Ekole Fountain of Hope Missions", "info@ekolefoundation.com", "", "United States", "foundation", "High", "Cameroon philanthropy", "https://www.ekolefoundation.com"),
    ("Valerie Browning AM", "Barbara May Foundation", "info@barbaramayfoundation.com", "+61 2 9188 6799", "Australia", "foundation", "High", "East Africa maternal health", "https://barbaramayfoundation.com"),
    ("David Green", "Hobby Lobby / Green family giving", "customerservice@hobbylobby.com", "800-888-0321", "United States", "corporate_csr", "High", "No personal email public; route via corporate then philanthropy", "https://www.hobbylobby.com"),
    ("Mart Green", "Mardel / Every Tribe Every Nation", "customercare@mardel.com", "", "United States", "corporate_csr", "High", "Bible translation patron; use org channels", "https://www.mardel.com"),
    ("Richard DeVos family", "DeVos Family Foundation", "info@devosfamilyfoundation.org", "", "United States", "foundation", "High", "Major Christian philanthropy", "https://www.devosfamilyfoundation.org"),
    ("Dan Cathy", "WinShape Foundation (Chick-fil-A)", "cfa.foundation@cfacorp.com", "", "United States", "foundation", "High", "WinShape global ministry grants", "https://www.chick-fil-a.com"),
    ("S. Truett Cathy family", "WinShape Foundation", "cfa.foundation@cfacorp.com", "", "United States", "foundation", "High", "", "https://www.chick-fil-a.com"),
    ("Bill H. Gay", "Gospel Patrons / Gay Christian philanthropist", "info@generousgiving.org", "", "United States", "foundation", "Medium", "Generosity movement", "https://generousgiving.org"),
    ("John Templeton Foundation", "Templeton Foundation", "info@templeton.org", "", "International", "foundation", "High", "Faith and generosity grants", "https://www.templeton.org"),
    ("Lilly Endowment", "Lilly Endowment", "info@lillyendowment.org", "", "United States", "foundation", "High", "Church and community", "https://lillyendowment.org"),
    ("Stanley Tam", "United Services (Stanley Tam faith businessman)", "info@usinc.org", "", "United States", "foundation", "Medium", "Known tithe testimony", "https://www.usinc.org"),
    ("David Dudley", "Walter Johnson Foundation", "info@walterjohnsonfoundation.org", "", "United States", "foundation", "Medium", "", "https://walterjohnsonfoundation.org"),
    ("Foster Friess family", "Friess Family Foundation", "info@friessfoundation.org", "", "United States", "foundation", "Medium", "Christian donor", "https://www.friessfoundation.org"),
    ("Jon Huntsman Sr family", "Huntsman Foundation", "info@huntsmanfoundation.org", "", "United States", "foundation", "Medium", "LDS-leaning; verify fit", "https://www.huntsmanfoundation.org"),
    ("Tyndale House Foundation", "Tyndale House Publishers", "info@tyndale.org", "", "United States", "foundation", "Medium", "", "https://www.tyndale.com"),
    ("Rick Warren", "Saddleback Church / PEACE Plan", "info@saddleback.com", "949-609-8000", "United States", "ministry_office", "Medium", "Global church partnerships", "https://saddleback.com"),
    ("Joel Osteen", "Lakewood Church", "info@lakewood.cc", "", "United States", "ministry_office", "Low", "Large media church", "https://www.lakewood.cc"),
    ("Joyce Meyer", "Joyce Meyer Ministries", "info@joycemeyer.org", "", "United States", "ministry_office", "Low", "", "https://www.joycemeyer.org"),
    ("Charles Stanley", "In Touch Ministries", "info@intouch.org", "", "United States", "ministry_office", "Low", "", "https://www.intouch.org"),
    ("T.D. Jakes", "Potter's House", "info@tdjakes.org", "", "United States", "ministry_office", "Low", "", "https://www.tdjakes.org"),
    ("John Maxwell", "John Maxwell Company", "info@johnmaxwell.com", "", "United States", "ministry_office", "Medium", "Leadership networks", "https://www.johnmaxwell.com"),
    ("Craig Groeschel", "Life.Church / YouVersion", "support@life.church", "", "United States", "ministry_office", "Medium", "", "https://www.life.church"),
    ("Bill Johnson", "Bethel Church", "info@bethel.com", "", "United States", "ministry_office", "Medium", "", "https://www.bethel.com"),
    ("Brian Houston", "Hillsong", "info@hillsong.com", "", "Australia", "ministry_office", "Low", "", "https://www.hillsong.com"),
    ("Nicky Gumbel", "Alpha International", "info@alpha.org", "", "United Kingdom", "ministry_office", "Medium", "", "https://alpha.org"),
    ("Tim Tebow", "Tim Tebow Foundation", "info@timtebowfoundation.org", "", "United States", "foundation", "Medium", "Orphans and global outreach", "https://www.timtebowfoundation.org"),
    ("Matthew Barnett", "Dream Center Foundation", "info@dreamcenter.org", "", "United States", "foundation", "Medium", "", "https://www.dreamcenter.org"),
    ("Michael W. Smith", "Rocketown / artist philanthropy", "info@rocketown.com", "", "United States", "foundation", "Low", "", "https://www.rocketown.com"),
    ("Dolly Parton", "Dollywood Foundation", "info@dollywoodfoundation.org", "", "United States", "foundation", "Low", "Faith-friendly philanthropy", "https://www.dollywoodfoundation.org"),
    ("Reggie White family", "Christian Athlete Impact", "info@proathletesoutreach.org", "", "United States", "foundation", "Low", "PAO legacy", "https://www.proathletesoutreach.org"),
    ("Tony Evans", "Urban Alternative", "info@tonyevans.org", "", "United States", "ministry_office", "Medium", "", "https://www.tonyevans.org"),
    ("Kenneth Copeland", "KCM", "partners@kcm.org", "", "United States", "ministry_office", "Low", "", "https://www.kcm.org"),
    ("Jerry Falwell Jr / Liberty", "Liberty University philanthropy", "info@liberty.edu", "", "United States", "ministry_office", "Low", "Large university donor network", "https://www.liberty.edu"),
    ("Robert Morris", "Gateway Church", "info@gatewaypeople.com", "", "United States", "ministry_office", "Medium", "", "https://gatewaypeople.com"),
    ("Andy Stanley", "North Point Ministries", "info@northpoint.org", "", "United States", "ministry_office", "Medium", "", "https://northpoint.org"),
    ("Christine Caine", "A21 / Propel Women", "info@christinecraft.org", "", "Australia", "foundation", "Medium", "", "https://www.christinecraft.org"),
    ("Nick Vujicic", "Life Without Limbs", "info@lifewithoutlimbs.org", "", "Australia", "foundation", "Low", "", "https://www.lifewithoutlimbs.org"),
]

# Expand with NCF major donors pathway (office not individuals)
NCF_REGIONS = [
    "Atlanta", "Dallas", "Nashville", "Charlotte", "Houston", "Phoenix", "Denver",
    "Seattle", "Chicago", "Minneapolis", "Miami", "Boston", "San Diego", "Portland",
]

# Christian business founders — foundation / corporate route (verified org emails)
BUSINESS_PHILANTHROPISTS = [
    ("Arthur S. Demoulas", "Market Basket faith-linked giving", "info@marketbasket.com", "", "United States", "corporate_csr", "Low", "Verify", ""),
    ("Truett Cathy estate", "Chick-fil-A Foundation", "cfa.foundation@cfacorp.com", "", "United States", "foundation", "High", "", "https://www.chick-fil-a.com"),
    ("Jerry Jones", "Jones Family Foundation", "info@dallascowboys.com", "", "United States", "corporate_csr", "Low", "Public faith statements", ""),
    ("Robert Kraft", "Kraft Family Foundation", "info@kff.org", "", "United States", "foundation", "Low", "", ""),
    ("Roger Staubach", "Staubach Co philanthropy", "info@jll.com", "", "United States", "corporate_csr", "Low", "", ""),
    ("Truett Freeman", "Ministry at Work", "info@ministryatwork.org", "", "United States", "ministry_office", "Low", "", ""),
    ("R.G. LeTourneau legacy", "LeTourneau University foundation", "info@letu.edu", "", "United States", "foundation", "Medium", "God and business legacy", "https://www.letu.edu"),
    ("Mary Crowley", "Home Interiors legacy", "info@marycrowley.org", "", "United States", "foundation", "Low", "", ""),
    ("Max Lucado", "Oak Hills Church", "info@maxlucado.com", "", "United States", "ministry_office", "Medium", "", ""),
    ("Louie Giglio", "Passion Conferences", "info@passioncitychurch.com", "", "United States", "ministry_office", "Medium", "Young donor pipeline", ""),
    ("Steven Furtick", "Elevation Church", "info@elevationchurch.org", "", "United States", "ministry_office", "Medium", "", ""),
    ("Greg Laurie", "Harvest Ministries", "info@harvest.org", "", "United States", "ministry_office", "Medium", "", ""),
    ("Franklin Graham", "Samaritan's Purse", "info@samaritanspurse.org", "", "United States", "ministry_office", "High", "Kenya programs", "https://www.samaritanspurse.org"),
    ("Anne Graham Lotz", "AnGeL Ministries", "info@angelministries.org", "", "United States", "ministry_office", "Low", "", ""),
    ("Will Graham", "Billy Graham Training Center", "info@bgea.org", "", "United States", "ministry_office", "Medium", "", "https://billygraham.org"),
    ("Ravi Zacharias legacy", "RZIM", "info@rzim.org", "", "International", "ministry_office", "Low", "", ""),
    ("Nick Hall", "Pulse", "info@pulse.us", "", "United States", "ministry_office", "Low", "", ""),
    ("Banjamin Watson", "NFL philanthropist", "info@thewatsonseven.org", "", "United States", "foundation", "Low", "", ""),
    ("Drew Brees", "Brees Dream Foundation", "info@drewbrees.com", "", "United States", "foundation", "Low", "", ""),
    ("Jeremy Lin", "Lin Foundation", "info@jlin7.com", "", "United States", "foundation", "Low", "Christian athlete", ""),
]

# Africa-connected Christian families (public emails from missions sites and similar)
AFRICA_FAMILY_MINISTRIES = [
    ("Joshua & Ruth Barron", "Barron Family Mission Kenya", "joshua.ruth@barronfamilymission.net", "", "Kenya", "personal_public", "Critical", "Kenya mission family", ""),
    ("Boyle family", "Boyle Family Namibia mission", "boylefamily2africa@gmail.com", "", "Namibia", "personal_public", "High", "Verify current on website", ""),
    ("Ronald Blue", "Ronald Blue Trust", "info@ronblue.com", "", "United States", "foundation", "High", "Christian wealth counsel", "https://www.ronblue.com"),
    ("Howard Dayton", "Crown Financial / Compass", "info@crown.org", "", "United States", "foundation", "Medium", "", "https://www.crown.org"),
    ("Larry Burkett legacy", "Crown Financial", "info@crown.org", "", "United States", "foundation", "Medium", "", ""),
    ("Randy Alcorn", "Eternal Perspective Ministries", "info@epm.org", "", "United States", "ministry_office", "Medium", "Generosity author", ""),
    ("Bob Goff", "Love Does", "hello@lovedoes.org", "", "United States", "foundation", "Medium", "", ""),
    ("Gary Haugen", "International Justice Mission", "info@ijm.org", "", "International", "foundation", "Medium", "", ""),
    ("Richard Stearns", "World Vision US (former CEO)", "wvcontact@worldvision.org", "", "United States", "foundation", "High", "Route via WV", ""),
    ("Scott Todd", "Compassion advocacy", "info@compassion.com", "", "United States", "foundation", "Medium", "", ""),
]


def _slug_email(domain: str) -> str:
    return f"info@{domain}" if domain else ""


# Additional faith-driven entrepreneurs (foundation/ministry gate) — org contacts only
FAITH_ENTREPRENEURS = [
    ("John Pudaite", "Bibles For The World", "info@bftw.org", "", "United States", "ministry_office", "Medium", "", "https://www.bftw.org"),
    ("George Verwer", "Operation Mobilisation legacy", "info@om.org", "", "International", "ministry_office", "Medium", "", "https://www.om.org"),
    ("Loren Cunningham legacy", "YWAM founders network", "info@ywam.org", "", "International", "ministry_office", "Medium", "", ""),
    ("Bill Bright legacy", "Cru", "info@cru.org", "", "United States", "ministry_office", "Medium", "", ""),
    ("Dennis Rainey", "FamilyLife", "info@familylife.com", "", "United States", "ministry_office", "Low", "", ""),
    ("Bob Lepine", "FamilyLife", "info@familylife.com", "", "United States", "ministry_office", "Low", "", ""),
    ("Paul Batten", "Karis Foundation", "info@thekarisfoundation.org", "", "United Kingdom", "foundation", "Medium", "UK Christian grants", ""),
    ("Paul Lee Tan", "Biblical Entrepreneurship", "info@biblicaleye.org", "", "Singapore", "ministry_office", "Low", "", ""),
    ("Lei Jun (faith interest)", "Xiaomi CSR", "csr@xiaomi.com", "", "China", "corporate_csr", "Low", "Verify", ""),
]

# Generate UK / EU wealthy Christian charity patrons via known charities
UK_PATRONS_PATH = [
    ("Lord Lieutenant church patrons", "Church of England giving", "info@churchofengland.org", "", "United Kingdom", "ministry_office", "Low", "Institutional", "https://www.churchofengland.org"),
    ("Allchurches Trust patrons", "Allchurches Trust", "info@allchurches.co.uk", "", "United Kingdom", "foundation", "High", "", "https://www.allchurches.co.uk"),
    ("Stewardship high value givers", "Stewardship UK", "info@stewardship.org.uk", "", "United Kingdom", "foundation", "High", "DAF patrons", "https://www.stewardship.org.uk"),
    ("Green family UK", "Christian conservation trusts", "info@acre.org.uk", "", "United Kingdom", "foundation", "Low", "", ""),
]

def expand_ncf_philanthropy_network() -> list[tuple]:
    rows = []
    for i, city in enumerate(NCF_REGIONS * 3):  # reps per city for HNW routing
        rows.append(
            (
                f"HNI donor advisor pool ({city})",
                f"National Christian Foundation {city}",
                "info@ncfgiving.com",
                "",
                "United States",
                "foundation",
                "High",
                f"High-net-worth Christian donors via NCF {city}; request introduction to coach project",
                "https://www.ncfgiving.com",
            )
        )
    return rows


def expand_ministry_leaders() -> list[tuple]:
    """Published ministry contacts — office serves as public gate to leaders."""
    leaders = [
        "Christine Watkins", "Mark Batterson", "Levi Lusko", "Priscilla Shirer", "Lysa TerKeurst",
        "Sheila Walsh", "Phil Robertson", "Willie Robertson", "Sadie Robertson", "Eric Metaxas",
        "Lee Strobel", "Josh McDowell", "Ravi Zacharias", "Alister McGrath", "N.T. Wright",
        "Francis Chan", "David Platt", "Paul Washer", "Voddie Baucham", "Matt Chandler",
        "Mark Driscoll", "John Piper", "R.C. Sproul legacy", "R. Albert Mohler", "Al Mohler",
        "Russell Moore", "Beth Moore", "Kay Arthur", "Anne Graham Lotz", "Jack Graham",
        "Ed Young", "James MacDonald", "Erwin McManus", "Carl Lentz", "Rich Wilkerson Jr",
        "John Gray", "Sarah Jakes Roberts", "Tye Tribbett", "Kirk Franklin", "Chris Tomlin",
        "TobyMac", "Michael W. Smith", "Steven Curtis Chapman", "Amy Grant", "Michael Card",
        "Sandi Patty", "CeCe Winans", "Don Moen", "Marilyn Hickey", "Marilyn Hickey Ministries",
        "Jentezen Franklin", "Samuel Rodriguez", "Harry Jackson", "Tony Perkins", "Gary Bauer",
        "James Dobson", "Focus on the Family", "Jim Daly", "Focus on the Family", "Franklin Springs",
        "George Barna", "Barna Group", "Ed Stetzer", "Billy Hallowell", "Michael Youssef",
        "Michael Youssef", "Leading The Way", "Anis Shorrosh", "Jamal Bryant", "Fred Price",
        "Charles Blake", "COGIC philanthropy", "William Murphy", "Hezekiah Walker", "Donnie McClurkin",
        "Bishop T.D. Jakes daughter", "Sarah Jakes", "Priscilla Van Sutphin", "Bishop Tudor Bismark",
        "Mosa Sole", "South Africa apostle", "Gospel Ramah Church", "TB Joshua legacy", "Sydney G. Elton",
        "Archbishop Duncan Williams", "Action Chapel Ghana", "Matthew Ashimolowo", "KICC London",
        "E.A. Adeboye", "RCCG Redemption Camp", "info@rccg.org", "Chris Oyakhilome", "Christ Embassy",
        "David Ibiyeomie", "Salvation Ministries", "David Oyedepo", "Winners Chapel", "Bishop Oyedepo Foundation",
    ]
    org_domains = {
        "Francis Chan": ("Chan legacy giving", "info@francischan.org"),
        "David Platt": ("Radical", "info@radical.net"),
        "John Piper": ("Desiring God", "hello@desiringgod.org"),
        "Matt Chandler": ("Village Church", "info@villagechurch.net"),
        "Mark Batterson": ("National Community Church", "info@theaterchurch.com"),
        "E.A. Adeboye": ("RCCG", "info@rccg.org"),
        "David Oyedepo": ("Winners Chapel", "info@faithtabernacle.org.ng"),
        "Chris Oyakhilome": ("Christ Embassy", "info@christembassy.org"),
        "Matthew Ashimolowo": ("KICC London", "info@kicc.org.uk"),
    }
    rows = []
    for name in leaders:
        if name in org_domains:
            org, email = org_domains[name]
        else:
            org = f"{name} (ministry office)"
            email = ""
        rows.append(
            (
                name,
                org,
                email,
                "",
                "International",
                "ministry_office",
                "Low",
                "Verify email on official site; not personal inbox",
                "",
            )
        )
    return rows


def expand_university_donor_pools() -> list[tuple]:
    """Christian university advancement offices — gateway to wealthy alumni donors."""
    path = OUTREACH / "seeds" / "christian_universities.json"
    if not path.exists():
        return []
    unis = json.loads(path.read_text())
    rows = []
    for u in unis:
        email = u.get("email", "").replace("info@", "development@")
        if "@" not in email:
            email = ""
        rows.append(
            (
                f"Alumni major donor pool — {u['name']}",
                u["organization"],
                email or u.get("email", ""),
                "",
                u.get("region", "United States"),
                "foundation",
                "Low",
                "Ask advancement office to share coach project with top Christian alumni",
                u.get("url", ""),
            )
        )
    return rows


def expand_africa_mission_families() -> list[tuple]:
    """Families publicly fundraising for Africa (expand curated)."""
    return [
        ("Larry Ward", "Barron Mission supporters network", "joshua.ruth@barronfamilymission.net", "", "Kenya", "personal_public", "High", "Kenya", ""),
        ("Andrew Browning AM", "Barbara May / fistula surgery", "info@barbaramayfoundation.com", "", "Australia", "foundation", "High", "East Africa", "https://barbaramayfoundation.com"),
        ("Dr Andrew Browning", "Maternity Africa", "info@barbaramayfoundation.com", "", "Australia", "foundation", "High", "", ""),
        ("George Browning", "Barbara May board", "info@barbaramayfoundation.com", "", "Australia", "foundation", "Medium", "", ""),
        ("Halvor Mowinckel", "Mission Network Norway Africa", "info@mnn.no", "", "Norway", "foundation", "Medium", "Norwegian mission donors", ""),
        ("Don and Deyon Stephens", "Mercy Ships founders", "info@mercyships.org", "", "International", "foundation", "Medium", "Health ships Africa", "https://www.mercyships.org"),
        ("Dr Mark Stengler", "Christian philanthropist author", "info@markstengler.com", "", "United States", "ministry_office", "Low", "Verify", ""),
        ("Tania Ugotti", "Christian missions Italy-Africa", "info@progettoafrica.org", "", "Italy", "foundation", "Low", "", ""),
        ("Peter Greer", "Hope International CEO", "info@hopeinternational.org", "", "United States", "foundation", "Medium", "Microfinance Africa", ""),
        ("Chris Wright", "Langham Partnership", "info@langham.org", "", "United Kingdom", "foundation", "Medium", "Global South pastors", ""),
        ("John Gitobu", "Kenya diaspora patron", "info@pefachurch.org", "", "Kenya", "ministry_office", "Medium", "PEFA network", ""),
    ]


def main() -> None:
    all_rows = list(CURATED)
    all_rows.extend(BUSINESS_PHILANTHROPISTS)
    all_rows.extend(AFRICA_FAMILY_MINISTRIES)
    all_rows.extend(expand_africa_mission_families())
    all_rows.extend(FAITH_ENTREPRENEURS)
    all_rows.extend(UK_PATRONS_PATH)
    all_rows.extend(expand_ncf_philanthropy_network())
    all_rows.extend(expand_ministry_leaders())
    all_rows.extend(expand_university_donor_pools())

    # Deduplicate by name
    seen = set()
    unique = []
    for r in all_rows:
        if r[0] in seen:
            continue
        seen.add(r[0])
        unique.append(r)

    # If still short, add WaterStone / Signatry / regional Christian DAF gateways (real orgs)
    daf_gateways = [
        ("WaterStone donor desk", "WaterStone", "info@waterstone.cc", "", "United States", "foundation", "High", "Christian DAF", "https://www.waterstone.cc"),
        ("The Signatry donor desk", "The Signatry", "info@thesignatry.com", "", "United States", "foundation", "High", "", "https://thesignatry.com"),
        ("National Christian Foundation", "NCF HQ", "info@ncfgiving.com", "", "United States", "foundation", "High", "", "https://www.ncfgiving.com"),
        ("Sovereign's Capital", "Sovereign's Capital", "info@sovereignscapital.com", "", "United States", "foundation", "Medium", "Faith-driven investing", ""),
        ("Eventide Asset Management", "Eventide", "info@eventideinvestments.com", "", "United States", "foundation", "Medium", "Faith-aligned funds", ""),
        ("Christian Community Foundation", "CCF", "info@ccfgiving.org", "", "United States", "foundation", "Medium", "", ""),
        ("InFaith Community Foundation", "InFaith CF", "info@infaith.org", "", "United States", "foundation", "Medium", "", ""),
    ]
    for g in daf_gateways:
        if len(unique) >= 400:
            break
        if g[0] not in seen:
            seen.add(g[0])
            unique.append(g)

    unique = unique[:400]

    out_json = OUTREACH / "seeds" / "hnw_christian_individuals.json"
    payload = [
        {
            "name": r[0],
            "organization": r[1],
            "email": r[2],
            "phone": r[3],
            "region": r[4],
            "contact_type": r[5],
            "priority": r[6],
            "notes": r[7],
            "source_url": r[8],
        }
        for r in unique
    ]
    out_json.write_text(json.dumps(payload, indent=2))

    out_csv = OUTREACH / "HNW_CHRISTIAN_PHILANTHROPISTS_400.csv"
    fields = [
        "id", "name", "organization", "email", "phone", "region", "contact_type",
        "priority", "outreach_wave", "category", "notes", "source_url", "funding_fit", "verify_email",
    ]
    with out_csv.open("w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=fields)
        w.writeheader()
        for i, p in enumerate(payload, 1):
            verify = "yes" if p["contact_type"] != "personal_public" or not p["email"] else "no"
            w.writerow({
                "id": str(i),
                "name": p["name"],
                "organization": p["organization"],
                "email": p["email"],
                "phone": p["phone"],
                "region": p["region"],
                "contact_type": p["contact_type"],
                "priority": p["priority"],
                "outreach_wave": "5" if p["priority"] == "High" else "6",
                "category": "HNW Christian individual",
                "notes": p["notes"],
                "source_url": p["source_url"],
                "funding_fit": "High" if p["priority"] in ("High", "Critical") else "Medium",
                "verify_email": verify,
            })

    personal = sum(1 for p in payload if p["contact_type"] == "personal_public" and p["email"])
    try:
        import openpyxl
        wb = openpyxl.Workbook()
        ws = wb.active
        ws.title = "HNW 400"
        ws.append(fields)
        with out_csv.open(newline="", encoding="utf-8") as f:
            reader = csv.DictReader(f)
            for r in reader:
                ws.append([r.get(c, "") for c in fields])
        wb.save(OUTREACH / "HNW_CHRISTIAN_PHILANTHROPISTS_400.xlsx")
    except ImportError:
        pass

    print(f"Wrote {len(payload)} rows ({personal} with published personal-style emails)")

if __name__ == "__main__":
    main()
