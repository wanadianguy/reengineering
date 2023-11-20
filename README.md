# Projet Reengineering

## Equipe
- AUZOU Geoffrey
- CARLIER Amandine
- DENORME William
- FREMEAUX Maxime
- MOREAU Bryan

## Projet refactorisation

### Projet 1 : Delivecrous (Node.js & MongoDB)

#### Centralisation des codes de retour d'appel API
Nous avons décidé de placer les codes d'erreur de réponse dans un fichier, sous forme de constantes.
Cela permet d'uniformiser les codes au sein de l'application, d'éviter des erreurs, et en cas de modification d'un code, de ne pas avoir à le faire partout mais à un seul endroit.

#### middlewares
Nous avons consacré un temps conséquent sur la gestion d'erreur dans authentication.middleware.js. Cette discussion concernait le code contenu lors des levées d'exceptions. 
En fin de compte, il a été retenu que la série de conditions au sein de la méthode "catch" était la meilleure (car la seule) option.
En fait, l'utilsation d'un "switch case" n'était pas adaptée ici, car il fallait vérfier les types d'erreurs, ce qui n'est pas possible dans ce cas.

#### controllers
- Nous avons évité d'utiliser des variables temporaires. Par exemple, nous retournons directement le résultat donné par les méthodes asynchrones faisant appel aux services.
- Nous avons aussi renommé certaines variables qui n'étaient pas assez explicites, en particulier pour un développeur junior.

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

## Projet éco-conception

### Tests de différents plugins d'analyse

#### Lighthouse

Lighthouse est un outil d’audit automatisé initié par Google et accessible gratuitement pour tester les performances, l’accessibilité et le référencement d’un site web. Ainsi, nous pouvons aisément et rapidement tester nos sites internet. 

Cet outil nous permet de réaliser des audits et de mettre en lumière cinq informations essentielles d’un site :
 - La performance : score permettant d’évaluer la performance d’un site web, il est estimé grâce à plusieurs métriques (pour assurer sa pertinence, l'équipe Lighthouse effectue régulièrement des recherches et recueille des commentaires pour comprendre ce qui a le plus grand impact sur les performances perçues par les utilisateurs) ;
- L’accessibilité : score indiquant le niveau d’accessibilité d’une application web, cela permet de savoir si elle est utilisable par les personnes handicapées ;
- Les bonnes pratiques : score reposant sur l’analyse des requêtes réalisées (http et https), la sécurisation des ressources exploitées et la vulnérabilité des bibliothèques utilisées ;
- Le SEO (ou optimisation pour les moteurs de recherche) : score se référant à l'ensemble des techniques qui visent à améliorer le positionnement d'une page, d'un site ou d'une application web dans la page de résultats d'un moteur de recherche ;
- Le PWA (progressive web app) : score provenant de l’analyse de la portabilité d’une interface web sur différents types d’écrans, cette mesure n’est pas toujours présente.

Tandis que l’EcoIndex est un service qui, à la suite de nombreuses contributions (le projet étant public), est devenu un outil collectif et ouvert à tous. Il permet de mesurer les émissions de gaz à effet de serre (aussi appelés GES) et la consommation en eau. Ainsi, la combinaison de ces deux outils nous permet d’auditer de façon plus précise nos diverses applications facilement.

#### Green IT Analysis (incluant l'éco-index)

C'est un outil intégré à la console du navigateur, qui permet très rapidement de générer un rapport. On retrouve ensuite les détails de chaque page dans la partie "historique". 

Au long de cette phase d'analyse, nous allons utiliser l'EcoIndex. On peut retrouver des informations sur cet index sur le site suivant : <a href="https://www.ecoindex.fr/">https://www.ecoindex.fr/</a>.
Les principales métriques étudiées ici sont la consommation en eau, les émissions de GES et l'éco-index.

Il exporte les valeurs sous format d'un fichier CSV dont chaque colonne représente une métrique, interprétable par tout tableur.

#### Carbonalizer

Cette extension de navigateur permet de visualiser la consommation électrique et les émissions de gaz à effet de serre (GES) associées à une navigation internet.

Néanmoins, Carbonalyser n’est pas un outil d’évaluation ou d’audit. Il s’agit d’un support de sensibilisation individuelle, qui permet d’aider à visualiser un certain aspect de nos usages en ligne, au travers de comparaisons et d’indications sur la consommation électrique et émissions associées. Ces comparaisons se caractérisent par un nombre de recharges de téléphone qu'il aurait été possible de faire, ou encore le nombre de kilomètres qu'on aurait effectué en voiture pour la même quantité d'émission de CO2eq.

### Sélection des règles

