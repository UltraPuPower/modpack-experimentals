# MaterialLib (startup)

## General usage
### Script priority
Scripts using the material logic need to be executed in a certain order to avoid errors.

To make sure you don't call things before they are registered, just remember these simple rules:
- The component controller needs to be loaded before you try to create any components, and the same goes for materials
- All components must be loaded before you start creating materials
- All materials and isotopes must be loaded before the `registry.js` file

All data of the same sort (e.g. components or materials) can be registered at the same priority. The code has been designed in a way that checks are only executed on data that should already be complete

To achieve these rules, a few default priorities are used
- Components have their controller at `99999` and are registered at priority `99998`
- Isotopes use the same priorities as components
- Materials have their controller at `99997` and are registered at priority `99996`
- The blacklist has its controller at `99995` and is registered at priority `99994`
- Materials are registered at priority `-1`

### Documentation
All controllers have in-script documentation explaining data structures and method parameters.

Additionally, in each folder that containes a controller file, a `README.md` can be found with additional documentation and examples

Of course, the best way to understand how to use MaterialLib is by using it. Feel free to experiment, and don't be afraid to mess with the code, as you can always revert changes.

## Contributing
### Codebase
If you want to contribute to the "actual" code (e.g. the controllers), you are more than welcome to open PR's in github.

I will reserve the right to deny PR's should I not like them, just wanted to state that here.

### Compatibility
Should you wish to contribute by adding compatibility files for certain mods, I welcome you to do so.

There are a few small rules to adhere in order to make the compat files proper for usage.

Each file has the following 3 lines at the top:
- A priority; This dictates loading priority, and is needed for files to properly function
- A requirement; This is a neat KubeJS functionality. It takes a mod id, and if the mod is not loaded, the file won't be either, increasing performance and reducing possible bugs.
- An author/authors; This is just a line crediting the people who did major contributions to the file.

As an example, this is the blacklist registry for mekanism made by me (UltraPuPower1)
```js
// priority: 99998
// requires: mekanism
// author: UltraPuPower1
```