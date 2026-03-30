## Machines
### Registering a machine
Registering a machine, in it's simplest form, is as simple as this:
```js
MachineHandler.create('crusher')
    .register();
```
This piece of code registers a `crusher` machine.

However, to call this a machine is almost lying. This is nothing more than a random piece of data that has no actual influence on our game. So, we will need to expand.

### Applying the recipe types
To create a recipe, RecipeLib uses the `.recipeType()` method to tell the builder what kind of recipe it is dealing with.

This approach was chosen to easily generate the same recipe for multiple machines (e.g. for creating crushing wheels and the mekanism crusher).
This however means we need to dictate what recipe types a machine can run, in order for the builder to use it for the recipes.

This is done using the `.addToRecipeTypes()` method:
```js
MachineHandler.create('crusher')
    .addToRecipeTypes(['crushing'])
    .register();
```
This example adds our `crusher` machine to the list of usable machines for the `crushing` recipe type.

The method takes an array, and will accept as many recipe types as you want it to.

### Defining IO capabilities
Not all machines can use the same amount of inputs and outputs. Should a recipe have more inputs than a machine can take, it can either throw an error, or create an uncompletable recipe.

To fix this, each machine should be given a maximum IO capability. This is the maximum amount of inputs and outputs of a certain type it can take.

For this we use the `.setIO()` method:
```js
MachineHandler.create('crusher')
    .setIO(1, 1, false, false, false, false)
    .register();
```
The method takes 6 arguments, which set:
- Item input
- Item output
- Fluid input
- Fluid output
- Chemical input
- Chemical output

Items are normal minecraft items, and so are fluids.

Chemicals refer to mekanism chemicals. Because they are so special, they can't be properly used within fluids. Supported was added due to mekanism being a relatively popular mod

Each parameter can take either a boolean (true or false) or an integer as an input.

Using `false` or `0` tells the builder that the machine can't use this IO capability.

Using a number specifies how many of this IO capability the machine can handle (e.g. using `3` for item input means the machine can take 3 different item inputs)

Using `true` tells the builder that the machine can technically handle an infite amount of types for this capability.
An example of this would be create washing, which can technically wash 1 item into an infinite amount of different items.

### Recipe functions
Oh boy, now this is gonna get interesting.

Recipe functions are by far the most complicated part of the machine registry. This one single function has to perfectly incapsulate every possible usage of using the machine.

Here is a simple json based recipe function:
```js
MachineHandler.create('crusher')
    .setIO(1, 1, false, false, false, false)
    .addToRecipeTypes(['crushing'])
    .setRecipeFunction((event, itemI, itemO, fluidI, fluidO, chemicalI, chemicalO, recipeData, recipeId) => {
        let recipeJson = {
            "type": "mekanism:crushing",
            "input": itemI[0].getInputIngredient(),
            "output": itemO[0].getOutputIngredient()
        };

        event.custom(recipeJson).id(recipeId);
    })
    .register();
```

#### Parameter requirements
To establish our first rule, your recipe function **MUST** use `(event, itemI, itemO, fluidI, fluidO, chemicalI, chemicalO, recipeData, recipeId)` as its parameters.

Should you choose not to do so, the recipe builder will quite literally implode on itself.

#### Getting ingredients for your recipes
All ingredient entries are given in a simplified itemstack format, using the materialStack handlers. To parse the entries, there are a variety of methods you can use in different scenarios:
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
- Chemicals
    - `<chemical>.getMekanismChemical()`
        - Gives a formal chemical ingredient used for inputs in JSON based recipes.
    - `<chemical>.getOutputIngredient()`
        - Gives a formal id ingredient used for outputs in JSON based recipes. Yes, this is the same way you get fluids

As you can see, inputs and outputs use a different method in JSON based recipes. This is due to the fact that they are formatted differently.
If you find this behaviour annoying, I heavily encourage you to go to the responsible parties, get it changed, and let me know so I can change it here.
Until then, live with it?

#### Parsing inputs and outputs of uncertain size
A lot of recipes have a fixed input/output, and as such you can directly parse the ingredients into your recipe (as you can see in the crusher recipe above).

Sometimes however, you aren't exactly sure on the amount of inputs or outputs.

In those cases, you can use a loop to quickly transform all entries, like so:
```js
let itemInputs = [];
itemI.forEach(item => {
    itemInputs.push(item.getItemOf());
});
```

