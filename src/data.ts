import { Community, Project, GalleryItem, Event, FeedbackSubmission, AdvisoryBoardMember, ContactInfo } from './types';

// The Paramount Patron of the Nkosuo Division
export const OMANHENE_DATA = {
  name: "Daasebre Kwaku Boateng III",
  title: "Omanhene of New Juaben Traditional Area",
  reignTitle: "Yiadom-Hene & Patron of Nkosuo Division",
  stooledYear: "2022",
  avatarUrl: "/src/assets/images/new_juaben_council_chiefs_hero_1783507779624.jpg",
  bio: "Daasebre Kwaku Boateng III is the highly revered Paramount Chief (Omanhene) of the New Juaben Traditional Area. Enstooled in 2022 following the ancestral transition of Daasebre Professor Emeritus Oti Boateng, Daasebre is a distinguished professional with extensive experience in leadership and governance. Under his supreme patronage, the Nkosuo Division of the New Juaben Traditional Area was revitalized to harness collective traditional authority and public-private partnerships for rapid modernization of the sub-communities.",
  vision: "To establish New Juaben as a model traditional area where heritage, modern education, technology-driven commerce, and inclusive infrastructure merge to create prosperity for every citizen.",
  principles: [
    { title: "Nkosuo (Progress)", desc: "Traditional leadership must be measured by the socio-economic elevation of its citizens." },
    { title: "Obuo (Respect & Unity)", desc: "Harnessing the collective strength of all sub-communities under a single united vision." },
    { title: "Amapam (Sustainable Stewardship)", desc: "Preserving our natural resources, stools, and lands for future generations." }
  ]
};

