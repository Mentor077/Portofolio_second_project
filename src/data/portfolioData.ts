import { SiteConfig, Project, SkillCategory, TimelineItem } from '../types';

export const initialConfig: SiteConfig = {
  title: "Mentor MALONGA | Data Analyst & BI Developer 🚀",
  description: "Expert en analyse de données et BI, alliant la rigueur de l'électronique à la puissance de Microsoft Fabric et Power BI.",
  email: "mentormalonga17@gmail.com",
  author: "Mentor Malonga",
  url: "https://Mentor077.github.io",
  baseurl: "",
  theme: "jekyll-theme-minimal",
  photoUrl: "https://github.com/Mentor077.png",
  social: {
    linkedin: "https://www.linkedin.com/in/mentor-malonga",
    github: "https://github.com/Mentor077"
  },
  nav_links: [
    { title: "Accueil", url: "/" },
    { title: "Projets", url: "/projects" },
    { title: "À Propos", url: "/about" },
    { title: "Contact", url: "/contact" },
    { title: "🚀 Déployer", url: "/deploy" }
  ]
};

export const projectsData: Project[] = [
  {
    id: "fabric-enterprise-dw",
    title: "Plateforme de Données Microsoft Fabric & Lakehouse",
    subtitle: "Architecture Medallion (Bronze/Silver/Gold) & Power BI Direct Lake",
    category: "Microsoft Fabric",
    description: "Ingestion automatique et transformation de flux massifs d'entreprise via Microsoft Fabric (Data Factory, PySpark Lakehouse) connectés en mode Direct Lake à Power BI.",
    fullDescription: "Conception complète d'un entrepôt de données d'entreprise en s'appuyant sur l'écosystème Microsoft Fabric. Implémentation d'une architecture Medallion garantissant une gouvernance de données sans faille et une latence quasi nulle sur les tableaux de bord Power BI en Direct Lake.",
    metrics: [
      { label: "Gain de Performance", value: "+85% vitesse de rafraîchissement" },
      { label: "Volumétrie traitée", value: "4.5M+ lignes/jour" },
      { label: "Réduction des coûts", value: "-30% infrastructure BI" }
    ],
    tools: ["Microsoft Fabric", "OneLake", "PySpark", "Data Factory", "Power BI Direct Lake", "SQL Endpoint"],
    image: "/images/hero-data-bg.jpg",
    githubUrl: "https://github.com/Mentor077",
    liveDemoUrl: "https://Mentor077.github.io",
    daxExample: `// Calcul de la Croissance YoY du Chiffre d'Affaires en Direct Lake
CA_YoY_Growth = 
VAR CurrentYearSales = CALCULATE(SUM(Sales[Amount]))
VAR PriorYearSales = CALCULATE(SUM(Sales[Amount]), SAMEPERIODLASTYEAR(Calendar[Date]))
RETURN
DIVIDE(CurrentYearSales - PriorYearSales, PriorYearSales, 0)`,
    architecture: [
      "Bronze (Raw) : Ingestion batch & temps réel de sources multiples (ERP, CRM, Capteurs IoT)",
      "Silver (Cleansed) : Validation, dédoublonnage et modélisation en schémas en étoile via Notebooks PySpark",
      "Gold (Curated) : Agrégations métiers prêtes pour la consommation Direct Lake par Power BI"
    ],
    featured: true
  },
  {
    id: "iot-electronics-bi",
    title: "Télémétrie Industrielle : De l'Électronique vers Power BI",
    subtitle: "Acquisition de signaux de capteurs & surveillance BI en temps réel",
    category: "Électronique & Data",
    description: "Pont technique entre capteurs électroniques (température, courant, vibrations) et rapports d'analyse BI pour la maintenance prédictive et la détection d'anomalies.",
    fullDescription: "Exploitation de ma double compétence en Électronique et en Data Analytics : acquisition de données physiques sur microcontrôleurs (ESP32/Arduino via protocoles MQTT/Modbus), centralisation en base SQL, et visualisation analytique dans Power BI avec alertes automatiques.",
    metrics: [
      { label: "Précision d'alerte", value: "99.4%" },
      { label: "Temps d'arrêt évité", value: "140h / an" },
      { label: "Fréquence d'acquisition", value: "100 ms" }
    ],
    tools: ["Power BI", "Python", "MQTT / IoT", "SQL Server", "DAX", "Électronique & Capteurs"],
    image: "/images/hero-data-bg.jpg",
    githubUrl: "https://github.com/Mentor077",
    daxExample: `// Alerte d'anomalie de température du circuit critique
Alerte_Surchauffe = 
VAR TempActuelle = LASTNONBLANKVALUE('Capteurs'[Horodatage], SUM('Capteurs'[Temperature_C]))
VAR SeuilCritique = MAX('Parametres'[Seuil_Alerte])
RETURN
IF(TempActuelle > SeuilCritique, "⚠️ KRITIK - ARRET CONSEILLE", "✅ Normal")`,
    architecture: [
      "Acquisition matérielle : Capteurs de courant analogiques & numériques connectés au bus I2C/SPI",
      "Gateway IoT : Script Python d'acquisition et d'horodatage haute précision",
      "Analyse Power BI : Modèle en étoile et rapports dynamiques de maintenance prédictive"
    ],
    featured: true
  },
  {
    id: "financial-exec-dashboard",
    title: "Tableau de Bord Financier & Modélisation DAX Avancée",
    subtitle: "Modèle sémantique Tabulaire, Time Intelligence & Budget vs Réalisé",
    category: "Power BI",
    description: "Rapport directionnel interactif avec modélisation en étoile, calculs complexes de Time Intelligence (YTD, MTD, Rolling 12M), et simulation d'hypothèses de marge.",
    fullDescription: "Développement d'un rapport exécutif complet permettant à la direction financière d'analyser la rentabilité par division, région et produit. Utilisation intensive de DAX avancé, optimisation du moteur VertiPaq, et intégration de Row-Level Security (RLS).",
    metrics: [
      { label: "Adoption Direction", value: "100% des comités" },
      { label: "Réduction temps reporting", value: "De 4 jours à 5 min" },
      { label: "Taille modèle compressée", value: "-62% (VertiPaq)" }
    ],
    tools: ["Power BI Desktop", "DAX Studio", "Tabular Editor", "Power Query M", "SQL Server"],
    image: "/images/hero-data-bg.jpg",
    githubUrl: "https://github.com/Mentor077",
    daxExample: `// Marge Cumulée sur 12 Mois Glissants (Rolling 12 Months Margin)
Rolling_12M_Margin = 
CALCULATE(
    [Total Margin],
    DATESINPERIOD(
        'Calendar'[Date],
        MAX('Calendar'[Date]),
        -1,
        YEAR
    )
)`,
    architecture: [
      "Modélisation en étoile pure (1 table de faits Ventes, 5 tables de dimensions conformées)",
      "Optimisation DAX : Réduction du nombre de colonnes calculées au profit de mesures dynamiques",
      "Sécurité (RLS) : Filtrage granulaire des revenus par directeur régional"
    ],
    featured: true
  },
  {
    id: "automated-sql-etl",
    title: "Pipeline de Qualité des Données & ETL SQL/Python",
    subtitle: "Nettoyage, normalisation et automatisation de flux de bases hétérogènes",
    category: "ETL & SQL",
    description: "Ingénierie de pipelines automatisés de nettoyage de données et d'enrichissement. Validation de schémas, détection de doublons et chargement en schémas analytiques.",
    fullDescription: "Création d'un moteur de réconciliation de données multi-sources. Écriture de procédures stockées complexes en T-SQL et d'orchestration Python pour garantir que les KPI distribués dans l'entreprise s'appuient sur une 'Single Source of Truth'.",
    metrics: [
      { label: "Taux de conformité", value: "99.9%" },
      { label: "Erreurs résolues auto", value: "12,000+ / semaine" },
      { label: "Fiabilité du pipeline", value: "SLA 99.8%" }
    ],
    tools: ["PostgreSQL", "T-SQL", "Python (Pandas/SQLAlchemy)", "Git", "Power BI"],
    image: "/images/hero-data-bg.jpg",
    githubUrl: "https://github.com/Mentor077",
    daxExample: `-- Requête SQL de détection d'écarts de facturation
WITH FacturationAgg AS (
    SELECT ClientID, DATE_TRUNC('month', DateFacture) AS Mois, SUM(Montant) AS TotalMois
    FROM Factures WHERE Statut = 'Validé' GROUP BY 1, 2
)
SELECT f.*, p.BudgetPrevu, (f.TotalMois - p.BudgetPrevu) AS Ecart
FROM FacturationAgg f
LEFT JOIN Previsions p ON f.ClientID = p.ClientID AND f.Mois = p.Mois
WHERE ABS(f.TotalMois - p.BudgetPrevu) > 1000;`,
    architecture: [
      "Extraction : Connecteurs API REST et flux SQL répliqués",
      "Transformation : Script Python effectuant la validation typologique et la standardisation des unités",
      "Chargement : Alimentation synchronisée de la base de données analytique"
    ],
    featured: false
  }
];

