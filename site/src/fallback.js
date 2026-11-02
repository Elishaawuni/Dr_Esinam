// Shown until the Sanity project is connected and has content. Taken from the CV.
const I = (title, org, period, description, extra = {}) => ({_id: title + period, title, org, period, description, ...extra})
const T = t => ({_id: t, title: t})
export default {
settings: {
  name: 'Dr. (Mrs.) Felicia Esinam Pufaa', headline: 'Gender & Social Development Specialist',
  role: 'Senior Lecturer · Department of Social Studies Education · University of Education, Winneba',
  tagline: 'Advancing gender equity, women’s empowerment and community development through research, teaching and consultancy.',
  email: 'fepufaa@uew.edu.gh', phone: '+233 244 013 586', location: 'Winneba, Ghana',
  bio: ['I hold a PhD in Social Studies from the University of Education, Winneba, an MSc in Development Planning and Management from KNUST, and a BA in Integrated Development Studies from UDS, Tamale.',
        'With over 20 years of experience across academia and development practice, I have worked with USAID, UNICEF, ILO, Oxfam, Plan International and the BUSAC Fund on research, programme delivery, monitoring and evaluation, and capacity building.',
        'My mission is to achieve excellence in research and consultancy, development work, and the training of young academics towards national and international development. I speak English and five Ghanaian languages.'],
  stats: [{value: '20+', label: 'Years of experience'}, {value: '10+', label: 'Publications'}, {value: '10+', label: 'Partner organisations'}, {value: '6', label: 'Languages spoken'}],
  bookingUrl: '', seoTitle: 'Dr. Felicia Esinam Pufaa | Gender & Social Development Specialist, UEW',
  seoDescription: 'Sample description: Senior Lecturer at UEW. Research, teaching, consultancy and speaking on gender, development and women’s health.',
  // SAMPLE links: replace with the real profile URLs in Sanity
  socials: [{label: 'ORCID', url: 'https://orcid.org/0000-0000-0000-0000'}, {label: 'Google Scholar', url: 'https://scholar.google.com/'},
    {label: 'ResearchGate', url: 'https://www.researchgate.net/'}, {label: 'Academia.edu', url: 'https://www.academia.edu/'}, {label: 'LinkedIn', url: 'https://www.linkedin.com/'}], availability: 'Open to consultancy, research collaboration and speaking invitations.'},
researchInterest: ['Gender & Women Empowerment','Women’s & Public Health','Adolescent Sexual Behaviour','Child Protection & Labour','Social Studies Pedagogy','Migration & Development','Teacher Mentoring','Microfinance & Livelihoods'].map(T),
research: [
 I('Parent–Adolescent Conflict & Academic Performance','South Dayi District, Ghana','2026','Examines how conflict at home affects adolescents’ performance, retention and concentration.'),
 I('Determinants of Obstetric Fistula','Qualitative case study','2025','Socio-economic and cultural drivers of obstetric fistula among women in Ghana.'),
 I('Sex Education & Adolescent Sexual Behaviour','Ghanaian schools','2025','Assessing sex education strategies and their influence on adolescent behaviour.')],
teaching: [
 I('Lecturer, Social Studies Education','University of Education, Winneba','2021 – Present','Undergraduate and postgraduate teaching, supervision and examinations.'),
 I('Full-Time Lecturer','SDD-UBIDS, Wa','2018 – 2021','Social and Business Education; coordinated research and project works.'),
 I('Part-Time Tutor','UCC College of Distance Education','2017 – Present',''),
 I('Lecturer, Rural Development & Ecotourism','Wisconsin International University College','2011 – 2018','')],
employment: [
 I('Examinations Officer','Dept. of Social Studies Education, UEW','2024 – Present',''),
 I('GALS Champion & Facilitator','GASIP, Ministry of Food and Agriculture','2022 – Present',''),
 I('Lecturer','University of Education, Winneba','2021 – Present',''),
 I('Full-Time Lecturer','SDD University of Business & Integrated Development Studies','2018 – 2021',''),
 I('Programmes & Campaigns Officer','Oxfam in Ghana','2016 – 2018','Maternal & Child Health; UNICEF Inequality in Ghana project.'),
 I('Lecturer & Deputy Evening School Coordinator','Wisconsin International University College','2011 – 2013',''),
 I('Assistant Programmes Officer','GAWU of TUC (ILO Child Labour project)','2007 – 2008',''),
 I('District Field Officer','ENAM Project, University of Ghana (USAID)','2005 – 2008','')],
qualification: [
 I('PhD, Social Studies','University of Education, Winneba','2015',''),
 I('Post Graduate Diploma in Education','UDS, Tamale','2020',''),
 I('MSc, Development Planning & Management','KNUST, Kumasi','2010',''),
 I('BA, Integrated Development Studies (Second Class Upper)','University for Development Studies','2004',''),
 I('Certificate in Online Faculty / Virtual Teaching','Emmanuel University, North Carolina, USA','2020',''),
 I('InterAction African Leadership Programme','British Council, Ghana & Zambia','2008',''),
 I('Certificate in Education, Planning & Abilities','TU Dortmund, Germany','2009','')],
specialization: ['Development Studies','Development Planning & Management','Public Health','Women’s Health & Empowerment','Monitoring & Evaluation','Gender Action Learning Systems (GALS)'].map(T),
position: [
 I('Director','Youth Empowerment Foundation, Central Region','2025',''),
 I('Patron & Vice Chairperson','EFYMA (youth mentorship NGO)','2023 – Present',''),
 I('Internship Coordinator','Dept. of Social Studies Education, UEW','2023 – Present',''),
 I('Research Associate','IERIS, UEW','2023 – Present',''),
 I('National Content & Item Test Developer','National Teaching Council, Ghana','2023 – Present',''),
 I('CEO','Centre for Community Development & Women Empowerment (CCDWE)','2019 – Present',''),
 I('Board Chair','UTAG SDD-UBIDS/UDS Welfare','2019 – 2022','')],
membership: ['UTAG – University Teachers Association of Ghana','NaSSA – National Social Studies Association','African Studies Association / Ghana Studies Association'].map(T),
grant: [
 I('Principal Investigator: Stronger Together Endline Evaluation','Plan International Ghana','2025','Ashaiman, Ghana.', {status: 'Awarded'}),
 I('Co-Principal Investigator: Women Economic Empowerment for Collective Transformation','Oxfam in Ghana','2020','Five regions in Ghana.', {status: 'Awarded'}),
 I('Grant Monitoring & Evaluation Consultant','BUSAC Fund','2017 – Present','', {status: 'Ongoing'})],
project: [
 I('Gender Action Learning Systems (GALS)','GASIP / MoFA','2022 – Present','Champion and facilitator promoting gender-equitable agricultural value chains.', {status: 'Ongoing'}),
 I('Youth Mentorship & Career Summits','EFYMA','2023 – Present','Career guidance and entrepreneurship summits for students.', {status: 'Ongoing'}),
 I('MPhil Community Education & Development Studies','University of Education, Winneba','2021','Programme developed for accreditation.', {status: 'Completed'})],
publication: [
 I('Exploring the impact of parent-adolescent conflict on adolescent academic performance','European Scientific Journal, 22(1), 110–137','2026','Amedi & Pufaa', {link: 'https://doi.org/10.19044/esj.2026.v22n1p110'}),
 I('Socio-economic and cultural determinants of obstetric fistula among women in Ghana','Journal of Educational Review, 16(2)','2025','Pufaa'),
 I('Sex education strategies and adolescent sexual behaviour in Ghanaian schools','International Journal of Educational Research, 13(1)','2025','Pufaa & Mokulogo'),
 I('Indicators of social change and education in Ghana','Palgrave Handbook of Global Social Change','2025','Pufaa', {link: 'https://doi.org/10.1007/978-3-030-87624-1_34-1'}),
 I('Social studies pedagogy in Ghana','Ghana Journal of Education and Teaching, 2(1)','2023','Pufaa, Rahman & Saayir'),
 I('Women, Migration and Development in Africa','The Global Handbook of African Women Studies, Springer','2020','Pufaa & Apusigah', {link: 'https://doi.org/10.1007/978-3-319-77030-7_116-1'}),
 I('Financing the production and marketing of shea butter in Tamale, Ghana','Lap Lambert Academic Publishing (Book)','2011','Pufaa')],
supervision: [
 I('Academic Counselling, Level 400 Students','Dept. of Social Studies, UEW','2023 – Present','Guidance on academic progress, research and career pathways.'),
 I('Internship Coordination','Dept. of Social Studies Education, UEW','2023 – Present','Placement and supervision of student interns.'),
 I('Mentoring Young Academics','EFYMA & UEW','Ongoing','Career guidance, leadership and research mentoring.')],
meeting: [I('Virtual Consultations with Students','Zoom / Google Meet / Teams','By appointment','Request a slot through the contact form; a meeting link will be sent to you.')],
testimonial: [I('Student Name (Sample)','Level 400 Student, Social Studies Education, UEW','','Sample testimonial: Dr. Pufaa explains complex development ideas in a way that is clear and practical. Her mentoring and encouragement changed how I approach research and my career.')],
resource: [
 I('Sample Policy Brief: Women’s Economic Empowerment','Policy Brief','2026','Sample resource. Upload a PDF in Sanity to enable the download button.'),
 I('Sample Lecture Notes: Introduction to Development Studies','Lecture Notes','2026','Sample resource. Replace with real material.'),
 I('Sample Article: Social Studies Pedagogy in Ghana','Article','2025','Sample resource. Replace with real material.')],
calendarEvent: [
 {_id: 'ev1', title: 'Sample Public Lecture: Gender and Development in Ghana', eventType: 'Public Lecture', date: '2026-11-12T10:00:00Z', venue: 'UEW, Winneba', description: 'Sample event. Replace with a real event.'},
 {_id: 'ev2', title: 'Sample Webinar: Research Methods for Young Academics', eventType: 'Webinar', date: '2026-12-03T15:00:00Z', venue: 'Zoom', isVirtual: true, description: 'Sample event. Replace with a real event.'}],
award: [], service: [
 I('Research & Evaluation','','','Baseline, midline and endline studies, impact assessments and M&E design.'),
 I('Gender & Women Empowerment Training','','','GALS facilitation, gender mainstreaming and women’s economic empowerment.'),
 I('Capacity Building & Leadership','','','Workshops for NGOs, SMEs, committees and young academics.'),
 I('Keynotes & Public Speaking','','','Conferences, summits, community durbars and panels.')],
event: [
 I('11th International Conference on Education (ICEDU)','Bangkok, Thailand','Apr 2025',''),
 I('5th Annual CLD Conference, OISE','Toronto, Canada','Oct 2024',''),
 I('Critical Thinking Workshop','UCL & University of Cape Coast','Oct 2021',''),
 I('National Stakeholder Workshop on GALS','MoFA & GASIP','Apr 2022','')],
gallery: [], posts: []
}