export const COMMUNITIES_DATA: Community[] = [
  {
    id: "effiduase",
    name: "Effiduase",
    desc: "A major business and cultural hub in New Juaben, home to vibrant local markets, schools, and historical royal administration sites.",
    population: "42,000",
    keyProjectsCount: 3,
    chiefProfile: {
      id: "effiduase",
      name: "Barima Okoavia Dwomo Baabu II",
      title: "Effiduasehene & Nifahene of New Juaben",
      stooledYear: "2008",
      reignTitle: "Barima Dwomo Baabu II",
      avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400",
      bio: "Barima Okoavia Dwomo Baabu II is a visionary leader with a background in public administration and corporate management. Since his enstoolment in 2008, he has prioritized the structural modernization of Effiduase, advocating for better healthcare access and high-standard vocational colleges to combat youth unemployment.",
      vision: "To turn Effiduase into a key industrial and commercial training ground, empowering youth with digital and artisanal skills.",
      education: [
        "Master of Public Administration - University of Ghana",
        "BSc. in Business Administration - Kwame Nkrumah University of Science and Technology (KNUST)"
      ],
      achievements: [
        "Spearheaded the construction of the Effiduase Palace Library and ICT Center.",
        "Created the Effiduase Youth Scholarship Fund, supporting over 200 tertiary students.",
        "Partnered with international healthcare organizations to modernize the local maternity clinic."
      ]
    },
    queenProfile: {
      id: "effiduase",
      name: "Nana Ama Amponsah III",
      title: "Effiduasehemaa of New Juaben",
      enstooledYear: "2010",
      reignTitle: "Nana Ama Amponsah III",
      avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400",
      bio: "Nana Ama Amponsah III is a passionate advocate for women's socio-economic empowerment and girls' education. She has established several cooperative credit unions for local women traders and works directly with healthcare boards to improve maternal health infrastructure in Effiduase.",
      vision: "To ensure every woman has financial independence and every girl child has access to quality STEM education.",
      education: [
        "BSc. in Development Planning - Kwame Nkrumah University of Science and Technology (KNUST)",
        "Diploma in Gender Studies - University of Cape Coast"
      ],
      achievements: [
        "Established the Effiduase Women's Agribusiness Cooperative.",
        "Funded the renovation of the local maternity ward and prenatal care center.",
        "Launched the 'STEM for Girls' initiative in five local junior high schools."
      ]
    }
  },
  {
    id: "asokore",
    name: "Asokore",
    desc: "Famous for its academic institutions and traditional pottery. Asokore is a pillar of traditional craftsmanship and education in New Juaben.",
    population: "31,500",
    keyProjectsCount: 2,
    chiefProfile: {
      id: "asokore",
      name: "Nana Antwi Panin II",
      title: "Asokorehene & Benkumhene of New Juaben",
      stooledYear: "2011",
      reignTitle: "Nana Antwi Panin II",
      avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400",
      bio: "Nana Antwi Panin II is an educationist and community builder. Believing that education is the ultimate equalizer, he has dedicated his stool's resources to upgrading primary and secondary school infrastructures, establishing clean water networks, and revitalizing the traditional pottery craft as a modern cooperative industry.",
      vision: "To create an educational paradise in Asokore while packaging traditional pottery crafts into high-value national exports.",
      education: [
        "Postgraduate Diploma in Education - University of Cape Coast",
        "BA in Sociology and History - University of Ghana"
      ],
      achievements: [
        "Inaugurated the Asokore Water Purification Project, supplying 15,000 households with clean pipe-borne water.",
        "Renovated 5 primary schools and equipped them with modern computer laboratories.",
        "Founded the Asokore Clay and Pottery Craft Alliance to support local artisans."
      ]
    },
    queenProfile: {
      id: "asokore",
      name: "Nana Nana Boatemaa I",
      title: "Asokorehemaa of New Juaben",
      enstooledYear: "2012",
      reignTitle: "Nana Nana Boatemaa I",
      avatarUrl: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=400",
      bio: "Nana Nana Boatemaa I is a champion of traditional arts, culture, and vocational training. Recognizing Asokore's heritage in pottery, she has mobilized resources to form female-led pottery cooperatives and modern marketing pathways to preserve this sacred craft.",
      vision: "To uplift the socio-economic status of Asokore through cultural entrepreneurship and vocational mastery.",
      education: [
        "MFA in Creative Arts - University of Education, Winneba",
        "BA in Industrial Art - KNUST"
      ],
      achievements: [
        "Co-founded the Asokore Traditional Pottery Cooperative.",
        "Established a community-funded daycare center for children of local traders and master potters.",
        "Introduced vocational scholarship programs for young girls dropped out of formal schools."
      ]
    }
  },
  {
    id: "oyoko",
    name: "Oyoko",
    desc: "The agricultural gateway of New Juaben, rich in cocoa, citrus, and vegetable farming, currently leading in agribusiness innovations.",
    population: "28,000",
    keyProjectsCount: 2,
    chiefProfile: {
      id: "oyoko",
      name: "Barima Kodua Kesse II",
      title: "Oyokohene & Adontenhene of New Juaben",
      stooledYear: "2013",
      reignTitle: "Barima Kodua Kesse II",
      avatarUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400",
      bio: "Barima Kodua Kesse II is a seasoned agricultural economist and former national developmental consultant. Enstooled in 2013, he has successfully converted Oyoko's agricultural potential into structured agribusiness cooperatives, introducing mechanized farming methods and establishing cold storage facilities to reduce post-harvest losses.",
      vision: "To transition Oyoko into a fully mechanized agricultural processing center feeding the Eastern Region and exporting organic produce.",
      education: [
        "MSc. in Agricultural Economics - Reading University, UK",
        "BSc. in Agriculture - University of Ghana"
      ],
      achievements: [
        "Established the Oyoko Agribusiness Cooperative, providing 450 farmers with subsidized organic fertilizers and seeds.",
        "Launched the Oyoko Cassava Processing Plant, creating over 120 direct industrial jobs.",
        "Facilitated a solar-powered irrigation system spanning 40 acres of community farm plots."
      ]
    },
    queenProfile: {
      id: "oyoko",
      name: "Nana Adwoa Akyaamaa II",
      title: "Oyokohemaa of New Juaben",
      enstooledYear: "2015",
      reignTitle: "Nana Adwoa Akyaamaa II",
      avatarUrl: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&q=80&w=400",
      bio: "Nana Adwoa Akyaamaa II is a nutritionist and food security advocate. She has dedicated her stool's resources to supporting women smallholder farmers with storage equipment, training in modern food preservation, and organizing prenatal health checkups.",
      vision: "To eliminate post-harvest waste in Oyoko's agricultural sector and promote zero child malnutrition through education.",
      education: [
        "MSc. in Food Science and Technology - University of Ghana",
        "BSc. in Nutrition - GIMPA, Ghana"
      ],
      achievements: [
        "Built a post-harvest training and cold-storage center specifically for female farmers.",
        "Introduced community nutrition workshops for new mothers in Oyoko.",
        "Formed partnerships with urban organic food retailers to purchase local Oyoko produce directly."
      ]
    }
  },
  {
    id: "jumapo",
    name: "Jumapo",
    desc: "Known for its dynamic markets, rich history, and scenic mountain views. Jumapo is highly focused on local commerce and economic trade.",
    population: "19,500",
    keyProjectsCount: 2,
    chiefProfile: {
      id: "jumapo",
      name: "Nana Gyamfi Boateng II",
      title: "Jumapohene & Kyidomhene of New Juaben",
      stooledYear: "2015",
      reignTitle: "Nana Gyamfi Boateng II",
      avatarUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400",
      bio: "Nana Gyamfi Boateng II is an entrepreneur and former trade policy analyst. His reign has centered around expanding trade markets, creating a modern transport terminal, and ensuring the health and safety of women traders in Jumapo by constructing modern market stalls and sanitary facilities.",
      vision: "To modernise local commerce in Jumapo and build self-sustaining community clinics that guarantee access to health for all.",
      education: [
        "MA in International Trade and Economics - University of Sussex, UK",
        "BSc. in Economics - GIMPA, Ghana"
      ],
      achievements: [
        "Rebuilt and expanded the Jumapo Central Market, introducing solar lighting for night trading.",
        "Financed the Jumapo Community Clinic expansion, including a state-of-the-art laboratory.",
        "Set up the Micro-Credit Fund for market women, offering low-interest loans for business growth."
      ]
    },
    queenProfile: {
      id: "jumapo",
      name: "Nana Oseiwaa Tempong II",
      title: "Jumapohemaa of New Juaben",
      enstooledYear: "2016",
      reignTitle: "Nana Oseiwaa Tempong II",
      avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400",
      bio: "Nana Oseiwaa Tempong II is an experienced business developer and local trade strategist. She has partnered with financial institutions to secure micro-credit facilities for Jumapo's market women and created early childhood development centers.",
      vision: "To construct world-class commercial sanitation facilities and childcare zones in Jumapo's markets.",
      education: [
        "MBA in Entrepreneurship - University of Ghana",
        "BBA in Marketing - Central University, Ghana"
      ],
      achievements: [
        "Facilitated low-interest micro-loans for over 300 market women in Jumapo.",
        "Built the 'Sua Nyansa' Early Childhood Care Center for children of market women.",
        "Partnered with municipal officials to implement modern waste-recycling systems in Jumapo's central market."
      ]
    }
  },
  {
    id: "suhyen",
    name: "Suhyen",
    desc: "A picturesque, peaceful community with vast forest reserves, natural water streams, and rich timber resources.",
    population: "14,000",
    keyProjectsCount: 2,
    chiefProfile: {
      id: "suhyen",
      name: "Okogyeaman Kwaku Boateng III",
      title: "Suhyenhene & Gyasehene of New Juaben",
      stooledYear: "2016",
      reignTitle: "Okogyeaman Kwaku Boateng III",
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400",
      bio: "Okogyeaman Kwaku Boateng III is a professional civil engineer and an environmental activist. He has used his engineering expertise to design and construct community roads, bridges, and eco-friendly schools, while fiercely protecting Suhyen’s forest reserves from illegal degradation.",
      vision: "To transform Suhyen into a premier eco-tourism destination and a model for sustainable engineering and forestry.",
      education: [
        "BSc. in Civil Engineering - Kwame Nkrumah University of Science and Technology (KNUST)",
        "Certified Member of the Ghana Institution of Engineering (GhIE)"
      ],
      achievements: [
        "Designed and supervised the construction of the Suhyen Eco-Bridge, connecting agricultural lands to the main town roads.",
        "Initiated the 'Suhyen Green Canopy' project, planting 10,000 indigenous mahogany trees.",
        "Upgraded Suhyen Health Clinic's water and power system using sustainable off-grid solar panels."
      ]
    },
    queenProfile: {
      id: "suhyen",
      name: "Nana Yaa Abrefi II",
      title: "Suhyenhemaa of New Juaben",
      enstooledYear: "2018",
      reignTitle: "Nana Yaa Abrefi II",
      avatarUrl: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=400",
      bio: "Nana Yaa Abrefi II is an environmentalist and public health professional. In collaboration with the Suhyenhene, she has launched eco-conservation drives, local sanitation clubs, and female health centers in Suhyen.",
      vision: "To model Suhyen as a pristine eco-community where traditional environmental taboos and modern ecology combine to protect nature.",
      education: [
        "Master of Public Health (MPH) - University of Ghana",
        "BSc. in Nursing - KNUST"
      ],
      achievements: [
        "Launched the 'Suhyen Girls Health Initiative', providing hygiene kits to over 600 teenagers.",
        "Spearheaded the traditional community river protection bylaws and cleanup campaigns.",
        "Created the Suhyen Eco-tourism Youth Guild, training local youth as tour guides."
      ]
    }
  },
  {
    id: "ada",
    name: "Ada (New Juaben)",
    desc: "An urbanizing residential and administrative sub-community, popular for its modern housing, peaceful environment, and active community councils.",
    population: "22,000",
    keyProjectsCount: 2,
    chiefProfile: {
      id: "ada",
      name: "Nana Kakraka I",
      title: "Adahene of New Juaben",
      stooledYear: "2019",
      reignTitle: "Nana Kakraka I",
      avatarUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400",
      bio: "Nana Kakraka I is an information technology expert and dynamic community advocate. As one of the younger chiefs, he has worked tirelessly to bring digital literacy, fiber connectivity, and entrepreneurial hubs to Ada, creating a thriving ecosystem for young digital freelancers and tech startups.",
      vision: "To establish Ada as the premier digital and innovation suburb of New Juaben, powering a new generation of tech professionals.",
      education: [
        "BSc. in Computer Science - Ashesi University",
        "Executive Education in Tech Leadership - MIT, USA"
      ],
      achievements: [
        "Built the Ada Digital Youth Center, training over 350 youth in coding, web development, and graphic design.",
        "Facilitated private partnerships to deploy fiber-optic internet across Ada schools and administrative blocks.",
        "Introduced the Annual Ada Community Clean-Up and Waste Recycling Challenge."
      ]
    },
    queenProfile: {
      id: "ada",
      name: "Nana Akua Serwaa I",
      title: "Adahemaa of New Juaben",
      enstooledYear: "2020",
      reignTitle: "Nana Akua Serwaa I",
      avatarUrl: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&q=80&w=400",
      bio: "Nana Akua Serwaa I is an educator and vocational school administrator. In partnership with the Adahene, she has worked to bridge the digital and vocational skills gap for women, establishing free adult literacy and digital commerce workshops.",
      vision: "To empower every resident of Ada with functional digital and vocational literacy to succeed in the modern economy.",
      education: [
        "M.Ed. in Educational Administration - University of Cape Coast",
        "B.Ed. in Home Economics - University of Education, Winneba"
      ],
      achievements: [
        "Created the Ada Women's Digital Literacy and E-commerce Hub.",
        "Established the Ada Royal Vocational Training Guild for out-of-school youths.",
        "Introduced annual community scholarships for exemplary female science students."
      ]
    }
  },
  {
    id: "akwadum",
    name: "Akwadum",
    desc: "Strategically located along the main highway, Akwadum is a fast-growing trading and transportation gateway with booming real estate.",
    population: "25,500",
    keyProjectsCount: 2,
    chiefProfile: {
      id: "akwadum",
      name: "Nana Owusu Agyare II",
      title: "Akwadumhene of New Juaben",
      stooledYear: "2014",
      reignTitle: "Nana Owusu Agyare II",
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
      bio: "Nana Owusu Agyare II is a chartered town planner and property developer. Since his enstoolment, he has focused on systematic urban planning, securing land titles for local citizens, paving public roads, and creating a modern lorry park to organize public transit.",
      vision: "To turn Akwadum into a highly organized, clean, and efficient gateway city with modern drainage, roads, and vibrant zoning laws.",
      education: [
        "MSc. in Urban and Regional Planning - Kwame Nkrumah University of Science and Technology (KNUST)",
        "Member of the Ghana Institute of Planners (GIP)"
      ],
      achievements: [
        "Designed and completed the Akwadum Transit Hub & Lorry Park with modern driver lounges and restroom blocks.",
        "Spearheaded the Akwadum Drainage System Expansion to completely prevent seasonal flooding.",
        "Negotiated structured land allocations for a new community market and state-of-the-art junior high school."
      ]
    },
    queenProfile: {
      id: "akwadum",
      name: "Nana Afia Boatemaa II",
      title: "Akwadumhemaa of New Juaben",
      enstooledYear: "2017",
      reignTitle: "Nana Afia Boatemaa II",
      avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400",
      bio: "Nana Afia Boatemaa II is a real estate and urban development consultant. Her reign has focused on establishing structured retail spaces for transit travelers, health-awareness drives, and advocating for girl-child rights in Akwadum.",
      vision: "To secure modern social infrastructure and clean sanitation facilities along Akwadum's highway commercial zones.",
      education: [
        "BSc. in Land Economy - Kwame Nkrumah University of Science and Technology (KNUST)",
        "Diploma in Land Administration - GIMPA"
      ],
      achievements: [
        "Negotiated safe and organized retail zones for over 150 highway street vendors.",
        "Launched the Akwadum Maternal and Child Health Support Fund.",
        "Organized annual health checkups and eye screenings in partnership with regional clinics."
      ]
    }
  },
  {
    id: "nyamekrom",
    name: "Nyamekrom",
    desc: "A fast-developing suburb and key divisional community in New Juaben, known for its strong community spirit, modern local infrastructure, and sustainable agricultural cooperatives.",
    population: "18,200",
    keyProjectsCount: 2,
    chiefProfile: {
      id: "nyamekrom",
      name: "Barima Dr. Nana Yaw Annor",
      title: "Nyamekromhene & New Juaben Nkosuohene",
      stooledYear: "2012",
      reignTitle: "Barima Dr. Nana Yaw Annor",
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
      bio: "Barima Dr. Nana Yaw Annor is a distinguished developmental leader. Serving both as the Chief of Nyamekrom and the Development Chief (Nkosuohene) of New Juaben, he has successfully executed several public infrastructure programs, established robust agricultural cooperatives, and brought high-speed digital classrooms and clean water networks to his citizens.",
      vision: "To establish Nyamekrom as a model of rural-urban integration with robust infrastructure, active agricultural businesses, and standard-setting vocational opportunities.",
      education: [
        "Doctorate in Public Administration & Policy",
        "MSc. in Urban Development - University of Ghana",
        "BSc. in Civil Engineering - KNUST"
      ],
      achievements: [
        "Pioneered the Nyamekrom Agricultural Cooperative, supporting over 300 farming families.",
        "Facilitated the installation of digital school classrooms and computerized labs.",
        "Constructed solar-powered borehole infrastructure providing clean water access to Nyamekrom residents."
      ]
    },
    queenProfile: {
      id: "nyamekrom",
      name: "Nana Akua Nyamekye I",
      title: "Nyamekromhemaa of New Juaben",
      enstooledYear: "2015",
      reignTitle: "Nana Akua Nyamekye I",
      avatarUrl: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&q=80&w=400",
      bio: "Nana Akua Nyamekye I has focused on building self-reliant vocational networks for local women and establishing nursery and kindergarten support systems. She works hand-in-hand with the local agricultural assembly to increase female-led agribusinesses.",
      vision: "To champion early childhood education and promote secure economic pipelines for women entrepreneurs in Nyamekrom.",
      education: [
        "BSc. in Early Childhood Education - University of Education, Winneba",
        "Diploma in Agribusiness - University of Cape Coast"
      ],
      achievements: [
        "Established the Nyamekrom Women's Agribusiness Initiative.",
        "Funded the build of the Nyamekrom Royal Early Childhood Development Center.",
        "Sponsored full secondary education scholarships for over 50 girls in Nyamekrom."
      ]
    }
  },
  {
    id: "new_juaben_south",
    name: "New Juaben South",
    desc: "A highly urbanized municipal district serving as the commercial heartbeat of Koforidua and the entire traditional area, spearheading key trade and technological modernization.",
    population: "136,000",
    keyProjectsCount: 2
  },
  {
    id: "new_juaben_north",
    name: "New Juaben North",
    desc: "A rapidly expanding municipal gateway rich in agricultural processing, housing developments, and infrastructural corridors connecting Koforidua to the rest of the Eastern Region.",
    population: "98,500",
    keyProjectsCount: 2
  }
];

