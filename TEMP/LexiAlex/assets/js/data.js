/* Central content data — edit topics, materials, flashcards, sources and tips from one place. */

var TOPICS = [
  {
    id: 'rostliny',
    title: 'Rostlinná výroba',
    icon: 'leaf',
    color: 'green',
    desc: 'Pěstování plodin, jejich nároky a agrotechnika od setí po sklizeň.',
    href: 'temata/rostliny.html'
  },
  {
    id: 'zvirata',
    title: 'Živočišná výroba',
    icon: 'cow',
    color: 'brown',
    desc: 'Chov hospodářských zvířat, jejich péče, welfare a chovatelské postupy.',
    href: 'temata/zvirata.html'
  },
  {
    id: 'veda',
    title: 'Věda',
    icon: 'flask',
    color: 'yellow',
    desc: 'Biologie, chemie a další vědní obory, které v zemědělství používáme.',
    href: 'temata/veda.html'
  },
  {
    id: 'mechanizace',
    title: 'Mechanizace',
    icon: 'tractor',
    color: 'green',
    desc: 'Zemědělské stroje, jejich stavba, funkce a základní údržba.',
    href: 'temata/mechanizace.html'
  },
  {
    id: 'puda-a-krajina',
    title: 'Půda a krajina',
    icon: 'mountain',
    color: 'brown',
    desc: 'Péče o půdu, ochrana vody a krajiny, ve které hospodaříme.',
    href: 'temata/puda-a-krajina.html'
  },
  {
    id: 'dalsi-temata',
    title: 'Další témata',
    icon: 'book',
    color: 'yellow',
    desc: 'Zajímavosti a témata na pomezí oborů, která se nevešla jinam.',
    href: 'temata/dalsi-temata.html'
  }
];

/* Study materials placeholders — replace with real files once available. */
var MATERIALS = {
  rostliny: [
    { title: 'Úvod do rostlinné výroby', type: 'Prezentace', status: 'placeholder' },
    { title: 'Shrnutí: obiloviny a okopaniny', type: 'Shrnutí tématu', status: 'placeholder' }
  ],
  zvirata: [
    { title: 'Chov skotu — základy', type: 'Prezentace', status: 'placeholder' },
    { title: 'Shrnutí: welfare hospodářských zvířat', type: 'Shrnutí tématu', status: 'placeholder' }
  ],
  veda: [
    { title: 'Biologie rostlin pro zemědělce', type: 'Prezentace', status: 'placeholder' },
    { title: 'Shrnutí: půdní chemie', type: 'Shrnutí tématu', status: 'placeholder' }
  ],
  mechanizace: [
    { title: 'Traktory a jejich pohony', type: 'Prezentace', status: 'placeholder' },
    { title: 'Shrnutí: sklizňová technika', type: 'Shrnutí tématu', status: 'placeholder' }
  ],
  'puda-a-krajina': [
    { title: 'Půdní druhy a typy', type: 'Prezentace', status: 'placeholder' },
    { title: 'Shrnutí: eroze a ochrana krajiny', type: 'Shrnutí tématu', status: 'placeholder' }
  ],
  'dalsi-temata': [
    { title: 'Zemědělství ve světě', type: 'Prezentace', status: 'placeholder' },
    { title: 'Shrnutí: zajímavosti oboru', type: 'Shrnutí tématu', status: 'placeholder' }
  ]
};

/* Flashcard decks — placeholder content, ready to be expanded per topic. */
var FLASHCARD_DECKS = {
  rostliny: [
    { front: 'Co je to agrotechnická lhůta?', back: 'Doporučené časové období pro provedení konkrétního zásahu (setí, hnojení, sklizeň) s ohledem na růstovou fázi rostliny a počasí.' },
    { front: 'Jmenuj dvě obilniny pěstované v ČR.', back: 'Například pšenice ozimá a ječmen jarní.' },
    { front: 'Co znamená pojem osevní postup?', back: 'Plánované střídání plodin na pozemku v čase tak, aby se udržela úrodnost půdy a omezily choroby a škůdci.' }
  ],
  zvirata: [
    { front: 'Co znamená pojem welfare zvířat?', back: 'Soubor podmínek zajišťujících zvířeti fyzickou i psychickou pohodu — dostatek prostoru, krmiva, vody a péče.' },
    { front: 'Jaká je běžná doba březosti u krávy?', back: 'Přibližně 9 měsíců (283 dní).' }
  ],
  veda: [
    { front: 'Co je to fotosyntéza?', back: 'Proces, při kterém rostliny přeměňují sluneční energii, vodu a CO₂ na energii ve formě cukrů a kyslík.' },
    { front: 'Co udává pH půdy?', back: 'Míru kyselosti nebo zásaditosti půdy, která ovlivňuje dostupnost živin pro rostliny.' }
  ],
  mechanizace: [
    { front: 'K čemu slouží pluh?', back: 'K základnímu zpracování půdy — obrací a kypří ornici před setím.' },
    { front: 'Co je PTO na traktoru?', back: 'Vývodový hřídel (power take-off), který přenáší pohon z traktoru na připojený stroj.' }
  ],
  'puda-a-krajina': [
    { front: 'Co je to půdní eroze?', back: 'Odnos půdních částic vlivem vody nebo větru, který snižuje úrodnost půdy.' },
    { front: 'Jmenuj jedno opatření proti erozi.', back: 'Například pásové střídání plodin nebo zatravnění svahů.' }
  ],
  'dalsi-temata': [
    { front: 'Co je to precizní zemědělství?', back: 'Přístup využívající data, senzory a GPS k přesnějšímu a efektivnějšímu hospodaření.' }
  ]
};

/* Verified sources per topic — placeholders until real citations are added. */
var SOURCES = {
  rostliny: [{ title: 'Doplnit ověřený zdroj k rostlinné výrobě', url: '#' }],
  zvirata: [{ title: 'Doplnit ověřený zdroj k živočišné výrobě', url: '#' }],
  veda: [{ title: 'Doplnit ověřený zdroj k vědní části', url: '#' }],
  mechanizace: [{ title: 'Doplnit ověřený zdroj k mechanizaci', url: '#' }],
  'puda-a-krajina': [{ title: 'Doplnit ověřený zdroj k půdě a krajině', url: '#' }],
  'dalsi-temata': [{ title: 'Doplnit ověřený zdroj k dalším tématům', url: '#' }]
};

/* Study tips & learning strategies. */
var TIPS = [
  {
    title: 'Aktivní vybavování (Active Recall)',
    icon: 'bulb',
    text: 'Místo opakovaného čtení zápisků si zkus látku vybavit zpaměti — třeba pomocí kartiček na tomto webu. Mozek si informaci lépe zapamatuje, když si na ni musí sám vzpomenout.'
  },
  {
    title: 'Rozložené opakování',
    icon: 'sparkle',
    text: 'Nauč se látku a vrať se k ní znovu za den, pak za týden. Krátká opakování v delším čase fungují lépe než jedno dlouhé biflování.'
  },
  {
    title: 'Uč něco jiného',
    icon: 'quote',
    text: 'Zkus vysvětlit téma spolužákovi vlastními slovy. Pokud to dokážeš srozumitelně vysvětlit, znamená to, že tomu opravdu rozumíš.'
  }
];

/* Placeholder for future classmate interviews. */
var INTERVIEWS = [
  { name: 'Rozhovor připravujeme', role: 'Brzy k dispozici', quote: 'Zde se v budoucnu objeví postřehy spolužáků na téma, co jim při studiu pomohlo nejvíc.' }
];
