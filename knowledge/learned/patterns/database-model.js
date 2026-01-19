/**
 * APPROVED PATTERN: Sequelize Model Definition
 * 
 * This file is agent-maintained. Updated when better patterns emerge.
 * 
 * Use this structure for all database models.
 */

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const ModelName = sequelize.define('ModelName', {
    // ============================================
    // PRIMARY KEY
    // ============================================
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    // ============================================
    // REQUIRED FIELDS
    // ============================================
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Name cannot be empty' },
        len: { args: [1, 255], msg: 'Name must be 1-255 characters' },
      },
    },

    // ============================================
    // OPTIONAL FIELDS
    // ============================================
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    // ============================================
    // ENUM/STATUS FIELDS
    // ============================================
    status: {
      type: DataTypes.ENUM('pending', 'active', 'completed', 'cancelled'),
      defaultValue: 'pending',
      allowNull: false,
    },

    // ============================================
    // DATE FIELDS
    // ============================================
    scheduledDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },

    scheduledTime: {
      type: DataTypes.TIME,
      allowNull: true,
    },

    // ============================================
    // FOREIGN KEYS
    // ============================================
    crewId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Crews',
        key: 'id',
      },
    },

    // ============================================
    // BOOLEAN FLAGS
    // ============================================
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  }, {
    // ============================================
    // MODEL OPTIONS
    // ============================================
    tableName: 'model_names', // Explicit table name
    timestamps: true,         // Adds createdAt, updatedAt
    paranoid: false,          // Set true for soft deletes
  });

  // ============================================
  // ASSOCIATIONS (define in separate file or here)
  // ============================================
  ModelName.associate = (models) => {
    ModelName.belongsTo(models.Crew, {
      foreignKey: 'crewId',
      as: 'crew',
    });
  };

  // ============================================
  // INSTANCE METHODS
  // ============================================
  ModelName.prototype.toSafeJSON = function() {
    const values = { ...this.get() };
    // Remove sensitive fields if any
    return values;
  };

  // ============================================
  // CLASS METHODS
  // ============================================
  ModelName.findActive = function() {
    return this.findAll({ where: { isActive: true } });
  };

  return ModelName;
};