export const PROJECTS_DATA: Project[] = [
  {
    id: "p1",
    title: "Effiduase Palace Library & Digital Hub",
    description: "Construction of a ultra-modern two-story library complex equipped with high-speed internet, 40 desktop computers, an e-learning center, and a traditional history archives room.",
    communityId: "effiduase",
    communityName: "Effiduase",
    category: "education",
    status: "completed",
    progress: 100,
    budget: "GH¢ 450,000",
    startDate: "2024-01-15",
    completionDate: "2024-11-20",
    fundingSource: "Municipal Assembly & Royal Family Trust",
    beneficiaries: "8,500+ students and local researchers annually",
    impactSummary: "Drastically improved local reading culture, provided students with free access to online educational portals, and preserved digital audio archives of New Juaben traditional history.",
    image: "/src/assets/images/new_juaben_dev_project_1783507797237.jpg" // Using generated image!
  },
  {
    id: "p2",
    title: "Asokore Water Purification & Piping Network",
    description: "Installation of a solar-powered mechanized borehole system, complete with ultrafiltration membranes, a 50,000-liter storage tower, and a 6-kilometer distribution pipe network to residential quarters.",
    communityId: "asokore",
    communityName: "Asokore",
    category: "sanitation",
    status: "completed",
    progress: 100,
    budget: "GH¢ 320,000",
    startDate: "2023-04-10",
    completionDate: "2024-02-15",
    fundingSource: "Nkosuo Development Fund & NGO Partnership (WaterForGhana)",
    beneficiaries: "15,000+ residents in Asokore",
    impactSummary: "Eliminated waterborne illnesses in the community, saved schoolchildren hours of walking to fetch water, and provided local pottery artisans with high-quality processed water.",
    image: "https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "p3",
    title: "Oyoko Cassava Processing & Agribusiness Plant",
    description: "Establishment of an industrial-grade cassava processing plant to produce high-quality starch, gari, and cassava flour. Includes mechanized peeling, grating, pressing, and frying equipment.",
    communityId: "oyoko",
    communityName: "Oyoko",
    category: "agriculture",
    status: "ongoing",
    progress: 85,
    budget: "GH¢ 600,000",
    startDate: "2024-06-01",
    fundingSource: "One District One Factory (1D1F) Partner & Oyoko Royal Stool",
    beneficiaries: "450+ farmers and 120+ direct plant workers",
    impactSummary: "Reduces post-harvest losses by 40%, increases local farmers' incomes by establishing guaranteed purchase agreements, and provides direct value-addition within Oyoko.",
    image: "https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "p4",
    title: "Jumapo Community Clinic Expansion (Maternity Wing)",
    description: "Expanding the existing Jumapo Clinic by constructing a dedicated maternity wing with a 15-bed ward, modern delivery rooms, neonatal incubator space, and living quarters for resident midwives.",
    communityId: "jumapo",
    communityName: "Jumapo",
    category: "healthcare",
    status: "ongoing",
    progress: 70,
    budget: "GH¢ 550,000",
    startDate: "2024-08-10",
    fundingSource: "Jumapo Citizens in Diaspora & Ghana Health Service Support",
    beneficiaries: "6,000+ women of childbearing age in Jumapo and surrounding villages",
    impactSummary: "Will eliminate maternal mortality during childbirth, provide critical prenatal and postnatal care locally, and ensure 24/7 midwifery attendance.",
    image: "https://images.unsplash.com/photo-1584515901367-f1c3a8f3d37e?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "p5",
    title: "Suhyen Eco-Bridge & Farmland Connect",
    description: "Construction of a reinforced concrete bridge across the Suhyen river, combined with grading 5km of feeder roads to connect isolated fertile cocoa and timber farmlands to the main town market.",
    communityId: "suhyen",
    communityName: "Suhyen",
    category: "infrastructure",
    status: "completed",
    progress: 100,
    budget: "GH¢ 380,000",
    startDate: "2023-09-01",
    completionDate: "2024-05-18",
    fundingSource: "Suhyen Royal Forestry Fund & Timber Operators Association",
    beneficiaries: "3,200+ local cocoa, plantain, and timber farmers",
    impactSummary: "Enables farmers to transport fresh harvests quickly via trucks, completely eliminating waste, and safe pedestrian crossing for children during rainy season river overflows.",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "p6",
    title: "Ada Digital Youth & Innovation Lab",
    description: "A collaborative co-working space and training hub providing 50 workstations, a 3D printing workshop, a media recording booth, and a tech incubator curriculum taught by industry veterans.",
    communityId: "ada",
    communityName: "Ada (New Juaben)",
    category: "economic",
    status: "completed",
    progress: 100,
    budget: "GH¢ 400,000",
    startDate: "2024-03-01",
    completionDate: "2025-01-20",
    fundingSource: "Akan Cultural Diaspora Alliance & Ada Stool Trust",
    beneficiaries: "500+ youths trained in tech skills annually",
    impactSummary: "Has successfully connected 45 graduates to remote freelance writing and software engineering gigs, pumping local digital income directly into the Ada economy.",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "p7",
    title: "Akwadum Highway Drainage & Flood Control",
    description: "Excavation and brick-and-mortar engineering of wide-gauge concrete storm drains along the Akwadum highway and residential sectors to channel torrential rains directly into secure drainage outlets.",
    communityId: "akwadum",
    communityName: "Akwadum",
    category: "infrastructure",
    status: "planned",
    progress: 15,
    budget: "GH¢ 750,000",
    startDate: "2025-08-01",
    fundingSource: "National Highway Authority & Akwadum Development Levy",
    beneficiaries: "Whole Akwadum community and transit travelers",
    impactSummary: "Will permanently eradicate seasonal residential flooding, safeguard real estate properties, and guarantee uninterrupted vehicular traffic on the vital Eastern Region highway.",
    image: "https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "p8",
    title: "Asokore Pottery Craft Modernization Hub",
    description: "Building an electric kiln-equipped workshop, clay refining silos, and a modern exhibition/showroom to upgrade the quality and design of traditional hand-thrown Asokore pottery.",
    communityId: "asokore",
    communityName: "Asokore",
    category: "economic",
    status: "planned",
    progress: 5,
    budget: "GH¢ 280,000",
    startDate: "2025-10-15",
    fundingSource: "Ghana Export Promotion Authority & Royal Artisan Grants",
    beneficiaries: "150+ female master potters and youth trainees",
    impactSummary: "Will triple production efficiency, introduce modern heat-resistant glaze designs, and connect the cooperative directly to online global e-commerce portals.",
    image: "/src/assets/images/akan_royal_gold_ornaments_1783507811735.jpg" // Using generated image!
  },
  {
    id: "p9",
    title: "New Juaben South ICT & Entrepreneurship Hub",
    description: "Establishment of a world-class technology center equipped with coworking spaces, fiber internet, a software training lab, and dedicated incubation space for local digital startups.",
    communityId: "new_juaben_south",
    communityName: "New Juaben South",
    category: "education",
    status: "ongoing",
    progress: 60,
    budget: "GH¢ 680,000",
    startDate: "2024-09-10",
    fundingSource: "Municipal Assembly, Private Tech Partners & Ghana Investment Fund for Electronic Communications (GIFEC)",
    beneficiaries: "12,000+ local youth, university students, and young tech freelancers",
    impactSummary: "Will equip hundreds of youth with modern coding, data engineering, and digital marketing skills, enabling them to secure high-paying remote work and launch local startups.",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "p10",
    title: "Koforidua Market Drainage & Public Sanitation Upgrade",
    description: "Comprehensive reconstruction of primary concrete drainage channels around the Koforidua Central Market area, coupled with installing clean, modernized community sanitation hubs for traders.",
    communityId: "new_juaben_south",
    communityName: "New Juaben South",
    category: "sanitation",
    status: "ongoing",
    progress: 75,
    budget: "GH¢ 480,000",
    startDate: "2024-07-15",
    fundingSource: "Municipal Assembly Development Grant",
    beneficiaries: "35,000+ market traders and daily visitors",
    impactSummary: "Permanently prevents seasonal waterlogging, guarantees clean and sanitary trading environments, and enhances overall commercial hygiene standards in the city center.",
    image: "https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "p11",
    title: "New Juaben North Mechanized Farming & Cold Storage Depot",
    description: "Construction of a community post-harvest management facility equipped with industrial solar-powered cold storage rooms, seed grain silos, and a leasing station for modern tractors.",
    communityId: "new_juaben_north",
    communityName: "New Juaben North",
    category: "agriculture",
    status: "planned",
    progress: 10,
    budget: "GH¢ 720,000",
    startDate: "2025-06-01",
    fundingSource: "Ministry of Food and Agriculture (MoFA) & Traditional Agribusiness Trust",
    beneficiaries: "850+ local farmers and agricultural cooperatives",
    impactSummary: "Will eliminate post-harvest crop losses by 35%, allow farmers to store perishable produce until market prices stabilize, and provide affordable tractor services for farm prep.",
    image: "https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "p12",
    title: "New Juaben North Community Health Center & Laboratory",
    description: "Construction of a modern district health post featuring an outpatient consulting block, an automated medical diagnostic laboratory, and an off-grid clean energy power backup system.",
    communityId: "new_juaben_north",
    communityName: "New Juaben North",
    category: "healthcare",
    status: "planned",
    progress: 5,
    budget: "GH¢ 590,000",
    startDate: "2025-09-15",
    fundingSource: "Ghana Health Service Partnership & Royal Charity Gala Fund",
    beneficiaries: "14,000+ residents across Northern divisional settlements",
    impactSummary: "Will bring high-standard primary diagnostic testing and healthcare access right to northern communities, drastically reducing transit times to central hospitals.",
    image: "https://images.unsplash.com/photo-1584515901367-f1c3a8f3d37e?auto=format&fit=crop&q=80&w=800"
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "g1",
    title: "The Akwantukese Royal Durbar",
    description: "Omanhene Daasebre Kwaku Boateng III sitting in grand state surrounded by divisional chiefs, celebrating the annual Akwantukese Festival.",
    category: "events",
    imageUrl: "/src/assets/images/new_juaben_council_chiefs_hero_1783507779624.jpg" // Using generated image!
  },
  {
    id: "g2",
    title: "Akan Royal Linguist Staffs",
    description: "Masterfully hand-carved, gold-leafed linguistic staffs (Okyeame Poma) representing traditional wisdom, diplomacy, and the authority of the stool.",
    category: "culture",
    imageUrl: "/src/assets/images/akan_royal_gold_ornaments_1783507811735.jpg" // Using generated image!
  },
  {
    id: "g3",
    title: "Effiduase Digital Library Hub",
    description: "School children accessing high-speed computers and global learning portals inside the newly completed Effiduase Palace Library.",
    category: "projects",
    imageUrl: "/src/assets/images/new_juaben_dev_project_1783507797237.jpg" // Using generated image!
  },
  {
    id: "g4",
    title: "Akan Kente Weaving Demonstration",
    description: "A local master weaver hand-looming a vibrant yellow and royal crimson silk kente pattern representing progress, leadership, and royalty.",
    category: "culture",
    imageUrl: "https://images.unsplash.com/photo-1523474253046-2cd2748b5fd2?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "g5",
    title: "Asokore Pottery Artisan",
    description: "An elder artisan throwing a beautiful traditional clay pot by hand, keeping a centuries-old Ghanaian craft alive for the next generation.",
    category: "culture",
    imageUrl: "https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "g6",
    title: "Akwadum Highway Construction Site",
    description: "Civil engineers laying structural concrete reinforcements for the Akwadum Nkosuo Drainage and flood safety highway channels.",
    category: "projects",
    imageUrl: "https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "g7",
    title: "The Golden Stool of Remembrance",
    description: "The traditional stool of the Nkosuo division, hand-crafted from sacred mahogany and embellished with rich brass and gold sheets.",
    category: "chiefs",
    imageUrl: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "g8",
    title: "Traditional Adinkra Symbols",
    description: "Emblems of traditional Ghanaian wisdom painted on a royal palace wall, including Gye Nyame, Woforo Dua Pa A, and Sankofa.",
    category: "culture",
    imageUrl: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=800"
  }
];

