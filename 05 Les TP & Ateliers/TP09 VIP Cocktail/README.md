# TP 09 Vip Cocktail
[Tester le TP 09](https://www.sevenvalley.fr/tp-javascript/tp6/index.html) 

<img src="../../img/tp/tp6.webp" width="500">


```js
const personne ={
    prenom:'Brad',
    nom:'PITT',
    status:true
}
```
:warning: Pas de composants


- Mettre en place la requête  pour ajouter des personnes dans FireBase
- Mettre en place la requête  pour récupérer le tableau depuis FireBase
- Mettre en place la requête  pour  modifier des personnes dans FireBase

  
:warning: Ne plus utiliser <code>PUT</code>  
- <code>POST</code> Ajouter une personne avec la méthode POST  
- <code>PATCH</code> Modifier une personne avec la méthode PATCH  
- <code>DELETE</code> Effacer une personne avec la méthode DELETE   
  
  Nom du noeud :<code>personne.json</code>  
- url pour patch : <code>url/personne/id/.json</code>
- url pour delete : <code>url/personne/id/.json</code>
  
  
 <code>https://alpha-javascript-default-rtdb.europe-west1.firebasedatabase.app/client/-OB5oS7whXKqTlbBCZFx/.json</code>

## Problème on récupère les personnes comme ceci

```js
let data = {
  "-OB5oS7whXKqTlbBCZFx": { nom: "PITT", prenom: "Brad" },
  "-OB5oSII9wHESMfLsEKC": { nom: "CAGE", prenom: "Nicolas" },
  "-OB5oSPEiZ3ut529fo0a": { nom: "JOLIE", prenom: "Angelina" },
};
```

## C'est à dire comme cela

```js
let data = {
  id1: { nom: "PITT", prenom: "Brad" },
  id2: { nom: "CAGE", prenom: "Nicolas" },
  id3: { nom: "JOLIE", prenom: "Angelina" },
};
```

## Et on souhaiterait avoir cela

```js
let personnes = [
    {nom: "PITT", "prenom": "Brad", id:"id1"},
    {nom: "CAGE", "prenom": "Nicolas", id:"id2"},
    {nom: "JOLIE", "prenom": "Angelina", id:"id3"}
]
```

## penser à for + in

```js
for (let attribut in data) {
  console.log(attribut);
  console.log(data[attribut]);
}
```

## Ou bien Object.keys

```js
 Object.keys(data).map( attribut => {
    console.log(attribut);
    console.log(data[attribut]);
   }
```