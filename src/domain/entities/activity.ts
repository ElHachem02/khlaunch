import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class Activity extends Model {
    private id!: number;
    public nb_people!: number;
    public name!: string;
    public price_per_hour!: number;
    public user_mail!: string;
    public start_time!: Date;
    public end_time!: Date;
}

Activity.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nb_people: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price_per_hour: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        user_mail: {
            type: DataTypes.STRING,
            allowNull: false
        },
        start_time: {
            type: DataTypes.DATE,
            allowNull: false
        },
        end_time: {
            type: DataTypes.DATE,
            allowNull: false
        }
    },
    {
        sequelize,
        tableName: 'activities'
    }
);

export default Activity;
