# RecipeLib

## General usage
### Script priority
Scripts for RecipeLib have a priority mechanic build in, to avoid running code dependant on generated data before said data has been generated.

These are the priorities used
- The machine controller is at `99999` and machines are at `99998`
- The recipe type controller is at `99999`
- The recipe builder is at `99997`

### Documentation
All controllers have in-script documentation explaining data structures and method parameters.

Additionally, in each folder that containes a controller file, a `README.md` can be found with additional documentation and examples

Of course, the best way to understand how to use RecipeLib is by using it. Feel free to experiment, and don't be afraid to mess with the code, as you can always revert changes.

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

As an example, this is the machine registry for mekanism made by me (UltraPuPower1)
```js
// priority: 99998
// requires: mekanism
// author: UltraPuPower1
```