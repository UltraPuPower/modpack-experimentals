// Rewritten by @konsola5 (discord)

const DimensionalUtils = (() => {
  const $CompoundTag = Java.loadClass('net.minecraft.nbt.CompoundTag')
  const $ComponentSerializer = Java.loadClass('net.minecraft.network.chat.Component$Serializer')

  const exports = {
    /**
     *
     * @param {$CompoundTag} data
     * @param {$ResourceLocation} dimension
     * @param {number} x
     * @param {number} y
     * @param {number} z
     * @returns {$CompoundTag}
     */
    addLocationData(data, dimension, x, y, z) {
      const locationTag = new $CompoundTag()

      const posTag = new $CompoundTag()
      posTag.put('x', NBT.intTag(x))
      posTag.put('y', NBT.intTag(y))
      posTag.put('z', NBT.intTag(z))

      const dimTag = NBT.stringTag(dimension.toString())

      locationTag.put('position', posTag)
      locationTag.put('dimension', dimTag)

      data.put('kjs_dimensional:location', locationTag)

      return data
    },

    /**
     * @param {$LevelBlock} block
     * @returns {$CompoundTag}
     */
    getBlockData(block) {
      const blockData = block.getEntityData()
      const customBlockData = blockData.getCompound('data')
      return customBlockData
    },

    /**
     * @param {$LevelBlock} block
     * @param {$CompoundTag} data
     */
    setBlockData(block, data) {
      const blockData = block.getEntityData()
      blockData.put('data', data)
      block.setEntityData(blockData)
    },

    /**
     *
     * @param {$Entity} entity
     * @param {string} dimension
     * @returns {$Level}
     */
    getDimensionLevel(entity, dimension) {
      // Entity is needed to obtain access to the server
      return entity.server['getLevel(net.minecraft.resources.ResourceLocation)'](dimension)
    },

    /**
     * @param {$Player} player
     * @param {$Component} text
     * @param {number} duration
     */
    title(player, text, duration) {
      const { server } = player
      server.runCommandSilent(
        `title ${player.username} title ${$ComponentSerializer.toJson(text, player.registryAccess())}`
      )
      if (duration) {
        server.scheduleInTicks(duration, ctx => {
          server.runCommandSilent(`title ${player.username} clear`)
        })
      }
    },

    /**
     * @param {$Player} player
     * @param {string} text
     */
    subtitle(player, text) {
      player.server.runCommandSilent(`title ${player.username} subtitle ${$ComponentSerializer.toJson(text, player.registryAccess())}`)
    },

    /**
     * @param {$Player} player
     * @param {$Component_} text
     */
    actionbar(player, text) {
      player.setStatusMessage(text)
    },

    /**
     * @param {$Player} player
     * @param {$CompoundTag} data
     * @param {string} type
     * @returns {false | {dimension: string, x: number, y: number, z: number}}
     */
    validateWarpAdress(player, data, type) {
      if (!data.contains('kjs_dimensional:location')) {
        exports.actionbar(
          player,
          Text.translate(`effects.kjs_dimensional.unentangled_${type}`)
        )
        return false
      }

      const location = data.getCompound('kjs_dimensional:location')

      if (!location.contains('position') || !location.contains('dimension')) {
        exports.actionbar(
          player,
          Text.translate(`effects.kjs_dimensional.corrupted_${type}`)
        )
        return false
      }

      const dimension = location.get('dimension').getAsString()
      const position = location.getCompound('position')
      if (!position.contains('x') || !position.contains('y') || !position.contains('z')) {
        exports.actionbar(
          player,
          Text.translate(`effects.kjs_dimensional.corrupted_${type}`)
        )
        return false
      }

      const x = position.getInt('x')
      const y = position.getInt('y')
      const z = position.getInt('z')

      const destinationDimension = exports.getDimensionLevel(player, dimension)

      const locationBlock = destinationDimension.getBlock(x, y, z)

      if (type == 'warp_stone') {
        let lower = locationBlock.down
        if (lower.id != 'kjs_dimensional:anchor_stone') {
          exports.actionbar(
            player,
            Text.translate(`effects.kjs_dimensional.corrupted_${type}`)
          )
          console.log(`No beacon for teleportation found at ${dimension} ${lower.pos}`)
          return false
        }
      }

      if (locationBlock.id != 'minecraft:air' || locationBlock.up.id != 'minecraft:air') {
        exports.actionbar(player, Text.translate(`effects.kjs_dimensional.blocked_${type}`))
        console.log(`No space for teleportation found at ${dimension} ${x}, ${y}-${y + 1}, ${z}`)
        return false
      }

      return { dimension: dimension, x: x, y: y, z: z }
    },

    /**
     * @param {$Player} player
     * @param {{dimension: string, x: number, y: number, z: number}} location
     */
    warp(player, location) {
      const { x, y, z, dimension } = location

      player.potionEffects.add('minecraft:blindness', 40, 1, false, false)

      exports.title(player, Text.translate('effects.kjs_dimensional.warping'), 20)

      player.server.scheduleInTicks(20, ctx => {
        player.teleportTo(dimension, x + 0.5, y, z + 0.5, player.yaw, player.pitch)
      })
    },

    /**
     *
     * @param {$Player} player
     * @param {$CompoundTag} data
     * @returns {boolean}
     */
    verifyLocationData(player, data) {
      if (data.isEmpty() || !data.contains('kjs_dimensional:location')) {
        exports.actionbar(player, Text.translate('effects.kjs_dimensional.no_location'))
        return false
      }
      const location = data.getCompound('kjs_dimensional:location')

      if (location.isEmpty()) {
        exports.actionbar(player, Text.translate('effects.kjs_dimensional.no_location'))
        return false
      }

      if (!location.contains('dimension')) {
        exports.actionbar(player, Text.translate('effects.kjs_dimensional.no_dimension'))
        return false
      }

      if (!location.contains('position')) {
        exports.actionbar(player, Text.translate('effects.kjs_dimensional.no_position'))
        return false
      }
      const position = location.getCompound('position')

      if (!position.contains('x') || !position.contains('y') || !position.contains('z')) {
        exports.actionbar(player, Text.translate('effects.kjs_dimensional.incomplete_position').getString())
        return false
      }

      return true
    },
  }
  return exports
})()

// DimensionalUtils.addLocationData();

/**
 * @typedef {import("net.minecraft.nbt.CompoundTag").$CompoundTag} $CompoundTag
 * @typedef {import("net.minecraft.nbt.Tag").$Tag} $Tag
 * @typedef {import("net.minecraft.network.chat.Component").$Component} $Component
 * @typedef {import("net.minecraft.network.chat.Component").$Component$$Type} $Component_
 * @typedef {import("net.minecraft.world.entity.Entity").$Entity} $Entity
 * @typedef {import("net.minecraft.world.entity.player.Player").$Player} $Player
 * @typedef {import("net.minecraft.world.level.Level").$Level} $Level
 * @typedef {import("net.minecraft.core.BlockPos").$BlockPos} $BlockPos
 * @typedef {import("net.minecraft.core.BlockPos").$BlockPos$$Type} $BlockPos_
 * @typedef {import("net.minecraft.resources.ResourceLocation").$ResourceLocation} $ResourceLocation
 * @typedef {import("net.minecraft.resources.ResourceLocation").$ResourceLocation$$Type} $ResourceLocation_
 * @typedef {import("dev.latvian.mods.kubejs.level.LevelBlock").$LevelBlock} $LevelBlock
 */