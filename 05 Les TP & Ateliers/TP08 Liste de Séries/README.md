# TP 08 Mes Séries préférées
**live preview** :  
[Tester le TP 08](https://www.sevenvalley.fr/tp-javascript/tp7/index.html) 
  
<a href="https://www.sevenvalley.fr/tp-javascript/tp7/index.html">
<img src="../../img/tp/tp7.webp" width="600">
</a>

:warning: **Pas de création de composants**  

- Créer 2 tableaux d'objets séries
```js
series:any[] =[];
tabFav:any[] =[];
```

- Récupérer un tableau de séries
avec **s=** pour récupérer un tableau
```
http://www.omdbapi.com/?apikey=xxxx&s=star
```
- Ajouter une séries
- Créer une fonction asynchrone 
pour récupéré la note imdb (serie.imdbRating) avec l'id du film(serie.imdbID)
i=serie.imdbID
```
http://www.omdbapi.com/?apikey=xxxx&i=star
```
- Quand on ajoute la série elle s'enlève de la liste de recherche
- Enlever la série de la liste de favories
- Utiliser local storage


