# Formation N.O.U.S Ouvert Utile et Simple

## Création d'un jeu démineur

Le fil rouge de cette formation sera la création d'un jeu de démineur.

Pour ceux qui ne connaitrais pas, voici à quoi ressemble le jeux du [démineur](https://minesweeper.online/fr/game/3009987064)

Le champ de mines est représenté par une grille en deux dimensions, avec un pavage rectangulaire.

Chaque case de la grille peut soit cacher une mine, soit être vide. Le but du jeu est de découvrir toutes les cases libres sans faire exploser les mines, c'est-à-dire sans cliquer sur les cases qui les dissimulent.

Lorsque le joueur clique sur une case libre comportant au moins une mine dans l'une de ses cases avoisinantes, un chiffre apparaît, indiquant ce nombre de mines. Si en revanche toutes les cases adjacentes sont vides, une case vide est affichée et la même opération est répétée sur ces cases, et ce jusqu'à ce que la zone vide soit entièrement délimitée par des chiffres. En comparant les différentes informations récoltées, le joueur peut ainsi progresser dans le déminage du terrain. S'il se trompe et clique sur une mine, il a perdu.

On peut signaler les cases contenant des mines présumées par un drapeau en cliquant sur le bouton droit de la souris — mais ce n'est aucunement obligatoire. Il faut faire attention à ne pas signaler une case saine par un drapeau, car cela peut induire en erreur ; ce n'est toutefois pas aussi pénalisant que de découvrir une mine.

## Configuration

La logique du démineur a dèjà été faites, et se situe dans `src/domain/game.ts`.

Votre objectif sera d'ajouter l'interface pour pouvoir jouer au jeux.

## lancer le projet

Pour lancer le projet, il suffit de lancer `npm i && npm run dev`

## exercice 1

L'objectif de ce premier exercice sera d'afficher la grille du démineur.
`![Alt text](./public/exo1.png 'Optional Title')

## exercice 2

L'objectif est de finir le démineur, on pourra utilise useReducer pour la logique.
Quand le timer arrive à 0 c'est perdu, quand on clique sur une bombe, c'est perdu.
Pour gagner la partie il faut avoir découvert l'ensembles des cases sans bombes.

## exercice 3

On souhaiterais enregistrer les scores sur un serveur, la première étape est de rajouter un formulaire avec le pseudo, le mail et le score.

## exercice 4

On souhaiterais lors de la validation du formulaire, apeller l'api afin d'enregistrer nos score.
