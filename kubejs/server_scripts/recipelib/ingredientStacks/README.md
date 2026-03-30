## Ingredient Stacks
### Creating a stack
Ingredient stacks are made by handlers, to allow proper parsing by the recipe functions.

Here is a simple example of how to create an item stack:
```js
let testItem = new ItemHandler('minecraft:dirt');
```
The process for creating a fluid stack is almost the same:
```js
let testFluid = new FluidHandler('minecraft:water');
```

### Modifying a stack
Once you have created an ingredient stack, you can modify it before parsing it in recipes.

Technically speaking, you could directly adjust properties of the object, like so:
```js
testItem.count = 3;
```
However, it is recommended you use the proper methods instead.

To adjust the amount of items/fluid you have, you can use the `.modifyAmount()` method:
```js
testItem.modifyAmount(3);
testFluid.modifyAmount(1500);
```

If you wish to add components (previously NBT) to your items or fluids, you can do so using the `.addComponentData()` method.
```js
testItem.addComponentData({"minecraft:custom_name": "Dirty Dirt"});
testFluid.addComponentData({"minecraft:custom_name": "Clean Water"});
```

### Retrieving an item stack
To actually get usefull ingredients from your ingredient stacks, there are a few methods:
- Items
    - `<item>.getItemOf()`
        - Gets the item using the KubeJS `Item.of()` method. Used for parsing recipes build with KubeJS events.
    - `<item>.getInputIngredient()`
        - Gives a formal item ingredient used for inputs in JSON based recipes.
    - `<item>.getOutputIngredient()`
        - Gives a formal id ingredient used for outputs in JSON based recipes.
- Fluids
    - `<fluid>.getFluidOf()`
        - Gets the fluid using the KubeJS `Fluid.of()` method. Used for parsing recipes build with KubeJS events.
    - `<fluid>.getInputIngredient()`
        - Gives a formal fluid ingredient used for inputs in JSON based recipes.
    - `<fluid>.getOutputIngredient()`
        - Gives a formal id ingredient used for outputs in JSON based recipes.
- Chemicals*
    - `<chemical>.getMekanismChemical()`
        - Gives a formal chemical ingredient used for inputs in JSON based recipes.
    - `<chemical>.getOutputIngredient()`
        - Gives a formal id ingredient used for outputs in JSON based recipes. Yes, this is the same way you get fluids

*Chemicals are just fluids with a funny hat on. You create them the same way you would a fluid