// Cultural Proverbs for inspiration on the site
export const ADINKRA_PROVERBS = [
  {
    symbol: "SANKOFA",
    translation: "Go back and retrieve it",
    proverb: "Se wo were fi na wosankofa a, yenkyi.",
    meaning: "It is not taboo to go back for what you forgot. Progress (Nkosuo) must be rooted in understanding our history and culture."
  },
  {
    symbol: "WOFORO DUA PA A",
    translation: "When you climb a good tree",
    proverb: "Woforo dua pa a, na yepia wo.",
    meaning: "When you work towards a noble developmental cause, you will always find supporters and community backing."
  },
  {
    symbol: "NEA OPE SE OBEDI HENE",
    translation: "He who wants to be king",
    proverb: "Nea ope se obedi hene no, nna ofiri nkoasua mu.",
    meaning: "True royal leadership (Hene) is rooted in humility, service, and developmental stewardship for the common good."
  }
];

export const EVENTS_DATA: Event[] = [
  {
    id: "ev-eff1",
    title: "Effiduase Akwantukese Royal Durbar",
    description: "An auspicious traditional durbar organized under the patronage of Barima Okoavia Dwomo Baabu II and Nana Ama Amponsah III to welcome home citizens from the diaspora, and present progress on the Palace Library & ICT center.",
    date: "2026-11-20",
    time: "10:00 AM",
    location: "Effiduase Palace Durbar Grounds",
    communityId: "effiduase",
    communityName: "Effiduase",
    category: "durbar",
    imageUrl: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "ev-eff2",
    title: "Annual Youth STEM & Coding Boot Camp",
    description: "A two-week digital literacy intensive led by STEM teachers and digital advocates to equip local junior high school children with foundational programming and internet research skills.",
    date: "2026-08-15",
    time: "09:00 AM",
    location: "Effiduase Palace Library & ICT Center",
    communityId: "effiduase",
    communityName: "Effiduase",
    category: "development",
    imageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "ev-aso1",
    title: "Asokore Pottery & Cultural Craft Festival",
    description: "An annual exhibition celebrating centuries-old pottery skills. Master potters demonstrate claythrowing techniques, and local weavers exhibit the finest royal Kente fabrics.",
    date: "2026-10-05",
    time: "08:30 AM",
    location: "Asokore Traditional Exhibition Square",
    communityId: "asokore",
    communityName: "Asokore",
    category: "festival",
    imageUrl: "https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "ev-aso2",
    title: "Clean Water Sanitation townhall",
    description: "A townhall hosted by Nana Antwi Panin II and Nana Nana Boatemaa I to review the clean water borehole distribution networks, hygiene safety, and environmental protection.",
    date: "2026-09-12",
    time: "02:00 PM",
    location: "Asokore Town Hall",
    communityId: "asokore",
    communityName: "Asokore",
    category: "health",
    imageUrl: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "ev-oyo1",
    title: "Oyoko Agribusiness & Farmer Awards",
    description: "A grand ceremony led by Barima Kodua Kesse II to honor exceptional local cocoa, citrus, and vegetable farmers with subsidized fertilizers, seeds, and storage equipment.",
    date: "2026-12-04",
    time: "10:00 AM",
    location: "Oyoko Community Park",
    communityId: "oyoko",
    communityName: "Oyoko",
    category: "development",
    imageUrl: "https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "ev-oyo2",
    title: "Agro-processing Machinery Seminar",
    description: "Technical training on post-harvest storage, cassava processing machinery, and organic fertilizer optimization, sponsored by the Oyokohemaa's Agribusiness cooperative.",
    date: "2026-07-28",
    time: "11:00 AM",
    location: "Oyoko Cassava Processing Plant Assembly",
    communityId: "oyoko",
    communityName: "Oyoko",
    category: "development",
    imageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "ev-jum1",
    title: "Market Women Financial Literacy Forum",
    description: "A financial capacity workshop organized by Nana Oseiwaa Tempong II providing training on budgeting, digital savings, and accessing low-interest micro-credit facilities.",
    date: "2026-09-20",
    time: "03:00 PM",
    location: "Jumapo Palace Conference Room",
    communityId: "jumapo",
    communityName: "Jumapo",
    category: "development",
    imageUrl: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "ev-jum2",
    title: "Jumapo Maternity Ward Fundraising Gala",
    description: "A charitable fundraising dinner under the patronage of Nana Gyamfi Boateng II to gather finishing funds for the expansion of the clinic's neonatal incubator wing.",
    date: "2026-08-22",
    time: "06:00 PM",
    location: "Royal Heritage Hall, Jumapo",
    communityId: "jumapo",
    communityName: "Jumapo",
    category: "health",
    imageUrl: "https://images.unsplash.com/photo-1584515901367-f1c3a8f3d37e?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "ev-suh1",
    title: "Suhyen Forest & Eco-Tourism Day",
    description: "An environmental stewardship drive featuring mahogany tree-planting campaigns and guided ecological tours through Suhyen's conserved forest reserves.",
    date: "2026-10-18",
    time: "08:00 AM",
    location: "Suhyen Eco-Bridge & Reserves",
    communityId: "suhyen",
    communityName: "Suhyen",
    category: "cultural",
    imageUrl: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "ev-suh2",
    title: "River Conservation and Sanitation Campaign",
    description: "An organized community volunteer campaign to clean and clear riverbanks, removing silt and non-biodegradable waste to safeguard drinking water.",
    date: "2026-07-15",
    time: "06:30 AM",
    location: "Suhyen River Confluence Grounds",
    communityId: "suhyen",
    communityName: "Suhyen",
    category: "health",
    imageUrl: "https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "ev-ada1",
    title: "Ada Youth Digital & E-commerce Hub Demo Day",
    description: "A dynamic tech hackathon displaying software projects, website designs, and digital artwork created by graduates of the Ada Digital Youth Center.",
    date: "2026-11-05",
    time: "10:00 AM",
    location: "Ada Digital Youth Center Hall",
    communityId: "ada",
    communityName: "Ada (New Juaben)",
    category: "development",
    imageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "ev-ada2",
    title: "Ada Eco-Recycling Community Challenge",
    description: "A community-wide plastics recycling tournament rewarding local residential blocks that collect and sort the largest volume of recyclable waste.",
    date: "2026-08-30",
    time: "09:00 AM",
    location: "Ada Royal Palace Field",
    communityId: "ada",
    communityName: "Ada (New Juaben)",
    category: "development",
    imageUrl: "https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "ev-akw1",
    title: "Akwadum Highway Sanitation & Planning Townhall",
    description: "A town planning discussion presenting the newly engineered highway storm-drain blueprints, with an active community clean-up drive preceding the forum.",
    date: "2026-09-08",
    time: "08:00 AM",
    location: "Akwadum Highway Lorry Terminal",
    communityId: "akwadum",
    communityName: "Akwadum",
    category: "development",
    imageUrl: "https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "ev-akw2",
    title: "Akwadum Maternal & Child Wellness Screening",
    description: "A medical screening event funded by the Akwadum Stool, offering free optical testing, pediatrics checkups, and nutritional supplements to local families.",
    date: "2026-07-25",
    time: "08:30 AM",
    location: "Akwadum Central Market Plaza",
    communityId: "akwadum",
    communityName: "Akwadum",
    category: "health",
    imageUrl: "https://images.unsplash.com/photo-1584515901367-f1c3a8f3d37e?auto=format&fit=crop&q=80&w=800"
  }
];

