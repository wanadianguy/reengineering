# Projet Reengineering

## Equipe
- AUZOU Geoffrey
- CARLIER Amandine
- DENORME William
- FREMEAUX Maxime
- MOREAU Bryan

## Projet refactorisation : Delivecrous (Node.js & MongoDB)

### Centralisation des codes de retour d'appel API
Nous avons décidé de placer les codes d'erreur de réponse dans un fichier, sous forme de constantes.
Cela permet d'uniformiser les codes au sein de l'application, d'éviter des erreurs, et en cas de modification d'un code, de ne pas avoir à le faire partout mais à un seul endroit.

### middlewares
Nous avons consacré un temps conséquent sur la gestion d'erreur dans authentication.middleware.js. Cette discussion concernait le code contenu lors des levées d'exceptions. 
En fin de compte, il a été retenu que la série de conditions au sein de la méthode "catch" était la meilleure (car la seule) option.
En fait, l'utilsation d'un "switch case" n'était pas adaptée ici, car il fallait vérfier les types d'erreurs, ce qui n'est pas possible dans ce cas.

### controllers
Nous avons évité d'utiliser des variables temporaires. Par exemple, nous retournons directement le résultat donné par les méthodes asynchrones faisant appel aux services. Nous avons aussi renommé certaines variables qui n'étaient pas assez explicites, en particulier pour un développeur junior.

### Simplification du code

- Simplification du code en supprimant la déclaration inutile des variables ;
- Extraction des messages dans des fichiers séparés pour modifier les messages plus facilement ;
- Simplification de code en utilisant un package de type module afin de pouvoir utiliser la syntaxe ES6 ;
- Correction des erreurs qui n'ont pas été détectées afin que l'API ne plante pas lorsqu'elle les rencontre ;
- Correction du docker-compose afin que la base de données n'ait pas besoin d'un mot de passe pour y accéder ;
- Amélioration des noms de variables afin que le code soit plus lisible et aux normes ;
- Suppression des fichiers inutiles contenant des constantes qui n'ont été utilisées qu'une seule fois ;
- Remplacement des guillemets doubles par des guillemets simples pour correspondre à la syntaxe recommandée par js ;
- Utilisation du camelCaseSyntax pour les fonctions et variables et SCREAMING_SNAKE_CASE pour les constantes ;
- Changement des égalités doubles '==' en triples '===' ;
- Création d'un nouveau type d'erreur personnalisé pour simplifier la gestion des erreurs et pouvoir avoir des réponses plus détaillées ;
- Remplacement du français en anglais des commentaires, de la documentation et de l'affichage ;
- Correction de l'authentification et de la gestion des token ;
- Centralisation des fonctions pour que le code soit plus facile à comprendre ;
- Implémentation des constantes directement dans le code (il est ensuite utilisé) lorsqu'il n'est utilisé qu'une seule fois.

### Architecture Decision Record

Au départ, nous avions choisi de mettre en place un ADR afin de discuter de la gestion des conditions dans les cas d'erreurs. Cependant, après de multiples recherches, nous n'avons pas trouvé d'alternative.

<!-- 
Exemple ADR
#### Contexte
Nous avons eu un débat quant à la gestion d'erreurs dans authentication.middleware.js, en particulier dans les blocs de catch. 

#### Options envisagées
Nous avons donc pris le choix de réaliser un Architecture Decision Record. Les différents choix portaient sur : 
- L'utilisation d'une série de conditions dans le bloc catch,
- L'utilisation d'un switch case.

#### Décision
Nous choisissons la série de conditions dans le cas où elles amènent au même code d'erreur, et le "switch case" dans le cas contraire.

#### Conséquence
Nous décidons de mettre en place le document de décision pour uniformiser cette gestion d'erreur au sein du projet. 
-->

## Projet éco-conception : echo (ReactJS & Java Springboot)

### Refactorisation du code côté API (car nouveau projet)

- Ajout de la javadoc ;
- Ajout de vérification sur les objets (non nullité) ;
- Suppression des variables intermédiaires pour améliorer la lisibilité du code ;
- Utilisation de lambda expression pour améliorer la lisibilité du code ;
- Précision des exceptions ;
- Ajout de validations sur les paramètres des entités (@NotNull, par exemple) ;
- Utilisation de constantes pour verbaliser les intentions ;
- Suppression de packages / code commenté(s) et / ou inutile(s).

### Tests de différents plugins d'analyse

