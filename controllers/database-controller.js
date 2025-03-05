const DatabaseProcessor = require("../logic/database-processor");

class DatabaseController {
    constructor() {
        const databaseProcessor = new DatabaseProcessor();

        this.connection = {
            connect: async () => {
                const response = await databaseProcessor.connection.connect();
                console.log(response);
                return response;
            },
            disconnect: async () => {
                const response = await databaseProcessor.connection.disconnect();
                return response;
            }
        };
        
        this.tables = {
            create: async (tableName, columns) => {
                const createdTableName = await databaseProcessor.tables.create(tableName, columns);
                return createdTableName;
            },
            remove: async (tableName) => {
                const removedTableName = await databaseProcessor.tables.remove(tableName);
                return removedTableName;
            }
        };
        
        this.data = {
            add: async (model) => {
                const newId = await databaseProcessor.data.add(model);
                return newId; 
            },
            get: async (model) => {
                const item = await databaseProcessor.data.get(model);
                return item;
            },
            update: async (id, item) => {
                const updatedItemId = await databaseProcessor.data.update(id, item);
                return updatedItemId;
            },
            remove: async (id) => {
                const removedItemId = await databaseProcessor.data.remove(id);
                return removedItemId;
            }
        };
    }
}

module.exports = DatabaseController;