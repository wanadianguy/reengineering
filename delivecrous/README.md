# Delivecrous

## Comment lancer ce projet web ?

Afin de lancer le back de Delivecrous, il suffit :

- D'effectuer la commande suivante dans le terminal : "npm run dev" ;
- De se connecter à une base de données MongoDB avec l'url suivante : "mongodb://localhost:27017/delivecrous".

Ce back sera alors fonctionnel sur le port 3000 et toutes les requêtes HTTP commenceront par : "localhost:3000/api/".

## Comment insérer de nouvelles données ?

L'ajout de nouvelles données peut s'effectuer via Postman (un premier jeu de données que vous pouvez réimporter dans Postman est disponible à la racine de ce projet).

Voici dans un premier temps les routes accessibles sans avoir à donner un token en entrée :

- Pour l'objet Plat :
    - Ajouter un plat :
        - La route est : localhost:3000/api/dishes avec la méthode POST ;
        - Il faut donner un nom, une description, un prix et ses éventuels allergènes sous le format JSON :

                {
                    "name": "dish32",
                    "description": "description32",
                    "price": 32,
                    "allergens": "allergens32"
                }

    - Récupérer l'ensemble des plats :
        - La route est : localhost:3000/api/dishes avec la méthode GET ;

    - Récupérer un plat spécifique via son identifiant :
        - La route est : localhost:3000/api/dishes/:id avec la méthode GET (:id représente une variable correspondant à l'identifiant d'un plat) ;

    - Récupérer un plat spécifique via un mot clé :
        - La route est : localhost:3000/api/dishes/search?keyword= suivi du mot clé avec la méthode GET ;

    - Supprimer un plat via son identifiant (celui-ci est également supprimé dans les paniers des utilisateurs le contenant) :
        - La route est : localhost:3000/api/dishes/:id avec la méthode DELETE (:id représente une variable correspondant à l'identifiant d'un plat) ;

    - Modifier un objet plat via son identifiant également :
        - La route est : localhost:3000/api/dishes/:id avec la méthode PUT (:id représente une variable correspondant à l'identifiant d'un plat) ; 

        - Il faut donner un nom et ou une description et ou un prix et ou ses éventuels allergènes sous le format JSON :

                {
                    "name": "deuxieme dish",
                    "description": "description de la deuxieme dish",
                    "price": 100,
                    "allergens": "alergens de la deuxieme dish"
                }


- Pour l’objet Utilisateur :
    - Ajouter un utilisateur :
        - La route est : localhost:3000/api/users avec la méthode POST ;
        - Il faut donner son nom d’utilisateur et son mot de passe sous le format JSON (attention à respecter le nombre minimal de caractères imposé par le fichier user.validators) :

                {
                    "username": "username1",
                    "password": "password1"
                }

    - Récupérer l'ensemble des utilisateurs ;
        - La route est : localhost:3000/api/users avec la méthode GET ;

    - Récupérer un utilisateur spécifique via son identifiant :
        - La route est : localhost:3000/api/users/:id avec la méthode GET (:id représente une variable correspondant à l'identifiant d'un utilisateur) ;

    - Supprimer un utilisateur via son identifiant :
        - La route est : localhost:3000/api/users/:id avec la méthode DELETE (:id représente une variable correspondant à l'identifiant d'un utilisateur ) ;

    - Modifier un objet utilisateur via son identifiant également :
        - La route est : localhost:3000/api/users/:id avec la méthode PUT (:id représente une variable correspondant à l'identifiant d'un utilisateur) ; 
        - Il faut donner son mot de passe et/ou son nom d’utilisateur sous le format JSON :

                {
                    "password": "password1"
                }


- Pour l'authentification d'un utilisateur (qui retourne un token) :
    - La route est : localhost:3000/api/auth avec la méthode GET ;
    - Il faut donner le nom de l’utilisateur et son mot de passe sous le format JSON afin de récupérer un token :

            {
                "username": "username1",
                "password": "password1"
            }



Voici maintenant les routes qui nécessite un token en entrée (dans l'onglet "Authorization", selectionner "Bearer Token" dans le menu déroulant et mettre le token dans l'espace indiqué, ce token est retourné lorsqu'un utilisateur se connecte) :

- Pour l’objet panier :
    - Ajouter un panier à un utilisateur :
        - La route est : localhost:3000/api/carts avec la méthode POST ;
        - Il faut donner un nom sous le format JSON :

                {
                    "name": "Panier"
                }

    - Récupérer l'ensemble des paniers d’un utilisateur :
        - La route est : localhost:3000/api/carts avec la méthode GET ;

    - Récupérer un panier spécifique via son identifiant :
        - La route est : localhost:3000/api/carts/:id avec la méthode GET (:id représente une variable correspondant à l'identifiant d'un panier) ;

    - Supprimer un panier via son identifiant :
        - La route est : localhost:3000/api/carts/:id avec la méthode DELETE (:id représente une variable correspondant à l'identifiant d'un panier) ;

    - Modifier un objet panier via son identifiant également :
        - La route est : localhost:3000/api/carts/:id avec la méthode PUT (:id représente une variable correspondant à l'identifiant d'un panier) ; 

        - Il faut donner son nom et ou l’identifiant et la quantité du plat à ajouter sous le format JSON :

                {
                    "name": "Mon nouveau panier de Noel",
                    "cart": [{
                        "idDish": "61bb6b699348434170a883e1",
                        "quantity": 3
                    }]
                }


- Pour la validation d’un panier d’un utilisateur :
    - La route est : localhost:3000/api/carts/:id/checkout avec la méthode GET (:id représente une variable correspondant à l'identifiant d'un panier) ;
    - Il faut donner l’adresse de l’utilisateur associée au panier sous le format JSON afin de valider la commande d’un panier en particulier :

            {
                "address": "rue de Templeuve"
            }
