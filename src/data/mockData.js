export const offers = [
  { id: 1, title: 'Frontend Developer', company: 'TechNova', location: 'Tunis, Tunisie', mode: 'Remote', contract: 'Full-Time', level: '1–3 ans', category: 'Web Development', tags: ['React', 'TypeScript', 'Tailwind CSS'], description: 'Construire des interfaces web modernes, accessibles et performantes avec une équipe produit collaborative.', urgent: true, posted: 'Il y a 2h', logo: '</>' },
  { id: 2, title: 'Data Analyst', company: 'DataMind', location: 'Tunis, Tunisie', mode: 'Hybride', contract: 'Part-Time', level: '0–2 ans', category: 'Data Science', tags: ['Python', 'SQL', 'Power BI'], description: 'Analyser les données, créer des tableaux de bord et transformer les indicateurs en recommandations.', urgent: false, posted: 'Il y a 4h', logo: '▥' },
  { id: 3, title: 'Full Stack Developer', company: 'InnovateTech', location: 'Sousse, Tunisie', mode: 'Remote', contract: 'Full-Time', level: '2–4 ans', category: 'Web Development', tags: ['React', 'Node.js', 'MongoDB'], description: 'Développer des applications web complètes et participer aux décisions techniques.', urgent: false, posted: 'Il y a 1j', logo: '◇' },
  { id: 4, title: 'DevOps Engineer', company: 'CloudNext', location: 'Remote', mode: 'Remote', contract: 'Full-Time', level: '3+ ans', category: 'Cloud & DevOps', tags: ['AWS', 'Docker', 'Kubernetes'], description: 'Automatiser les déploiements et améliorer la fiabilité de notre infrastructure cloud.', urgent: false, posted: 'Il y a 1j', logo: '✦' },
  { id: 5, title: 'UI/UX Designer', company: 'DesignFlow', location: 'Tunis, Tunisie', mode: 'Présentiel', contract: 'Full-Time', level: '1–3 ans', category: 'Design', tags: ['Figma', 'UI Design', 'Prototyping'], description: 'Imaginer des expériences simples et intuitives à travers des parcours et prototypes.', urgent: false, posted: 'Il y a 2j', logo: '∞' },
  { id: 6, title: 'Backend Developer', company: 'TechBase', location: 'Monastir, Tunisie', mode: 'Hybride', contract: 'Full-Time', level: '2–4 ans', category: 'Web Development', tags: ['Java', 'Spring Boot', 'PostgreSQL'], description: 'Concevoir des API robustes et maintenir les services backend de la plateforme.', urgent: false, posted: 'Il y a 2j', logo: '</>' },
]

export const developers = [
  { id: 1, name: 'Amira Ben Salem', role: 'Frontend Developer', city: 'Tunis', level: 'Junior', bio: 'Passionnée par les interfaces accessibles et les expériences web fluides.', skills: ['React', 'JavaScript', 'CSS'], initials: 'AB', rating: '4.9' },
  { id: 2, name: 'Youssef Trabelsi', role: 'Full Stack Developer', city: 'Sousse', level: 'Intermédiaire', bio: 'Développeur JavaScript, curieux des architectures modernes et des API.', skills: ['Node.js', 'React', 'MongoDB'], initials: 'YT', rating: '4.8' },
  { id: 3, name: 'Meriem Gharbi', role: 'Data Analyst', city: 'Sfax', level: 'Junior', bio: 'J’aime donner du sens aux données avec des analyses claires.', skills: ['Python', 'SQL', 'Power BI'], initials: 'MG', rating: '5.0' },
  { id: 4, name: 'Omar Khelifi', role: 'Backend Developer', city: 'Tunis', level: 'Confirmé', bio: 'Spécialisé dans les API, les bases de données et les systèmes distribués.', skills: ['Java', 'Spring Boot', 'PostgreSQL'], initials: 'OK', rating: '4.7' },
]

export const applicationsSeed = [
  { id: 101, offerId: 1, offer: 'Frontend Developer', developer: 'Amira Ben Salem', email: 'amira@example.com', date: '18 nov. 2026', status: 'En attente', skills: ['React', 'TypeScript'] },
  { id: 102, offerId: 1, offer: 'Frontend Developer', developer: 'Youssef Trabelsi', email: 'youssef@example.com', date: '17 nov. 2026', status: 'En attente', skills: ['React', 'Node.js'] },
  { id: 103, offerId: 6, offer: 'Backend Developer', developer: 'Meriem Gharbi', email: 'meriem@example.com', date: '16 nov. 2026', status: 'Acceptée', skills: ['Java', 'SQL'] },
]