export const skillCategories: SkillCategory[] = [
  {
    title: "Analyse & Modélisation BI",
    iconName: "BarChart3",
    description: "Conception de modèles sémantiques performants et visualisations percutantes",
    skills: [
      { name: "Power BI (Desktop & Service)", level: 95, badge: "Expert" },
      { name: "DAX & DAX Studio", level: 90, badge: "Avancé" },
      { name: "Power Query (Langage M)", level: 88, badge: "Avancé" },
      { name: "Modélisation Dimensionnelle (Étoile/Flocon)", level: 92, badge: "Expert" },
      { name: "Storytelling & UX/UI de Rapports", level: 90, badge: "Avancé" }
    ]
  },
  {
    title: "Microsoft Fabric & Big Data",
    iconName: "Cpu",
    description: "Écosystème unifié d'analytique nouvelle génération de Microsoft",
    skills: [
      { name: "Microsoft Fabric (Lakehouse/Warehouse)", level: 88, badge: "Spécialiste" },
      { name: "OneLake & Architecture Medallion", level: 85, badge: "Avancé" },
      { name: "Power BI Direct Lake", level: 90, badge: "Expert" },
      { name: "Data Factory & Pipelines Fabric", level: 82, badge: "Maîtrisé" },
      { name: "PySpark pour Data Engineering", level: 80, badge: "Maîtrisé" }
    ]
  },
  {
    title: "Bases de Données & Programmation",
    iconName: "Database",
    description: "Requêtage, transformation et automatisation des flux de données",
    skills: [
      { name: "SQL (T-SQL, PostgreSQL, MySQL)", level: 92, badge: "Expert" },
      { name: "Python (Pandas, NumPy, Matplotlib)", level: 85, badge: "Avancé" },
      { name: "ETL / ELT Pipelines", level: 88, badge: "Avancé" },
      { name: "Git & Contrôle de Version", level: 84, badge: "Maîtrisé" },
      { name: "Automatisation & Scripting", level: 86, badge: "Avancé" }
    ]
  },
  {
    title: "Rigueur Électronique & Télémétrie",
    iconName: "Zap",
    description: "L'ingénierie physique et l'analyse de signaux au service de la fiabilité des données",
    skills: [
      { name: "Acquisition de Données & Capteurs", level: 90, badge: "Expert" },
      { name: "Traitement du Signal & Métrologie", level: 88, badge: "Avancé" },
      { name: "Microcontrôleurs & IoT (ESP32 / Arduino)", level: 85, badge: "Avancé" },
      { name: "Rigueur de diagnostic & résolution de pannes", level: 95, badge: "Inné" },
      { name: "Analyse de fiabilité & Maintenance prédictive", level: 88, badge: "Avancé" }
    ]
  }
];

