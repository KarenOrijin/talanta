#!/usr/bin/env python3
"""Merge outreach lists and expand to ~1000 church / philanthropy leads."""
from __future__ import annotations

import csv
import json
from pathlib import Path

OUTREACH = Path(__file__).resolve().parent

FIELDNAMES = [
    "id",
    "name",
    "organization",
    "email",
    "phone",
    "category",
    "region",
    "priority",
    "outreach_wave",
    "notes",
    "source_url",
    "funding_fit",
    "verify_email",
]


def row(
    name,
    organization,
    email,
    phone="",
    category="Faith NGO",
    region="International",
    priority="Medium",
    wave="6",
    notes="",
    source_url="",
    funding_fit="Medium",
    verify="no",
):
    return {
        "name": name,
        "organization": organization,
        "email": email,
        "phone": phone,
        "category": category,
        "region": region,
        "priority": priority,
        "outreach_wave": wave,
        "notes": notes,
        "source_url": source_url,
        "funding_fit": funding_fit,
        "verify_email": verify,
    }


def load_csv(path: Path) -> list[dict]:
    if not path.exists():
        return []
    out = []
    with path.open(newline="", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for r in reader:
            mapped = row(
                r.get("name", ""),
                r.get("organization", ""),
                r.get("email", ""),
                r.get("phone", ""),
                r.get("category", "Faith NGO"),
                r.get("region", "International"),
                r.get("priority", "Medium"),
                wave=r.get("outreach_wave", "6"),
                notes=r.get("notes", ""),
                source_url=r.get("source_url", ""),
                funding_fit=r.get("funding_fit", "See category"),
                verify=r.get("verify_email", "no"),
            )
            out.append(mapped)
    return out


def seed_ecfa_style_ministries() -> list[dict]:
    """High-trust ministries (ECFA charter style); public HQ emails."""
    names = [
        ("African Enterprise", "African Enterprise", "info@africanenterprise.com", "https://www.africanenterprise.com"),
        ("Asbury Theological Seminary", "Asbury Seminary", "info@asburyseminary.edu", "https://asburyseminary.edu"),
        ("Bible League International", "Bible League", "info@bleague.org", "https://www.bleague.org"),
        ("Biblica", "Biblica", "info@biblica.com", "https://www.biblica.com"),
        ("CBMC", "CBMC", "info@cbmc.com", "https://www.cbmc.com"),
        ("Child Evangelism Fellowship", "CEF", "info@cefonline.com", "https://cefonline.com"),
        ("Christ For The Nations", "CFNI", "info@cfni.org", "https://www.cfni.org"),
        ("Christian Camp and Conference Association", "CCCA", "info@ccca.org", "https://www.ccca.org"),
        ("Christian Leadership Alliance", "CLA", "info@christianleadershipalliance.org", "https://www.christianleadershipalliance.org"),
        ("CityTeam", "CityTeam", "info@cityteam.org", "https://www.cityteam.org"),
        ("Coalition for Christian Outreach", "CCO", "info@cco.org", "https://cco.org"),
        ("Converge", "Converge", "info@converge.org", "https://www.converge.org"),
        ("CRISTA Ministries", "CRISTA", "info@crista.org", "https://www.crista.org"),
        ("Cru", "Cru", "info@cru.org", "https://www.cru.org"),
        ("Dallas Theological Seminary", "DTS", "info@dts.edu", "https://www.dts.edu"),
        ("Evangelism Explosion", "EE", "info@eeinternational.org", "https://eeinternational.org"),
        ("Every Home for Christ", "EHC", "info@ehc.org", "https://www.everyhome.org"),
        ("Food for the Hungry", "FH", "info@fh.org", "https://www.fh.org"),
        ("Global Christian Relief", "GCR", "info@globalchristianrelief.org", "https://www.globalchristianrelief.org"),
        ("Gordon-Conwell Theological Seminary", "GCTS", "admissions@gcts.edu", "https://www.gordonconwell.edu"),
        ("InFaith", "InFaith", "info@infaith.org", "https://www.infaith.org"),
        ("InterVarsity Christian Fellowship", "InterVarsity", "info@intervarsity.org", "https://intervarsity.org"),
        ("Jews for Jesus", "Jews for Jesus", "info@jewsforjesus.org", "https://jewsforjesus.org"),
        ("John Brown University", "JBU", "info@jbu.edu", "https://www.jbu.edu"),
        ("Ligonier Ministries", "Ligonier", "info@ligonier.org", "https://www.ligonier.org"),
        ("Luis Palau Association", "Luis Palau", "info@palauministries.org", "https://www.palauministries.org"),
        ("MAP International", "MAP", "info@map.org", "https://www.map.org"),
        ("Mission Aviation Fellowship", "MAF", "info@maf.org", "https://maf.org"),
        ("Mission Increase", "Mission Increase", "info@missionincrease.org", "https://missionincrease.org"),
        ("One Mission Society", "OMS", "info@onemissionsociety.org", "https://onemissionsociety.org"),
        ("Partners International", "Partners", "info@partnersintl.org", "https://www.partnersintl.org"),
        ("Prison Fellowship", "Prison Fellowship", "info@pfm.org", "https://www.prisonfellowship.org"),
        ("Reach Beyond", "Reach Beyond", "info@reachbeyond.org", "https://reachbeyond.org"),
        ("Reformed Theological Seminary", "RTS", "info@rts.edu", "https://www.rts.edu"),
        ("Samaritan's Purse", "Samaritan's Purse", "info@samaritanspurse.org", "https://www.samaritanspurse.org"),
        ("Wycliffe Bible Translators", "Wycliffe USA", "info@wycliffe.org", "https://www.wycliffe.org"),
        ("Young Life", "Young Life", "info@younglife.org", "https://www.younglife.org"),
        ("Youth for Christ USA", "YFC USA", "info@yfc.net", "https://yfc.net"),
        ("Zondervan / HarperChristian", "HarperCollins Christian", "customer.service@harpercollins.com", "https://www.zondervan.com"),
    ]
    return [
        row(n, o, e, category="Accredited ministry", priority="High", wave="5", notes="ECFA-style trusted ministry", source_url=u, funding_fit="High")
        for n, o, e, u in names
    ]


def seed_christian_foundations() -> list[dict]:
    foundations = [
        ("John Templeton Foundation", "Templeton Foundation", "info@templeton.org", "https://www.templeton.org", "Research and faith; verify grant fit"),
        ("Lilly Endowment", "Lilly Endowment", "info@lillyendowment.org", "https://lillyendowment.org", "Church and community programs US"),
        ("Maclellan Foundation", "Maclellan", "info@macf.org", "https://www.macf.org", "Christian giving"),
        ("WaterStone", "WaterStone", "info@waterstone.cc", "https://www.waterstone.cc", "Donor advised fund"),
        ("The Signatry", "The Signatry", "info@thesignatry.com", "https://thesignatry.com", "Generosity platform"),
        ("National Christian Foundation", "NCF", "info@ncfgiving.com", "https://www.ncfgiving.com", "Major DAF network"),
        ("Generous Giving", "Generous Giving", "info@generousgiving.org", "https://generousgiving.org", "Stewardship teaching"),
        ("Halftime Institute", "Halftime", "info@halftime.org", "https://halftime.org", "Affluent Christians"),
        ("Praxis", "Praxis", "hello@praxislabs.org", "https://praxislabs.org", "Faith venture"),
        ("Vineyard Foundation", "Vineyard", "info@vineyardusa.org", "https://vineyardusa.org", ""),
        ("ACTS Seminaries Foundation", "ACTS", "info@actsseminaries.com", "https://actsseminaries.com", ""),
        ("Tyndale Foundation", "Tyndale", "info@tyndale.ca", "https://www.tyndale.ca", "Canada"),
        ("Allchurches Trust", "Allchurches Trust UK", "info@allchurches.co.uk", "https://www.allchurches.co.uk", "UK church buildings and community"),
        ("Stewardship UK", "Stewardship", "info@stewardship.org.uk", "https://www.stewardship.org.uk", "UK Christian giving"),
        ("Australian Christian Fund", "NFNL Giving", "info@nfgiving.com.au", "https://nfgiving.com.au", "Australia DAF"),
        ("Anglican Overseas Aid", "AOA Australia", "info@anglicanoverseasaid.org.au", "https://anglicanoverseasaid.org.au", "East Africa programs"),
        ("Tearfund Australia", "Tearfund AU", "info@tearfund.org.au", "https://tearfund.org.au", ""),
        ("TeachBeyond", "TeachBeyond", "info@teachbeyond.org", "https://teachbeyond.org", "Education missions"),
        ("Schwab Charitable", "Schwab Charitable", "support@schwabcharitable.org", "https://www.schwabcharitable.org", "DAF donors indirect"),
        ("Fidelity Charitable", "Fidelity Charitable", "info@fidelitycharitable.org", "https://www.fidelitycharitable.org", "DAF donors indirect"),
    ]
    out = []
    for n, o, e, u, note in foundations:
        pri = "High" if any(x in n or x in o for x in ("NCF", "Templeton", "Lilly", "Maclellan")) else "Medium"
        out.append(
            row(
                n, o, e,
                category="Christian foundation / DAF",
                priority=pri,
                wave="5",
                notes=note,
                source_url=u,
                funding_fit="High" if pri == "High" else "Medium",
            )
        )
    return out


def seed_ncf_chapters() -> list[dict]:
    cities = [
        "Alpharetta", "Atlanta", "Austin", "Baltimore", "Birmingham", "Boise", "Boston",
        "Charlotte", "Chicago", "Cincinnati", "Cleveland", "Colorado Springs", "Columbus",
        "Dallas", "Denver", "Detroit", "Fort Worth", "Honolulu", "Houston", "Indianapolis",
        "Jacksonville", "Kansas City", "Las Vegas", "Little Rock", "Los Angeles", "Louisville",
        "Memphis", "Miami", "Milwaukee", "Minneapolis", "Nashville", "New York", "Oklahoma City",
        "Omaha", "Orlando", "Philadelphia", "Phoenix", "Pittsburgh", "Portland", "Raleigh",
        "Richmond", "Sacramento", "Salt Lake City", "San Antonio", "San Diego", "San Francisco",
        "Seattle", "St. Louis", "Tampa", "Washington DC", "Wichita", "Albuquerque", "Anchorage",
        "Baton Rouge", "Buffalo", "Charleston", "Columbia SC", "Des Moines", "El Paso",
        "Fresno", "Grand Rapids", "Greenville SC", "Hartford", "Jackson MS", "Knoxville",
        "Lexington", "Lincoln", "Madison", "Mobile", "Montgomery", "New Orleans", "Norfolk",
        "Oklahoma", "Pensacola", "Providence", "Rochester", "Savannah", "Shreveport",
        "Spokane", "Springfield MO", "Syracuse", "Tallahassee", "Toledo", "Tucson", "Tulsa",
    ]
    return [
        row(
            f"NCF {city}",
            f"National Christian Foundation — {city}",
            "info@ncfgiving.com",
            category="Christian foundation / DAF",
            region="United States",
            priority="High",
            wave="5",
            notes=f"Route gift conversations via NCF {city} chapter; verify local contact on ncfgiving.com",
            source_url="https://www.ncfgiving.com/locations/",
            funding_fit="High",
            verify="yes",
        )
        for city in cities
    ]


def seed_missions_transport() -> list[dict]:
    """Missions and orgs where church transport / Africa ministry fits."""
    items = [
        ("Africa Inland Mission", "AIM", "info@aimint.org", "https://www.aimint.org"),
        ("SIM", "SIM USA", "info@sim.org", "https://www.sim.org"),
        ("CMS Africa", "CMS-Africa", "info@cms-africa.org", "https://cms-africa.org"),
        ("Serving In Mission", "SIM Global", "info@sim.org", "https://www.sim.org"),
        ("Send International", "Send", "info@send.org", "https://www.send.org"),
        ("Africa Renewal Ministries", "ARM", "info@arm.net", "https://www.arm.net"),
        ("Overseas Missionary Fellowship", "OMF", "info@omf.org", "https://www.omf.org"),
        ("New Mission Systems International", "NMSI", "info@newmissions.org", "https://newmissions.org"),
        ("Christar", "Christar", "info@christar.org", "https://www.christar.org"),
        ("Frontiers USA", "Frontiers", "info@frontiersusa.org", "https://www.frontiersusa.org"),
        ("Pioneers", "Pioneers", "info@pioneers.org", "https://www.pioneers.org"),
        ("World Mission", "WM", "info@worldmission.biz", "https://worldmission.biz"),
        ("Adventist Development and Relief Agency", "ADRA", "info@adra.org", "https://adra.org"),
        ("Catholic Near East Welfare Association", "CNEWA", "info@cnewa.org", "https://www.cnewa.org"),
        ("Lutheran Heritage Foundation", "LHF", "info@lhfmissions.org", "https://www.lhfmissions.org"),
        ("Engineering Ministries International", "EMI", "info@emiusa.org", "https://emiusa.org"),
        ("e3 Partners", "e3", "info@e3partners.com", "https://e3partners.com"),
        ("MTW", "Mission to the World PCA", "info@mtw.org", "https://www.mtw.org"),
        ("ABWE", "ABWE", "info@abwe.org", "https://www.abwe.org"),
        ("AIM Air", "AIM Air", "info@aimair.org", "https://www.aimair.org"),
        ("Bush Hospital Foundation", "Bush Hospital", "info@bushhospital.org", "https://www.bushhospital.org"),
    ]
    return [
        row(n, o, e, category="Missions / Africa", priority="High", wave="4", notes="East Africa or transport angle", source_url=u, funding_fit="High")
        for n, o, e, u in items
    ]


def seed_us_megachurch_missions() -> list[dict]:
    churches = [
        ("Lakewood Church", "Lakewood Outreach", "info@lakewood.cc", "https://www.lakewood.cc"),
        ("Life.Church", "Life.Church", "support@life.church", "https://www.life.church"),
        ("Elevation Church", "Elevation", "info@elevationchurch.org", "https://elevationchurch.org"),
        ("Hillsong Church", "Hillsong", "info@hillsong.com", "https://www.hillsong.com"),
        ("Bethel Church", "Bethel", "info@bethel.com", "https://www.bethel.com"),
        ("Saddleback Church", "Saddleback", "info@saddleback.com", "https://saddleback.com"),
        ("Willow Creek Community Church", "Willow Creek", "info@willowcreek.org", "https://www.willowcreek.org"),
        ("North Point Ministries", "North Point", "info@northpoint.org", "https://northpoint.org"),
        ("Gateway Church", "Gateway", "info@gatewaypeople.com", "https://gatewaypeople.com"),
        ("Christ Fellowship", "Christ Fellowship", "info@gochristfellowship.com", "https://gochristfellowship.com"),
        ("Church of the Highlands", "Highlands", "info@churchofthehighlands.com", "https://churchofthehighlands.com"),
        ("NewSpring Church", "NewSpring", "info@newspring.cc", "https://newspring.cc"),
        ("Christ Church of the Valley", "CCV", "info@ccv.church", "https://ccv.church"),
        ("Seacoast Church", "Seacoast", "info@seacoast.org", "https://seacoast.org"),
        ("James River Church", "James River", "info@jamesriver.org", "https://jamesriver.org"),
        ("Liquid Church", "Liquid", "info@liquidchurch.com", "https://www.liquidchurch.com"),
        ("Mosaic Church", "Mosaic", "info@mosaic.org", "https://mosaic.org"),
        ("Vineyard USA", "Vineyard", "info@vineyardusa.org", "https://vineyardusa.org"),
        ("Redeemer Presbyterian NYC", "Redeemer", "info@redeemer.com", "https://www.redeemer.com"),
        ("Timberlake Church", "Timberlake", "info@timberlakechurch.com", "https://timberlakechurch.com"),
        ("Fresh Life Church", "Fresh Life", "info@freshlife.church", "https://freshlife.church"),
        ("Celebration Church", "Celebration", "info@celebration.org", "https://celebration.org"),
        ("Calvary Chapel Association", "Calvary", "info@calvarycca.org", "https://calvarycca.org"),
        ("Acts 29 Network", "Acts 29", "info@acts29.com", "https://acts29.com"),
        ("ARC Churches", "ARC", "info@arcchurches.com", "https://arcchurches.com"),
    ]
    return [
        row(n, o, e, category="Megachurch / network", region="United States", priority="Medium", wave="6", notes="Ask for missions or global partners desk", source_url=u, funding_fit="Medium")
        for n, o, e, u in churches
    ]


def seed_national_evangelical_alliances() -> list[dict]:
    """World Evangelical Alliance member alliances (public inquiry emails where known)."""
    alliances = json.loads((OUTREACH / "seeds/national_evangelical_alliances.json").read_text())
    return [
        row(
            a["name"],
            a["organization"],
            a.get("email", ""),
            category="National evangelical alliance",
            region=a.get("region", "International"),
            priority=a.get("priority", "Low"),
            wave=a.get("wave", "7"),
            notes=a.get("notes", "Verify email on website before send"),
            source_url=a.get("url", ""),
            funding_fit=a.get("funding_fit", "Low"),
            verify="yes" if not a.get("email") else a.get("verify", "yes"),
        )
        for a in alliances
    ]


def seed_christian_universities() -> list[dict]:
    unis = json.loads((OUTREACH / "seeds/christian_universities.json").read_text())
    return [
        row(
            u["name"],
            u["organization"],
            u["email"],
            category="Christian university",
            region=u.get("region", "United States"),
            priority="Low",
            wave="7",
            notes=u.get("notes", "Missions or development office"),
            source_url=u.get("url", ""),
            funding_fit="Low",
            verify="yes",
        )
        for u in unis
    ]


def seed_kenya_diaspora() -> list[dict]:
    diaspora = json.loads((OUTREACH / "seeds/kenya_diaspora_churches.json").read_text())
    return [
        row(
            d["name"],
            d["organization"],
            d["email"],
            category="Kenyan diaspora church",
            region=d.get("region", "United States"),
            priority="High",
            wave="3",
            notes=d.get("notes", "Diaspora link to Bungoma/Webuye"),
            source_url=d.get("url", ""),
            funding_fit="High",
            verify=d.get("verify", "yes"),
        )
        for d in diaspora
    ]


def dedupe(rows: list[dict]) -> list[dict]:
    """One row per organization/name (same email may appear on many NCF chapters)."""
    seen: set[str] = set()
    out = []
    for r in rows:
        key = f"{r['organization']}|{r['name']}".lower().strip()
        if key in seen:
            continue
        seen.add(key)
        out.append(r)
    return out


def assign_waves_from_priority(existing: dict) -> dict:
    """Keep outreach_wave on Kenya/government leads."""
    cat = existing.get("category", "")
    pri = existing.get("priority", "")
    if existing.get("region") == "Kenya" and pri in ("Critical", "High"):
        existing["outreach_wave"] = existing.get("outreach_wave") or "1"
        existing["funding_fit"] = existing.get("funding_fit") or "High"
    elif "CSR" in cat or "Corporate" in cat:
        existing["outreach_wave"] = existing.get("outreach_wave") or "2"
    elif "Pentecostal" in cat or "PEFA" in existing.get("organization", ""):
        existing["outreach_wave"] = existing.get("outreach_wave") or "2"
    elif pri == "Critical":
        existing["outreach_wave"] = "1"
    elif pri == "High" and existing.get("outreach_wave") in ("", "6"):
        existing["outreach_wave"] = "4"
    if "verify_email" not in existing:
        existing["verify_email"] = "no"
    return existing


def main() -> None:
    rows: list[dict] = []

    for path in [
        OUTREACH / "ALL_CONTACTS_ONE_LIST.csv",
        OUTREACH / "global_contacts_100.csv",
        OUTREACH / "kenya_contacts_100.csv",
    ]:
        rows.extend(load_csv(path))

    rows.extend(seed_ecfa_style_ministries())
    rows.extend(seed_christian_foundations())
    rows.extend(seed_ncf_chapters())
    rows.extend(seed_missions_transport())
    rows.extend(seed_us_megachurch_missions())
    rows.extend(seed_national_evangelical_alliances())
    rows.extend(seed_christian_universities())
    rows.extend(seed_kenya_diaspora())
    extra_ngos = json.loads((OUTREACH / "seeds/international_faith_ngos.json").read_text())
    for g in extra_ngos:
        rows.append(
            row(
                g["name"],
                g["organization"],
                g["email"],
                category="Faith NGO",
                region=g.get("region", "International"),
                priority="Medium",
                wave="5",
                notes=g.get("notes", "Kenya or Africa programs where applicable"),
                source_url=g.get("url", ""),
                funding_fit="Medium",
            )
        )

    rows = [assign_waves_from_priority(r) for r in rows]
    rows = dedupe(rows)

    if len(rows) < 1000:
        extra_states = [
            "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut",
            "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa",
            "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan",
            "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire",
            "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio",
            "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota",
            "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia",
            "Wisconsin", "Wyoming",
        ]
        for i, st in enumerate(extra_states):
            rows.append(
                row(
                    f"State Baptist Convention — {st}",
                    f"Southern Baptist {st}",
                    "",
                    category="Denomination state office",
                    region="United States",
                    priority="Low",
                    wave="7",
                    notes="Find state convention missions email on sbc.net/state conventions",
                    source_url="https://www.sbc.net/who-we-are/state-baptist-conventions/",
                    funding_fit="Low",
                    verify="yes",
                )
            )

    rows = dedupe(rows)
    rows = rows[:1000]

    for i, r in enumerate(rows, start=1):
        r["id"] = str(i)

    out_csv = OUTREACH / "GLOBAL_PHILANTHROPY_LEADS_1000.csv"
    with out_csv.open("w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=FIELDNAMES)
        w.writeheader()
        w.writerows(rows)

    try:
        import openpyxl

        wb = openpyxl.Workbook()
        ws = wb.active
        ws.title = "Leads 1000"
        ws.append(FIELDNAMES)
        for r in rows:
            ws.append([r.get(c, "") for c in FIELDNAMES])
        wb.save(OUTREACH / "GLOBAL_PHILANTHROPY_LEADS_1000.xlsx")
    except ImportError:
        pass

    waves = {}
    for r in rows:
        w = r.get("outreach_wave", "?")
        waves[w] = waves.get(w, 0) + 1
    print(f"Wrote {len(rows)} leads to {out_csv}")
    print("By wave:", waves)


if __name__ == "__main__":
    main()
