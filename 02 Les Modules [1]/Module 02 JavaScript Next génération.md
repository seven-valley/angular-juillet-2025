# Module 02 JavaScript Next Génération

Ou **_le nouveau JavaScript_**  
En fonction du dernier **ECMA**

Le 16 décembre 2024 : **ECMA-262**  
**15th edition, June 2024**  
https://ecma-international.org/publications-and-standards/standards/ecma-262/

## La portée du let est limité

```js
let age = 18;
if (age > 18) {
  let info = 2;
}
console.log(info); // undefined
```

## Prise en main du const

le const c'est aussi un **tableau** ou un **objet**

```js
const p1 = { nom: "PITT", prenom: "Brad" };
const p2 = p1;
p2.nom = "CRUISE";
console.log(p1);
```

## Pour copier ou clonner un objet

:warning: Ceci ne marche pas !

```js
const p1 = { nom: "PITT", prenom: "Brad" };
const p2 = p1;
p2.nom = "CRUISE";
console.log(p1);
```

## Spread ... pour cloner une objet

```js
const p1 = { nom: "PITT", prenom: "Brad"};
const p2 = { ...p1, age: 18 };
p2.nom = "CRUISE";
console.log(p1);
```

## Rest ... exemple

```js
const ajouter = (...args) => {
  const tab = [];
  for (let e of args) {
    tab.push(e);
  }
  console.log(tab);
};
ajouter("pomme");
ajouter("pomme", "poire", "cersie");
```

## les ${} Template literals ou en francais Littéraux de gabarits

A dieu la concaténation ... Bonjour **${}**

```js
console.log(p1.prenom + " " + p1.nom);

console.log(`${p1.prenom} ${p1.nom} ${p1.age > 17 && "good"}`);
```

## Bonjour le ternaire !

Et vive le ternaire !

```js
// if classique
if (p1.age > 17) {
  console.log("GOOD");
}
p.age > 17 && console.log("GOOD");
// SI  ALORS SINON
p1.age > 17 ? console.log("GOOD") : console.log(" pas GOOD");
//if avec 2 conditions
(p1.age > 17) & (p1.age < 19) ? console.log("GOOD") : console.log(" pas GOOD");
```

## Et enfin Littéraux de gabarits + ternaire

```js
console.log();
```
