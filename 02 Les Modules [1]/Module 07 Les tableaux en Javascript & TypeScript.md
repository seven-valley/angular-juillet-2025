# Module 07 - Les tableaux en Javascript & TypeScript
<img src="../img/td/td8/frame.jpg" width="200">
  
Les tableaux en JavaScript et TypeScript

:one: Déclarer et initialiser un tableau  
:two: Parcourir un tableau   
:three: La directive structurelle ngFor    
:four: Echantilloné un tableau


## Les tableaux en JavaScript & TypeScript

## :one: Déclarer et initialiser un tableau 
<code>console.table()</code> est préférable au <code>console.log()</code>

**Un tableau d'entier**
```js
const tableau:number[] =[];
tableau[0]=42;
tableau[1]=51;
tableau.push(78); // tableau[2]=78

// créer un tableau prérempli
const tableau2 =[12,23,54];

console.table(tableau);

```
| indice | valeur |
|---|---|
| 0 | 12 |
| 1 | 23 |
| 2 | 54 |

**Un tableau de chaînes de caractère**
```js
const fruits:string[] =[];
fruits[0]='pomme';
fruits[1]='poire';
tableau.push('kiwi'); // tableau[2]=78

// créer un tableau prérempli
const fruits2 =['pomme','poire','kiwi'];

console.table(fruits);
```
| indice | valeur |
|---|---|
| 0 | pomme |
| 1 | poire |
| 2 | kiwi |

**Bonne pratique avec push** :heart_eyes:
```js
const fruits:string[] =[];
tableau.push('pomme');
tableau.push('poire');
tableau.push('kiwi'); 
console.table(fruits);
```
| indice | valeur |
|---|---|
| 0 | pomme |
| 1 | poire |
| 2 | kiwi |

**Un tableau d'objet**
:warning: Ici le type <code>any</code> est générique   
Il serait préférable de créer une classe BO **B**usiness **O**bject <code>Personne</code>
```js
const personnes:Personne[] =[];
```

```ts
const p1:any = {prenom:'Brad',nom:'PITT'};
const p2:any = {prenom:'Nicolas',nom:'CAGE'};
const personnes:any[] =[];
personnes.push(p1);
personnes.push(p2);
console.table(personnes);
```
| indice | valeur |
|---|---|
| 0 | <code>{prenom:'Brad',nom:'PITT'}</code> |
| 1 | <code>{prenom:'Nicolas',nom:'CAGE'}</code> |


## :two: Afficher ou parcourir un tableau

### La boucle for "à papa" ou "à papy"
```ts
const fruits:string[] = ['pomme','poire','cerise'];

for(let i =0; i<fruits.length;i++){
    console.log(fruits[i]);
}
```
**Affichage :**
| |
|---|
| pomme |
| poire |
| cerise |

###  la boucle for each : simple et pratique (de la Génération Z)  :heart_eyes:
Très utilisée et simple à écrire.
Les personnes qui débutent prèfère le for each<code>for + of</code> à <code>.map()</code>
```ts  
const fruits:string = ['pomme','poire','cerise'];
for (let f of fruits){
    console.log(f);
}
```
**Affichage :**
| |
|---|
| pomme |
| poire |
| cerise |

### Afficher un tableau d'objet avec for each
```ts
const personnes:any[] =[
    {prenom:'Brad',nom:'PITT'},
    {prenom:'Nicolas',nom:'CAGE'}
    ];
    for (let p of personnes){
    console.log(p.prenom+' '+p.nom);
}
```
| |
|---|
| Brad PITT |
| Nicolas CAGE |

### la boucle map , très utilisé par la communauté React
```js
const fruits:string[] = ['pomme','poire','cerise'];

fruits.map (f => {console.log(f)});
// le map avec indice
fruits.map ((f,i) => {console.log(fruits[i])});
```
**Affichage :**
| |
|---|
| pomme |
| poire |
| cerise |

### Afficher un tableau d'objet avec map
```ts
const personnes:any[] =[
    {prenom:'Brad',nom:'PITT'},
    {prenom:'Nicolas',nom:'CAGE'}
    ];
    personnes.map (p =>{console.log(p.prenom+' '+p.nom)})
```
| |
|---|
| Brad PITT |
| Nicolas CAGE |

### la boucle for avec in
Plutot utiliser pour pracourir les objets.  
Et oui un objet , c'est aussi un tableau en Javascript !!  
:warning: **indice** est une chaîne decaractère
```ts
const fruits:string = ['pomme','poire','cerise'];
// indice => string indice est une chaîne decaractère
// En effet cette boucle sert aussi à parcourir un objet
for (let indice in fruits){
    console.log(fruits[parseInt(indice)]);
}
```
| |
|---|
| pomme |
| poire |
| cerise |

### Pourquoi la boucle for avec in let attribut est un string ?
En effet cette boucle sert surtout à parcourir les attributs d'un objet.  
```js
// JSON
let personne = {prenom:'Brad',nom:'PITT'};
for (let attribut in personne){
    console.table(attribut); // prenom ... nom
}
```
| |
|---|
| prenom |
| nom |

## :three: Effacer un élément du tableau

### INTERDIT !
:rage: :broken_heart:
**Interdit** car Le delete fait des trous sur un tableau

```js
const fruits:any[] = ['pomme','poire','cerise','kiwi'];
// effacer 'cerise' indice 2
delete fruits[2]; // NE PAS UTILISER !!
console.table(fruits);
```
| indice | valeur |
|---|---|
| 0 | pomme |
| 1 | poire |
| 2 | ***empty*** |
| 3 | kiwi |

Le **delete** est utilisé sur les objets pour enlever des attribus
```js
const personne:any = {prenom:'Brad',nom:'PITT',age:18};
delete personne['age']; // Et oui un objet est aussi un tableau !!
// ou delete.age
//personne = {prenom:'Brad',nom:'PITT'};
```

### Bonne pratique pour effacer :heart_eyes:
Le **splice** avec un **p**
```js
const fruits:string[] = ['pomme','poire','cerise','kiwi'];
fruits.splice(2,1); // 2 = indice  ; 1 = nb eléments à effacer
console.table(fruits);
```
:warning: Les indices sont réalouer
**Avant**
| indice | valeur |
|---|---|
| 0 | pomme |
| 1 | poire |
| 2 | cerise |
| 3 | kiwi |

**Après**
| indice | valeur |
|---|---|
| 0 | pomme |
| 1 | poire |
| 2 | kiwi |

## :four: Echantilloné un tableau
```js
const fruits:string = ['pomme','poire','cerise','kiwi'];
// slice = echantilloné un tableau
let tableau2 = fruits.slice(2,4); // 2 = indice de depart ; 4 = indice de fin
// le premier tableau reste intacte
console.table(fruits); // fruits = ['pomme','poire','cerise','kiwi'];
console.table(tableau2); // tableau2 = ['cerise','kiwi'];
```

**Avant le tableau fruits**
| indice | valeur |
|---|---|
| 0 | pomme |
| 1 | poire |
| 2 | cerise |
| 3 | kiwi |

-------------------------------

**Après le tableau tableau2**
| indice | valeur |
|---|---|
| 0 | cerise |
| 1 | kiwi |

**Après le tableau fruits**
| indice | valeur |
|---|---|
| 0 | pomme |
| 1 | poire |
| 2 | cerise |
| 3 | kiwi |