export const DEFAULT_LEADERS = [
  {
    id: "paramount_chief",
    role: "NEW JUABEN PARAMOUNT CHIEF",
    name: "Daasebre Kwaku Boateng III",
    title: "Omanhene of New Juaben Traditional Area",
    avatarUrl: "/src/assets/images/new_juaben_council_chiefs_hero_1783507779624.jpg",
    bio: "Highly revered Paramount Chief of the New Juaben Traditional Area, serving as the supreme cultural patron of traditional values and modernization across all divisional kingdoms."
  },
  {
    id: "hemaa",
    role: "NEW JUABENG HEMAA",
    name: "Nana Juaben Serwaa III",
    title: "Queen Mother of New Juaben Traditional Area",
    avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400",
    bio: "The venerable Queen Mother, actively championing female socio-economic empowerment, youth vocational guilds, and infant healthcare sanitation projects."
  },
  {
    id: "nkosuo_hene",
    role: "NEW JUABEN NKOSUO HENE / NYAMEKROMHENE",
    name: "Barima Dr. Nana Yaw Annor",
    title: "Development Chief & Chief of Nyamekrom Divisional Area",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
    bio: "Barima Dr. Nana Yaw Annor is both the Nkosuohene (Development Chief) of the New Juaben Traditional Area and the Chief of Nyamekrom. He has prioritized structural development, bringing advanced public infrastructure projects, agricultural cooperatives, tech-driven modern classrooms, and clean-water systems to fruition."
  },
  {
    id: "nkosuo_hemaa",
    role: "NEW JUABEN NKOSUO HEMAA",
    name: "Nana Afia Boatemaa II",
    title: "Development Queen Mother of New Juaben Traditional Area",
    avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400",
    bio: "Nana Afia Boatemaa II is the Nkosuohemaa (Development Queen Mother) of the New Juaben Traditional Area. She co-leads the Nkosuo Division with a focus on empowering market women, establishing community daycare support facilities, and securing educational pathways for girls and young mothers."
  }
];