#### Recipe id's
Recipe id's should be appended to the end of your recipes, to make them have a nicer in-game id than the random garble of characters KubeJS uses by default to avoid duplicate id's

It is important to note that the recipe id your function receives is different from the one you enter into the builder.

Behind the scenes, the builder transforms the recipe id into this: `recipelib:${usedRecipeType}/${usableMachine}/${recipeId}`, where `usedRecipeType` is the recipe type, `usableMachine` is the machine the function is for, and `recipeId` is the id you fed into the builder.

To add the recipe id, all you need to is append `.id(recipeId)` to the end of your recipe event.

#### JSON vs event based recipes
In our first example, you saw a JSON based recipe.
However, there are also event based recipes.

Here is an example of one:
```js
MachineHandler.create('furnace')
    .setIO(1, 1, false, false, false, false)
    .addToRecipeTypes(['smelting'])
    .setRecipeFunction((event, itemI, itemO, fluidI, fluidO, chemicalI, chemicalO, recipeData, recipeId) => {
        event.smelting(itemO[0].getItemOf(), itemI[0].getItemOf()).id(recipeId);
    })
    .register();
```
As a general rule of thumb, try to keep the amount of dependencies to the minimum.
In the example we show here, `event.smelting()` is a native method added by KubeJS, so it won't add additional dependencies.
However, for some mods, such as `create` and `mekanism`, there exist KubeJS addons. It is preferred to use JSON based recipes instead for those, to keep mod lists as small as possible.

#### Recipe data
Apart from basic inputs and outputs, recipes can also be given data.
Data can influence recipes that read for it, and change them.

Data modifiers can come in any form or shape. Here are a few:
- `melting_point`: Dictates the heat required to mold the material
    - Used in the blast furnace to see whether a normal smelting recipe can be generated
    - Used for the mechanical mixer from create to see whether a recipe requires (super)heating
- `toughness`: Dictates how tough a material is, used to decide what machine can crush it.
    - Used for the millstone from create to decide whether it can crush a material
- `shaped`: Carries with it a pattern and keys for it, used for shaped recipes

If you want to add a new piece of data, you don't have to do anything special.

Let's say you want to add the `freezing` data, which can either be `true` or `false`.

All you have to do in your recipe is add some kind of `if`-statement, which will process the data, and now you can just add the recipe data using the recipe builder.

Here is an example using an event based function:
```js
MachineHandler.create('blast_furnace')
    .setIO(1, 1, false, false, false, false)
    .addToRecipeTypes(['blasting'])
    .setRecipeFunction((event, itemI, itemO, fluidI, fluidO, chemicalI, chemicalO, recipeData, recipeId) => {
        let input = [];
        let output = [];
        itemI.forEach(item => {
            input.push(item.getItemOf());
        });
        itemO.forEach(item => {
            output.push(item.getItemOf());
        });

        let newRecipeId = recipeId.replace('blast_furnace', 'furnace');

        if (!recipeData.melting_point || recipeData.melting_point < 500) {
            event.smelting(output[0], input[0]).id(newRecipeId);
            event.blasting(output[0], input[0]).id(recipeId);
            return
        } else if (recipeData.melting_point < 1000) {
            event.blasting(output[0], input[0]).id(recipeId);
            return
        }
    })
    .register();
```
As you can see, depending on the value of `melting_point`, either a blasting and a smelting, a blasting recipe, or no recipe at all is generated.

Here is a different example, this time with a JSON based recipe:
```js
MachineHandler.create('chemical_infuser')
    .setIO(1, 1, false, false, 1, false)
    .addToRecipeTypes(['chemical_infusing'])
    .setRecipeFunction((event, itemI, itemO, fluidI, fluidO, chemicalI, chemicalO, recipeData, recipeId) => {
        let recipeJson = {
            "type": "mekanism:chemical_infusing",
            "left_input": chemicalI[0].getMekanismChemical(),
            "right_input": chemicalI[1].getMekanismChemical(),
            "output": chemicalO[0].getOutputIngredient(),
        };

        if (recipeData.tickUsage) {
            recipeJson["per_tick_usage"] = recipeData.tickUsage
        }

        event.custom(recipeJson).id(recipeId);
    })
    .register();
```
If `tickUsage` is true, the inputs will be consumed each tick, instead of each time the recipe runs.
##
These are all the basics of making recipe functions.
I recommend looking through existing ones already (you can find those at `recipelib/machines/registries`), to get a better feel for how they work.

Should you run into issues, don't hesitate to ask for help.