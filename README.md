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