Afin de tester différents plugins d'analyse, nous avons choisi de s'appuyer sur le site : <a href="https://www.dealabs.com/"><mark>Dealabs</mark></a>.

##### Lighthouse

Lighthouse est un outil d’audit automatisé initié par Google et accessible gratuitement pour tester les performances, l’accessibilité et le référencement d’un site web. Ainsi, nous pouvons aisément et rapidement tester nos sites internet. 

Cet outil nous permet de réaliser des audits et de mettre en lumière cinq informations essentielles d’un site :
- La performance : score permettant d’évaluer la performance d’un site web, il est estimé grâce à plusieurs métriques (pour assurer sa pertinence, l'équipe Lighthouse effectue régulièrement des recherches et recueille des commentaires pour comprendre ce qui a le plus grand impact sur les performances perçues par les utilisateurs) ;
- L’accessibilité : score indiquant le niveau d’accessibilité d’une application web, cela permet de savoir si elle est utilisable par les personnes handicapées ;
- Les bonnes pratiques : score reposant sur l’analyse des requêtes réalisées (http et https), la sécurisation des ressources exploitées et la vulnérabilité des bibliothèques utilisées ;
- Le SEO (ou optimisation pour les moteurs de recherche) : score se référant à l'ensemble des techniques qui visent à améliorer le positionnement d'une page, d'un site ou d'une application web dans la page de résultats d'un moteur de recherche ;
- Le PWA (progressive web app) : score provenant de l’analyse de la portabilité d’une interface web sur différents types d’écrans, cette mesure n’est pas toujours présente.

Tandis que l’EcoIndex est un service qui, à la suite de nombreuses contributions (le projet étant public), est devenu un outil collectif et ouvert à tous. Il permet de mesurer les émissions de gaz à effet de serre (aussi appelés GES) et la consommation en eau. Ainsi, la combinaison de ces deux outils nous permet d’auditer de façon plus précise nos diverses applications facilement.

##### Green IT Analysis (incluant l'éco-index)

C'est un outil intégré à la console du navigateur, qui permet très rapidement de générer un rapport. Nous retrouvons ensuite les détails de chaque page dans la partie "historique". 

Au long de cette phase d'analyse, nous allons utiliser l'EcoIndex. Nous pouvons retrouver des informations sur cet index sur le site suivant : <a href="https://www.ecoindex.fr/">https://www.ecoindex.fr/</a>.
Les principales métriques étudiées ici sont la consommation en eau, les émissions de GES et l'éco-index.

Il exporte les valeurs sous format d'un fichier CSV dont chaque colonne représente une métrique, interprétable par tout tableur.

##### Carbonalizer

Cette extension de navigateur permet de visualiser la consommation électrique et les émissions de gaz à effet de serre (GES) associées à une navigation internet.

Néanmoins, Carbonalyser n’est pas un outil d’évaluation ou d’audit. Il s’agit d’un support de sensibilisation individuelle, qui permet d’aider à visualiser un certain aspect de nos usages en ligne, au travers de comparaisons et d’indications sur la consommation électrique et émissions associées. Ces comparaisons se caractérisent par un nombre de recharges de téléphone qu'il aurait été possible de faire, ou encore le nombre de kilomètres qu'on aurait effectué en voiture pour la même quantité d'émission de CO2eq.

##### Comparaison de ces outils sur une page web

L’outil *LightHouse* est très orienté test technique, car il étudie les pages du site de façon isolée. Il propose des améliorations techniques (exemple : « Image elements do not have explicit width and height ») et une note par thème (performance, accessibilité, …).

![Lighthouse](./img/lighthouse.png)

*Carbonalyser*, quant à lui, est plus orienté test métier. En effet, il ne contient que des informations sur l’impact environnemental du site (ex : gCO2e). Il s’effectue sur un métier utilisateur, contrairement à *LightHouse* avec son fonctionnement « page par page ».

![Carbonalyser](./img/carbonyliser.png)

*GreenIT-Analysis*, lui, est plus ou moins la fusion de ces deux derniers outils. En effet, il fonctionne de manière « page par page » et affiche des conseils d’amélioration pour la page étudiée, comme le fait *LightHouse*  (GreenIt en propose moins). Cependant, il affiche aussi des informations sur l’impact environnemental comme le fait *Carbonalyser*.
 
![GreenIT-Analysis](./img/greenit-analysis.png)

Par rapport aux résultats de ces outils, nous pouvons constater qu’ils n’ont aucune valeur en commun. Par exemple, nous avons 2.88 gCO2e pour GreenIT alors que Carbonalyser donne 1 gCO2e, nous avons également 3800 DOM pour LightHouse contre 3076 DOM pour GreenIT.
De plus, il y a la présence de données non concrète dans ces outils. Par exemple, dans GreenIT, il y a l’attribut « EcoIndex » qui est ici à 6.02 ce qui correspond à une notation « G ». Cependant, nous ne savons pas concrètement ce que cela veut dire, ce qui peu amener à certaine confusion. Tout ce que nous savons, c’est que G est la plus basse note que l’outil puisse attribuer, ce qui laisse penser qu'il n’est pas du tout optimal d'un point de vue environnemental.
Ceci prouve donc que les résultats que nous obtenons dépendent grandement de l’outil utilisé et qu’il faut prendre en compte ces derniers avec précaution et contexte.

### Sélection des règles

#### Éliminer les fonctionnalités non essentielles

##### Lien vers la règle

<a href="https://github.com/cnumr/best-practices/blob/main/chapters/BP_001_fr.md">https://github.com/cnumr/best-practices/blob/main/chapters/BP_001_fr.md</a>

##### Description

Plusieurs études (Cast Software et Standish Group, notamment) démontrent que 70 % des fonctionnalités demandées par les utilisateurs ne sont pas essentielles et que 45 % ne sont jamais utilisées. En réduisant la couverture et la profondeur fonctionnelle de l’application, nous abaissons son coût de développement initial, sa dette technique et les impacts environnementaux associés.

On diminue ainsi mécaniquement l’infrastructure nécessaire à son exécution. Par ailleurs, à niveau ergonomique constant, plus l’application est pauvre fonctionnellement, plus elle sera simple à utiliser. Il faut donc réduire le plus possible la couverture fonctionnelle de l’application, en la centrant sur le besoin essentiel de l’utilisateur.

Détecter une fonctionnalité non essentielle est possible au moment de l'analyse de l'expression du besoin. La méthode MoSCoW, des ateliers, des wireframes (maquettes fonctionnelles) ou des prototypes avec tests utilisateurs permettent de vérifier l'utilité d’une fonctionnalité en amont de son développement.

##### Justification

Non avons choisi cette règle, car il nous semble important de limiter les fonctionnalités à celles qui sont vraiment essentielles afin de limiter la densité de code mort, ainsi qu'à favoriser la durabilité environnementale et l'efficacité économique. En effet, elle permet de réduire les coûts de développement initial, ainsi que les impacts environnementaux et de diminuer de la dette technique.

#### Favoriser un design simple, épuré, adapté au web

##### Lien vers la règle

<a href="https://github.com/cnumr/best-practices/blob/main/chapters/BP_005_fr.md">https://github.com/cnumr/best-practices/blob/main/chapters/BP_005_fr.md</a>

##### Description

Tout design d'interface ou webdesign doit être réfléchi en amont, en prenant en compte :

- les besoins de l'utilisateur (voir la bonne pratique "Optimiser le parcours utilisateur")
- les heuristiques d'ergonomie (Bastien et Scapin, Nielsen, etc.)
- les contraintes techniques
- les bonnes pratiques d'écoconception et de préférence les bonnes pratiques d'accessibilité

Privilégiez un design simple et épuré réalisable uniquement en HTML et CSS.

##### Justification

La simplification et l'épuration des pages web permet d'une part une meilleure expérience utilisateur, en termes de lisibilité et d'accessibilité, ainsi que de limiter le nombre de composants non pertinents. Cela limite alors l'exécution du code aux éléments essentiels uniquement.

#### Proposer un traitement asynchrone lorsque c'est possible

##### Lien vers la règle

<a href="https://github.com/cnumr/best-practices/blob/main/chapters/BP_008_fr.md">https://github.com/cnumr/best-practices/blob/main/chapters/BP_008_fr.md</a>

##### Description

Lorsque l’interaction avec l’utilisateur induit un traitement lourd et long côté serveur, proposer un traitement asynchrone lorsque c’est possible. L’idée est d’encourager l’utilisateur à déclencher le traitement, puis à se reconnecter quand celui-ci est terminé sans attendre sur son terminal la fin de l'exécution ; par exemple, via la réception d’un e-mail contenant un lien. Cette approche permet de réaliser des traitements par lots (batchs), souvent plus efficients en ressources que des traitements synchrones à la volée. Nous libèrons ainsi les serveurs de présentation, qui peuvent prendre en charge d’autres internautes pendant que le traitement s’effectue en mode asynchrone côté serveur. Il est également plus aisé de lisser la charge du serveur responsable du traitement, ce qui permet une meilleure mutualisation de serveurs et par conséquent moins de serveurs.

##### Justification

La mise en place de cette pratique permet, dans un premier temps, de limiter le temps d'attente côté client (en exploitant le multi-threading) et d'afficher les données qui sont déjà disponibles. Par conséquent, cela nous permet de charger les éléments au fur et à mesure, sans avoir à recharger l'intégralité de la page, ce qui peut être très énergivore. De plus, cela permet de rendre le traitement de l'information plus efficient.

#### Créer une architecture applicative modulaire

##### Lien vers la règle

<a href="https://github.com/cnumr/best-practices/blob/main/chapters/BP_014_fr.md">https://github.com/cnumr/best-practices/blob/main/chapters/BP_014_fr.md/</a>

##### Description

L’architecture modulaire popularisée par les logiciels open source apporte souvent une plus grande capacité à monter en charge, des coûts réduits de maintenance corrective et évolutive, ainsi qu’un code plus efficient. Si la couverture fonctionnelle du site web ou du service en ligne peut être amenée à évoluer, mieux vaut implémenter les fonctionnalités de base dans un noyau et les compléter au besoin par des modules. Ces modules peuvent rassembler des fonctions appartenant à un même domaine métier. Cela permet de les développer indépendamment des autres domaines métier ainsi que les partager à d'autres applications.

Cette approche est valable à tous les niveaux de granularité, pour un développement sur mesure comme pour le choix d’un serveur HTTP ou d’un CMS.

##### Justification

Ce modèle architectural permet de favoriser la factorisation du code et donc de diminuer les redondances de code. De surcroît, cela permet de rendre possible l'interconnexion entre composants de différentes technologies, de façon à optimiser les ressources existantes. Cette modularité permet également de pouvoir interchanger les diverses couches, sans devoir refactoriser l'intégralité d'un projet.

#### Découper les CSS

##### Lien vers la règle

<a href="https://github.com/cnumr/best-practices/blob/main/chapters/BP_021_fr.md">https://github.com/cnumr/best-practices/blob/main/chapters/BP_021_fr.md</a>

##### Description

Employer un ensemble de CSS plutôt qu’une seule, et appeler uniquement les CSS utiles en fonction du contexte. Cette méthode permet de limiter le poids de la page lors du premier téléchargement, donc d’économiser de la bande passante et de réduire la charge CPU.

##### Justification

Cette règle est intéressante, car elle prône, entre autres, la modularité et la factorisation des styles pour l'ensemble d'un projet. En effet, elle permet d'avoir des fichiers plus légers, ces derniers étant sollicités uniquement sur les composants des pages en question.

#### N'utilisez que les portions indispensables des bibliothèques JavaScript et frameworks CSS

##### Lien vers la règle

<a href="https://github.com/cnumr/best-practices/blob/main/chapters/BP_040_fr.md">https://github.com/cnumr/best-practices/blob/main/chapters/BP_040_fr.md</a>

##### Description

Les bibliothèques JavaScript telles que jQuery et les frameworks CSS prêts à l’emploi (Bootstrap, skeleton, gumby, foundation…) sont d’excellents outils pour réaliser rapidement des sites, car ils répondent à presque tous les besoins les plus courants. Revers de la médaille, nous n’en utilisons généralement qu’une petite portion ; or ces frameworks et bibliothèques ne s’appuient pas tous sur une architecture modulaire, ce qui contraint l’internaute à télécharger toute la librairie pour n’utiliser qu’un faible pourcentage de ses fonctionnalités.

Dans la mesure du possible, il est préférable de se passer de ces bibliothèques (voir <a href="https://youmightnotneedjquery.com">https://youmightnotneedjquery.com</a>) ou de n’en conserver que les portions réellement utilisées (voir <a href="https://getbootstrap.com/customize">https://getbootstrap.com/customize</a>).

Utiliser un bundler (ex: Webpack) permet de faire facilement du tree shaking, soit d'éliminer du code "mort" donc non utilisé.

##### Justification

Le choix et les portions de librairies permettent d'éviter des chargements lourds et de faciliter la lisbilité du code. En effet, l'ajout de code inutile complexifie sa lecture. De plus, de trop nombreuses fois, des librairies sont surexploitées. Aussi, cela peut aussi éviter de générer des comportements qui ne sont pas forcément souhaités, ce qui limite par conséquent les effets de bord.

#### Modifier plusieurs propriétés CSS en 1 seule fois

##### Lien vers la règle

<a href="https://github.com/cnumr/best-practices/blob/main/chapters/BP_045_fr.md">https://github.com/cnumr/best-practices/blob/main/chapters/BP_045_fr.md</a>

##### Description

Pour limiter le nombre de repaint/reﬂow, il est conseillé de ne pas modifier des propriétés une à une. Préférer l’ajout/la suppression de classes CSS, ce qui permet de modifier en une seule fois plusieurs propriétés, tout en ne générant qu’un repaint/reﬂow (voir <a href="https://github.com/cnumr/best-practices/blob/main/chapters/BP_045_fr.md">la bonne pratique n° 45</a>).

##### Justification

Nous pouvons lier cette règle à celle promouvant le découpage des fichiers CSS. En effet, le fait de regrouper les éléments CSS similaires va nous éviter les bouts de code redondants et va nous permettre de réduire le nombre de changements à effectuer, s'il y en a. Par conséquent, cela va , à termes, limiter le code mort, ainsi que la dette technique.

#### Mettre en cache les objets souvent accédés en JavaScript

##### Lien vers la règle

<a href="https://github.com/cnumr/best-practices/blob/main/chapters/BP_049_fr.md">https://github.com/cnumr/best-practices/blob/main/chapters/BP_049_fr.md</a>

##### Description

L’accès au DOM (Document Object Model) est coûteux en termes de ressources processeur (cycles CPU). Aussi, lorsque vous utilisez plusieurs fois le même élément du DOM depuis JavaScript, stockez sa référence dans une variable afin de ne pas parcourir à nouveau le DOM pour ce même élément.

##### Justification

La mise en cache des objets nous permet de limiter le nombre de requêtes HTTP(S) ou à la base de données, ce qui, sur une grande échelle, limite les consommations CPU, en plus de celles des serveurs, et donc réduit l'impact environemmental de ces systèmes applicatifs.

#### Réduire le volume de données stockées au strict nécessaire

##### Lien vers la règle

<a href="https://github.com/cnumr/best-practices/blob/main/chapters/BP_4011_fr.md">https://github.com/cnumr/best-practices/blob/main/chapters/BP_4011_fr.md</a>

##### Description

Réduire le volume de données stockées au nécessaire consiste à :

- optimiser la gestion des gros volumes de données.
- nettoyer les anciennes données, soit en les archivant hors ligne, soit en les supprimant.
- vérifier que les sauvegardes peuvent être restaurées.
- superviser la taille des espaces de stockage.

Suivant le type de données et leurs propriétaires, des contraintes légales peuvent amener à stocker dans le temps des données jamais utilisées.

L’utilisation des données et leur degré d’importance impactent aussi la manière de les stocker.

Cette bonne pratique s'inscrit dans le cadre de la gestion du cycle de vie de l'information.

##### Justification

Il nous semble important de le volume de données stockées au strict nécessaire afin de limiter la densité de données mortes, de favoriser la durabilité environnementale (car faible dimensionnement des infrastructures, par exemple). En effet, cette règle permet de réduire les impacts environnementaux et de diminuer de la dette technique (notamment dans le cas de sauvegardes de données plus légères).

#### S'assurer que les parcours utilisateurs permettent de réaliser leur action prévue

##### Lien vers la règle

<a href="https://github.com/cnumr/best-practices/blob/main/chapters/BP_4014_fr.md">https://github.com/cnumr/best-practices/blob/main/chapters/BP_4014_fr.md</a>

##### Description

Des services web permettent de réaliser sans se déplacer des démarches administratives, des ouvertures de contrats, des déclarations de sinistres etc... Beaucoup de ces procédures peuvent être complexes à réaliser ou ne pas prendre en compte des cas particuliers. Pour valider la connexion à un service bancaire en ligne par exemple, l'installation d'une application mobile et donc un smartphone peuvent être exigés. Certains utilisateurs peuvent donc se retrouver bloqués dans l'utilisation du service. La mise en place d'une alternative plus "low tech" (appel téléphonique, SMS, point d'accueil physique) peut pallier à cette situation.

##### Justification

Un système interactif bien pensé, autrement dit une architecture fonctionnelle bien réfléchie, va permettre de diminuer le nombre d'interactions de l'utilisateur sur un site web, par exemple, et donc de réduire le nombre de requêtes nécessaires, qu'elles soient locales ou distantes. Ainsi, cette règle nous permet de lier "bonne expérience utilisateur" et "limitation des consommations matérielles".