export const timelineData: TimelineItem[] = [
  {
    year: "Aujourd'hui",
    title: "Data Analyst & BI Developer Spécialisé",
    companyOrSchool: "Projets Experts & Missions Entreprises",
    description: "Conception de solutions d'informatique décisionnelle de pointe avec Microsoft Fabric et Power BI. Optimisation des architectures sémantiques, intégration de calculs DAX complexes, et mise en place d'indicateurs de performance fiables.",
    tags: ["Microsoft Fabric", "Power BI", "DAX", "Direct Lake", "Python"]
  },
  {
    year: "Parcours BI",
    title: "Transition & Mastérisation Data Analytics",
    companyOrSchool: "Formation Intensive & Projets Analytiques",
    description: "Application des principes d'ingénierie et de rigueur à l'analyse de données d'entreprise. Maîtrise des pipelines ETL, modélisation dimensionnelle en étoile, et création de tableaux de bord financiers et opérationnels.",
    tags: ["SQL", "Power Query", "Modélisation", "ETL", "Dataviz"]
  },
  {
    year: "Genèse Technique",
    title: "Formation & Background en Électronique",
    companyOrSchool: "Électronique & Systèmes Embarqués",
    description: "Acquisition d'une rigueur scientifique exemplaire : conception de circuits, mesure de signaux physiques, analyse de tolérances et diagnostic d'anomalies. Ce socle technique me confère un sens accru de la précision des données.",
    tags: ["Électronique", "Traitement du Signal", "Capteurs", "Rigueur Scientifique"]
  }
];
