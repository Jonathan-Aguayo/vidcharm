import { Email } from "@mui/icons-material";
const { Model } = require('sequelize'); //load module

module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', {
        cid: {
            type: DataTypes.String,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        body: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
        date_posted: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        like: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        dislike: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        vid: {
            type: DataTypes.String,
            allowNull: false,
        },
        uid: {
            type: DataTypes.String,
            allowNull: false,
        },
      })

    Comment.associate = models => {
        Comment.belongsTo(models.Video, {
            foreignKey:{
                name: 'vid',
                allowNull: false,
                onDelete: 'cascade',
          },
        })
    
        Comment.belongsTo(models.User, {
            foreignKey: {
                name: 'uid',
                allowNull: false,
                onDelete: 'cascade',
            },
        })
      }
    
    return Comment
}



