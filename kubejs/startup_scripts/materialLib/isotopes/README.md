## Isotopes
### Creating an isotope
Isotopes are a lot like components, in the way that they do not represent a physical item, but rather data used for items.

The most prominent usage of isotopes is in composition tooltips. Here they act as a buffer of sorts, that tells our code that the composition has been dissolved into the most basic of elements.

All an isotope needs to be created is an identifier (id):
```js
IsotopeHandler.create('materiallium')
    .register();
```
This code creates an element by the name of `materiallium`, and it can now be used by materials to set a composition

### Identifying an isotope
Our `materiallium` isotope is cool and all, but if we look in-game, we will see that any material using it in its composition will just have a boring `?` in the tooltip.

To fix this, we need to add a symbol to our isotope.

Even though it is called a symbol, it can be anything.
You could use the name as symbol, but following normal chemistry conventions it is customary to use an uppercase letter, possibly followed by a lowercase letter, such as `Fe` (iron).

However, this is a convention, and breaking those isn't a problem. As long as your symbol is a valid string containing characters minecraft recognizes, it can be anything.

For now, we will give `materiallium` the symbol `Ml`:
```js
IsotopeHandler.create('materiallium')
    .setSymbol('Ml')
    .register();
```
If you look in-game again, it should now show `Ml` in the tooltip containing `materiallium`

### Isotope mass
Our isotope is almost complete, but to give it some more usefull properties, we can set the proton and nucleon count.

These can be used to create a clear difference between isotopes.

Let's give `materiallium` a proton count of 120, and a nucleon count of 300:
```js
IsotopeHandler.create('materiallium')
    .setSymbol('Ml')
    .setProtonCount(120)
    .setNucleonCount(300)
    .register();
```

Let's say you want to create a second isotope of `materiallium`. You can't just copy the declaration above and adjust the nucleoncount, as it will result in a duplicate identifier.

To fix this, add the nucleon count to the id of your new isotope:
```js
IsotopeHandler.create('materiallium_301')
    .setSymbol('Ml')
    .setProtonCount(120)
    .setNucleonCount(301)
    .register();
```