export const INITIAL_FEEDBACK: FeedbackSubmission[] = [
  {
    id: "fb_1",
    name: "Kofi Mensah",
    email: "kofi.mensah@gmail.com",
    phone: "+233 24 123 4567",
    community: "Suhyen",
    feedbackType: "appreciation",
    message: "We are extremely grateful to the Traditional Council for completing the Suhyen Health Clinic renovation. It has saved us long travels to Koforidua for basic healthcare.",
    createdAt: "2026-07-08T09:30:00Z",
    isRead: true
  },
  {
    id: "fb_2",
    name: "Amma Serwaa",
    email: "amma.serwaa@yahoo.com",
    phone: "+233 20 987 6543",
    community: "Nyamekrom",
    feedbackType: "project_request",
    message: "Thank you Nana Nyamekromhene for the digital classroom projects. We would also request if a drainage system can be built near the local market to prevent erosion during heavy rains.",
    createdAt: "2026-07-09T14:15:00Z",
    isRead: false
  },
  {
    id: "fb_3",
    name: "Kwame Boateng",
    email: "k.boateng@gmail.com",
    community: "Asokore",
    feedbackType: "suggestion",
    message: "Could we have a weekly or monthly youth vocational workshop at the Asokore community hall? Many young people here are eager to learn tailoring, carpentry, and basic tech skills.",
    createdAt: "2026-07-09T18:45:00Z",
    isRead: false
  }
];

