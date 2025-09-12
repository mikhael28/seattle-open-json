export interface EmeraldCityResourceGuide {
  name: string;
  website?: string | undefined;
  phone?: string | undefined;
  address?: string | undefined;
  hours?: string | undefined;
  description: string;
  categories: string[];
}

export const emeraldCityResourceGuide: EmeraldCityResourceGuide[] = [
  {
    name: "211",
    website: "http://crisisconnections.org/king-county-2-1-1",
    phone: "211 or 1-800-621-4636",
    hours: "Mon. – Fri., 9 a.m. – 5 p.m.",
    description:
      "2-1-1 is a free confidential community service and your one-stop connection to the local services you need, from utility assistance, food, housing, health, child care, after school programs, elder care, crisis intervention and much more.",
    categories: ["Emergency and Crisis Lines"],
  },
  {
    name: "988, National Suicide Prevention Lifeline",
    website: "http://988lifeline.org",
    phone: "988",
    address: undefined,
    hours: "24/7",
    description:
      "Trained staff help people who are experiencing mental-health related distress and connects people to accessible and compassionate support. Mental health-related distress could include thoughts of suicide, mental health or substance use crisis, and any other kind of emotional distress.",
    categories: ["Emergency and Crisis Lines", "Mental Health Services"],
  },
  {
    name: "Akin",
    website: "http://akinfamily.org",
    phone: "(206) 695-3200",
    address: "12360 Lake City Way N.E., No. 100, 98125",
    hours:
      "By phone: Mon. - Fri., 9 a.m. - 5 p.m. by phone\nOn site: Mon. - Thurs., 9 a.m. - 5 p.m. and Fri. 9 a.m. - 3 p.m.\nClosed daily for lunch 12:30 p.m. - 1:15 p.m.",
    description:
      "Services include basic support needs (food bags, diapers/wipes, hygiene products), early learning programs and infant/early childhood mental health and behavioral health support, family navigation services, and parenting classes as scheduled. Interpreters available with advance notice. Call for appointment.",
    categories: ["Family and Maternity Services"],
  },
  {
    name: "Anchor – South King County Shelter System - Catholic Community Services",
    website: "http://ccsww.org/services/anchor-south-king-co-shelter-system",
    phone: "Kent: (253) 854-0077 x5104;\nFederal Way: (253) 893-7895",
    address:
      "Kent Community Engagement Center \n1229 W Smith St, Kent WA 98032\n\nFederal Way Day Center\n33505 14th Place S No. D\nFederal Way, WA 98003\n\nKent Family Center\n1229 W Smith St, Kent WA 98032",
    hours:
      "Shelter intake - Kent Community Engagement Center: Mon. – Fri., 10 a.m. – 2:30 p.m., closed Wed.; Federal Way Day Center: Mon.-Fri., 10 a.m. - 4 p.m.; Kent Family Center: Wed. 10 a.m. - 2:30 p.m.",
    description:
      "Offers 24/7 shelter and essential needs support such as meals, toiletries and access to other basic needs items. Supportive case management services for education, employment, family reunification, mental health and addiction recovery.",
    categories: [
      "Housing Services",
      "Shelters",
      "Day Centers",
      "Hygiene Services",
      "General Health Services",
      "Mental Health Services",
      "Mail Services",
    ],
  },
  {
    name: "API Chaya",
    website: "http://apichaya.org",
    phone:
      "Helpline: 1-877-922-4292 or (206) 325-0325; office line: (206) 467-9976",
    hours: "Helpline: Mon. – Fri. 10 a.m. – 4 p.m.",
    description:
      "Serves survivors of sexual abuse/assault, human trafficking, and domestic violence. API Chaya Survivor Support Services recognizes the diversity of experiences in Asian, South Asian, and Pacific Islander communities and strives to work with each individual within their own cultural context. Support groups multiple times per year. Assists with resources, referrals for housing, legal, immigration, mental health, food, financial, safety planning, confidential helpline toll-free 1-877-922-4292. Offers information, helps survivors explore options in a confidential and supportive environment. Services are free.",
    categories: ["Survivor Support Services", "Services For People of Color"],
  },
  {
    name: "Arms Around You",
    website: "http://armsaroundyou.org/what-we-do",
    phone: "(206) 629-6405",
    hours: "Mon. – Fri. 9 a.m. – 5 p.m.",
    description:
      "Arms Around You (AAY) is a nonprofit re-entry resource and referrals program that serves formerly incarcerated individuals coming out of correctional facilities, the homeless community, victims of domestic violence and substance abuse. Services include pre- and post-release reentry services; such as employment training, education support, peer counseling, life skills training, substance abuse treatment, mental health support, transitional housing, mentoring, family reunification and improved community supervision.\nSchedule an intake by calling (206) 322-1992 or complete the form online.",
    categories: [
      "Re-entry Assistance",
      "Services For People of Color",
      "Survivor Support Services",
    ],
  },
  {
    name: "Asian Counseling and Referral Service",
    website: "http://acrs.org",
    phone: "(206) 695-7600\ninfo@acrs.org",
    address: "3639 MLK Jr. Way S",
    hours: "Mon.–Fri.: 9 a.m.—4 p.m. by appointment only",
    description:
      "Providing multilingual and multicultural services and programs for a large population of the Asian American, Native Hawaiian, and Pacific Islander (AANHPI) community. Providing Aging and Adult services for older adults', Adult behavioral and mental health services, substance abuse support, problem gambling, and housing assistance. Employment and training programs, citizenship and immigration assistance, children and youth development services. Ages six and older, ID or other documents possibly required based on program",
    categories: [
      "Immigrant and Refugee Services",
      "Financial Assistance",
      "General Health Services",
      "Mental Health Services",
      "Services For People of Color",
      "Drug and Alcohol Services",
      "Housing Services",
    ],
  },
  {
    name: "Asian Counseling and Referral Service, Employment Services",
    website: "http://acrs.org/services/employment-and-training-services",
    phone: "(206) 695-7590\nemploymentprogram@acrs.org",
    address: "3639 MLK Jr. Way S",
    hours:
      "Ready to work program: Mon. — Thurs.: 9 a.m.—noon; new job-seeker orientation every Tues. at 2 p.m.",
    description:
      "Offers support for employment including vocational English language classes, career planning, a job club, and employment case management. Offers ready to work program that focuses on language learning. For people 18 and older living in King County with picture ID. Must be legal to work in US.",
    categories: [
      "Employment and Training Services",
      "Services For People of Color",
      "Immigrant and Refugee Services",
    ],
  },
  {
    name: "Asian Counseling and Referral Service, Food Bank",
    website:
      "http://acrs.org/services/aging-services-for-older-adults/acrs-food-bank",
    phone: "(206) 695-7600",
    address: "800 S Weller St.",
    hours: "Wed. and Fri.: 10 a.m.—1 p.m.",
    description:
      "Distributes foods that cater to Asian American, Native Hawaiian, and Pacific Islander (AANHPI) diets, including healthy and nutritious staples like rice, tofu, soy milk, noodles, canned proteins and produce. ID recommended, but not required.",
    categories: [
      "Services For People of Color",
      "Food Assistance",
      "Immigrant and Refugee Services",
      "Senior Services",
    ],
  },
  {
    name: "Asian Counseling and Referral Service, Health and Wellness",
    website: "http://acrs.org/services/behavioral-health-and-wellness",
    phone: "(206) 695-7511\nmhintake@acrs.org",
    address: "3639 MLK Jr. Way S",
    hours: "Mon. – Fri.: 9 a.m.—4 p.m. by appointment only",
    description:
      "Providing comprehensive adult mental health services to promote whole health by addressing physical, mental and social well-being. Services may include case management, individual, group and family therapy and counseling, psychiatric evaluation and medication management. Must be 18 and older.",
    categories: [
      "Mental Health Services",
      "General Health Services",
      "Problem Gambling Resources",
      "Services For People of Color",
    ],
  },
  {
    name: "Atlantic Street Center, Kent",
    website: "http://atlanticstreetcenter.org",
    phone: "253-859-7792",
    address: "610 W Meeker St., No. 201 Kent",
    hours: "Mon.-Fri.: 9 a.m.-5 p.m.",
    description:
      "Supports families and communities with raising healthy, successful children and youth through direct services like case management, culturally relevant behavioral health, in-home early learning services, youth and education support, family support groups, and services for gender-based violence for low-income communities of color, immigrants, and refugees. The location in Kent offers additional behavioral health and early learning programs.",
    categories: [
      "Survivor Support Services",
      "Family and Maternity Services",
      "Mental Health Services",
      "Immigrant and Refugee Services",
      "Services For People of Color",
    ],
  },
  {
    name: "Atlantic Street Center, Main Office",
    website: "http://atlanticstreetcenter.org",
    phone: "(206) 329-2050",
    address: "2103 S. Atlantic St",
    hours: "Mon. – Fri., 9 a.m. – 5 p.m., appointments only",
    description:
      "Atlantic Street Center’s (ASC) mission is to support families and communities with raising healthy, successful children and youth through direct services and advocacy for social justice and equity. They do this through four main programs: Behavioral Health, Early Learning, Gender-Based Violence Services, and Youth Development & Education Support. This main campus site focuses on resources for behavioral health and gender-based violence services.",
    categories: [
      "Mental Health Services",
      "Services For People of Color",
      "Immigrant and Refugee Services",
      "Survivor Support Services",
    ],
  },
  {
    name: "Atlantic Street Center, Rainier Beach site",
    website: "http://atlanticstreetcenter.org",
    phone: "(206) 723-1301",
    address: "5150 S. Cloverdale Pl.",
    hours: "Mon. – Fri., 9 a.m. – 5 p.m.",
    description:
      "Atlantic Street Center’s (ASC) mission is to support families and communities with raising healthy, successful children and youth through direct services and advocacy for social justice and equity. ASC’s Rainier Beach location serves as a family center for day-to-day programming including after-school and summer educational opportunities, support groups for teen parents and kinship caregivers, and early learning programming.",
    categories: [
      "Immigrant and Refugee Services",
      "Family and Maternity Services",
      "Survivor Support Services",
      "Services For People of Color",
    ],
  },
  {
    name: "Aurora Commons",
    website: "http://auroracommons.org",
    phone: "Day center: (206) 299-2278",
    address: "8914 Aurora Ave. N",
    hours:
      "Drop in: Mon. – Thurs., 10 a.m. – 1 p.m.; Aurora Clinic: Mon. and Tues., 10 a.m. – 2 p.m.; She Clinic (women only): Wed. and Thurs., 11 a.m. – 2 p.m.",
    description:
      "Provides support needed to pursue sobriety, housing, employment, escape from the sex trade, and more. Provides drop-in space directly serving women who are commercially sexually exploited, a Bad Date alert, and resource referrals. Trauma-informed, non-judgmental healthcare to women in the SHE clinic. Offers community kitchen, art program, full medical clinical services, integrated treatment of the whole patient, including those with opiate use.",
    categories: [
      "General Health Services",
      "Survivor Support Services",
      "Womxn's Health Services",
      "Day Centers",
    ],
  },
  {
    name: "Ballard Food Bank",
    website: "http://ballardfoodbank.org",
    phone: "(206) 789-7800",
    address: "1400 NW Leary Way",
    hours:
      "Food Bank: Mon. 10 a.m. – 3:45 p.m.; Tues. and Thurs., 10 a.m. – 6:45 p.m.; and Wed., 10 a.m. – 1:45 p.m.\nKindness Cafe: Mon. 10 a.m. – 3 p.m.; Tues. and Thurs., 10 a.m. – 6:45 p.m.; and Wed., 10 a.m. – 1:30 p.m.\nCommunity Resource Hub: Mon. 10 a.m. – 3:45 p.m.; Tues. and Thurs., 10 a.m. – 6:45 p.m.; and Wed., 10 a.m. – 1:45 p.m.",
    description:
      "Food bank styled like grocery store. Clients must register to use food bank service, but ID is not required. Can shop in the grocery store once a week, receive a free meal at the cafe once a day, and access non-food resources in the Hub like mail services, ID vouchers, and more. Non-perishable to-go food bags offered. Also offers grocery home delivery and financial assistance for those living in 98109, 98119, 98199, 98103, 98133, 98107, 98117, and 98177.",
    categories: [
      "Identification Services",
      "Food Assistance",
      "Mail Services",
      "Financial Assistance",
    ],
  },
  {
    name: "Ballard Sunday Dinners",
    website: "http://bflcs.org",
    phone: "(206) 784-1306",
    address: "Ballard First Lutheran Church, 2006 NW 65th St.",
    hours: "Sun., 5 – 6 p.m.",
    description: "Free dinner on Sunday night dinners.",
    categories: ["Food Assistance"],
  },
  {
    name: "Bellwether Housing",
    website: "http://bellwetherhousing.org",
    phone: "(206) 623-0506",
    address: "433 Minor Ave N",
    hours: "Mon. – Fri., 8 a.m. – 5 p.m.",
    description:
      "Permanent affordable rental housing. Find available apartments online, follow step-by-step guide to apply. Applicants must pay application fee and complete in-person appointment with Site Manager. More information about qualifications and income limits available online.",
    categories: ["Housing Services"],
  },
  {
    name: "Benefits Law Center",
    website: "http://benefitslawcenter.org",
    phone: "(206) 686 – 7252,\ninfo@benefitslawcenter.org",
    address: "1404 E. Yesler Way No. 203",
    hours: "Mon. – Fri., 9 a.m. – 5 p.m.",
    description:
      "Benefits Law Center provides Social Security legal advocacy to people living with physical and mental disabilities who are homeless or low-income. Services include Applying for SSI and SSDI, and Appealing denials. The Disabled Homeless Advocacy Project (DHAP) delivers legal aid at local shelters, libraries, and sites accessible to the homeless population. DHAP helps provide resources necessary to help keep clients engaged in medical treatment and in their disability claim.",
    categories: ["Disability Services", "Legal Services"],
  },
  {
    name: "Bethany Community Church",
    website: "https://churchbcc.org/missions/localmissions",
    phone: "(206) 524-9000",
    address: "1147 N 81st St",
    hours:
      "Food bank: Mon., 6 – 7 p.m.; Community meals: Second and last Mon. each month, 6 – 7 p.m.",
    description:
      "Food bank and hot meals offered in the Community Life Center (CLC) building. Serves everyone. No fees. To-go meals offered, but all are welcome to stay and eat together during the community meal.",
    categories: ["Food Assistance"],
  },
  {
    name: "Bike Works - BikeMobile",
    website: "http://bikeworks.org/bike-shop/bike-mobile",
    phone: "206-725-8867\nadultprograms@bikeworks.org",
    address: "3709 S Ferdinand St",
    hours: "Check website for updated schedule or cancellations.",
    description:
      "Repair comes to you. From spring to fall, the BikeMobile travels around the Seattle area, primarily visiting areas designated as “bike deserts”, where bike shops are few and far between. All repair services are performed for free, or on a sliding scale. Most bike parts are offered at cost and offers used parts to fit almost any budget. The BikeMobile was created to increase access for: Youth, People from low-income households, Black, Indigenous, People of Color, Women, Trans, non-binary individuals, Immigrants and Refugees, People experiencing homelessness, People with disabilities, and People dependent on their bike for daily transportation.",
    categories: [
      "Immigrant and Refugee Services",
      "LGBTQIA+ Services",
      "Native & Indigenous Services",
      "Transportation Assistance",
      "Services For People of Color",
    ],
  },
  {
    name: "Bike Works - Bikes for All",
    website: "http://bikeworks.org/bikes-for-all",
    phone: "(206) 725-8867\ninfo@bikeworks.org",
    address: "3709 S Ferdinand St",
    hours: undefined,
    description:
      "The Bikes-for-All program provides free rebuilt bicycles and helmets to youth, adults, & families living in SE Seattle who are facing barriers. Because systemic racism and inequality denies resources to members of marginalized communities, the Bikes-for-All! program was created to increase access for: Youth, people from low-income households, black, indigenous, people of color (BIPOC), Women, Trans, non-binary individuals, immigrants and refugees, people experiencing homelessness, people with disabilities.  Applications are accepted on a rolling basis and fulfilled on a first come, first serve basis. Apply online. You must live in one of our qualifying zip codes to recieve a bicycle: 98144, 98134, 98108, 98118, 98168, 98178.",
    categories: [
      "Native & Indigenous Services",
      "Immigrant and Refugee Services",
      "Family and Maternity Services",
      "LGBTQIA+ Services",
      "Services For People of Color",
      "Transportation Assistance",
    ],
  },
  {
    name: "Blaine Veterans Center Enhanced Shelter",
    website:
      "http://compasshousingalliance.org/emergency-programs/blaine-center",
    phone: "(206) 474-1660",
    address: "150 Denny Way",
    hours: "Referrals: Mon. – Fri., 9 a.m. – 4 p.m.",
    description:
      "By referral shelter that provides 36 beds with 24-hour access, housing navigation support, and case management services. Serves single men 18 years and older. For referrals, visit the Compass Client Services office in person Mon. – Fri., 9 a.m. – 4 p.m., 77 S. Washington St., Seattle, (206) 474-1630",
    categories: ["Shelters"],
  },
  {
    name: "Blessed Sacrament Food Program",
    website: "http://blessed-sacrament.org/outreach",
    phone: "(206) 930-6005; (206) 767-6449 Helpline",
    address: "5050 8th Ave. NE",
    hours:
      "Sun. meal: 12 – 2 p.m.; Food pantry: Fri., 10:30 a.m. – noon; Helpline Mon. – Fri., 8 a.m. – 3 p.m.",
    description:
      "Sunday meal has limited indoor seating or pick-up and take to go.  All are welcome to the Friday Food Pantry (modified in-person shopping). No proof of ID required and no fees.  Grocery delivery is available for residents that are physically unable to visit the Food Pantry and must reside within our Parish boundaries. Visit in-person or call for delivery requirements.",
    categories: ["Food Assistance"],
  },
  {
    name: "Bread of Life Mission Shelter",
    website: "http://breadoflifemission.org/emergency-services-overview",
    phone: "(206) 682-3579",
    address: "97 S Main St.",
    hours:
      "24/7/365 shelter sign up for new clients. Only available to men 18 and older.",
    description:
      "Services include shelter for men age 18 and older, clothing, showers, meals, computers lab, recovery services.",
    categories: ["Shelters", "Mail Services", "Day Centers"],
  },
  {
    name: "Bridge Ministries",
    website: "http://bridgemin.org/get-equipment",
    phone: "(425) 628-1751\nequipment@bridgemin.org",
    address: "12340 Northup Way\nBellevue",
    hours: "Mon. – Thu. 9:30 a.m. – 5 p.m.",
    description:
      "The Meyer Medical Equipment Center (MMEC) provides medical and mobility equipment like wheelchairs to anyone in need on a donate-what-you-can basis, without eligibility requirements or an application process for most items. If you have a disability–whether long or short term–and would like to obtain equipment, call, visit the warehouse, or request online. Experienced staff will be happy to discuss your needs, assist with selection and fitting, and send you home with the equipment you need to safely and comfortably navigate your community and home. Bridge Ministries also provides Guardianship Services and Spiritual Connections.",
    categories: ["Disability Services"],
  },
  {
    name: "Byrd Barr Place",
    website: "http://byrdbarrplace.org",
    phone: "(206) 812-4940",
    address: "722 18th Ave",
    hours:
      "Food bank hours: Tues.: 11 a.m.—4 p.m.; Wed.: noon—4 p.m.; Thurs.: 10 a.m.—2 p.m.\nCall for energy assistance: Mon.-Fri.: 9 a.m.—5 p.m.",
    description:
      "Energy assistance (PSE HELP and LIHEAP), food bank, financial empowerment courses, and resource referral to the Seattle area. May visit the Market for food once per week. Home delivery available only to residents of ZIP codes 98102, 98112, and 98122; call for information on how to arrange. Proof of current address required. Offers energy assistance once per program year and temporary shelter assistance (eviction prevention) when available. Serves Seattle residents with income at or below 125 percent of the Federal Poverty Line. Available October through July as funding allows. Call or go online for application instructions. No fees.",
    categories: [
      "Food Assistance",
      "Services For People of Color",
      "Financial Assistance",
      "Senior Services",
    ],
  },
  {
    name: "Call BlackLine",
    website: "http://callblackline.com",
    phone: "800-604-5841",
    hours: "24 hours, 7 days a week",
    description:
      "BlackLine 800-604-5841 is a 24-hours a day, 7 days a week hotline you can call or text. BlackLine provides a space for peer support, counseling, witnessing and affirming the lived experiences to folxs who are most impacted by systematic oppression with an LGBTQ+ Black Femme Lens. BlackLine prioritizes BIPOC (Black, Indigenous and People of Color). BlackLine is anonymous and confidential and can provide immediate crisis counseling to those who call upset, need to talk with someone immediately, or are in distress.",
    categories: [
      "LGBTQIA+ Services",
      "Native & Indigenous Services",
      "Services For People of Color",
      "Emergency and Crisis Lines",
    ],
  },
  {
    name: "Camp United We Stand",
    website: "http://campunitedwestand-tentcity.org",
    phone: "(425) 616-8853",
    address:
      "Northlake Lutheran Church\n6620 NE 185th St, Kenmore\nCurrent as of publication. Moves every 3-6 months, call or visit website for current address.",
    hours: "24/7, preferred people come for intake during daylight hours.",
    description:
      "Encampment with $40 maintenance fee and requirement to work security shifts. Picture ID and background check for current warrants and sex offender status required for intake. Zero tolerance for alcohol and drugs. Site includes kitchen and shower, and accepts donations. Call to confirm location, eligibility, application and fees.",
    categories: ["Encampments"],
  },
  {
    name: "CARES of Washington",
    website: "http://caresofwa.org",
    phone: "(206) 938-1253",
    address: "1833 N 105th St., #202",
    hours: "Mon. – Fri., 8 a.m. – 5 p.m.",
    description:
      "Career coaching, financial planning, benefits counseling and asset development services serving people 18 and older who are legally eligible to work in the U.S. Serves people with disabilities and people with barriers to employment. Call, apply online or apply in person. No fees.",
    categories: ["Employment and Training Services", "Disability Services"],
  },
  {
    name: "Casa Latina",
    website: "http://casa-latina.org",
    phone:
      "(206) 956-0779; Employment Services/Servicios de Empleo: (206) 686-2554; ESL/Clases de Inglés: (206) 686-2618",
    address: "317 17th Ave. S",
    hours:
      "Mon.— Fri. 9 a.m. — 5 p.m. but call first to confirm the correct staff members are available.\nOrientation: second and fourth Tues.: 7 a.m.—4 p.m. Cleaning work available second Tues. of the month.",
    description:
      "Offers free English classes, day labor dispatching, housecleaning dispatch, community support and help reclaiming stolen wages. Serves the Latino immigrant community. Visit in person. Documents required: Photo ID. Membership for job dispatch: $30/year.",
    categories: [
      "Employment and Training Services",
      "Services For People of Color",
      "Immigrant and Refugee Services",
    ],
  },
  {
    name: "Catholic Community Services CReW Program, Seattle and Eastside",
    website:
      "http://ccsww.org/services/crew-counseling-recovery-and-wellness-program",
    phone: "Seattle/East Side (206) 956-9570; South King County (253) 246-2435",
    address:
      "1902 2nd Ave, Seattle 98101; 11920 NE 80th St, Kirkland, 98033; 1229 W Smith St, Kent 98032; 33505 13th Place S, Federal Way 98003",
    hours: "Mon.–Fri.: 8:30 a.m.—5 p.m.",
    description:
      "Provides outpatient mental health and substance use treatment services, referral to inpatient or residential treatment for adults 18 and older. Agency provides Department of Behavioral Health and Recovery/DBHR-certified service(s). Call to set up an appointment. Accepts Apple Health (Medicaid).",
    categories: ["Mental Health Services", "Drug and Alcohol Services"],
  },
  {
    name: "Catholic Community Services, Housing Services",
    website: "http://ccsww.org/our-services/catholic-housing-services",
    phone: "(206) 328-5696",
    address: "100 23rd Ave. S",
    hours: "Mon.-Fri.: 7:30 a.m.—5 p.m.",
    description:
      "Transitional housing, permanent housing and supportive services for low-income individuals, families, seniors farm workers, and persons with special physical and mental needs. Call for more information or look at options on the website. Accepts Comprehensive Reusable Tenant Screening Reports.",
    categories: ["Housing Services"],
  },
  {
    name: "Catholic Community Services, Kinship Program",
    website: "http://ccsww.org/services/kinship-services",
    phone: "(206) 328-6858",
    address: "100 23rd Ave. S",
    hours: "Mon.–Fri.: 8:30 a.m.—4 p.m.",
    description:
      "For families who are raising grandchildren, nieces, nephews, siblings etc. who are in need of assistance navigating resources to help the families become stable . Assists with applying for TANF, Child Tax Credit, finding medical or mental health services and assistance with applying for medical insurance. Kinship Navigators are available to provide kinship caregivers with information, referrals and resources to support them with financial assistance, parent education, childcare, legal guidance, housing, and more.",
    categories: [
      "Food Assistance",
      "Family and Maternity Services",
      "Clothing Assistance",
    ],
  },
  {
    name: "Catholic Community Services, Michael’s Place",
    website: "http://ccsww.org/services/michaels-place",
    phone: "(206) 726-5688",
    address: "1307 E Spring St.",
    hours: "Mon.-Fri.: 9 a.m.—5 p.m.",
    description:
      "Michael’s Place offers eighteen beds of transitional housing for Veterans who are homeless, in recovery from drugs and alcohol, and/or have a mental health diagnosis. There are daily chores, weekly room inspections and group therapy meetings throughout the week to support all residents in their recovery. Michael’s Place is community living. This means Veterans stay in either a private or shared room in a large house with communal living and eating areas. There’s a weekly community meal, holiday gatherings and other events to bring residents together.  Application is done via the VA system or King County Veterans organizations. Call for more information.",
    categories: ["Housing Services", "Veteran Services"],
  },
  {
    name: "Catholic Community Services, Pregnancy & Parenting Support (PREPARES)",
    website: "http://ccsww.org/get-help/child-youth-family-services",
    phone: "(206) 737-9264\nprepares@ccsww.org",
    address: "100 23rd Ave. S",
    hours: "Mon.–Fri.: 9 a.m.—5 p.m.",
    description:
      "Counseling, case management, education, emergency assistance and material support for women and families with children 5 years and younger. Does not provide medical referrals. Call for phone intake. Interpreter services available by appointment only. No fees.",
    categories: ["Family and Maternity Services", "Womxn's Health Services"],
  },
  {
    name: "Catholic Immigration Legal Services",
    website:
      "http://ccsww.org/get-help/specialized-services/refugee-immigration-services",
    phone: "(206) 328-6314",
    address: "100 23rd Ave. S",
    hours: "Mon.–Fri.: 9 a.m.—5 p.m., by appointment only",
    description:
      "Immigration legal services, including citizenship assistance, green cards, DACA and family-based petitions serving low-income refugees, asylees and immigrants in Washington. Call for initial screening. ID or other documents may be required depending on legal provider.",
    categories: ["Legal Services", "Immigrant and Refugee Services"],
  },
  {
    name: "Cedar River Clinics",
    website: "http://cedarriverclinics.org/seattle",
    phone: "(800) 572-4223",
    address:
      "601 S Carr Rd No. 200, Renton 98055 \n1401 MLK Jr Way, Tacoma 98405",
    hours: "Intake: Tues. – Fri., 8 a.m. – 5 p.m.",
    description:
      "Offers health care such as cancer screenings, STD testing and treatment, HIV Testing, vasectomy, abortion and birth control. Offers transgender services such as hormone therapy, surgical referrals for gender reassignment, breast and cosmetic surgeries, post-surgical follow up and ID documentation. Serves clients identifying as LGBTQ. Call for more information or to make an appointment. Sliding scale fees. Accepts Apple Health (Medicaid) and most insurance plans. Documents required: Photo ID (doesn't need to be State/Gov ID, anything with name and picture).",
    categories: ["LGBTQIA+ Services", "General Health Services"],
  },
  {
    name: "Chief Seattle Club",
    website: "http://chiefseattleclub.org",
    phone: "Front desk: (206) 715–7536\nHousing: (206) 677–0912",
    address: "410 - 2nd Ave Extension S",
    hours:
      "Day center: Daily, 7 a.m. – 2 p.m.; Breakfast: Daily, 8 – 9 a.m.; Lunch: noon – 12:45 p.m.; Showers: Daily: 7 a.m. – 1 p.m.; Laundry: 7 a.m. – 11 a.m., pick up at 1 p.m. \nHousing: phone/email Mon. – Fri. 8 a.m. – 4:30 p.m., walk-ins Mon. – Fri. 9 a.m. – 1 p.m.",
    description:
      "Native-led agency providing basic needs and a day center, physically and spiritually supporting American Indian and Alaska Native people. Day Center in the Pioneer Square provides food, primary heath care, housing/eviction prevention assistance, art program, dshs out station assistance, hygiene/laundry, assistance with ID's, social security cards, birth certificates, tribal documentation, and glasses in addition to referrals for SUD support, Re-Entry and DV/SA services, and Traditional wellness as well as frequent outings for members to cultural and community-building events. Must come in person to receive rapid rehousing, diversion, or eviction prevention assistance. Tribal affiliation required for membership, no ID necessary.",
    categories: [
      "Native & Indigenous Services",
      "Day Centers",
      "Housing Services",
    ],
  },
  {
    name: "Child Care, City of Seattle",
    website: "http://seattle.gov/education/for-parents",
    phone: "(206) 233-5118",
    address: "700 Fifth Ave., No. 1700",
    hours: "Mon. – Fri., 8 a.m. – 5 p.m.",
    description:
      "Child care through Seattle Preschool Program (SPP) or Child Care Assistance Program (CCAP). Financial assistance for families in need of child care for low income families with children 13 and under. Call for further information about requirements (206) 386-1050, or email education@seattle.gov. You can apply online at listed website.",
    categories: ["Family and Maternity Services"],
  },
  {
    name: "Chinese Information and Service Center",
    website: "http://cisc-seattle.org/programs/family-support",
    phone: "(206) 624-5633",
    address: "611 S Lane St.",
    hours: "Office: Mon. – Fri., 8:30 a.m. – 5 p.m.",
    description:
      "Multi-service family support center includes naturalization assistance, healthcare navigation, housing assistance, ESL classes, case management to older adults and people with disabilities, family counseling, and more. Hosts free legal clinic on Tuesdays 5:30 – 7:30 p.m. by appointment only, call 425-289-8608 to schedule (interpretation is provided upon request with advance notice). Primarily serves limited-English-speaking immigrant Chinese and Russian people.",
    categories: [
      "Services For People of Color",
      "Family and Maternity Services",
      "Legal Services",
      "Immigrant and Refugee Services",
    ],
  },
  {
    name: "City of Bellevue Utility Assistance",
    website:
      "http://utilities.bellevuewa.gov/pay-your-utility-bill/utility-rate-and-tax-relief",
    phone: "(425) 452-5285\nUtilityRelief@bellevuewa.gov",
    address: "450 110th Ave. NE\nBellevue, WA",
    hours: "Mon. – Fri., 8 a.m. – 5 p.m.",
    description:
      "Utility assistance for water, wastewater and drainage. Serves ages 62 and older, or individuals with a permanent disability. Must be at or below 50 percent of area median income. Call or visit website. No fees.",
    categories: ["Financial Assistance"],
  },
  {
    name: "City of Seattle, Office of Immigrant and Refugee Affairs",
    website: "http://seattle.gov/iandraffairs",
    phone: "(206) 727-8515",
    address: "700 5th Ave No. 1616",
    hours: "Mon. – Fri. 9 a.m. – 5 p.m.",
    description:
      "City of Seattle Office of Immigrant and Refugee Affairs programs include Citizenship access, ESL and Job Training, Legal Defense Fund and Network, Immigrant Safety and Access Network, and Language Access Program. City employees do not ask about citizenship status and serve all residents regardless of immigration status. Please call (206) 727-8515 or email oira@seattle.gov first to schedule an appointment before dropping in.",
    categories: ["Immigrant and Refugee Services"],
  },
  {
    name: "City of Seattle Utility Discount Program",
    website:
      "http://seattle.gov/humanservices/services-and-programs/utility-discount-program",
    phone: "(206) 684-0268",
    address: "810 Third Ave., No. 440",
    hours:
      "Phone calls: Mon. – Thurs., 7:30 a.m. – 3 p.m.; Walk-ins: Mon. – Thurs. 8 – 10 a.m. and noon – 2 p.m.",
    description:
      "Rate discount for Seattle City Light and Seattle Public Utilities. Serves all Seattle City Light and Seattle Public Utilities customers at or below 70% state median income. Call, visit in person or visit website for application. No fees to apply.",
    categories: ["Financial Assistance"],
  },
  {
    name: "Columbia Legal Services",
    website: "http://columbialegal.org",
    phone: "(206) 464-5911 or (800) 542-0794 (Toll Free)",
    address: "101 Yesler Way, Suite 300\nSeattle",
    hours: "Mon. – Fri., 9 a.m. – 5 p.m.",
    description:
      "Attorneys assist people struggling with fees, fines and restitution, being denied housing or employment because of their criminal background. Cannot assist with vacating/sealing/expunging criminal records. However, if you hope to clear up your record you will need to ensure that you do not owe any Legal Financial Obligations (LFOs) for the relevant conviction. If you owe LFOs and do not have the financial ability to pay them, you may contact our legal clinic at ReentryClinic@columbialegal.org to learn about relief options. There are no time restrictions for age of criminal history. Annual gross income should be at or below the federal poverty level. Call for an appointment and clinic location. No fees.",
    categories: ["Re-entry Assistance", "Legal Services"],
  },
  {
    name: "Community Health Access Program (CHAP) - King County",
    website:
      "http://kingcounty.gov/depts/health/locations/health-insurance/access-and-outreach/community-health-access-program.aspx",
    phone: "1-800-756-5437",
    address:
      "Public Health — Seattle & King County; \n201 S Jackson St. 98104\nFederal Way Enrollment Office;\n1640 S 318th Pl. No. B Federal Way, 98003",
    hours:
      "Seattle: Mon. — Fri., 8:30 a.m. — 4:30 p.m., closed 1—2 p.m. and second and fourth Saturdays 10 a.m. — 2 p.m.\nFederal Way: Mon. — Thurs. 8:30 a.m. — 5 p.m. and first, third, and fifth Saturdays 10 a.m.— 2 p.m.",
    description:
      "CHAP is a telephone assistance program serving King County residents. Service enrolls people into health insurance, ORCA LIFT transportation, basic food, other public benefit programs. Services are free and confidential. Equal access to health care regardless of income, ethnicity, language, or immigration status. Call for help 1-800-756-5437 or email: chap@kingcounty.gov, interpreters available.",
    categories: ["General Health Services"],
  },
  {
    name: "Community Living Connections",
    website: "http://communitylivingconnections.org",
    phone:
      "(206) 962-8467 or toll-free (844) 348-5464\ninfo@communitylivingconnections.org",
    hours: "Mon. – Fri., 8 a.m. – 6 p.m.",
    description:
      "Phone line connecting social services for older adults, adults with disabilities, and their caregivers. Individual consultation, help planning for long-term care needs. Assistance accessing community resources such as: Medicaid, State and federal benefits, nutrition programs, family caregiver programs, kinship care, care coordination, minor home repair, transportation, more. Caregivers may qualify for caregiver support services. Other languages also available. Servicios ofrecidos en español.",
    categories: ["Disability Services", "Senior Services"],
  },
  {
    name: "Community Lunch on Capitol Hill",
    website: "http://communitylunch.org",
    phone: "(206) 972-2524",
    address: "500 Broadway E",
    hours: "Mon. – Fri., noon –1 p.m.",
    description:
      "Serves hot lunch, dine-in or take-out. Serves everyone. No fees or sign in. Operates out of All Pilgrims Church, corner of Republican and 10th Ave E.",
    categories: ["Food Assistance"],
  },
  {
    name: "Compass Housing Alliance",
    website: "http://compasshousingalliance.org",
    phone: "(206) 474-1000",
    address: "220 Dexter Ave. N",
    hours: "Mon. – Fri., 9 a.m. – 4 p.m.",
    description:
      "Affordable housing services, and shelters, family programs, emergency programs, and veterans programs. Shelters provide both a safe place to sleep and case management resources. Enhanced shelters with 24/7 on-site support services and intensive case management including housing navigation services. If you are currently a homeless Veteran or at risk of losing housing, please call the VA’s Homeless Outreach Clinic at 425-203-7200.",
    categories: ["Shelters", "Housing Services"],
  },
  {
    name: "Compass Housing Alliance Day Center Services",
    website:
      "http://compasshousingalliance.org/emergency-programs/compasscenternavigation",
    phone: "(206) 474-1630",
    address: "210 Alaskan Way S",
    hours: "Day center: Mon. – Fri., 9 a.m. – 4 p.m.",
    description:
      "Homeless adults 18 and older can seek refuge, meals, and basic services as well as connect with housing navigation support, case management, entitlements, and other benefits, mental health counseling, and nursing services. Additional day services such as laundry, showers, and mail are also available on-site.",
    categories: ["Day Centers"],
  },
  {
    name: "Compass Housing Alliance, Shoreline Veterans Center",
    website:
      "http://compasshousingalliance.org/affordable-housing/veterans-center-shoreline",
    phone: "(206) 474-1880",
    address: "1301 N 200th St. \nShoreline, WA",
    hours: "Daily: 8:30 a.m. – 5 p.m.",
    description:
      "Shoreline Veterans Center (SVC) provides permanent supportive housing and case management for 21 men and 4 women who are Veterans. The center’s technology lab offers computer classes and helps residents apply for benefits, look for a job, and access resources online. If you are currently a homeless Veteran or at risk of losing housing, please call the VA’s Homeless Outreach Clinic at 425-203-7200. Documents needed may include a DD 214 or letter of service, ID, social security card, income, disability, and homelessness verification.",
    categories: ["Veteran Services"],
  },
  {
    name: "Compass Housing Alliance, Veterans Center, Renton",
    website:
      "http://compasshousingalliance.org/affordable-housing/veterans-center-renton",
    phone: "(206) 474-1913",
    address: "419 S 2nd St. #4 \nRenton, WA",
    hours: "staffed 24 hours a day",
    description:
      "Permanent housing for Veterans, including singles, couples, and families. We offer adult and youth programming spanning the interests of our residents, children’s programming, food programming, case management services, and connections to community partnerships in a variety of arenas to help residents find the support they need. The program is open to disabled homeless veterans or homeless Veterans with families in which someone in the household must have a disabling condition, earning between zero to 60% Area Median Income. If you are currently a homeless veteran or at risk of losing housing, please call the VA’s Homeless Outreach Clinic at 425-203-7200 and get connected to the Community Resources and Referrals Center (CRRC) at 206-764-5149. All referrals go through the VASH program at CRRC. Documents needed include a DD 214 or letter of service, ID, social security card, income, disability, and homelessness verification.",
    categories: ["Veteran Services"],
  },
  {
    name: "Consejo Counseling and Referral Services, Headquarters",
    website: "http://consejocounseling.org/visit-us",
    phone: "(206) 461-4880",
    address: "723 SW 10th St., Renton",
    hours: "Mon.–Fri.: 8 a.m.—5 p.m.; Service hours vary",
    description:
      "Provides transitional housing program, domestic violence program, sexual assault program, children, youth and family services, mental health, substance use disorder treatment, and complementary medicine program and primary care. Primarily serves Spanish-speaking population. Call for intake. Various locations across King County.",
    categories: [
      "Mental Health Services",
      "Survivor Support Services",
      "Immigrant and Refugee Services",
      "Drug and Alcohol Services",
      "Services For People of Color",
    ],
  },
  {
    name: "Council on American-Islamic Relations: CAIR",
    website: "http://cairwa.org",
    phone: "(206) 367-4081",
    address: "1511 3rd Ave., No.788",
    hours: "Mon.–Fri.: 9 a.m.—5 p.m. By appointment only, no walk-ins.",
    description:
      'Advocates on behalf of those who have experienced religious discrimination, defamation or hate crimes. Serves practicing Muslims and those perceived as Muslims. Call for more information. No fees. Services by appointment only, no walk-ins. We do not take inquiries on legal matters by phone. Please go to our website CAIRWA.ORG and go to the button marked "Get Help" and fill out the information requested there. Someone will get in touch with you as soon as possible.',
    categories: [
      "Services For People of Color",
      "Legal Services",
      "Immigrant and Refugee Services",
    ],
  },
  {
    name: "Country Doctor, After Hours Clinic",
    website: "http://cdchc.org/clinic/after-hours-clinic",
    phone: "(206) 709-7199",
    address: "2101 E Yesler Way",
    hours: "Mon.–Fri.: 6—9 p.m.; Sat.-Sun.: 11 a.m.—5 p.m.",
    description:
      "After hours no appointment necessary, walk-ins welcome. Comprehensive health services and an after-hours clinic. Serves everyone. Interpretation services are immediately available. Offers full range of primary care services and the convenience of an on-site pharmacy. Offers prenatal and pregnancy care. Sliding scale fees based on family size and income. Accepts Medicare, Apple Health (Medicaid) insurance and uninsured patients. No one will be turned away due to inability to pay.",
    categories: ["General Health Services"],
  },
  {
    name: "Country Doctor Community Health Center",
    website: "http://cdchc.org/clinic/country-doctor",
    phone: "(206) 299-1600",
    address: "500 19th Ave. E",
    hours:
      "Mon., Thurs., Fri.: 9 a.m.—5 p.m.; Tues. and Wed.: 9 a.m.—8:30 p.m.",
    description:
      "Provides health services for everyone. Interpretation services are immediately available. Offers full range of primary care, specialized care, and behavioral health services with the convenience of an on-site pharmacy. Offers prenatal and pregnancy care. Sliding scale fees. Accepts Medicare, Apple Health (Medicaid) insurance and uninsured patients. No one will be turned away due to inability to pay. Daytime appointments.",
    categories: ["General Health Services"],
  },
  {
    name: "Country Doctor Community Health Centers, Carolyn Downs",
    website: "http://cdchc.org/clinic/carolyn-downs-family-medical-center",
    phone: "(206) 299-1900",
    address: "2101 E Yesler Way",
    hours:
      "Mon., Thurs., Fri.: 9 a.m.—5 p.m.; Tues. and Wed.: 9 a.m.—8:30 p.m.",
    description:
      "Provides health services for everyone. Interpretation services are immediately available. Offers full range of primary care, specialized care, and behavioral health services with the convenience of an on-site pharmacy. Offers prenatal and pregnancy care. Sliding scale fees. Accepts Medicare, Apple Health (Medicaid) insurance and uninsured patients. No one will be turned away due to inability to pay. Daytime appointments.",
    categories: ["General Health Services"],
  },
  {
    name: "Country Doctor Dental Clinic",
    website: "http://cdchc.org/clinic/dental-clinic",
    phone: "(206) 299-1611",
    address: "510 19th Ave. E",
    hours: "Mon.–Fri.: 8 a.m.—5 p.m.",
    description:
      "Dental services include new patient exams and x-rays, regular cleaning and deep cleaning, oral health education and training for good oral hygiene, fillings, crowns and dentures, extractions, and emergency dental. Accepts Medicaid for dental services. Daytime appointments.",
    categories: ["Dental and Vision Services"],
  },
  {
    name: "Crisis Connections",
    website: "http://crisisconnections.org/king-county-2-1-1",
    phone: "2-1-1\nFor assistance within King County: 1 (800) 621-4636",
    hours: "Mon. - Fri., 8 a.m. – 6 p.m.",
    description:
      "Connects people with information on all health and human services in King County, such as housing assistance, help with financial needs, legal assistance, or help finding the nearest food bank, or hot meals. Provides pre-screening for food stamps. Call or submit a message on the 2-1-1 website. No fees.",
    categories: [
      "Food Assistance",
      "Legal Services",
      "Emergency and Crisis Lines",
      "Financial Assistance",
    ],
  },
  {
    name: "Crisis Connections 24-Hour Crisis Line",
    website: "http://crisisconnections.org/24-hour-crisis-line",
    phone: "(866) 427-4747\n(206) 461-3222",
    hours: "24/7",
    description:
      "The 24-Hour Crisis Line provides immediate help to individuals, families, and friends of people in emotional crisis. Can help you determine if you or your loved one needs professional consultation and we can link you to the appropriate services",
    categories: ["Emergency and Crisis Lines"],
  },
  {
    name: "Crisis Connections, Warm Line Peer to Peer Mental Health Support Line",
    website: "http://crisisconnections.org/wa-warm-line",
    phone: "(877) 500-9276",
    hours: "Mon.-Sun., 9 a.m. – 10 p.m.",
    description:
      "Phone line service that supports people who have emotional and mental challenges. Calls are confidential and answered by volunteers that have experienced similar issues. If you are in an emergency, please call 911. If you are considering suicide, please call the 24-hour Crisis Line at 1(866) 427-4747.",
    categories: ["Mental Health Services", "Emergency and Crisis Lines"],
  },
  {
    name: "DAWN",
    website: "http://dawnrising.org",
    phone: "(425) 656-7867",
    address: "221 W Gowe St.\nKent, WA",
    hours:
      "Shelter and Helpline: 24/7\nGowe building: 8 a.m. – 5 p.m. by appointment only",
    description:
      "Domestic violence non-profit agency offering various advocacy services, mental health services, and a confidential emergency shelter to adults, with or without children, who are survivors of intimate partner domestic violence.",
    categories: ["Emergency and Crisis Lines", "Survivor Support Services"],
  },
  {
    name: "Department of Social and Health Services, Central Seattle",
    website: "http://dshs.wa.gov",
    phone: "(877) 501-2233",
    address: "1700 E Cherry St. No. 100",
    hours: "Mon. - Fri., 8 a.m. – 5 p.m.",
    description:
      "DSHS provides public benefits to low-income people for food, cash, medical insurance, housing assistance, child support, vocational rehabilitation, adult care, and disability support. Apply in person, or call Customer Service to apply (877) 501-2233; or apply online at washingtonconnection.org. For an Identification/ID card, ask your DSHS caseworker to fill out form 16-029 “Request for Identicard.” Bring documented information to help with your eligibility determination: Your immigration status documentation, Proof of Washington residency, Information on your income, Name of your voluntary resettlement agency (VOLAG)",
    categories: ["Financial Assistance", "Identification Services"],
  },
  {
    name: "Department of Social and Health Services, Downtown Seattle",
    website: "http://www.dshs.wa.gov",
    phone: "(877) 501-2233",
    address: "2106 Second Ave.",
    hours: "Mon. - Fri., 8 a.m. – 5 p.m.",
    description:
      "DSHS provides public benefits to low-income people for food, cash, medical insurance, housing assistance, child support, vocational rehabilitation, adult care, and disability support. Apply in person, or call Customer Service to apply (877) 501-2233; or apply online at washingtonconnection.org. For an Identification/ID card, ask your DSHS caseworker to fill out form 16-029 “Request for Identicard.” Bring documented information to help with your eligibility determination: Your immigration status documentation, Proof of Washington residency, Information on your income, Name of your voluntary resettlement agency (VOLAG)\nProof of identity is needed to pick up EBT cards, WorkFirst support services, bus passes and gas cards.",
    categories: ["Identification Services", "Financial Assistance"],
  },
  {
    name: "Department of Social and Health Services, North Seattle",
    website: "http://dshs.wa.gov",
    phone: "(877) 501-2233",
    address: "9600 College Way N",
    hours: "Mon. - Fri., 8:30 a.m. – 5 p.m.",
    description:
      "DSHS provides public benefits to low-income people for food, cash, medical insurance, housing assistance, child support, vocational rehabilitation, adult care, and disability support. Apply in person, or call Customer Service to apply (877) 501-2233; or apply online at washingtonconnection.org. For an Identification/ID card, ask your DSHS caseworker to fill out form 16-029 “Request for Identicard.” Bring documented information to help with your eligibility determination: Your immigration status documentation, Proof of Washington residency, Information on your income, Name of your voluntary resettlement agency (VOLAG)",
    categories: ["Financial Assistance", "Identification Services"],
  },
  {
    name: "Department of Social and Health Services, South Seattle",
    website: "http://dshs.wa.gov",
    phone: "(877) 501-2233",
    address: "3600 S Graham St.",
    hours: "Mon. - Fri., 8 a.m. – 5 p.m.",
    description:
      "DSHS provides public benefits to low-income people for food, cash, medical insurance, housing assistance, child support, vocational rehabilitation, adult care, and disability support. Apply in person, or call Customer Service to apply (877) 501-2233; or apply online at washingtonconnection.org. For an Identification/ID card, ask your DSHS caseworker to fill out form 16-029 “Request for Identicard.” Bring documented information to help with your eligibility determination: Your immigration status documentation, Proof of Washington residency, Information on your income, Name of your voluntary resettlement agency (VOLAG)",
    categories: ["Financial Assistance", "Identification Services"],
  },
  {
    name: "Department of Veteran Affairs Community Resource and Referral Center",
    website: "http://pugetsound.va.gov",
    phone: "(206) 764-5149",
    address: "305 S Lucille St. No. 103",
    hours: "Mon. - Fri., 8:30 a.m. - 4:30 p.m.",
    description:
      "Provides referrals to resources for healthcare, housing, and more for U.S. military veterans. May provide short-term case management as needed and resource information outside of veteran specific resources.",
    categories: ["Veteran Services"],
  },
  {
    name: "DESC Crisis Response Services",
    website: "http://desc.org/what-we-do/crisis-response",
    hours: "24/7",
    description:
      "DESC Crisis Response Services only accept eligible individuals in behavioral crisis who are referred by Designated Crisis Responders (DCR), Crisis Connections (call the 24-Hr Crisis Line at 866-427-4747), 988, police and fire.",
    categories: [
      "Housing Services",
      "Shelters",
      "Drug and Alcohol Services",
      "Mental Health Services",
    ],
    phone: undefined,
  },
  {
    name: "DESC Lew Middleton Drop-In Center",
    website:
      "https://www.desc.org/what-we-do/health-services/lew-middleton-drop-in-center/",
    phone: "(206) 464-6454",
    address: "216 James St.",
    hours: "Mon.–Fri.: 9:30 a.m.–1 p.m.; by appointment until 5 p.m.",
    description:
      "Open to all DESC clients that are enrolled in a Mental Health or Clinical program. Provides warm breakfasts, access to hygiene services, rest, basic first aid, peer counselors, support groups, engagement activities, volunteer opportunities, and monthly outings.",
    categories: ["Mental Health Services", "Day Centers"],
  },
  {
    name: "DESC Permanent Supportive Housing",
    website: "http://desc.org/what-we-do/survival-services",
    phone: "(206) 464-1570",
    address: "515 3rd Ave.",
    hours: "Mon.—Fri.: 9 a.m.—5 p.m.",
    description:
      "Provides low-barrier, long-term housing enriched with robust support services designed to meet the needs of the most vulnerable members of our community who have experience homelessness, substance use disorders, and serious mental illness. Tenants cannot apply directly to DESC housing and must contact a Coordinated Entry for All Regional Access Point to be enrolled.",
    categories: ["Housing Services", "Shelters"],
  },
  {
    name: "DESC Shelters",
    website: "http://desc.org/what-we-do/survival-services/",
    phone:
      "Navigation Center: (206) 322-1763; Kerner-Scott House: (206) 621-7027",
    address:
      "Navigation Center: 606 12th Ave. S; Kerner-Scott House (women only): 510 Minor Ave. N",
    hours: "24/7",
    description:
      "Operates Navigation Center, a low-barrier, service-enriched shelter targeting high-needs adults experiencing homelessness who are living in encampments, and who have acute behavioral health issues that may prevent them from staying in regular congregate shelters. Referrals to the Navigation Center come from HOPE Team; Kerner Scott requires referral. No walk-ins.",
    categories: ["Shelters"],
  },
  {
    name: "DESC, The Clinic at Hobson Place",
    website:
      "http://desc.org/what-we-do/health-services/the-clinic-at-hobson-place/",
    phone: "(206) 441-3043",
    address: "2120 S. Plum St.",
    hours: "Mon.–Fri.: 8:30 a.m.–4:30 p.m.",
    description:
      "Provides physical and behavioral health services specifically designed to meet the complex needs of people with disabilities who have experienced homelessness. Offers scheduled appointments and limited same-day walk-ins. Services include diagnosis and treatment for acute and chronic illnesses; preventive care such as routine check-ups, health risk assessments, immunizations and screenings; diet and nutrition counseling, medication-assisted treatment for opioid use disorder, and coordination of care with specialists. Masks encouraged.",
    categories: ["General Health Services", "Mental Health Services"],
  },
  {
    name: "Des Moines Area Food Bank",
    website: "http://myfoodbank.org",
    phone: "(206) 878-2660",
    address:
      "22225 Ninth Ave. S, United Methodist Church (lower level)\nDes Moines, WA",
    hours:
      "Full pantry service: Mon., Wed., Fri., 9 – 11:45 a.m.; Third Tue., 6 – 8 p.m.  \nProduce and Bread room: Mon. – Fri., 9 a.m. – 2:30 p.m.",
    description:
      "Food pantry and commodities. May visit food pantry once per month for full pantry plus additional visits to the produce and bread rooms. Verify addresses served on website. Visit in person. No fees. Summer meal program for kids, check website for information.",
    categories: ["Food Assistance"],
  },
  {
    name: "Des Moines, Normandy Park Senior Activity Center",
    website: "http://desmoineswa.gov/cms/one.aspx?pageId=17490998",
    phone: "(206) 878-1642",
    address: "2045 S 216th St.\nDes Moines",
    hours:
      "Office: Mon. – Thurs., 9 a.m. – 3 p.m.; Hot lunch: Mon. – Thurs., noon – 12:30 p.m.; Call for other programs and services.",
    description:
      "Wide range of services including lunch, Meals on Wheels, blood pressure checks, Tai Chi, enhanced fitness, and watercolor. Social workers are available by appointment. Serves adults 50 and older. Special lunch on Wednesdays for adults who speak Spanish.  Most services are free, call for details, (206) 878-1642.",
    categories: ["Senior Services"],
  },
  {
    name: "Digital Equity Program - Seattle Information Technology (Seattle IT)",
    website: "http://seattle.gov/tech",
    phone: "(206) 684-8498\ndigitalequity@seattle.gov",
    address: "700 5th Ave., No. 2700",
    hours: "Mon. – Fri., 9 a.m. – 5 p.m.",
    description:
      "Provides help with low-cost internet options, cable customer assistance, and referral to community computer and training services. The priority strategic areas of the digital equity work are: skills training; connectivity; devices & technical support.",
    categories: ["Financial Assistance"],
  },
  {
    name: "Disability Empowerment Center",
    website: "http://disabilityempowerment.org",
    phone: "(866) 545-7055\nInfo@disabilityempowerment.org",
    address: "1401 East Jefferson St., No. 506",
    hours: "Mon.—Fri.: 9 a.m.—4:30 p.m.",
    description:
      "Free individualized services for people with disabilities. One-to-one skills training, peer support groups, resources, referrals and advocacy training. Locations in Seattle, Redmond and Auburn. Serves people ages 14+ of all backgrounds in King County with all types of disabilities, including physical, intellectual, sensory, neurological and other disabilities.",
    categories: [
      "Transportation Assistance",
      "Employment and Training Services",
      "Disability Services",
    ],
  },
  {
    name: "Disabled American Veterans Network",
    website: "http://dav.org/veterans/i-need-a-ride",
    phone: "(206) 341-8267",
    address: "915 2nd Ave., No. 1040",
    hours:
      "Mon., Tues., Wed., Fri., 8 a.m. – 3 p.m.; Thurs., 8 – 11:30 a.m.; closed on Federal Holidays",
    description:
      "Disabled American Veterans Network aims to provide a lifetime of support to veterans of all generations, their families and their survivors at no cost through services such as VA benefits help, VA medical transportation (appointments required one week in advance, can bring an escort or service dog with a doctor's note, not wheelchair accessible), employment and entrepreneurship, and transition services.",
    categories: [
      "Veteran Services",
      "Disability Services",
      "Transportation Assistance",
    ],
  },
  {
    name: "Discount Smart Phones - Lifeline Program",
    website:
      "https://www.fcc.gov/general/lifeline-program-low-income-consumers",
    phone: "(800) 234-9473\nemail: LifelineSupport@usac.org",
    description:
      "Lifeline Discount Smart Phone Programs. Lifeline is a government benefit program that provides monthly telephone service discounts for eligible consumers in all of Washington State living on low incomes, helping create access to the opportunities and security that phone service affords - including being able to connect to jobs, housing, family and 9-1-1. Website lists information on phone companies that participate in this program, ID requirements, and income eligibility.",
    categories: ["Financial Assistance"],
  },
  {
    name: "Dispute Resolution Center",
    website: "http://kcdrc.org",
    phone: "To leave a message, call (206) 443-9603\ndrcinfo@kcdrc.org",
    address: "No physical address",
    description:
      "KCDRC is a nonprofit that provides low-cost or free conflict resolution services in King County. We help settle problems between landlord-tenant, family members, neighbor/community and businesses. We also provide free training with our new Conflict Resolution for Everyone (CoRE) to help you develop the skills to better solve conflicts before they get out of hand.",
    categories: ["Housing Services", "Legal Services"],
  },
  {
    name: "Division of Vocational Rehabilitation, Central Seattle",
    website: "http://dshs.wa.gov/location/dshs-dvr-centralseattle",
    phone: "(206) 773-7100",
    address: "1200 12th Ave. S, No. 730",
    hours: "Mon.–Fri.: 8 a.m.–5 p.m.",
    description:
      "Services include vocational rehabilitation counseling, guidance and assessment services, assistive technology and independent living services, job-related services, and more for people with disabilities who seek employment services.",
    categories: ["Employment and Training Services", "Disability Services"],
  },
  {
    name: "Domestic Violence Hotline",
    website: "http://thehotline.org",
    phone: "(800) 799-7233",
    hours: "24 hours a day, 7 days a week",
    description:
      'Hotline to talk confidentially with someone if you are experiencing domestic violence, seeking resources or information, or questioning unhealthy aspects of a romantic partner relationship. Call the hotline, use the chat feature on website, or text "START" to 88788 to connect with an advocate, interpretation available.',
    categories: ["Survivor Support Services", "Emergency and Crisis Lines"],
  },
  {
    name: "Doney Coe Pet Clinic",
    website: "http://doneycoe.org/clinic-information-and-services",
    address: "1101 Airport Way S",
    hours:
      "Wed. and Thurs.: 9:30 a.m. – 2:30 p.m. \n2nd and 4th Sat. of the month: 9:30 a.m. – 12:30 p.m.",
    description:
      "Offers no-cost veterinary care to individuals/families in Washington that are unhoused or those with income that does not exceed twice the 2023 Federal Poverty Limit f(see website for eligibility). Services are first come, first served. Bring one of these to your first visit to our clinic: EBT, bank statement, SSI/SSDI documents, subsidized housing documents, most recent paycheck stub, or other reasonably accessible proof of income.",
    categories: ["Pets and Service Animals"],
  },
  {
    name: "Dress for Success Seattle",
    website: "http://dfsseattle.org",
    phone: "(206) 461-4472; office@dfsseattle.org",
    address: "600 Pine St., No. 310",
    hours: "Tues. – Thurs., 11 a.m. – 4 p.m. by appointment only",
    description:
      "Services include Employment Retention Programs, Career Center, one-on-one Career Coaching, and Career Wardrobe. Must have a referral for Career Wardrobe. See website, or phone (206) 461-4472 for information on getting a referral. Email office@dfsseattle.org.",
    categories: ["Clothing Assistance", "Employment and Training Services"],
  },
  {
    name: "DVR Division of Vocational Rehabilitation, North Seattle",
    website: "http://dshs.wa.gov/location/dshs-dvr-northseattle",
    phone: "(206) 440-2230",
    address: "9600 College Way N",
    hours: "Mon. – Fri., 8:30 a.m. – 5 p.m.",
    description:
      "DSHS Department of Vocational Rehabilitation strives to provide the best services and resources possible to customers helping them keep, find, and maintain employment. Services include vocational rehabilitation counseling, guidance and assessment Services, assistive technology and independent living services, job-related services, and more for people with disabilities who seek employment services.",
    categories: ["Employment and Training Services", "Disability Services"],
  },
  {
    name: "Early Childhood Education and Assistance Program",
    website:
      "http://seattle.gov/education/for-parents/child-care-and-preschool/early-childhood-education-and-assistance-program",
    phone: "(206) 684-0296",
    address: "700 Fifth Ave., No. 1700",
    hours: "Mon.–Fri.: 9 a.m.–5 p.m.",
    description:
      "Offers part-day and full-day, high-quality, culturally and linguistically appropriate preschool services for eligible 3- and 4-year-olds and their families.",
    categories: [
      "Family and Maternity Services",
      "Services For People of Color",
    ],
  },
  {
    name: "East African Community Services",
    website: "http://eastafricancs.org",
    phone: "(206) 721-1119",
    address: "7050 32nd Ave. S, Youth Building",
    hours: "Mon.–Fri.: 10 a.m.–6 p.m.",
    description:
      "Offers wrap around services for East African refugee and immigrant families. Provides Pre—K to 12th Grade After school and summer programs. Provides innovative STEM mentorship through the MathCode+Robotics and Strong Girls Powerful Leaders. Provides Parent Leadership Training (PILTI) and Advocacy and U.S. Citizenship Classes. Engagement and family resourcing provides rental assistance, diapers and culturally appropriate food. Diversion and reentry support for youth returning to community from incarceration. No fees.",
    categories: [
      "Services For People of Color",
      "Immigrant and Refugee Services",
    ],
  },
  {
    name: "Edible Hope Kitchen",
    website: "http://stlukesseattle.org/edible-hope",
    phone: "(206) 784-3119",
    address: "5710 22nd Ave. NW, lower level",
    hours: "Mon.–Fri.: 8–10 a.m.",
    description: "Weekday morning free hot breakfast",
    categories: ["Food Assistance"],
  },
  {
    name: "El Centro de la Raza",
    website: "http://elcentrodelaraza.org",
    phone: "(206) 957-4634; Veterans Specialist: (360) 986-7046",
    address: "2524 16th Ave. S",
    description:
      "Multi-service center offers ESL classes, a bilingual legal clinic, life skills and job readiness education, child and youth programs, a bilingual child care/preschool program, maternity services, crisis advocacy and homeless prevention. Services for veterans, especially women veterans and veterans of color. Serves veterans of all discharge types. Operates a food pantry, serves everyone, provides a community a meal for adults over 60. Benefits navigator available on site limited hours each week.",
    categories: [
      "Employment and Training Services",
      "Veteran Services",
      "Legal Services",
      "Services For People of Color",
      "Family and Maternity Services",
      "Immigrant and Refugee Services",
      "Food Assistance",
    ],
  },
  {
    name: "Elizabeth Gregory Home",
    website: "http://eghseattle.org",
    phone: "(206) 729-0262",
    address: "University Lutheran Church\n1604 NE 50th St.",
    hours: "Day Center hours: Sun.–Fri.: 9 a.m.–4:30 p.m.",
    description:
      "Day center with light case management services for anyone 18 and older who identifies as a woman. Showers, laundry, sleeping room, computer access and mail program. Breakfast, lunch, food to take with you. UDSM (University District Street Medicine.) Weekly clothing giveaway. Call to request interpreter services. No fees. Transitional housing and case management for sober single women 18 and older who are experiencing homelessness. Anyone who identifies as a woman is welcome. Openings are limited.  Visit day center to apply.",
    categories: ["Housing Services", "Day Centers"],
  },
  {
    name: "Entre Hermanos",
    website: "http://entrehermanos.org",
    phone: "(206) 322-7700",
    address: "1621 S Jackson St., No. 202",
    hours: "Free HIV and STI testing: Mon.–Fri.: 10 a.m.–5 p.m.",
    description:
      "Promotes the health and well-being of the Latino LGBTQ community in a culturally appropriate environment. Services include support group, and social workers provide referrals; direct legal services, asylum, immigration relief, for those detained. HIV/AIDS prevention, care, and support; free HIV testing, Latino PrEP Navigator who can help you access PrEP (Pre-Exposure Prophylaxis), and condom distribution. Providing Advocacy and Civic Engagement, and registering new voters.",
    categories: [
      "HIV/AIDS Services",
      "Services For People of Color",
      "Legal Services",
      "Immigrant and Refugee Services",
      "LGBTQIA+ Services",
    ],
  },
  {
    name: "Evergreen Council on Problem Gambling",
    website: "http://evergreencpg.org",
    phone: "(800) 547-6133",
    address: "1821 Fourth Ave. E, Olympia",
    hours: "24/7",
    description:
      "Programs and services are available for Problem Gamblers, family members, friends, and even employers to address the harm that may result from a gambling problem. Outpatient and residential programs available.",
    categories: ["Emergency and Crisis Lines", "Problem Gambling Resources"],
  },
  {
    name: "Evergreen Treatment Services",
    website: "http://www.evergreentx.org/seattle-clinic",
    phone: "(425) 264-0750",
    address: "1412 SW 43rd St., No. 140, Renton",
    hours:
      "Renton Clinic dosing hours: Mon.–Sat.: 5:30 a.m.—2:30 p.m.; Office hours: Mon.—Fri.: 5:30 a.m.—1:30 p.m.",
    description:
      "The Seattle Clinic closed due to flooding. All dosing has been moved to Renton Clinic. Offers medication assisted treatment (MAT) for opioid use disorders to patients in King County and surrounding areas. Services combine the daily dispensing of methadone or buprenorphine with services like counseling and engagement with a medical provider.",
    categories: ["Drug and Alcohol Services"],
  },
  {
    name: "Express Credit Union",
    website: "http://expresscu.org",
    phone: "(206) 622-1850;\n expresscu@expresscu.org",
    address: "1930 6th Ave. S, No. 104\nFree parking, close to transit",
    hours: "Mon. - Fri., 9 a.m. - 5 p.m.",
    description:
      "Affordable financial services, bank accounts and fair priced loan products for WA state residents. Provides fee free bank accounts, $5 minimum balance, with no monthly maintenance fees. Provides just in time financial coaching, and will work with you on your financial journey. Apply online, call or come into our office to open an account. Unique loan products for express members. Small dollar emergency loans, auto loans and auto loan refinancing. Bilingual staff, English and Spanish. Federally insured by NCUA.",
    categories: ["Financial Assistance"],
  },
  {
    name: "Families of Color Seattle (FOCS)",
    website: "http://focseattle.org/parent-groups-register",
    phone: "(206) 317-4642",
    address: "3703 S Edmunds St., No. 132",
    hours: "Mon.–Fri.: 9 a.m.–5 p.m.",
    description:
      "Connects families, caregivers, and children of color through peer-led parent support groups; spaces to share culture, skills, and resources; and racial justice education and advocacy.",
    categories: [
      "Family and Maternity Services",
      "Services For People of Color",
    ],
  },
  {
    name: "Family Resource Center",
    website: "http://familyworksseattle.org",
    phone: "(206) 647-1790",
    address: "Food Bank: 1501 N 45th St.\nResource Center: 1005 NE 67th St.",
    hours:
      "Wed., 2 p.m. – 5 p.m.;  Fri., 11 a.m. – 1 p.m.\nother hours by appointment",
    description:
      "Resource center programs and services are free. Kids basics: clothing, books, diapers, toys. Drop in play group for children 0-5, parents or caregivers. Navigation services.",
    categories: ["Family and Maternity Services"],
  },
  {
    name: "FamilyWorks, Greenwood Food Bank",
    website: "http://familyworksseattle.org/food-banks/#hours",
    phone: "(206) 647-1780",
    address: "9501 Greenwood Ave. N",
    hours: "Tues.: 4–6 p.m.; Wed.: 11 a.m.–1 p.m.",
    description:
      "Anyone is welcome to shop at our food banks regardless of zip code or income. Visit in person.",
    categories: ["Food Assistance"],
  },
  {
    name: "FamilyWorks, Wallingford Food Bank",
    website: "http://familyworksseattle.org/food-banks/#hours",
    phone: "(206) 647-1780",
    address: "1501 N 45th St.",
    hours: "Tue.: noon–2 p.m.; Thurs.: 3–6 p.m.; Fri.: 11 a.m.–1 p.m.",
    description:
      "Anyone is welcome to shop at our food banks regardless of zip code or income. Visit in person.",
    categories: ["Food Assistance"],
  },
  {
    name: "FamilyWorks WIC",
    phone: "(206) 477-2335; WIC screening by appointment",
    address: "1501 N 45th St.",
    hours: "Call for appointment",
    website: "https://www.familyworksseattle.org/programs/",
    description:
      "Nutrition program, food assistance and referrals for pregnant women and new mothers who are at or below 185 percent of the federal poverty level. Call for an appointment. No fees.",
    categories: ["Food Assistance", "Family and Maternity Services"],
  },
  {
    name: "FareStart",
    website: "http://farestart.org/job-training",
    phone: "(206) 443-1233",
    address: "700 Virginia St.",
    hours: "Mon.–Fri.: 8:30 a.m.—3:30 p.m.",
    description:
      "FareStart offers stipended job training programs for adults 18 and older looking to work in the food industry. The program provides assistance with housing, transportation, wrap around case management services, job placement and more. No fees.",
    categories: ["Employment and Training Services"],
  },
  {
    name: "Federal Public Defender",
    website: "http://waw.fd.org",
    phone: "(206) 553-1100",
    address: "1601 Fifth Ave., No. 700",
    hours: "Mon.–Fri.: 8 a.m.–4:30 p.m.",
    description:
      "Search engine for community resources, and Know Your Rights lists for interacting with police, in schools, and for immigrants, and more.",
    categories: [
      "Immigrant and Refugee Services",
      "Legal Services",
      "Services For People of Color",
    ],
  },
  {
    name: "Filipino Community of Seattle",
    website: "http://filcommsea.org",
    phone: "(206) 722-9372",
    address: "5740 MLK Jr. Way S",
    hours:
      "Food Bank: Mon., Tue., Thu.: 12:30–1 p.m.; Senior Lunch and Food Bank: Mon., Tues., Thurs., 11:45 a.m. – 12:30 p.m.",
    description:
      "Serves Filipino and other communities in Greater Seattle and beyond. Provides culturally appropriate services for educational support and mentorship, social interaction, counseling and support. Lunch program and affordable low-income housing for seniors. Youth programs with families, schools, and BIPOC members of the community.",
    categories: [
      "Food Assistance",
      "Services For People of Color",
      "Senior Services",
      "Immigrant and Refugee Services",
    ],
  },
  {
    name: "First Covenant Church",
    website: "http://firstcovenantseattle.org",
    phone: "(206) 322-7411",
    address: "400 E Pike St.",
    hours:
      "Mon.-Fri., 9 a.m.– 2 p.m. Breakfast Sat., 9 – 10 a.m. Sun., 9 a.m. – 1 p.m.",
    description: "Free full breakfast for all.",
    categories: ["Food Assistance"],
  },
  {
    name: "First Place",
    website: "http://firstplaceschool.org/doreen-cato-early-learning-center",
    phone: "(206) 629-6288",
    address: "172 20th Ave.",
    hours:
      "School: Mon.–Fri.: 9 a.m.–3 p.m.; open until 5 p.m. for after school programs",
    description:
      "Serves children and families with a holistic program of culturally competent educational and support services. Provides housing program, early learning education program, and wraparound services to families. Serves children 3 through 5, from families that are in crisis impacting family stability. Call for enrollment forms. No fees.",
    categories: ["Family and Maternity Services"],
  },
  {
    name: "First United Methodist Church of Seattle",
    website: "http://firstchurchseattle.org/shared-breakfast",
    phone: "(206) 622-7278",
    address: "Fellowship Hall\n180 Denny Way",
    hours: "Sun.: 7:30–9 a.m.",
    description:
      "Community breakfast served seated at tables. All welcome. Visit in person. No fees.",
    categories: ["Food Assistance"],
  },
  {
    name: "Freedom Project",
    website: "http://freedomprojectwa.org/credible-allies-program",
    phone: "Office (206) 325-5678.\nEmail: reentry@freedomprojectwa.org",
    address: "227 Wells Ave S\nRenton, WA",
    hours:
      "Tues., Thurs.,: 10 a.m.–5 p.m.\nOffice hours vary; call before visiting in person",
    description:
      "Re-entry program: Get help finding resources like clothing, transportation, housing – from someone with lived experience who understands the barriers and needs. Walks with people as they transition from prison and offers much-needed community support every step of the way. Provides peer specialists and community circles to help deal with issues that individuals are faced with when they return. Personal one-on-one support from someone who understands reentry from lived experience. Email: reentry@freedomprojectwa.org",
    categories: ["Re-entry Assistance"],
  },
  {
    name: "Friends of Youth",
    website: "http://friendsofyouth.org/services",
    phone: "(425) 869-6490; Shelter for minors under 18: (206) 236-5437",
    address: "Ages 18-24: 12735 Willows Road NE, Kirkland",
    hours: "Main office: Mon.–Fri.: 9 a.m.–5 p.m.; shelter: 24/7",
    description:
      "Provides a comprehensive range of therapeutic services for youth, young adults and families from all backgrounds. Providing basic needs resources for young adults including shelter, food, showers, laundry, clothing and hygiene materials. Access to case management, behavioral health and employment services. Email: info@friendsofyouth.org",
    categories: [
      "Day Centers",
      "Immigrant and Refugee Services",
      "Services For People of Color",
      "Shelters",
      "Housing Services",
      "Survivor Support Services",
      "LGBTQIA+ Services",
    ],
  },
  {
    name: "Full Life Care",
    website: "http://fulllifecare.org",
    phone: "(206) 528-5315",
    hours: "No drop in hours, appointments made after admittance by phone.",
    description:
      "Programs include Adult Day Health Care, personalized help from Care Teams, Elder Friends, Health Home Services, personal Home Care Aides for in home caregiver services, Housing Stabilization support. Support offered to adults of all ages regardless of income. Many funding aid options are available to provide a range of services and supports. Required documents depend on program.",
    categories: ["Senior Services", "Disability Services"],
  },
  {
    name: "Gamblers Anonymous",
    website: "http://gamblersanonymous.org",
    phone: "(855) 222-5542",
    address: "Call the hotline for information on meeting locations and times.",
    hours: "24/7",
    description:
      "Gamblers anonymous is a 12 step program. Hotline and support group meetings to address problem gambling.",
    categories: ["Problem Gambling Resources", "Emergency and Crisis Lines"],
  },
  {
    name: "GenPRIDE (Generations Aging with Pride)",
    website: "http://genprideseattle.org",
    phone: "(206) 393-3400",
    address: "1521 Broadway, No. A",
    hours: "Mon., Tue., Thurs.: 10 a.m.—3 p.m.",
    description:
      "Programs and services that enhance belonging and support, eliminate discrimination, and honor the lives of older members of the LGBTQ+ community. Provides tailored resources, consultation information, referral services, social programs, fitness, exercise classes, writers workshop, movies and discussions, community events, more. Offers free staff trainings on LGBTQ+ cultural awareness for housing and healthcare service providers including businesses. Hot lunch program twice a week.",
    categories: ["Senior Services", "LGBTQIA+ Services"],
  },
  {
    name: "Gifts of Hope",
    website: "http://givinggiftsofhope.org/about",
    phone: "(206) 486-7171",
    hours: "Mon.–Fri.: 9 a.m.–5 p.m.",
    description:
      "Provices basic needs, such as food and clothing, as well as haircuts, empowerment classes, cooking and craft classes, holiday support and resources for housing, medical care and referrals for counseling. Email for more information: info@givinggiftsofhope.org",
    categories: ["Family and Maternity Services"],
  },
  {
    name: "Goodwill, Job Training and Education Center",
    website: "http://evergreengoodwill.org/job-training-and-education",
    phone: "(206) 860-5791",
    address: "700 Dearborn Pl. S",
    hours: "Mon.–Thu.: 9 a.m.–4 p.m.; Fri. by appointment",
    description:
      "Support services, work readiness classes and vocational training in retail, customer service and warehouse logistics. Call for more information. No fees.",
    categories: ["Employment and Training Services"],
  },
  {
    name: "Greenwood Animal Hospital",
    website: "http://mygreenwoodvet.com",
    phone: "(206) 528-3838",
    address: "10000 Aurora Ave. N, No. 8",
    hours: "Mon. – Fri., 9 a.m. - 6 p.m no walk ins",
    description:
      "Greenwood Animal Hospital is your neighborhood Seattle veterinarian where pets can receive state of the art care.  Call or email us if you would like to inquire about our services or prices being offered vet@mygreenwoodvet.com.",
    categories: ["Pets and Service Animals"],
  },
  {
    name: "Harborview Abuse and Trauma Center (HATC)",
    website:
      "http://uwmedicine.org/locations/sexual-assault-and-traumatic-stress-center-harborview",
    phone: "(206) 744-1600",
    address: "401 Broadway, No. 2075",
    hours: "Mon. - Fri. 8:30 a.m. - 5 p.m.",
    description:
      "Medical care, psychosocial evaluations and counseling for child sexual assault victims or adult victims of rape. After hours or within 120 hours of an assault, call or visit Harborview Emergency Room and ask for a social worker. If during business hours, call the Center for Sexual Assault for an appointment. Counseling available for any traumatic stress that causes fear or sense of threat. Call for more information. Accepts Apple Health (Medicaid), victims compensation, private insurance, and Medicare. Services provided regardless of ability to pay.",
    categories: ["Survivor Support Services"],
  },
  {
    name: "Harborview Medical Center",
    website: "http://uwmedicine.org/locations",
    phone: "(206) 744-9600",
    address: "325 9th Ave.",
    hours: "24/7",
    description:
      "DUI evaluations, outpatient, intensive outpatient, treatment for co-occurring substance use disorder and mental health disorders and opiate replacement therapy serving everyone including patients with co-morbid medical issues. Can write prescriptions for Suboxone therapy. Agency provides Department of Behavioral Health and Recovery/DBHR-certified service(s). Initial assessment is free. Sliding scale fees. Accepts Apple Health (Medicaid), Medicare and other eligible commercial or managed care plans. Accepts private pay.",
    categories: [
      "Mental Health Services",
      "Drug and Alcohol Services",
      "General Health Services",
    ],
  },
  {
    name: "Harborview Medical Center Madison Clinic",
    website: "http://uwmedicine.org/locations/madison-harborview",
    phone: "(206) 744-5100; care Coordinator: (206) 744-5155",
    address: "325 9th Ave., 2nd floor, West Clinic",
    hours: "Mon., Wed., Thurs., Fri.: 8 a.m.—5 p.m., Tues.: 9 a.m.—5 p.m.",
    description:
      "Medical care and social services, including PrEP. Serves those needing an HIV/AIDS expert. Call for an appointment. Accepts most private insurance, Medicare and Apple Health (Medicaid). No one will be turned away due to inability to pay.",
    categories: ["HIV/AIDS Services", "General Health Services"],
  },
  {
    name: "Harborview Medical Respite",
    website:
      "http://uwmedicine.org/provider-resource/refer-patient/medical-respite",
    phone: "(206) 744-5200",
    address: "800 Jefferson St.",
    hours: "24/7",
    description:
      "Short-term respite beds serving homeless adults who are too sick to be in a regular shelter and are leaving any hospital, clinic or emergency department. Patient must have an acute medical problem that requires daily nursing care. Social worker or health care provider must contact screener for an intake.",
    categories: ["General Health Services"],
  },
  {
    name: "Harborview, Office Based Opioid Treatment",
    website: "https://healthonline.washington.edu/record/pe1620",
    phone: "(206) 744-2332",
    address: "Harborview Medical Center \n325 Ninth Ave.",
    hours: "Tue. – Fri., 9 a.m. – 3 p.m. Walk in ER 24/7",
    description:
      "Potential patients can expect a phone intake (10 – 15 minutes) to be completed, and an appointment to be made for in person evaluation within three business days. All ages are served, including adolescents.",
    categories: ["Drug and Alcohol Services"],
  },
  {
    name: "HealthPoint Midway",
    website: "http://healthpointchc.org/find-clinics/midway",
    phone: "Medical: (206) 870-3590\nDental: (206) 870-3600",
    address: "26401 Pacific Hwy. S, No. 201, Des Moines",
    hours:
      "Medical: Mon.–Wed.: 8 a.m.–7 p.m.; Thu.–Fri.: 8 a.m.–5 p.m.; Sat.: 8 a.m.–1 p.m.\nDental:  Mon.–Fri.: 7:15 a.m.–5:30 p.m.; Sat.: 8 a.m.–1 p.m.",
    description:
      "Medical and dental care serving children and adults. Call for an appointment or visit drop-in clinic. Accepts most insurance plans, Apple Health (Medicaid). Sliding scale fees. Please bring photo ID and insurance card.",
    categories: ["Dental and Vision Services"],
  },
  {
    name: "HealthPoint, TAF@Saghalie",
    website: "http://healthpointchc.org/find-clinics/tafsaghalie",
    phone: "253-804-3589",
    address: "33914 19th Ave. SW, Federal Way",
    hours: "Mon.–Thu.: 7 a.m.–4 p.m.; Fri. 7–11 a.m.",
    description:
      "Primary care, mental health counseling, physical and annual exams, sports physicals, immunizations, medication management and refills, nutrition education and counseling, specialty referrals, diagnostics testing, and injury care. You will not have to pay out of pocket for your care. Our staff can help you apply for insurance or other programs that will cover any associated costs.",
    categories: ["General Health Services"],
  },
  {
    name: "HealthPoint, Tukwila",
    website: "http://healthpointchc.org/find-clinics/tukwila",
    phone: "Medical: (206) 439-3289\nDental: (206) 839-3600",
    address: "13030 Military Rd S, No. 210, Tukwila",
    hours:
      "Dental: Mon.–Fri.: 7:15 a.m.–5:30 p.m.; Sat.: 7:45 a.m.–12:15 p.m.\nMedical: Mon., Wed.: 8 a.m–7 p.m.; Tues., Thu., Fri.: 8 a.m.–5 p.m.; Sat.: 7:45 a.m.–12:15 p.m.",
    description:
      "Dental care serving children and adults. Call for an appointment or visit drop-in clinic. Accepts most insurance plans, Medicare and Apple Health (Medicaid). Sliding scale fees.",
    categories: ["Dental and Vision Services", "General Health Services"],
  },
  {
    name: "HealthPoint, Tyee Campus School-Based Health Center",
    website: "https://www.healthpointchc.org/find-clinics/tyee-campus",
    phone: "(206) 277-7210",
    address: "4424 S 188th St., Building 900, SeaTac",
    hours: "Currently closed due to construction; call for more information",
    description:
      "Behavioral health, family planning, immunizations, nutrition, physical and annual exams, sports physicals, and teen services. Interpretation services available. You will not have to pay out of pocket for your care. Our staff can help you apply for insurance or other programs that will cover any associated costs.",
    categories: ["General Health Services"],
  },
  {
    name: "Helping Link",
    website: "http://helpinglink.org/program-services",
    phone: "(206) 568-5160",
    address: "1032 S Jackson St., No. C",
    hours: "By appointment only",
    description:
      "Empowers Vietnamese American social adjustment, family stability, and self-sufficiency, offers Citizenship Classes, ESL classes, computer and iPad training classes, information and referrals. Serves the Vietnamese community. Call to confirm hours. Register in person. No fees.",
    categories: [
      "Immigrant and Refugee Services",
      "Services For People of Color",
    ],
  },
  {
    name: "Hepatitis Education Project",
    website: "http://hep.org",
    phone: "(206) 732-0311",
    address: "1621 S Jackson St., No. 20",
    hours:
      "Testing: Mon. - Thurs., 12:30 p.m. – 4:30 p.m.\nSyringe Services Program: Mon - Thurs., 12:30 p.m. - 5:30 p.m.\nHep C Care Coordination:  Mon - Thurs., 12:30 p.m. - 5:30 p.m.\nBupe and Suboxone Clinic: Tues. - Thurs., 1 - 4:30 p.m. (3:30pm new intake cut off)",
    description:
      "Viral hepatitis testing, care coordination, and on-site hep C treatment; Syringe Services Program with safer injection and smoking supplies, naloxone/Narcan, fentanyl testing strips, and more harm reduction supplies; low-barrier Bupe/Suboxone clinic. Everyone welcome. Visit in person, no appointments needed. No fees for services.",
    categories: ["Drug and Alcohol Services"],
  },
  {
    name: "Highline Area Food Bank",
    website: "http://highlineareafoodbank.org/need-help",
    phone: "(206) 433-9900",
    address: "18300 Fourth Ave. S, Manhattan Community Ctr., Burien",
    hours:
      "Tues.: noon–2:30 p.m.; Thu.: 10 a.m.–12:30 p.m.; 2nd Tue.: 5:30–7 p.m.",
    description:
      "Food pantry that clients may visit once per month. Serves residents of the Highline area. Visit in person or call for information about service area.No fees.",
    categories: ["Food Assistance"],
  },
  {
    name: "Homeless Shelter Directory",
    website: "http://homelessshelterdirectory.org/city/wa-seattle",
    phone: "Online database",
    description:
      "Online database with updated listing of Seattle area homeless shelters for women, men, families, youth and seniors. Includes shelters in the surrounding area. Shows description, phone number, and link to address and and organization websites. Access the database through the website address.",
    categories: ["Shelters"],
  },
  {
    name: "Hopelink - Redmond Market and Service Center",
    website: "http://hopelink.org/location/redmond-market-and-service-center",
    phone: "(425) 869-6000",
    address: "8990 154th Ave. NE\nRedmond, WA",
    hours: "Mon. – Thurs. 10 a.m. – 4 p.m.",
    description:
      "Free food from Hopelink Markets also located in Bellevue, Kirland/Northshore, Shoreline, Sno-Valley. At the Redmond location you can show up and get food the same day, once inside, you will be able to select your own nutritious, fresh and non-perishable food and personal care items. Redmond zip codes are 98052, 98053, 98073, 98074, no identification/ID, no documents necessary, just fill out a form with a name.",
    categories: ["Food Assistance", "Shelters", "Financial Assistance"],
  },
  {
    name: "Hopelink - Shoreline",
    website: "http://hopelink.org/location/shoreline-market-and-service-center",
    phone: "(206) 440-7300",
    address: "17837 Aurora Ave. N\nShoreline, WA",
    hours: "Front Desk: Mon. – Thurs., 10 a.m. – 4 p.m.",
    description:
      "Services available: food bank, emergency financial assistance, English for work classes, employment services, family development, energy assistance program and financial capabilities program. Call for more information. Grocery style food bank model. Grocery quantity dependent on household size. Two food bank visits per month, emergency food bags available two times per week. Serves those at or below 185 percent of the Federal Poverty Level. Serves Lake Forest Park and Shoreline residents only. Call for appointment. No fees.",
    categories: [
      "Financial Assistance",
      "Food Assistance",
      "Employment and Training Services",
    ],
  },
  {
    name: "Horn of Africa Services",
    website: "http://hoas.org",
    phone: "(206) 760-0550",
    address: "5303 Rainier Ave. S, No. D",
    hours: "Mon.–Fri.: 9:30 a.m.–5 p.m.",
    description:
      "Serves the East African immigrant and refugee community. Social services, educational assistance, youth programs, and economic empowerment to address the needs of the community. Offers citizenship classes, housing assistance, job search assistance, benefits assistance, more. After school programs available for kindergarten through 12th grade. Call main office or visit in person to complete an application. No fees.",
    categories: [
      "Services For People of Color",
      "Services For People of Color",
      "Financial Assistance",
      "Employment and Training Services",
      "Immigrant and Refugee Services",
      "Housing Services",
    ],
  },
  {
    name: "Hospitality House",
    website: "http://hospitalityhousesouthking.org",
    phone: "(206) 242-1860",
    address: "1419 SW 150th St., Burien",
    hours: "Phone screening: 7 days a week 9 a.m.–7 p.m.",
    description:
      "Dormitory-style shelter with stays up to three months, serving single, homeless woman-identifying individuals 18 and older. Can accept clients if at least six months since domestic violence situation was active. Cannot serve clients who have severe mental illness, current substance abuse problems, have violent criminal convictions, or are at least 6-months pregnant. Does not accept pets. Call for screening interview. No fees. Not a drop in shelter; phone screen is required for shelter.",
    categories: ["Shelters"],
  },
  {
    name: "Housing Justice Project",
    website: "http://housingjusticeproject.org",
    phone: "(206) 580-0762",
    address: "King County Courthouse, 516 Third Ave., Room-W314",
    hours: "Mon.–Fri. 9 a.m.–noon",
    description:
      "Providing free legal advice (legal consultations) for low-income renters with eviction related issues, answering questions about eviction paperwork, negotiating with landlords if you’re a renter facing eviction, representing renters at courthouse eviction hearings (show cause hearings), sharing referral and resource information. Apply in person, online, call (206) 580-0762 to leave a message with staff or email at hjpstaff@kcba.org. Operated through King County Bar Association. For urgent issues please call 2-1-1.",
    categories: ["Legal Services"],
  },
  {
    name: "Housing Search Northwest",
    website: "http://myhousingsearch.com/tenant/WA/index.html?ch=KCHA",
    description:
      "Multilingual website with searchable listings of available low and market rate housing. Serves everyone seeking King County housing. No physical office or phone number.",
    categories: ["Housing Services"],
  },
  {
    name: "Hunger Intervention Program",
    website: "http://hungerintervention.org",
    phone: "(206) 538-6567",
    address:
      "Northgate Community Center: 10510 5th Ave NE, Seattle\nLake City Community Center: 12549 27th Ave NE, Seattle",
    hours:
      "Hot meals at Lake City Community Center: Mon., Wed., Fri., 12:30 – 1:30 p.m.",
    description:
      "Serves hot meals to senior citizens aged 60 years of age and older, but no one is turned away. Offers activities such as yoga, recreational games, and arts and crafts. No ID required. Call or visit website for menu and activity calendar. Suggested donation is $6 for seniors 60 years of age and older, and $12 for all others.",
    categories: ["Senior Services", "Food Assistance"],
  },
  {
    name: "Hyde Shuttle, Sound Generations",
    website:
      "http://soundgenerations.org/our-programs/transportation/hyde-shuttle/",
    phone: "(206) 727-6262",
    address: "2208 Second Ave., No. 100",
    hours: "Mon.-Fri.: 8 a.m.-4:30 p.m.",
    description:
      "Free lift-equipped, door-to-door transportation for people 55+; and also younger persons with disabilities. Must live within one of the neighborhood service areas: Auburn, Burien and Highpoint, Bryn Mawr-Skyway, Kent, Federal Way, Des Moines and Normandy Park, Seattle, Renton, Seatac, Shoreline, Sno Valley, and Tukwila.",
    categories: [
      "Disability Services",
      "Transportation Assistance",
      "Senior Services",
    ],
  },
  {
    name: "IDIC Filipino Senior & Family Services",
    website: "http://idicseniorcenter.org",
    phone: "(206) 587-3735",
    address: "7301 Beacon Ave. S, Seattle",
    hours:
      "Office: Mon. – Fri., 9 a.m. – 5 p.m.; Food Bank: Fri., 1 – 2 p.m.; Hot Meals: Wed., Fri., 11 a.m. – 12:30 p.m.",
    description:
      "Filipino organization that provides advocacy in healthcare and social services to underserved elderly, immigrant and vulnerable families. Helps seniors 50 years of age and older apply for benefits, job training, affordable housing, and interpretation. Assistance with immigration, activities such as games and fitness opportunities, hot meals, and a food bank. Also serves adults with disabilities. No required fees. Suggested that you show photo ID or other proof of King County residence, but not required for services. Call for more information.",
    categories: [
      "Services For People of Color",
      "Immigrant and Refugee Services",
      "Senior Services",
    ],
  },
  {
    name: "IKRON Corporation",
    website: "http://seattle.ikron.org",
    phone: "(425) 242-1713",
    address: "3805 108th Ave. NE, No.204, Bellevue",
    hours: "Mon.–Fri.: 8:30 a.m.–5 p.m.; Sat.: by appointment only",
    description:
      "Outpatient counseling services for mental health and substance use disorder needs. Agency provides Department of Behavioral Health and Recovery/DBHR-certified services. Serves everyone. Accepts Apple Health (Medicaid) only.",
    categories: [
      "Senior Services",
      "LGBTQIA+ Services",
      "Native & Indigenous Services",
      "Services For People of Color",
      "Survivor Support Services",
      "Immigrant and Refugee Services",
      "Drug and Alcohol Services",
      "Veteran Services",
      "Mental Health Services",
    ],
  },
  {
    name: "Immanuel Community Services",
    website: "http://icsseattle.org",
    phone: "(206) 622-1930",
    address: "1215 Thomas St.",
    hours:
      "Food bank: Mon.: 10 a.m.–1 p.m.; Community Lunch: Last Sunday of every month noon–2 p.m.; Hygiene Center: Mon.–Fri.: 8 a.m.–2 p.m.; Laundry: Mon.–Fri.: 8–11:30 a.m.; Showers: Mon.–Fri.: 8 a.m.–1:30 p.m.",
    description:
      "Provides a food bank, community lunch, and a hygiene center with laundry and shower services. Services available to all adults. No children. No fees and no ID requirements of any kind. Sign-up in person on-site. Recovery program shelter available for up to one year for up to 15 men going through recovery, offered in partnership with the Matt Talbot Center.",
    categories: ["Food Assistance", "Hygiene Services"],
  },
  {
    name: "Ingersoll Gender Center",
    website: "http://ingersollgendercenter.org",
    phone: "(206) 849-7859",
    address: "911 E Pike St. No. 221",
    hours: "Mon.-Thu.: noon-6 p.m. or by appointment.",
    description:
      "Offering gender affirming Healthcare Provider Database, Job Board, Rural Resource Guides, Transgender Tenant Rights, Shelter and Housing Guide, and a Guide to Amending your Identity Documents in King County. Peer support groups for people to come together for information and mutual support.",
    categories: ["Identification Services", "LGBTQIA+ Services"],
  },
  {
    name: "Interaction Transition",
    website: "http://interactiontransition.org",
    phone: "Office: (206) 228-4639",
    address: "5300 Fourth Ave. S",
    hours: "Mon.–Fri.: 9 a.m.–4 p.m.",
    description:
      "Assists formerly incarcerated individuals in the reentry process and finding employment in areas such as warehouse, manufacturing, recycling, and auto-work. Must be 18 years of age and able to legally work in the U.S. No fees. Organization does not require ID, but employers likely will. Call or email for more information or to schedule an appointment.",
    categories: ["Employment and Training Services", "Re-entry Assistance"],
  },
  {
    name: "International Community Health Services, 8th Ave. S.",
    website: "http://ichs.com",
    phone:
      "Dental: (206) 788-3757; Vision: (206) 788-3505; Medical Clinic: (206) 788-3700",
    address: "720 Eighth Ave. S\nSeattle",
    hours: "Mon.–Sat., 9 a.m.–5 p.m.",
    description:
      "Culturally and linguistically appropriate health services. Staff is multilingual. Offers dental, vision, primary healthcare, behavioral health and recovery, STD testing and treatment, and family and maternity services. Suboxone treatment available to adults who call to schedule an assessment.  No one is turned away due to inability to pay. Accepts Apple Health (Medicaid), Medicare, sliding scale fees are available. Photo ID and proof of insurance required, if insurance is to be billed. Call for appointment, same-day appointments available.",
    categories: [
      "Immigrant and Refugee Services",
      "Drug and Alcohol Services",
      "Services For People of Color",
      "General Health Services",
      "Mental Health Services",
      "Dental and Vision Services",
      "Family and Maternity Services",
    ],
  },
  {
    name: "International Community Health Services, Shoreline",
    website: "http://ichs.com",
    phone: "(206) 533-2600",
    address: "16549 Aurora Ave. N, Shoreline",
    hours:
      "Medical: Mon.–Sat.: 8 a.m.–5 p.m.; dental: Mon.–Fri.: 8 am-6 pm; every 3rd Sat.: 8 am-6 pm",
    description:
      "Culturally and linguistically appropriate health services. Staff is multilingual. Offers dental, vision, primary healthcare, behavioral health and recovery, STD testing and treatment, and family and maternity services. Suboxone treatment available to adults who call to schedule an assessment.  No one is turned away due to inability to pay. Accepts Apple Health (Medicaid), Medicare, sliding scale fees are available. Photo ID and proof of insurance required, if insurance is to be billed. Call for appointment, same-day appointments available.",
    categories: [
      "General Health Services",
      "Services For People of Color",
      "Drug and Alcohol Services",
      "Mental Health Services",
      "Dental and Vision Services",
      "Family and Maternity Services",
      "Immigrant and Refugee Services",
    ],
  },
  {
    name: "International Community Health Services, S. Othello St.",
    website: "http://ichs.com",
    phone: "Dental: (206) 788-3502; Medical Clinic: (206) 788-3500",
    address: "3815 S Othello St., Seattle",
    hours:
      "Dental: Mon. – Fri., second Sat. of the month, 8 a.m. – 6 p.m.; Medical Center: Mon. – Sat., 8 a.m. – 5 p.m.;",
    description:
      "Culturally and linguistically appropriate health services. Staff is multilingual. Offers dental, vision, primary healthcare, behavioral health and recovery, STD testing and treatment, and family and maternity services. Suboxone treatment available to adults who call to schedule an assessment.  No one is turned away due to inability to pay. Accepts Apple Health (Medicaid), Medicare, sliding scale fees are available. Photo ID and proof of insurance required, if insurance is to be billed. Call for appointment, same-day appointments available.",
    categories: [
      "Drug and Alcohol Services",
      "Dental and Vision Services",
      "General Health Services",
      "Mental Health Services",
      "Family and Maternity Services",
      "Services For People of Color",
      "Immigrant and Refugee Services",
    ],
  },
  {
    name: "International Rescue Committee",
    website: "http://rescue.org/seattle",
    phone: "(206) 623-2105",
    address: "1200 S 192nd St., No. 101, SeaTac",
    hours: "Mon.–Thu.: 9 a.m.—5 p.m.; Fri.: by appointment only",
    description:
      "Serves everyone with routine immigration matters such as applying for green cards, employment authorization, and citizenship. Offers resettlement services, family reunification assistance, social service access, and employment services to immigrants, refugees, and asylees. Direct services to victims of human trafficking and other crimes with no ID required. Eligibility and document requirements for all other services vary.",
    categories: [
      "Employment and Training Services",
      "Services For People of Color",
      "Survivor Support Services",
      "Immigrant and Refugee Services",
    ],
  },
  {
    name: "Internet Access - Seattle Information Technology Office",
    website: "http://seattle.gov/tech/services/internet-access",
    phone: "(206) 684-0600",
    address: "700 5th Ave, # 2700",
    hours: "Mon. - Fri., 9 a.m. - 5 p.m.",
    description:
      "City provides the Free Public Wi-Fi program: There are several places around Seattle where you can drop in and access the internet; also the Emergency Broadband Benefit program: (pandemic impact) eligible households can get help paying for internet service; also the Free Internet Access for Organizations program: Through Access for All, the high-speed cable broadband program, the City of Seattle offers free high speed internet connections and services to eligible organizations and locations located in the City of Seattle; also the Low Cost Home Internet Access for Low-Income Residents program.",
    categories: [
      "Senior Services",
      "Financial Assistance",
      "Identification Services",
      "Housing Services",
    ],
  },
  {
    name: "Jan and Peter’s Place Women’s Shelter",
    website:
      "http://compasshousingalliance.org/emergency-programs/janpetersplace",
    phone: "(206) 474-1670",
    address: "Request referral: 2030 Third Ave.",
    hours: "6 p.m.–9 p.m. daily",
    description:
      "Enhanced shelter providing 50 shelter beds for female-identifying people ages 18 and older, offering 24 hour access to a safe space and supports, on-site housing navigation support, case management services, and skill set development opportunities. Operated through Compass Housing Alliance. Referral only through the Women’s Referral Center, 2030 3rd Ave., which is open daily from 6 p.m. – 9 p.m..",
    categories: ["Shelters"],
  },
  {
    name: "Jewish Family Service",
    website: "http://jfsseattle.org",
    phone: "(206) 461-3240",
    address: "1601 16th Ave.",
    hours:
      "Main Building: Mon. – Fri., 10 a.m. – 5 p.m.; Food Bank: Wed., Fri., 10 a.m. – 12 p.m., Thurs. 2 – 4 p.m., no walk-ins",
    description:
      "Assistance for Jewish community and general community impacted by trauma, poverty and disability. Provides program to support survivors of domestic violence, including safety planning, legal, housing, financial assistance and support groups.  Also offers services for older adults and family caregivers, refugees and immigrants. Some utility assistance as well. Operates a food bank offering Kosher options. Serves people of all backgrounds regardless of zip code. Documents required: ID. No fees.",
    categories: ["Housing Services", "Financial Assistance", "Senior Services"],
  },
  {
    name: "Jubilee Women’s Center",
    website: "http://jwcenter.org",
    phone: "(206) 324-1244",
    address: "620 18th Ave. E\nSeattle",
    hours:
      "Clothing boutique: Tue. 1--4 p.m.  and Wed. by appointment from 10 a.m.–12:30 p.m.",
    description:
      "Offers low-income and homeless, female-identifying adults up to two bags of clothing every 3 months with no ID required. Call to make an appointment. No fees. Offers a two year transitional housing program, female–identifying adults without children in care. For application, call, visit in-person, or visit website. Residents pay $700/month with subsidies available for the first 6 months. Proof of income required for housing. Limited wheelchair access.",
    categories: ["Clothing Assistance", "Housing Services"],
  },
  {
    name: "Kawabe Memorial House",
    website: "http://kawabehouse.org",
    phone: "(206) 322-4550",
    address: "221 18th Ave.",
    description:
      "Affordable housing with culturally sensitive programs and services for residents 62 years and older, most are first generation immigrants. Independent living with full Japanese, Korean, and Chinese translating services.",
    categories: ["Senior Services", "Immigrant and Refugee Services"],
  },
  {
    name: "KC Bar Association Domestic Violence/DV Family Law Clinic",
    website:
      "http://kcba.org/For-the-Public/Free-Legal-Assistance/Neighborhood-Legal-Clinics",
    phone: "Main: (206) 276-7100; DV Phone screening: (206) 783-2848",
    address: "Confidential Location",
    hours: "Phone screening: Wed.: 1–3 p.m.",
    description:
      "Legal clinic serving survivors of intimate partner violence with family issues only. Services provided for King County residents or those who have a case filed in King County. Call on Wednesdays for 10-15 minute eligibility screening process, followed by a same-day appointment with an attorney at 6:30 p.m. or 7:30 p.m. No fees. No photo ID or documentation required.",
    categories: ["Legal Services", "Survivor Support Services"],
  },
  {
    name: "Key Recovery and Life Skills Center",
    website: "http://keyrecovery.org/our-services",
    phone: "(206) 767-0244",
    address: "10344 14th Ave. S\nSeattle",
    hours: "Mon. – Fri. 8 a.m. – 4:30 p.m.",
    description:
      "Residential inpatient drug and alcohol treatment, focuses on individuals suffering from trauma and addiction. Programs include Long-Term Residential, Recovery House, After Care, and a program for residential treatment for families. Programs are evidence-based, trauma-informed, teaches essential life skills for healthy, productive lives, offers job training for long-term financial stability, strives to heal and reunite families. Welcomes every race, color, gender, religion, national origin, sexual orientation or gender identity. Department of Behavioral Health and Recovery/DBHR-certified service(s), Apple Health (Medicaid).",
    categories: ["Drug and Alcohol Services"],
  },
  {
    name: "King County Bar Association, Free Legal Assistance",
    website: "http://kcba.org/For-the-Public/Free-Legal-Assistance",
    phone: "(206) 267-7100",
    address: "1200 Fifth Ave., No. 700",
    hours: "Mon.-Fri.: 9 a.m.—4 p.m.",
    description:
      "Provides free legal assistance for low income King County residents: general legal advice, debt and bankruptcy, Family Law, Vacating Criminal Records, and The Housing Justice Project provides free legal assistance to renters facing eviction in King County.",
    categories: ["Legal Services"],
  },
  {
    name: "King County Bar Association, The Records Project",
    website:
      "http://kcba.org/For-the-Public/Free-Legal-Assistance/The-Records-Project",
    phone: "(206) 267-7028",
    address: "1200 5th Ave., No. 700",
    hours: "Mon.-Fri.: 9 a.m.—4 p.m.",
    description:
      "Provides free legal services to vacate eligible King County criminal convictions. A vacated conviction is removed from public background searches available to employers and potential landlords. Eligible persons include low-income people, and homeless people, and immigrants (regardless of immigration status).",
    categories: ["Re-entry Assistance", "Legal Services"],
  },
  {
    name: "King County Columbia City Center for Health",
    website: "http://kingcounty.gov/depts/health/locations/columbia.aspx",
    phone: "(206) 263-1505",
    address: "4400 37th Ave. S, Seattle",
    hours: "Mon.–Fri.: 8 a.m.—5 p.m.",
    description:
      "General dental care for low-income children and adults. WIC services for low-income pregnant women and adults. Accepts Apple Health (Medicaid). For service with no insurance, private insurance, or if you are not a U.S. citizen, you must qualify for services based on low or no income. Photo ID for dental services preferred, but not required. Call to schedule an appointment before visiting.",
    categories: ["Dental and Vision Services", "Family and Maternity Services"],
  },
  {
    name: "King County Department of Public Defense",
    website: "http://kingcounty.gov/depts/public-defense.aspx",
    phone:
      "Office: (206) 296-7662; 24/7 On-Call Attorney: (206) 477-8899; financial eligibility screening: (206) 477-9727",
    address: "710 2nd Ave., No. 200",
    hours: "Financial eligibility screening: Mon.-Fri.: 8 a.m.—5 p.m.",
    description:
      "Legal representation for people who are found to be income-eligible and are charged with a crime in King County. Financial interview required, with no appointment necessary. Representation is also provided to youth, those involved in a dependency proceeding, people facing civil commitment, and others. Does not accept cases from Seattle Municipal Court. The 24/7 on-call attorney service is available to anyone in custody in King County or under investigation who is seeking the advice of an attorney.",
    categories: ["Legal Services"],
  },
  {
    name: "King County Downtown Public Health Center",
    website: "http://kingcounty.gov/depts/health/locations/downtown.aspx",
    phone: "(206) 477-8300",
    address: "2124 4th Ave.",
    hours: "Mon.–Fri.: 8 a.m.—5 p.m.",
    description:
      "General dental care for low-income children and adults. WIC/nutrition services for low-income pregnant women and adults. Accepts Apple Health (Medicaid). For service with no insurance or if you are not a U.S. citizen, you must qualify for services based on low or no income. Photo ID required for WIC services. Photo ID for dental services preferred, but not required. Call to schedule an appointment before visiting.",
    categories: [
      "General Health Services",
      "Dental and Vision Services",
      "Family and Maternity Services",
    ],
  },
  {
    name: "King County Emergency Family Shelter Community Intake Line",
    phone: "(206) 245-1026",
    address: "Shelter locations vary.",
    hours: "Daily: 8 a.m.—11:30 p.m.",
    description:
      "Offers intakes for emergency shelter for people who are living outside or in a car who have a child and pregnant women.  Call intake line to be put on a daily waiting list for a callback from a King County Shelter. ID and documentation requirements vary depending on the shelter location.",
    categories: ["Family and Maternity Services", "Shelters"],
    website:
      "https://find-human-services.kingcounty.gov/search/e75d0716-40fc-5a9b-bf5e-cd742c936fb9",
  },
  {
    name: "King County Housing Authority, Main Office",
    website: "http://kcha.org",
    phone: "(206) 574-1100",
    address: "600 Andover Park W, Tukwila",
    hours: "Mon.-Fri.: 8 a.m.—4:30 p.m.",
    description:
      "Rental housing and rental assistance. Provides subsidized housing and affordable housing; applications for Section 8 Housing Choice Vouchers in King County only",
    categories: ["Housing Services"],
  },
  {
    name: "King County Law Library",
    website: "http://kcll.org",
    phone: "(206) 477-1305",
    address: "516 Third Ave., Room W621",
    hours: "Mon.–Fri.: 8:30 a.m.—4:30 p.m.",
    description:
      "King County Law Library aids all persons with their need for legal information by providing legal materials, training, education, and services in a welcoming and positive environment.",
    categories: ["Legal Services"],
  },
  {
    name: "King County Metro Transit, ORCA Card",
    website:
      "http://kingcounty.gov/depts/transportation/metro/fares-orca/orca-cards.aspx",
    phone: "(888) 988-6722",
    address: "201 S Jackson St.",
    hours: "Mon. – Fri., 8:30 a.m. – 5 p.m.",
    description:
      "The ORCA card is the easiest way to pay your transit fares on buses, trains and ferries throughout the Puget Sound. After loading your ORCA card with E-purse (electronic purse) funds, and/or a monthly pass, you’re ready to ride! The ORCA card will automatically track paid fares and transfers, so you don't have to. Orca card offers reduced fare programs for youth, seniors, customers with disabilities and lower incomes.",
    categories: ["Transportation Assistance"],
  },
  {
    name: "King County Metro Transit, ORCA Lift Card",
    website:
      "http://kingcounty.gov/depts/health/locations/health-insurance/coverage/enrollment-assistance/ORCA-LIFT-card.aspx",
    phone: "(800) 756-5437",
    address: "201 S Jackson St.",
    description:
      "Reduced transit fare for low income adults. Citizenship is not required. save up to 50 percent or more on public transportation. Apply in person, online or call for enrollment locations and documents required.",
    categories: ["Transportation Assistance"],
  },
  {
    name: "King County Metro Transit Regional Reduced Fare Permit (RRFP)",
    website:
      "http://kingcounty.gov/en/dept/metro/fares-and-payment/discounted-fares/regional-reduced-fare-permit",
    phone: "(206) 553-3000; TTY: (206) 684-2029",
    address: "201 S Jackson St.",
    hours: "Mon.–Fri.: 8:30 a.m.—4:30 p.m., closed from 1—2 p.m.",
    description:
      "The Regional Reduced Fare Permit (RRFP) entitles senior riders (age 65 or older), riders with a disability and Medicare card holders to reduced fares on public transportation systems in the Puget Sound region. Note: ID required for age-specific service like a Senior Permit.",
    categories: [
      "Disability Services",
      "Transportation Assistance",
      "Senior Services",
    ],
  },
  {
    name: "King County Needle Exchange",
    website:
      "http://kingcounty.gov/depts/health/communicable-diseases/hiv-std/patients/drug-use-harm-reduction/needle-exchange.aspx",
    phone: "(206) 263-2000",
    address:
      "Robert Clewis Center: 2124 Fourth Ave.; Robert Clewis Center 2: 21161 11th Ave.",
    hours:
      "Robert Clewis Center: Mon., Wed., Thu., Fri.: 9 a.m.–5 p.m.; Tue.: 1–5 p.m.; Sat.: 2–5 p.m.; Robert Clewis Center 2: Tue.–Sat.: 6:30–8:30 p.m.",
    description:
      "Needle exchange, clean injection supplies, overdose prevention training and harm reduction services for everyone. Medical clinic provides Naloxone distribution, social workers, case management and counseling services as well as abscess treatment, HIV/hepatitis testing and counseling, Hepatitis A & B vaccinations, treatment for colds and upper respiratory infections and TB screening. Visit in person. No fees.",
    categories: ["Drug and Alcohol Services"],
  },
  {
    name: "King County Public Health, Meridian Center",
    website:
      "http://kingcounty.gov/en/dept/dph/health-safety/health-centers-programs-services/public-health-centers/north-seattle",
    phone: "(206) 263-9440",
    address: "10521 Meridian Ave. N",
    hours: "Office: 8 a.m.–5 p.m.; visit website for specific program hours",
    description:
      "Offers nursing, WIC and maternity services; adult and child general and behavioral health services; HIV and tuberculosis screening; substance use treatment. Some clinical services are offered through a partnership with Neighborcare Health and Valley Cities Behavioral Health Care.",
    categories: [
      "Family and Maternity Services",
      "HIV/AIDS Services",
      "Mental Health Services",
      "General Health Services",
    ],
  },
  {
    name: "King County Public Health, North Seattle Dental Clinic",
    website:
      "http://kingcounty.gov/depts/health/locations/north/dental-clinic.aspx",
    phone: "(206) 205-8580",
    address: "12359 Lake City Way NE",
    hours: "Mon.–Fri.: 8 a.m.—5 p.m.",
    description:
      "General dental care services. North and South Seattle serves children 1-18, low-income pregnant women and low-income adults if Medicaid eligible. Central Seattle serves people who are homeless, 13 and older. Call for an appointment. Tiered flat fee for the uninsured. Accepts Apple Health (Medicaid). Call for more information.",
    categories: ["Family and Maternity Services", "Dental and Vision Services"],
  },
  {
    name: "King County Public Health, White Center",
    website:
      "http://kingcounty.gov/en/dept/dph/health-safety/health-centers-programs-services/public-health-centers/white-center",
    phone: "(206) 477-0000",
    address: "9934 Eighth Ave. SW",
    hours: "Mon., Tues.: 8:30 a.m.—5:30 p.m.; Thurs.: 8 a.m.—5 p.m.",
    description:
      "Maternal and family health programs, such as pregnancy services, primary care, WIC, information and guidance from nurses, as well as Mom’s Plus case management for those seeking substance abuse treatment. Provides community support services workers to help people get people on Medicaid. Offers: WIC and maternity services. ID is required to access the service.",
    categories: ["Family and Maternity Services"],
  },
  {
    name: "King County Sexual Assault Resource Center",
    website: "http://kcsarc.org",
    phone: "(888) 998-6423",
    address: "707 S. Grady Way, No. 300, Renton",
    hours: "Resource line: 24/7; main office: Mon.-Fri.: 9 a.m.—5 p.m.",
    description:
      "Victim-advocacy organization that provides critical support, tools, and direct mental and behavioral health services to children, teens, women and men who are victims of sexual assault.",
    categories: ["Emergency and Crisis Lines", "Survivor Support Services"],
  },
  {
    name: "King County Trans Resource and Referral Guide",
    website: "http://kctransguide.org/category/directory/housing-shelter",
    description:
      "Online list of resources for people who are transgender; places that are welcoming, affirming, and supportive. Categories listed include housing and shelter, community connection, healthcare, elder services, trans youth, trans people of color, legal assistance, spiritual and social life, information on identification documents, activism, advocacy, laws and rights, bathroom access, arts, and various programs.",
    categories: ["LGBTQIA+ Services"],
  },
  {
    name: "King County Veterans Program, Seattle",
    website:
      "http://kingcounty.gov/depts/community-human-services/veterans/programs-services.aspx",
    phone: "(206) 263-8387",
    address: "9725 3rd Ave. NE, No. 300",
    hours:
      "Office: Mon.-Fri.: 8:30 a.m.—4:30 p.m.; Walk ins: Mon.-Fri.: 8:30—11:00 a.m., 1—3 p.m.",
    description:
      "Provides emergency financial assistance, housing system coordination, case management, and social work, as well as education and employment resources. Documents required include proof of service (prior or current) as an active duty or reservist member; documentation of King County residency, and proof of income eligibility for financial assistance.",
    categories: ["Veteran Services"],
  },
  {
    name: "King County Veterans Program South",
    website:
      "http://kingcounty.gov/depts/community-human-services/veterans/programs-services.aspx",
    phone: "(206) 263-8387",
    address: "645 Andover Park W, No.100\nTukwila, WA",
    hours:
      "Office: Mon.-Fri.: 8:30 a.m.—4:30 p.m.; Walk ins: Mon.-Fri.: 8:30—11:00 a.m., break for lunch, resume services 1—3 p.m.",
    description:
      "Services offered include emergency financial assistance, case management, employment, mental health counseling and housing system coordination. Serves veterans, service members and their legal dependents living in King County. Documents required include: Proof of service (prior of current), Documentation of King County Residency, and proof of income eligibility for financial assistance.",
    categories: ["Veteran Services"],
  },
  {
    name: "La Esperanza Health Counseling Services, Burien",
    website: "http://laesperanzahcs.org",
    phone: "(206) 306-2690",
    address: "15405 First Ave. S, Burien",
    hours: "Mon.–Thu.: 10 a.m.—6 p.m.",
    description:
      "Programs are bilingual (English and Spanish) and focus on Latino and immigrant communities. Alcohol and drug information school, DUI alcohol and drug assessments, outpatient substance use disorder treatment services, intensive outpatient treatment, Level 1 and 2 Anger Management classes, Domestic violence assessment and treatment, MRT treatment and Parenting Classes. Provides Department of Behavioral Health and Recovery/DBHR-certified service(s). Accepts private insurance and private pay. Sliding scale fees.",
    categories: [
      "Drug and Alcohol Services",
      "Survivor Support Services",
      "Immigrant and Refugee Services",
    ],
  },
  {
    name: "La Esperanza Health Counseling Services, Lynnwood",
    website: "http://laesperanzahcs.org",
    phone: "(425) 248-4534",
    address: "20815 67th Ave. W, Ste. 201 Lynnwood",
    hours: "Mon.–Thu.: 10 a.m.—6 p.m.",
    description:
      "Programs are bilingual (English and Spanish) and focus on Latino and immigrant communities. Alcohol and drug information school, DUI alcohol and drug assessments, outpatient substance use disorder treatment services, intensive outpatient treatment, Level 1 and 2 Anger Management classes, Domestic violence assessment and treatment, MRT treatment and Parenting Classes. Provides Department of Behavioral Health and Recovery/DBHR-certified service(s). Accepts private insurance and private pay. Sliding scale fees.",
    categories: [
      "Immigrant and Refugee Services",
      "Drug and Alcohol Services",
      "Survivor Support Services",
    ],
  },
  {
    name: "La Esperanza Health Counseling Services, Mount Vernon",
    website: "http://laesperanzahcs.org",
    phone: "info@laesperanzahcs.org",
    address: "205 West Steward Road Mount Vernon",
    hours: "Mon.–Thu.: 10 a.m.—6 p.m.",
    description:
      "Programs are bilingual (English and Spanish) and focus on Latino and immigrant communities. Alcohol and drug information school, DUI alcohol and drug assessments, outpatient substance use disorder treatment services, intensive outpatient treatment, Level 1 and 2 Anger Management classes, Domestic violence assessment and treatment, MRT treatment and Parenting Classes. Provides Department of Behavioral Health and Recovery/DBHR-certified service(s). Accepts private insurance and private pay. Sliding scale fees.",
    categories: [
      "Survivor Support Services",
      "Drug and Alcohol Services",
      "Immigrant and Refugee Services",
    ],
  },
  {
    name: "Lahai Health",
    website: "http://lahai.org",
    phone: "(206) 363-4105 x 230",
    address: "2152 N 122nd St.",
    hours: "Mon.-Fri.: 8:30 a.m.—4 p.m.",
    description:
      "Providing quality and compassionate health care to the underserved, showing Christ’s love to everyone. Clinic provides health care, full medical exams, resources to obtain low to no cost prescription drugs, laboratory tests, imaging services, intensive nursing case management and referrals to medical specialists. Also offers Professional Mental Health Counseling. Cannot provide urgent care. Call for an appointment. Does not bill patients or insurance. See website or call for multiple service locations.",
    categories: [
      "General Health Services",
      "Dental and Vision Services",
      "Mental Health Services",
    ],
  },
  {
    name: "Lavender Rights Project",
    website: "http://lavrights.org",
    phone: "(206) 631-7955",
    address: "911 E Pike St. #314",
    hours: "Mon.—Fri.: 10 a.m.—5 p.m.",
    description:
      "Lavender Rights Project elevates the power, autonomy, and leadership of the Black intersex & gender diverse community through intersectional legal and social services. We utilize the law as an organizing principle to affirm our civil rights and self-determination. Our organization disrupts oppressive systems that target Black gender diverse and intersex communities of color and lead to disproportionate levels of poverty, housing disparities, and gender-based violence, especially among Black and Indigenous people.",
    categories: [
      "LGBTQIA+ Services",
      "Services For People of Color",
      "Housing Services",
      "Financial Assistance",
      "Legal Services",
    ],
  },
  {
    name: "Legacy House, Adult Day Services",
    website: "http://ichs.com/services/adult-day-services",
    phone: "(206) 292-5184",
    address: "803 S Lane St.",
    hours:
      "Office: Mon.–Fri.: 10 a.m.—2 p.m.; lunch: Mon.–Fri.: 11 a.m.—12:30 p.m.",
    description:
      "Senior services 60 and older, predominantly multi-Asian clientele. Fitness, social, recreational group activities, daily Congregate Meal Program that includes nutritious, Asian-style lunches including fresh fruits and vegetables, transportation coordination, and registered nurse. Rehabilitative, occupational therapy available. Personal care services, respite for caregivers. Partnering service providers located in the same plaza as Legacy House, including a public library featuring multi-lingual materials, health clinic, mental health care, ESL classes, citizenship classes, and the neighborhood community center.",
    categories: [
      "Senior Services",
      "Services For People of Color",
      "Immigrant and Refugee Services",
    ],
  },
  {
    name: "Legacy House, Assisted Living Services",
    website: "http://ichs.com/services/assisted-living",
    phone: "(206) 292-5184",
    address: "803 S Lane St.",
    hours: "Call for information and to schedule a visit.",
    description:
      "Assisted Living Services for seniors, for predominantly multi-Asian clientele, with services in many languages.",
    categories: [
      "Senior Services",
      "Services For People of Color",
      "Immigrant and Refugee Services",
    ],
  },
  {
    name: "Lifelong",
    website: "http://lifelong.org",
    phone: "(206) 957-1600",
    address: "1161 11th Ave.",
    hours: "Mon.–Fri.: 8:30 a.m.—5 p.m.",
    description:
      "Serves homeless, or low income people living with HIV and other life-challenging illnesses, like cancer, Parkinson’s Disease, or other serious illnesses. Provides wrap around services, advocacy, case management, housing assistance, food assistance, and health and dental resources. Delivers free meals to homebound seniors to people coming home from a hospital, nursing home, inpatient facility. No fees. Call for information and applications.",
    categories: [
      "Dental and Vision Services",
      "HIV/AIDS Services",
      "Food Assistance",
    ],
  },
  {
    name: "LifeWire",
    website: "http://lifewire.org",
    phone: "(425) 746-1940",
    address: "Confidential Location",
    hours: "24/7",
    description:
      "Helps adults, children, and youth who have been impacted by domestic violence. Offers survivor-driven, trauma-informed services including confidential emergency shelter, 24-hour helpline, counseling, housing stability, advocacy and support groups, for survivors of domestic violence of any gender, with or without children.",
    categories: ["Emergency and Crisis Lines", "Survivor Support Services"],
  },
  {
    name: "LIHI Tiny House Villages",
    website: "http://lihihousing.org/villages",
    address: "Various locations, visit website for more information",
    description:
      "Safe, weatherproof, and lockable tiny houses with electricity, lights, and heaters. Tiny house villages have kitchen, restroom and laundry facilities as well as onsite showers and a welcome/security hut. Residents are placed by referral through the City of Seattle’s HOPE Team and community organizations.",
    categories: ["Encampments"],
  },
  {
    name: "Link to Care WA, Community Health Network of Washington",
    website: "http://linktocarewa.org",
    phone: "(866) 757-1832 (TY: 711)",
    address: "1111 Third Ave., No. 400",
    hours: "Mon.-Fri.: 8 a.m.-5 p.m.",
    description: "",
    categories: [
      "General Health Services",
      "Immigrant and Refugee Services",
      "Financial Assistance",
    ],
  },
  {
    name: "Low Cost Computers - Seattle Information Technology Office",
    website:
      "http://seattle.gov/tech/internet-and-devices/discounted-computers-and-phones",
    phone: "(206) 684-0600",
    address: "700 5th Ave, No. 2700",
    hours: "Mon.-Fri.: 9 a.m.—5 p.m.",
    description:
      "Low cost computers available to income eligible with yearly earnings less than $40,000, or show a EBT card, or prove you receive Medicaid, SSI, TANF, GA-U, DSHS support, free or reduced school lunches. City website explains details of type of computers, and updated locations to go purchase it, cost is about $120. Call InterConnection at (206) 222-2060 or visit the online store at connectall.org",
    categories: ["Financial Assistance"],
  },
  {
    name: "Low Income Housing Institute (LIHI)",
    website: "http://lihihousing.org/housing",
    phone: "(206) 443-9935",
    address: "1253 S Jackson St.",
    hours: "9 a.m.–5 p.m.",
    description:
      "All housing applications for LIHI properties are handled by the staff at the individual properties. Waiting list units are all rentals where rent is 30 percent of your household’s monthly income. For wait-listed properties, fill out pre-application form. View website to see properties.",
    categories: ["Encampments", "Shelters", "Housing Services"],
  },
  {
    name: "MAPS, Muslim Community Resource Center (MCRC)",
    website: "http://mapsredmond.org/mcrc",
    phone: "Office: (425) 947-7146; services: (888) 404-6272",
    address: "16307 NE 83rd St., No. 102, Redmond",
    hours: "Mon.–Fri.: 10 a.m.—5 p.m.",
    description:
      "Emergency assistance referral, legal clinic, counseling, refugee assimilation, elder services and Islamic funeral services. Provides rental and utility assistance and help with eviction notices or final notices, and transitional housing options that are socially and culturally appropriate for single women. Focused on the Muslims of Puget Sound, serves all people. Call or visit website for more information. Services require a photo ID.",
    categories: [
      "Financial Assistance",
      "Immigrant and Refugee Services",
      "Housing Services",
      "Services For People of Color",
    ],
  },
  {
    name: "Mary’s Place Day Center for Women",
    website: "http://marysplaceseattle.org/get-help/day-center",
    phone: "(206) 812-8559 ext. 119",
    address: "1830 Ninth Ave.",
    hours:
      "Day center: Mon.–Fri.: 7 a.m.–3:30 p.m.; Breakfast: 7:30–8:30 a.m.; Lunch: noon–1:15 p.m.; Sat. 9:30 a.m.–1 p.m.",
    description:
      "A drop in center for women. Showers, laundry, housing and health resources, breakfast and lunch, groups and community.",
    categories: ["Hygiene Services", "Day Centers"],
  },
  {
    name: "Mary's Place Family Shelters",
    website: "http://marysplaceseattle.org",
    phone: "(206) 621-8474",
    address: "Various locations in King County",
    hours: "Call intake 8 a.m.–11 p.m. 7 days a week. (206) 245-1026",
    description:
      "Mary's Place Family Shelters offers overnight shelter for families (men and women) with children at several locations in King County. They accept families with pets. Call the Emergency Family Shelter Intake Line, 8 a.m.–11 p.m., 7 days a week, for info and intake; (206) 245-1026 or visit MarysPlaceSeattle.org/Outreach-Request. No walk-ins.",
    categories: ["Shelters", "Family and Maternity Services"],
  },
  {
    name: "Matt Talbot Center",
    website: "http://mtcseattle.org/services",
    phone: "(206) 256-9865",
    address: "2313 Third Ave.",
    hours: "Mon.–Fri.: 9 a.m.—2 p.m.",
    description:
      "Washington state licensed intensive outpatient substance use disorder (SUD) treatment program that serves adults aged 18 and up experiencing SUD, homelessness, and mental health issues. Offers wraparound care service to enrolled program members only. Photo ID and Social Security Card required.",
    categories: ["Drug and Alcohol Services"],
  },
  {
    name: "Mercy Housing",
    website: "http://mercyhousing.org/northwest",
    phone: "Main office: (206) 838-5700",
    address: "Main office: 6930 Martin Luther King Jr. Way S",
    hours: "No walk ins: check website or call.",
    description:
      "Affordable housing for families, seniors and people with special needs. Each Mercy Housing property has its own leasing office and its own application process. Call the property directly for availability, requirements and how to apply.",
    categories: ["Housing Services"],
  },
  {
    name: "Mother Nation",
    website: "http://mothernation.org/introduction",
    phone: "(206) 722-2321",
    address: "801 23rd Ave. S, Suite A",
    hours: "Mon.–Fri.: 10 a.m.–6 p.m.",
    description:
      "Native American organization offering culturally informed healing services, advocacy, mentorship and homeless prevention. Emergency transportation for victims of domestic violence, safety planning, public benefit application assistance, housing referrals, referrals to employment, advocacy with Indian child welfare, domestic violence court and Tribal courts, and weekly women's healing circles. Serves Native families. Call for an appointment. Documents required: tribal ID or other documentation of native descent. Free.",
    categories: [
      "Survivor Support Services",
      "Native & Indigenous Services",
      "Housing Services",
    ],
  },
  {
    name: "Mothers for Police Accountability",
    website: "http://mothersforpoliceaccountability.org",
    phone: "(206) 329-2033",
    address: "PO BOX 22886",
    hours: "Hotline: 24 hours, 7 days a week",
    description:
      "24-hour phone line to report police violence and get support. Trained volunteers are ready to receive complaints and assist callers in composing and filing their complaints with the appropriate jurisdiction and alerting elected officials. Serves everyone. No fees.",
    categories: ["Emergency and Crisis Lines"],
  },
  {
    name: "Multicultural Counselors",
    website: "http://multiculturalcounselors.org",
    phone: "(425) 310-2356",
    description:
      "Online database to search for counseling according to desired language, culture, ethnicity; connecting communities of color/culture with counselors who understand; and connecting counselors of color/culture with a network of support. Individual counseling, workshops, trainings and group events.",
    categories: ["Services For People of Color", "Mental Health Services"],
  },
  {
    name: "Muslim Housing Services",
    website: "http://www.muslimhousing.org/",
    phone: "(206) 723-1712",
    address: "7928 Rainier Ave. S",
    hours:
      "Mon., Tues.,: 10 a.m.—6 p.m.; Wed., Thurs. 10 a.m.—5 p.m.; Fri.: 10 a.m.—1:15 p.m. and 2:30—6 p.m.",
    description:
      "Case management, homelessness prevention, transitional housing and rental assistance. Also offers food distribution, ESL for Arabic-speaking clients, furniture and household donations, school supplies, diaper distribution and youth soccer program. Serves refugees and second migration immigrants from East Africa, the Middle East, and other parts of Africa.  Staff speaks multiple languages. Call for eligibility, application, and fee information. Services except food require ID and Social Security number to qualify.",
    categories: [
      "Immigrant and Refugee Services",
      "Services For People of Color",
      "Housing Services",
    ],
  },
  {
    name: "Narcotics Anonymous",
    website: "http://seattlena.org",
    phone: "(206) 790-8888",
    address: "Location varies",
    hours: "24/7; support group meeting times vary",
    description:
      "Support groups and a 24-hour helpline for anyone who has a desire to stop using drugs. Call for support and for information on meeting times and sites, or text your zipcode for an auto-response with five meeting times and locations in your area. No fees.",
    categories: ["Emergency and Crisis Lines", "Drug and Alcohol Services"],
  },
  {
    name: "National Asian Pacific Center on Aging Senior Community Service Employment Program",
    website: "http://napca.org",
    phone: "(206) 838-8170",
    address: "1511 Third Ave., No. 914",
    hours: "Mon.–Fri.: 8:30 a.m.—5 p.m.",
    description:
      "Offers employment training. Serves low-income Asian and Pacific Islander residents, 55 and older. Call to apply/make an appointment. No fees.",
    categories: [
      "Employment and Training Services",
      "Senior Services",
      "Senior Services",
    ],
  },
  {
    name: "National Problem Gambling Helpline",
    website: "http://ncpgambling.org/help-treatment",
    phone: "(800) 426-2537",
    hours: "24/7",
    description:
      "Call the 24-hour hotline to be connected to local resources for those seeking help for a gambling problem. Peer support network is available online at the website.",
    categories: ["Problem Gambling Resources", "Emergency and Crisis Lines"],
  },
  {
    name: "Native American Reentry Services",
    website: "http://nativereentry.org",
    phone: "(253) 212-9227",
    address: "724 Yakima Avenue, 2nd Fl",
    hours: "Mon.–Fri. 9 a.m.–5 p.m.",
    description:
      "Native American Reentry Services (NARS) is a nonprofit dedicated to helping Native American, Asian Pacific Islander and other Aboriginal people overcome the challenge of incarceration and reentering the community post-incarceration. Offers expertise to support tribal reentry programs and connection to tribal members during incarceration. Offers traditional ceremony services to incarcerated brothers and sisters. Does not compete with other organizations for clients; helps other reentry programs grow, and everyone works together to address the many needs.",
    categories: [
      "Native & Indigenous Services",
      "Services For People of Color",
      "Re-entry Assistance",
    ],
  },
  {
    name: "Navos, Mental Health Wellness Center",
    website: "http://navos.org",
    phone: "(206) 248-8226",
    address: "1210 SW 136th St., Burien",
    hours: "Mon.–Fri.: 8 a.m.–4:30 p.m.",
    description:
      "Intensive outpatient treatment and mental health treatment for King County residents, DBHR-certified services. Treatment for chemical dependency. Will not serve patients who need detoxification or who require inpatient care. Family and child intensive therapy services, outpatient therapy, case management, infant mental health services, information and referral, counseling. Apple Health (Medicaid) is required. Call for intake, early in the morning is best.",
    categories: ["Drug and Alcohol Services", "Mental Health Services"],
  },
  {
    name: "Neighborcare Health, 45th St.",
    website: "http://neighborcare.org/clinics/45th-street",
    phone: "(206) 633-3350",
    address: "1629 N. 45th St.",
    hours:
      "Medical: Mon., Tues., Thurs., Fri., 8 a.m.–5:30 p.m.; 1st, 3rd Wed., 9:30 a.m.–5:30 p.m.; 2nd, 4th, 5th Wed., 8 a.m.– 5:30 p.m.\nPharmacy: Mon.-Fri., 8 a.m.–5:30 p.m.\nDental: Mon. - Fri., 6:45 a.m. – 5:30 p.m.; Closed on the 1st, 3rd Wed. from 8:30 – 9:30 a.m.",
    description:
      "Medical, dentistry, and pharmacy services for everyone. Call to make an appointment or visit during drop-in hours (90 min before close). Sliding scale fees. Patients seen regardless of ability to pay. Apple Health (Medicaid), most Medicare Advantage plans and private insurance accepted.",
    categories: [
      "General Health Services",
      "Mental Health Services",
      "Dental and Vision Services",
    ],
  },
  {
    name: "Neighborcare Health Ballard Homeless Clinic",
    website: "http://neighborcare.org/clinics/ballard",
    phone: "(206) 782-5939",
    address: "Nyer Urness House, 1753 NW 56th St., No. 200",
    hours: "Mon.–Fri., 9 a.m.–4:30 p.m.\nClosed for lunch noon-1 p.m.",
    description:
      "Health care services and mental health counseling serving homeless adults 18 and older. Offers social work services. Call or drop-in. Services free. Accepts Apple Health (Medicaid) and most health insurance plans.",
    categories: ["Mental Health Services", "General Health Services"],
  },
  {
    name: "Neighborcare Health, Georgetown",
    website: "http://neighborcare.org/georgetown",
    phone: "(206) 461-6943",
    address: "6200 13th Ave. S",
    hours:
      "Phone hours: Mon.–Fri., 8 a.m.–5 p.m.; 1st, 3rd Wed., 9:30 a.m.–5 p.m.\nDental: Mon.-Fri., 7:15 a.m.–6 p.m.",
    description:
      "General dentistry serving everyone. Call to make an appointment or visit during drop-in hours (90 min before close). Sliding scale fees. Patients seen regardless of ability to pay. Apple Health (Medicaid), most Medicare Advantage plans and private insurance accepted. Proof of income required without insurance.",
    categories: ["Dental and Vision Services", "Mental Health Services"],
  },
  {
    name: "Neighborcare Health, High Point",
    website: "http://neighborcare.org/high-point",
    phone: "Medical: (206) 461-6950; Dental: (206) 461-6966",
    address: "6020 35th Ave. SW",
    hours:
      "Dental services: Mon.–Fri. 6:45 a.m.–5:30 p.m.\nMedical services: Mon., Tues., Thurs., Fri., 8 a.m.–5 p.m.; Wed., 9:30 a.m.–4:30 p.m.; 2nd, 4th Wed., 8 a.m.–4:30 p.m.",
    description:
      "Primary medical care for patients of all ages. General dentistry serving everyone. Call 206-477-1870 for WIC nutrition services. Call to make an appointment or visit during drop-in hours (90 min before close). Sliding scale fees. Patients seen regardless of ability to pay. Apple Health (Medicaid), most Medicare Advantage plans and private insurance accepted.",
    categories: [
      "Family and Maternity Services",
      "Dental and Vision Services",
      "General Health Services",
    ],
  },
  {
    name: "Neighborcare Health, Meridian",
    website: "http://neighborcare.org/meridian",
    phone: "Dental and Medical: (206) 296-4990; Pharmacy: (206) 548-5900",
    address: "10521 Meridian Ave. N",
    hours:
      "Dental: Mon.–Fri., 7:15 a.m.–6 p.m., Sat. 8 a.m.–noon; 1st, 3rd Wed., 9:30 a.m.–5 p.m.\nMedical: Mon.-Fri., 8 a.m.– 5 p.m.; 1st, 3rd Wednesday 9:30 a.m.–5 p.m.",
    description:
      "Primary medical care for patients of all ages. General dentistry serving everyone. Call to make an appointment or visit during drop-in hours (90 min before close). Sliding scale fees. Patients seen regardless of ability to pay. Apple Health (Medicaid), most Medicare Advantage plans and private insurance accepted.",
    categories: ["Dental and Vision Services", "General Health Services"],
  },
  {
    name: "Neighborcare Health, Pacific Tower",
    website: "http://neighborcare.org/pacific-tower",
    phone: "(206) 548-5850",
    address: "1200 12th Ave. S, No. 401",
    hours:
      "Phone: Mon.–Fri.: 8 a.m.–5 p.m., first and third Wed.: 9:30- a.m.–5 p.m.; office: 7 a.m.–6 p.m.",
    description:
      "General dentistry serving everyone. Call to make an appointment or visit during drop-in hours (90 min before close). Sliding scale fees. Patients seen regardless of ability to pay. Apple Health (Medicaid), most Medicare Advantage plans and private insurance accepted.",
    categories: ["Dental and Vision Services"],
  },
  {
    name: "Neighborcare Health, Rainier Beach",
    website: "http://neighborcare.org/rainier-beach",
    phone: "Dental: (206) 461-6981; Medical: (206) 722-8444",
    address: "9245 Rainier Ave. S",
    hours:
      "Dental: Mon., Tue., Thurs., Fri.: 6:45 a.m.–5:30 p.m.; Wed.: 7 a.m.–5:30 p.m.; 1st, 3rd Wed.: closed 8 a.m.–9:30 a.m.\nMedical: Mon., Tue., Thu.: 7:30 a.m.–7:30 p.m.; 1st, 3rd Wed.: 9:30 a.m.–5:30 p.m.; 2nd, 4th Wed.: 8 a.m.–5:30 p.m.; Fri.: 7:30 a.m.–5:30 p.m.; Sat.: 9:30 a.m.–1:30 p.m.",
    description:
      "Primary medical care for patients of all ages. General dentistry serving everyone. Call to make an appointment or visit during drop-in hours (90 min before close). Sliding scale fees. Patients seen regardless of ability to pay. Apple Health (Medicaid), most Medicare Advantage plans and private insurance accepted.",
    categories: ["Dental and Vision Services", "General Health Services"],
  },
  {
    name: "Neighborcare Health Services for Youth Experiencing Homelessness",
    website: "http://neighborcare.org/services/youth-clinic",
    phone: "(206) 633-7650",
    address:
      "45th Street: 1629 N 45th St., 98103\nNew Horizons: 2709 3rd Ave., 98121",
    hours: "45th Street: Wed. 6–9 p.m.\nNew Horizons: Wed. 2–5 p.m.",
    description:
      "Medical, mental health, referrals to dental care and other services for youth and young adults (ages 12-26) experiencing homelessness, who have been homeless at some point in the last 12 months, or do not have a stable, permanent, safe place to live.",
    categories: ["General Health Services", "Mental Health Services"],
  },
  {
    name: "Neighborcare Midwifery",
    website: "http://neighborcare.org/midwifery",
    phone: "(206) 548-5710",
    address: "Many locations around Seattle, see website for information.",
    hours: "See website or call for information",
    description:
      "Pregnancy and midwifery services serving pregnant people. WIC food assistance available through partners at some locations. (Neighborcare offers primary medical care, social work services and behavioral health services serving everyone.) Call for appointment. Sliding scale fee. Accepts Medicare, Apple Health (Medicaid) and most health insurance plans",
    categories: ["Womxn's Health Services", "Family and Maternity Services"],
  },
  {
    name: "Neighborhood House (at Navos Mental Health & Wellness Center)",
    website: "http://nhwa.org/contact/locations",
    phone: "(206) 923-6777",
    address: "1220 SW 136th St., Burien",
    hours: "Mon.–Fri.: 8 a.m.–5 p.m.",
    description:
      "HIV and Hepatitis C testing, HIV counseling and referrals to mental health and substance use disorder treatment for adults. Call for eligibility and appointment information. No fees.",
    categories: ["HIV/AIDS Services", "Services For People of Color"],
  },
  {
    name: "Neighborhood House, High Point",
    website: "http://nhwa.org/contact/locations",
    phone: "(206) 588-4900",
    address: "6400 Sylvan Way SW",
    hours: "Mon.—Fri.: 9 a.m.—5 p.m.",
    description:
      "Offers assistance to individuals seeking U.S. citizenship including citizenship and ESL classes. Provides bilingual case management, free HIV education, as well as counseling, testing and referrals, early childhood education programs and general employment and adult education services. Serves low-income community members, public housing residents, immigrants and refugees. Call for information. No fees.",
    categories: [
      "Immigrant and Refugee Services",
      "Family and Maternity Services",
    ],
  },
  {
    name: "Neighborhood House Rainier Vista",
    website: "http://nhwa.org/contact/locations",
    phone: "(206) 461-4568",
    address: "4410 29th Ave. S",
    hours: "Mon.–Fri.: 9 a.m.—5 p.m.",
    description:
      "Offers assistance to individuals seeking U.S. citizenship including citizenship and ESL classes. Provides bilingual case management, free HIV education, as well as counseling, testing and referrals, early childhood education programs and general employment and adult education services. Serves low-income community members, public housing residents, immigrants and refugees. Call for information. No fees.",
    categories: ["Immigrant and Refugee Services"],
  },
  {
    name: "Neighborhood House, Raven Terrace at Yesler Terrace",
    website: "http://nhwa.org/contact/locations",
    phone: "(206) 264-4997",
    address: "820 Yesler Way, No. 100",
    hours: "Mon.–Fri.: 9 a.m.—5 p.m.",
    description:
      "Offers assistance to individuals seeking U.S. citizenship including citizenship and ESL classes. Provides bilingual case management, free HIV education, as well as counseling, testing and referrals, and general employment and adult education services. Serves low-income community members, public housing residents, immigrants and refugees. Call for information. No fees.",
    categories: [
      "Immigrant and Refugee Services",
      "Family and Maternity Services",
    ],
  },
  {
    name: "Neighborhood House, Wiley Center at Greenbridge",
    website: "http://nhwa.org/contact/locations",
    phone: "(206) 461-4554",
    address: "9800 8th Ave. SW",
    hours: "Mon.–Fri. 9 a.m.—5 p.m.",
    description:
      "Offers assistance to individuals seeking U.S. citizenship including citizenship and ESL classes. Provides bilingual case management, and general employment and adult education services. Serves low-income community members, public housing residents, immigrants and refugees. Call for information. No fees.",
    categories: ["Immigrant and Refugee Services"],
  },
  {
    name: "Neighborhood Legal Clinics",
    website: "http://kcba.org/?pg=Neighborhood-Legal-Clinics",
    phone: "(206) 267-7070",
    address: "Location varies",
    hours: "Hours vary by location.",
    description:
      "Coordinates legal clinics across King County. Limited legal advice and consultation on civil legal matters; does not provide ongoing pro bono representation. Serves King County residents or those who have a case filed in King County. Clients must leave a message to request an appointment, or apply online - follow the link to the Client Intake Form. Bring any pertinent documents to the appointment. No Fees. Visit website for full list of clinics.",
    categories: ["Legal Services"],
  },
  {
    name: "NE Seattle Tool Library",
    website: "http://seattlereconomy.org/nestl",
    phone: "(206) 524-6062; nestl@seattlereconomy.org",
    address: "10228 Fischer Pl. NE",
    hours:
      "Tue., Thu.: 5–8 p.m.; Sat. (winter hours): 9 a.m.–noon; Sun.: 2–5 p.m.",
    description:
      "Lends out various tools. Become a member by making an account online or in person, donating what you can ($0 is okay too). Has tools for yard work, home construction, auto repair, DIY projects, and much, much more. Also a woodworking shop and seed library. Must be 18 and older. ID required to become a member.",
    categories: ["Transportation Assistance"],
  },
  {
    name: "NE Seattle Tool Library Bike Shack",
    website: "http://seattlereconomy.org/nestl/bike-shack",
    phone: "(206) 524-6062;\nbikeshack@seattlereconomy.org",
    address: "10228 Fischer Pl NE",
    hours: "Please see website for current hours",
    description:
      "A place for Tool Library members to work on their bikes with volunteer bike mechanic. The space is equipped with bike repair tools, a repair work stand, and parts available for purchase for what you can afford. Availability on a first-come, first-served basis. Fill out Request for Assistance form online to request assistance while working on your bike. The suggested donation for using the Bike Shack is $20 per hour, but no one is turned away for lack of funds.",
    categories: ["Transportation Assistance"],
  },
  {
    name: "New Beginnings",
    website: "http://newbegin.org",
    phone: "24/7 Helpline: (206) 737-0242\nOffice: (206) 783-4520",
    hours: "Helpline: 24/7 ; Office: Mon.–Fri.: 9 a.m.–5 p.m.",
    description:
      "Services include confidential housing, helpline, legal advocacy, counseling, support groups and safety planning, serving survivors with or without children, who are abused by partners in intimate relationships. Call helpline for information and intake. No fees.",
    categories: ["Survivor Support Services", "Emergency and Crisis Lines"],
  },
  {
    name: "New Bethlehem Day Center",
    website: "http://ccsww.org/services/new-bethlehem-programs",
    phone: "(425) 679-0354",
    address: "8045 120th Ave NE., No. 100\nKirkland",
    hours: "7 days a week, 10 a.m.–2 p.m.",
    description:
      "Provides essential services including: showers, laundry, computers, social services, snack and dinner. Provides grab-and-go meals, navigation to shelters and other emergency resources and social services.",
    categories: ["Shelters", "Day Centers"],
  },
  {
    name: "New Holly Learning Center",
    website: "http://southseattle.edu/programs/newholly-learning-center",
    phone: "(206) 934-6642",
    address: "7058 32nd Ave. S, No. 201",
    hours: "Mon., Wed.: 5:30—9 p.m.; Tue., Thu.: 8:30 a.m.—noon",
    description:
      "Offers assistance to individuals seeking U.S. citizenship including citizenship and ESL classes. Provides bilingual case management, free HIV education, as well as counseling, testing and referrals, early childhood education programs and general employment and adult education services. Serves low-income community members, public housing residents, immigrants and refugees. Call for information. No fees.",
    categories: ["Immigrant and Refugee Services"],
  },
  {
    name: "New Horizons",
    website: "http://nhmin.org/get-help",
    phone: "(206) 374-0866",
    address: "2709 3rd Ave",
    hours:
      "Day program: Mon., Tues., Thurs., 3–8 p.m.; Wed., 2–8 p.m.\nShelter: 9 p.m.–8 a.m. every day\nDinner: Mon.-Thurs., 7 p.m., Fri.-Sat., 9 p.m.\nExtended shelter hours: Mon.-Fri., 9 p.m.–11 a.m.",
    description:
      "Serves young people all ages up to 25. Assists with housing placement, retrieving government documents, and other barriers to exiting the streets. Young Adult Shelter (18 and older only) offers 15 resident beds and 15 first-come, first-served beds nightly, meals provided. To sign-up call 206-374-0866 between 10 a.m.–4 p.m. or stop by. Day program offers opportunity to explore interests like writing or music, and referrals to medical, health and education providers. Employment program and coaching available. A youth medical clinic is held every Wednesday.",
    categories: ["Day Centers", "Shelters", "Identification Services"],
  },
  {
    name: "New Traditions",
    website: "http://new-traditions.org",
    phone: "(206) 762-7207",
    address: "9045 16th Ave. SW",
    hours: "Mon.–Fri.: 8 a.m.–5 p.m.",
    description:
      "Chemical dependency treatment for pregnant women. Serves women who are low income and many are transient or homeless. Offers comprehensive outpatient services. Agency provides DBHR-certified service(s). Call for an appointment and service hours. No fees if client meets criteria for Apple Health (Medicaid). Sliding fee and private pay for non-Medicaid clients.",
    categories: ["Family and Maternity Services", "Drug and Alcohol Services"],
  },
  {
    name: "Nickelsville Tiny House Village, Central District",
    website: "http://nickelsville.org/union-village",
    phone: "(206) 601-0999",
    address: "805 21st Ave.",
    hours: "Walk-in: 8 a.m.–9 p.m.; Call 24 hours",
    description:
      "Resident-run tiny House Village. Call to confirm location, and for eligibility, application, and fees. Email staff@nickelsville.works",
    categories: ["Encampments"],
  },
  {
    name: "Nickelsville Tiny House Village, Northlake",
    website: "http://nickelsville.org/northlake-village",
    phone: "(206) 390-9292",
    address: "3814 Fourth Ave. NE",
    hours: "Walk-ins: 8 a.m.-9 p.m.; Call 24/7",
    description:
      "Resident-run tiny house village. Call to confirm location, and for eligibility, application, and fees. Email staff@nickelsville.works",
    categories: ["Encampments", "Survivor Support Services"],
  },
  {
    name: "North Helpline, Bitter Lake",
    website: "http://northhelpline.org/bitter-lake-food-bank",
    phone: "(206) 413-8192",
    address: "13000 Linden Ave. N",
    hours: "Sat.: 9 a.m.–1:45 p.m.",
    description:
      "Food pantry, including commodities for those experiencing homelessness. Neighboring residents may visit once per week. Homeless clients can receive one no cook bag per day. Visit in person. No fees. Serves zip codes 98115, 98125, 98133, 98155, 98177, 98011, and 98028.",
    categories: ["Food Assistance"],
  },
  {
    name: "North Helpline, Lake City",
    website: "http://northhelpline.org/lake-city-food-bank",
    phone: "(206) 367-3477",
    address: "12736 33rd Ave. NE",
    hours: "Wed., Sat.: 9 a.m.–1:45 p.m.; Thu.: 4 p.m.–6:45 p.m.",
    description:
      "Services include food banks, hygiene supplies, baby cupboard, referral services, mail services, winter time services, tenant education, financial assistance for eviction and utility shut off prevention (206) 365-8043, and free health clinic. Services for low income or homeless residents residing in 98125, 98133, 98177, 98155, 98115, 98011 and 98028. Homeless clients can receive one no cook bag per day. No fees.",
    categories: ["Financial Assistance", "Food Assistance", "Mail Services"],
  },
  {
    name: "Northwest Access Fund",
    website: "http://nwaccessfund.org",
    phone: "(206) 328-5116",
    address: "1437 S Jackson St.",
    hours: "Mon.–Fri.: 9 a.m.–5 p.m.",
    description:
      "Financial products and services designed to meet the unique needs of people with disabilities and seniors. Offers one-on-one financial coaching, referrals, group workshops, and other resources designed to meet the needs of people with disabilities with low-incomes or accessing social security benefits. Services include low interest loans to purchase wheelchairs, assistive technology, hearing aids, dentures, computer adaptations, transportation adaptations, and more.",
    categories: [
      "Financial Assistance",
      "Senior Services",
      "Disability Services",
    ],
  },
  {
    name: "Northwest Community Bail Fund",
    website: "http://nwcombailfund.org/",
    phone: "(877) 622-6223",
    hours: "Mon.–Fri.: 8 a.m.–4 p.m.",
    description:
      "Pays bail, no strings attached, for community members who cannot otherwise afford it, providing them with the opportunity to defend themselves from a position of freedom. We prioritize bail assistance for our BIPOC and LGBTQIA+, particularly transgender community members. Prioritizes health factors; pregnancy; impending loss of job; housing or shelter bed; caretaking responsibilities; and potential separation of families.",
    categories: ["Legal Services"],
  },
  {
    name: "Northwest Education Access (NWEdA)",
    website: "http://nweducationaccess.org",
    phone: "(206) 523-6200",
    description:
      "Northwest Education Access provides the individualized guidance, connections to resources, and financial support that low-income young people need to earn higher education degrees. Services include help applying to college, finding GED/high school completion Sites, placement test preparation, college readiness skill building, career exploration, finding funding, scholarships + financial aid, and connect to campus + community resources. Completely free! Much more!",
    categories: [
      "Employment and Training Services",
      "Immigrant and Refugee Services",
      "Services For People of Color",
    ],
  },
  {
    name: "Northwest Family Life",
    website: "http://northwestfamilylife.org",
    phone: "(206) 363-9601",
    address: "Call for referral",
    hours: "Mon.–Fri., 9 a.m.–5 p.m.; support group hours vary.",
    description:
      "Serves women and children who are experiencing or have experienced abuse. Offers advocacy based counseling, safety planning, education on domestic violence and referrals to legal, housing and spiritual resources. Weekly support groups. Call for appointment. Sliding fee scale for support groups.",
    categories: ["Survivor Support Services"],
  },
  {
    name: "Northwest Harvest, SODO Community Market",
    website:
      "http://northwestharvest.org/our-work/community-programs/sodo-community-market",
    phone: "(206) 625-0755",
    address: "1915 Fourth Ave. S",
    hours: "Mon.: 1:30–7:30 p.m.;  Wed., Fri.: 8 a.m.–2 p.m.",
    description:
      "Food bank services. No ID, no proof of income, and no residency information is required to shop with us.  Clients may visit once per day. Visit in person. Baby cupboard serves families with children 5 and younger. No fees.",
    categories: ["Family and Maternity Services", "Food Assistance"],
  },
  {
    name: "Northwest Immigrant Rights Project",
    website: "http://nwirp.org/get-help",
    phone: "(206) 587-4009",
    address: "615 2nd Ave., No. 400",
    hours: "Mon.–Fri., 9:30 a.m.–noon, 1–4 p.m.",
    description:
      "Direct legal representation in court, visa application support, and defends the rights of people to gain safety through asylum. Direct representation for immigrant survivors of violence, and DACA renewal (Deferred Action for Childhood Arrivals). Detention and Deportation Defense offers representation in immigration court. Also works for systemic change, and offers Community Education such as Know Your Rights Presentations, and Immigration 101 Training for Service Providers.",
    categories: ["Legal Services", "Immigrant and Refugee Services"],
  },
  {
    name: "Northwest Justice Project",
    website: "http://nwjustice.org/get-legal-help",
    phone: "Eviction help: (855) 657-8387\nOffice: (206) 464-1519",
    address: "401 2nd Ave. S, No. 407\nAppointment required.",
    hours: "Mon.–Fri., 9 a.m.–5 p.m.; Appointment required.",
    description:
      "Legal services for low-income people particularly vulnerable populations, including farm workers, Native Americans, Western State Hospital patients, veterans, victims of crime, survivors of domestic violence, and persons over 60 years old. Apply online or call 211 for a referral, or call CLEAR (Coordinated Legal Education, Advice and Referral) 1-888-201-1014. Services include public housing discrimination, workplace conditions, home foreclosure, access to government benefits, education and employment issues, lost wages, medical debt, access to courts, general civil rights. Website information is available in multiple languages.",
    categories: [
      "Survivor Support Services",
      "Native & Indigenous Services",
      "Legal Services",
    ],
  },
  {
    name: "Odessa Brown Children’s Clinic, Othello",
    website: "http://seattlechildrens.org/clinics/odessa-brown",
    phone: "(206) 987-7210",
    address: "3939 S Othello St., No. 101",
    hours: "Mon. – Fri., 7:30 a.m. – 6 p.m.; Sat. 8 a.m. – 4 p.m.",
    description:
      "Services for for infants, children and adolescents (under the age of 18). Offers medical care, immunizations, dental care, and mental health services, and WIC (a nutrition program that helps pregnant women, new mothers, and young children eat well). Also offers social worker referrals for connection to community programs such as cooking classes, swimming lessons, and local school services with many programs like student support groups.",
    categories: ["General Health Services", "Family and Maternity Services"],
  },
  {
    name: "OneAmerica",
    website: "http://weareoneamerica.org/who-we-are/about-oneamerica",
    phone: "Office: (206) 723-2203, Hotline: (844)-RAID-REP",
    address: "1225 S. Weller Street No. 430",
    hours: "Mon. – Fri., 9 a.m. – 5 p.m.",
    description:
      "One America advocates Immigrant Defense Funds for immigrants who may not be able to afford an attorney, facilitates Know-your-rights trainings, direct action, grassroots organizing, and legislative action. By calling 1-844-RAID-REP and texting JOIN to (253)-201-2833, the community can protect itself. Sign up to stay tuned for action alerts and other opportunities to get involved.",
    categories: [
      "Immigrant and Refugee Services",
      "Services For People of Color",
      "Emergency and Crisis Lines",
    ],
  },
  {
    name: "One Health Clinic",
    website: "http://onehealthclinic.org",
    phone: "(206) 685-2654",
    address: "facebook.com/OneHealthClinic",
    hours: "2nd, 4th Wed.: 2—5 p.m.",
    description:
      "Provides free veterinary care and (in collaboration with Neighborcare Health) free human healthcare to youth and young adults experiencing homelessness. Clinic inside New Horizons building",
    categories: ["Pets and Service Animals"],
  },
  {
    name: "Operation Nightwatch",
    website: "http://seattlenightwatch.org/get-help/nightwatch-shelter",
    phone: "(206) 323-4359",
    address: "302 14th Ave. S",
    hours:
      "Nightly meals: 8 p.m. – 9:30 p.m.\nNightly shelter placement: 7:30 – 10:30 p.m.",
    description:
      "Nightly meal is served and transportation is available to drop off at various shelters around the city. Blanket and a Metro bus ticket offered. Operation Nightwatch also does street outreach, and provides some senior housing units. Valid ID required. Limited shelter options for women.",
    categories: ["Shelters"],
  },
  {
    name: "Operation: Welcome One Home, For Veterans",
    website:
      "http://kcrha.org/regional-access-points/#additional-access-points-for-veterans",
    phone: "(206) 454-2799",
    address:
      "WA State Department of Veterans Affairs (WDVA) office: 2106 2nd Ave., No. 100, Seattle, WA 98121; or \nVA Puget Sound Community Outreach and Housing Services (CHOS) Renton Walk-in Clinic: 419 S 2nd St., No. 2, Renton, WA 98057",
    hours: "24/7",
    description:
      "The Washington State Department of Veteran Affairs Information and Assistance Call Center is the “Command Center” for Veterans and Neighbors to call to connect homeless Veterans to services.",
    categories: ["Veteran Services", "Housing Services"],
  },
  {
    name: "Organization for Prostitution Survivors (OPS)",
    website: "http://seattleops.org",
    phone: "(206) 337-6155",
    address: "112 SW 157th St., Burien",
    hours: "Mon. – Fri., 10 a.m. – 6 p.m.",
    description:
      "Provides trauma-informed care to survivors, by survivors. Facilitates recovery from the harms of prostitution through survivor-centered services that empower participants to heal from this system of gender-based violence.",
    categories: ["Services For People of Color", "Survivor Support Services"],
  },
  {
    name: "Otto's Place",
    website: "http://compasshousingalliance.org/emergency-programs/ottos-place",
    phone: "(206) 474-1000",
    address: "77 S Washington St.",
    hours: "Mon. – Fri., 9 a.m. – 4 p.m.",
    description:
      "Enhanced shelter with 155 personal sleeping spaces for male-identifying individuals age 18 and older, offering 24-hour access to a safe space and supports, on-site housing navigation support, case management services, and skill development opportunities, personal storage; service pets are welcome. 24/7. Operated through Compass Housing Alliance. Referrals are directed from the City of Seattle’s Hope Team.",
    categories: ["Shelters"],
  },
  {
    name: "Oxford Houses, Seattle",
    website: "http://oxfordhouse.org",
    phone: "(206) 280-7926; richard.mogel@oxfordhouse.org",
    hours: "Call any time before 9 p.m.",
    description:
      "Peer-run clean and sober housing, residents participate in recovery program. No co-ed housing. Limited housing for single adults with children. May accept women fleeing domestic violence. May take people who were formerly incarcerated, except people convicted of arson or a sex-offense. Apply directly to the house. Those who need additional help can call an outreach worker. Fees average $375 to $650 per month. Visit www.oxfordvacancies.com to find all vacancies in real time.",
    categories: ["Housing Services", "Drug and Alcohol Services"],
  },
  {
    name: "Peer Kent",
    website: "http://peerkent.org",
    phone: "(253) 277-4942",
    address: "216 W Gowe St., No. 300 \nKent, WA",
    hours: "11 a.m.  – 7 p.m.",
    description:
      "Peer Kent cultivates powerful, healthy lives by providing peer emotional support and development services to the lesbian, gay, bisexual, transgender, queer (LGBTQ) community impacted by addiction, mental health and/or HIV. Services include peer coaching. Also offers employment support and referrals to resources such as housing or medical care.",
    categories: ["Services For People of Color", "LGBTQIA+ Services"],
  },
  {
    name: "Peer Seattle",
    website: "http://peerseattle.org",
    phone: "(206) 322-2437",
    address: "1520 Bellevue Ave., No. 100",
    hours: "Open 9 a.m. – 9 p.m. every day of the year",
    description:
      "Peer emotional support and development services to the LGBTQ+ community impacted by addiction, mental health and/or HIV. Peer coaching for recovery and goals, and peer facilitated support groups to become part of a community. Offers employment support and referrals to resources such as housing or medical care.",
    categories: ["LGBTQIA+ Services"],
  },
  {
    name: "People's Harm Reduction Alliance (PHRA), Aurora Mobile",
    website: "http://phra.org",
    phone: "(206) 939-2209",
    address: "Aurora Commons back lot: 3914 Aurora Ave.",
    hours: "Mon.: noon–1 p.m.",
    description:
      "Provides supplies to drug users including new syringes, sterile injection equipment (cookers, cottons, tourniquets, alcohol pads, paperclips ‘handles’ for the cookers), overdose reversal medication naloxone (Narcan), pipes and safer smoking kits, wound care supplies, safer sex supplies, as well as donated socks, warm clothes, and survival gear.",
    categories: ["Drug and Alcohol Services"],
  },
  {
    name: "People's Harm Reduction Alliance (PHRA), Kitsap County Mobile Outreach and Delivery",
    website: "http://phra.org",
    phone: "(206) 939-2209",
    address: "Call for location",
    hours:
      "North Kitsap, Bremerton: Tue.: 9 a.m.-5 p.m.; South Kitsap, Bremerton: Thu.: 9 a.m.-5 p.m.; Bremerton: Sat.: 9 a.m.-5 p.m.",
    description:
      "Provides supplies to drug users including new syringes, sterile injection equipment (cookers, cottons, tourniquets, alcohol pads, paperclips ‘handles’ for the cookers), overdose reversal medication naloxone (Narcan), pipes and safer smoking kits, wound care supplies, safer sex supplies, as well as donated socks, warm clothes, and survival gear. Call or text for delivery: (253) 470-6534; request supplies at least a week before they run out.",
    categories: ["Drug and Alcohol Services"],
  },
  {
    name: "People's Harm Reduction Alliance (PHRA), U District",
    website: "http://phra.org",
    phone: "(206) 939-2209",
    address: "4547 Brooklyn Ave. NE",
    hours: "Tues., Thurs.: 5–7 p.m.; Fri., Sun.: 1–5 p.m.",
    description:
      "Provides supplies to drug users including new syringes, sterile injection equipment (cookers, cottons, tourniquets, alcohol pads, paperclips ‘handles’ for the cookers), overdose reversal medication naloxone (Narcan), pipes and safer smoking kits, wound care supplies, safer sex supplies, as well as donated socks, warm clothes, and survival gear.",
    categories: ["Drug and Alcohol Services"],
  },
  {
    name: "Phinney Neighborhood Association, Greenwood Senior Center",
    website: "http://phinneycenter.org/gsc",
    phone: "(206) 297-0875",
    address: "525 N 85th St.",
    hours: "Mon. – Fri., 9 a.m. – 4:30 p.m.",
    description:
      "Provides social, physical, and educational activities focused around the needs of older adults. Services include foot care, Medicare counseling, meal programs, one-on-one technology mentoring, individual counseling, support groups, memory loss programs, events and activities, and classes.",
    categories: ["Senior Services", "Food Assistance"],
  },
  {
    name: "Phinney Neighborhood Association, Social Services",
    website: "http://phinneycenter.org/social-services",
    phone: "(206) 783-2244",
    address: "6532 Phinney Ave N",
    hours:
      "Dinner served at St. John United Lutheran Church at 5515 Phinney Ave. N every Tue.: 4–6 p.m.; Wed.: 11 a.m.–1 p.m.\nDinner served at Greenwood Senior Center at 525 N 85th St. every Mon.: 4–6 p.m.",
    description:
      "Services and activities that connect neighbors and foster civic engagement. Serves hot meals. Visit in person. No fees.",
    categories: ["Senior Services", "Food Assistance"],
  },
  {
    name: "Phinney Ridge Lutheran Church - Direct Assistance and Food Bank",
    website: "http://prlc.org/serve",
    phone: "(206) 783-2350",
    address: "7500 Greenwood Ave. N",
    hours: "Tue.: 1:15–3 p.m.; Wed.: 6:15–8 p.m.",
    description:
      "Direct financial assistance for individuals or families in need of help including help with rent, a utility bill, or gasoline for a car. Email outreach@prlc.org to be screened for assistance. Food Bank is open to all without any zip code restrictions. ID preferred on first visit, but not required. If you need food you will get it.",
    categories: ["Financial Assistance", "Food Assistance"],
  },
  {
    name: "Pike Market Food Bank",
    website: "http://pmsc-fb.org/food-bank",
    phone: "(206) 626-6462",
    address: "1531 Western Ave. (Level P5 of Pike Place Market parking garage)",
    hours: "Tues., Thurs., noon – 3 p.m.; Wed., 3 p.m. – 7 p.m.",
    description:
      "Serves residents of all ages in the 98101, 98104, or 98121 zip codes, and people who are homeless living in downtown Seattle. Groceries available once per week. Bring ID (if you have it, ID is not a requirement), and a grocery bag if you have it. Notify staff/volunteers if you have mobility issues and cannot stand in line. Visit in person. No fees.",
    categories: ["Food Assistance"],
  },
  {
    name: "Pike Market Senior Center and Food Bank",
    website: "http://pmsc-fb.org",
    phone: "Food bank: (206) 626-6462; seniors center: (206) 728-2773",
    address:
      "Food bank: 1531 Western Ave., Level 5 of parking garage; senior center: 85 Pike St. No. 200",
    hours:
      "Walk-in grocery: Tue.: noon–3 p.m.; Wed.: 3–7 p.m.; Thu.: noon–3 p.m.; meals served daily at senior center: breakfast: 8:20–9 a.m.; weekday lunch: noon–1 p.m.; weekend lunch: 11:30 a.m.-12:30 p.m.",
    description:
      "Services and activities for people age 55 and up. Breakfasts and hot lunches served daily. Walk-in Grocery Program provides groceries once a week for anyone who lives or works in or around Pike Place Market. Services available in Spanish and Tagalog.",
    categories: ["Food Assistance", "Senior Services"],
  },
  {
    name: "Pioneer Human Services, Co-occurring Residential Program, Everett",
    website: "http://pioneerhumanservices.org/treatment/centers?tid=17",
    phone: "(425) 610-2075",
    address: "902 Pine Street\nEverett, WA",
    description:
      "Pioneer’s Co-occurring Residential Program (CORP) in Everett is a 32-bed facility that provides specialized residential treatment for men and women with co-occurring (mental health and substance use disorders) and opiate use disorders. Private pay (cash) clients will be considered on a case-by-case basis and require extra steps. Any Washington state resident is potentially eligible.",
    categories: ["Drug and Alcohol Services"],
  },
  {
    name: "Pioneer Human Services, Housing",
    website: "http://pioneerhumanservices.org/housing/list?tid=5#0",
    phone: "(206) 717-0240",
    address: "1717 Belmont Ave.",
    hours: "Mon. – Fri.: 9 a.m. – 4 p.m.",
    description:
      "Pioneer Human Services provides substance use disorder treatments, affordable housing, mental health counseling, job readiness training, and employment services. To apply call for services call (206) 768-1990, for Seattle housing call (206) 717-0240 or email: housing@p-h-s.com; or visit in person.",
    categories: [
      "Drug and Alcohol Services",
      "Re-entry Assistance",
      "Housing Services",
      "Re-entry Assistance",
    ],
  },
  {
    name: "Pioneer Human Services, Job Readiness Training",
    website: "http://pioneerhumanservices.org/job-skills/Job-readiness",
    phone: "(206) 768-7333",
    address: "7000 Highland Park Way SW",
    hours: "Mon.–Fri.: 9 a.m.–1 p.m.",
    description:
      "Helps develop skills to find and maintain employment. Five days per week for three weeks. Referrals accepted by a probation/corrections officer, case manager, therapist or self. Offers connections to apprenticeships programs. Seattle and Spokane Roadmap to Success job readiness training programs accepting applications online for virtual and in-person programs.",
    categories: ["Employment and Training Services", "Re-entry Assistance"],
  },
  {
    name: "Pioneer Human Services - King County Diversion Center",
    website: "http://pioneerhumanservices.org/treatment/centers?tid=19#0",
    phone: "(206) 349-0165",
    address: "400 Yesler Ave.",
    hours: "Daily: 5 p.m. – 7 a.m.",
    description:
      "A safe setting for people who are chronically homeless and inebriated to get sober and sleep so they do not end up in local hospitals and jails. There is no application process. Services include: Medically monitored diversion center, sleeping accommodations, nourishment, substance use disorder and mental health assessment referrals, referrals for counseling offsite, intensive case management, help with housing, medical and social needs.",
    categories: ["Drug and Alcohol Services"],
  },
  {
    name: "Pioneer Human Services - Residential Reentry Programs",
    website: "http://pioneerhumanservices.org/programs/list?tid=12#0",
    phone: "(206) 667-9674",
    address: "220 11th Ave.",
    hours: "Mon. – Fri.: 9 a.m. – 5 p.m.",
    description:
      "Serves men and women referred from federal prison. 60-bed facility that houses both males and females. Provides both in-house substance abuse treatment, and referrals for mental health/substance abuse treatment, job and life skills, educational opportunities and financial planning. Provides case management and employment assistance.",
    categories: ["Drug and Alcohol Services", "Re-entry Assistance"],
  },
  {
    name: "Pioneer Square Medical Clinic",
    website: "http://uwmedicine.org/locations/pioneer-square",
    phone: "(206) 744-1500",
    address: "206 3rd Ave. S",
    hours: "Tues., Thurs., Fri.: 8:15 a.m.—4 p.m.; Wed.: 9 a.m.—4 p.m.",
    description:
      "Serves adults 18 and older who are low income, homeless, or without health insurance. Free for people experiencing homelessness. Services include podiatry/foot care, social services, dietician consultations and health education. An on-site pharmacy fills prescriptions by clinic providers. Mental healthcare, specialty services, and hospitalization are available to patients if needed.",
    categories: ["General Health Services", "Mental Health Services"],
  },
  {
    name: "Planned Parenthood - Central District Health Center",
    website:
      "http://plannedparenthood.org/health-center/washington/seattle/98122/central-district-health-center-3309-91810",
    phone: "(800) 769-0045",
    address: "2001 E Madison St.",
    hours:
      "Mon., Tues., Wed., Fri.: 8:30 a.m.—4:30 p.m.; Tues.: 7:30 a.m.—7 p.m.; Sat.: 8 a.m. - 4 p.m.; opens at 10:30 a.m. on 2nd Fri.",
    description:
      "High-quality, affordable health care with or without insurance. Services include men's health care, pregnancy testing and services, sexually transmitted Disease (STD) testing, treatment and vaccines, women's health care, HIV services, and LGBTQ+ services. Language interpretation by telephone available by request.",
    categories: [
      "HIV/AIDS Services",
      "Womxn's Health Services",
      "General Health Services",
      "Family and Maternity Services",
    ],
  },
  {
    name: "Planned Parenthood - Northgate",
    website:
      "http://plannedparenthood.org/health-center/washington/seattle/98133/northgate-health-center-3975-91810",
    phone: "(800) 769-0045",
    address: "1200 N Northgate Way",
    hours:
      "Tues.: 9 a.m.—5 p.m.; Wed.: 10 a.m.—6 p.m.; Thurs.-Sat.: 8:30 a.m.—4:30 p.m.",
    description:
      "High-quality, affordable health care with or without insurance. Services include men's health care, pregnancy testing and services, sexually transmitted Disease (STD) testing, treatment and vaccines, women's health care, HIV services, and LGBTQ+ services. Language interpretation by telephone available by request.",
    categories: [
      "Womxn's Health Services",
      "Family and Maternity Services",
      "General Health Services",
      "HIV/AIDS Services",
    ],
  },
  {
    name: "Planned Parenthood - University District Health Center",
    website:
      "http://plannedparenthood.org/health-center/washington/seattle/98105/university-district-health-center-2532-91810",
    phone: "(800) 769-0045",
    address: "5020 Roosevelt Way NE",
    hours:
      "Mon.: 10:30 a.m.—6:30 p.m.; Tues.-Thurs.: 9 a.m.—5 p.m.; Fri.: 8:30 a.m.—4:30 p.m.",
    description:
      "High-quality, affordable health care with or without insurance. Services include men's health care, pregnancy testing and services, sexually transmitted Disease (STD) testing, treatment and vaccines, women's health care, HIV services, and LGBTQ+ services. Language interpretation by telephone available by request.",
    categories: [
      "Womxn's Health Services",
      "Family and Maternity Services",
      "HIV/AIDS Services",
      "General Health Services",
    ],
  },
  {
    name: "Planned Parenthood - White Center & West Seattle",
    website:
      "http://plannedparenthood.org/health-center/washington/seattle/98106/white-center-health-center-4161-91810",
    phone: "(800) 769-0045",
    address: "9942 8th Ave. SW",
    hours:
      "Mon.:8:30 a.m.—4:30 p.m.; Tues.: 11 a.m.—7 p.m.; Wed. and Fri.: 8:30 a.m.—4:30 p.m.; Thurs.: 9 a.m.—5 p. m.",
    description:
      "High-quality, affordable health care with or without insurance. Services include men's health care, pregnancy testing and services, sexually transmitted Disease (STD) testing, treatment and vaccines, women's health care, HIV services, and LGBTQ+ services. Language interpretation by telephone available by request.",
    categories: [
      "Family and Maternity Services",
      "Womxn's Health Services",
      "General Health Services",
      "HIV/AIDS Services",
    ],
  },
  {
    name: "Plymouth Housing",
    website: "http://plymouthhousing.org",
    phone: "(206) 374-9409; rent@plymouthhousing.org",
    address: "2113 3rd Ave.",
    hours: "Mon.–Fri.: 9 a.m.—4 p.m.",
    description:
      "Provides permanent supportive housing for services tailored to each resident’s individual needs, and may include: On-site nursing, medical care, behavioral health treatment, substance use treatment, hospice care, veterans counseling, family reunification, money management, community activities and outings. The first step for somebody seeking housing is to fill out a housing assessment at a Regional Access Point. In Seattle call (206) 328-5900 for appointment.",
    categories: ["Housing Services"],
  },
  {
    name: "POCAAN, Best Starts for Kids Homelessness Prevention",
    website: "http://pocaan.org/best-start",
    phone: "(206) 322-7061",
    address: "4437 Rainier Ave. S",
    hours: "Mon.–Fri.: 10 a.m.—5 p.m.; Sat.: noon—3 p.m.",
    description:
      "Who It's For: BIPOC (Black, Indigenous, People of Color) and LGBTQ+ (Lesbian, Gay, Bisexual, Transgender, Queer)+ youth and families unable to pay rent or mortgage. What it Provides: Rental assistance, budget management, and landlord negotiations where possible to help individuals remain in their home.",
    categories: [
      "Financial Assistance",
      "Housing Services",
      "LGBTQIA+ Services",
      "Services For People of Color",
    ],
  },
  {
    name: "POCAAN, Breaking the Chains of Addiction",
    website: "http://pocaan.org/breaking-addiction",
    phone: "(206) 322-7061",
    address: "4437 Rainier Ave. S",
    hours: "Mon.–Fri.: 10 a.m.—5 p.m.; Sat.: noon—3 p.m.",
    description:
      "Who It's For: BIPOC (Black, Indigenous, People of Color) individuals living with HIV and struggling with addiction. What it Provides: A comprehensive counseling program that offers a safe way to recover from addiction with support services from a certified Substance Use Disorder Professional who has first-hand experience with addiction and recovery.\n\n​",
    categories: [
      "HIV/AIDS Services",
      "Drug and Alcohol Services",
      "LGBTQIA+ Services",
      "Services For People of Color",
    ],
  },
  {
    name: "POCAAN, Curb",
    website: "http://pocaan.org/curb",
    phone: "(206) 322-7061",
    address: "4437 Rainier Ave. S",
    hours: "Mon.–Fri.: 10 a.m.—5 p.m.; Sat.: noon—3 p.m.",
    description:
      "Communities Uniting Rainier Valley and Beyond (CURB) provides systems navigation and trauma intervention activities for individuals harmed by the criminal legal system in Seattle who are between the ages of 18 to 24-years-old. Provides Substance abuse / mental health referral, housing referral, employment preparation, and training, education / GED completion, transportation assistance, and food and clothing referral. Particularly for BIPOC (Black, Indigenous, People of Color) and LGBTQ (Lesbian, Gay, Bisexual, Transgender, Queer)+.",
    categories: [
      "Services For People of Color",
      "Legal Services",
      "Re-entry Assistance",
      "LGBTQIA+ Services",
      "Survivor Support Services",
    ],
  },
  {
    name: "POCAAN, KONNECT II",
    website: "http://pocaan.org/konnect",
    phone: "(206) 322-7061",
    address: "4437 Rainier Ave. S",
    hours: "Mon.–Fri.: 10 a.m.—5 p.m.; Sat.: noon—3 p.m.",
    description:
      "Who It's For: BIPOC (Black, Indigenous, People of Color) individuals with a primary care doctor, who are either newly diagnosed or living with HIV, and could benefit from additional support services. What it Provides: Medical case management to augment primary care services with access to housing, food, transportation, assistance with medications, and counseling.\n\n​",
    categories: [
      "LGBTQIA+ Services",
      "Services For People of Color",
      "HIV/AIDS Services",
    ],
  },
  {
    name: "POCAAN, MOCHA PrEP CLINIC",
    website: "http://pocaan.org/mocha-prep-v1",
    phone: "(206) 322-7061",
    address: "901 Rainier Ave. N B103",
    hours: "Mon.–Fri.: 10 a.m.—4 p.m., Sat. noon — 4 p.m.",
    description:
      "For BIPOC (Black, Indigenous, People of Color) individuals wishing to reduce the chances of acquiring HIV. Provides a safe and culturally sensitive space to get access to PrEP (one pill, once a day, that reduces your risk of HIV). Access to medication, including payment assistance. For urgent need or request for PrEP or PEP, email and include “Urgent” in the subject line. Also offers immediate HIV/STI TESTING, and post-counseling. Request a 21-day window period between your last possible exposure and the date of your appointment in order to maximize test accuracy.",
    categories: [
      "HIV/AIDS Services",
      "Services For People of Color",
      "LGBTQIA+ Services",
    ],
  },
  {
    name: "POCAAN, People of Color Against AIDS Network",
    website: "http://pocaan.org",
    phone: "(206) 322-7061",
    address: "4437 Rainier Ave. S",
    hours: "Mon.–Fri.: 10 a.m.—5 p.m.; Sat.: noon—3 p.m.",
    description:
      "POCAAN's programs range from health and educational services, to counseling and rehabilitation for BIPOC (Black, Indigenous, People of Color) as well as LGBTQ+ (Lesbian, Gay, Bi, Trans, Queer)+ individuals in the Seattle area.",
    categories: ["Services For People of Color", "LGBTQIA+ Services"],
  },
  {
    name: "POCAAN, Senior Mobile Clinic",
    website: "http://pocaan.org/senior-mobile-medical",
    phone: "(206) 322-7061",
    address: "4437 Rainier Ave. S",
    hours: "Mon.–Fri.: 10 a.m.—5 p.m.; Sat.: noon—3 p.m.",
    description:
      "A mobile van that makes regular visits to senior centers to provide basic onsite medical care for people of color age 55 and above. Services are requested and arranged by the senior center and provided at their location. For BIPOC (Black, Indigenous, People of Color) individuals living with HIV and struggling with addiction. \n\n​",
    categories: [
      "Services For People of Color",
      "Senior Services",
      "General Health Services",
      "HIV/AIDS Services",
      "LGBTQIA+ Services",
    ],
  },
  {
    name: "POCAAN, TRANS* ECONOMIC EMPOWERMENT",
    website: "http://pocaan.org/trans-empowerment",
    phone: "(206) 322-7061",
    address: "4437 Rainier Ave. S",
    hours: "Mon.–Fri.: 10 a.m.—5 p.m.; Sat.: noon—3 p.m.",
    description:
      "Services for transgender, non-binary/gender non-conforming, and gender diverse BIPOC (Black, Indigenous, People of Color) individuals. Helps uplift and support those feeling left out of traditional occupational support systems through job search, assistance in building a new business or helping an existing business thrive, networking, and economic opportunities.\n\n​",
    categories: [
      "Services For People of Color",
      "LGBTQIA+ Services",
      "Employment and Training Services",
    ],
  },
  {
    name: "POCAAN, Victims of Crime Act Services",
    website: "http://pocaan.org/programs-services",
    phone: "(206) 322-7061",
    address: "4437 Rainier Ave. S",
    hours: "Mon.–Fri.: 10 a.m.—5 p.m.; Sat.: noon—3 p.m.",
    description:
      "For victims of abuse, survivors of sexual assault, individuals affected by trafficking and domestic violence survivors. Provides emergency financial assistance and mental health services and support.\n\n​",
    categories: [
      "Survivor Support Services",
      "Financial Assistance",
      "Mental Health Services",
    ],
  },
  {
    name: "PorchLight",
    website: "http://porchlightcares.org",
    phone: "425-698-1295",
    address: "13668 SE Eastgate Way \nBellevue, WA",
    hours:
      "Rotating shelter for men: 7 p.m. – 7 a.m.; call before visiting in person",
    description:
      "Day center and emergency shelter for men Men's programs offer permanent housing, rotating shelter, emergency shelter, day center, and case management. Shelter space first-come, first-served basis, priority going to men who spent the previous night at the shelter. In addition to accessing case management supports, the men are able to obtain three meals a day, washers, dryers, showers, and haircuts. Must have a current state picture I.D. Must allow CFH to run a criminal background check - anyone with a sex offense crime cannot be a member of the shelter. Must be willing to be drug- and alcohol-free, and willing to address any addiction issues. Must be willing to work one-on-one with a Housing Navigator.",
    categories: ["Shelters", "Day Centers"],
  },
  {
    name: "Praisealujah",
    website: "http://praisealujah.org/discipleship-training",
    phone:
      "Office (206) 504-8845\nWomen's program (206) 226-5994; \nMen's program (206) 307-9166",
    address: "20832 International Boulevard\nSeaTac, WA",
    hours: "Mon. – Sat., 9 a.m. – 3:30 p.m.",
    description:
      "Faith Based Treatment facility to assist men and women who are struggling with opioid, fentanyl, and other substance abuse, situations/circumstances caused by alcohol addiction, drug addiction, abuse, homelessness, emotional trauma, loss, and hopelessness. Intensive 6 month to one-year program, with faith-based perspective.  Phase 1: a program fee for first 30 days is $500.00 or 1/3 of resident’s income will be charged. If participants are indigent, scholarships may possibly be arranged on a case-by-case basis. Program fees cover room, board and all food and hygiene items. Phase 2: additional $500 for 31 to 90 days. Offers food assistance.",
    categories: ["Food Assistance", "Drug and Alcohol Services"],
  },
  {
    name: "Providence Regina House",
    website: "http://providence.org/locations/wa/regina-house",
    phone: "(206) 763-9204",
    address: "8201 10th Ave. S",
    hours:
      "Food pantry: Thurs., 12:30 – 2 p.m.; Sat., 9 a.m. – noon; Baby cupboard: First Saturday, 9 a.m. – 12:00",
    description:
      "Weekly food and clothing bank at South Park Neighborhood Center Food pantry. May visit every week. Serves those who are homeless or in ZIP codes 98108, 98148, 98168 and 98188. Documents required: ID and proof of current address. No fees.",
    categories: ["Clothing Assistance", "Food Assistance"],
  },
  {
    name: "QLaw Foundation of Washington",
    description:
      "Offers assistance statewide for civil legal issues through two different virtual Legal Clinics that are hosted several times a month. Provides free consultations with attorneys who help clients understand their legal issues, suggest possible next steps, review and assist with completing legal forms, and provide appropriate referrals. These attorneys are NOT able to represent you directly.",
    categories: ["Legal Services", "LGBTQIA+ Services"],
  },
  {
    name: "Q-Law LGBTQ Legal Clinic",
    website: "http://qlawfoundation.org/legal-clinics",
    phone:
      "To make an appointment, self-schedule online or call (206) 483-2725 ext. 102 please leave a voicemail for a callback.",
    address: "Mailing Address: 400 E Pine St, Suite 225",
    hours:
      "Legal Clinics are held over the phone for 2SLGBTQIA+ and over Zoom for Transgender Legal Clinic.",
    description:
      "QLaw Foundation of Washington offers assistance statewide for civil legal issues through two different virtual Legal Clinics (+2SLGBTQIA+ Legal Clinic and Transgender Legal Clinic) that are hosted several times a month. Our Legal Clinics provide free consultations with one of our amazing volunteer attorneys. These attorneys can help clients understand their legal issues, suggest possible next steps, review and assist with completing legal forms, and provide appropriate referrals. These attorneys are NOT able to represent you directly.",
    categories: ["Legal Services", "LGBTQIA+ Services"],
  },
  {
    name: "Queen Anne Food Bank",
    website: "http://sacredheartseattle.org/qafb",
    phone: "(530) 301-5794",
    address: "205 Second Ave North",
    hours:
      "Meals Mon. - Fri. 8:30 a.m. - 11: 30 a.m.\nFood Pantry Thurs. 1:00 p.m. - 2:30 p.m.",
    description:
      "Meals, sack lunches and a food pantry. Visit in person. Meals serves everyone. Offers hats, socks, toiletries when available. No fees.",
    categories: ["Food Assistance"],
  },
  {
    name: "Queen Anne Helpline",
    website: "http://queenannehelpline.org",
    phone: "(206) 282-1540",
    address: "311 W McGraw St.",
    hours: "Mon.10 a.m. – 2 p.m.; Thurs. 10 a.m. – 6 p.m.",
    description:
      "Adult clothing, non-perishable food, bus tickets, and other no-fee resources available for pickup once every 30 days. Financial assistance (rent, utilities, and/or move-in costs) for low-income residents housed within zip codes 98109, 98119, and 98199. Call anytime.",
    categories: ["Financial Assistance", "Clothing Assistance"],
  },
  {
    name: "Rainier Recovery",
    website: "http://rainierrecovery.com",
    phone: "(253) 544-4772",
    address: "4909 108th St. SW, Lakewood, WA",
    hours: "Mon.—Fri.: 8 a.m.—8 p.m., Sat.: 8 a.m.—3 p.m.",
    description:
      "Substance Use Disorder and Mental Health Disorder Treatment services. Medication Assisted Treatment, Peer Support, Jail Reentry, Case Management, Housing and Employment Support, Anger Management and Domestic Violence MRT and Victims Impact Panel. Accepts insurance and Medicaid.",
    categories: ["Drug and Alcohol Services", "Re-entry Assistance"],
  },
  {
    name: "Rainier Valley Food Bank",
    website: "http://rvfb.org",
    phone: "(206) 723-4105",
    address: "9021 Rainier Ave. S",
    hours:
      "Grocery mobile market: Tue: 1–3 p.m.; Wed: 9–11 a.m.; Odessa Brown Clinic (for clinic clients of only) Wed.: 11 a.m.–1 p.m.\nTo go sack lunches: Tue.–Sat: 10 a.m.–2 p.m.\nHome delivery: Tue., Wed. by appointment only",
    description:
      "Sack lunches to go and food home delivery. Grocery mobile markets: Tuesdays at Garfield Community Center Outreach; Wednesdays at Rainier Beach Library. Visit website to sign up for home delivery. Community Coordinator on site to assist with help finding and applying for benefits such as SNAP, housing, clothing, transportation, and healthcare.",
    categories: ["Food Assistance"],
  },
  {
    name: "Real Change",
    website: "http://realchangenews.org",
    phone: "(206) 441-3247",
    address: "96 S Main St.",
    hours:
      "Mon., Tues., Thur.: 8:30 a.m.–2 p.m., Wed. and Fri.: 8:30 a.m.–4 p.m.",
    description:
      "Immediate low-barrier work opportunity for all, earning income by selling the weekly newspaper. No ID required. Provides access to services for participants of work program including case management, food assistance, referrals, medical and veterinary care, mailboxes, computer lab, and more. Creates and distributes this guidebook. Also available online at www.emeraldcityresourceguide.org",
    categories: ["Employment and Training Services"],
  },
  {
    name: "Real Escape from the Sex Trade",
    website: "http://restsurvivors.org/services/overview",
    phone: "24/7 Hotline (206) 451-7378\nHOTLINE@IWANTREST.COM",
    address: "4215 Rainier Ave. S Suite B",
    hours: "24/7 Hotline (206) 451-7378 text and call at any time.",
    description:
      "Serves individuals of all ages and genders who have been trafficked or involved in the sex trade—which can mean anything from trading sex for money or survival, to stripping, to being forced to sell sex by someone else. Offers a community of support, a women's shelter and housing, and resources like housing, employment, healthcare, transportation, rental assistance which opens 1st of each month at noon and closes when ten applications are received, mental health and chemical dependency services. Call or text the 24/7 Hotline (206) 451-7378.",
    categories: ["Survivor Support Services"],
  },
  {
    name: "Recovery Cafe, SODO",
    website: "http://recoverycafe.org/recovery-cafe-sodo",
    phone: "(206) 333-2314",
    address: "4202 6th Ave. S",
    hours:
      "Cafe: Mon.–Fri.: 9 a.m.–3 p.m.; brunch: 10:30 a.m.–12:30 p.m.; lunch: 1:30–2:30 p.m.; Health Center: Tue., Wed.: 9 a.m.–3:30 p.m.",
    description:
      "A community of individuals who have been traumatized by homelessness, addiction and other mental health challenges. The Café is a place to gather together for a refuge for healing and hope. Members receive meals, recovery classes, peer support and referrals. Visit to sign up for a New Member Introduction, serves everyone.",
    categories: ["Drug and Alcohol Services", "Mental Health Services"],
  },
  {
    name: "Recovery Cafe, South Lake Union",
    website: "http://recoverycafe.org",
    phone: "(206) 374-8731",
    address: "2022 Boren Ave.",
    hours:
      "Tue.–Sat.: noon–6 p.m.; new member introduction: Tue., Sat.: 2 p.m.",
    description:
      "A community of individuals who have been traumatized by homelessness, addiction and other mental health challenges. The Café is a place to gather together for a refuge for healing and hope. Members receive meals, recovery classes, peer support and referrals. Visit to sign up for a New Member Introduction, serves everyone.",
    categories: ["Mental Health Services", "Drug and Alcohol Services"],
  },
  {
    name: "Refugee Federation Service Center",
    website: "http://rfsc.org",
    phone: "(206) 501-4121",
    address: "1209 Central Ave S suite 134, \nKent, WA",
    hours: "Mon. – Fri. 9 a.m. – 5 p.m.",
    description:
      "Employment and training services, citizenship application and advocacy, assistance with immigration paperwork, ESL classes, information and referral, family counseling and translation services, serving low-income refugees and immigrants. No fees.",
    categories: ["Immigrant and Refugee Services"],
  },
  {
    name: "Refugee Women’s Alliance (REWA)",
    website: "http://rewa.org",
    phone: "(206) 721-0243",
    address: "4008 MLK Jr. Way S",
    hours: "Mon.–Fri.: 9 a.m.–5 p.m.",
    description:
      "Provides refugee and immigrant women and their families with culturally and linguistically appropriate services: English as a Second Language (ESL), employment and vocational training, housing and homelessness prevention, domestic violence intervention, and support for sexual assault survivors, licensed behavioral health, naturalization and legal services, senior nutrition and wellness, early learning centers, and youth programs. No fees.",
    categories: ["Immigrant and Refugee Services", "Survivor Support Services"],
  },
  {
    name: "Regional Access Point, East King County, Bellevue",
    website: "http://kcrha.org/regional-access-points",
    phone: "(206) 328-5900 leave message for call back.",
    address: "11920 NE 80th St #100 \nKirkland, WA",
    hours: "By appointment only. Drop-in time is Wed. 9 a.m.",
    description:
      "Regional Access Points (RAPs) are resource centers where people who are homelessness can get help finding housing and resources. RAPs are the entry point to Coordinated Entry for All (CEA). CEA is a referral service for housing in King County. CEA connects all people who are homeless (single adults, young adults, couples, families, and veterans) to housing. You can contact any Regional Access Point location. You are eligible for CE services if you are sleeping outside, or a place not meant for human habitation like a car, tent, staying in a shelter, fleeing/attempting to flee domestic violence, exiting an institution, and Young Adults ages 17 to 24 who are homelessness or about to become homeless. Contact the CEA services at the Regional Access Points.",
    categories: ["Housing Services"],
  },
  {
    name: "Regional Access Point, North Seattle",
    website: "http://kcrha.org/regional-access-points",
    phone: "(206) 694-6833",
    address: "1501 N. 45th Street\nLocated at Solid Ground – North Seattle",
    hours:
      "Call: Mon. – Fri. 8:30 a.m. – 5 p.m.\nWalk-in hours are Wednesdays from 11:00 am – 1:00 pm, first-come first-served as time allows.",
    description:
      "Regional Access Points (RAPs) are resource centers where people who are homelessness can get help finding housing and resources. RAPs are the entry point to Coordinated Entry for All (CEA). CEA is a referral service for housing in King County. CEA connects all people who are homeless (single adults, young adults, couples, families, and veterans) to housing. You can contact any Regional Access Point location. You are eligible for CEA services if you are sleeping outside, or a place not meant for human habitation like car, tent, staying in a shelter, fleeing/attempting to flee domestic violence, exiting an institution, and Young Adults ages 17 to 24 who are homelessness or about to become homeless. Contact the CEA services at the Regional Access Points.",
    categories: ["Housing Services"],
  },
  {
    name: "Regional Access Point, Seattle",
    website: "http://kcrha.org/regional-access-points",
    phone: "(206) 328-5900 leave message for call back",
    address: "100 23rd Ave. S \nBy appointment",
    hours:
      "Call: Mon. – Fri. 9 a.m. – 5 p.m. Due to demand, call this voicemail line, and leave a message for a call back.\nCEA services are by appointment only. Drop-in clients can try Tues 9 a.m. at this location, but often cannot be accommodated.",
    description:
      "Regional Access Points (RAPs) are resource centers where people who are homelessness can get help finding housing and resources. RAPs are the entry point to Coordinated Entry for All (CEA). CEA is a referral service for housing in King County. CEA connects all people who are homeless (single adults, young adults, couples, families, and veterans) to housing. You can contact any Regional Access Point location. You are eligible for CEA services if you are sleeping outside, or a place not meant for human habitation like car, tent, staying in a shelter, fleeing/attempting to flee domestic violence, exiting an institution, and Young Adults ages 17 to 24 who are homelessness or about to become homeless. Contact the CEA services at the Regional Access Points.",
    categories: ["Housing Services"],
  },
  {
    name: "Regional Access Point, South King County, Federal Way",
    website: "http://kcrha.org/regional-access-points/",
    phone: "(253) 874-6718 \nemail RAP@mschelps.org",
    address:
      "1200 S. 336th St.\nFederal Way, WA \nLocated in the Multi-Service Center",
    hours: "Calls answered Wednesday 2 – 5 or leave one message.",
    description:
      "Regional Access Points (RAPs) are resource centers where people who are homelessness can get help finding housing and resources. RAPs are the entry point to Coordinated Entry for All (CEA). CEA is a referral service for housing in King County. CEA connects all people who are homeless (single adults, young adults, couples, families, and veterans) to housing. You can contact any Regional Access Point location. You are eligible for CEA services if you are sleeping outside, or a place not meant for human habitation like car, tent, staying in a shelter, fleeing/attempting to flee domestic violence, exiting an institution, and Young Adults ages 17 to 24 who are homelessness or about to become homeless. Contact the CEA services at the Regional Access Points.",
    categories: ["Housing Services"],
  },
  {
    name: "Regional Access Point, South King County, Renton",
    website: "http://kcrha.org/regional-access-points",
    phone: "(425) 523-1377",
    address: "1010 S 2nd St.\nRenton, WA\nLocated at YWCA Renton",
    hours: "Mon. – Fri. 9 a.m. – 5 p.m. Saturday hours by appointment only.",
    description:
      "Regional Access Points (RAPs) are resource centers where people who are homelessness can get help finding housing and resources. RAPs are the entry point to Coordinated Entry for All (CEA). CEA is a referral service for housing in King County. CEA connects all people who are homeless (single adults, young adults, couples, families, and veterans) to housing. You can contact any Regional Access Point location. You are eligible for CEA services if you are sleeping outside, or a place not meant for human habitation like car, tent, staying in a shelter, fleeing/attempting to flee domestic violence, exiting an institution, and Young Adults ages 17 to 24 who are homelessness or about to become homeless. Contact the CEA services at the Regional Access Points.",
    categories: ["Housing Services"],
  },
  {
    name: "Regional Access Point, Young Adults, Downtown Seattle",
    website: "http://kcrha.org/regional-access-points",
    phone:
      "(206) 622-5555 YouthCare’s Orion Center; \n(206) 374-0866 New Horizons",
    address:
      "YouthCare’s Orion Center 1828 Yale Avenue, Seattle, WA 98101\nNew Horizons 2709 Third Avenue, Seattle, WA 98121",
    hours:
      "YouthCare’s Orion Center Drop In: Mon. - Fri. 3 – 6 p.m., Sat. 10 a.m. - 2 p.m.\nNew Horizons Drop in: Mon. – Thurs. 3 – 8 p.m.",
    description:
      "Regional Access Points (RAPs) are resource centers where people who are homelessness can get help finding housing and resources. RAPs are the entry point to Coordinated Entry for All (CEA). CEA is a referral service for housing in King County. CEA connects all people who are homeless (single adults, young adults, couples, families, and veterans) to housing. You can contact any Regional Access Point location. You are eligible for CEA services if you are sleeping outside, or a place not meant for human habitation like car, tent, staying in a shelter, fleeing/attempting to flee domestic violence, exiting an institution, and Young Adults ages 17 to 24 who are homelessness or about to become homeless. Contact the CEA services at the Regional Access Points.",
    categories: ["Housing Services"],
  },
  {
    name: "Regional Access Point, Young Adults, East King County",
    website: "http://kcrha.org/regional-access-points",
    phone: "(425) 449-3868",
    address:
      "12735 Willows Rd NE (between 139th Ave NE to the north and 141st Ave NE to the south)\nKirkland, WA",
    hours: "Drop in: Everyday: 9 a.m. – 8 p.m.",
    description:
      "Regional Access Points (RAPs) are resource centers where people who are homelessness can get help finding housing and resources. RAPs are the entry point to Coordinated Entry for All (CEA). CEA is a referral service for housing in King County. CEA connects all people who are homeless (single adults, young adults, couples, families, and veterans) to housing. You can contact any Regional Access Point location. You are eligible for CEA services if you are sleeping outside, or a place not meant for human habitation like car, tent, staying in a shelter, fleeing/attempting to flee domestic violence, exiting an institution, and Young Adults ages 17 to 24 who are homelessness or about to become homeless. Contact the CEA services at the Regional Access Points.",
    categories: ["Housing Services"],
  },
  {
    name: "Regional Access Point, Young Adults, South King County, Auburn",
    website: "http://kcrha.org/regional-access-points",
    phone: "(253) 740-7189",
    address: "932 Auburn Way S, Auburn",
    hours: "Drop in: Mon., Wed., Fri.: 1–4:30 p.m.",
    description:
      "Resource centers where people who are homelessness can get help finding housing and resources. RAPs are the entry point to Coordinated Entry for All (CEA). CEA is a housing referral service for people experiencing homelessness in King County.",
    categories: ["Housing Services"],
  },
  {
    name: "Regional Access Point, Young Adults, University District",
    website: "http://kcrha.org/regional-access-points",
    phone: "(206) 522-4366",
    address: "University District Youth Center\n4516 15th Ave. NE",
    hours: "Tues. and Thurs.: noon — 3 p.m.",
    description:
      "Regional Access Points (RAPs) are resource centers where people who are homelessness can get help finding housing and resources. RAPs are the entry point to Coordinated Entry for All (CEA). CEA is a referral service for housing in King County. CEA connects all people who are homeless (single adults, young adults, couples, families, and veterans) to housing. You can contact any Regional Access Point location. You are eligible for CEA services if you are sleeping outside, or a place not meant for human habitation like a car, tent, staying in a shelter, fleeing/attempting to flee domestic violence, exiting an institution, and Young Adults ages 17 to 24 who are homelessness or about to become homeless. Contact the CEA services at the Regional Access Points.",
    categories: ["Housing Services"],
  },
  {
    name: "Renewal Food Bank",
    website: "http://renewalfoodbank.org",
    phone: "(425) 736-8132",
    address: "15022 Bel-Red Rd, Bellevue",
    hours: "Mon: noon–3 p.m., Tue: 4–6:30 p.m., Wed: 10 a.m.–1 p.m.",
    description:
      "Grocery-style food bank. Visit once per week. No appointments. Line numbers are distributed 30 minutes prior to opening. Pack and bring your own bags.",
    categories: ["Food Assistance"],
  },
  {
    name: "Roanoke Park Counseling",
    website: "http://roanokeparkcounseling.org",
    phone: "(206) 323-7131",
    address: "2601 Broadway E",
    hours: "Mon. – Fri. 9 a.m. – 6 p.m.",
    description:
      "Roanoke Park Counseling offers a variety of professional, affordable therapeutic services—both individual and group—to address the needs of adults who are survivors of childhood sexual abuse, and their partners. Specialized therapy of the highest quality to survivors and their partners. Accepts insurance and are in-network with many plans, also offers sliding-fee scale and scholarship funding based on financial need.",
    categories: ["Survivor Support Services"],
  },
  {
    name: "ROOTS Friday Feast",
    website: "http://rootsinfo.org/fridayfeast",
    phone: "(206) 632-1635",
    address:
      "4130 University Way NE\nSeattle\nLocated at Chapel on the Ave, located in the alleyway garage behind the church.",
    hours: "Dinner is served from 5:30 - 7:00 p.m. every Friday.",
    description:
      "Friday Feast is an all-ages meal provided by ROOTS every Friday. Open to anyone in the community who would like to attend.",
    categories: ["Food Assistance"],
  },
  {
    name: "ROOTS Young Adult Shelter",
    website: "http://rootsinfo.org/needshelter",
    phone: "(206) 632-1635",
    address: "4541 19th Ave NE",
    hours:
      "Shelter every night 9 p.m. - 8 a.m., call or go in person at 8 p.m.",
    description:
      "ROOTS provides safe emergency overnight shelter for young adults ages 18-25, and builds community, fosters dignity through access to essential services, and a safe place to sleep for young adults experiencing homelessness. Services offered in español. People seeking overnight shelter can call (206) 632-1635 or come between 8 pm - 8:30 pm and ask to be put on the list. Guests have access to case management, clothing toiletries, and breakfast and dinner. Government-issued photo ID is required within 15 stays, or a note from a case manager saying you are in the process of getting an ID. Pets are allowed with an agreement.",
    categories: ["Shelters"],
  },
  {
    name: "Safe Place",
    website: "https://www.spl.org/programs-and-services/teens/safe-place",
    phone:
      "call 1-800-422-TEEN (8336)\nText or call - 24 hours a day, 7 days a week\nWebsite has link to interactive map to nearest location.",
    hours: "11 a.m.- 7 p.m.",
    description:
      "Safe Place gets youth off the streets by providing immediate access to community resources. Safe Place has a 24/7 phone hotline, 1 (800) 422-8336 where youth directly connect with Safe Place staff, who provide resources, connecting the young person to shelter services. Call or text hotline or enter a business displaying the yellow and black diamond-shaped Safe Place sign, or library, Seattle Parks and Recreation's Community Centers, Metro Transit buses, and YMCA facilities.  Operated by Friends of Youth, in partnership with local businesses and non-profits across King County. Website has link to interactive map to nearest location.",
    categories: ["Emergency and Crisis Lines"],
  },
  {
    name: "Salvation Army, Adult Rehabilitation Program",
    website: "http://seattlearc.salvationarmy.org",
    phone: "(206) 587-0503 ext. 1",
    address: "10750 Greenwood Ave. N",
    hours: "Mon.–Fri.: 8 a.m.—4 p.m.",
    description:
      "Offers a three-bridge approach that allows participants an intensive six-month in-patient recovery program, an additional two months of in-house work development, assistance finding a job, and an additional six months of independent living in the Adult Rehabilitation Program facility that provides a supportive sober community. All at no cost. Call program intake. Serves everyone, but Christian studies are offered as part of the program.",
    categories: ["Drug and Alcohol Services"],
  },
  {
    name: "Salvation Army, Central Seattle Food Pantry",
    website: "http://seattle.salvationarmy.org",
    phone: "(206) 447-9944 extension 2",
    address: "1101 Pike St.",
    hours:
      "Tue 9 a.m. – 11:30 a.m. and 1 p.m. – 2:30 p.m.; Wed. 9 a.m. – 11:30 a.m. and 1 p.m. – 2:30 p.m.; Thu. 1 p.m. – 3 p.m.",
    description:
      "Pick out your own food, and food bags for non-cook, requests ID for adults, but okay if no ID. No fees.",
    categories: ["Food Assistance"],
  },
  {
    name: "Salvation Army Domestic Violence Program",
    website:
      "http://seattle.salvationarmy.org/seattle_services/domestic-violence-programs-and-shelters",
    phone:
      "(206) 447-9947 intake line, if no answer leave message with safe return phone number",
    address: "1101 Pike St.",
    hours:
      "Call Mon.–Fri.: 9 a.m.—4 p.m. and ask to speak to the “Advocate on Duty.”",
    description:
      "Confidential domestic violence services focused on Domestic Violence/DV education, safety planning, and referrals. Serves adults, with or without children, within King County who are fleeing a DV situation. Language interpretation available. Limited basic needs and financial assistance. LGBTQ+ friendly, and language interpretation is provided. We do not inquire into immigration status.",
    categories: ["Survivor Support Services"],
  },
  {
    name: "Salvation Army, White Center",
    website: "http://seattlewhitecenter.salvationarmy.org",
    phone: "(206) 767-3150 extension 1",
    address: "9050 16th Ave. SW",
    hours:
      "Community Center: Mon.–Fri.:10 a.m.—10:30 p.m.; food pantry: Mon.-Fri.: 1—2 p.m.",
    description:
      "Provides groceries, as well as diapers and pet food when available, to homeless and low-income individuals and families in White Center. To qualify, must have low-income and live within the following zip codes:\n98106, 98108 (west of the Duwamish, in the South Park neighborhood), 98116, 98126, 98136, 98146, 98148, 98158, 98166, 98168, 98188 and 98198 (north of 216th). Requests the following verification documents: Proof of income, verification of family size, proof of address and Photo ID. Serves everyone.",
    categories: ["Food Assistance"],
  },
  {
    name: "Samaritan Center of Puget Sound",
    website: "http://samaritanps.org",
    phone: "(206) 527-2266",
    address: "564 NE Ravenna Blvd.",
    hours: "Mon.–Thu.: 9 a.m.—5 p.m.",
    description:
      "Spiritually integrated therapy, counseling, and education for individuals and families of all faiths and lifestyles. Provides psychotherapy for individuals, couples, families, children and youth. Provides psychological assessments for children and teens.",
    categories: ["Mental Health Services"],
  },
  {
    name: "Sea Mar Community Health Center, Burien",
    website: "http://seamar.org",
    phone: "(206) 812-6140",
    address: "14434 Ambaum Blvd. SW, No. 5\nBurien",
    hours: "Mon.–Sat.: 8 a.m.—5 p.m.",
    description:
      "Specializes in serving the Latino community, serves everyone, any immigration or citizen status, regardless of ability to pay for services.  Provides primary medical and dental care; nutrition services for pregnant women, new mothers and children; Latino Youth Community Services; Latino Senior Information Assistance Program: senior housing, social security, state benefits. Some locations also offer Mental Health Services, Chemical Dependency Services, Medication Assisted Treatment for opioid dependency (MAT). ID Required. No fees. Provides quality, comprehensive health, human, housing, educational, cultural services to diverse communities.",
    categories: [
      "Services For People of Color",
      "Immigrant and Refugee Services",
      "General Health Services",
    ],
  },
  {
    name: "Sea Mar Community Health Center, Des Moines",
    website: "http://seamar.org",
    phone: "(206) 212-4500",
    address: "2781 S 242nd St.\nDes Moines",
    hours: "Mon.–Fri.: 8 a.m.—5 p.m.",
    description:
      "Specializes in serving the Latino community, serves everyone, any immigration or citizen status, regardless of ability to pay for services.  Provides primary medical and dental care; nutrition services for pregnant women, new mothers and children; Latino Youth Community Services; Latino Senior Information Assistance Program: senior housing, social security, state benefits. Some locations also offer Mental Health Services, Chemical Dependency Services, Medication Assisted Treatment for opioid dependency (MAT). ID Required. No fees. Provides quality, comprehensive health, human, housing, educational, cultural services to diverse communities.",
    categories: [
      "General Health Services",
      "Immigrant and Refugee Services",
      "Services For People of Color",
    ],
  },
  {
    name: "Sea Mar Community Health Center, Kent",
    website: "http://seamar.org",
    phone: "(206) 436-6380",
    address: "233 2nd Ave. S\nKent, WA",
    hours: "Mon. and Wed.: 8 a.m.—8 p.m.; Tues., Thurs., Fri.: 8 a.m.—5 p.m.",
    description:
      "Specializes in serving the Latino community, serves everyone, any immigration or citizen status, regardless of ability to pay for services.  Provides primary medical and dental care; nutrition services for pregnant women, new mothers and children; Latino Youth Community Services; Latino Senior Information Assistance Program: senior housing, social security, state benefits. Some locations also offer Mental Health Services, Chemical Dependency Services, Medication Assisted Treatment for opioid dependency (MAT). ID Required. No fees. Provides quality, comprehensive health, human, housing, educational, cultural services to diverse communities.",
    categories: [
      "Immigrant and Refugee Services",
      "Services For People of Color",
      "General Health Services",
    ],
  },
  {
    name: "Sea Mar Community Health Center, Seattle",
    website: "http://seamar.org",
    phone: "(206) 762-3730",
    address: "8720 14th Ave. S",
    hours: "Mon.–Sat. 8 a.m.—5 p.m.",
    description:
      "Specializes in serving the Latino community, serves everyone, any immigration or citizen status, regardless of ability to pay for services.  Provides primary medical and dental care; nutrition services for pregnant women, new mothers and children; Latino Youth Community Services; Latino Senior Information Assistance Program: senior housing, social security, state benefits. Some locations also offer Mental Health Services, Chemical Dependency Services, Medication Assisted Treatment for opioid dependency (MAT). ID Required. No fees. Provides quality, comprehensive health, human, housing, educational, cultural services to diverse communities.",
    categories: ["General Health Services"],
  },
  {
    name: "Sea Mar Community Health Centers, Seattle",
    website: "http://seamar.org",
    phone: "(206) 762-3730",
    address: "8720 14th Ave. S",
    hours: "Mon.-Sat.: 8 a.m.—5 p.m.",
    description:
      "Specializes in serving the Latino community, serves everyone, any immigration or citizen status, regardless of ability to pay for services.  Provides primary medical and dental care; nutrition services for pregnant women, new mothers and children; senior housing, affordable housing, social security, state benefits. Some locations also offer chemical dependency services, Medication Assisted Treatment for opioid dependency (MAT). ID Required. No fees. Provides quality, comprehensive health, human, housing, educational, cultural services to diverse communities. Offers services in English and Spanish.",
    categories: [
      "General Health Services",
      "Services For People of Color",
      "Immigrant and Refugee Services",
    ],
  },
  {
    name: "Sea Mar Community Health Center, Turning Point Adult Treatment Center",
    website: "http://seamar.org/king-bh-turningpoint",
    phone: "(206) 219-5980",
    address: "113 23rd Ave. S",
    hours: "Mon. – Fri., 8 a.m. – 5 p.m.",
    description:
      "Chemical Dependency Inpatient program specializes in service to Latino community, more than just a rehab facility; it is a leading provider of integrated and multidisciplinary health treatment. Provides clinically tailored, comprehensive and individualized treatment plans for each community member for a whole person approach, mind, body, and spirit. Offers English and Spanish speaking services.",
    categories: [
      "Drug and Alcohol Services",
      "Immigrant and Refugee Services",
      "Services For People of Color",
    ],
  },
  {
    name: "Sea Mar Community Health Center, White Center",
    website: "http://seamar.org",
    phone: "(206) 965-1000",
    address: "9650 15th Ave. SW, No. 100",
    hours: "Mon.–Fri. 8 a.m.—5 p.m.",
    description:
      "Specializes in serving the Latino community, serves everyone, any immigration or citizen status, regardless of ability to pay for services.  Provides primary medical and dental care; nutrition services for pregnant women, new mothers and children; Latino Youth Community Services; Latino Senior Information Assistance Program: senior housing, social security, state benefits. Some locations also offer Mental Health Services, Chemical Dependency Services, Medication Assisted Treatment for opioid dependency (MAT). ID Required. No fees. Provides quality, comprehensive health, human, housing, educational, cultural services to diverse communities.",
    categories: ["General Health Services"],
  },
  {
    name: "Seattle Central College, ESL Program, English as a Second Language",
    website:
      "http://seattlecentral.edu/programs/basic-and-transitional-studies/esl",
    phone: "(206) 934-4180; btsinfo@seattlecolleges.edu",
    address: "1701 Broadway",
    hours: "Mon.-Thurs.: 9 a.m.—3 p.m.",
    description:
      "English as a Second Language (ESL) classes are offered to help non–native speakers to communicate in English through the development of skills in listening and observing, speaking, reading, and writing. Cost for tuition is $25 per quarter.",
    categories: ["Immigrant and Refugee Services"],
  },
  {
    name: "Seattle Central College, Re-Entry Support Programs",
    website:
      "http://seattlecentral.edu/campus-life/student-support-and-services/re-entry-support",
    phone: "(206) 934-4018",
    address: "1701 Broadway, No. BE3215",
    hours: "Mon.–Thurs.: 8 a.m.—4:30 p.m.; Fri. 8 a.m.—12 p.m.",
    description:
      "Provides services to refer reentry students to campus and community-based resources and partners specific to the variety of needs including housing, employment, clothing, personal finances and scholarship information. Safe space for peer-to-peer support, helps students with enrollment, registration, financial-aid.",
    categories: ["Re-entry Assistance"],
  },
  {
    name: "Seattle Central College, Veterans Services",
    website:
      "http://seattlecentral.edu/campus-life/student-support-and-services/veterans",
    phone: "(206) 934-6352",
    address: "1701 Broadway No. BE3215",
    hours: "Mon.–Thurs.: 8 a.m.—4:30 p.m.; Fri. 8a.m.—12p.m.",
    description:
      "Assists veteran students, their dependents and partners with the tools and resources to successfully navigate the transition from military to college life. Benefits include: 50 percent off tuition waiver for qualified military personnel and veterans, help with housing referrals, educational programs and scholarships, job search assistance, resume prep, advising, career center, childcare assistance, counseling, disability resources, tutoring, and TRiO student support services.",
    categories: ["Veteran Services"],
  },
  {
    name: "Seattle City Showers and Restrooms, Delridge Community Center",
    website:
      "http://parkways.seattle.gov/2020/03/16/seattle-parks-and-recreations-free-shower-program-operating-on-modified-schedule-at-5-community-centers",
    phone: "(206) 684-7423",
    address: "4501 Delridge Way SW",
    hours: "Mon.–Fri: 10 a.m.–4:30 p.m.; last shower at 4 p.m.",
    description:
      "Seattle's free shower program. Please call community centers to verify hours before visiting.",
    categories: ["Hygiene Services"],
  },
  {
    name: "Seattle City Showers and Restrooms, Green Lake Community Center",
    website:
      "http://parkways.seattle.gov/2020/03/16/seattle-parks-and-recreations-free-shower-program-operating-on-modified-schedule-at-5-community-centers",
    phone: "(206) 684-0780",
    address: "7201 E Green Lake Dr. N",
    hours: "Tue., Thu.: 10a.m.—1p.m.; last shower at 12:30 p.m.",
    description:
      "Seattle's free shower program. Please call community centers to verify hours before visiting.",
    categories: ["Hygiene Services"],
  },
  {
    name: "Seattle City Showers and Restrooms, Meadowbrook Community Center",
    website:
      "http://parkways.seattle.gov/2020/03/16/seattle-parks-and-recreations-free-shower-program-operating-on-modified-schedule-at-5-community-centers",
    phone: "(206) 684-7522",
    address: "10517 35th Ave. NE",
    hours: "Mon.—Fri.: 10:30 a.m.—4:30 p.m.",
    description:
      "Seattles free shower program. Call community centers to verify hours before visiting.",
    categories: ["Hygiene Services"],
  },
  {
    name: "Seattle City Showers and Restrooms, Miller Community Center",
    website:
      "http://parkways.seattle.gov/2020/03/16/seattle-parks-and-recreations-free-shower-program-operating-on-modified-schedule-at-5-community-centers",
    phone: "(206) 684-4753",
    address: "330 19th Ave. E",
    hours: "Mon.–Fri.: 10 a.m.—6 p.m.",
    description:
      "Seattle's free shower program. Please call community centers to verify hours before visiting.",
    categories: ["Hygiene Services"],
  },
  {
    name: "Seattle City Showers and Restrooms, Rainier Community Center",
    website:
      "http://parkways.seattle.gov/2020/03/16/seattle-parks-and-recreations-free-shower-program-operating-on-modified-schedule-at-5-community-centers",
    phone: "(1206) 386-1919",
    address: "4600 38th Ave. S",
    hours: "Mon.–Fri.: 10:30 a.m.–5 p.m.",
    description:
      "Seattle's free shower program. Please call community centers to verify hours before visiting.",
    categories: ["Hygiene Services"],
  },
  {
    name: "Seattle Dogs Homeless Program",
    website: "http://seattledogs.info",
    phone: "(206) 519-1697",
    description:
      "A non profit street outreach program that helps owners living in homelessness in Seattle with their pets. Services include pet food and supplies, Emergency Vet Care, spay and neuter, boarding, rescue. Owners must be homeless in the city of Seattle. Provides care by providing quality food, supplies and vet care. Also offers boarding for dogs thru a local facility, contingent on space, for owners who need drug treatment, are hospitalized or go to school or work.",
    categories: ["Pets and Service Animals"],
  },
  {
    name: "Seattle Housing Authority",
    website: "http://seattlehousing.org/housing",
    phone: "(206) 615-3300",
    address: "190 Queen Anne Ave. N",
    hours: "Mon.–Fri.: 8 a.m.—5 p.m.",
    description:
      "Provides various long-term, low-income rental housing programs. Long waiting lists exist for all programs; no emergency housing. Preference given to applicants who are homeless and/or who have income at or below 30% of Area Median Income, but will consider those at or below 80%. Visit in person or visit the website to obtain an application. Once on a waiting list, check in monthly to confirm need for housing. No fees for application.",
    categories: ["Housing Services"],
  },
  {
    name: "Seattle Humane",
    website: "http://seattlehumane.org",
    phone: "(425) 641-0080",
    address: "13212 SE Eastgate Way\nBellevue",
    hours: "Tues.—Sat.: 12—6 p.m.",
    description:
      "Pet food bank. Low cost or free services including check-ups, spay and neuter services, and nail clipping. Sliding scale costs. Pet owner assistance program for financial assistance for emergency veterinary care, and boarding etc.",
    categories: ["Pets and Service Animals"],
  },
  {
    name: "Seattle Indian Center",
    website: "http://seattleindiancenter.org",
    phone: "(206) 329-8700",
    address: "624 S Dearborn St.",
    hours: "Mon.— Fri.: 9 a.m. — 6 p.m.",
    description:
      "Primary focus is serving the American Indian/Alaska Native community, and also serves people of color as well as anyone in need. Provides a multi-service center with advocacy and support services. Programs include outreach and engagement, drop-in center, food bank, and community hot meals. For community shelter services, call for intake and location.",
    categories: ["Food Assistance", "Native & Indigenous Services"],
  },
  {
    name: "Seattle Indian Center, Tillie’s Safehouse",
    website: "http://seattleindiancenter.org/programs",
    phone: "(206) 329-8700",
    address: "624 S Dearborn St.",
    hours: "Mon.—Fri.: 9 a.m.—6 p.m.",
    description:
      "Primary focus is serving the American Indian/Alaska Native community, and also serves people of color as well as anyone in need. Tillie’s Safe House provides emergency short-term housing for clients who have experienced domestic violence.",
    categories: ["Native & Indigenous Services", "Survivor Support Services"],
  },
  {
    name: "Seattle Indian Health Board",
    website: "http://sihb.org",
    phone: "(206) 324-9360",
    address: "611 12th Ave. S",
    hours:
      "Medical and dental clinic: Mon., Wed., Thurs., Fri.: 8 a.m.—5 p.m.; Tues.: 9 a.m.—5 p.m.",
    description:
      "Provides health and human services to its patients, while specializing in the care of Native people. Medical, dental, mental health, chemical dependency, outpatient services, community education services, and housing assistance services. Offers maternal and infant health services as well as the WIC program. Provides emergency assistance and safety planning for victims of domestic violence. Offers programs and care for elders, and veterans. Sliding scale fees for qualifying native American or Alaskan with correct documentation.",
    categories: ["General Health Services", "Native & Indigenous Services"],
  },
  {
    name: "Seattle Intergroup",
    website: "http://seattleaa.org",
    phone: "(206) 587-2838",
    address: "5507 6th Ave. S",
    hours:
      "Mon. 10 a.m.—2 p.m.; Tues.—Fri.: 10 a.m.—6 p.m.; Sat.: 10 a.m.—2 p.m.",
    description:
      "Helps people become acquainted with Alcoholics Anonymous, locate meetings, and make sober connections.",
    categories: ["Drug and Alcohol Services"],
  },
  {
    name: "Seattle Jobs Initiative",
    website: "http://seattlejobsinitiative.com/job-seekers",
    phone: "(206) 628-6975",
    address: "1200 12th Ave. S, No. 160",
    hours: "Mon.—Fri.: 9 a.m.—5 p.m.",
    description:
      "Supports job seekers in acquiring the skills, training, and support needed to enter a career that offers a living wage, and benefits in the fields of manufacturing, healthcare, diesel, ironworkers, and maritime welding. Provides a career navigator, help with goal setting, communication, interview preparation, and support services – such as housing, childcare and transportation.",
    categories: ["Employment and Training Services"],
  },
  {
    name: "Seattle Office for Civil Rights",
    website: "http://seattle.gov/civil-rights",
    phone: "(206) 684-4500",
    address: "810 3rd Ave., No. 750",
    hours: "Mon.–Thurs.: 10 a.m.—3 p.m.",
    description:
      "Investigates civil rights discrimination and enforces laws against illegal discrimination in employment, housing, public accommodation, and contracting within Seattle City Limits. No fees.",
    categories: ["Legal Services"],
  },
  {
    name: "Seattle Public Library, Central Branch, Immigrant & Refugee Services",
    website:
      "http://spl.org/programs-and-services/civics-and-social-services/immigrant-and-refugee-services",
    phone: "(206) 386-4636",
    address: "1000 4th Ave.",
    hours:
      "Mon.: 10 a.m.—6 p.m.; Tues.–Thurs.: 10 a.m. – 8 p.m.; Fri.–Sun.: 10 a.m.—6 p.m.",
    description:
      "Free classes and online tools for citizenship and English language learning. Books, CDs and DVDs in many languages. Free public computers. As an immigrant or new citizen, you have the right to fair treatment when you vote, worship, travel or express your views. The pocket-sized “Know Your Rights” cards explain your freedoms. You can pick one up at any Library location.",
    categories: ["Immigrant and Refugee Services"],
  },
  {
    name: "Seattle Public Library, Central Branch, Job Resources",
    website:
      "http://spl.org/programs-and-services/civics-and-social-services/job-resources",
    phone: "(206) 386-4636",
    address: "1000 4th Ave.",
    hours:
      "Mon.: 10 a.m.—6 p.m.; Tues.–Thurs.: 10 a.m. – 8 p.m.; Fri.–Sun.: 10 a.m.—6 p.m.",
    description:
      "Resources for discovering a new career path, gaining new job skills, creating a cover letter and resume, and finding job opportunities. Free job search and career development programs will be available at Ballard Branch, Rainier Beach Branch, and on level 7 at the Central Library (special job search computers only at Central).",
    categories: ["Employment and Training Services"],
  },
  {
    name: "Seattle Public Library, Central Branch, Resources for the Formerly Incarcerated",
    website:
      "http://spl.org/programs-and-services/civics-and-social-services/resources-for-the-formerly-incarcerated",
    phone: "(206) 386-4636",
    address: "1000 4th Ave.",
    hours:
      "Mon.: 10 a.m.—6 p.m.; Tues.–Thurs.: 10 a.m. – 8 p.m.; Fri.–Sun.: 10 a.m.—6 p.m.",
    description:
      "Along with local organizations, we offer court-involved individuals, and their families, information and resources to help during and after incarceration. Free job search and career development programs are offered at the Central Library and Rainier Beach branch. Learn basic technology skills, how to use the Web, Microsoft Office programs and more. One-on-one, walk-in tutoring to help learners with test preparation, job readiness and life skills.",
    categories: ["Legal Services", "Re-entry Assistance"],
  },
  {
    name: "Seattle Public Library, Central Branch, Social Services & Help for Those in Need",
    website:
      "http://spl.org/programs-and-services/civics-and-social-services/social-services-referrals",
    phone: "(206) 386-4636",
    address: "1000 4th Ave.",
    hours:
      "Mon.: 10 a.m.—6 p.m.; Tues.–Thurs.: 10 a.m. – 8 p.m.; Fri.–Sun.: 10 a.m.—6 p.m.",
    description:
      "Specializing in services for the insecurely housed. The Community Resource Specialist can help you find shelter, mental health counseling, job training, food assistance, legal help, domestic violence support, medical help, and a social work team. Also offers to loan Wi-Fi hotspots and books to those living in encampments. Hotspots can be reserved online by any borrower, but the Library sets aside hotspots specifically for homeless communities to use and share.",
    categories: ["Re-entry Assistance", "Housing Services"],
  },
  {
    name: "Seattle Public Library, Central Branch, Veterans Services",
    website:
      "http://spl.org/programs-and-services/civics-and-social-services/veteran-services",
    phone: "(206) 386-4636",
    address: "1000 4th Ave.",
    hours:
      "Mon.: 10 a.m.—6 p.m.; Tues.–Thurs.: 10 a.m. – 8 p.m.; Fri.–Sun.: 10 a.m.—6 p.m.",
    description:
      "Offers drop-in help for veterans who are currently homeless or living on low incomes. Veteran specialists from Supportive Services for Veteran Families connect veterans with social services to help them find housing and get the support they need to stay in their homes. The Help for Veterans events offer rapid access to housing, counseling, financial planning and legal assistance.",
    categories: ["Veteran Services"],
  },
  {
    name: "Seattle Public Utility RV Wastewater Pilot",
    website:
      "http://seattle.gov/utilities/protecting-our-environment/seattle-clean-city/rv-wastewater",
    phone: "(206) 641-6991",
    description:
      "Collection services to dispose of toilet water and grey water from Recreational Vehicles (RVs). Once enrolled, the collection truck will come to your RV once a week.",
    categories: ["Hygiene Services"],
  },
  {
    name: "Seattle's Open Meal Service provided by OSL",
    website: "http://oslserves.org",
    phone: "(206) 919-7468; info@oslserves.org",
    address: "2515 Western Ave.",
    hours:
      "Mon.–Fri.: Breakfast: 8—9 a.m.; Lunch: 12:30—1:30 p.m.; Dinner: 5—6 p.m. \nSat. and Sun.: Breakfast: 10—11 a.m.; Lunch: 12:30—1:30 p.m.; Dinner:5—6 p.m.",
    description:
      "No-cost hot meal service, three times per day, seven days a week. All are welcome.",
    categories: ["Food Assistance"],
  },
  {
    name: "Seattle's Union Gospel Mission, Dental Clinic",
    website: "https://www.facebook.com/UGMDentalClinic/",
    phone: "(206) 621-7695",
    address: "205 3rd Ave.",
    hours: "Mon.–Fri.: 9 a.m.—3 p.m.",
    description:
      "Dental services serving adults 18 and older with income at or below 200 percent of the Federal Poverty Level. Call for an appointment. Documents required: Photo ID, food stamp award letter, or documentation of income for the last two months. Fees are $20 per visit, debit or credit only. Call for more information.",
    categories: ["Dental and Vision Services"],
  },
  {
    name: "Seattle’s Union Gospel Mission, Hope Place",
    website: "http://ugm.org/what-we-do/recovery/womens-recovery-program",
    phone: "(206) 628-2008",
    address: "3802 S Othello St.",
    hours: "Phone Intake: 8 a.m.—4 p.m.",
    description:
      "Long-term residential recovery program with shelter. Serving single women, women with children, and trans women who are in recovery from drugs or alcohol, or who have experienced domestic violence but are not actively being pursued. Call for screening. No fees. Wheelchair accessible. DBHR-certified service(s).",
    categories: [
      "Legal Services",
      "Survivor Support Services",
      "Re-entry Assistance",
      "Drug and Alcohol Services",
    ],
  },
  {
    name: "Seattle’s Union Gospel Mission, Men’s Enhanced Shelter",
    website: "http://ugm.org/what-we-do/stabilization/mens-shelter",
    phone: "(206) 622-5177",
    address: "318 2nd Ave. Ext. S",
    hours:
      "Intake: Mon.-Fri.: 9 a.m.—3 p.m.; participant sign-in: 5—7 p.m.; Meal times for all program participants: Mon.–Sun.: 7:30 a.m., 11:00 a.m., 5:00 p.m.; Enhanced Shelter meal times: 7 a.m., 5 p.m.",
    description:
      "Operates a 90-day enhanced shelter program. First-come first-served basis for intake. Once enrolled, reserves a bed for 90 days while in good standing. Serves homeless men 18 and older. Meals are not for the public, only for program participants. Accepts offenders. Documents Required: ID. No fees.",
    categories: ["Shelters"],
  },
  {
    name: "Seattle’s Union Gospel Mission, Second Ave.",
    website: "http://ugm.org",
    phone: "(206) 622-5177; Spanish: Mon.–Fri.: 9 a.m.—3 p.m.",
    address: "318 2nd Ave. Ext. S",
    hours: "Intake: Mon.–Fri.: 9 a.m.—3 p.m.",
    description:
      "No fees. One year residential Christian recovery program. Not a state-certified chemical dependency program. Serves homeless men 18 and older. Call or visit site. Operates an overnight shelter. No intoxicated clients accepted. Documents Required: ID. No fees.",
    categories: [
      "Mail Services",
      "Food Assistance",
      "Hygiene Services",
      "Day Centers",
    ],
  },
  {
    name: "Seattle Vet Center",
    website: "http://va.gov/seattle-vet-center",
    phone: "(206) 764-5130; after hours: (877) 927-8387",
    address: "305 S Lucile St.",
    hours:
      "Mon.–Thurs.: 8 a.m.—6:30 p.m.; Fri.: 8 a.m..—4:30 p.m.; flexible hours by appointment",
    description:
      "Offers benefit counseling, job service referrals and bereavement counseling. Mental health intake assessments for veterans who experienced PTSD, and/or sexual trauma in the military. Offers short-term trainings on living/coping skills as well as long-term multiple-focus trainings. Will refer to other agencies. Serves veterans and sometimes veterans’ families. Call or visit site. If available, bring medical discharge and separation (DD214) papers. No fees.",
    categories: ["Veteran Services"],
  },
  {
    name: "Seattle Veterinary Outreach",
    website: "http://seattlevet.org",
    phone: "(206) 659-9810",
    address:
      "Rotating locations, visit website (seattlevet.org/calendar) or Facebook for info.",
    hours: "Visit website or Facebook for upcoming clinic hours.",
    description:
      "Provides free basic veterinary care, including vaccination, de-worming, flea control, microchips, and care for sick pets. Free services for un-housed individuals, including those living in vehicles (no proof required). Low-cost sliding scale for low-income, housed individuals (bring your SNAP, EBT, WIC, SSI, or TANF card).",
    categories: ["Pets and Service Animals"],
  },
  {
    name: "Senior Housing Assistance Group (SHAG)",
    website: "http://housing4seniors.com/communities",
    phone: "(844) 592-7424",
    address: "3642 33rd Ave. S",
    hours: "Mon.-Fri.: 8 a.m.—4:30 p.m.",
    description:
      "Provides quality, affordable apartment homes and lifestyle enhancements to seniors (61+) who otherwise cannot afford to live well in retirement. Age and income restrictions vary by community. All household members must be of age 55+; one member must be of age 61+. Visit website, call or stop by for more information, eligibility requirements, application and fees.",
    categories: ["Senior Services", "Housing Services"],
  },
  {
    name: "Sexual Health Clinic at Harborview Medical Center",
    website: "http://kingcounty.gov/std",
    phone: "(206) 744-3590",
    address: "908 Jefferson St., 11th Floor",
    hours:
      "Mon., Wed., Thurs., Fri.: 7:30 a.m.—6 p.m.; Tues.: 9:30 a.m.—6 p.m.",
    description:
      "Offers diagnosis and treatment of sexually transmitted diseases, including HIV. Serves everyone. Staff are sensitive to the needs of LGBTQ+. No appointment needed. Call for wait times.  Health exams, referrals and partner notification for people who are newly HIV positive. Call for an appointment. Sliding scale fees, but no person will be denied. Medicare, Apple Health (Medicaid) and insurance accepted.",
    categories: ["General Health Services", "HIV/AIDS Services"],
  },
  {
    name: "SHARE/WHEEL, Shelter Screenings",
    website:
      "http://sites.google.com/sharewheel.org/index/need-shelter/screening-schedule?authuser=0",
    phone: "(206) 448-7889",
    address: "1902 Second Ave.",
    hours: "Mon., Thu.: 1pm; Tue., Wed., Fri., Sat.: 6pm",
    description:
      "Screenings offices for co-ed or gender-specific, nighttime shelters to single homeless adults, 18 and older. Self-managed; run by the homeless members themselves. Service animals allowed, no pets. No fees. Being sober is required. Case managers available.",
    categories: ["Shelters"],
  },
  {
    name: "SHARE/WHEEL, Storage Lockers",
    website:
      "http://sites.google.com/sharewheel.org/index/need-shelter/share-storage-lockers?authuser=0",
    phone: "(206) 956-0334",
    address: "609 Eighth Ave.",
    hours: "Daily: 7—9 a.m.",
    description:
      "Day and long-term storage lockers. Requirements: One 2-hour labor shift per month and attendance of one Sunday meeting per month. Best chance to find an opening are Fridays and Sundays. Serves anyone who is homeless and can provide labor. Apply in person during operation hours. No fees. No ID required.",
    categories: ["Storage Services"],
  },
  {
    name: "SHARE/WHEEL, Tent City 3",
    website:
      "http://sites.google.com/sharewheel.org/index/need-shelter/tent-cities/tent-city-3?authuser=0",
    phone: "(206) 399-0412",
    address: "Address moves every 2-3 months, call for current address.",
    hours: "24/7",
    description:
      "Tent City 3 is a portable, self-managed encampment. Security workers on-site 24/7. Food preparation area; volunteer-provided hot meals most evenings. Valid government ID is required. Being sober is required.",
    categories: ["Encampments"],
  },
  {
    name: "SHARE/WHEEL, Tent City 4",
    website:
      "http://sites.google.com/sharewheel.org/index/need-shelter/tent-cities/tent-city-4?authuser=0",
    phone: "(206) 618-3901",
    address: "Address moves every 2-3 months, call for current address.",
    hours: "24/7",
    description:
      "Tent City 4 is a portable, self-managed encampment. Security workers on-site 24/7. Food preparation area; volunteer-provided hot meals most evenings. Valid government ID is required. Being sober is required.",
    categories: ["Encampments"],
  },
  {
    name: "Shoreline Community Care",
    website: "http://shorelinecommunitycare.org",
    phone: "(206) 496-3116",
    address: "Berean Bible Church, 2345 N 185th St., Shoreline",
    hours:
      "Schedule appointment: call and leave voicemail; Interviews: Tues., Thurs., 9:30 – 11:00 a.m.",
    description:
      "Financial assistance for rent, utilities and other essential needs. May receive assistance once every 6 months. Serves residents of the city of Shoreline. No walk-ins, by appointment only. Leave a voicemail stating: first and last name, address, contact phone number, and best time to call. Documents required: photo ID, monthly budget, and, depending on help needed, a utility bill and/or landlord contact info. No fees. Agency holds a Christian worldview but serves non-Christians and does not require church attendance.",
    categories: ["Financial Assistance"],
  },
  {
    name: "Shoreline Tool Library",
    website: "http://seattlereconomy.org/stl/",
    phone: "(206) 524-6062; shorelinetl@seattlereconomy.org",
    address: "16610 Aurora Ave. N",
    hours: "Mon., Wed., Fri.: 5–8 p.m.; Sat.: 9 a.m.–noon",
    description:
      "Lends out various tools. Become a member by making an account online or in person, donating what you can ($0 is okay too). Has tools for yard work, home construction, auto repair, DIY projects, and much, much more. Also a woodworking shop and seed library. Must be 18 and older. ID required to become a member.",
    categories: ["Transportation Assistance"],
  },
  {
    name: "Shoreline Tool Library Bike Shack",
    website: "http://seattlereconomy.org/stl/bike-shack/",
    phone: "(206) 524-6062; bikeshack@seattlereconomy.org",
    address: "16610 Aurora Ave. N, Shoreline",
    hours: "Wed.: 5–8 p.m.; Sat.: 9 a.m.–noon",
    description:
      "A place for Tool Library members to work on their bikes with volunteer bike mechanic. The space is equipped with bike repair tools, a repair work stand, and parts available for purchase for what you can afford. Availability on a first-come, first-served basis. Fill out Request for Assistance form online to request assistance while working on your bike. The suggested donation for using the Bike Shack is $20 per hour, but no one is turned away for lack of funds.",
    categories: ["Transportation Assistance"],
  },
  {
    name: "Shower Hotline, City of Seattle",
    website:
      "https://atyourservice.seattle.gov/2022/02/25/2022-hygiene-shower-trailer-locations/",
    phone: "(206) 386-1030",
    address: "Call for weekly updated locations",
    hours: "9 a.m. – 4:30 p.m., days different at each location",
    description:
      "Free hot showers provided by Seattle Public Utilities in shower trailers for 30-45 minutes. Single occupancy, sanitized between each use, secure storage while using, pets secured while using. Call for instructions and weekly updated locations.",
    categories: ["Hygiene Services"],
  },
  {
    name: "Solanus Casey Center",
    website:
      "http://ccsww.org/get-help/shelter-homeless-services/solanus-casey-center",
    phone: "(206) 223-0907",
    address: "804 9th Ave.",
    hours: "Drop-in: Mon. – Thurs., 12 – 3 p.m.",
    description:
      "Walk-in hospitality and referral center that provides services to help people get an identification card (ID), administrative and financial help for people who have had their Washington state IDs stolen or lost, confiscated or not returned by law enforcement. Use the 9th & Columbia entrance of St. James Cathedral.",
    categories: ["Identification Services"],
  },
  {
    name: "Solid Ground",
    website: "http://solid-ground.org/get-help",
    phone:
      "DSHS Benefits Help: (206) 694-6742; Tenant Info Hotline: (206) 694-6767",
    address: "1501 N 45th St.",
    hours:
      "DSHS/state benefits assistance: 24-hour line; Tenant services: Mon., Thurs., 10:30 a.m. – 1:30 p.m.",
    description:
      "Legal services to help clients obtain and retain public benefits like SNAP food stamp/EBT, Medicaid/health insurance, government cash assistance, and more. Provides information and referral for tenants facing eviction or struggling with other rental issues. Provides references to food and nutrition assistance programs, as well as rental assistance and shelter diversion through 211. Serves low-income residents of King County. No restrictions for advice and referrals. No fees.",
    categories: ["Legal Services"],
  },
  {
    name: "Solid Ground - Housing Resources",
    website: "http://solid-ground.org/get-help/housing",
    phone: "(206) 694-6700",
    address: "1501 N. 45th St.",
    hours: "Wed. 11am - 3pm",
    description:
      "Solid Ground provides various housing program resources. Call (206) 299-2500 for Solid Ground’s confidential Domestic Violence shelter services. Other services available by referral through Coordinated Entry with 211. Whether you have lost your home and need shelter – or need support to stay in your current home –  Solid Ground can connect you with information, resources and referrals to support your housing stability.",
    categories: ["Housing Services", "Survivor Support Services"],
  },
  {
    name: "Solid Ground - Transportation Services",
    website: "http://solid-ground.org/get-help/transportation",
    phone:
      "Circulator Bus Schedule: (206) 753-4801; Metro Access Eligibility: (206) 263-3113; Metro Access Scheduling: (206) 205-5000",
    hours:
      "Downtown Circulator Route: Mon. – Fri., first bus departs stop #1, 7 a.m., last bus departs stop #1, 4 p.m.",
    description:
      "Solid Ground ACCESS provides door to door service available 7 days a week, 24 hours a day for people not able to ride the regular bus. You request the ride; you’ll be grouped together with riders going to similar places at similar times. Also provides Shuttle Rides for a circular loop of seven stops, no fee. Arrives approximately every 30 minutes. Stop No. 1, Ninth and Alder; No. 2, Fourth and Yesler; No. 3, First and Marion; No. 4, First and Pine; No. 5, First and Bell; No. 6, Ninth and Virginia; No. 7, Boren and Seneca.",
    categories: ["Transportation Assistance"],
  },
  {
    name: "Somali Community Services of Seattle",
    website: "http://somcss.org",
    phone: "(206) 760-1181",
    address: "8810 Renton Ave. S",
    hours: "Mon. – Fri., 9 a.m. – 4 p.m.",
    description:
      "Support refugees to undergo a smooth transitional process. Family and youth programs, housing referral, senior program including ethnic lunches, peer counseling, job search assistance, ESL classes, computer classes, Somali language classes and parenting education classes. Case managers can assist with the immigration process. Primarily serves refugees and immigrants. Call or visit in person. No fees. Need to have state ID, passport, green card or other identification.",
    categories: [
      "Services For People of Color",
      "Immigrant and Refugee Services",
    ],
  },
  {
    name: "Sophia Way",
    website: "http://sophiaway.org",
    phone: "(425) 896-7385; Shelter intake line: (425) 598-2608",
    address:
      "3032 Bellevue Way NE, Bellevue, behind St. Luke’s Lutheran Church",
    hours: "Day center: everyday, 8 a.m. – 3 p.m.; Lunch: everyday, 11:30 a.m.",
    description:
      "Day center, emergency shelter, and extended-stay shelter. Serves adult homeless women, including trans women. Offers support on the journey from homelessness to safe and stable living. Provides place to rest and sleep, food, access to necessities, support for healing and recovery, 24/7 shelter, and case management. Shelter intake line accepts calls on the third Monday of each month, or submit form via website.",
    categories: ["Day Centers", "Shelters"],
  },
  {
    name: "Sound Generations",
    website: "http://soundgenerations.org",
    phone: "(206) 448-5757",
    address: "2208 Second Avenue, Suite No. 100",
    hours: "Mon. – Fri., 8:30 a.m. – 4 p.m.",
    description:
      "Connects older adults, adults with disabilities, veterans, and caregivers to community resources such as meal delivery (Meals on Wheels), senior centers, Hyde Shuttle transportation, programs for health/wellness, in-home services and support, housing resources, legal assistance, food services/nutrition, health/wellness, employment resources, counseling services, home maintenance and ADA modifications. Largest provider of services for aging adults and their loved ones in King County. Committed to helping everyone, low income communities and people of color. Works to ensure people feel included and respected in a community that affirms aging.",
    categories: [
      "Veteran Services",
      "Legal Services",
      "Senior Services",
      "Services For People of Color",
    ],
  },
  {
    name: "Sound Health",
    website: "http://sound.health",
    phone:
      "(206) 901-2000; Supportive Services for Veteran Families Program: (206) 545-2344",
    address: "1600 E Olive St.",
    hours: "Daily: 8:30 a.m.-5 p.m.",
    description:
      "Rapid-rehousing case management services and limited financial assistance in partnership with low-income veterans experiencing homelessness. Sound provides clinical model for mental health counseling in many categories with additional support services. Delivers health and human services.",
    categories: [
      "Re-entry Assistance",
      "Veteran Services",
      "Employment and Training Services",
      "General Health Services",
      "Family and Maternity Services",
      "Survivor Support Services",
      "Mental Health Services",
      "Drug and Alcohol Services",
    ],
  },
  {
    name: "Sound Health, Belltown",
    website: "http://sound.health/blog/locations/sound-belltown/",
    phone: "(206) 901-2000",
    address: "2329 Fourth Ave.",
    hours:
      "Appointment: Mon.–:Fri.: 8 a.m.–5 p.m.; walk-in: Mon: 8:30 a.m.–2 p.m.; Fri.: 8:30 a.m.-4 p.m.",
    description:
      "Programs and/or services at this location: Adult Community Support (ACS), Clean Start, counseling, LGBTQ+. Sound organization provides mental health counseling in many categories with additional support services.",
    categories: [
      "Mental Health Services",
      "Problem Gambling Resources",
      "LGBTQIA+ Services",
    ],
  },
  {
    name: "Sound Health, Capitol Hill",
    website: "http://sound.health/blog/locations/sound-seattle-capitol-hill/",
    phone: "(206) 901-2000",
    address: "1600 E Olive St., Buildings: A, B, C",
    hours:
      "Appointment: Mon.–Fri.: 8 a.m.-5 p.m.; walk-ins: Mon.–Fri.: 8 a.m.-2 p.m.",
    description:
      "Full service health clinic that provides mental health counseling in many categories, along with support services.",
    categories: [
      "Mental Health Services",
      "Family and Maternity Services",
      "Drug and Alcohol Services",
      "General Health Services",
      "Problem Gambling Resources",
      "Re-entry Assistance",
      "LGBTQIA+ Services",
      "Housing Services",
    ],
  },
  {
    name: "Sound Health, Kent",
    website: "http://sound.health/blog/locations/sound-kent/",
    phone: "(206) 901-2000",
    address: "841 Central Ave N, #C-114, Kent",
    hours: "Mon., Tue., Thu.: 8:30 a.m.–5 p.m.",
    description:
      "Programs at this specific location: counseling, re-entry, LGBTQ+. Sound organization provides mental health counseling in many categories with additional support services. DDA Medicaid verified.",
    categories: [
      "Mental Health Services",
      "Re-entry Assistance",
      "LGBTQIA+ Services",
    ],
  },
  {
    name: "Sound Health, Lake City Way",
    website: "http://sound.health/blog/locations/sound-lake-city/",
    phone: "(206) 901-2000",
    address: "11000 Lake City Way NE",
    hours: "Appointment: Mon.–Fri.: 8 a.m.–5 p.m.; walk-ins: 8 a.m.–2 p.m.",
    description:
      "Programs and/or services at this location: Adult Community Support (ACS), child and family services, counseling, housing and residential services, intellectual and developmental disabilities, LGBTQ+, and SUD (Substance Use Disorders). Sound organization provides mental health counseling in many categories with additional support services.",
    categories: [
      "Problem Gambling Resources",
      "LGBTQIA+ Services",
      "Family and Maternity Services",
      "Mental Health Services",
      "Drug and Alcohol Services",
    ],
  },
  {
    name: "Sound Health, Northgate",
    website: "http://sound.health/blog/locations/sound-northgate/",
    phone: "(206) 901-2000",
    address: "10700 Meridian Ave. N, #G-11",
    hours:
      "Appointments: Mon.–Fri.: 8 a.m.–5 p.m.; walk-ins: Mon.–Fri.: 8 a.m.–2 p.m.",
    description:
      "Programs at this specific location: child and family services, housing and residential services, counseling, LGBTQ+, alternate private-insurance therapies. Sound organization provides mental health counseling in many categories with additional support services.",
    categories: [
      "Family and Maternity Services",
      "Mental Health Services",
      "LGBTQIA+ Services",
    ],
  },
  {
    name: "Southeast Youth & Family Services",
    website: "http://seyfs.org",
    phone: "(206) 721-5542",
    address: "3722 S Hudson St.",
    hours:
      "Mon. – Fri., 9 a.m. – 5 p.m.; early morning and evening appointments available",
    description:
      "Individual and family counseling, employment assistance, case management, advocacy, information and referral and crisis intervention. Serves African and Asian immigrant and refugee individuals and families. Dedicated to helping youth and families overcome traumas of economic and educational inequality, disparities in foster care and the criminal justice system, and other forms of institutional racism. Call for appointment. No fees for most services.",
    categories: [
      "Services For People of Color",
      "Immigrant and Refugee Services",
      "Mental Health Services",
      "Family and Maternity Services",
    ],
  },
  {
    name: "South Park Senior Center",
    website: "http://spseniors.org",
    phone: "(206) 767-2544",
    address: "8201 10th Ave. S, No. 4",
    hours:
      "Dinner: Mon., Wed., Fri., 5:30 – 6:30 p.m.; Fitness classes: Mon., Wed., Fri., 3 - 4 p.m.",
    description:
      "Healthy aging through social engagement, physical well-being, civic involvement, and life-long learning. Serves adults 50 and older. Has social services support available. Programs include community dining, line dancing, karaoke, fitness classes, book clubs, and more. Check calendar for ongoing clinics and informational sessions for dental care, senior nutrition, vaccinations, etc .Dinner by reservation only.",
    categories: [
      "Food Assistance",
      "Senior Services",
      "Dental and Vision Services",
    ],
  },
  {
    name: "Southwest Youth & Family Services",
    website: "http://swyfs.org",
    phone: "(206) 937-7680",
    address: "4555 Delridge Way SW",
    hours:
      "Mon. – Thu., 9 a.m. – 5 p.m., Fri., 9 a.m. – 3 p.m. Appointments preferred.",
    description:
      "Immigration and cultural transition support, medical services, housing, legal and education. Offers mental health counseling for children, teens and families. Primarily serves Cambodian and Latino immigrants or refugees. Counseling has sliding scale fees and will accept Apple Health (Medicaid). Provides services in the areas of education, youth development, behavioral health, and family advocacy.",
    categories: [
      "Services For People of Color",
      "Family and Maternity Services",
      "Immigrant and Refugee Services",
      "Mental Health Services",
    ],
  },
  {
    name: "St. Andrew’s Episcopal Church",
    website: "http://saintandrewsseattle.org",
    phone: "(206) 523-7476",
    address: "111 NE 80th St.",
    hours: "8 a.m. - 2:30 p.m.",
    description: "Check website for specific service.",
    categories: ["Food Assistance"],
  },
  {
    name: "St. Francis House",
    website: "http://stfrancishouseseattle.org",
    phone: "(206) 268-0784",
    address: "169 12th Ave.",
    hours: "Tue.–Thu: 10 a.m.–1 p.m.",
    description:
      "Free clothing, household items, toiletries, coffee, and sandwiches. May receive assistance once every 30 days. Visit in person, no appointment necessary. ID required.",
    categories: ["Clothing Assistance"],
  },
  {
    name: "St. James Cathedral",
    website: "https://www.stjames-cathedral.org/narthex.aspx",
    phone:
      "General Line: (206) 264-2091\nSt. James Immigrant Assistance: (206) 382-4511",
    address: "907 Columbia St.",
    hours:
      "Meal: Mon. – Fri., 4:15 p.m., Meal line start: 3 p.m.; Immigrant assistance: Mon. – Fri., 9 a.m. – 5 p.m.",
    description:
      "Meal serving everyone. St James Immigrant Assistance provides ESL/English language instruction, comprehensive naturalization assistance, immigrant legal services, citizenship preparation classes. Call for an appointment for services. No fees.",
    categories: ["Food Assistance", "Immigrant and Refugee Services"],
  },
  {
    name: "St. Luke's Episcopal Church",
    website: "http://stlukesseattle.org/edible-hope",
    phone: "(206) 784-3119",
    address: "5710 22nd Ave. NW",
    hours: "Mon. – Fri., 8 – 10 a.m.",
    description:
      "Light breakfast and food bags serving everyone. Visit in person. No fees.",
    categories: ["Food Assistance"],
  },
  {
    name: "St. Stephen Housing Association",
    website: "http://ststephenhousing.org",
    phone: "(253) 638-9798",
    address: "13055 SE 192nd St.",
    hours: "Mon. – Fri., 9 a.m. – 2 p.m.",
    description:
      'Support families with children to move from homelessness to stability by providing temporary housing with a focus on rapidly returning families to stable housing. Temporary housing and social workers serving low-income homeless families with at least one child under 18. Call 211 and ask for a housing referral or visit a King County Regional Homelessness Authority\'s "Regional Access Point" for referral. ID required with a grace period.',
    categories: ["Family and Maternity Services", "Housing Services"],
  },
  {
    name: "St. Vincent de Paul of Seattle, Georgetown Food Bank",
    website: "http://svdpseattle.org/get-help/food-bank",
    phone: "(206) 767-6449",
    address: "5972 4th Ave. S",
    hours: "Tues., Thurs., Fri., 11 a.m. – 2 p.m.",
    description:
      'Food bank distributing boxes and bags of food. Offers "Community Connectors" that provide information about and help you apply for housing assistance, aid for utilities, health care, job readiness, education, and other benefits. For those experiencing homelessness, a special program, FACES (Food, Assistance, Compassion & Emergency Services), is available every Friday. See food bank staff for details on availability and intake. Visit in person. No fees. For first time visitors, please bring an I.D. and proof of address, if available. T-FAP Commodities available to residents of ZIP codes 98108, 98118, 98134, 98168 and 98188 with valid ID.',
    categories: ["Food Assistance"],
  },
  {
    name: "St. Vincent de Paul of Seattle, Helpline",
    website: "http://svdpseattle.org/get-help",
    phone: "(206) 767-6449",
    address: "Call helpline",
    hours: "Helpline: Mon. – Fri., 8 a.m. – 3 p.m.",
    description:
      "Furniture, beds, clothing and other household items, serving King County residents. Assistance with eviction, rent, utility bills/shutoffs. Call the helpline. Intake specialists refer you to the appropriate neighborhood group of volunteers who can visit your home or place of stay. No fees. Financial assistance for King County residents. Type of assistance available depends on the neighborhood group.",
    categories: ["Financial Assistance", "Clothing Assistance"],
  },
  {
    name: "St. Vincent de Paul of Seattle, Main Office",
    website: "http://svdpseattle.org",
    phone: "(206) 767-9975",
    address: "5950 Fourth Ave. S",
    hours:
      "Drop-in: Tues., Thurs., Sat. 11 a.m. – 2 p.m., everyone;  Fri. 11 a.m. – 2 p.m., homeless clients only",
    description:
      "Food bank will collect mail. Clients must first register with the food bank. Mail can only be held for up to one month. Serves homeless clients without a mailing address. Services include: assistance to get an identification card/ID, housing assistance, healthcare, job readiness, education, utilities assistance, and more. No fees. Helps RV (Recreational Vehicle) residents access wastewater disposal services.",
    categories: [
      "Identification Services",
      "Veteran Services",
      "Immigrant and Refugee Services",
      "Mail Services",
      "Food Assistance",
    ],
  },
  {
    name: "Swedish Medical Center, Ballard",
    website: "http://swedish.org/locations/ballard-campus",
    phone: "(206) 782-2700",
    address: "5300 Tallman Ave. NW",
    hours: "24/7",
    description:
      "Offers diagnosis, treatment, health management, and emergency medical services. Social workers available. Staff is multi-lingual. Serves everyone.",
    categories: ["General Health Services"],
  },
  {
    name: "Swedish Medical Center - Ballard, Addiction Recovery",
    website: "http://swedish.org/services/addiction-recovery",
    phone: "(206) 781-6048",
    address: "5300 Tallman Ave. NW",
    hours: "Mon.–Fri.: 9 a.m.–5 p.m.",
    description:
      "Evaluation, diagnosis, detoxification, treatment, and support for people with chemical dependencies, including pregnant and postpartum child-bearers. Inpatient care, if needed. Staff include physicians, specially-trained nurses, certified chemical dependency counselors, psychiatrists, dietitians, spiritual counselors, and occupational or recreational therapists. No referral needed. Appointment is required.",
    categories: ["Drug and Alcohol Services"],
  },
  {
    name: "Swedish Medical Center, Center for Perinatal Bonding and Support",
    website:
      "http://swedish.org/locations/center-for-perinatal-bonding-and-support",
    phone: "(206) 320-7288",
    address: "1101 Madison St., No. 500",
    hours: "Day Program: Mon.–Thu.: 9:30 a.m.–3 p.m.",
    description:
      'Offers specialized, knowledgeable and timely care to prevent and treat perinatal mood and anxiety disorders, treat postpartum depression, and strengthen attachment. By offering compassionate, nonjudgmental, short-term care and consultations, we hope to reduce the shame and stigma that surrounds perinatal mental health. The "Day Program" offers individual and group therapies and interaction with those dealing with similar experiences. Psychiatric support is provided, if needed.',
    categories: [
      "Family and Maternity Services",
      "Womxn's Health Services",
      "Mental Health Services",
    ],
  },
  {
    name: "Swedish Medical Center, Cherry Hill",
    website: "http://swedish.org/locations/cherry-hill-campus",
    phone: "(206) 320-2000",
    address: "500 17th Ave.",
    hours: "24/7",
    description:
      "Offers diagnosis, treatment, health management and emergency medical services. Social workers available. Staff is multi-lingual. Serves everyone.",
    categories: ["General Health Services"],
  },
  {
    name: "Swedish Medical Center - First Hill",
    website: "http://swedish.org/locations/first-hill-campus",
    phone: "(206) 386-6000",
    address: "747 Broadway",
    hours: "24/7",
    description:
      "Offers diagnosis, treatment, health management and emergency medical services. Social workers available. Staff is multi-lingual. Serves everyone.",
    categories: ["General Health Services"],
  },
  {
    name: "Swedish Medical Center, Inpatient Care, Ballard",
    website: "http://swedish.org/locations/ballard-campus/behavioral-health",
    phone: "(206) 781-6048",
    address: "5300 Tallman Ave. NW",
    hours: "Mon.: 8 a.m.–6:30 p.m., Tue.–Fri.: 9 a.m.–6:30 p.m.",
    description:
      "Beneficial for people who are experiencing an acute mental illness and require intensive 24-hour care to stabilize their condition. Develops treatment plans, which promote stability, and maximize daily functioning. Services include: counseling, therapies, nutrition, pharmacology, spirituality, and outpatient consultations. Serves patients 18-64 years old. Offers 22 beds and quiet rooms.",
    categories: ["Mental Health Services"],
  },
  {
    name: "Swedish Medical Center, Medication Assisted Treatment",
    website: "http://swedish.org",
    phone: "(206) 386-6111;",
    address: "1401 Madison St., No. 100",
    description:
      "Detoxification with suboxone, inpatient, medication assisted treatment (MAT), serves adults 18. Also a specialty program for pregnant women, 16 and older. Provides Department of Behavioral Health and Recovery/DBHR-certified services. Call for information and to apply. Accepts Apple Health (Medicaid) and most private insurance. Swedish Hospital Medical Center has various programs and clinics. Mission is to improve the health and well-being of each person served.",
    categories: [
      "Drug and Alcohol Services",
      "Family and Maternity Services",
      "Womxn's Health Services",
    ],
  },
  {
    name: "Swedish Medical Center, Pregnancy Program, Detoxification, & Inpatient",
    website: "http://swedish.org",
    phone:
      "Pregnancy Program: (206) 781-6209; Detoxification and inpatient: (206) 781-6048",
    address: "5300 Tallman Ave. NW",
    description:
      "Detoxification with Suboxone, inpatient, medication assisted treatment and a specialty program for pregnant women. Provides Department of Behavioral Health and Recovery/DBHR-certified services. Serves pregnant women 16 and older. Call for information and to apply. Accepts Apple Health (Medicaid) and most private insurance. Swedish Hospital Medical Center has various programs and clinics. Mission is to improve the health and well-being of each person served.",
    categories: [
      "Family and Maternity Services",
      "Drug and Alcohol Services",
      "Womxn's Health Services",
    ],
  },
  {
    name: "TechConnect WA",
    website: "http://techconnectwa.org",
    phone: "(800) 216-1132",
    hours: "Every day: 8 a.m.—8 p.m.",
    description:
      "Provides help using your smartphone, tablet, or computer. Services include tech help to set up a video call, order groceries or medication online, stream movies, schedule video appointments with medical professionals.",
    categories: ["Senior Services"],
  },
  {
    name: "Teen Feed",
    website: "http://teenfeed.org",
    phone: "(206) 522-4366\ninfo@teenfeed.org",
    address: "4740 B University Way NE",
    hours: "Drop-in: Tue., Thu.: 4:30–6:30 p.m.; dinner: daily: 7–8 p.m.",
    description:
      "Provides a Meal Program that offers youth nutritious food, respite, and support. Over a warm meal, trained advocates and support coordination staff link youth with the resources and services they need to achieve stability. Programs: Teen Feed Meal, the Street Talk Outreach Program (STOP), Service Links for Youth (SLY). Healthcare support is an integrated component of all existing programs.",
    categories: [
      "Immigrant and Refugee Services",
      "Survivor Support Services",
      "Services For People of Color",
      "LGBTQIA+ Services",
      "Native & Indigenous Services",
      "Food Assistance",
      "Mail Services",
    ],
  },
  {
    name: "Tenant Law Center",
    website: "http://ccsww.org/get-help/specialized-services/tenant-law-center",
    phone: "(206) 324-6890",
    address: "100 23rd Ave. S (Randolph Carter Family Center)",
    hours: "Mon. – Fri., 9 a.m. – 5 p.m.",
    description:
      "Tenant Law Center provides free legal representation to tenants facing evictions or subsidy termination. If you are a low-income renter in Seattle and you have received an eviction notice, subsidy termination letter or a payment plan from your landlord, call for appointment. Also provides legal advocacy for homeless families, and free legal representation services to all Rapid Re-Housing providers in King County. If you need help with any other housing issue, please call intake line at 206-324-6890 for a referral. Does not accept walk-ins. Operated by Catholic Community Services.",
    categories: ["Legal Services"],
  },
  {
    name: "Tenants Union of Washington State",
    website: "http://tenantsunion.org",
    phone: "(206) 723-0500",
    address: "5425 Rainier Ave. S, No. B",
    hours:
      "Hotline: Mon. – Wed., Fri., 10 a.m. – 12:30 p.m., 1:30 – 4 p.m., Thurs., 10 a.m. – 12:30 p.m.",
    description:
      "Phone hotline and walk-in service for tenants/renters. Informs and empowers tenants with the knowledge and skills needed to keep themselves and their families safely housed.",
    categories: ["Housing Services", "Legal Services"],
  },
  {
    name: "The Bikery",
    website: "http://thebikery.org",
    phone: "info@thebikery.org",
    address: "845 Hiawatha Pl. S",
    hours: "Sat., Sun., 12 - 6 p.m.",
    description:
      "Free bikes program for those experiencing homelessness. Helps you fix your bike yourself. You will have access to a wide range of tools and volunteer knowledge to help you as much (or as little) as you need. Refurbished discount bikes available to purchase. Bikes are donated by community members and refurbished by volunteers. They get donations every week and inventory changes quickly, so check back often.",
    categories: ["Transportation Assistance"],
  },
  {
    name: "The Bridge Care Center",
    website: "http://bridgecarecenter.org",
    phone: "(206) 789-0220",
    address: "5710 22nd Ave NW, Building B",
    hours:
      "Tues., Thurs., 10 a.m. – 12 p.m. Closed first Tuesday of the month.",
    description:
      "Offers adult clothing for all genders, hygiene items. Outdoor gear offered when available. Outreach case managers are available to provide guidance on useful resources for unhoused individuals in the Ballard and Greater Seattle area. Phone use is available. No ID or referral requirements.",
    categories: ["Clothing Assistance"],
  },
  {
    name: "The Giving Room Food Bank",
    website: "http://thegivingroomseattle.org",
    phone: "(206) 552-9586",
    address: "10510 Stone Ave N",
    hours: "Mon., 9:30 a.m. – 12:45 p.m.",
    description:
      "The Giving Room food bank offers food, friendship, prayer, and a door into community. Epic Life Church in north Seattle hosts this grocery-store-style shopping experience where guests can shop for free groceries (e.g., produce, dairy, frozen meat, dry goods) and personal items. We all have something valuable to offer the world—come give and receive!",
    categories: ["Food Assistance"],
  },
  {
    name: "The Mockingbird Society",
    website: "http://mockingbirdsociety.org",
    phone: "(206) 323-5437",
    address: "2100 24th Ave S, No. 240",
    description:
      "Provides a space for young folk (all ages up to 25 years old) who have experienced foster care or homelessness to connect, grow, and share their experiences in the name of transforming and improving the foster care systems and ending youth homelessness. Participants develop leadership and self-advocacy skills while effecting positive change for the generations of young people that will come after them. Working in partnership with young people who’ve lived through the systems and transforming, changing policies, perceptions, and practices that stand in between any young person and a safe, supportive, stable home.",
    categories: [
      "Employment and Training Services",
      "Services For People of Color",
    ],
  },
  {
    name: "The Northwest Network of Bi, Trans, Lesbian and Gay Survivors of Abuse",
    website: "http://nwnetwork.org",
    phone: "(206) 568-7777",
    address: "Call for location.",
    hours: "Call and leave a voicemail or email info@nwnetwork.org.",
    description:
      "Provides direct service advocacy-based counseling over the phone or in person. Serves LGBTQIA+ people of all ages who are being, or who have been, emotionally or physically abused by another person. Call and leave a voicemail or contact info@nwnetwork.org and an advocate will be in touch very soon. No fees.",
    categories: [
      "Survivor Support Services",
      "LGBTQIA+ Services",
      "Mental Health Services",
    ],
  },
  {
    name: "Therapeutic Health Services, Eastside",
    website: "http://ths-wa.org/locations/eastside-branch",
    phone: "(425) 747-7892",
    address: "1412 140th Place NE, Bellevue",
    hours: "Mon.–Fri.: 7 a.m.–4:30 p.m.",
    description:
      "Individual and group counseling for mental health and post-traumatic stress disorder, culturally competent counseling. Provides Chemical Dependency Assessments, Medication-Assisted Treatment (Methadone/Suboxone), Adult Mental Health Services, Pregnant and Parenting Program (P3), Veterans Services, African-American Ethnic Mental Health Specialty, Crisis Intervention, Medical Exams, Medication Management. Sliding-fee scale based on the patient’s level of income, and accepts all Apple Health/Medicaid.",
    categories: ["Mental Health Services", "Drug and Alcohol Services"],
  },
  {
    name: "Therapeutic Health Services - Kent Branch",
    website: "http://ths-wa.org/locations/kent-branch",
    phone: "(253) 681-0010",
    address: "24823 Pacific Highway S., No. 103, Kent",
    hours: "Mon.–Fri.: 9 a.m.–5:30 p.m.",
    description:
      "Individual and group counseling for mental health and post-traumatic stress disorder, culturally competent counseling. This branch provides Chemical Dependency Assessments, Medication-Assisted Treatment (Methadone/Suboxone), and Adult Mental Health Services. Sliding-fee scale based on the patient’s level of income, and accepts all Apple Health/Medicaid.",
    categories: ["Mental Health Services", "Drug and Alcohol Services"],
  },
  {
    name: "Therapeutic Health Services, Rainier",
    website: "http://ths-wa.org/locations/rainier-branch",
    phone: "(206) 723-1980",
    address: "5802 Rainier Ave. S",
    hours: "Mon.–Fri.: 8 a.m.–4:30 p.m.",
    description:
      "Individual and group counseling to help manage chronic and short-term mental health issues, and post-traumatic stress disorders, and culturally competent counseling. This branch provides Adult Mental Health Services, Veterans Services, African-American Ethnic Mental Health Specialty, Crisis Intervention, Medical Exams, Medication Management. Sliding-fee scale based on the patient’s level of income, and accepts accept all Apple Health/Medicaid.",
    categories: ["Drug and Alcohol Services", "Mental Health Services"],
  },
  {
    name: "Therapeutic Health Services, Seneca",
    website: "http://ths-wa.org/locations/summit-seneca-branch",
    phone: "(206) 323-0930",
    address: "1305 Seneca St.",
    hours:
      "Front Office: Mon.–Thu.: 7 a.m.–5:30 p.m.; Fri.: 7 a.m.–4:30 p.m.; Dispensary Hours: Early Dosing: Mon.–Fri.: 6–6:30 a.m.; Sat.: 6–7:30 a.m.; Regular Dosing: Mon.–Fri.: 6:30–11:30 a.m.; Sat.: 7:30–11:30 a.m.",
    description:
      "Individual and group counseling for mental health and post-traumatic stress disorder, culturally competent counseling. This branch provides Chemical Dependency Assessments, Medication-Assisted Treatment (Methadone/Suboxone), Adult Mental Health Services, Pregnant and Parenting Program (P3), Veterans Services, African-American Ethnic Mental Health Specialty, Crisis Intervention, Medical Exams, Medication Management. Sliding-fee scale based on the patient’s level of income, and accepts all Apple Health/Medicaid.",
    categories: [
      "Family and Maternity Services",
      "Mental Health Services",
      "Drug and Alcohol Services",
    ],
  },
  {
    name: "Therapeutic Health Services, Shoreline Branch",
    website: "http://ths-wa.org/locations/shoreline-branch",
    phone: "(206) 546-9766",
    address: "16715 Aurora Ave. N, No. 102, Shoreline",
    hours:
      "Front Office: Mon.–Fri.: 7 a.m.–4:30 p.m.; Dispensary Hours: Early Dosing: Mon.–Sat.: 6–6:30 a.m.; Regular Dosing: Mon.–Sat.: 6:30 a.m.–12:15 p.m.",
    description:
      "Individual and group counseling for mental health and post-traumatic stress disorder, and culturally competent counseling. This branch provides Chemical Dependency Assessments, Medication-Assisted Treatment (Methadone/Suboxone), Adult Mental Health Services, Pregnant and Parenting Program (P3), Veterans Services, African-American Ethnic Mental Health Specialty, Crisis Intervention, Medical Exams, Medication Management. Sliding-fee scale based on the patient’s level of income, and accepts all Apple Health/Medicaid. For services at this branch call (206) 546-9766.",
    categories: [
      "Family and Maternity Services",
      "Mental Health Services",
      "Drug and Alcohol Services",
    ],
  },
  {
    name: "Therapeutic Health Services, Summit Branch",
    website: "http://ths-wa.org/locations/summit-seneca-branch",
    phone: "(206) 323-0930",
    address: "1116 Summit Ave.",
    hours:
      "Front Office: Mon.–Thu.: 7 a.m.–5:30 p.m.; Fri.: 7 a.m.–4:30 p.m.; Dispensary Hours: Early Dosing: Mon.–Fri.: 6–6:30 a.m.; Sat.: 7–7:30 a.m.; Regular Dosing: Mon.–Fri.: 6:30–11:30 a.m.; Sat.: 10:15–11:30 a.m.",
    description:
      "Individual and group counseling for mental health and post-traumatic stress disorder, culturally competent counseling. This branch provides Chemical Dependency Assessments, Medication-Assisted Treatment (Methadone/Suboxone), Adult Mental Health Services, Pregnant and Parenting Program (P3), Veterans Services, African-American Ethnic Mental Health Specialty, Crisis Intervention, Medical Exams, Medication Management. Sliding-fee scale based on the patient’s level of income, and accepts all Apple Health/Medicaid. For services at this branch call (206) 323-0930.",
    categories: [
      "Mental Health Services",
      "Family and Maternity Services",
      "Drug and Alcohol Services",
    ],
  },
  {
    name: "The Welcome Table",
    website: "http://www.gethsemane-ministries.com/white-center-location-.html",
    phone: "(206) 226-5994",
    address: "1320 SW 102nd St \nSeattle",
    hours: "Saturday 12:00 – 1:30 p.m.",
    description:
      "A meal program called The Welcome Table serves lunch to neighbors in need in the White Center area every Saturday at noon at The Body of Christ Church. In addition, snacks, toiletries, and clothing are handed out.  Representatives from various social-service agencies are often present to provide information about their services. The Westside Interfaith Network and volunteers help serve lunch and distribute essential items every Saturday to those in need.",
    categories: ["Food Assistance"],
  },
  {
    name: "Third Avenue Center",
    website: "http://uwmedicine.org/locations/third-avenue-center",
    phone: "(206) 521-1231",
    address: "2028 3rd Ave.",
    hours:
      "Mon., Tues., Thurs., Fri.: 8:05 a.m. – 4 p.m.\nWed.: 9:15 – 11:30 a.m., 1 – 3:30 p.m.\nClosed for lunch Mon. – Fri.: Noon - 1p.m.",
    description:
      "Primary care clinic and mental health services for homeless, low-income, and at-risk people. Provides financial assistance for those who qualify. Services include psychiatric consultations, medication management, and recommendations for continued psychiatric care. Visit in person; established clients may call. Accepts Medicare, Apple Health (Medicaid) and private insurance. Financial counseling is available. For psychiatry must have primary care physician referral (within Harborview). ID required for financial assistance.",
    categories: [
      "Womxn's Health Services",
      "General Health Services",
      "Problem Gambling Resources",
      "Mental Health Services",
      "LGBTQIA+ Services",
    ],
  },
  {
    name: "Thunderbird Treatment Center",
    website:
      "http://sihb.org/services-and-programs/thunderbird-treatment-center",
    phone: "(206) 342-9360",
    address: "Services paused until new location is found.",
    hours: "Intake by Phone: Mon. – Fri., 8 a.m. – 5 p.m.",
    description:
      "Services are currently unavailable while a new location is found; call for updates. Residential intensive inpatient chemical dependency treatment center. Native American clients can self-refer. Provides culturally appropriate treatment through a 45-day intensive program and six-month long-term care program for Native clients. Cross-addictions are treated. DBHR-certified service(s). Focuses on Native American adults but will serve anyone. Must be assessed. Program costs $3,600. No sliding scale. Accepts Apple Health (Medicaid).",
    categories: [
      "Mental Health Services",
      "Drug and Alcohol Services",
      "Native & Indigenous Services",
    ],
  },
  {
    name: "Transform Burien",
    website: "http://transformoutreach.org",
    phone: "(206) 839-6620",
    address:
      "15623 Des Moines Memorial Dr., Burien\nLaundry: 15006 SW Ambaum Blvd., Burien",
    hours:
      "Clothing Bank: Wed., 12 – 2 p.m., Sun., 3 – 5 p.m.; Hot Meal: Wed., Fri., 12 – 2 p.m., Sun. 3 – 5 p.m.; Food bank: Wed., Fri., 12 – 2 p.m., Sun. 3 – 5 p.m.; Showers: call for availability; Laundry at other location: Fri. 9:30 – 11 a.m.",
    description:
      "Transform Burien provides free food, clothing, laundry, and more. Shower truck and towels, clean underwear, shampoo and soap are provided. Showers have a 15 minute limit. Laundry located at listed address, volunteers will put quarters into the machines for those in need to do their laundry. Detergent, bleach, and dryer sheets are provided. Also provides a medical and dental van generally once a month.",
    categories: ["Food Assistance", "Hygiene Services", "Clothing Assistance"],
  },
  {
    name: "Trans Lifeline",
    website: "http://translifeline.org",
    phone: "(877) 565-8860",
    hours: "Mon. – Fri., 10 a.m. – 6 p.m.",
    description:
      "Trans Lifeline is a hotline available in the U.S. (and Canada) staffed by transgender people for transgender people. Can help if you're in crisis or considering self-harm. Anonymous and confidential. Emergency services are never called unless you ask. Even if you’re not in crisis or if you’re not sure that you’re trans, call if you need to talk to a trans peer. Website has additional resources that are trans verified, trans led, and BIPOC-led or -centered resources, where possible. Also assists getting new identification cards. Offers direct emotional and financial support to trans people in crisis.",
    categories: [
      "Services For People of Color",
      "Emergency and Crisis Lines",
      "LGBTQIA+ Services",
      "Identification Services",
    ],
  },
  {
    name: "Traugott Terrace",
    website: "http://ccsww.org/get-help/housing/permanent-housing",
    phone: "(206) 267-3023",
    address: "2317 3rd Ave.",
    hours: "By appointment only.",
    description:
      "Provides 38 permanent and 12 transitional clean and sober apartments for individuals in recovery. Residents must be actively committed to a program of recovery while at Traugott. Income maximum is 30 percent of annual area median income (AMI), and rent limits apply. Serves single low-income men and women 18 and older who are actively engaged in a recovery program. Please call for availability and for referral to other housing options within Catholic Housing Services. Pre-application can be accessed on website. Driver's license or Social Security card is required to access services.",
    categories: ["Drug and Alcohol Services", "Housing Services"],
  },
  {
    name: "Tukwila Pantry",
    website: "http://tukwilapantry.org",
    phone: "(206) 431-8293",
    address: "Riverton Park United Methodist, 3118 S 140th St., Tukwila",
    hours: "Food Pantry: Tues., Thurs., Sat., 10 a.m. – 2 p.m.",
    description:
      "Operates a food pantry program for residents of Tukwila, SeaTac, Burien and Boulevard Park. No fees. First-time registrants and clients returning for their first visit of the new year must bring confirmation of address. Doesn't require proof of income. Proof of address can be a utility bill, lease, hotel/motel rental receipt. ID required.",
    categories: ["Food Assistance"],
  },
  {
    name: "Ukrainian Community Center of Washington",
    website: "http://uccwa.us",
    phone: "(425) 430-8229",
    address: "13470 MLK Jr. Way S",
    hours: "Mon. – Fri., 9 a.m. – 5 p.m., by appointment only.",
    description:
      "Immigration assistance with green cards, naturalization and citizenship classes. Provides individual and family counseling, case management and advocacy. Social services include domestic violence screenings, assessments and intervention, parenting education, assistance accessing state and federal benefits and assistance with Native Countries documents. Seniors have access to a daily lunch program, nutrition education, enhanced fitness and counseling services. Serves Eastern European refugee and immigrant communities. Some services are offered free of charge to low-income families.",
    categories: ["Mental Health Services", "Immigrant and Refugee Services"],
  },
  {
    name: "Unemployment Law Project",
    website: "http://unemploymentlawproject.org",
    phone: "(206) 441-9178",
    hours: "Mon. – Fri., 9 a.m. – 5 p.m.",
    description:
      "Legal counseling and representation at administrative hearings for persons denied Washington state unemployment benefits. Provides information on your employment and unemployment rights, guidance when navigating quitting your job or being terminated, and legal advice on employment and employee/employer relations. Office is closed for in-person appointments. Aides in legal representation for anyone who has opened a claim or is eligible to open a Washington state unemployment claim. Call for intake interview. No fees for information or advice with an attorney. Charges $200 if representation is successful.",
    categories: ["Legal Services"],
  },
  {
    name: "Union Jobs at MLK Labor",
    website: "http://mlklabor.org/union-jobs",
    phone: "(206) 441-8510",
    address: "union job listing online",
    description:
      "Online list of open union jobs for living wages and benefits. Full time or part time, many entry level union jobs such as customer service, hospitality field, food service, cashiering, working in a grocery store, barista, cooks, retail sales, painter, human services, airport agents, hotel attendants, warehouse processing, and many others. Shows description of employer company, each union, job duties, pay compensation and details. Apply online by registering to log in. After applying for a job online, MLK Labor offers, when possible, to advocate for qualified applicants to be hired, just let them know at unionjobs@mlklabor.org",
    categories: ["Employment and Training Services"],
  },
  {
    name: "United Indians of All Tribes Foundation",
    website: "http://unitedindians.org",
    phone: "(206) 285-4425",
    address: "5011 Bernie Whitebear Way",
    hours: "Mon. – Sun., 10 a.m. – 5 p.m.",
    description:
      "Social service provider, community center, and cultural home for the urban Indigenous community. Offers family services, support for expectant families, school readiness, economic self-sufficiency, employment services program, housing stability, and health and well-being. Native Workforce Services Program; Emerging Native Artists Cohort to develop professional skills and businesses; Labateyah Youth Home, Foster Care, Homelessness Prevention, Preschool, Native Elders Program; Native Veterans Program. Offers free online Daybreak Star Radio accessible through the website to reconnect heritage, belonging, and significance as a people.",
    categories: [
      "Native & Indigenous Services",
      "Employment and Training Services",
      "Family and Maternity Services",
    ],
  },
  {
    name: "United States Mission",
    website: "http://usmission.org",
    description: "No longer active.",
    categories: ["Housing Services"],
  },
  {
    name: "United Way, Food Delivery",
    website: "http://uwkc.org/need-help/food-delivery",
    phone: "(253) 237-2019",
    description:
      "United Way of King County is offering free, weekly home delivery of groceries. This a free service available to anyone in King County who is unable to afford groceries and cannot access their local food bank. You can participate in this program regardless of your citizenship or immigration status. No information about citizenship status is collected during enrollment. Apply online, or phone, or email. To participate in this program, you must: Live in King County, Washington; Be unable to access your local food bank in person; Be unable to afford groceries. May be a wait list; If you need immediate assistance with getting food, please call 2-1-1.",
    categories: [
      "Immigrant and Refugee Services",
      "Food Assistance",
      "Senior Services",
      "Native & Indigenous Services",
      "Services For People of Color",
    ],
  },
  {
    name: "United Way, Get Help With Rent",
    website: "http://uwkc.org/renthelp",
    phone: "(253) 237-2485",
    hours: "Mon. – Fri., 9 a.m. – 5 p.m.",
    description:
      "Program provides rent and utility relief to households most impacted by the COVID-19 pandemic such as Illness, Loss of Income, or Unemployment. The program is currently out of funds, but submitting a form on their website or calling the helpline will provide you support in other ways. The purpose of the eligibility screening criteria is to target those most likely to become homeless due to the COVID-19 pandemic. Eligibility is: Income at or below 50% of Area Median Income (AMI), and Experiencing a financial hardship due to the COVID-19 outbreak, and At risk of experiencing homelessness or currently experiencing housing instability.",
    categories: [
      "Services For People of Color",
      "Financial Assistance",
      "Native & Indigenous Services",
    ],
  },
  {
    name: "United Way, Student Benefits Hub",
    website: "http://uwkc.org/benefitshub",
    phone: "(206) 649-8124",
    address: "720 Second Ave.",
    hours: "Mon.-Fri.: 9 a.m.-5 p.m.",
    description:
      "Program for King County community or technical college students to help with everyday financial tools to keep you in school. Services include help paying for groceries, Utility bill assistance, Access to food, Paying for the bus, Financial coaching,\nFinancial aid application assistance, Emergency financial grants, help with taxes, help with legal services, Housing supports, and more. Schedule an appointment online",
    categories: [
      "Financial Assistance",
      "Employment and Training Services",
      "Services For People of Color",
      "Native & Indigenous Services",
      "Immigrant and Refugee Services",
    ],
  },
  {
    name: "University District Food Bank",
    website: "http://udistrictfoodbank.org/services",
    phone: "(206) 523-7060",
    address: "5017 Roosevelt Way NE",
    hours:
      "Mon., 9 a.m. – 3 p.m.; Tues., Thurs., 11 a.m. – 7 p.m.; Fri., 11 a.m. – 4 p.m.",
    description:
      "Food pantry, baby cupboard and home delivery. Offers fresh fruits and vegetables, dairy, frozen meat, canned and dried goods, toiletries, baby formula, diapers, and pet food plus connections to important community resources. Visit once a week. Serves primarily the unhoused and any residents in ZIP codes 98102, 98103, 98105, 98112, 98115 and 98125. Visit in person. Call for home delivery. Documents required: photo ID and proof of address. No fees.",
    categories: ["Food Assistance"],
  },
  {
    name: "University Heights Center",
    website: "http://uheightscenter.org",
    phone:
      "General services inquiries: (206) 527-4278; Safe Lot cars intake: (501) 291-0360; Safe Lot RV intake: (571) 279-0451",
    address: "5031 University Way NE",
    hours:
      "Designated parking spots are reserved Mon. – Fri.: 7 p.m. — 7:30 a.m.; Sat.: 4 p.m. — Mon.: 7:30 a.m.; breakfast: Sun.: 9:30 – 10:30 a.m.; lunch: Sun.: 12 – 2 p.m.; dinner: Wed., Fri. – Sun.: 6 – 8 p.m.; mobile medicine van: 1st and 3rd Fri. of each month: 5 – 7 p.m.; annual warm winter supplies drive: 1st Sun. of November",
    description:
      "Safe Lot program provides individuals with a safe and stable place to park their vehicles overnight so they may remain compliant with local laws, have access to restroom facilities, and be able to regularly access social services. Designed for people who are experiencing homelessness and using their vehicle as their primary residence. Individuals interested in the Safe Lot program must own their vehicle and have active insurance for their vehicle to be eligible. Residents must also take and pass a background check, as UHeights Center serves young children. Vehicle residency outreach team is available for individuals if they're not in Safe Lot. Free meal services available onsite almost every day of the week, and a community sock box is available 24/7. Health services also provided twice a month.",
    categories: ["General Health Services", "Food Assistance"],
  },
  {
    name: "University of Washington Medical Center, Maternal & Infant Care Clinic",
    website: "http://uwmedicine.org/locations/maternal-and-infant-care-uwmc",
    phone: "(206) 598-4070",
    address: "1959 NE Pacific St., 3rd Floor, Room SW-350",
    hours: "Clinic: Mon. - Fri., 8 a.m. to 5 p.m.; Emergency Room: 24/7",
    description:
      "Full-service obstetrical services for pregnant women. Fees vary according to services. Accepts Apple Health (Medicaid), private insurance and numerous managed care plans. Will not refuse services pending obtaining insurance coverage for the patient.",
    categories: ["Family and Maternity Services"],
  },
  {
    name: "University of Washington Medical Center, Virology Clinic",
    website: "http://uwmedicine.org/locations/virology-uwmc-roosevelt",
    phone: "(206) 598-8750",
    address: "4245 Roosevelt Way NE, 3rd Floor",
    hours:
      "PrEP Clinic: Mon., 1 – 5 p.m., Wed., 8 a.m. – 12 p.m.; Appointments: Mon., Wed., Fri., 8:30 a.m. – 5 p.m.",
    description:
      "Offers comprehensive health care and prescriptions, case management and outreach services. Will prescribe PrEP (preventative medicine for HIV at-risk individuals). Serves those diagnosed or at high risk for HIV infection. Call for an appointment. Private insurance, Medicare and Apple Health (Medicaid) accepted.",
    categories: ["HIV/AIDS Services"],
  },
  {
    name: "Uplift Northwest",
    website: "http://upliftnw.org/job-seekers",
    phone: "(206) 728-5627",
    address: "2515 Western Ave.",
    hours:
      "Intake: Mon., 8 – 11 a.m.; Office: Mon. – Fri., 6:30 a.m. – 2:30 p.m.",
    description:
      "Uplift Northwest is on a mission to provide dignified jobs and job-readiness services to men and women experiencing poverty and homelessness in the Puget Sound Region. We connect men and women with life-changing job opportunities. Common job opportunities include: landscaping, hospitality, food service and prep, warehouse, sanitation, housekeeping, moving assistance, and more. Helps earn and pays for food industry certifications. For Uplift workers, Uplift offers lockers services, housing assistance, and career training opportunities, as well as access to community partner-provided: meals, medical, dental, and cell phone services.",
    categories: [
      "Dental and Vision Services",
      "Housing Services",
      "Food Assistance",
      "Hygiene Services",
      "Employment and Training Services",
    ],
  },
  {
    name: "Uplift Northwest, Free Eye Clinic",
    website: "http://upliftnw.org",
    phone: "(206) 728-5627",
    address: "2515 Western Ave.",
    hours: "September–June: Every Tue.: 9 a.m.–noon",
    description:
      "Offers a free eye exam and pair of glasses once per year. Serves those without vision insurance who are low income. To access, please email eyeclinic@upliftnw.org or text 206-957-3841 with your full name. You will be added to a waitlist and will\nbe contacted 1-1.5 weeks before your appointment time. The waitlist is typically 2-6 weeks long.",
    categories: ["Dental and Vision Services"],
  },
  {
    name: "Urban League Metropolitan Seattle, Construction Trades Program",
    website: "http://urbanleague.org/priorityhire",
    phone: "(206) 461-3792",
    address: "105 14th Ave., No. 200",
    description:
      "Assists individuals to enter pre-apprenticeship programs and access to work in the construction industry. Provides wraparound support services. Must be 18 or older, WA state resident, have a serious interest in construction, and attend an information session after applying. Apply online, or phone for more information. For program participants, provides: financial assistance for learning supplies, work clothes, transportation, union dues, initiation fees, soft skills training, skills re-licensing and certification; additionally provides referrals to: credit counseling, digital literacy, and housing assistance.",
    categories: [
      "Services For People of Color",
      "Re-entry Assistance",
      "Employment and Training Services",
    ],
  },
  {
    name: "Urban League Metropolitan Seattle, Harder House",
    website: "http://urbanleague.org/homeless-outreach",
    phone: "(206) 461-3792",
    address: "105 14th Ave., No. 200",
    hours: "Mon. – Fri., 9 a.m. – 5 p.m.",
    description:
      "The ULMS Harder House is an independent living facility owned by the Urban League of Metropolitan Seattle for the sole purpose of providing young men who have aged out of the foster care system (or who are currently experiencing homelessness) with transitional housing. Serving 18 – 24 year old individuals of diverse backgrounds, including those who have been formerly justice involved. Intake packet in person, by phone, or email. ULMS empowers African Americans, and other diverse underserved communities, to thrive by securing educational and economic opportunities. The Harder House program does not discriminate on the basis of race. Complete an intake packet by visiting the office or calling to have a packet mailed to you.",
    categories: [
      "Housing Services",
      "Re-entry Assistance",
      "Services For People of Color",
    ],
  },
  {
    name: "Urban League Metropolitan Seattle, Home Base",
    website: "http://urbanleague.org/homeless-outreach",
    phone: "(206) 461-3792",
    address: "105 14th Ave., No. 200",
    hours: "Mon. – Fri., 9 a.m. – 5 p.m.",
    description:
      "The ULMS Home Base program is to stop the pipeline into homelessness by fighting against the obstacle of eviction. Provides one-time emergency funds to pay rent, social workers for other services, develop a long-term housing plan, and legal aid to help navigate the judicial side of the process. Individuals must first have a court summons from the King County Superior Court, then be referred to ULMS through the King County Bar Association’s Housing Justice Project. ULMS empowers African Americans and other diverse underserved communities to thrive by securing educational and economic opportunities. Call or email for more information.",
    categories: [
      "Services For People of Color",
      "Financial Assistance",
      "Housing Services",
    ],
  },
  {
    name: "Urban League Metropolitan Seattle, Road 2 Housing",
    website: "http://urbanleague.org/homeless-outreach",
    phone: "(206) 461-3792",
    address: "105 14th Ave., No. 200",
    hours: "Mon. – Fri., 9 a.m. – 5 p.m.",
    description:
      "The ULMS Safe Parking pilot program was designed to assist residents in the city of Seattle who are unhoused and live in their motor vehicles. Includes cars, vans, and trucks only. No RVs or motor bikes. ULMS empowers African Americans and other diverse underserved communities to thrive by securing educational and economic opportunities. Any individual seeking to enter the program may do so including men, women, young adults, senior citizens, and veterans. Safe Lot operates 7 days of the week. Also provides help with employment assistance opportunities, permanent housing assistance, and full access to ULMS programs and services. Intake packet in person, by phone, or email.",
    categories: ["Services For People of Color", "Housing Services"],
  },
  {
    name: "Urban League Metropolitan Seattle (ULMS), Young Adult Shelter",
    website: "http://urbanleague.org/homeless-outreach",
    phone: "(206) 639-7477",
    address: "123 21st Ave.",
    hours: "24/7",
    description:
      "Urban League of Metropolitan Seattle (ULMC) 24 Hour Young Adult Shelter serves ages 18 – 24 years old, Central District, All gender identities welcome, All races welcome, All sexual orientations welcome. Staffed at all times for immediate assistance. Call the shelter (206) 639-7477 for intake. Provides meals, shower, clean clothes, housing search, professional development (resume building, mock interviews, job searching, etc.), and case management assessment. ULMS empowers African Americans and other diverse underserved communities to thrive by securing educational, economic opportunities. ULMC's vision is Equity for all.",
    categories: [
      "Shelters",
      "Services For People of Color",
      "LGBTQIA+ Services",
      "Housing Services",
    ],
  },
  {
    name: "Urban League Metropolitan Seattle (ULMS), Youth Web Design Program",
    website: "http://urbanleague.org/youth-web-design-program",
    phone: "(206) 461-3792",
    address: "105 14th Ave., No. 200",
    description:
      "The Urban League of Metropolitan Seattle has partnered with the Seattle Office of Economic Development (OED) to introduce the Youth Web Design pilot program. Provides an opportunity for Black youth to learn website design at no cost by connecting with local minority-owned businesses to establish and/or improve web presence. ULMS empowers African Americans, as well as other diverse underserved communities, to thrive by securing educational and economic opportunities. For questions about student participation, requirements, and additional program benefits for student families, please contact Robert Jones at rjones@urbanleague.org.",
    categories: [
      "Services For People of Color",
      "Employment and Training Services",
    ],
  },
  {
    name: "Urban League of Metropolitan Seattle (ULMS), Career Bridge",
    website: "http://urbanleague.org/careerbridge",
    phone: "(206) 461-3792",
    address: "105 14th Ave., No. 200",
    hours: "Mon. – Fri., 9 a.m. – 5 p.m.",
    description:
      "Career Bridge program is to help individuals with multiple barriers access education, employment, economic career opportunities in order to improve their quality of life. Provides job portfolio assistance (resume, cover letter, career planning, interview prep), wrap-around services, job placement assistance, transportation assistance. ULMS empowers African Americans and other diverse underserved communities to thrive by securing educational, economic opportunities. Open to any individual with a diverse background, including those with criminal histories, those experiencing homelessness, Veterans. Apply online, or phone for more information.",
    categories: [
      "Veteran Services",
      "Services For People of Color",
      "Re-entry Assistance",
      "Employment and Training Services",
    ],
  },
  {
    name: "Urban League of Metropolitan Seattle (ULMS), InfoTech Jobs Program",
    website: "http://urbanleague.org/info-tech",
    phone: "(206) 461-3792",
    address: "105 14th Ave., No. 200",
    hours: "Mon. – Fri., 9 a.m. – 5 p.m.",
    description:
      "InfoTech Jobs Program is an accelerated training program that recruits long-term unemployed adults 18 years of age or older, authorized to work in the U.S., possess a high school diploma or equivalent, any individual with a diverse background, including those with criminal histories, those experiencing homelessness, Veterans. Free training for Information Technology (IT), get certified in Cloud Computing via the Amazon Web Services (AWS) platform. ULMS empowers African Americans and other diverse underserved communities to thrive by securing educational, economic opportunities. Apply online, call or email for information.",
    categories: [
      "Re-entry Assistance",
      "Employment and Training Services",
      "Services For People of Color",
      "Veteran Services",
    ],
  },
  {
    name: "Urban League of Metropolitan Seattle (ULMS), Local Job Board",
    website: "http://urbanleague.org/ulms-job-board",
    phone: "(206) 461-3792;\ninfo@urbanleague.org",
    address: "105 14th Ave., No. 200",
    hours: "Mon. – Fri., 9 a.m. – 5 p.m.",
    description:
      "The ULMS Job Board team of job developers work diligently to find local employment opportunities that generate livable wages, provide economic stability, and open doors for new career paths. Job Board lists positions that are currently hiring, updated on a weekly basis, and community partners can send info online. Job developers assist with creating resume, cover letter, and perfecting your interview etiquette. ULMS empowers African Americans, as well as other diverse underserved communities, to thrive by securing educational and economic opportunities. Access the Job Board online. Call or visit for appointment with a Job Developer.",
    categories: [
      "Services For People of Color",
      "Employment and Training Services",
    ],
  },
  {
    name: "Urban League of Metropolitan Seattle (ULMS), Mentorship program",
    website: "http://urbanleague.org/g-r-o-o-m",
    phone: "(206) 461-3792;\nInfo@urbanleague.org",
    address: "105 14th Ave, No. 200",
    hours: "Mon. – Fri., 9 a.m. – 5 p.m.",
    description:
      "Mentorship program for ages up to 24 years old focuses on community based programming, serves as a bridge between youth, their families, and the juvenile court system. Provides outreach, engagement and other supportive services. Trained community leaders from diverse backgrounds work to engage both pre and post adjudicated young adults in positive, structured, intentional relationships. ULMS empowers African Americans, as well as other diverse underserved communities, to thrive by securing educational and economic opportunities.",
    categories: ["Re-entry Assistance", "Services For People of Color"],
  },
  {
    name: "Urban Rest Stop, Ballard",
    website: "http://urbanreststop.org/about/information/ballard",
    phone: "(206) 258-3626",
    address: "2014 NW 57th St., No. B",
    hours:
      "Mon.–Fri.: 6:30—10:30 a.m., 11:30 a.m.—12:30 p.m.; last laundry and shower at noon.",
    description:
      "Restrooms, showers, laundry facilities for adults and youth of all genders. Showers are ADA compliant. No intoxication allowed. The Ballard URS has 5 private shower rooms, 5 washers and 9 dryers, and restrooms available for use. Patrons receive free toiletries including toothbrushes, toothpaste, disposable razors, shaving cream, shampoo and soap. No fees.",
    categories: ["Hygiene Services"],
  },
  {
    name: "Urban Rest Stop, Downtown",
    website: "http://urbanreststop.org",
    phone: "(206) 332-0110",
    address: "1924 9th Ave.",
    hours:
      "Mon.–Fri., 6:30 a.m.–5 p.m.; Mon.-Thurs., last shower is 4 p.m., 3 p.m. on Fri.; \nSat.-Sun., 8:30 a.m.–5 p.m., closed noon–1 p.m.; last shower and laundry is 2:30 p.m.",
    description:
      "Restrooms, showers, laundry facilities for adults and youth of all genders. Showers are ADA compliant. No intoxication allowed. The downtown URS has private shower rooms, washer and dryer units, and large men’s and women’s restrooms. Patrons receive free toiletries. No fees. Laundry sign-up is over the phone or in person and shower sign up is in person only.",
    categories: ["Hygiene Services"],
  },
  {
    name: "Valley Behavioral Health, Kent",
    website: "http://valleycities.org",
    phone: "(253) 833-7444",
    address: "325 West Gowe St., Kent",
    hours: "Mon.–Fri.: 8:30 a.m.–5 p.m.",
    description:
      "DUI assessments, outpatient and intensive outpatient programs for people with co-occurring substance use and mental health disorders, and support for veterans. Required: Photo ID, Apple Health card, Court and/or DUI documentation if applicable. Call or visit on of their locations for more information.",
    categories: [
      "Mental Health Services",
      "Drug and Alcohol Services",
      "Veteran Services",
    ],
  },
  {
    name: "Valley Behavioral Health, Meridian Center for Health",
    website: "http://valleycities.org",
    phone: "(253) 833-7444",
    address: "10521 Meridian Ave. N",
    hours: "Mon.–Fri.: 8:30 a.m.–5 p.m.",
    description:
      "DUI assessments, outpatient and intensive outpatient programs for people with co-occurring substance use and mental health disorders, and support for veterans. Required: Photo ID, Apple Health card, Court and/or DUI documentation if applicable. Call or visit on of their locations for more information.",
    categories: [
      "Mental Health Services",
      "Veteran Services",
      "Drug and Alcohol Services",
    ],
  },
  {
    name: "Valley Cities Behavioral Health, Auburn",
    website: "http://valleycities.org",
    phone: "(253) 833-7444",
    address: "2704 I St. NE, Auburn",
    hours: "Mon.–Fri.: 8:30 a.m.–5 p.m.",
    description:
      "Treatment focusing on mental health and substance use disorders is individualized and can be provided by staff ranging from therapists to peers to specialty or program staff. Every client works with a dedicated Care Coordinator, who is their main point of contact. They help assess needs and link clients to necessary supports, both within Valley Cities and throughout the community.",
    categories: [
      "Veteran Services",
      "Mental Health Services",
      "Drug and Alcohol Services",
    ],
  },
  {
    name: "Valley Cities Behavioral Health, Bitter Lake",
    website: "http://valleycities.org",
    phone: "(253) 833-7444",
    address: "929 N 130th St., No. 3",
    hours: "Mon.–Fri.: 8:30 a.m.–5 p.m.",
    description:
      "Treatment focusing on mental health and substance use disorders is individualized and can be provided by staff ranging from therapists to peers to specialty or program staff. Every client works with a dedicated Care Coordinator, who is their main point of contact. They help assess needs and link clients to necessary supports, both within Valley Cities and throughout the community.",
    categories: [
      "Veteran Services",
      "Mental Health Services",
      "Drug and Alcohol Services",
    ],
  },
  {
    name: "Valley Cities Behavioral Health, Des Moines",
    website: "http://valleycities.org",
    phone: "(253) 833-7444",
    address: "26401 Pacific Hwy S., No. 202, Des Moines",
    hours: "Mon.–Fri.: 8:30 a.m. – 5 p.m.",
    description:
      "Treatment focusing on mental health and substance use disorders is individualized and can be provided by staff ranging from therapists to peers to specialty or program staff. Every client works with a dedicated Care Coordinator, who is their main point of contact. They help assess needs and link clients to necessary supports, both within Valley Cities and throughout the community.",
    categories: [
      "Drug and Alcohol Services",
      "Veteran Services",
      "Mental Health Services",
    ],
  },
  {
    name: "Valley Cities Behavioral Health, Enumclaw",
    website: "http://valleycities.org",
    phone: "(253) 833-7444",
    address: "1335 Cole St., Enumclaw",
    hours: "Mon.–Fri.: 8:30 a.m.–5 p.m.",
    description:
      "Treatment focusing on mental health and substance use disorders is individualized and can be provided by staff ranging from therapists to peers to specialty or program staff. Every client works with a dedicated Care Coordinator, who is their main point of contact. They help assess needs and link clients to necessary supports, both within Valley Cities and throughout the community.",
    categories: [
      "Veteran Services",
      "Mental Health Services",
      "Drug and Alcohol Services",
    ],
  },
  {
    name: "Valley Cities Behavioral Health, Federal Way",
    website: "http://valleycities.org",
    phone: "(253) 833-7444",
    address: "1336 S 336th St., Federal Way",
    hours: "Mon.–Fri.: 8:30 a.m.–5 p.m.",
    description:
      "Treatment focusing on mental health and substance use disorders is individualized and can be provided by staff ranging from therapists to peers to specialty or program staff. Every client works with a dedicated Care Coordinator, who is their main point of contact. They help assess needs and link clients to necessary supports, both within Valley Cities and throughout the community.",
    categories: [
      "Drug and Alcohol Services",
      "Mental Health Services",
      "Veteran Services",
    ],
  },
  {
    name: "Valley Cities Behavioral Health, Pike Place",
    website: "http://valleycities.org",
    phone: "(253) 833-7444",
    address: "1537 Western Ave.",
    hours: "Mon.–Fri.: 8:30 a.m.–5 p.m.",
    description:
      "Treatment focusing on mental health and substance use disorders is individualized and can be provided by staff ranging from therapists to peers to specialty or program staff. Every client works with a dedicated Care Coordinator, who is their main point of contact. They help assess needs and link clients to necessary supports, both within Valley Cities and throughout the community.",
    categories: [
      "Mental Health Services",
      "Veteran Services",
      "Drug and Alcohol Services",
    ],
  },
  {
    name: "Valley Cities Behavioral Health, Rainier Beach",
    website: "http://valleycities.org",
    phone: "(253) 833-7444",
    address: "8444 Rainier Ave. S",
    hours: "Mon.–Fri.: 8:30 a.m.–5 p.m.",
    description:
      "Treatment focusing on mental health and substance use disorders is individualized and can be provided by staff ranging from therapists to peers to specialty or program staff. Every client works with a dedicated Care Coordinator, who is their main point of contact. They help assess needs and link clients to necessary supports, both within Valley Cities and throughout the community.",
    categories: [
      "Veteran Services",
      "Mental Health Services",
      "Drug and Alcohol Services",
    ],
  },
  {
    name: "Valley Cities Behavioral Health, Renton",
    website: "http://valleycities.org",
    phone: "(253) 833-7444",
    address: "221 Wells Ave. S, Renton",
    hours: "Mon.–Fri.: 8:30 a.m.–5 p.m.",
    description:
      "Treatment focusing on mental health and substance use disorders is individualized and can be provided by staff ranging from therapists to peers to specialty or program staff. Every client works with a dedicated Care Coordinator, who is their main point of contact. They help assess needs and link clients to necessary supports, both within Valley Cities and throughout the community.",
    categories: [
      "Mental Health Services",
      "Drug and Alcohol Services",
      "Veteran Services",
    ],
  },
  {
    name: "Valley Cities, Recovery Place, Kent",
    website: "http://valleycities.org",
    phone: "(253) 652-7294",
    address: "505 Washington Ave. S, Kent",
    hours: "24/7",
    description:
      "32-bed licensed Co-occurring facility offering both Evaluation & Treatment and Secure Withdraw Management beds, primarily serving King County; in patient treatment for acute needs. All clients are brought to the facility on involuntary status, with on-site video King County Court proceedings.",
    categories: ["Mental Health Services", "Drug and Alcohol Services"],
  },
  {
    name: "Valley Cities, Recovery Place, Seattle",
    website: "http://valleycities.org/medical-detox-residential-treatment",
    phone: "(253) 833-7444",
    address: "1701 18th Ave. S",
    hours: "24/7",
    description:
      "Medical Detox and 28-day Intensive Residential programs, counseling and support groups.",
    categories: ["Drug and Alcohol Services", "Mental Health Services"],
  },
  {
    name: "Veterans Affairs Crisis Line",
    phone: "988, press 1 for veterans",
    hours: "24/7",
    description:
      "Connects Veterans and Service members in crisis and their families and friends with qualified, caring VA responders through a confidential toll-free hotline, online chat, or text.",
    categories: ["Veteran Services", "Emergency and Crisis Lines"],
  },
  {
    name: "Washington Health Plan Finder",
    website:
      "http://hca.wa.gov/health-care-services-supports/apple-health-medicaid-coverage/eligibility",
    address: "Cherry Street Plaza\n626 8th Ave. SE\nOlympia, WA",
    description:
      "Washington Health Plan Finder is an online webpage service to enroll or get information about health insurance plans such as the public benefit free health insurance plan. Find out if you are eligible for free or low-cost Washington Apple Health (Medicaid) coverage. Links to resources for each situation for health care coverage.",
    categories: ["General Health Services"],
  },
  {
    name: "Washington Poison Center Information Line",
    phone: "Emergency or Information Line: (800) 222-1222",
    address: "155 NE 100th St., No. 100",
    hours: "24/7",
    description:
      "Provides immediate, free and expert treatment advice and assistance on the telephone in case of exposure to poisonous, hazardous or toxic substances. All calls are confidential.",
    categories: ["Emergency and Crisis Lines"],
  },
  {
    name: "Washington Recovery Helpline",
    website: "http://warecoveryhelpline.org",
    phone: "1-866-789-1511",
    hours: "24/7",
    description:
      "24-hour help for substance abuse, problem gambling, and mental health. Information and referrals for medication assisted treatment, and Opioid treatment such as Suboxone.",
    categories: [
      "Mental Health Services",
      "Problem Gambling Resources",
      "Emergency and Crisis Lines",
      "Drug and Alcohol Services",
    ],
  },
  {
    name: "Washington State's Basic Food program - King County",
    website:
      "http://kingcounty.gov/en/dept/dph/health-safety/health-centers-programs-services/access-outreach-program/basic-food-program",
    phone: "(800) 756-5437",
    description:
      "Basic Food is a food and nutrition program for individuals and families who meet the low income requirement (at or below 200 percent of federal poverty level), to afford healthier foods by providing monthly benefits to buy food. Application for program is available on website. Some citizen requirements apply. U.S. citizen children may be eligible even if clients are non-citizens. Basic Food will also qualify eligible children for Free or Reduced School Meals.",
    categories: ["Food Assistance"],
  },
  {
    name: "WA State Department of Health",
    phone: "(800) 525-0127",
    address: "111 Israel Rd. SE Tumwater, WA",
    hours: "Mon. — Fri., 8 a.m. — 5 p.m.",
    description:
      "Phone line provides updated information on COVID for Washington State.  Can assist with scheduling appointments for vaccinations.",
    categories: ["Emergency and Crisis Lines"],
  },
  {
    name: "Weld Seattle",
    website: "http://weldseattle.org",
    phone: "General: (206) 571-4938\nMudroom registration: (206) 809-7907",
    address: "1437 S Jackson St.",
    hours: "Mudroom (call ahead to register) - Mon.: 9:30 a.m.",
    description:
      "Services include housing, employment, peer support, community, and resources. Weld offers safe, dignified, clean and sober housing for people returning home from prison and those in recovery from addiction. Housing members are expected to be actively engaged in their reentry. They work, volunteer, and attend community meetings. Weld is a 501(C)3 nonprofit organization whose mission is to equip system-impacted individuals with housing, employment, and resources conducive to recovery and successful reintegration back into society. The 'Mudroom' is the first step for Weld membership. Social Security card and government-issued ID required.",
    categories: [
      "Re-entry Assistance",
      "Employment and Training Services",
      "Housing Services",
    ],
  },
  {
    name: "West Seattle Food Bank",
    website: "http://westseattlefoodbank.org",
    phone: "(206) 932-9023",
    address: "3419 SW Morgan St.",
    hours:
      "General public: Tues. 10 a.m. — 2 p.m.; Wed. 12 p.m. — 7 p.m.; Thurs. — Fri. 10 a.m. — 2 p.m.",
    description:
      "Operates a food pantry, baby cupboard and home delivery. May visit food pantry once per week. Must live within ZIP codes 98106, 98116, 98126, 98136, 98146 for home delivery. Visit in person. Arrive early to get a number. No fees.",
    categories: ["Food Assistance"],
  },
  {
    name: "West Seattle Helpline",
    website: "http://westseattlefoodbank.org",
    phone: "(206) 932-4357",
    hours: "Message center available 1-15th of every month, 24/7",
    description:
      "Financial assistance for utilities and rent for those in ZIP codes 98106, 98116, 98126, 98136 and 98146. Does not serve residents of Burien. Bills must be past due at time of application, must have some source of income. Call for eligibility and appointment. Documents required: ID, verification of address, verification of income and past due bill. No fees.",
    categories: ["Housing Services", "Financial Assistance"],
  },
  {
    name: "West Seattle Helpline Clothesline",
    website: "http://westseattlefoodbank.org/clothesline",
    phone: "(206) 932-9023",
    address: "4425 41st Ave SW\nSeattle",
    hours:
      "Tues., Thurs., and Sat. — 10 a.m. — 1 p.m.\nAppointments strongly suggested.",
    description:
      "Free all ages clothing bank. No zip code requirements. Clients can shop once every three months for entire household. Preference is call to make an appointment. Walk-ins allowed if necessary.",
    categories: ["Clothing Assistance"],
  },
  {
    name: "White Center Food Bank",
    website: "http://whitecenterfoodbank.org",
    phone: "(206) 762-2848",
    address: "10016 16th Ave. SW",
    hours:
      "First-time in-person registration: Mon. Noon – 3 p.m.; Wed. and Fri., 10 a.m. – 1 p.m.; Seniors 60 and older: Thurs., 10 a.m. – 1 p.m.\nFood distribution (by appointment only): Mon. Noon – 3:30 p.m.; Wed. and Fri., 10 a.m. – 1:30 p.m.; Seniors 60 and older: Thurs., 10 a.m. – 1:30 p.m.\nBaby pantry: Mon. Noon – 3 p.m.; Wed. and Fri., 10 a.m. – 1 p.m.",
    description:
      "Food pantry, food bags, baby supplies and food delivery. Food bags for everyone, pantry serves ZIP code 98146, as well as parts of 98106, 98126, 98136 and 98168. Call to confirm geographic eligibility. Visit in person. Home-bound clients can call. Documents Required: photo ID and proof of address. No fees. 3 visits per month for food distribution, 1 visit per month for baby pantry.",
    categories: ["Food Assistance"],
  },
  {
    name: "William Booth Center",
    website:
      "https://seattle.salvationarmy.org/seattle_services/william-booth-center/",
    phone: "(206) 621-0145",
    address: "811 Maynard Ave. S",
    hours:
      "Phone hours: 24/7\nMon. - Fri., 9:30 a.m. – 5:45 p.m; Sat., 9 a.m. to 4:45 p.m.",
    description:
      "Transitional housing with case management for homeless men 18 and older. Maximum stay varies by program. Performs background checks. Entry done through a process established by the VA. Fees are determined on a case-by-case basis. Referral from a partner organization required. Partners are King County Veterans’ Program, FareStart and Salvation Army off-site shelter.",
    categories: ["Veteran Services", "Shelters"],
  },
  {
    name: "WorkSource, Auburn",
    website: "http://worksourceskc.org/auburn",
    phone: "(253) 804-1177",
    address: "2707 'I' St. NE, Auburn",
    hours:
      "Mon., Tue., Thu.: 8 a.m.—5 p.m.; Wed.: 9 a.m.—5 p.m.; Fri.: 8–9 a.m.",
    description:
      "Provides computer lab, job bank, job search assistance, resumé assistance, interview preparation, career planning, training, GED preparation, apprenticeship opportunities, internet access, copiers, printers, phones, and faxes, unemployment insurance application, basic support. Job fairs, employer hiring events, mock interviews, in-person ADA accessible technology, translation or interpretation services. Website offers online job search. No fees.",
    categories: ["Employment and Training Services"],
  },
  {
    name: "WorkSource, Downtown Seattle",
    website: "http://worksourceskc.org/seattle",
    phone: "(206) 436-8600; Learning Center: (206) 436-8640",
    address: "2024 Third Ave., YWCA second floor",
    hours: "Mon.–Fri.: 8 a.m.–5 p.m.",
    description:
      "Provides computer lab, job bank, job search assistance, resumé assistance, interview preparation, career planning, training, GED preparation, apprenticeship opportunities, internet access, copiers, printers, phones, and faxes, unemployment insurance application, basic support. Job fairs, employer hiring events, mock interviews, in-person ADA accessible technology, translation or interpretation services, Website offers online job search. Only at this location: Adult Basic Education, English as a Second Language, GED prep courses. No fees.",
    categories: ["Employment and Training Services"],
  },
  {
    name: "WorkSource, North Seattle College",
    website: "http://worksourcewa.com",
    phone: "(206) 440-2500",
    address:
      "9600 College Way N, North Seattle Community College, OCE & E Bldg",
    hours:
      "Resource room: Mon. - Fri. 9 a.m. - 4 p.m.\nGeneral hours: Mon. – Fri., 8:30 a.m. – 5 p.m.",
    description:
      "Resource room provides computer lab, job bank, job search assistance, resumé assistance, interview preparation, career planning and consultation, apprenticeship opportunities, internet access, copiers, printers, phones, and faxes, unemployment insurance application, basic support. Use of technology such as copiers and printers restricted to job-related assistance only. Job fairs, employer hiring events, mock interviews, in-person ADA accessible technology, translation or interpretation services, website offers online job search. No fees. Appointments recommended for resource room.",
    categories: ["Employment and Training Services"],
  },
  {
    name: "WorkSource, Rainier",
    website: "http://worksourceskc.org/rainier",
    phone: "(206) 721-6000",
    address: "2531 Rainier Ave. S",
    hours: "Mon.–Thu.: 8 a.m.—5 p.m.; Fri.: 9 a.m.—5 p.m.",
    description:
      "Provides computer lab, job bank, job search assistance, resumé assistance, interview preparation, career planning, training, GED preparation, apprenticeship opportunities, internet access, copiers, printers, phones, and faxes, unemployment insurance application, basic support. Job fairs, employer hiring events, mock interviews, in-person ADA accessible technology, translation or interpretation services, Website offers online job search. No fees.",
    categories: ["Employment and Training Services"],
  },
  {
    name: "WorkSource, South Seattle College",
    website: "http://worksourceskc.org/south-seattle",
    phone: "(206) 934-5304",
    address:
      "6000 16th Ave. SW, South Seattle College. Robert Smith Building, Room 79",
    hours:
      "Mon. – Wed., 10 a.m. – 2 p.m.; Virtual hour Thurs., 11 a.m. – Noon (During summer quarter. These hours will adjust after Labor Day.)",
    description:
      "Provides computer lab, job bank, job search assistance, resumé assistance, interview preparation, career planning, training, GED preparation, apprenticeship opportunities, internet access, copiers, printers, phones, and faxes, basic bupport. Job fairs, employer hiring events, mock interviews, in-person ADA accessible technology, translation or interpretation services, website offers online job search. No fees.",
    categories: ["Employment and Training Services"],
  },
  {
    name: "YMCA, Counseling Services",
    website: "http://seattleymca.org/social-impact-center/counseling-services",
    phone: "(206) 382-5340\ncounseling@seattleymca.org",
    address: "Contact online, phone, or email.",
    hours: "Calling hours: Mon. - Fri.: 9 a.m. - 4:30 p.m.",
    description:
      "Licensed therapists for people of all ages. Remote and in-person counseling for stress, anxiety, depression, family and relationship issues, grief, loss, substance use and addiction, self-harm, gender identity, body image, conflict resolution, court requirements related to mental health or substance use, foster support, adoption support. Sliding scale which allows everyone to have affordable access to services, and accepts Medicaid. Accepts clients six years and older. Clients need to be within King County, Pierce County, Snohomish County.",
    categories: ["Shelters", "Mental Health Services"],
  },
  {
    name: "YMCA, Employment Assistance and Training",
    website:
      "http://seattleymca.org/social-impact-center/youth-young-adults/employment-education",
    phone: "(206) 749-7550",
    address: "932 Auburn Way S. Auburn",
    hours:
      "Calling hours: Mon. - Fri.: 9 a.m. - 5 p.m.\nArcadia daytime center: Sun. - Sat.: 1 - 6 p.m.\nOvernight shelter: Sun. - Sat.: 9 p.m. - 8 a.m.",
    description:
      "Serves ages up to 25 years old. Arcadia daytime center serves ages 12 - 24, and overnight shelter serves ages 18 - 24. Services include training on interview skills/mock interviews, employment training program, filling out job applications, guidance on how to get a state ID or social security card, guidance on where to apply for unemployment, information on businesses that are currently hiring, and referrals to resources. Provides CEA (coordinated entry access) assessments and additional assistance to locating housing programs. HIV/AIDS testing available at Arcadia 1st and 3rd Thursday every month. Apply online or call (206) 749-7550.",
    categories: [
      "Identification Services",
      "Re-entry Assistance",
      "Emergency and Crisis Lines",
      "Hygiene Services",
      "Day Centers",
      "Food Assistance",
      "Housing Services",
      "Shelters",
      "Clothing Assistance",
      "HIV/AIDS Services",
      "Mail Services",
      "Employment and Training Services",
    ],
  },
  {
    name: "YMCA, Violence Prevention",
    website:
      "http://seattleymca.org/social-impact-center/youth-young-adults/violence-prevention-intervention",
    phone: "(206) 749-7550",
    address: "Apply online; or by phone.",
    hours: "Mon. - Fri.: 9 a.m. - 5 p.m.",
    description:
      "Serves youth and young adults who are involved with or impacted by groups, gangs, community violence, or the justice system. Provides outreach, mentorship, case management to help keep them alive and free. Outreach workers support young people to identify goals, engagement in education and employment, overcoming the barriers to achieving these goals. Works with a community coalition to provide wraparound services and eliminate risk factors, improve outcomes, and build healthier communities. To request outreach services for a young person apply online. Can also call at (206) 749-7550 during business hours.",
    categories: [
      "Re-entry Assistance",
      "LGBTQIA+ Services",
      "Survivor Support Services",
      "Services For People of Color",
    ],
  },
  {
    name: "You Grow Girl!",
    website: "http://yougrowgirl.org",
    phone: "(206) 417-9904",
    address: "2200 Rainier Ave. S, Suite 201",
    hours: "Mon. – Thu., 9 a.m. – 5 p.m.; Fri and Sat. by appointment only",
    description:
      "You Grow Girl! is a nonprofit organization serving female-identifying youth and families. Commitment to empower sisters and families by providing comprehensive, wraparound services. Through the ‘Whole Sister, Whole Family Pathway’ adolescents, youth and adults are able to reach their authentic selves through the development of life skills, advocacy and self-respect. Programs include youth leadHERship and career focused mentoring, behavioral health services include case management (ages up to 24), individual and family counseling (ages up to 30), psychoeducation and support groups (ages up to 30), WISe and wraparound services (ages up to 21).",
    categories: [
      "Mental Health Services",
      "Services For People of Color",
      "Family and Maternity Services",
      "Housing Services",
    ],
  },
  {
    name: "Youth Care, Education Programs",
    website: "http://youthcare.org/homeless-youth-services/education",
    phone: "(206) 694-4500",
    address:
      "Main office: 2500 NE 54th St.\nPlease call or visit website for locations of education programs.",
    hours: "Mon. – Fri.: 9 a.m. – 5 p.m.",
    description:
      "YouthCare works to end youth homelessness, to ensure that young people are valued for who they are and empowered to achieve their potential, envisions a community where no young person experiences homelessness, all young people have the opportunity to thrive, and the systems that oppress them are dismantled. Serves ages 12 - 24. Offers high school completion/GED programs and post-secondary education programs at various sites. Rental assistance, bus tickets, and meals also provided at associated shelters (ages 14 and above).",
    categories: [
      "Transportation Assistance",
      "Services For People of Color",
      "LGBTQIA+ Services",
      "Emergency and Crisis Lines",
      "Hygiene Services",
      "Day Centers",
      "Food Assistance",
      "Housing Services",
      "Shelters",
      "General Health Services",
      "Mental Health Services",
      "Identification Services",
      "Financial Assistance",
      "Mail Services",
      "Employment and Training Services",
    ],
  },
  {
    name: "Youth Care, Employment Program",
    website: "http://youthcare.org/homeless-youth-services/employment",
    phone: "(206) 694-4500",
    address:
      "Main office: 2500 NE 54th St.\nPlease call or visit website for employment program locations",
    hours: "Main office: Mon. – Fri.: 9 a.m. – 5 p.m.",
    description:
      "YouthCare’s paid employment program includes a range of programs focused on job-readiness, internships, employment in the local economy. Offers pre-employment programs for developing soft skills to succeed in the workplace: interviewing, resume-writing, teamwork, time management, problem-solving, working through conflict. YouthCare works to end youth homelessness, to ensure that young people are valued for who they are and empowered to achieve their potential, envisions a community where no young person experiences homelessness, all young people have the opportunity to thrive, and systems that oppress them are dismantled.",
    categories: [
      "LGBTQIA+ Services",
      "Employment and Training Services",
      "Services For People of Color",
    ],
  },
  {
    name: "Youth Care, Orion Center",
    website: "http://youthcare.org/get-help",
    phone: "(206) 622-5555",
    address: "1828 Yale Avenue",
    hours:
      "Day center: Mon. – Fri., 10 a.m. – 6 p.m. \nBreakfast: Mon. – Fri., 10 – 10:30 a.m.; Lunch: Mon. – Fri., 12:15 – 1:00 p.m.; Dinner: Mon. – Fri., 5 –  5:45 p.m.\nWed. closed 1:00 - 3:00 p.m.",
    description:
      "Day drop-in center all ages up to 24. Provides meals, computers, laundry, showers, clothing, medical care, lockers, case management, ID's (getting identification cards), referrals for legal aid, education, employment, connection to housing. YouthCare works to end youth homelessness, to ensure that young people are valued for who they are, empowered to achieve their potential, envisions a community where no young person experiences homelessness, all young people have the opportunity to thrive, and systems that oppress them are dismantled. Any form of ID or other documentation with birthdate required.",
    categories: [
      "Day Centers",
      "Dental and Vision Services",
      "Family and Maternity Services",
      "Womxn's Health Services",
      "General Health Services",
      "HIV/AIDS Services",
      "Mental Health Services",
      "Problem Gambling Resources",
      "Services For People of Color",
      "Disability Services",
      "LGBTQIA+ Services",
      "Employment and Training Services",
      "Encampments",
      "Mail Services",
      "Re-entry Assistance",
      "Hygiene Services",
      "Food Assistance",
      "Identification Services",
      "Drug and Alcohol Services",
      "Housing Services",
    ],
  },
  {
    name: "Youth Care, South Seattle Shelter",
    website: "http://youthcare.org/get-help",
    phone: "(206) 331-2363",
    address: "9416 Rainier Ave. S",
    hours:
      "Shelter: 24/7; Breakfast: Mon. – Fri., 9 – 10 a.m.; Lunch: 1 – 2 p.m.; Dinner: – 7 p.m.; Drop-in services: 8 a.m. – 8 p.m.; South Seattle Clinic: Medical Provider: Tues., 8 a.m. – Noon; Therapist: Wed., Fri,: 1 – 5 p.m.; Psychiatrist: Tues., 1 – 5 p.m.",
    description:
      "YouthCare's South Seattle Shelter provides an overnight shelter every night 8 p.m. – 8:30 a.m. Serves ages 18 – 24. Provides meals, computers, laundry, showers, clothing, medical care, pet food, lockers, case management, overnight shelter, ID's (getting Identification Cards), legal aid, programs for education, employment, connection to housing. YouthCare works to end youth homelessness, to ensure that young people are valued for who they are, empowered to achieve their potential, envisions a community where no young person experiences homelessness, have the opportunity to thrive, and the systems that oppress them are dismantled. South Seattle Clinic provides health services several days during the week.",
    categories: [
      "Food Assistance",
      "General Health Services",
      "Mental Health Services",
      "LGBTQIA+ Services",
      "Day Centers",
      "Identification Services",
      "Storage Services",
      "Hygiene Services",
      "Services For People of Color",
      "Shelters",
      "Drug and Alcohol Services",
      "Clothing Assistance",
      "Womxn's Health Services",
    ],
  },
  {
    name: "Youth Care, University District Youth Center (UDYC)",
    website: "http://youthcare.org/get-help",
    phone: "(206) 639-3410",
    address: "4516 15th Ave. NE",
    hours: "Mon., Tues., Thurs., Fri.: 8 a.m. – 4 p.m.; Wed.: 8 a.m. – 1 p.m.",
    description:
      "University District Youth Center (UDYC) provides a Day Center ages 12 – 24. Provides lunch, computers, laundry, showers, clothing, mental health services, chemical dependency services, case management, ID's (getting Identification Card), legal aid, education and employment programs. Call Regional Access Point for a housing referral. YouthCare works to end youth homelessness and to ensure that young people are valued for who they are, empowered to achieve their potential, envisions a community where no young person experiences homelessness, all young people have the opportunity to thrive, and systems that oppress them are dismantled.",
    categories: [
      "Clothing Assistance",
      "Day Centers",
      "Services For People of Color",
      "Identification Services",
      "LGBTQIA+ Services",
      "Hygiene Services",
      "Food Assistance",
      "Housing Services",
      "Drug and Alcohol Services",
      "Mental Health Services",
    ],
  },
  {
    name: "YWCA, Angeline's Day Center",
    website: "http://ywcaworks.org/programs/angelines-day-center",
    phone: "(206) 436-8650",
    address: "2030 Third Ave.",
    hours: "Mon. — Fri.: 10 a.m. — 4 p.m.",
    description:
      "Provides drop-in services like meals, laundry, showers, lockers, and connections to community resources. Offers advocates to help with tasks like getting an Identification card/ID or completing SSI or DSHS paperwork.",
    categories: [
      "Hygiene Services",
      "Shelters",
      "Clothing Assistance",
      "Food Assistance",
      "Day Centers",
    ],
  },
  {
    name: "YWCA, Babes Network",
    website: "http://ywcaworks.org/programs/babes-network",
    phone: "(206) 720-5566;\nbabesallstaff@ywcaworks.org",
    address: "1118 5th Ave.",
    hours: "Tue. – Fri.: 10 a.m. – 4 p.m.",
    description:
      "Peer support for women living with HIV. Offers one-on-one peer counseling, non-medical case management, support groups, educational forums, and social events.",
    categories: ["HIV/AIDS Services"],
  },
  {
    name: "YWCA, BankWorks",
    website: "http://ywcaworks.org/programs/bankworks",
    phone: "(253) 736-2301;\nbankworks@ywcaworks.org",
    address: "11215 Fifth Ave. SW",
    hours: "Mon. – Fri.: 8:30 a.m. – 5:30 p.m.",
    description:
      "Prepares low-income job seekers for banking positions as a first step on the career ladder in the financial services industry, consists of 8 weeks of free industry-specific job training with a strong customer service and sales focus followed by direct job placement into positions at partner banks and credit unions. Provides instruction, career navigation, coaching, and mentoring for up to one year after placement. Operates in Seattle, Auburn, Bellevue, White Center, online.",
    categories: ["Employment and Training Services"],
  },
  {
    name: "YWCA - Central Area Food Bank",
    website: "http://ywcaworks.org/programs/central-area-food-bank",
    phone: "mboyce@ywcaworks.org",
    address: "2820 E Cherry St.\nSeattle",
    hours: "Wed. 1 – 3 p.m.",
    description:
      "Distributes free food and groceries weekly to residents in YWCA emergency shelter and transitional housing, as well as low-income families from the community.",
    categories: ["Food Assistance"],
  },
  {
    name: "YWCA, Central Family Emergency Housing",
    website: "http://ywcaworks.org/programs/central-family-emergency-housing",
    address: "2820 E Cherry St.",
    description:
      "Offers culturally appropriate services to homeless families of color, including emergency housing at two enhanced shelters, and other shelter and transitional units. On-site after school program, domestic violence support and advocacy, chemical dependency and mental health services, nurse services, a food bank, teen group and life skills workshops.",
    categories: [
      "Shelters",
      "Services For People of Color",
      "Housing Services",
    ],
  },
  {
    name: "YWCA, Domestic Violence Legal Services",
    website:
      "http://ywcaworks.org/programs/gender-based-violence-specialized-services",
    phone: "(877) 757-8297",
    address: "1118 5th Ave.",
    hours: "Mon. – Fri.: 8:30 a.m. – 5 p.m.",
    description:
      "Provides legal advocacy for survivors with legal issues related to domestic violence, including: protection orders, divorce, parenting plans, employment rights, eviction, housing, victim-defendants and more.",
    categories: ["Survivor Support Services", "Legal Services"],
  },
  {
    name: "YWCA, Eastside Employment",
    website: "http://ywcaworks.org/programs/eastside-employment",
    phone: "(425) 556-1353",
    address: "16601 NE 80th St.\nRedmond",
    hours: "Mon. – Fri., 9 a.m – 4 p.m.",
    description:
      "Employment advocates work with participants to make a plan for college classes or vocational training, and access additional support services. For homelessness employment program contact struong@ywcaworks.org. Through case management, participants get the tools and resources to support them to secure a living wage job and gain stability. Please call before arriving.",
    categories: ["Employment and Training Services"],
  },
  {
    name: "YWCA, Economic Resilience Initiative",
    website: "http://ywcaworks.org/programs/economic-resilience-initiative",
    phone: "eri@ywcaworks.org",
    address: "9720 Eighth Ave. SW",
    hours: "Mon. – Fri.: 9 a.m. – 6 p.m.",
    description:
      "Financial classes, workshops, coaching, and resources to help women and families build economic stability and empowerment, with many offered in both English and Spanish. Build skills and confidence with their personal finances.",
    categories: ["Financial Assistance"],
  },
  {
    name: "YWCA, Family Homelessness Prevention",
    website: "http://ywcaworks.org/programs/family-homelessness-prevention",
    phone: "(425) 264-1400",
    address: "1010 S Second St.\nRenton",
    hours: "Mon. – Fri.: 9 a.m. – 5 p.m.",
    description:
      "Provides supportive services to help families facing homelessness overcome multiple barriers, regain stability and maintain their current housing. Requires referrals to the YWCA Family Homeless Prevention program from the King County Housing Authority Section 8 program and from YWCA South King County Transitional Housing.",
    categories: ["Housing Services"],
  },
  {
    name: "YWCA, Femme 2 Stem",
    website: "http://ywcaworks.org/programs/femme2stem",
    phone: "(206) 591-3925",
    address: "9720 Eighth Ave. SW",
    description:
      "Free program designed to help 17-22 year old young womxn of color, particularly Black womxn and girls, advance in STEM (science, technology, engineering, and mathematics) career and education opportunities. Femme2STEM pairs participants to STEM employers, mentors, and community.",
    categories: [
      "Services For People of Color",
      "Employment and Training Services",
    ],
  },
  {
    name: "YWCA, Gender Based Violence Specialized Services",
    website:
      "http://ywcaworks.org/programs/gender-based-violence-specialized-services",
    phone: "Toll free and Text Line 877-757-8297; (206) 280-9961",
    hours: "Mon. – Fri., 8:30 a.m. – 5 p.m.",
    description:
      "Services support individuals who have experienced gender-based violence, with a culturally relevant practice and trauma-informed care approach. Contact doneal@ywcaworks.org for more info",
    categories: ["Legal Services", "Survivor Support Services"],
  },
  {
    name: "YWCA, Greenbridge Learning Center",
    website: "http://ywcaworks.org/programs/greenbridge-learning-center",
    phone: "(206) 336-6994",
    address: "9720 Eighth Ave. SW",
    hours: "Mon. – Thurs.: 9 a.m. – 5:30 p.m.; Fri.: 9 a.m. – 4:30 p.m.",
    description:
      "Vocational Training in various sectors, basic skills and ESL training, short-term vocational training, computer literacy skills, job and career search assistance, and various services for youth. All services are provided in multiple languages and are focused on helping White Center and South King County residents obtain the education, career skills, financial capability, and support they need in order to thrive.",
    categories: ["Employment and Training Services"],
  },
  {
    name: "YWCA, Homeless Employment Program",
    website: "http://ywcaworks.org/programs/homeless-employment-program",
    phone: "(206) 678-6097",
    address: "2024 Third Ave.",
    hours: "Mon. - Fri.: 9 a.m. - 5 p.m.",
    description:
      "Individualized employment and support services needed to achieve self-sufficiency and stable housing. The employment program services include Housing Navigation, Resources and Information, Financial Empowerment and Resources. Also operates this program in South King County, Auburn, and Redmond. Contact dphernandez@ywcaworks.org for more information.",
    categories: ["Employment and Training Services"],
  },
  {
    name: "YWCA, Learning Center at Firwood Circle",
    website: "http://ywcaworks.org/programs/learning-center-firwood-circle",
    phone: "(253) 736-2300",
    address: "313 37th St SE, \nAuburn",
    hours: "Mon. – Fri.: 9 a.m. – 5:30 p.m.",
    description:
      "Free classes and computer skills for residents at Firwood Circle and the surrounding community in Auburn. Individuals can build their futures through job training and readiness, educational classes and workshops, and other programs for economic advancement.",
    categories: ["Employment and Training Services"],
  },
  {
    name: "YWCA, Parent Child +",
    website: "http://ywcaworks.org/programs/parent-child-plus",
    phone: "awarsame@ywcaworks.org",
    address: "3800 S Myrtle St.",
    description:
      "Educational home visiting program for families with children between 16 months and 2 1/2 years old. Early learning specialists will visit with you and your child twice a week for 30 minutes. Each week your child will receive a free book or toy. Parent Child + specialists speak English, Somali, and Tigrinya.",
    categories: [
      "Immigrant and Refugee Services",
      "Family and Maternity Services",
      "Services For People of Color",
    ],
  },
  {
    name: "YWCA, Pathways for Women",
    website: "http://ywcaworks.org/programs/pathways-women",
    phone: "(425) 774-9843 x226",
    address: "6027 208th St. SW\nLynnwood",
    hours:
      "Mon. – Tues. 9:30 a.m. - 5 p.m.; Wed.: 1 - 5 p.m.; Thurs.: 9:30 a.m. - 5 p.m.; Fri.: 10 a.m. - 4:30 p.m.",
    description:
      "45-day emergency shelter for single adult women and mothers with children. Strives to give all clients the opportunity to find decent, affordable, and safe housing for themselves and their children. Clients have their own room and meet regularly with an advocate to develop and execute a Housing Stability Action Plan. To apply for this program for eligibility and intake details, please call (425) 774-9843 x226.",
    categories: ["Shelters"],
  },
  {
    name: "YWCA, Sexual Assault Advocacy",
    website:
      "http://ywcaworks.org/programs/gender-based-violence-specialized-services",
    phone: "(206) 741-9796",
    hours: "Mon. – Fri.; 8:30 a.m. – 5 p.m.",
    description:
      "Offers advocacy, safety planning, resources and supportive services for the needs of survivors. Provides trauma-informed care and community-based interventions to prevent and respond to sexual violence.",
    categories: ["Survivor Support Services"],
  },
  {
    name: "YWCA, Supportive Services for Veteran Families",
    website:
      "http://ywcaworks.org/programs/supportive-services-veteran-families",
    phone: "(206) 730-9356",
    address: "1010 S Second St.\nRenton",
    hours: "Mon. - Fri.; 8:30 a.m. - 5 p.m.",
    description:
      "Assists Veterans towards housing stability, including currently homeless veterans with a desire to find and maintain permanent housing who served active duty.",
    categories: ["Veteran Services", "Housing Services"],
  },
  {
    name: "YWCA, Technology Center at Seola Gardens",
    website: "http://ywcaworks.org/programs/technology-center-seola-gardens",
    phone: "(206) 730-2238",
    address: "11215 Fifth Ave. SW",
    hours: "Mon. — Tues.; 9 a.m. —4:30 p.m.",
    description:
      "Education, job, and computer training for adults and youth in the neighborhood. Access to computers and free technology tools to residents of Seola Gardens and the surrounding community in White Center and Highline. Provides Internet access and e-mail setup, learning basic computer and typing skills, online GED classes and certification, online ESL courses.",
    categories: ["Employment and Training Services"],
  },
  {
    name: "YWCA, The Willows",
    website: "http://ywcaworks.org/locations/willows",
    phone: "(206) 209-5667",
    address: "3800 S Myrtle St.",
    hours: "Call for hours",
    description:
      "Youth programming and housing services to Black/African-American students and their families experiencing housing instability, offering: youth leadership and empowerment; housing search and placement services; advocacy; and resource referrals. Includes help finding shelter and/or housing, taking care of past rental debt, getting financial assistance for move-in, and more.",
    categories: [
      "Services For People of Color",
      "Housing Services",
      "Financial Assistance",
    ],
  },
];
