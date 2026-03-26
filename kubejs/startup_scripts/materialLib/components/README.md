## Components
### Creating a component
All you really need to create a component is the following code:
```js
ComponentHandler.create('component')
    .register();
```
The `.create()` method initiates a new component, and gives it an id.

The `.register()` method finishes the component creation, and resets the handler so you can create a new component.

Unlike material creation, just these 2 methods will result in a fully usable component, all be it without a texture.

### Cascading Components
Cascading components are usefull for the server side material handling (e.g. recipe generation).

If we imagine a scenario where we create a material called super material and give it the plate component, then our script will attempt to generate a recipe for this super material plate.

This would be done using a `plate_maker` machine recipe (any recipe that we deem to be able to generate plates).

However, what is the input of such a recipe? It is, quite obviously, an ingot, and so we need to create an ingot item.

To us, this is just obvious, but our code doesn't do things that feel obvious, it only does what we tell it to, and we did not tell it to do that.
However, having to manually add all needed components to your material is a chore, and luckily one that can be automated.

When we create a component, we can tell it what other components it requires **directly**.

When a material is created, it automatically checks those dependencies, and if they exist, their dependencies, and adds them all to the list of components that need to be generated.

This is why we can create a material with only the `gear` component, and it will automatically decide to also create the needed `rod`, `plate`, `ingot` and `dust` components.

So, when you create a component, you need to set the component dependencies in order for this process to take place.

For this we have the `.setDependencies()` method, as shown here:
```js
ComponentHandler.create('ingot')
    .setDependencies(['dust'])
    .register();
```
As you can see, this ingot component is dependant on the `dust` component, and so whenever we create an `ingot` component for a material an accompanying `dust` component will be created.

### Handling fluids
If you want to integrate your components with fluids, the system needs to know how many liquid units your new component should hold.

An ingot, by default, gives 144mb, and this is regarded as a unit.

To register a component with a certain liquid amount, we can use the `.setLiquidAmount()` method.

If you also want fluid casting to be available (e.g. being able to turn a liquid directly into the component), you can use the `.generateMold()` method.

Here is an example for the ingot component, that tells the system it is 144mb, and that it can be solidified from fluids directly:
```js
ComponentHandler.create('ingot')
    .setDependencies(['dust'])
    .setLiquidAmount(144)
    .generateMold()
    .register();
```

The method `.generateMold()` is called so because it will also generate a casting mold for your component, as these are required for solidification recipes.

### Component naming schemes
The name of your component as a material is automatically generated and connected to the item ID, and as such can't be changed easily. However, sometimes you might want to shift the position of your component in the name.

Normally a component name/id is formatted with the material name first, and the component name after (e.g. Bronze Plate), but this can sound weird in some cases, such as Bronze Liquid.

Most people would prefer Liquid Bronze as the name for this, and we can achieve this by telling our component to be a prefix instead of a suffix.

Here is an example in the form of the liquid component:
```js
ComponentHandler.create('liquid')
    .setComponentAffix('prefix')
    .register();
```
Quite simple, and works like a charm. You should be aware it does change the item id alongside it, to account for this it is recommended to use the `MaterialStacks.js` tools when dealing with components in recipes.

Currently. these affixes are accepted:
- `prefix`
- `suffix`

*When `.setComponentAffix()` is not called, the component defaults to `suffix`

### Component States
The state of your component refers to the physical state of the component.

Changing the state of your component has some minor effects on things such as textures, and is not necessary if you so wish to avoid it.

Here is a piece of code that tells the component handler that the liquid component is indeed a liquid:
```js
ComponentHandler.create('liquid')
    .setComponentState('liquid')
    .register();
```
Currently, these states are accepted:
- `solid`
- `liquid`
- `gas`
- `plasma`

*When `.setComponentState()` is not called, the component defaults to `solid`

### Component Types
Component types sound similair to states, but slightly differ.

Where states are mostly cosmetic, and for recipe handling, types are used for registering your components.

Using states, we can determine whether the component corresponds to an item, fluid or block, and register it accordingly.

Here is the liquid component once again to showcase this:
```js
ComponentHandler.create('liquid')
    .setComponentType('fluid')
    .register();
```
Currently, these types are accepted:
- `item`
- `block`
- `fluid`

*When `.setComponentType()` is not called, the component defaults to `item`

### Adding textures
To give your component an actual texture, you need to add it to your texture sets.

This works the same as adding a new texture set, except that instead of creating a new folder for your textures, you drop the new texture into the existing sets.

We recommend adding the texture to the default set, to avoid any textures breaking