export const DEFAULT_ADVISORY_BOARD: AdvisoryBoardMember[] = [
  {
    id: "adv_1",
    name: "Prof. Kofi Asare-Bediako",
    role: "Chairman & Development Policy Advisor",
    organization: "Institute of Development Studies, Ghana",
    bio: "Prof. Asare-Bediako is a renowned scholar with over 25 years of experience in regional planning and rural modernization. He advises the Omanhene and the Nkosuo Division on policy frameworks and sustainable community programs.",
    imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "adv_2",
    name: "Dr. Evelyn Osei-Kofi",
    role: "Health & Sanitation Coordinator",
    organization: "Ministry of Health / WHO Consultant",
    bio: "Dr. Osei-Kofi oversees the implementation of primary healthcare initiatives and health clinics upgrade programs in New Juaben. She brings vast expertise in public health and disease prevention.",
    imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "adv_3",
    name: "Barima Osei-Tutu Prempeh",
    role: "Financial Advisory & PPP Lead",
    organization: "African Development Bank / Sovereign Wealth Fund",
    bio: "Barima is an investment banker specializing in public-private partnerships. He leads the structuring of development funds and facilitates corporate investments into New Juaben's agricultural and industrial cooperatives.",
    imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "adv_4",
    name: "Dr. Sarah Mensah-Agyei",
    role: "Education & Scholarships Director",
    organization: "Ghana Education Service Council",
    bio: "Dr. Mensah-Agyei is a senior educational reform specialist. She coordinates the King's Excellence scholarship initiatives, primary school resource packages, and teacher training programs in New Juaben.",
    imageUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "adv_5",
    name: "Ing. Emmanuel Ampofo",
    role: "Infrastructure & Engineering Lead",
    organization: "Ghana Institution of Engineering",
    bio: "Ing. Ampofo possesses extensive experience in public works and urban drainage management. He advises the division on modern market construction layouts, sustainable drainage, and clean water expansion models.",
    imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "adv_6",
    name: "Mrs. Akua Boatenmaa Frimpong",
    role: "Agribusiness & Cooperatives Advisor",
    organization: "National Agricultural Extension Forum",
    bio: "Mrs. Frimpong guides local smallholder farmers in transitioning to modern high-yield cash crop models. She advises on establishing processing hubs for plantain, cassava, and cocoa cooperatives.",
    imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "adv_7",
    name: "Dr. Albert Kyei-Mensah",
    role: "Environmental Sustainability & Water Lead",
    organization: "Water Research Institute (WRI)",
    bio: "Dr. Kyei-Mensah is an expert in climate-smart agriculture and clean hydrology. He drafts policies for clean community water supply systems, waste-to-resource programs, and ecological preservation in New Juaben.",
    imageUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "adv_8",
    name: "Ms. Cynthia Gyamfi",
    role: "Youth Vocational Training Coordinator",
    organization: "National Vocational Training Institute (NVTI)",
    bio: "Ms. Gyamfi designs targeted skill-building programs for high school graduates. She coordinates regional training centers offering tech bootcamps, mechanical apprenticeships, and tailoring craft certifications.",
    imageUrl: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "adv_9",
    name: "Nana Yaw Adjei-Sarpong",
    role: "Cultural Heritage & Legal Counsel",
    organization: "Supreme Court of Ghana / Traditional Law Bar",
    bio: "Nana Yaw advises on customary law, community property alignments, and historical preservation. He ensures all modernization programs seamlessly respect traditional structures and chieftaincy lineages.",
    imageUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "adv_10",
    name: "Mrs. Theresa Owusu-Ansah",
    role: "Social Welfare & Women's Group Coordinator",
    organization: "Ministry of Gender, Children and Social Protection",
    bio: "Mrs. Owusu-Ansah leads the design of micro-credit systems for female market traders and constructs community daycare amenities to support working mothers in local market zones.",
    imageUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400"
  }
];

export const DEFAULT_CONTACT_INFO: ContactInfo = {
  phone: "+233 24 412 3456 / +233 20 811 9876",
  email: "secretariat@newjuabennkosuo.org",
  address: "Omanhene Palace, Nkosuo Secretariat, Koforidua, Eastern Region, Ghana",
  gpsAddress: "EN-123-4567",
  officeHours: "Monday – Friday: 8:00 AM – 5:00 PM (GMT)"
};




